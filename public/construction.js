// Made to animate my cool loading spinner. 
const frames = ['-', '\\', '|', '/'];
const spinners = document.querySelectorAll('.spinner');

if (spinners.length) {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % frames.length;
    spinners.forEach((s) => { s.textContent = frames[i]; });
  }, 150);
}