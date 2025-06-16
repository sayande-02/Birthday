document.addEventListener("DOMContentLoaded", () => {
  /* ---------- CONFIG ---------- */
  const simulateBirthday = false;            // true = test mode
  const birthdayDateStr  = "2025-07-15T00:00:00";

  /* ---------- TEXT ANIMATION ---------- */
  const typewriterTextEl = document.getElementById("typewriter-text");
  const message = "On the auspicious day, I would want to tell you how incredibly lucky I am to have you in my life. Your smile, your heart, your soul — everything about you makes my world brighter. This page is just the beginning—a little corner of the internet made just for you. There's so much more in store, but for today, just know this: you are deeply loved, now and always.";
  let index = 0;

  function typeWriterEffect() {
    if (index < message.length) {
      typewriterTextEl.textContent += message.charAt(index);
      index++;
      setTimeout(typeWriterEffect, Math.random() * 100 + 50);
    }
  }
  typeWriterEffect();

  /* ---------- ENHANCED ANIMATIONS ---------- */
  function createFloatingHeart() {
    const el = document.createElement("div");
    el.className = "floating-heart";
    el.textContent = "💖"; // Using your original heart emoji
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 5 + Math.random() * 5 + "s";
    el.style.fontSize = 15 + Math.random() * 10 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  }

  function createSparkle() {
    const el = document.createElement("div");
    el.className = "sparkle";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.animationDuration = 1 + Math.random() * 2 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  function createParticle() {
    const el = document.createElement("div");
    el.className = "particle";
    el.style.left = Math.random() * 100 + "vw";
    el.style.bottom = "0";
    el.style.animationDuration = 20 + Math.random() * 5 + "s";
    
    // Use weather-based particle color if available
    if (window.currentWeatherParticleColor) {
      el.style.background = window.currentWeatherParticleColor;
    }
    
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 25000);
  }

  setInterval(createFloatingHeart, 500);
  setInterval(createSparkle, 100);
  setInterval(createParticle, 200);

  /* ---------- WEATHER INTEGRATION ---------- */
  async function updateWeather() {
    try {
      // Using wttr.in free weather API for Kolkata
      const response = await fetch('https://wttr.in/Kolkata?format=j1');
      const data = await response.json();
      const condition = data.current_condition[0].weatherDesc[0].value.toLowerCase();
      
      // Determine weather condition
      let weatherType = 'default';
      if (condition.includes('clear') || condition.includes('sunny')) {
        weatherType = 'clear';
      } else if (condition.includes('rain') || condition.includes('drizzle')) {
        weatherType = 'rain';
      } else if (condition.includes('cloud') || condition.includes('overcast')) {
        weatherType = 'clouds';
      } else if (condition.includes('snow')) {
        weatherType = 'snow';
      } else if (condition.includes('thunder') || condition.includes('storm')) {
        weatherType = 'thunderstorm';
      }

      // Apply weather-based backgrounds
      let backgroundStyle = '';
      let particleColor = '';
      
      switch(weatherType) {
        case 'clear':
          // Sunny/Clear - Golden sunset vibes
          backgroundStyle = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)';
          particleColor = 'rgba(255, 215, 0, 0.4)';
          break;
        case 'rain':
          // Rainy - Cool blues and teals
          backgroundStyle = 'linear-gradient(135deg, #74ebd5 0%, #acb6e5 50%, #74ebd5 100%)';
          particleColor = 'rgba(116, 235, 213, 0.3)';
          break;
        case 'clouds':
          // Cloudy - Soft purples and whites
          backgroundStyle = 'linear-gradient(135deg, #d9a7c7 0%, #fffcdc 50%, #f4f1de 100%)';
          particleColor = 'rgba(217, 167, 199, 0.3)';
          break;
        case 'snow':
          // Snow - Clean whites and light blues
          backgroundStyle = 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 50%, #e8f5e8 100%)';
          particleColor = 'rgba(224, 247, 250, 0.4)';
          break;
        case 'thunderstorm':
          // Stormy - Dramatic blues and purples
          backgroundStyle = 'linear-gradient(135deg, #667db6 0%, #0082c8 50%, #485563 100%)';
          particleColor = 'rgba(102, 125, 182, 0.3)';
          break;
        default:
          // Default - Original mint theme
          backgroundStyle = 'linear-gradient(135deg, #e8fdf5, #ffffff)';
          particleColor = 'rgba(107, 191, 115, 0.3)';
      }
      
      // Apply the new background
      document.body.style.background = backgroundStyle;
      document.body.style.backgroundSize = '400% 400%';
      
      // Update particle colors if they exist
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        particle.style.background = particleColor;
      });
      
      // Store current weather for particle creation
      window.currentWeatherParticleColor = particleColor;
      
      console.log(`Weather updated: ${condition} -> ${weatherType}`);
      
    } catch (error) {
      console.log('Weather API unavailable, using default theme');
      // Fallback to original theme
      document.body.style.background = 'linear-gradient(135deg, #e8fdf5, #ffffff)';
      document.body.style.backgroundSize = '400% 400%';
      window.currentWeatherParticleColor = 'rgba(107, 191, 115, 0.3)';
    }
  }
  
  // Initialize weather
  updateWeather();
  // Update weather every hour
  setInterval(updateWeather, 3600000);

  /* ---------- DATE LOGIC ---------- */
  const today     = simulateBirthday ? new Date("2025-07-15") : new Date();
  const birthday  = new Date(birthdayDateStr);
  const isBirthday = today.getDate() === birthday.getDate() 
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

  /* ---------- FLIP CLOCK COUNTDOWN ---------- */
  let previousValues = { days: '', hours: '', minutes: '', seconds: '' };
  
  function updateFlipNumber(unit, newValue) {
    const formattedValue = newValue.toString().padStart(2, '0');
    
    if (previousValues[unit] !== formattedValue) {
      const cardEl = document.getElementById(`${unit}-card`);
      const currentEl = document.getElementById(`${unit}-current`);
      const nextEl = document.getElementById(`${unit}-next`);
      
      // Set the new value to the next card (behind current)
      nextEl.textContent = formattedValue;
      
      // Start flip animation
      cardEl.classList.add('flipping');
      
      setTimeout(() => {
        // After animation completes, update current and remove animation
        currentEl.textContent = formattedValue;
        cardEl.classList.remove('flipping');
        
        previousValues[unit] = formattedValue;
      }, 600); // Total animation duration
    }
  }
  
  function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;
    const container = document.querySelector('.countdown-container');

    if (isBirthday || simulateBirthday) {
      document.querySelector('.countdown-title').textContent = "🎉 Happy Birthday Dishu 💕";
      document.querySelector('.countdown-subtitle').textContent = "Today is your special day!";
      container.classList.add('almost-birthday');
      return;
    }
    
    if (diff <= 0) {
      document.querySelector('.countdown-title').textContent = "🎉 Happy Birthday Dishu 💕";
      document.querySelector('.countdown-subtitle').textContent = "Today is your special day!";
      container.classList.add('almost-birthday');
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    // Add glow effect when close to birthday (less than 7 days)
    if (days <= 7) {
      container.classList.add('almost-birthday');
    } else {
      container.classList.remove('almost-birthday');
    }
    
    // Update flip cards with animation
    updateFlipNumber('days', days);
    updateFlipNumber('hours', hours);
    updateFlipNumber('minutes', minutes);
    updateFlipNumber('seconds', seconds);
  }
  
  // Initialize countdown display
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

