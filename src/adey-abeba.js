(function () {
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
      animation: fall linear forwards;
      z-index: 99999;
      filter: drop-shadow(0 0 5px gold); /* subtle glow */
    }

    @keyframes fall {
      0% { 
        transform: translateY(0) translateX(0) rotate(0deg) scale(1); 
        opacity: 1; 
        filter: blur(0px) drop-shadow(0 0 5px gold);
      }
      50% { 
        transform: translateY(50vh) translateX(20px) rotate(180deg) scale(1.2); 
        opacity: 0.9;
        filter: blur(1px) drop-shadow(0 0 8px gold);
      }
      100% { 
        transform: translateY(100vh) translateX(-20px) rotate(360deg) scale(1); 
        opacity: 0; 
        filter: blur(2px) drop-shadow(0 0 10px orange);
      }
    }
  `;
  document.head.appendChild(style);

  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "adey-abeba";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 6 + Math.random() * 6 + "s";
    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), 12000);
  }

  setInterval(createFlower, 700);
})();
