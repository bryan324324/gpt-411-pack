const addressEl = document.getElementById('address');
const typeEl = document.getElementById('propertyType');
const modeEl = document.getElementById('mode');
const notesEl = document.getElementById('notes');
const outputEl = document.getElementById('output');

function generateCommand() {
  const address = addressEl.value.trim();
  const propertyType = typeEl.value;
  const mode = modeEl.value;
  const notes = notesEl.value.trim();

  if (!address) {
    alert('Enter an address first.');
    addressEl.focus();
    return;
  }

  const header = mode === 'full' ? 'Run full report:' : 'Run comps only:';
  const lines = [header, address, propertyType];

  if (notes) {
    lines.push(`Notes: ${notes}`);
  }

  outputEl.value = lines.join('\n');
}

function copyCommand() {
  if (!outputEl.value.trim()) {
    generateCommand();
  }
  outputEl.focus();
  outputEl.select();
  outputEl.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

function openChatGPT() {
  window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
}

function clearAll() {
  addressEl.value = '';
  notesEl.value = '';
  modeEl.value = 'full';
  typeEl.value = 'Residential (1-4 units including condo, duplex, triplex, fourplex)';
  outputEl.value = '';
  addressEl.focus();
}

document.getElementById('generateBtn').addEventListener('click', generateCommand);
document.getElementById('copyBtn').addEventListener('click', copyCommand);
document.getElementById('openBtn').addEventListener('click', openChatGPT);
document.getElementById('clearBtn').addEventListener('click', clearAll);
