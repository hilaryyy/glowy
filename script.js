// navigation
function showMode(mode) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(mode).classList.remove('hidden');

  if (mode === 'mood') updateMoodColor();
  if (mode === 'gradient') updateGradient();
  if (mode === 'strobe') {
    const color = document.getElementById('strobeColor1').value;
    const display = document.getElementById('strobeDisplay');
    display.style.backgroundColor = color;
    display.style.boxShadow = `0 0 80px 30px ${color}`;
  }
  if (mode === 'photo') updatePhotoColor();
}

function goHome() {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById('home').classList.remove('hidden');
}

function toggleSettings(id) {
  document.getElementById(id).classList.toggle('hidden');
}

function updateBrightness(id, value) {
  document.getElementById(id).style.opacity = value;
}

// mood light
function updateMoodColor() {
  const color = document.getElementById('moodColor').value;
  const display = document.getElementById('moodDisplay');
  display.style.backgroundColor = color;
  display.style.boxShadow = `0 0 80px 30px ${color}`;
}

// strobe lights
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
      const currentColor = toggle ? color1 : color2;
      display.style.backgroundColor = currentColor;
      display.style.boxShadow = `0 0 80px 30px ${currentColor}`;
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

// gradient
function updateGradient() {
  const c1 = document.getElementById('gradColor1').value;
  const c2 = document.getElementById('gradColor2').value;
  const display = document.getElementById('gradientDisplay');
  display.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
  display.style.boxShadow = `0 0 80px 30px ${c1}`;
}

// photo mode
function updatePhotoColor() {
  const color = document.getElementById('photoColor').value;
  const display = document.getElementById('photoDisplay');
  display.style.backgroundColor = color;
  display.style.boxShadow = `0 0 80px 30px ${color}`;
}

