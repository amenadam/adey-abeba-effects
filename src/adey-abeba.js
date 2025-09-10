(function (options = {}) {
  const effect = options.effect || "default"; // default, blur, glow, fancy
  const enableMusic = options.enableMusic || false;

  // 🎵 Music setup
  if (enableMusic) {
    const musicFiles = [
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/music_one.mp3",
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/music_two.mp3",
      "https://cdn.jsdelivr.net/gh/amenadam/adey-abeba-effects/assets/music_three.mp3",
    ];

    const audio = new Audio(musicFiles[Math.floor(Math.random() * musicFiles.length)]);
    audio.loop = true;
    audio.volume = 0.3; // adjust volume
    audio.currentTime = 10; 
    audio.play().catch(err => {
      console.warn("Autoplay blocked by browser. Start music on user interaction.", err);
      document.addEventListener("click", () => {
        audio.play();
      }, { once: true });
    });
  }


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

    /* Normal fall */
    @keyframes fall-default {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }

    /* Blur effect */
    @keyframes fall-blur {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; filter: blur(0px); }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; filter: blur(2px); }
    }

    /* Glow effect */
    @keyframes fall-glow {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; filter: drop-shadow(0 0 5px gold); }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; filter: drop-shadow(0 0 15px orange); }
    }

    /* Fancy (blur + glow + scale + drift) */
    @keyframes fall-fancy {
      0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 1; filter: blur(0px) drop-shadow(0 0 5px gold); }
      50% { transform: translateY(50vh) translateX(20px) rotate(180deg) scale(1.2); opacity: 0.9; filter: blur(1px) drop-shadow(0 0 10px gold); }
      100% { transform: translateY(100vh) translateX(-20px) rotate(360deg) scale(1); opacity: 0; filter: blur(2px) drop-shadow(0 0 15px orange); }
    }
  `;
  document.head.appendChild(style);

  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "adey-abeba";

    // random left position + speed
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 6 + Math.random() * 6 + "s";

    // select animation based on effect
    flower.style.animationName = `fall-${effect}`;

    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), 12000);
  }

  setInterval(createFlower, 700);
})(
   window.AdeyAbebaOptions || { effect: "default", enableMusic: false }
);
