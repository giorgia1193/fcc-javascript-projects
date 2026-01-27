const API_BASE = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

const creatureNameEl = document.getElementById("creature-name");
const creatureIdEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");

const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const spAttackEl = document.getElementById("special-attack");
const spDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

function clearUI() {
  creatureNameEl.textContent = "—";
  creatureIdEl.textContent = "—";
  weightEl.textContent = "Weight: —";
  heightEl.textContent = "Height: —";

  typesEl.innerHTML = "";

  hpEl.textContent = "—";
  attackEl.textContent = "—";
  defenseEl.textContent = "—";
  spAttackEl.textContent = "—";
  spDefenseEl.textContent = "—";
  speedEl.textContent = "—";
}

function setStat(statName, value) {
  const map = {
    "hp": hpEl,
    "attack": attackEl,
    "defense": defenseEl,
    "special-attack": spAttackEl,
    "special-defense": spDefenseEl,
    "speed": speedEl,
  };
  if (map[statName]) map[statName].textContent = String(value);
}

async function fetchCreature(query) {
  const url = API_BASE + encodeURIComponent(query);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Creature not found");
  return res.json();
}

function fillUI(data) {
  creatureNameEl.textContent = String(data.name || "").toUpperCase();
  creatureIdEl.textContent = `#${data.id}`;

  weightEl.textContent = `Weight: ${data.weight}`;
  heightEl.textContent = `Height: ${data.height}`;

  typesEl.innerHTML = "";
  (data.types || []).forEach((t) => {
  const badge = document.createElement("span");
  badge.className = "type-badge";

  const typeName = String(t.name || "").toUpperCase();
  badge.textContent = typeName;

  badge.dataset.type = typeName;

  typesEl.appendChild(badge);
});


  (data.stats || []).forEach((s) => {
    setStat(s.name, s.base_stat);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const raw = input.value.trim();
  if (!raw) return;

  const query = raw.toLowerCase();

  try {
    clearUI();
    const data = await fetchCreature(query);
    fillUI(data);
  } catch (err) {
    clearUI();
    alert("Creature not found");
  }
});