/* ---------- FRIEND CONTRIBUTION LOGIC (no‑image) ---------- */
const contributionForm   = document.getElementById("contribution-form");
const contributionSection = document.getElementById("contribution-section");
const successMessage     = document.getElementById("contribution-success");
const addAnotherBtn      = document.getElementById("add-another");
const memoriesContainer  = document.getElementById("memories-container");
const birthdayMemories   = document.getElementById("birthday-memories");

/*function saveMemory(name, message) {
  fetch("https://script.google.com/macros/s/AKfycbwEvLabYXcPYKvpdrz64GxOudXKs4g40qsswe56zDdChaR4mY9tDOagWFsUWKQoYHu93A/exec", {
    mode : 'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        contributionForm.style.display = "none";
        successMessage.style.display = "block";
        contributionForm.reset();
      } else {
        alert("Something went wrong. Try again!");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error connecting to server.");
    });
}*/


// ── Render cards on her birthday ───────────────────────────
/*function displayMemories() {
  const memories = loadMemories();
  if (memories.length === 0) return;

  memoriesContainer.innerHTML = "";
  memories.forEach(({ name, message }) => {
    const card  = document.createElement("div");
    card.className = "memory-card";

    const title = document.createElement("h4");
    title.textContent = name;

    const msg   = document.createElement("p");
    msg.textContent = message;

    card.appendChild(title);
    card.appendChild(msg);
    memoriesContainer.appendChild(card);
  });

  birthdayMemories.style.display = "block";
}*/

// ── Form submission ────────────────────────────────────────
contributionForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop redirect
  contributionForm.style.display = "none";
  successMessage.style.display = "block";
  contributionForm.reset();
});



// ── “Add another” button ───────────────────────────────────
addAnotherBtn.addEventListener("click", () => {
  successMessage.style.display = "none";
  contributionForm.style.display = "block";
});

// ── Show memories only on 15 July ─────────────────────────
/*if (isBirthday || simulateBirthday) {
  contributionSection.style.display = "none";
  displayMemories();
}*/
