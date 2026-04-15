function generate() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address.includes(",")) {
    setOutput("Enter full address: Street, City, State, Zip");
    return;
  }

  let command = `Property search: ${address}\n`;
  command += `Property type: ${type.toLowerCase()}\n\n`;

  if (mode === "full") {
    command += `Pull full report + PA + taxes + comps.\n`;
  } else {
    command += `Run comps only.\n`;
  }

  if (notes) command += `\nNotes: ${notes}`;

  setOutput(command);
}

function setOutput(text) {
  document.getElementById("output").innerText = text;
}

function copyText() {
  navigator.clipboard.writeText(document.getElementById("output").innerText);
}
