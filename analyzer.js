// ============================================================
// Save File Importer
// Reads a UE5 .sav binary file, matches known car-part class
// names against the checklist, and auto-checks found parts.
// ============================================================

(function () {

  // ----------------------------------------------------------
  // Part mapping: game blueprint class name → checklist entry
  // Derived from save-file string analysis of the GVAS format.
  // Pattern is matched as a substring of each extracted string.
  // ----------------------------------------------------------
  const SAVE_PART_MAP = [

    // ── TriClops (Tucker in game files) ──────────────────────
    { pattern: 'BP_Tucker_SteeringWheel',     carId: 'triclops', category: 'Interior Parts',  part: 'Steering Wheel' },

    // ── IFA ──────────────────────────────────────────────────
    { pattern: 'BP_IFA_Hood',                 carId: 'ifa',      category: 'Exterior Parts',  part: 'Hood' },
    { pattern: 'BP_IFA_Door_FL',              carId: 'ifa',      category: 'Exterior Parts',  part: 'Left Cab Door' },
    { pattern: 'BP_IFA_Door_FR',              carId: 'ifa',      category: 'Exterior Parts',  part: 'Right Cab Door' },
    { pattern: 'BP_IFA_UpDoor',              carId: 'ifa',      category: 'Exterior Parts',  part: 'Interior Hatch' },
    { pattern: 'BP_IFA_Plate',               carId: 'ifa',      category: 'Exterior Parts',  part: 'License Plate' },
    { pattern: 'BP_IFA_SteeringWheel',        carId: 'ifa',      category: 'Interior Parts',  part: 'Steering Wheel' },
    { pattern: 'BP_IFA_Shifter',              carId: 'ifa',      category: 'Interior Parts',  part: 'Shifter' },
    { pattern: 'BP_IFA_Radio',               carId: 'ifa',      category: 'Interior Parts',  part: 'Radio' },
    { pattern: 'BP_IFA_Pedal_B',             carId: 'ifa',      category: 'Interior Parts',  part: 'Brake Pedal' },
    { pattern: 'BP_IFA_Light_H',             carId: 'ifa',      category: 'Lights',          part: 'Headlight' },
    { pattern: 'BP_IFA_Light_L_FS_TS',       carId: 'ifa',      category: 'Lights',          part: 'Left Side Light' },
    { pattern: 'BP_IFA_Light_Backlight_L',   carId: 'ifa',      category: 'Lights',          part: 'Left Taillight' },
    { pattern: 'BP_IFA_Light_Backlight_R',   carId: 'ifa',      category: 'Lights',          part: 'Right Taillight' },
    { pattern: 'BP_IFA_Light_Int',           carId: 'ifa',      category: 'Lights',          part: 'Interior Light' },

    // ── Musgoat ───────────────────────────────────────────────
    { pattern: 'BP_Musgoat_Dashboard',        carId: 'musgoat',  category: 'Interior Parts',  part: 'Dashboard' },
    { pattern: 'BP_MusgoatGrid',             carId: 'musgoat',  category: 'Exterior Parts',  part: 'Grille' },
    { pattern: 'BP_MusgoatHeadLights_1',     carId: 'musgoat',  category: 'Lights',          part: 'Left Headlight' },
    { pattern: 'BP_MusgoatRearLightsLeft',   carId: 'musgoat',  category: 'Lights',          part: 'Left Taillight' },

    // ── GTR ───────────────────────────────────────────────────
    { pattern: 'BP_GTR_Battery',             carId: 'gtr',      category: 'Engine Parts',    part: 'Battery' },

    // ── Poyopa ────────────────────────────────────────────────
    { pattern: 'BP_PoyopaArmoredBumper',     carId: 'poyopa',   category: 'Exterior Parts',  part: 'Armored Bumper (Bull Bars)' },
    { pattern: 'BP_PoyopaBoot',              carId: 'poyopa',   category: 'Exterior Parts',  part: 'Tailgate' },
    { pattern: 'BP_PoyopaGlovebox_2',        carId: 'poyopa',   category: 'Interior Parts',  part: 'Console Lid' },
    { pattern: 'BP_PoyopaHeadLight_R',       carId: 'poyopa',   category: 'Lights',          part: 'Right Headlight' },
    { pattern: 'BP_PoyopaIndicatorLights',   carId: 'poyopa',   category: 'Exterior Parts',  part: 'Turn Signal Lights' },
    { pattern: 'BP_PoyopaRollBar',           carId: 'poyopa',   category: 'Exterior Parts',  part: 'Roll Bar' },
    { pattern: 'BP_PoyopaSteeringWheel',     carId: 'poyopa',   category: 'Interior Parts',  part: 'Steering Wheel' },
    { pattern: 'BP_Poyopa_DoorPanel_Right',  carId: 'poyopa',   category: 'Interior Parts',  part: 'Right Door Panel' },

    // ── Dada (LadaCarNew in game files) ──────────────────────
    { pattern: 'BP_LadaDashboard',           carId: 'dada',     category: 'Interior Parts',  part: 'Dashboard' },
    { pattern: 'BP_LadaFrontBumper',         carId: 'dada',     category: 'Exterior Parts',  part: 'Front Bumper' },
    { pattern: 'BP_LadaRearBumper',          carId: 'dada',     category: 'Exterior Parts',  part: 'Rear Bumper' },
    { pattern: 'BP_LadaHeadLight',           carId: 'dada',     category: 'Lights',          part: 'Headlight' },
    { pattern: 'BP_LadaIndicatorLightsLeft', carId: 'dada',     category: 'Lights',          part: 'Left Turn Signal' },
    { pattern: 'BP_Dada_Handbrake',          carId: 'dada',     category: 'Interior Parts',  part: 'Handbrake' },
    { pattern: 'LadaBoot_C',                 carId: 'dada',     category: 'Exterior Parts',  part: 'Trunk Lid' },
    { pattern: 'LadaDoor_FL',               carId: 'dada',     category: 'Exterior Parts',  part: 'Front Left Door' },
    { pattern: 'LadaDoor_FR',               carId: 'dada',     category: 'Exterior Parts',  part: 'Front Right Door' },
    { pattern: 'LadaGearLever',             carId: 'dada',     category: 'Interior Parts',  part: 'Shifter' },
    { pattern: 'LadaPedal_C',               carId: 'dada',     category: 'Interior Parts',  part: 'Pedal Assembly' },

    // ── Bonphiac (Pontiac/Bonphiac in game files) ─────────────
    { pattern: 'BP_Pontiac_Motor',           carId: 'bonphiac', category: 'Engine Parts',    part: 'Engine' },
    { pattern: 'BP_Pontiac_Battery',         carId: 'bonphiac', category: 'Engine Parts',    part: 'Battery' },
    { pattern: 'BP_Pontiac_Hood',            carId: 'bonphiac', category: 'Exterior Parts',  part: 'Hood' },
    { pattern: 'BP_Pontiac_Door_FL',         carId: 'bonphiac', category: 'Exterior Parts',  part: 'Left Door' },
    { pattern: 'BP_Pontiac_Door_FR',         carId: 'bonphiac', category: 'Exterior Parts',  part: 'Right Door' },
    { pattern: 'BP_Pontiac_FrontBumper',     carId: 'bonphiac', category: 'Exterior Parts',  part: 'Front Bumper' },
    { pattern: 'BP_Pontiac_SteeringWheel',   carId: 'bonphiac', category: 'Interior Parts',  part: 'Steering Wheel' },
    { pattern: 'BP_Pontiac_BackSeat_R',      carId: 'bonphiac', category: 'Interior Parts',  part: 'Right Rear Seat' },
    { pattern: 'BP_Pontiac_Pedal_Brake',     carId: 'bonphiac', category: 'Interior Parts',  part: 'Brake Pedal' },
    { pattern: 'BP_Pontiac_Pedal_Clutch',    carId: 'bonphiac', category: 'Interior Parts',  part: 'Clutch Pedal' },
    { pattern: 'BP_Pontiac_Radio',           carId: 'bonphiac', category: 'Interior Parts',  part: 'Radio' },

    // ── Golf (GolfCar in game files) ──────────────────────────
    { pattern: 'BP_Golf_Antena',             carId: 'golf',     category: 'Exterior Parts',  part: 'Antenna' },
    { pattern: 'BP_Golf_FrontBumper',        carId: 'golf',     category: 'Exterior Parts',  part: 'Front Bumper' },
    { pattern: 'BP_Golf_Glovebox',           carId: 'golf',     category: 'Interior Parts',  part: 'Glovebox Lid' },
    { pattern: 'BP_Golf_Handbrake',          carId: 'golf',     category: 'Interior Parts',  part: 'Handbrake' },
    { pattern: 'BP_Golf_ParcelShelf',        carId: 'golf',     category: 'Interior Parts',  part: 'Parcel Shelf' },
    { pattern: 'BP_Golf_Pedal_Throttle',     carId: 'golf',     category: 'Interior Parts',  part: 'Gas Pedal' },
    { pattern: 'BP_Golf_SeatB',              carId: 'golf',     category: 'Interior Parts',  part: 'Rear Seat Bench' },
    { pattern: 'BP_Golf_Starter',            carId: 'golf',     category: 'Engine Parts',    part: 'Ignition' },

    // ── C18 (C15/C18New in game files) ────────────────────────
    { pattern: 'BP_C15_Battery',             carId: 'c18',      category: 'Engine Parts',    part: 'Battery' },
    { pattern: 'BP_C15_Dashboard',           carId: 'c18',      category: 'Interior Parts',  part: 'Dashboard' },
    { pattern: 'BP_C15_DoorPanel_BR',        carId: 'c18',      category: 'Interior Parts',  part: 'Right Cargo Door Panel' },
    { pattern: 'BP_C15_DoorPanel_FL',        carId: 'c18',      category: 'Interior Parts',  part: 'Left Cargo Door Panel' },
    { pattern: 'BP_C15_Door_RR',             carId: 'c18',      category: 'Exterior Parts',  part: 'Right Cargo Door' },
    { pattern: 'BP_C15_Grid',               carId: 'c18',      category: 'Exterior Parts',  part: 'Grille' },
    { pattern: 'BP_C15_Light_HL',            carId: 'c18',      category: 'Lights',          part: 'Left Headlight' },
    { pattern: 'BP_C15_Pedal_C',             carId: 'c18',      category: 'Interior Parts',  part: 'Clutch Pedal' },
    { pattern: 'BP_C15_Pedal_T',             carId: 'c18',      category: 'Interior Parts',  part: 'Gas Pedal' },
    { pattern: 'BP_C15_Plate_00',            carId: 'c18',      category: 'Exterior Parts',  part: 'Front License Plate' },
    { pattern: 'BP_C15_Plate_01',            carId: 'c18',      category: 'Exterior Parts',  part: 'Rear License Plate' },
    { pattern: 'BP_C15_Sunvisor_R',          carId: 'c18',      category: 'Interior Parts',  part: 'Right Sun Visor' },

    // ── UAZ ───────────────────────────────────────────────────
    { pattern: 'BP_UAZ_Motor',              carId: 'uaz',      category: 'Engine Parts',    part: 'Engine' },
    { pattern: 'BP_UAZ_Radiator',           carId: 'uaz',      category: 'Engine Parts',    part: 'Radiator' },
    { pattern: 'BP_UAZ_Dashboard',          carId: 'uaz',      category: 'Interior Parts',  part: 'Dashboard' },
    { pattern: 'BP_UAZ_SteeringWheel',      carId: 'uaz',      category: 'Interior Parts',  part: 'Steering Wheel' },
    { pattern: 'BP_UAZ_Handbrake',          carId: 'uaz',      category: 'Interior Parts',  part: 'Handbrake' },
    { pattern: 'BP_UAZ_Pedal_C',            carId: 'uaz',      category: 'Interior Parts',  part: 'Clutch Pedal' },
    { pattern: 'BP_UAZ_Carpet_Left',        carId: 'uaz',      category: 'Interior Parts',  part: 'Left Floor Mat' },
    { pattern: 'BP_UAZ_Door_BR',            carId: 'uaz',      category: 'Exterior Parts',  part: 'Rear Right Door' },
    { pattern: 'BP_UAZ_Grid',              carId: 'uaz',      category: 'Exterior Parts',  part: 'Grille' },
    { pattern: 'BP_UAZ_Antena',            carId: 'uaz',      category: 'Exterior Parts',  part: 'Antenna' },
    { pattern: 'BP_UAZ_Light_01',          carId: 'uaz',      category: 'Lights',          part: 'Headlight' },
    { pattern: 'BP_UAZ_Light_02',          carId: 'uaz',      category: 'Lights',          part: 'Taillight' },
  ];

  // ----------------------------------------------------------
  // Scan a byte array for known part patterns
  // Returns array of unique {carId, category, part} matches
  // ----------------------------------------------------------
  function scanForParts(bytes) {
    const strings = extractUEStrings(bytes);
    // Build a single concatenated search string for speed
    const haystack = strings.map(s => s.value).join('\n');

    const matched = [];
    const seen = new Set();

    for (const mapping of SAVE_PART_MAP) {
      if (haystack.includes(mapping.pattern)) {
        const key = window.DBH.getPartKey(mapping.carId, mapping.category, mapping.part);
        if (!seen.has(key)) {
          seen.add(key);
          matched.push({ ...mapping, key });
        }
      }
    }
    return matched;
  }

  // ----------------------------------------------------------
  // Show import results inside the modal
  // ----------------------------------------------------------
  function showResults(matches, filename) {
    // Group by car
    const bycar = {};
    matches.forEach(m => {
      if (!bycar[m.carId]) bycar[m.carId] = [];
      bycar[m.carId].push(m);
    });

    const { CARS_DATA, getPartKey } = window.DBH;
    const stateKeys = matches.map(m => m.key);

    // Count already-checked
    let alreadyChecked = 0;
    stateKeys.forEach(k => {
      // peek at current localStorage state
      try {
        const raw = localStorage.getItem('dbh_checklist_v1');
        const s = raw ? JSON.parse(raw) : {};
        if (s[k]) alreadyChecked++;
      } catch (_) {}
    });
    const newCount = stateKeys.length - alreadyChecked;

    const resultsEl = document.getElementById('import-results');
    const summaryEl = document.getElementById('import-summary');
    const listEl    = document.getElementById('import-car-list');
    const applyBtn  = document.getElementById('import-apply');

    summaryEl.innerHTML = matches.length === 0
      ? '<span class="import-none">No recognisable car parts found in this save file.</span>'
      : `Found <strong>${matches.length}</strong> part${matches.length !== 1 ? 's' : ''} across <strong>${Object.keys(bycar).length}</strong> car${Object.keys(bycar).length !== 1 ? 's' : ''}` +
        (newCount > 0 ? ` &mdash; <span class="import-new">${newCount} new</span>` : ' (all already checked)');

    listEl.innerHTML = '';
    Object.entries(bycar).forEach(([carId, parts]) => {
      const car = CARS_DATA.find(c => c.id === carId);
      const carName = car ? car.name : carId;
      const div = document.createElement('div');
      div.className = 'import-car-block';
      div.innerHTML = `<div class="import-car-name">${carName} <span class="import-car-count">${parts.length} part${parts.length !== 1 ? 's' : ''}</span></div>`;
      const ul = document.createElement('ul');
      ul.className = 'import-part-list';
      parts.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.category}: ${p.part}`;
        ul.appendChild(li);
      });
      div.appendChild(ul);
      listEl.appendChild(div);
    });

    applyBtn.style.display = matches.length > 0 ? 'inline-flex' : 'none';
    applyBtn.onclick = () => {
      const stats = window.DBH.importParts(stateKeys);
      summaryEl.innerHTML = `<span class="import-success">&#10003; Applied: ${stats.newlyChecked} part${stats.newlyChecked !== 1 ? 's' : ''} checked` +
        (stats.alreadyChecked > 0 ? `, ${stats.alreadyChecked} already checked` : '') + '</span>';
      applyBtn.style.display = 'none';
    };

    resultsEl.style.display = 'block';
    document.getElementById('drop-zone').style.display = 'none';
    document.getElementById('analyzer-desc').style.display = 'none';
  }

  // ----------------------------------------------------------
  // Process a dropped / selected file
  // ----------------------------------------------------------
  function processFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bytes = new Uint8Array(e.target.result);
      const matches = scanForParts(bytes);
      showResults(matches, file.name);
    };
    reader.readAsArrayBuffer(file);
  }

  // ----------------------------------------------------------
  // Modal open / close
  // ----------------------------------------------------------
  document.getElementById('btn-analyze-save').addEventListener('click', () => {
    resetModal();
    document.getElementById('analyzer-overlay').style.display = 'flex';
  });

  document.getElementById('analyzer-close').addEventListener('click', closeModal);

  document.getElementById('analyzer-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('analyzer-overlay')) closeModal();
  });

  document.getElementById('import-scan-again').addEventListener('click', resetModal);

  function closeModal() {
    document.getElementById('analyzer-overlay').style.display = 'none';
  }

  function resetModal() {
    document.getElementById('import-results').style.display = 'none';
    document.getElementById('drop-zone').style.display = 'block';
    document.getElementById('analyzer-desc').style.display = 'block';
    document.getElementById('sav-file-input').value = '';
  }

  // ----------------------------------------------------------
  // Drag & drop
  // ----------------------------------------------------------
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
    if (file) processFile(file);
  });

  document.getElementById('sav-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  });

  // ----------------------------------------------------------
  // UE5 string extraction (same algorithm as before)
  // ----------------------------------------------------------

  function readInt32(bytes, offset) {
    return (bytes[offset] | (bytes[offset+1] << 8) | (bytes[offset+2] << 16) | (bytes[offset+3] << 24));
  }

  function extractUEStrings(bytes) {
    const results = [];
    const seen = new Set();
    let i = 0;
    while (i < bytes.length - 5) {
      const len = readInt32(bytes, i);
      if (len > 2 && len < 512) {
        if (i + 4 + len <= bytes.length) {
          let valid = true;
          let str = '';
          for (let j = 0; j < len - 1; j++) {
            const c = bytes[i + 4 + j];
            if (c === 0 && j === len - 2) break;
            if (c === 0 || c > 126) { valid = false; break; }
            if (c < 32 && c !== 9 && c !== 10 && c !== 13) { valid = false; break; }
            str += String.fromCharCode(c);
          }
          if (valid && str.length >= 3 && /[A-Za-z]/.test(str)) {
            if (!seen.has(str)) {
              seen.add(str);
              results.push({ value: str });
            }
            i += 4 + len;
            continue;
          }
        }
      } else if (len < -2 && len > -512) {
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
            if (!seen.has(str)) {
              seen.add(str);
              results.push({ value: str });
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

})();
