function generateAndLaunch() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  const outputBox = document.getElementById("output");

  if (!address) {
    outputBox.innerText = "Enter a property address.";
    return;
  }

  // Build command
  let command = `Property search: ${address}\n`;
  command += `Property type: ${type.toLowerCase()}\n\n`;

  if (mode === "full") {
    command += "Pull full report:\n";
    command += "- Zillow, Redfin, Realtor, Trulia\n";
    command += "- Property Appraiser data\n";
    command += "- Tax history\n";
    command += "- Listing history\n";
    command += "- HOA, flood zone, owner info\n";
    command += "- Run comps (3-5 strong comparable sales)\n";
  } else {
    command += "Run comps only (3-5 strong comparable sales).\n";
  }

  if (notes) {
    command += `\nNotes: ${notes}`;
  }

  // Show in UI
  outputBox.innerText = command;

  // Visual feedback
  outputBox.style.boxShadow = "0 0 25px rgba(0,255,150,0.35)";
  setTimeout(() => {
    outputBox.style.boxShadow = "none";
  }, 400);

  // --- AUTO OPEN CHATGPT ---
  const encoded = encodeURIComponent(command);

  // IMPORTANT: ChatGPT does NOT reliably auto-run prompts via URL anymore.
  // This will OPEN ChatGPT with the prompt PRELOADED (best possible behavior).
  window.open(`https://chat.openai.com/?q=${encoded}`, "_blank");
}


/* COPY BUTTON */
function copyText() {
  const text = document.getElementById("output").innerText;

  if (!text || text === "Ready...") return;

  navigator.clipboard.writeText(text);

  const btn = document.querySelector(".copy");
  btn.innerText = "COPIED";
  setTimeout(() => {
    btn.innerText = "COPY";
  }, 1200);
}


/* OPTIONAL: ENTER ALSO RUNS */
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    generateAndLaunch();
  }
});
