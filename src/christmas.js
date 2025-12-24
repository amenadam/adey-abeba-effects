(function (options = {}) {
  const config = Object.assign({
    snowflakesCount: 50,
    snowflakeType: "default", // default, sparkle, festive, mixed
    enableWind: true,
    windIntensity: 0.5,
    accumulation: false,
    theme: "christmas", // christmas, winter, festive
    enableMusic: false,
    musicVolume: 0.2
  }, options);

  // 🎵 Christmas music (optional)
  let xmasAudio;
  if (config.enableMusic) {
    const xmasSongs = [
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/christmas1.mp3",
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/christmas2.mp3",
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/christmas3.mp3"
    ];
    
    xmasAudio = new Audio(xmasSongs[Math.floor(Math.random() * xmasSongs.length)]);
    xmasAudio.loop = true;
    xmasAudio.volume = config.musicVolume;

    function playXmasMusic() {
      xmasAudio.play().catch((err) => {
        console.warn("Autoplay blocked. Starting on user click.", err);
        document.addEventListener("click", () => playXmasMusic(), { once: true });
      });
    }

    playXmasMusic();

    // Music control button
    const musicBtn = document.createElement("button");
    musicBtn.innerHTML = "🎵 Xmas Music";
    musicBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid #c62828;
      border-radius: 8px;
      cursor: pointer;
      z-index: 100001;
      background: #2e7d32;
      color: white;
      font-weight: bold;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      transition: transform 0.2s;
    `;
    document.body.appendChild(musicBtn);

    musicBtn.addEventListener("mouseenter", () => {
      musicBtn.style.transform = "scale(1.05)";
    });
    musicBtn.addEventListener("mouseleave", () => {
      musicBtn.style.transform = "scale(1)";
    });

    musicBtn.addEventListener("click", () => {
      if (xmasAudio.paused) {
        xmasAudio.play();
        musicBtn.innerHTML = "🎵 Xmas Music";
        musicBtn.style.background = "#2e7d32";
      } else {
        xmasAudio.pause();
        musicBtn.innerHTML = "🔇 Music Off";
        musicBtn.style.background = "#c62828";
      }
    });
  }

  const snowflakeTypes = {
    default: "❄️",
    sparkle: "✨",
    festive: ["🎄", "🎁", "⭐", "🔔", "❄️"],
    mixed: ["❄️", "✨", "🎄", "🎁", "⭐"]
  };

  const themes = {
    christmas: {
      colors: ["#ffffff", "#ffebee", "#fce4ec", "#f3e5f5"],
      shadow: "rgba(255, 255, 255, 0.8)"
    },
    winter: {
      colors: ["#ffffff", "#e3f2fd", "#e8f5e8", "#f5f5f5"],
      shadow: "rgba(255, 255, 255, 0.7)"
    },
    festive: {
      colors: ["#ffebee", "#f3e5f5", "#e8f5e8", "#fff3e0"],
      shadow: "rgba(255, 215, 0, 0.3)"
    }
  };

  const currentTheme = themes[config.theme] || themes.christmas;

  const snowStyle = document.createElement("style");
  snowStyle.innerHTML = `
    .snowflake {
      position: fixed;
      top: -50px;
      color: ${currentTheme.colors[0]};
      font-size: 24px;
      pointer-events: none;
      z-index: 99998;
      text-shadow: 0 0 5px ${currentTheme.shadow};
      user-select: none;
      animation-timing-function: ease-in-out;
    }

    @keyframes fall-snow {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0.8;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) translateX(${config.enableWind ? '100px' : '0px'}) rotate(360deg);
        opacity: 0.3;
      }
    }

    @keyframes fall-sparkle {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0.7;
        filter: blur(0px);
      }
      50% {
        opacity: 1;
        filter: blur(0.5px) brightness(1.5);
        transform: scale(1.2);
      }
      100% {
        transform: translateY(100vh) translateX(${config.enableWind ? '80px' : '20px'}) rotate(720deg);
        opacity: 0.2;
        filter: blur(1px);
      }
    }

    @keyframes fall-festive {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
        opacity: 0.6;
      }
      25% {
        transform: translateX(${config.enableWind ? '40px' : '10px'}) scale(1.1);
      }
      75% {
        opacity: 1;
        transform: translateX(${config.enableWind ? '-30px' : '-10px'}) scale(1);
      }
      100% {
        transform: translateY(100vh) translateX(${config.enableWind ? '60px' : '0px'}) rotate(540deg) scale(0.9);
        opacity: 0.2;
      }
    }

    /* Snow accumulation on ground */
    .snow-accumulation {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 100%);
      pointer-events: none;
      z-index: 99997;
      transition: height 120s linear;
    }

    /* Christmas decorations */
    .christmas-decoration {
      position: fixed;
      font-size: 32px;
      pointer-events: none;
      z-index: 99996;
      animation: decoration-float 20s ease-in-out infinite;
      opacity: 0.7;
    }

    @keyframes decoration-float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(10deg);
      }
    }

    /* Optional: Add some sparkle particles */
    .sparkle {
      position: fixed;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      animation: sparkle-twinkle 2s infinite;
      box-shadow: 0 0 6px white;
    }

    @keyframes sparkle-twinkle {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
  `;
  document.head.appendChild(snowStyle);

  const snowflakes = [];
  const windDirection = 1;

  function getSnowflakeChar() {
    const type = snowflakeTypes[config.snowflakeType];
    if (Array.isArray(type)) {
      return type[Math.floor(Math.random() * type.length)];
    }
    return type;
  }

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.innerHTML = getSnowflakeChar();
    
    const size = 16 + Math.random() * 24;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 5;
    const color = currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)];
    
    snowflake.style.left = left + "vw";
    snowflake.style.fontSize = size + "px";
    snowflake.style.color = color;
    snowflake.style.animationDuration = duration + "s";
    snowflake.style.animationDelay = delay + "s";
    snowflake.style.animationName = `fall-${config.snowflakeType === "sparkle" ? "sparkle" : 
                                     config.snowflakeType === "festive" ? "festive" : "snow"}`;
    snowflake.style.opacity = 0.7 + Math.random() * 0.3;
    
    document.body.appendChild(snowflake);
    snowflakes.push(snowflake);
    
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
        const index = snowflakes.indexOf(snowflake);
        if (index > -1) snowflakes.splice(index, 1);
      }
    }, (duration + delay) * 1000);
  }

  function initSnow() {
    for (let i = 0; i < config.snowflakesCount; i++) {
      setTimeout(() => createSnowflake(), Math.random() * 3000);
    }
    
    setInterval(() => {
      if (snowflakes.length < config.snowflakesCount * 1.5) {
        createSnowflake();
      }
    }, 300);
  }

  let snowGround;
  if (config.accumulation) {
    snowGround = document.createElement("div");
    snowGround.className = "snow-accumulation";
    document.body.appendChild(snowGround);
    
    setTimeout(() => {
      snowGround.style.height = "30px";
    }, 100);
  }

  function addFestiveDecorations() {
    if (config.theme === "christmas" || config.theme === "festive") {
      const decorations = ["🎄", "🎁", "⭐", "🔔", "🦌", "⛄"];
      
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const deco = document.createElement("div");
          deco.className = "christmas-decoration";
          deco.innerHTML = decorations[Math.floor(Math.random() * decorations.length)];
          
          // Position around edges
          if (i % 2 === 0) {
            deco.style.left = (10 + Math.random() * 10) + "px";
          } else {
            deco.style.right = (10 + Math.random() * 10) + "px";
          }
          deco.style.top = (100 + Math.random() * 300) + "px";
          deco.style.opacity = 0.4 + Math.random() * 0.3;
          deco.style.fontSize = (20 + Math.random() * 24) + "px";
          deco.style.animationDuration = (15 + Math.random() * 20) + "s";
          deco.style.animationDelay = Math.random() * 10 + "s";
          
          document.body.appendChild(deco);
        }, i * 500);
      }
    }
  }

  function addSparkles() {
    if (config.snowflakeType === "sparkle" || config.theme === "festive") {
      setInterval(() => {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";
        sparkle.style.animationDelay = Math.random() * 2 + "s";
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
          if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
        }, 2000);
      }, 100);
    }
  }

  initSnow();
  addFestiveDecorations();
  addSparkles();

  // 🌬️ Wind effect (optional)
  if (config.enableWind) {
    let wind = 0;
    setInterval(() => {
      wind = (Math.sin(Date.now() / 5000) * config.windIntensity * 20);
      snowflakes.forEach(flake => {
        if (flake && flake.style) {
          const currentLeft = parseFloat(flake.style.left);
          flake.style.left = (currentLeft + wind * 0.01) + "vw";
        }
      });
    }, 100);
  }

  window.SnowEffect = {
    stop: function() {
      snowflakes.forEach(flake => {
        if (flake.parentNode) flake.parentNode.removeChild(flake);
      });
      snowflakes.length = 0;
      
      if (snowGround && snowGround.parentNode) {
        snowGround.parentNode.removeChild(snowGround);
      }
      
      if (xmasAudio) {
        xmasAudio.pause();
      }
    },
    
    adjustIntensity: function(newCount) {
      config.snowflakesCount = newCount;
    },
    
    changeTheme: function(newTheme) {
      config.theme = newTheme;
    }
  };

})(window.ChristmasSnowOptions || {}); // ✅ Config
