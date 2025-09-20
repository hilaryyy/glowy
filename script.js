function showMode(mode) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(mode).classList.remove('hidden');
}

function goHome() {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById('home').classList.remove('hidden');
}

// Mood Light
function updateMoodColor() {
  const color = document.getElementById('moodColor').value;
  const display = document.getElementById('moodDisplay');
  display.style.backgroundColor = color;
  display.style.boxShadow = `0 0 80px 30px ${color}`;
}


// Strobe Lights
let strobeInterval;
let strobeRunning = false;

function startStrobe() {
  if (strobeRunning) return;
  strobeRunning = true;
  runStrobe();
}

function runStrobe() {
  const display = document.getElementById('strobeDisplay');
  const color1 = document.getElementById('strobeColor1').value;
  const color2 = document.getElementById('strobeColor2').value;
  let toggle = false;

  function updateStrobe() {
    const speed = parseInt(document.getElementById('strobeSpeed').value);
    clearInterval(strobeInterval);
    strobeInterval = setInterval(() => {
      display.style.backgroundColor = toggle ? color1 : color2;
      toggle = !toggle;
    }, speed);
  }

  updateStrobe();
  document.getElementById('strobeSpeed').addEventListener('input', updateStrobe);
}

function stopStrobe() {
  clearInterval(strobeInterval);
  strobeRunning = false;
}

// Gradient
function updateGradient() {
  const c1 = document.getElementById('gradColor1').value;
  const c2 = document.getElementById('gradColor2').value;
  const display = document.getElementById('gradientDisplay');
  display.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
}
