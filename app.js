let history = [];

function generate() {
  const address = document.getElementById("address").value.trim();
  const type = document.getElementById("propertyType").value;
  const mode = document.getElementById("mode").value;
  const notes = document.getElementById("notes").value.trim();

  if (!address.includes(",") || address.length < 10) {
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

  saveHistory(command);
}

function setOutput(text) {
  document.getElementById("output").innerText = text;
}

function copyText() {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);
}

function saveHistory(cmd) {
  history.unshift(cmd);
  if (history.length > 5) history.pop();

  const list = document.getElementById("historyList");
  list.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.substring(0, 50) + "...";
    li.onclick = () => setOutput(item);
    list.appendChild(li);
  });
}

/* HOTKEYS */
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    generate();
  }

  if (e.key === "Enter" && e.shiftKey) {
    launchChatGPT();
  }
});

/* AUTO LAUNCH CHATGPT */
function launchChatGPT() {
  const text = encodeURIComponent(document.getElementById("output").innerText);
  window.open(`https://chat.openai.com/?q=${text}`, "_blank");
}
