function typeText(text, element) {
  element.innerText = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
      setTimeout(typing, 8);
    }
  }

  typing();
}

function generate() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  const output = document.getElementById("output");
  const status = document.getElementById("status");

  if (!address) {
    output.innerText = "Enter address.";
    return;
  }

  status.innerText = "PROCESSING";

  let command = `Property search: ${address}\n`;
  command += `Property type: ${type.toLowerCase()}\n\n`;

  if (mode === "full") {
    command += "Pull full report + PA + taxes + comps.\n";
  } else {
    command += "Run comps only.\n";
  }

  if (notes) {
    command += `\nNotes: ${notes}`;
  }

  setTimeout(() => {
    typeText(command, output);
    status.innerText = "READY";
  }, 300);
}

function copyText() {
  const output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output);

  const btn = document.querySelector(".copy");
  const original = btn.innerText;

  btn.innerText = "COPIED";
  setTimeout(() => btn.innerText = original, 1000);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") generate();
});
