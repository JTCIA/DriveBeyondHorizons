// ============================================================
// Save File Analyzer
// Reads a UE4 .sav binary file and extracts readable strings
// so we can understand the format and build a real parser.
// ============================================================

(function () {

  // --- Open / close modal ---
  document.getElementById('btn-analyze-save').addEventListener('click', () => {
    document.getElementById('analyzer-overlay').style.display = 'flex';
  });
  document.getElementById('analyzer-close').addEventListener('click', () => {
    document.getElementById('analyzer-overlay').style.display = 'none';
  });
  document.getElementById('analyzer-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('analyzer-overlay')) {
      document.getElementById('analyzer-overlay').style.display = 'none';
    }
  });

  // --- Drag & drop ---
  const dropZone = document.getElementById('drop-zone');

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) analyzeFile(file);
  });

  document.getElementById('sav-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) analyzeFile(file);
  });

  document.getElementById('analyzer-copy').addEventListener('click', () => {
    const output = document.getElementById('analyzer-output');
    output.select();
    document.execCommand('copy');
    const btn = document.getElementById('analyzer-copy');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy to Clipboard', 2000);
  });

  // --- Core analysis ---
  function analyzeFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target.result;
      const bytes = new Uint8Array(buffer);

      document.getElementById('analyzer-filename').textContent = file.name;
      document.getElementById('analyzer-filesize').textContent =
        (file.size / 1024).toFixed(1) + ' KB';

      const report = buildReport(bytes, file.name);
      document.getElementById('analyzer-output').value = report;
      document.getElementById('analyzer-results').style.display = 'block';
    };
    reader.readAsArrayBuffer(file);
  }

  function buildReport(bytes, filename) {
    const lines = [];
    lines.push('=== SAVE FILE ANALYSIS ===');
    lines.push('File: ' + filename);
    lines.push('Size: ' + bytes.length + ' bytes');
    lines.push('');

    // --- UE4 save file header ---
    lines.push('--- HEADER (first 64 bytes) ---');
    lines.push(hexDump(bytes, 0, 64));
    lines.push('');

    // File type tag (first 4 bytes)
    const tag = readInt32(bytes, 0);
    lines.push('File tag: 0x' + (tag >>> 0).toString(16).toUpperCase().padStart(8, '0'));

    // UE save version
    const saveVer = readInt32(bytes, 4);
    lines.push('Save version: ' + saveVer);

    // Package version
    const pkgVer = readInt32(bytes, 8);
    lines.push('Package version: ' + pkgVer);

    lines.push('');

    // --- Extract all UE-style length-prefixed strings ---
    lines.push('--- ALL READABLE STRINGS (UE length-prefixed format) ---');
    const ueStrings = extractUEStrings(bytes);
    lines.push('Found ' + ueStrings.length + ' strings');
    lines.push('');
    ueStrings.forEach(s => lines.push('[' + s.offset + '] ' + s.value));

    lines.push('');

    // --- Extract plain ASCII runs (fallback) ---
    lines.push('--- PLAIN ASCII STRINGS (length >= 6) ---');
    const asciiStrings = extractASCIIStrings(bytes, 6);
    lines.push('Found ' + asciiStrings.length + ' strings');
    lines.push('');
    asciiStrings.forEach(s => lines.push('[' + s.offset + '] ' + s.value));

    lines.push('');
    lines.push('=== END ===');

    return lines.join('\n');
  }

  // Read a little-endian int32
  function readInt32(bytes, offset) {
    return (bytes[offset] | (bytes[offset+1] << 8) | (bytes[offset+2] << 16) | (bytes[offset+3] << 24));
  }

  // UE4 stores strings as: int32 length (including null), then UTF-8 bytes, then null byte
  // Negative length = UTF-16LE
  function extractUEStrings(bytes) {
    const results = [];
    const seen = new Set();
    let i = 0;
    while (i < bytes.length - 5) {
      const len = readInt32(bytes, i);
      if (len > 2 && len < 512) {
        // Try to read a UTF-8 string of that length
        if (i + 4 + len <= bytes.length) {
          let valid = true;
          let str = '';
          for (let j = 0; j < len - 1; j++) {
            const c = bytes[i + 4 + j];
            if (c === 0 && j === len - 2) break; // null terminator OK at end
            if (c === 0 || c > 126) { valid = false; break; }
            if (c < 32 && c !== 9 && c !== 10 && c !== 13) { valid = false; break; }
            str += String.fromCharCode(c);
          }
          if (valid && str.length >= 3 && /[A-Za-z]/.test(str)) {
            const key = str;
            if (!seen.has(key)) {
              seen.add(key);
              results.push({ offset: i, value: str });
            }
            i += 4 + len;
            continue;
          }
        }
      } else if (len < -2 && len > -512) {
        // UTF-16LE string
        const charCount = -len;
        if (i + 4 + charCount * 2 <= bytes.length) {
          let valid = true;
          let str = '';
          for (let j = 0; j < charCount - 1; j++) {
            const lo = bytes[i + 4 + j * 2];
            const hi = bytes[i + 4 + j * 2 + 1];
            if (hi !== 0) { valid = false; break; }
            if (lo === 0 && j === charCount - 2) break;
            if (lo < 32 || lo > 126) { valid = false; break; }
            str += String.fromCharCode(lo);
          }
          if (valid && str.length >= 3 && /[A-Za-z]/.test(str)) {
            const key = str;
            if (!seen.has(key)) {
              seen.add(key);
              results.push({ offset: i, value: str + ' [UTF16]' });
            }
            i += 4 + charCount * 2;
            continue;
          }
        }
      }
      i++;
    }
    return results;
  }

  // Extract plain runs of printable ASCII (classic strings approach)
  function extractASCIIStrings(bytes, minLen) {
    const results = [];
    const seen = new Set();
    let current = '';
    let startOffset = 0;
    for (let i = 0; i < bytes.length; i++) {
      const c = bytes[i];
      if (c >= 32 && c <= 126) {
        if (current.length === 0) startOffset = i;
        current += String.fromCharCode(c);
      } else {
        if (current.length >= minLen && /[A-Za-z]/.test(current)) {
          if (!seen.has(current)) {
            seen.add(current);
            results.push({ offset: startOffset, value: current });
          }
        }
        current = '';
      }
    }
    return results;
  }

  // Hex dump helper
  function hexDump(bytes, start, length) {
    const lines = [];
    for (let i = start; i < start + length && i < bytes.length; i += 16) {
      const hex = [];
      const chars = [];
      for (let j = i; j < i + 16 && j < bytes.length && j < start + length; j++) {
        hex.push(bytes[j].toString(16).padStart(2, '0'));
        chars.push(bytes[j] >= 32 && bytes[j] <= 126 ? String.fromCharCode(bytes[j]) : '.');
      }
      lines.push(
        i.toString(16).padStart(4, '0') + '  ' +
        hex.join(' ').padEnd(47, ' ') + '  ' +
        chars.join('')
      );
    }
    return lines.join('\n');
  }

})();
