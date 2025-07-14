document.addEventListener("DOMContentLoaded", () => {
  /* ---------- CONFIG ---------- */
  const simulateBirthday = false;            // true = test mode
  const birthdayDateStr  = "2025-07-15T00:00:00";

  /* ---------- TEXT ANIMATION ---------- */
  const typewriterTextEl = document.getElementById("typewriter-text");
  
  // Different messages for birthday vs regular days
  const regularMessage = "On the auspicious day, I would want to tell you how incredibly lucky I am to have you in my life. Your smile, your heart, your soul — everything about you makes my world brighter. This page is just the beginning—a little corner of the internet made just for you. There's so much more in store, but for today, just know this: you are deeply loved, now and always.";
  const birthdayMessage = "Happy Birthday Dishu! 🎉 Today is your special day, and I want you to know how incredibly lucky I am to have you in my life. Your smile, your heart, your soul — everything about you makes my world brighter. You are deeply loved, now and always.";
  
  let index = 0;

  function typeWriterEffect() {
    // Check if it's birthday first (considering simulateBirthday flag OR actual birthday)
    const today = new Date();
    const birthday = new Date("2025-07-15T00:00:00");
    const isActualBirthday = today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();
    const isBirthdayToday = simulateBirthday || isActualBirthday;
    
    const message = isBirthdayToday ? birthdayMessage : regularMessage;
    
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
    el.textContent = "🌻"; // Using your original heart emoji
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
  const birthdaySong  = document.getElementById("birthday-song");

  /* ---------- AUDIO ---------- */
  console.log('Audio setup - isBirthday:', isBirthday, 'simulateBirthday:', simulateBirthday);
  
  // Stop all audio first
  birthdayAudio.pause();
  birthdaySong.pause();
  birthdayAudio.currentTime = 0;
  birthdaySong.currentTime = 0;
  
  // Update audio status display
  const audioStatus = document.getElementById('audio-status');
  const currentSong = document.getElementById('current-song');
  const currentMode = document.getElementById('current-mode');
  
  if (isBirthday || simulateBirthday) {
    console.log('Playing birthday song: birthday-song.mp3');
    // On birthday: stop regular audio, play birthday song
    birthdayAudio.muted = true;
    birthdaySong.muted = false;
    
    // Update status display
    if (audioStatus && currentSong && currentMode) {
      audioStatus.style.display = 'block';
      currentSong.textContent = 'birthday-song.mp3';
      currentMode.textContent = 'Birthday Mode 🎉';
    }
    
    // Play birthday song
    birthdaySong.play().catch(() => {
      console.log('Birthday song autoplay blocked, waiting for user click');
      // autoplay blocked – wait for user interaction
      document.body.addEventListener("click", () => {
        console.log('User clicked, starting birthday song');
        birthdaySong.muted = false;
        birthdaySong.play();
      }, { once: true });
    });
  } else {
    console.log('Playing regular music: audio.mp3');
    // Regular days: play background music, keep birthday song muted
    birthdaySong.muted = true;
    birthdayAudio.muted = false;
    
    // Update status display
    if (audioStatus && currentSong && currentMode) {
      audioStatus.style.display = 'block';
      currentSong.textContent = 'audio.mp3';
      currentMode.textContent = 'Regular Mode 📅';
    }
    
    birthdayAudio.play().catch(() => {
      console.log('Regular audio autoplay blocked, waiting for user click');
      // autoplay blocked – wait for user interaction
      document.body.addEventListener("click", () => {
        console.log('User clicked, starting regular audio');
        birthdayAudio.muted = false;
        birthdayAudio.play();
      }, { once: true });
    });
  }

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
  const emoji = (isBirthday || simulateBirthday) ? "🌼" : "🌻";
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

  /* ---------- POLAROID FUNCTIONALITY ---------- */
  function loadAndDisplayPolaroids() {
    // Direct data loading - no fetch needed
    const polaroids = [
      {
        id: 1,
        name: "Sayan",
        image: "images/sayan.jpg",
        message: "Happy Birthday Dishu <3 May you achieve every success your heart desires. I'll be with you every step of the way—through thick and thin, as your constant companion, your biggest supporter, and your forever love"
      },
      {
        id: 2,
        name: "Anindita",
        image: "images/anindita.jpg",
        message: "Happy Birthday Dishani. Many many happy returns of the day. To me you're a very strong and sorted woman to look up to. May god bless you 🙏 wish you love and light 💫❤️"
      },
      {
        id: 3,
        name: "Shankhadeep",
        image: "images/shankhadeep.jpg",
        message: "Cheers to more fun, more memories and cake! Happy birthday. Jeo hazaro saal!!"
      },
      {
        id: 4,
        name: "Sam",
        image: "images/sam.jpg",
        message: "Hey \"D\" - the awesome lady. It was long journey from Class 2 to today...but feels like just yesterday. Always know you as the jolly person with countless memories. The little girl from tuition and those tuition rides to today's elegant lady, I have seen it all. From the chumpy face look with oily hair to the most gorgeous woman look and many more. It always felt like fresh air while vibing with u. And seeing u taking big leaps in your life makes me so happy and proud together. Always Keep smiling dear...keep rising and shining. Many many happy birthday and happy returns of the day Dishni. May god bless u with all the success and happiness that u deserve. 🎉💐🫶🏻"
      },
      {
        id: 5,
        name: "Sudeshna Biswas",
        image: "images/sudeshna.jpg",
        message: "Happiest birthday dii.. ❤️ stay blessed and enjoy your day😍 though i didn’t met you earlier but whenever we met from then to now you act as my di.. you guide me in every possible ways especially when i was going through my bad days 🥺 i love you ❤️"
      },
      {
        id: 6,
        name: "Indrila",
        image: "images/indrila.jpg",
        message: "Happy Birthday, Puchu! 💅✨ Another year of being the drama, the main character, and the legend in your own mind! Keep slaying, keep shining, and please—try not to outshine the candles on your cake this year. 😘 Stay fabulous, you unstoppable sass queen! 🎉👑🥰"
      },
      {
        id: 7,
        name: "Roku Da",
        image: "images/rokuda.jpg",
        message: "Happy Birthday, Puchuu! 🎉 You’re like a fine wine — you get better with age… Hope your day is as fabulous and extra as you are! 🎂👑"
      }

    ];
    displayPolaroids(polaroids);
  }

  function displayPolaroids(polaroids) {
    const polaroidSection = document.getElementById('polaroid-section');
    const polaroidContainer = document.getElementById('polaroid-container');
    
    if (!polaroidSection || !polaroidContainer) return;
    
    polaroidContainer.innerHTML = '';
    
    polaroids.forEach((polaroid, index) => {
      const polaroidCard = document.createElement('div');
      polaroidCard.className = 'polaroid';
      polaroidCard.style.animationDelay = `${index * 0.2}s`;
      
      // Create image
      const img = document.createElement('img');
      img.className = 'polaroid-image';
      img.alt = polaroid.name;
      img.src = polaroid.image;
      
      // Fallback if image fails to load
      img.onerror = function() {
        this.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
          <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f0f8ff"/>
            <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="20" fill="#337" text-anchor="middle" dy=".3em">📸</text>
            <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="14" fill="#666" text-anchor="middle" dy=".3em">${polaroid.name}</text>
            <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="12" fill="#999" text-anchor="middle" dy=".3em">Image Not Found</text>
          </svg>
        `);
      };
      
      // Create name and message
      const nameDiv = document.createElement('div');
      nameDiv.className = 'polaroid-name';
      nameDiv.textContent = polaroid.name;
      
      const messageDiv = document.createElement('div');
      messageDiv.className = 'polaroid-message';
      messageDiv.textContent = polaroid.message;
      
      // Append elements
      polaroidCard.appendChild(img);
      polaroidCard.appendChild(nameDiv);
      polaroidCard.appendChild(messageDiv);
      polaroidContainer.appendChild(polaroidCard);
    });
    
    polaroidSection.style.display = 'block';
  }

  if (isBirthday || simulateBirthday) { 
    startCelebration(); 
    // Hide the contribution section on birthday
    const contributionSection = document.getElementById("contribution-section");
    if (contributionSection) {
      contributionSection.style.display = "none";
    }
    // Show polaroids
    loadAndDisplayPolaroids();
  }
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

// ── Form submission ────
contributionForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const formData = new FormData(contributionForm);

  fetch("https://formspree.io/f/xgvyyqbe", {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      // Show your custom thank-you message
      contributionForm.style.display = "none";
      successMessage.style.display = "block";
      contributionForm.reset();
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  })
  .catch(error => {
    console.error("Form submission error:", error);
    alert("Network error — please try again later.");
  });
});




// ── “Add another” button ───────────────────────────────────
addAnotherBtn.addEventListener("click", () => {
  successMessage.style.display = "none";
  contributionForm.style.display = "block";
});

// ── Show memories only on 15 July ─────────────────────────
/*if (isBirthday || simulateBirthday) {
  contributionSection.style.display = "none";
  displayMemories();
}*/

