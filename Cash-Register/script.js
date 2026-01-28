let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueEl = document.getElementById("change-due");
const priceDisplay = document.getElementById("price-display");
const cidDisplay = document.getElementById("cid-display");

const DENOMS = [
  { name: "ONE HUNDRED", val: 100.0 },
  { name: "TWENTY", val: 20.0 },
  { name: "TEN", val: 10.0 },
  { name: "FIVE", val: 5.0 },
  { name: "ONE", val: 1.0 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 },
];

const toCents = (n) => Math.round(Number(n) * 100);
const fromCents = (c) => c / 100;

const formatMoney = (n) => {
  const s = Number(n).toFixed(2);
  return `$${s.replace(/\.?0+$/, "")}`;
};

const totalCidCents = (cidArr) =>
  cidArr.reduce((sum, [, amt]) => sum + toCents(amt), 0);

function renderPrice() {
  if (!priceDisplay) return;
  priceDisplay.textContent = formatMoney(price);
}

function renderCid() {
  if (!cidDisplay) return;
  cidDisplay.innerHTML = cid
    .slice()
    .reverse()
    .map(
      ([name, amt]) => `
        <div class="cid-item">
          <span class="cid-name">${name}</span>
          <span class="cid-amt">${formatMoney(amt)}</span>
        </div>
      `
    )
    .join("");
}

function renderChangeText(text) {
  changeDueEl.textContent = text;
}

function buildStatusLine(status, breakdown) {
  if (!breakdown || breakdown.length === 0) return `Status: ${status}`;
  const parts = breakdown.map(([name, amt]) => `${name}: ${formatMoney(amt)}`);
  return `Status: ${status} ${parts.join(" ")}`;
}

function getChangeBreakdown(changeDueCents, cidArr) {
  const drawer = new Map(cidArr.map(([name, amt]) => [name, toCents(amt)]));
  const breakdown = [];

  let remaining = changeDueCents;

  for (const d of DENOMS) {
    const denomCents = toCents(d.val);
    let available = drawer.get(d.name) || 0;

    if (remaining <= 0) break;
    if (available <= 0) continue;

    const maxCanTake = Math.min(available, Math.floor(remaining / denomCents) * denomCents);

    if (maxCanTake > 0) {
      breakdown.push([d.name, fromCents(maxCanTake)]);
      remaining -= maxCanTake;
      drawer.set(d.name, available - maxCanTake);
    }
  }

  return { remaining, breakdown };
}

purchaseBtn.addEventListener("click", () => {
  const cash = Number(cashInput.value);

  if (!Number.isFinite(cash)) {
    renderChangeText("Please enter a valid amount.");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    renderChangeText("No change due - customer paid with exact cash");
    return;
  }

  const changeDueCents = toCents(cash) - toCents(price);
  const drawerTotalCents = totalCidCents(cid);

  if (drawerTotalCents < changeDueCents) {
    renderChangeText("Status: INSUFFICIENT_FUNDS");
    return;
  }

  const { remaining, breakdown } = getChangeBreakdown(changeDueCents, cid);

  if (remaining !== 0) {
    renderChangeText("Status: INSUFFICIENT_FUNDS");
    return;
  }

  if (drawerTotalCents === changeDueCents) {
    renderChangeText(buildStatusLine("CLOSED", breakdown));
    return;
  }

  renderChangeText(buildStatusLine("OPEN", breakdown));
});

renderPrice();
renderCid();
