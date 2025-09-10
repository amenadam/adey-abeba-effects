(function () {
  const style = document.createElement("style");
  style.innerHTML = `
    .adey-abeba {
      position: fixed;
      top: -50px;
      width: 40px;
      height: 40px;
      background-image: url('https://raw.githubusercontent.com/amenadam/adey-abeba-effects/main/assets/adey-abeba.png');
      background-size: contain;
      background-repeat: no-repeat;
      pointer-events: none;
      animation: fall linear forwards;
      z-index: 99999;
    }

    @keyframes fall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "adey-abeba";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 5 + Math.random() * 5 + "s";
    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), 10000);
  }

  // Keep spawning flowers
  setInterval(createFlower, 800);
})();
