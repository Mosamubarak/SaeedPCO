const chatEl = document.getElementById('chatText');
const resultEl = document.getElementById('results');
const statusEl = document.getElementById('status');

document.getElementById('generate').addEventListener('click', () => {
  const text = chatEl.value.trim();
  const mood = document.querySelector('input[name="mood"]:checked').value;
  const goal = document.getElementById('goal').value;

  if (!text) {
    statusEl.textContent = 'Voer eerst chattekst in.';
    return;
  }

  const replies = generateReplies({ text, mood, goal });
  renderReplies(replies, mood);
  statusEl.textContent = 'Klaar. Klik op copy om te gebruiken.';
});

document.getElementById('reset').addEventListener('click', () => {
  chatEl.value = '';
  resultEl.innerHTML = '';
  statusEl.textContent = '';
});

resultEl.addEventListener('click', async (event) => {
  if (!event.target.matches('button[data-copy]')) return;
  const text = decodeURIComponent(event.target.getAttribute('data-copy'));
  await navigator.clipboard.writeText(text);
  statusEl.textContent = 'Gekopieerd ✅';
});

function generateReplies({ text, mood, goal }) {
  const snippet = text.slice(0, 55);
  const goalSuffix = {
    date: 'stuur een concrete datevoorstel terug',
    flirt: 'maak het flirteriger',
    mystery: 'hou spanning en mysterie'
  }[goal];

  if (mood === 'spicy') {
    return [
      `Jij hebt wel lef 😏 Over "${snippet}..." — ${goalSuffix}.`,
      `Ik voel je vibe. Zullen we dit testen buiten de chat?`,
      `Oké, jij start sterk. Nu ben ik benieuwd of je dit in real life ook kan.`
    ];
  }

  if (mood === 'hot') {
    return [
      `Mmm, die energie bevalt me. Vertel: wanneer zie ik je?`,
      `Jij maakt het lastig om rustig te blijven 😈 Kies tijd en plek.`,
      `Ik ben in voor volwassen spanning — als de klik echt goed is.`
    ];
  }

  return [
    `Leuk bericht 😊 Over "${snippet}..." — ${goalSuffix}.`,
    `Haha nice, je maakt het gezellig. Zullen we een koffie plannen?`,
    `Klinkt goed! Ik ben benieuwd naar je in het echt.`
  ];
}

function renderReplies(list, mood) {
  resultEl.innerHTML = '';
  list.forEach((reply, index) => {
    const item = document.createElement('div');
    item.className = 'reply';
    item.innerHTML = `
      <small>Optie ${index + 1} • ${mood}</small>
      <p>${reply}</p>
      <button class="btn" data-copy="${encodeURIComponent(reply)}">Copy</button>
    `;
    resultEl.appendChild(item);
  });
}
