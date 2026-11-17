// This script handles the "ROLL CREDITS" button on the About page. Toggles rolling animation when clicked.
const btn = document.querySelector('.roll-btn');
const wrap = document.querySelector('.credits-wrap');

if (btn && wrap) {
  btn.addEventListener('click', () => {
    const rolling = wrap.classList.toggle('rolling');
    btn.setAttribute('aria-pressed', rolling);
    btn.textContent = rolling ? 'STOP CREDITS' : 'ROLL CREDITS';
    wrap.scrollTop = 0;
  });
}