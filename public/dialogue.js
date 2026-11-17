// Typewriter effect for the dialogue box on contact page. Skip and replay button included.
const box = document.querySelector('.dialogue-text');
const btn = document.querySelector('.skip-btn');

if (box && btn) {
  const lines = [...box.querySelectorAll('p')];
  const full = lines.map((p) => p.textContent);

  // Give screen readers the whole text at once
  const srCopy = document.createElement('p');
  srCopy.className = 'sr-only';
  srCopy.textContent = full.join(' ');
  box.after(srCopy);
  box.setAttribute('aria-hidden', 'true');

  // Cuts each line into invisible ghost text and visible typed text,
  // so the box stays full size while plays the typing animation.
  const parts = lines.map((p, i) => {
    const typed = document.createElement('span');
    const ghost = document.createElement('span');
    ghost.className = 'ghost';
    p.textContent = '';
    p.append(typed, ghost);
    return { typed, ghost, text: full[i] };
  });

  let line = 0;
  let char = 0;
  let timer;
  let typing = false;

  const finish = () => {
    clearTimeout(timer);
    parts.forEach((part) => {
      part.typed.textContent = part.text;
      part.ghost.textContent = '';
    });
    typing = false;
    btn.textContent = 'REPLAY \u21BA';
  };

  const type = () => {
    if (line >= parts.length) { finish(); return; }
    char += 1;
    const part = parts[line];
    part.typed.textContent = part.text.slice(0, char);
    part.ghost.textContent = part.text.slice(char);
    if (char >= part.text.length) {
      line += 1;
      char = 0;
      timer = setTimeout(type, 400); // pause between lines
    } else {
      timer = setTimeout(type, 35);  // speed per letter
    }
  };

  const start = () => {
    clearTimeout(timer);
    parts.forEach((part) => {
      part.typed.textContent = '';
      part.ghost.textContent = part.text;
    });
    line = 0;
    char = 0;
    typing = true;
    btn.textContent = 'SKIP \u25B6\u25B6';
    type();
  };

  btn.addEventListener('click', () => (typing ? finish() : start()));
  start();
}