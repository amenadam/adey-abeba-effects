(function (options = {}) {
  const effect = options.effect || "default"; // default, blur, glow, fancy
  const enableMusic = options.enableMusic || false;
  const theme = options.theme || "light"; // "light" or "dark"

  let audio;

  // 🎵 Music setup
  if (enableMusic) {
    const musicFiles = [
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/music_one.mp3",
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/music_two.mp3",
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/music_three.mp3",
    ];

    audio = new Audio(
      musicFiles[Math.floor(Math.random() * musicFiles.length)]
    );
    audio.loop = true;
    audio.volume = 0.25; // 🔊 reduced volume

    function playAudio() {
      audio.currentTime = 10; // ⏩ skip first 10s (trim intro)
      audio.play().catch((err) => {
        console.warn("Autoplay blocked. Starting on user click.", err);
        document.addEventListener("click", () => playAudio(), { once: true });
      });
    }

    playAudio();

    // 🎛️ Add mute/unmute button
    const btn = document.createElement("button");
    btn.innerHTML = "🔊 Music On";

    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid ${theme === "dark" ? "#555" : "#ccc"};
      border-radius: 8px;
      cursor: pointer;
      z-index: 100000;
      background: ${theme === "dark" ? "#222" : "#fff"};
      color: ${theme === "dark" ? "#fff" : "#000"};
    `;
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      if (audio.paused) {
        playAudio();
        btn.innerHTML = "🔊 Music On";
      } else {
        audio.pause();
        btn.innerHTML = "🔇 Music Off";
      }
    });
  }

  // 🌸 Styles
  const style = document.createElement("style");
  style.innerHTML = `
    .adey-abeba {
      position: fixed;
      top: -60px;
      width: 40px;
      height: 40px;
      background-image: url('https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/adey-abeba.png');
      background-size: contain;
      background-repeat: no-repeat;
      pointer-events: none;
      z-index: 99999;
      animation: fall linear forwards;
    }

    @keyframes fall-default {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }

    @keyframes fall-blur {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; filter: blur(0px); }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; filter: blur(2px); }
    }

    @keyframes fall-glow {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; filter: drop-shadow(0 0 5px gold); }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; filter: drop-shadow(0 0 15px orange); }
    }

    @keyframes fall-fancy {
      0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 1; filter: blur(0px) drop-shadow(0 0 5px gold); }
      50% { transform: translateY(50vh) translateX(20px) rotate(180deg) scale(1.2); opacity: 0.9; filter: blur(1px) drop-shadow(0 0 10px gold); }
      100% { transform: translateY(100vh) translateX(-20px) rotate(360deg) scale(1); opacity: 0; filter: blur(2px) drop-shadow(0 0 15px orange); }
    }
  `;
  document.head.appendChild(style);

  // 🌸 Flower creator
  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "adey-abeba";

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 6 + Math.random() * 6 + "s";
    flower.style.animationName = `fall-${effect}`;

    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 12000);
  }

  setInterval(createFlower, 700);
})(
  window.AdeyAbebaOptions || {
    effect: "fancy",
    enableMusic: false,
    theme: "dark",
  } // ✅ Config
);
