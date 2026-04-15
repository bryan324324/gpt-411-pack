function generate() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address) {
    setOutput("Enter full address (must include City, State, Zip)");
    return;
  }

  // SMART VALIDATION
  const hasZip = /\d{5}$/.test(address);
  const hasState = /[A-Z]{2}/.test(address);
  const hasEnoughWords = address.split(" ").length >= 5;

  if (!hasZip || !hasState || !hasEnoughWords) {
    setOutput("Enter valid address including City, State, Zip");
    return;
  }

  let cmd = `Property search: ${address}\n`;
  cmd += `Property type: ${type.toLowerCase()}\n\n`;

  if (mode === "full") {
    cmd += `Pull full report + PA + taxes + comps.\n`;
  } else {
    cmd += `Run comps only.\n`;
  }

  if (notes) {
    cmd += `\nNotes: ${notes}`;
  }

  setOutput(cmd);
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
