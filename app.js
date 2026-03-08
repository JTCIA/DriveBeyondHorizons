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
  // ─── Data below is sourced from Garage.sav item catalog ───────────────────
  {
    id: "triclops",
    name: "TriClops",
    inspiration: "Tucker 48",
    totalParts: 35,
    note: "Required for 'TriClops Restorer' achievement. The center headlight rotated with the steering wheel on the original Tucker 48.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Front Left Door",
          "Front Right Door",
          "Rear Left Door",
          "Rear Right Door",
          "Front Bumper",
          "Rear Bumper",
          "Grille",
          "Fuel Tank Lid",
          "License Plate"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
          "Rear Seat",
          "Front Left Door Panel",
          "Front Right Door Panel",
          "Rear Left Door Panel",
          "Rear Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Sun Visor",
          "Right Sun Visor"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Headlight",
          "Taillight",
          "Left Interior Light",
          "Right Interior Light"
        ]
      }
    ]
  },
  {
    id: "ifa",
    name: "IFA",
    inspiration: "IFA W50 (East German truck)",
    totalParts: 31,
    note: "Diesel vehicle. Petrol engine is usable if diesel is removed. Required for 'IFA Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Front Bumper",
          "Left Cab Door",
          "Right Cab Door",
          "Battery Access Door",
          "Interior Hatch",
          "License Plate",
          "Rear Bed Cover"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Ignition",
          "Radio",
          "Brake Pedal",
          "Gas Pedal",
          "Glovebox Lid",
          "Left Floor Mat",
          "Right Floor Mat"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Headlight",
          "Left Side Light",
          "Right Side Light",
          "Left Taillight",
          "Right Taillight",
          "Interior Light"
        ]
      }
    ]
  },
  {
    id: "musgoat",
    name: "Musgoat",
    inspiration: "1967 Ford Mustang fastback",
    totalParts: 19,
    note: "Has four headlights (two per side). Required for 'Musgoat Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Left Door",
          "Right Door",
          "Front Bumper",
          "Rear Bumper",
          "Grille",
          "Fuel Tank Lid"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Shifter",
          "Pedal Assembly",
          "Front Seat"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Auxiliary Headlight",
          "Right Auxiliary Headlight",
          "Left Taillight",
          "Right Taillight"
        ]
      }
    ]
  },
  {
    id: "gtr",
    name: "GTR",
    inspiration: "Nissan Skyline GT-R",
    totalParts: 29,
    note: "2-door coupe. Required for 'GTR Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Ignition"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Left Door",
          "Right Door",
          "Front Bumper",
          "Rear Bumper",
          "Grille",
          "License Plate"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
          "Rear Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Glovebox Lid",
          "Left Sun Visor",
          "Right Sun Visor"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight"
        ]
      }
    ]
  },
  {
    id: "poyopa",
    name: "Poyopa",
    inspiration: "Toyota Hilux",
    totalParts: 26,
    note: "Diesel vehicle. Required for 'Poyopa Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Ignition"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Tailgate",
          "Left Door",
          "Right Door",
          "Front Bumper",
          "Armored Bumper (Bull Bars)",
          "Grille",
          "Fuel Tank Lid",
          "Roll Bar",
          "Turn Signal Lights"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Pedal Assembly",
          "Glovebox Lid",
          "Console Lid"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight"
        ]
      }
    ]
  },
  {
    id: "dada",
    name: "Dada",
    inspiration: "VAZ-2101 / Lada 1200",
    totalParts: 23,
    note: "Hidden fuel tank lid is inside the right rear fender well! Required for 'Dada Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Front Left Door",
          "Front Right Door",
          "Rear Left Door",
          "Rear Right Door",
          "Front Bumper",
          "Rear Bumper",
          "Grille",
          "Fuel Tank Lid"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
          "Handbrake",
          "Shifter",
          "Pedal Assembly",
          "Rear Shelf"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Headlight",
          "Left Turn Signal",
          "Right Turn Signal",
          "Left Rear Light",
          "Right Rear Light"
        ]
      }
    ]
  },
  {
    id: "bonphiac",
    name: "Bonphiac",
    inspiration: "Pontiac Firebird",
    totalParts: 35,
    note: "Required for 'Bonphiac Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Air Filter"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk Lid",
          "Left Door",
          "Right Door",
          "Front Bumper",
          "Rear Bumper",
          "Left Grille",
          "Right Grille",
          "Fuel Tank Lid",
          "License Plate"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
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
          "Left Sun Visor",
          "Right Sun Visor"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Taillight",
          "Right Taillight"
        ]
      }
    ]
  },
  {
    id: "golf",
    name: "Golf",
    inspiration: "Volkswagen Golf (3-door hatchback)",
    totalParts: 35,
    note: "Required for 'Golf Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Ignition"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Trunk (Hatch)",
          "Left Door",
          "Right Door",
          "Front Bumper",
          "Rear Bumper",
          "Front Spoiler",
          "Grille",
          "Antenna",
          "License Plate"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
          "Rear Seat Bench",
          "Left Door Panel",
          "Right Door Panel",
          "Shifter",
          "Handbrake",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Glovebox Lid",
          "Parcel Shelf",
          "Left Sun Visor",
          "Right Sun Visor"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Headlight",
          "Left Taillight",
          "Right Taillight"
        ]
      }
    ]
  },
  {
    id: "c18",
    name: "C18",
    inspiration: "Citroën C15 (panel van)",
    totalParts: 32,
    note: "Diesel vehicle. Required for 'C18 Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Ignition"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Hood",
          "Left Front Door",
          "Right Front Door",
          "Left Cargo Door",
          "Right Cargo Door",
          "Front Bumper",
          "Rear Bumper",
          "Grille",
          "Antenna",
          "Front License Plate",
          "Rear License Plate"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
          "Left Cargo Door Panel",
          "Right Cargo Door Panel",
          "Shifter",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Glovebox Lid",
          "Left Sun Visor",
          "Right Sun Visor"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Left Headlight",
          "Right Headlight",
          "Left Taillight",
          "Right Taillight"
        ]
      }
    ]
  },
  {
    id: "uaz",
    name: "UAZ",
    inspiration: "UAZ-452 compact van",
    totalParts: 38,
    note: "Left and right side windows look identical but are NOT interchangeable. Ladder can only be attached to the rear right door. Required for 'UAZ Restorer' achievement.",
    categories: [
      {
        name: "Engine Parts",
        parts: [
          "Engine",
          "Radiator",
          "Battery",
          "Ignition"
        ]
      },
      {
        name: "Exterior Parts",
        parts: [
          "Front Left Door",
          "Front Right Door",
          "Rear Left Door",
          "Rear Right Door",
          "Side Door",
          "Upper Rear Door",
          "Front Armored Bumper",
          "Rear Bumper",
          "Grille",
          "Antenna",
          "License Plate",
          "Ladder",
          "Roof Storage Box"
        ]
      },
      {
        name: "Interior Parts",
        parts: [
          "Dashboard",
          "Steering Wheel",
          "Front Seat",
          "Rear Seat",
          "Front Left Door Panel",
          "Front Right Door Panel",
          "Side Door Panel",
          "Shifter",
          "Handbrake",
          "Radio",
          "Gas Pedal",
          "Brake Pedal",
          "Clutch Pedal",
          "Left Floor Mat",
          "Right Floor Mat",
          "Left Sun Visor",
          "Right Sun Visor",
          "Table",
          "Interior Wall Panel"
        ]
      },
      {
        name: "Lights",
        parts: [
          "Headlight",
          "Taillight"
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
