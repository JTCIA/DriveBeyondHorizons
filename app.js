const CARS_DATA = [
  {
    id: "kart",
    name: "Kart",
    inspiration: "Go-kart",
    totalParts: 24,
    note: "Found only in the Backrooms. Required for 'Kart Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Battery"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Front Fairing",
          "Rear Fairing",
          "Side Panel (Left)",
          "Side Panel (Right)",
          "Seat Fairing",
          "Nose Cone",
          "Floor Pan"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Front Light",
          "Rear Light",
          "Left Side Light",
          "Right Side Light",
          "Number Plate Light",
          "Steering Wheel",
          "Pedal Assembly"
        ]
      }
    ]
  },
  {
    id: "triclops",
    name: "TriClops",
    inspiration: "Tucker 48",
    totalParts: 54,
    note: "Required for 'TriClops Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Windshield",
          "Rear Window",
          "Left Door",
          "Right Door",
          "Left Side Window",
          "Right Side Window",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)",
          "Left Door Glass",
          "Right Door Glass"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Rear Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Center Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal",
          "Right Turn Signal"
        ]
      }
    ]
  },
  {
    id: "ifa",
    name: "IFA",
    inspiration: "IFA W50 (East German truck)",
    totalParts: 51,
    note: "Diesel vehicle. Petrol engine is usable if diesel is removed. Required for 'IFA Restorer' achievement (Very Rare ~7.85%).",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery 180A"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Windshield",
          "Left Corner Window",
          "Right Corner Window",
          "Front Bumper",
          "License Plate (Front)",
          "License Plate (Rear)",
          "Battery Hatch",
          "Roof Hatch",
          "Grille",
          "Left Door",
          "Right Door",
          "Left Door Glass",
          "Right Door Glass",
          "Hood",
          "Fuel Tank Lid"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Interior Dome Light (Left)",
          "Interior Dome Light (Right)"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal",
          "Right Turn Signal",
          "Left Rear Light",
          "Right Rear Light"
        ]
      }
    ]
  },
  {
    id: "musgoat",
    name: "Musgoat",
    inspiration: "1967 Ford Mustang fastback",
    totalParts: 49,
    note: "Interior dome light is pre-installed and cannot be removed. Door windows cannot be re-attached if they pop out. Required for 'Musgoat Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Windshield",
          "Rear Window",
          "Left Door",
          "Right Door",
          "Left Door Glass",
          "Right Door Glass",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal",
          "Right Turn Signal"
        ]
      }
    ]
  },
  {
    id: "gtr",
    name: "GTR",
    inspiration: "Nissan Skyline GT-R",
    totalParts: 55,
    note: "Front-style seats must not be placed in the rear. Required for 'GTR Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Turbo",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Windshield",
          "Rear Window",
          "Left Door",
          "Right Door",
          "Left Door Glass",
          "Right Door Glass",
          "Left Quarter Window",
          "Right Quarter Window",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Rear Seat",
          "Right Rear Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal (Front)",
          "Right Turn Signal (Front)",
          "Left Turn Signal (Rear)",
          "Right Turn Signal (Rear)",
          "Interior Dome Light"
        ]
      }
    ]
  },
  {
    id: "poyopa",
    name: "Poyopa",
    inspiration: "Toyota Hilux",
    totalParts: 56,
    note: "Diesel vehicle. Turbo required for 'Poyopa Restorer' achievement. Required for 'Poyopa Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Turbo"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Windshield",
          "Rear Window",
          "Left Door",
          "Right Door",
          "Bull Bars",
          "Fuel Tank Lid",
          "Left Mirror",
          "Right Mirror",
          "Grille",
          "Front Bumper",
          "License Plate",
          "Tailgate",
          "Roll Bar"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid",
          "Center Console Lid",
          "Left Seatbelt Pillar Loop",
          "Right Seatbelt Pillar Loop",
          "Left Seatbelt Buckle",
          "Right Seatbelt Buckle"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Turn Signal",
          "Right Turn Signal",
          "Left Taillight",
          "Right Taillight",
          "Left Roll Bar Light",
          "Right Roll Bar Light",
          "Left Interior Dome Light",
          "Right Interior Dome Light"
        ]
      }
    ]
  },
  {
    id: "dada",
    name: "Dada",
    inspiration: "VAZ-2101 / Lada 1200",
    totalParts: 59,
    note: "Hidden fuel tank lid is inside the right rear fender well! Required for 'Dada Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Windshield",
          "Rear Window",
          "Left Door (Front)",
          "Right Door (Front)",
          "Left Door (Rear)",
          "Right Door (Rear)",
          "Left Door Glass (Front)",
          "Right Door Glass (Front)",
          "Left Door Glass (Rear)",
          "Right Door Glass (Rear)",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Rear Seat",
          "Right Rear Seat",
          "Left Front Door Panel",
          "Right Front Door Panel",
          "Left Rear Door Panel",
          "Right Rear Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid",
          "Interior Dome Light"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal (Front)",
          "Right Turn Signal (Front)",
          "Left Turn Signal (Rear)",
          "Right Turn Signal (Rear)"
        ]
      }
    ]
  },
  {
    id: "bonphiac",
    name: "Bonphiac",
    inspiration: "Pontiac Firebird",
    totalParts: 59,
    note: "Required for 'Bonphiac Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "V8 Engine",
          "Radiator",
          "Battery",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Windshield",
          "Rear Window",
          "Left Door",
          "Right Door",
          "Left Door Glass",
          "Right Door Glass",
          "Left Quarter Window",
          "Right Quarter Window",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Hood Scoop",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Rear Seat",
          "Right Rear Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid",
          "Interior Dome Light",
          "Visor (Left)",
          "Visor (Right)"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal (Front)",
          "Right Turn Signal (Front)",
          "Left Turn Signal (Rear)",
          "Right Turn Signal (Rear)"
        ]
      }
    ]
  },
  {
    id: "golf",
    name: "Golf",
    inspiration: "Volkswagen Golf",
    totalParts: 59,
    note: "Turbo required for 'Golf Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Turbo",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Windshield",
          "Rear Window",
          "Left Door (Front)",
          "Right Door (Front)",
          "Left Door (Rear)",
          "Right Door (Rear)",
          "Left Door Glass (Front)",
          "Right Door Glass (Front)",
          "Left Door Glass (Rear)",
          "Right Door Glass (Rear)",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Rear Seat",
          "Right Rear Seat",
          "Left Front Door Panel",
          "Right Front Door Panel",
          "Left Rear Door Panel",
          "Right Rear Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid",
          "Interior Dome Light"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal (Front)",
          "Right Turn Signal (Front)",
          "Left Turn Signal (Rear)",
          "Right Turn Signal (Rear)"
        ]
      }
    ]
  },
  {
    id: "c18",
    name: "C18",
    inspiration: "Citroën C15 (panel van)",
    totalParts: 63,
    note: "Diesel vehicle. Required for 'C18 Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Rear Cargo Door (Left)",
          "Rear Cargo Door (Right)",
          "Windshield",
          "Left Door",
          "Right Door",
          "Left Door Glass",
          "Right Door Glass",
          "Left Rear Side Window",
          "Right Rear Side Window",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)",
          "Left Sliding Door",
          "Roof Panel"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Cargo Partition",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid",
          "Interior Dome Light"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal (Front)",
          "Right Turn Signal (Front)",
          "Left Turn Signal (Rear)",
          "Right Turn Signal (Rear)",
          "Interior Cargo Light",
          "Rear Fog Light",
          "Reverse Light",
          "License Plate Light",
          "Side Marker Light (Left)",
          "Side Marker Light (Right)"
        ]
      }
    ]
  },
  {
    id: "uaz",
    name: "UAZ",
    inspiration: "UAZ compact van",
    totalParts: 81,
    note: "Left and right side windows look identical but are NOT interchangeable. Ladder can only be attached to the rear right door. Required for 'UAZ Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Horn"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Hood Scoop",
          "Windshield",
          "Rear Window",
          "Left Front Door",
          "Right Front Door",
          "Left Rear Door",
          "Right Rear Door",
          "Rear Hatch Door",
          "Left Front Door Glass",
          "Right Front Door Glass",
          "Left Side Window",
          "Right Side Window",
          "Left Large Side Window",
          "Right Large Side Window",
          "Front Bumper",
          "Rear Bumper",
          "Left Mirror",
          "Right Mirror",
          "Fuel Tank Lid",
          "Grille",
          "License Plate (Front)",
          "License Plate (Rear)",
          "Roll Bar",
          "Left Front Fender",
          "Right Front Fender",
          "Left Rear Fender",
          "Right Rear Fender",
          "Spare Tire Mount",
          "Antenna"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Left Front Seat",
          "Right Front Seat",
          "Left Rear Seat",
          "Right Rear Seat",
          "Left Front Door Panel",
          "Right Front Door Panel",
          "Left Rear Door Panel",
          "Right Rear Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid",
          "Center Console Lid",
          "Visor (Left)",
          "Visor (Right)",
          "Interior Dome Light (Front)",
          "Interior Dome Light (Rear)",
          "Left Seatbelt Pillar Loop",
          "Right Seatbelt Pillar Loop",
          "Left Seatbelt Buckle",
          "Right Seatbelt Buckle",
          "Cargo Bed Panel"
        ]
      },
      {
        name: "Wheel Parts",
        parts: [
          "Front Left Wheel",
          "Front Right Wheel",
          "Rear Left Wheel",
          "Rear Right Wheel",
          "Spare Wheel",
          "Front Left Tire",
          "Front Right Tire",
          "Rear Left Tire",
          "Rear Right Tire",
          "Spare Tire"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight",
          "Left Turn Signal (Front)",
          "Right Turn Signal (Front)",
          "Left Turn Signal (Rear)",
          "Right Turn Signal (Rear)",
          "Left Roll Bar Light",
          "Right Roll Bar Light",
          "Reverse Light",
          "License Plate Light"
        ]
      }
    ]
  }
];

