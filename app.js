function generate() {
  let address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address) {
    setOutput("Enter full address (Street, City, State, Zip)");
    return;
  }

  // NORMALIZE INPUT
  address = normalizeAddress(address);

  // VALIDATION (AFTER CLEANUP)
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
}

/* ADDRESS NORMALIZATION (THIS IS THE UPGRADE) */
function normalizeAddress(input) {
  let addr = input.toUpperCase();

  // Fix common abbreviations
  addr = addr.replace(/\bAVE\b/g, "AVE");
  addr = addr.replace(/\bSTREET\b/g, "ST");
  addr = addr.replace(/\bROAD\b/g, "RD");
  addr = addr.replace(/\bDRIVE\b/g, "DR");

  // Ensure comma before city if missing
  if (!addr.includes(",")) {
    const parts = addr.split(" ");
    if (parts.length > 4) {
      const zipIndex = parts.findIndex(p => /^\d{5}$/.test(p));
      if (zipIndex > 2) {
        const state = parts[zipIndex - 1];
        const city = parts.slice(2, zipIndex - 1).join(" ");
        const street = parts.slice(0, 2).join(" ");

        addr = `${street}, ${city}, ${state} ${parts[zipIndex]}`;
      }
    }
  }

  // Clean extra spaces
  addr = addr.replace(/\s+/g, " ").trim();

  return addr;
}

function setOutput(text) {
  document.getElementById("output").innerText = text;
}

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

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") generate();
});
