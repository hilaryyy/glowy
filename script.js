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
function startCamera() {
  const video = document.getElementById('camera');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(() => {
      alert('camera access denied');
    });
}

function takePhoto() {
  const timer = parseInt(document.getElementById('photoTimer').value);
  setTimeout(() => {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('snapshot');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'glowy-photo.png';
      link.click();
    }, 'image/png');
  }, timer * 1000);
}

function startCamera() {
  const video = document.getElementById('camera');
  const isFront = currentFacing === 'user';

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: currentFacing }
  })
  .then(stream => {
    video.srcObject = stream;
    video.classList.toggle('mirrored', isFront);
  })
  .catch(() => {
    alert('camera access denied');
  });
}

