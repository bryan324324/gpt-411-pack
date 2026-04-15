function generate() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address) {
    setOutput("Enter address");
    return;
  }

  let cmd = `Property search: ${address}\n`;
  cmd += `Property type: ${type.toLowerCase()}\n\n`;

  if (mode === "full") {
    cmd += `Pull full report + PA + taxes + comps.\n`;
  } else {
    cmd += `Run comps only.\n`;
  }

  if (notes) cmd += `\nNotes: ${notes}`;

  setOutput(cmd);
}

function setOutput(text) {
  document.getElementById("output").innerText = text;
}

function copyText() {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);

  const btn = document.querySelector(".copy");
  btn.innerText = "Copied ✓";

  setTimeout(() => {
    btn.innerText = "Copy";
  }, 1000);
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") generate();
});
