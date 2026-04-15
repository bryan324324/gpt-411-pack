function generate() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address) {
    setOutput("Enter full address: Street, City, State, Zip");
    return;
  }

  if (!address.includes(",") || address.split(",").length < 3) {
    setOutput("Enter full address format: Street, City, State, Zip");
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
