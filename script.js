document.addEventListener("DOMContentLoaded", () => {
  /* ---------- CONFIG ---------- */
  const simulateBirthday = false;            // true = test mode
  const birthdayDateStr  = "2025-07-15T00:00:00";

  /* ---------- DATE LOGIC ---------- */
  const today     = simulateBirthday ? new Date("2025-07-15") : new Date();
  const birthday  = new Date(birthdayDateStr);
  const isBirthday = today.getDate() === birthday.getDate() &&
                     today.getMonth() === birthday.getMonth();

  /* ---------- DOM REFS ---------- */
  const countdownEl   = document.getElementById("countdown");
  const modalEl       = document.getElementById("birthday-modal");
  const modalCloseBtn = document.getElementById("modal-close");
  const birthdayAudio = document.getElementById("birthday-audio");

  /* ---------- AUDIO ---------- */
  birthdayAudio.play().catch(() => {
  // autoplay blocked – wait for user interaction
  document.body.addEventListener("click", () => {
    birthdayAudio.muted = false;
    birthdayAudio.play();
  }, { once: true });
});

  /* ---------- COUNTDOWN ---------- */
  function updateCountdown() {
    const now  = new Date();
    const diff = birthday - now;

    if (isBirthday || simulateBirthday) {
      countdownEl.textContent = "🎉 Happy Birthday Dishu 💕";
      return;
    }
    if (diff <= 0) {
      countdownEl.textContent = "🎉 Happy Birthday Dishu 💕";
      return;
    }
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s left until your big day 🎂`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- EMOJI RAIN ---------- */
  const emoji = isBirthday ? "🌻" : "💖";
  function createFallingEmoji() {
    const el = document.createElement("div");
    el.classList.add("falling");
    el.textContent = emoji;
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 4 + Math.random() * 3 + "s";
    el.style.fontSize = 20 + Math.random() * 12 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }
  const intervalRate = window.innerWidth < 600 ? 600 : 300;
  setInterval(createFallingEmoji, intervalRate);

  /* ---------- FIREWORKS ---------- */
  const canvas = document.getElementById("fireworks-canvas");
  const ctx    = canvas.getContext("2d");
  let fireworks = [];
  let animationFrame, fireworksInterval;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ["#ff4b5c", "#fdd835", "#4dd0e1", "#81c784", "#ba68c8"];
    const count  = 30 + Math.floor(Math.random() * 20);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 5 + 2;
      fireworks.push({
        x, y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1
      });
    }
  }

  function drawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks = fireworks.filter(fw => {
      ctx.globalAlpha = fw.alpha;
      ctx.fillStyle   = fw.color;
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, fw.size, 0, 2 * Math.PI);
      ctx.fill();

      fw.x     += fw.dx;
      fw.y     += fw.dy;
      fw.alpha -= 0.02;

      return fw.alpha > 0;
    });
    ctx.globalAlpha = 1;
    animationFrame  = requestAnimationFrame(drawFireworks);
  }

  /* ---------- CELEBRATION CONTROL ---------- */
  function startCelebration() {
    modalEl.style.display = "flex";
    fireworksInterval = setInterval(createFirework, 800);
    animationFrame    = requestAnimationFrame(drawFireworks);
  }
  function stopCelebration() {
    modalEl.style.display = "none";
    cancelAnimationFrame(animationFrame);
    clearInterval(fireworksInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks = [];
  }

  if (isBirthday || simulateBirthday) { startCelebration(); }
  modalCloseBtn.addEventListener("click", stopCelebration);
});