// --- State Management ---
const STORAGE_KEY = "dbh_checklist_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getPartKey(carId, categoryName, partName) {
  return `${carId}::${categoryName}::${partName}`;
}

// --- UI Rendering ---
let state = loadState();
let activeCar = CARS_DATA[0].id;

function getCarProgress(car, state) {
  const allParts = car.categories.flatMap(cat =>
    cat.parts.map(p => getPartKey(car.id, cat.name, p))
  );
  const checked = allParts.filter(k => state[k]).length;
  return { checked, total: allParts.length };
}

function renderSidebar() {
  const list = document.getElementById("car-list");
  list.innerHTML = "";
  CARS_DATA.forEach(car => {
    const { checked, total } = getCarProgress(car, state);
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
    const isComplete = checked === total;
    const li = document.createElement("li");
    li.className = "car-item" + (car.id === activeCar ? " active" : "") + (isComplete ? " complete" : "");
    li.innerHTML = `
      <div class="car-item-header">
        <span class="car-name">${car.name}</span>
        <span class="car-count ${isComplete ? 'complete' : ''}">${checked}/${total}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
    `;
    li.addEventListener("click", () => {
      activeCar = car.id;
      renderSidebar();
      renderMain();
    });
    list.appendChild(li);
  });
}

function renderMain() {
  const car = CARS_DATA.find(c => c.id === activeCar);
  if (!car) return;

  const { checked, total } = getCarProgress(car, state);
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
  const isComplete = checked === total;

  document.getElementById("car-title").textContent = car.name;
  document.getElementById("car-inspiration").textContent = car.inspiration;
  document.getElementById("car-note").textContent = car.note || "";
  document.getElementById("overall-progress-text").textContent = `${checked} / ${total} parts (${pct}%)`;
  document.getElementById("overall-progress-fill").style.width = `${pct}%`;
  document.getElementById("overall-progress-fill").className = "progress-fill" + (isComplete ? " complete" : "");

  const completionBanner = document.getElementById("completion-banner");
  completionBanner.style.display = isComplete ? "block" : "none";

  const categoriesEl = document.getElementById("categories");
  categoriesEl.innerHTML = "";

  car.categories.forEach(cat => {
    const catParts = cat.parts.map(p => ({
      name: p,
      key: getPartKey(car.id, cat.name, p),
      checked: !!state[getPartKey(car.id, cat.name, p)]
    }));
    const catChecked = catParts.filter(p => p.checked).length;
    const catTotal = catParts.length;
    const catComplete = catChecked === catTotal;

    const section = document.createElement("section");
    section.className = "category" + (catComplete ? " complete" : "");

    section.innerHTML = `
      <div class="category-header">
        <h3 class="category-name">${cat.name}</h3>
        <span class="category-count ${catComplete ? 'complete' : ''}">${catChecked}/${catTotal}</span>
      </div>
      <ul class="parts-list">
        ${catParts.map(part => `
          <li class="part-item ${part.checked ? 'checked' : ''}">
            <label>
              <input type="checkbox" data-key="${part.key}" ${part.checked ? 'checked' : ''}>
              <span class="part-name">${part.name}</span>
              ${part.checked ? '<span class="checkmark">&#10003;</span>' : ''}
            </label>
          </li>
        `).join("")}
      </ul>
    `;

    section.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener("change", (e) => {
        const key = e.target.dataset.key;
        if (e.target.checked) {
          state[key] = true;
        } else {
          delete state[key];
        }
        saveState(state);
        renderSidebar();
        renderMain();
      });
    });

    categoriesEl.appendChild(section);
  });
}

function resetCarProgress() {
  const car = CARS_DATA.find(c => c.id === activeCar);
  if (!car) return;
  if (!confirm(`Reset all progress for ${car.name}?`)) return;
  car.categories.forEach(cat => {
    cat.parts.forEach(p => {
      delete state[getPartKey(car.id, cat.name, p)];
    });
  });
  saveState(state);
  renderSidebar();
  renderMain();
}

function resetAllProgress() {
  if (!confirm("Reset ALL progress for ALL cars? This cannot be undone.")) return;
  state = {};
  saveState(state);
  renderSidebar();
  renderMain();
}

function checkAllParts() {
  const car = CARS_DATA.find(c => c.id === activeCar);
  if (!car) return;
  car.categories.forEach(cat => {
    cat.parts.forEach(p => {
      state[getPartKey(car.id, cat.name, p)] = true;
    });
  });
  saveState(state);
  renderSidebar();
  renderMain();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderMain();

  document.getElementById("btn-reset-car").addEventListener("click", resetCarProgress);
  document.getElementById("btn-reset-all").addEventListener("click", resetAllProgress);
  document.getElementById("btn-check-all").addEventListener("click", checkAllParts);
});
