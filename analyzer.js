// ============================================================
// Save File Importer
// Reads a UE5 .sav binary file, detects car part blueprint
// class names, maps them to GENERIC ROLES (e.g. "Steering Wheel"),
// then matches each role against the ACTIVE car's checklist.
//
// This handles cross-car part installation: e.g. a Lada steering
// wheel found in the save correctly checks off "Steering Wheel"
// on whatever car is currently selected in the sidebar.
// ============================================================

(function () {

  // ----------------------------------------------------------
  // SAVE_PART_MAP
  // blueprint class name substring → generic functional role
  // Roles are matched against the active car's part names via
  // ROLE_ALIASES below.  Null roles are known non-checklist items.
  // ----------------------------------------------------------
  const SAVE_PART_MAP = [

    // ── Engines ───────────────────────────────────────────────
    { pattern: 'CarMotorV2',                 role: 'Engine' },
    { pattern: 'CarMotorV3',                 role: 'Engine' },
    { pattern: 'BP_UAZ_Motor',               role: 'Engine' },
    { pattern: 'BP_Pontiac_Motor',           role: 'Engine' },
    { pattern: 'PoyopaMotor',                role: 'Engine' },

    // ── Radiators ─────────────────────────────────────────────
    { pattern: 'CarRadiatorV2',              role: 'Radiator' },
    { pattern: 'BP_UAZ_Radiator',            role: 'Radiator' },
    { pattern: 'BP_C15_Radiator',            role: 'Radiator' },

    // ── Batteries ─────────────────────────────────────────────
    { pattern: 'CarBatteryV2',               role: 'Battery' },
    { pattern: 'BP_GTR_Battery',             role: 'Battery' },
    { pattern: 'BP_Pontiac_Battery',         role: 'Battery' },
    { pattern: 'BP_C15_Battery',             role: 'Battery' },

    // ── Ignition / Starter ────────────────────────────────────
    { pattern: 'CarStarterV2',               role: 'Ignition' },
    { pattern: 'BP_Golf_Starter',            role: 'Ignition' },

    // ── Steering Wheels ───────────────────────────────────────
    { pattern: 'CarSteeringWheelV2',         role: 'Steering Wheel' },
    { pattern: 'BP_Tucker_SteeringWheel',    role: 'Steering Wheel' },
    { pattern: 'BP_IFA_SteeringWheel',       role: 'Steering Wheel' },
    { pattern: 'BP_UAZ_SteeringWheel',       role: 'Steering Wheel' },
    { pattern: 'BP_Pontiac_SteeringWheel',   role: 'Steering Wheel' },
    { pattern: 'BP_PoyopaSteeringWheel',     role: 'Steering Wheel' },

    // ── Shifters ──────────────────────────────────────────────
    { pattern: 'CarGearShifterV2',           role: 'Shifter' },
    { pattern: 'BP_IFA_Shifter',             role: 'Shifter' },
    { pattern: 'LadaGearLever',              role: 'Shifter' },
    { pattern: 'MusgoatGearLever',           role: 'Shifter' },

    // ── Handbrakes ────────────────────────────────────────────
    { pattern: 'CarHandbrakeV2',             role: 'Handbrake' },
    { pattern: 'BP_UAZ_Handbrake',           role: 'Handbrake' },
    { pattern: 'BP_Golf_Handbrake',          role: 'Handbrake' },
    { pattern: 'BP_Dada_Handbrake',          role: 'Handbrake' },

    // ── Radios ────────────────────────────────────────────────
    { pattern: 'CarRadioV2',                 role: 'Radio' },
    { pattern: 'BP_IFA_Radio',               role: 'Radio' },
    { pattern: 'BP_Pontiac_Radio',           role: 'Radio' },

    // ── Gas Pedal ─────────────────────────────────────────────
    { pattern: 'CarPedalSpeed',              role: 'Gas Pedal' },
    { pattern: 'BP_C15_Pedal_T',             role: 'Gas Pedal' },
    { pattern: 'BP_Golf_Pedal_Throttle',     role: 'Gas Pedal' },

    // ── Brake Pedal ───────────────────────────────────────────
    { pattern: 'CarPedalBrake',              role: 'Brake Pedal' },
    { pattern: 'BP_IFA_Pedal_B',             role: 'Brake Pedal' },
    { pattern: 'BP_Pontiac_Pedal_Brake',     role: 'Brake Pedal' },

    // ── Clutch Pedal ──────────────────────────────────────────
    { pattern: 'CarPedalClutch',             role: 'Clutch Pedal' },
    { pattern: 'CarPedalV2Clutch',           role: 'Clutch Pedal' },
    { pattern: 'BP_UAZ_Pedal_C',             role: 'Clutch Pedal' },
    { pattern: 'BP_C15_Pedal_C',             role: 'Clutch Pedal' },
    { pattern: 'BP_Pontiac_Pedal_Clutch',    role: 'Clutch Pedal' },

    // ── Pedal Assembly (combined, used by Dada/Musgoat) ───────
    { pattern: 'LadaPedal_C',               role: 'Pedal Assembly' },

    // ── Dashboard ─────────────────────────────────────────────
    { pattern: 'BP_LadaDashboard',           role: 'Dashboard' },
    { pattern: 'BP_UAZ_Dashboard',           role: 'Dashboard' },
    { pattern: 'BP_C15_Dashboard',           role: 'Dashboard' },
    { pattern: 'BP_Musgoat_Dashboard',       role: 'Dashboard' },

    // ── Seats ─────────────────────────────────────────────────
    { pattern: 'CarSeatDriver',              role: 'Front Seat' },
    { pattern: 'CarSeatV2',                  role: 'Front Seat' },
    { pattern: 'BP_Golf_SeatB',              role: 'Rear Seat Bench' },
    { pattern: 'CarBanquetteV2',             role: 'Rear Seat Bench' },
    { pattern: 'BP_Pontiac_BackSeat_R',      role: 'Right Rear Seat' },
    { pattern: 'CarBanquetteLadaRear',       role: 'Rear Shelf' },

    // ── Interior accessories ──────────────────────────────────
    { pattern: 'BP_Golf_Glovebox',           role: 'Glovebox Lid' },
    { pattern: 'BP_PoyopaGlovebox_2',        role: 'Console Lid' },
    { pattern: 'BP_Golf_ParcelShelf',        role: 'Parcel Shelf' },
    { pattern: 'BP_UAZ_Carpet_Left',         role: 'Left Floor Mat' },
    { pattern: 'BP_C15_Sunvisor_R',          role: 'Right Sun Visor' },
    { pattern: 'BP_Poyopa_DoorPanel_Right',  role: 'Right Door Panel' },
    { pattern: 'BP_C15_DoorPanel_BR',        role: 'Right Cargo Door Panel' },
    { pattern: 'BP_C15_DoorPanel_FL',        role: 'Left Cargo Door Panel' },

    // ── Hood ──────────────────────────────────────────────────
    { pattern: 'BP_IFA_Hood',                role: 'Hood' },
    { pattern: 'BP_Pontiac_Hood',            role: 'Hood' },

    // ── Trunk / Hatch / Tailgate ──────────────────────────────
    { pattern: 'LadaBoot_C',                 role: 'Trunk Lid' },
    { pattern: 'BP_PoyopaBoot',              role: 'Tailgate' },

    // ── Bumpers ───────────────────────────────────────────────
    { pattern: 'BP_LadaFrontBumper',         role: 'Front Bumper' },
    { pattern: 'BP_LadaRearBumper',          role: 'Rear Bumper' },
    { pattern: 'BP_Pontiac_FrontBumper',     role: 'Front Bumper' },
    { pattern: 'BP_Golf_FrontBumper',        role: 'Front Bumper' },
    { pattern: 'BP_PoyopaArmoredBumper',     role: 'Armored Bumper (Bull Bars)' },

    // ── Grille ────────────────────────────────────────────────
    { pattern: 'BP_UAZ_Grid',                role: 'Grille' },
    { pattern: 'BP_MusgoatGrid',             role: 'Grille' },
    { pattern: 'BP_C15_Grid',               role: 'Grille' },

    // ── Antenna ───────────────────────────────────────────────
    { pattern: 'BP_UAZ_Antena',              role: 'Antenna' },
    { pattern: 'BP_Golf_Antena',             role: 'Antenna' },

    // ── License Plate ─────────────────────────────────────────
    { pattern: 'BP_IFA_Plate',               role: 'License Plate' },
    { pattern: 'BP_C15_Plate_00',            role: 'Front License Plate' },
    { pattern: 'BP_C15_Plate_01',            role: 'Rear License Plate' },

    // ── Doors ─────────────────────────────────────────────────
    { pattern: 'CarDoorFL',                  role: 'Left Door' },
    { pattern: 'CarDoorFR',                  role: 'Right Door' },
    { pattern: 'CarDoorBL',                  role: 'Rear Left Door' },
    { pattern: 'CarDoorBR',                  role: 'Rear Right Door' },
    { pattern: 'BP_Pontiac_Door_FL',         role: 'Left Door' },
    { pattern: 'BP_Pontiac_Door_FR',         role: 'Right Door' },
    { pattern: 'LadaDoor_FL',               role: 'Front Left Door' },
    { pattern: 'LadaDoor_FR',               role: 'Front Right Door' },
    { pattern: 'BP_IFA_Door_FL',             role: 'Left Cab Door' },
    { pattern: 'BP_IFA_Door_FR',             role: 'Right Cab Door' },
    { pattern: 'BP_UAZ_Door_BR',             role: 'Rear Right Door' },
    { pattern: 'BP_C15_Door_RR',             role: 'Right Cargo Door' },
    { pattern: 'BP_IFA_UpDoor',              role: 'Interior Hatch' },

    // ── Poyopa-specific exterior ──────────────────────────────
    { pattern: 'BP_PoyopaRollBar',           role: 'Roll Bar' },
    { pattern: 'BP_PoyopaIndicatorLights',   role: 'Turn Signal Lights' },

    // ── Headlights ────────────────────────────────────────────
    { pattern: 'BP_IFA_Light_H',             role: 'Headlight' },
    { pattern: 'BP_LadaHeadLight',           role: 'Headlight' },
    { pattern: 'BP_UAZ_Light_01',            role: 'Headlight' },
    { pattern: 'BP_MusgoatHeadLights_1',     role: 'Left Headlight' },
    { pattern: 'BP_C15_Light_HL',            role: 'Left Headlight' },
    { pattern: 'BP_PoyopaHeadLight_R',       role: 'Right Headlight' },

    // ── Taillights ────────────────────────────────────────────
    { pattern: 'BP_IFA_Light_Backlight_L',   role: 'Left Taillight' },
    { pattern: 'BP_IFA_Light_Backlight_R',   role: 'Right Taillight' },
    { pattern: 'BP_MusgoatRearLightsLeft',   role: 'Left Taillight' },
    { pattern: 'BP_UAZ_Light_02',            role: 'Taillight' },

    // ── Turn Signals ──────────────────────────────────────────
    { pattern: 'BP_LadaIndicatorLightsLeft', role: 'Left Turn Signal' },

    // ── Other lights ──────────────────────────────────────────
    { pattern: 'BP_IFA_Light_L_FS_TS',       role: 'Left Side Light' },
    { pattern: 'BP_IFA_Light_Int',            role: 'Interior Light' },

    // ── Mirrors ───────────────────────────────────────────────
    { pattern: 'BP_Lada_Mirror_Left',         role: 'Left Side Mirror' },
    { pattern: 'BP_Musgoat_Mirror_Left',      role: 'Left Side Mirror' },
    { pattern: 'BP_Pontiac_DoorMirror_L',     role: 'Left Side Mirror' },
    { pattern: 'BP_IFA_Mirror_R',             role: 'Right Side Mirror' },
    { pattern: 'BP_Lada_Mirror_Right',        role: 'Right Side Mirror' },
    { pattern: 'BP_Golf_Mirror_Left',         role: 'Left Side Mirror' },
    { pattern: 'BP_Golf_Mirror_Right',        role: 'Right Side Mirror' },
  ];

  // ----------------------------------------------------------
  // ROLE_ALIASES
  // For each generic role, list possible part names to look up
  // in the active car's checklist (tried in order, first match wins).
  // This handles name differences across cars, e.g.:
  //   "Trunk Lid" (Dada)  → "Trunk (Hatch)" (Golf)
  //   "Left Cab Door" (IFA) → "Left Door" (Golf)
  //   "Left Headlight" (Musgoat) → "Headlight" (Golf/IFA)
  // ----------------------------------------------------------
  const ROLE_ALIASES = {
    'Engine':                      ['Engine'],
    'Radiator':                    ['Radiator'],
    'Battery':                     ['Battery'],
    'Ignition':                    ['Ignition'],
    'Steering Wheel':              ['Steering Wheel'],
    'Shifter':                     ['Shifter'],
    'Handbrake':                   ['Handbrake'],
    'Radio':                       ['Radio'],
    'Gas Pedal':                   ['Gas Pedal'],
    'Brake Pedal':                 ['Brake Pedal'],
    'Clutch Pedal':                ['Clutch Pedal'],
    'Pedal Assembly':              ['Pedal Assembly'],
    'Dashboard':                   ['Dashboard'],
    'Front Seat':                  ['Front Seat', 'Seat'],
    'Rear Seat Bench':             ['Rear Seat Bench', 'Rear Seat'],
    'Right Rear Seat':             ['Right Rear Seat'],
    'Left Rear Seat':              ['Left Rear Seat'],
    'Rear Shelf':                  ['Rear Shelf'],
    'Left Floor Mat':              ['Left Floor Mat'],
    'Right Floor Mat':             ['Right Floor Mat'],
    'Left Door Panel':             ['Left Door Panel', 'Front Left Door Panel'],
    'Right Door Panel':            ['Right Door Panel', 'Front Right Door Panel'],
    'Left Cargo Door Panel':       ['Left Cargo Door Panel'],
    'Right Cargo Door Panel':      ['Right Cargo Door Panel'],
    'Left Sun Visor':              ['Left Sun Visor'],
    'Right Sun Visor':             ['Right Sun Visor'],
    'Glovebox Lid':                ['Glovebox Lid'],
    'Console Lid':                 ['Console Lid', 'Glovebox Lid'],
    'Parcel Shelf':                ['Parcel Shelf'],
    'Hood':                        ['Hood'],
    // Trunk names vary by car
    'Trunk Lid':                   ['Trunk Lid', 'Trunk (Hatch)', 'Tailgate'],
    'Tailgate':                    ['Tailgate', 'Trunk Lid', 'Trunk (Hatch)'],
    'Front Bumper':                ['Front Bumper'],
    'Rear Bumper':                 ['Rear Bumper'],
    'Armored Bumper (Bull Bars)':  ['Armored Bumper (Bull Bars)', 'Front Armored Bumper'],
    'Grille':                      ['Grille', 'Left Grille'],
    'Antenna':                     ['Antenna'],
    'License Plate':               ['License Plate', 'Front License Plate'],
    'Front License Plate':         ['Front License Plate', 'License Plate'],
    'Rear License Plate':          ['Rear License Plate', 'License Plate'],
    // Door names vary by car
    'Left Door':                   ['Left Door', 'Front Left Door'],
    'Right Door':                  ['Right Door', 'Front Right Door'],
    'Front Left Door':             ['Front Left Door', 'Left Door'],
    'Front Right Door':            ['Front Right Door', 'Right Door'],
    'Left Cab Door':               ['Left Cab Door', 'Left Door', 'Front Left Door'],
    'Right Cab Door':              ['Right Cab Door', 'Right Door', 'Front Right Door'],
    'Rear Left Door':              ['Rear Left Door'],
    'Rear Right Door':             ['Rear Right Door'],
    'Left Cargo Door':             ['Left Cargo Door'],
    'Right Cargo Door':            ['Right Cargo Door'],
    'Interior Hatch':              ['Interior Hatch'],
    'Roll Bar':                    ['Roll Bar'],
    'Turn Signal Lights':          ['Turn Signal Lights'],
    // Headlights: singular "Headlight" can satisfy "Left Headlight" need and vice-versa
    'Headlight':                   ['Headlight', 'Left Headlight'],
    'Left Headlight':              ['Left Headlight', 'Headlight'],
    'Right Headlight':             ['Right Headlight', 'Headlight'],
    // Taillights similarly
    'Taillight':                   ['Taillight', 'Left Taillight'],
    'Left Taillight':              ['Left Taillight', 'Taillight', 'Left Rear Light'],
    'Right Taillight':             ['Right Taillight', 'Taillight', 'Right Rear Light'],
    'Left Turn Signal':            ['Left Turn Signal'],
    'Right Turn Signal':           ['Right Turn Signal'],
    'Left Side Light':             ['Left Side Light'],
    'Interior Light':              ['Interior Light'],
    // Mirrors
    'Left Side Mirror':            ['Left Side Mirror'],
    'Right Side Mirror':           ['Right Side Mirror'],
    // Glass — listed for completeness; cannot be auto-detected from save
    'Front Windshield':            ['Front Windshield'],
    'Rear Window':                 ['Rear Window'],
    'Left Window':                 ['Left Window'],
    'Right Window':                ['Right Window'],
  };

  // ----------------------------------------------------------
  // Scan the binary save file for known patterns → collect roles
  // ----------------------------------------------------------
  function scanForRoles(bytes) {
    const strings = extractUEStrings(bytes);
    const haystack = strings.map(s => s.value).join('\n');
    const detectedRoles = new Set();
    for (const mapping of SAVE_PART_MAP) {
      if (mapping.role && haystack.includes(mapping.pattern)) {
        detectedRoles.add(mapping.role);
      }
    }
    return detectedRoles;
  }

  // ----------------------------------------------------------
  // Match detected roles against the active car's checklist.
  // Returns array of {category, partName, key} matched parts.
  // Prevents double-matching: if "Left Headlight" and "Headlight"
  // both resolve to the same part key, it's only counted once.
  // ----------------------------------------------------------
  function matchRolesToActiveCar(detectedRoles) {
    const { CARS_DATA, getPartKey, getActiveCar } = window.DBH;
    const car = CARS_DATA.find(c => c.id === getActiveCar());
    if (!car) return [];

    // Build lookup: normalized part name → {category, partName}
    const carPartsLookup = new Map();
    car.categories.forEach(cat => {
      cat.parts.forEach(partName => {
        carPartsLookup.set(partName.toLowerCase(), { category: cat.name, partName });
      });
    });

    const matched = [];
    const matchedKeys = new Set();

    for (const role of detectedRoles) {
      const aliases = ROLE_ALIASES[role] || [role];
      for (const alias of aliases) {
        const entry = carPartsLookup.get(alias.toLowerCase());
        if (entry) {
          const key = getPartKey(car.id, entry.category, entry.partName);
          if (!matchedKeys.has(key)) {
            matchedKeys.add(key);
            matched.push({ category: entry.category, partName: entry.partName, key });
          }
          break; // stop trying aliases once matched
        }
      }
    }

    // Sort by the car's original category/part order for clean display
    const carOrder = [];
    car.categories.forEach(cat => {
      cat.parts.forEach(partName => {
        carOrder.push(getPartKey(car.id, cat.name, partName));
      });
    });
    matched.sort((a, b) => carOrder.indexOf(a.key) - carOrder.indexOf(b.key));

    return matched;
  }

  // ----------------------------------------------------------
  // Process a dropped / selected file
  // ----------------------------------------------------------
  function processFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bytes = new Uint8Array(e.target.result);
      const detectedRoles = scanForRoles(bytes);
      const matched = matchRolesToActiveCar(detectedRoles);
      showResults(matched);
    };
    reader.readAsArrayBuffer(file);
  }

  // ----------------------------------------------------------
  // Show import results inside the modal
  // ----------------------------------------------------------
  function showResults(matched) {
    const { CARS_DATA, getActiveCar } = window.DBH;
    const car = CARS_DATA.find(c => c.id === getActiveCar());
    const carName = car ? car.name : getActiveCar();

    // Group by category, preserving order
    const byCategory = new Map();
    matched.forEach(m => {
      if (!byCategory.has(m.category)) byCategory.set(m.category, []);
      byCategory.get(m.category).push(m);
    });

    // Count already-checked
    let alreadyChecked = 0;
    try {
      const raw = localStorage.getItem('dbh_checklist_v1');
      const s = raw ? JSON.parse(raw) : {};
      matched.forEach(m => { if (s[m.key]) alreadyChecked++; });
    } catch (_) {}
    const newCount = matched.length - alreadyChecked;

    const summaryEl = document.getElementById('import-summary');
    const listEl    = document.getElementById('import-car-list');
    const applyBtn  = document.getElementById('import-apply');

    if (matched.length === 0) {
      summaryEl.innerHTML =
        `<span class="import-none">No parts matching <strong>${carName}</strong>'s checklist were found in this save file.</span>`;
    } else {
      summaryEl.innerHTML =
        `<strong>${carName}</strong>: found <strong>${matched.length}</strong>` +
        ` matching part${matched.length !== 1 ? 's' : ''}` +
        (newCount > 0
          ? ` &mdash; <span class="import-new">${newCount} new</span>`
          : ' (all already checked)');
    }

    listEl.innerHTML = '';
    byCategory.forEach((parts, catName) => {
      const div = document.createElement('div');
      div.className = 'import-car-block';
      div.innerHTML =
        `<div class="import-car-name">${catName}` +
        ` <span class="import-car-count">${parts.length} part${parts.length !== 1 ? 's' : ''}</span></div>`;
      const ul = document.createElement('ul');
      ul.className = 'import-part-list';
      parts.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.partName;
        ul.appendChild(li);
      });
      div.appendChild(ul);
      listEl.appendChild(div);
    });

    applyBtn.style.display = matched.length > 0 ? 'inline-flex' : 'none';
    applyBtn.onclick = () => {
      const stats = window.DBH.importParts(matched.map(m => m.key));
      summaryEl.innerHTML =
        `<span class="import-success">&#10003; Applied to ${carName}: ` +
        `${stats.newlyChecked} part${stats.newlyChecked !== 1 ? 's' : ''} checked` +
        (stats.alreadyChecked > 0 ? `, ${stats.alreadyChecked} already checked` : '') +
        '</span>';
      applyBtn.style.display = 'none';
    };

    document.getElementById('import-results').style.display = 'block';
    document.getElementById('drop-zone').style.display = 'none';
    document.getElementById('analyzer-desc').style.display = 'none';
  }

  // ----------------------------------------------------------
  // Modal open / close / reset
  // ----------------------------------------------------------
  document.getElementById('btn-analyze-save').addEventListener('click', () => {
    updateModalDesc();
    resetModal();
    document.getElementById('analyzer-overlay').style.display = 'flex';
  });

  document.getElementById('analyzer-close').addEventListener('click', closeModal);

  document.getElementById('analyzer-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('analyzer-overlay')) closeModal();
  });

  document.getElementById('import-scan-again').addEventListener('click', () => {
    updateModalDesc();
    resetModal();
  });

  function closeModal() {
    document.getElementById('analyzer-overlay').style.display = 'none';
  }

  function resetModal() {
    document.getElementById('import-results').style.display = 'none';
    document.getElementById('drop-zone').style.display = 'block';
    document.getElementById('analyzer-desc').style.display = 'block';
    document.getElementById('sav-file-input').value = '';
  }

  function updateModalDesc() {
    const { CARS_DATA, getActiveCar } = window.DBH;
    const car = CARS_DATA.find(c => c.id === getActiveCar());
    const carName = car ? car.name : getActiveCar();
    document.getElementById('analyzer-desc').innerHTML =
      `Drop your <strong>Garage.sav</strong> or <strong>SAVE_&hellip;</strong> file to automatically` +
      ` check off parts found for <strong>${carName}</strong>.` +
      ` To import for a different car, close this dialog and select it in the sidebar first.` +
      ` Processed entirely in your browser &mdash; nothing is uploaded.`;
  }

  // ----------------------------------------------------------
  // Drag & drop / file input
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
  // UE5 string extraction (GVAS length-prefixed format)
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
