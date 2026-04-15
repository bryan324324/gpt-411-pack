const zipMap = {
  "miami, fl": "33101",
  "north palm beach, fl": "33408",
  "miami beach, fl": "33139",
  "fort lauderdale, fl": "33301",
  "boca raton, fl": "33432"
};

/* AUTOCOMPLETE DATA (SIMULATED GOOGLE-STYLE) */
const suggestions = [
  "108 Paradise Harbour Blvd, North Palm Beach, FL 33408",
  "123 Main St, Miami, FL 33101",
  "500 Brickell Ave, Miami, FL 33131",
  "1 Collins Ave, Miami Beach, FL 33139",
  "200 E Las Olas Blvd, Fort Lauderdale, FL 33301"
];

function isValidAddress(address) {
  const pattern = /^[^,]+,\s*[^,]+,\s*[A-Z]{2}\s*\d{5}$/i;
  return pattern.test(address.trim());
}

/* AUTO FORMAT INPUT */
function autoFormat(address) {
  let value = address.trim();

  // Fix spacing
  value = value.replace(/\s+/g, " ");

  // Ensure commas exist
  if (!value.includes(",")) {
    const parts = value.split(" ");
    if (parts.length > 3) {
      value = parts[0] + " " + parts[1] + ", " + parts.slice(2).join(" ");
    }
  }

  return value;
}

/* ZIP SUGGESTION */
function applyZip(address) {
  const lower = address.toLowerCase();

  for (let key in zipMap) {
    if (lower.includes(key) && !/\d{5}$/.test(address)) {
      return address + " " + zipMap[key];
    }
  }

  return address;
}

/* AUTOCOMPLETE DROPDOWN */
function showSuggestions(input) {
  let list = document.getElementById("suggestions");

  if (!list) {
    list = document.createElement("div");
    list.id = "suggestions";
    list.style.position = "absolute";
    list.style.background = "#000";
    list.style.border = "1px solid #333";
    list.style.width = input.offsetWidth + "px";
    list.style.zIndex = "999";
    input.parentNode.appendChild(list);
  }

  list.innerHTML = "";

  const val = input.value.toLowerCase();

  suggestions
    .filter(s => s.toLowerCase().includes(val))
    .slice(0, 5)
    .forEach(s => {
      const item = document.createElement("div");
      item.style.padding = "8px";
      item.style.cursor = "pointer";
      item.innerText = s;

      item.onclick = () => {
        input.value = s;
        list.innerHTML = "";
      };

      list.appendChild(item);
    });
}

/* MAIN RUN */
function run() {
  let address = document.getElementById("address").value;
  const type = document.getElementById("type").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  const output = document.getElementById("output");

  // Auto fix input
  address = autoFormat(address);
  address = applyZip(address);

  document.getElementById("address").value = address;

  // Final validation
  if (!isValidAddress(address)) {
    output.textContent =
`Fix address format:

Street, City, State ZIP

Example:
123 Main St, Miami, FL 33101`;
    return;
  }

  let command =
`Property search: ${address}
Property type: ${type}
Mode: ${mode}

Pull:
– Property Appraiser
– Taxes
– Listing history
– Ownership data
– HOA
– Flood zone
– Run 3–5 comps
– Price per sqft
– Value range`;

  if (notes) {
    command += `

Notes:
${notes}`;
  }

  output.textContent = command;
}

/* COPY */
function copy() {
  const text = document.getElementById("output").textContent;
  if (!text || text === "Ready...") return;
  navigator.clipboard.writeText(text);
}

/* EVENTS */
document.getElementById("address").addEventListener("input", function() {
  showSuggestions(this);
});

/* HOTKEYS */
document.addEventListener("keydown", function(e) {

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    run();
  }

  if (e.key === "Enter" && e.shiftKey) {
    e.preventDefault();
    run();

    setTimeout(() => {
      const text = encodeURIComponent(
        document.getElementById("output").textContent
      );
      window.open(`https://chat.openai.com/?q=${text}`, "_blank");
    }, 200);
  }

});
