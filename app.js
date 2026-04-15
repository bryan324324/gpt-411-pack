function generate() {
  let address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address) {
    setOutput("Enter full address (Street, City, State, Zip)");
    return;
  }

  address = normalizeAddress(address);

  const hasZip = /\d{5}$/.test(address);
  const hasState = /[A-Z]{2}/.test(address);

  if (!hasZip || !hasState) {
    setOutput("Address must include City, State, Zip");
    return;
  }

  let cmd = `Property search: ${address}\n`;
  cmd += `Property type: ${type.toLowerCase()}\n\n`;

  if (mode === "full") {
    cmd += `Pull ALL fields from Zillow, Redfin, Realtor.com, Trulia, County PA, and Tax Collector:\n\n`;
    cmd += `– List price, DOM, beds/baths, sqft, lot size, year built\n`;
    cmd += `– HOA (amount + frequency), taxes, flood zone\n`;
    cmd += `– Owner name(s), mailing address\n`;
    cmd += `– Listing history + price changes\n`;
    cmd += `– Agent name, brokerage, phone\n\n`;
    cmd += `Run comps:\n`;
    cmd += `– 3-5 recent closed sales\n`;
    cmd += `– Adjusted value analysis\n`;
    cmd += `– Price per sqft comparison\n\n`;
    cmd += `Flag:\n`;
    cmd += `– Overpriced / underpriced\n`;
    cmd += `– Financing risks\n`;
    cmd += `– Red flags\n`;
  } else {
    cmd += `Run comps only:\n\n`;
    cmd += `– 3-5 recent closed sales\n`;
    cmd += `– Adjusted value\n`;
    cmd += `– Price per sqft\n`;
    cmd += `– Range of value\n`;
  }

  if (notes) {
    cmd += `\nNotes: ${notes}`;
  }

  setOutput(cmd);

  // AUTO OPEN CHATGPT WITH PREFILLED COMMAND
  openChatGPT(cmd);
}

/* NORMALIZE ADDRESS */
function normalizeAddress(input) {
  let addr = input.toUpperCase();

  addr = addr.replace(/\s+/g, " ").trim();

  return addr;
}

/* OUTPUT */
function setOutput(text) {
  document.getElementById("output").innerText = text;
}

/* COPY */
function copyText() {
  const text = document.getElementById("output").innerText;
  if (!text || text === "Ready...") return;

  navigator.clipboard.writeText(text);

  const btn = document.querySelector(".copy");
  btn.innerText = "Copied ✓";
  btn.style.opacity = "0.7";

  setTimeout(() => {
    btn.innerText = "Copy";
    btn.style.opacity = "1";
  }, 1200);
}

/* OPEN CHATGPT */
function openChatGPT(text) {
  const encoded = encodeURIComponent(text);
  const url = `https://chat.openai.com/?q=${encoded}`;

  window.open(url, "_blank");
}

/* ENTER = RUN */
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") generate();
});
