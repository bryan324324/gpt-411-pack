function run() {
  const address = document.getElementById("address").value;
  const type = document.getElementById("type").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value;

  let command =
`Property search: ${address}
Property type: ${type}
Mode: ${mode}

Pull:
– Property Appraiser
– Taxes
– Comps
– Listing history
– Market analysis`;

  if (notes) {
    command += `\n\nNotes:\n${notes}`;
  }

  document.getElementById("output").textContent = command;
}

function copy() {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text);
}

/* KEYBOARD SHORTCUTS */
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    run();
  }

  if (e.key === "Enter" && e.shiftKey) {
    const text = document.getElementById("output").textContent;
    navigator.clipboard.writeText(text);
    window.open("https://chat.openai.com/", "_blank");
  }
});
