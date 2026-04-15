let history = [];
let historyIndex = -1;

function generate() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address) {
    setOutput("Enter address.");
    return;
  }

  let command = `Property search: ${address}\n`;
  command += `Property type: ${type.toLowerCase()}\n\n`;

  if (mode === "full") {
    command += `Pull full report + PA + taxes + comps.\n`;
  } else {
    command += `Run comps only.\n`;
  }

  if (notes) {
    command += `\nNotes: ${notes}`;
  }

  history.push(command);
  historyIndex = history.length;

  setOutput(command);
}

function setOutput(text) {
  document.getElementById("output").innerText = text;
}

function copyText() {
  const text = document.getElementById("output").innerText;
  if (!text) return;

  navigator.clipboard.writeText(text);

  const btn = document.querySelector(".copy");
  btn.innerText = "COPIED ✓";

  setTimeout(() => {
    btn.innerText = "COPY";
  }, 1000);
}

/* KEYBOARD CONTROL */
document.addEventListener("keydown", function(e) {

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    generate();
  }

  /* SHIFT + ENTER → OPEN CHATGPT */
  if (e.key === "Enter" && e.shiftKey) {
    const text = document.getElementById("output").innerText;
    if (!text) return;

    const url = "https://chat.openai.com/?q=" + encodeURIComponent(text);
    window.open(url, "_blank");
  }

  /* HISTORY NAVIGATION */
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      setOutput(history[historyIndex]);
    }
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      setOutput(history[historyIndex]);
    }
  }

});
