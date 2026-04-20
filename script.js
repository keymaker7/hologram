const imageInput = document.getElementById("imageInput");
const sizeRange = document.getElementById("sizeRange");
const sizeValue = document.getElementById("sizeValue");
const effectSelect = document.getElementById("effectSelect");
const speedRange = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");
const hologramCanvas = document.getElementById("hologramCanvas");
const sampleButtons = document.querySelectorAll(".sample-btn");

const arms = [
  document.getElementById("north"),
  document.getElementById("east"),
  document.getElementById("south"),
  document.getElementById("west"),
];

let currentEffect = "float";
let effectSpeed = Number(speedRange.value);
let activeObjectUrl = null;

function applySize(size) {
  hologramCanvas.style.setProperty("--img-size", `${size}px`);
  sizeValue.textContent = String(size);
}

function applyImage(src) {
  arms.forEach((img) => {
    img.src = src;
    img.classList.add("show");
  });
}

imageInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl);
  }

  const url = URL.createObjectURL(file);
  activeObjectUrl = url;
  applyImage(url);
});

sizeRange.addEventListener("input", (event) => {
  applySize(event.target.value);
});

effectSelect.addEventListener("change", (event) => {
  currentEffect = event.target.value;
});

speedRange.addEventListener("input", (event) => {
  effectSpeed = Number(event.target.value);
  speedValue.textContent = effectSpeed.toFixed(1);
});

sampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.src;
    if (!src) {
      return;
    }

    applyImage(src);
  });
});

function animate(ts) {
  const t = (ts / 1000) * effectSpeed;

  arms.forEach((arm, index) => {
    let dx = 0;
    let dy = 0;
    let scale = 1;
    let twist = 0;
    let opacity = 1;
    let glow = 8;

    if (currentEffect === "float") {
      dx = Math.sin(t * 1.3 + index * 1.5) * 5;
      dy = Math.cos(t * 1.1 + index * 1.2) * 5;
      glow = 9 + Math.sin(t * 2 + index) * 2;
    } else if (currentEffect === "orbit") {
      const angle = t * 1.8 + (Math.PI / 2) * index;
      dx = Math.cos(angle) * 9;
      dy = Math.sin(angle) * 9;
      twist = Math.sin(t * 1.5 + index) * 2;
      glow = 10;
    } else if (currentEffect === "pulse") {
      const pulse = Math.sin(t * 3 + index * 0.8);
      scale = 1 + pulse * 0.08;
      dy = pulse * 4;
      glow = 10 + pulse * 5;
    } else if (currentEffect === "wave") {
      const wave = Math.sin(t * 3.1 + index * (Math.PI / 2));
      dy = wave * 10;
      scale = 1 + wave * 0.04;
      glow = 8 + Math.abs(wave) * 6;
    } else if (currentEffect === "flicker") {
      const flick = Math.abs(Math.sin(t * 12 + index * 1.7));
      opacity = 0.62 + flick * 0.38;
      twist = Math.sin(t * 7 + index) * 2.4;
      dy = Math.sin(t * 2 + index) * 3;
      glow = 7 + flick * 10;
    }

    arm.style.setProperty("--dx", `${dx.toFixed(2)}px`);
    arm.style.setProperty("--dy", `${dy.toFixed(2)}px`);
    arm.style.setProperty("--scale", scale.toFixed(3));
    arm.style.setProperty("--twist", `${twist.toFixed(2)}deg`);
    arm.style.opacity = opacity.toFixed(3);
    arm.style.filter = `drop-shadow(0 0 ${glow.toFixed(1)}px rgba(90, 210, 255, 0.65))`;
  });

  requestAnimationFrame(animate);
}

applySize(sizeRange.value);
speedValue.textContent = effectSpeed.toFixed(1);
applyImage("./samples/cute-cat.png");
requestAnimationFrame(animate);
