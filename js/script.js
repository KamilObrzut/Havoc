document.addEventListener("DOMContentLoaded", () => {
  // Global variables
  const heroArea = document.querySelector(".hero-area");
  const heroElements = document.querySelectorAll(".hero");
  const textsToResize = document.querySelectorAll(".description");
  const enemyDeck = document.querySelector(".enemy-deck");
  const playerDeck = document.querySelector(".player-deck");
  const enemyFightCards = document.querySelector(".enemy-fight-cards");
  const playerFightCards = document.querySelector(".player-fight-cards");
  const btnDownEnemy = document.querySelector(".btn-down-enemy");
  const btnUpEnemy = document.querySelector(".btn-up-enemy");
  const btnDownPlayer = document.querySelector(".btn-down-player");
  const btnUpPlayer = document.querySelector(".btn-up-player");

  // Card database
  const baseCardsDatabase = [
    {
      name: "red-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "red-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "red-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "red-two-hit",
      attack: 2,
      heal: 0,
      draw: 0,
    },
    {
      name: "red-one-heal",
      attack: 0,
      heal: 1,
      draw: 0,
    },
    {
      name: "red-one-hit-one-draw",
      attack: 1,
      heal: 0,
      draw: 1,
    },
    {
      name: "blue-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "blue-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "blue-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "blue-two-hit",
      attack: 2,
      heal: 0,
      draw: 0,
    },
    {
      name: "blue-one-heal",
      attack: 0,
      heal: 1,
      draw: 0,
    },
    {
      name: "blue-one-hit-one-draw",
      attack: 1,
      heal: 0,
      draw: 1,
    },
    {
      name: "green-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "green-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "green-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "green-two-hit",
      attack: 2,
      heal: 0,
      draw: 0,
    },
    {
      name: "green-one-heal",
      attack: 0,
      heal: 1,
      draw: 0,
    },
    {
      name: "green-one-hit-one-draw",
      attack: 1,
      heal: 0,
      draw: 1,
    },
    {
      name: "yellow-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "yellow-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "yellow-one-hit",
      attack: 1,
      heal: 0,
      draw: 0,
    },
    {
      name: "yellow-two-hit",
      attack: 2,
      heal: 0,
      draw: 0,
    },
    {
      name: "yellow-one-heal",
      attack: 0,
      heal: 1,
      draw: 0,
    },
    {
      name: "yellow-one-hit-one-draw",
      attack: 1,
      heal: 0,
      draw: 1,
    },
    {
      name: "white-dodge",
      attack: 0,
      heal: 0,
      draw: 0,
    },
    {
      name: "white-two-draw",
      attack: 0,
      heal: 0,
      draw: 2,
    },
  ];

  // Interface Funcitions
  const calculateHeroSize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 667) {
      const heroAreaWidth = heroArea.offsetWidth;
      const heroAreaHeight = heroArea.offsetHeight;

      const heroWidth = 0.8 * heroAreaHeight;
      const heroHeight = 0.9 * heroAreaHeight;

      heroElements.forEach((heroElement) => {
        heroElement.style.width = `${heroWidth}px`;
        heroElement.style.height = `${heroHeight}px`;
      });
    } else {
      const heroAreaWidth = heroArea.offsetWidth;
      const heroAreaHeight = heroArea.offsetHeight;

      const heroWidth = 0.9 * heroAreaWidth;
      const heroHeight = heroAreaWidth;

      heroElements.forEach((heroElement) => {
        heroElement.style.width = `${heroWidth}px`;
        heroElement.style.height = `${heroHeight}px`;
      });
    }
  };

  const calculateFontSize = () => {
    heroElements.forEach((heroDiv) => {
      const heroDivWidth = heroDiv.offsetWidth;

      textsToResize.forEach((textToResize) => {
        const scale = heroDivWidth / 180;
        const fontSize = 10 * scale;

        textToResize.style.fontSize = `${fontSize}px`;
      });
    });
  };

  const calculateDeckCardWidth = () => {
    const parentHeight = enemyDeck.offsetHeight;
    const cardWidth = parentHeight * 0.82;
    document.documentElement.style.setProperty("--card-width", `${cardWidth}px`);
  };
  const calculateFightCardWidth = () => {
    const parentHeight = enemyFightCards.offsetHeight;
    const cardWidth = parentHeight * 0.8;
    document.documentElement.style.setProperty("--f-card-width", `${cardWidth}px`);
  };
  calculateDeckCardWidth();
  calculateFightCardWidth();
  calculateHeroSize();
  calculateFontSize();

  // Shuffling and Dealing cards function
  const createCardDivs = () => {
    const remainingCards = [...baseCardsDatabase];

    const playerCards = [];
    const playerAttackValue = document.querySelector(".player-attack").textContent.slice(-2);
    for (let i = 0; i < playerAttackValue; i++) {
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      const selectedCard = remainingCards.splice(randomIndex, 1)[0];
      playerCards.push(selectedCard);
    }

    playerCards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", card.name);
      cardDiv.setAttribute("data-attack", card.attack);
      cardDiv.setAttribute("data-heal", card.heal);
      cardDiv.setAttribute("data-draw", card.draw);
      playerDeck.appendChild(cardDiv);
    });

    const enemyCards = [];
    const enemyAttackValue = document.querySelector(".enemy-attack").textContent.slice(-2);
    for (let i = 0; i < enemyAttackValue; i++) {
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      const selectedCard = remainingCards.splice(randomIndex, 1)[0];
      enemyCards.push(selectedCard);
    }

    enemyCards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", card.name);
      cardDiv.setAttribute("data-attack", card.attack);
      cardDiv.setAttribute("data-heal", card.heal);
      cardDiv.setAttribute("data-draw", card.draw);
      enemyDeck.appendChild(cardDiv);
    });
  };
  createCardDivs();

  // Marking cards function
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.target.classList.toggle("marked");
    });
  });

  // Move cards to fight function
  const cardsCheckArr = [];
  let animateCards = true;

  const moveEnemyCardsToFight = () => {
    allCards.forEach((card) => {
      if (card.classList.contains("marked")) {
        enemyFightCards.appendChild(card);
        card.classList.remove("marked");
        animateCards = false;
      }
    });
  };
  const moveEnemyCardsToDeck = () => {
    allCards.forEach((card) => {
      if (card.classList.contains("marked")) {
        enemyDeck.appendChild(card);
        card.classList.remove("marked");
        animateCards = false;
      }
    });
  };

  const movePlayerCardsToFight = () => {
    allCards.forEach((card) => {
      if (card.classList.contains("marked")) {
        playerFightCards.appendChild(card);
        card.classList.remove("marked");
        animateCards = false;
      }
    });
  };
  const movePlayerCardsToDeck = () => {
    allCards.forEach((card) => {
      if (card.classList.contains("marked")) {
        playerDeck.appendChild(card);
        card.classList.remove("marked");
        animateCards = false;
      }
    });
  };

  btnDownEnemy.addEventListener("click", moveEnemyCardsToFight);
  btnUpEnemy.addEventListener("click", moveEnemyCardsToDeck);
  btnUpPlayer.addEventListener("click", movePlayerCardsToFight);
  btnDownPlayer.addEventListener("click", movePlayerCardsToDeck);

  window.addEventListener("resize", calculateHeroSize);
  window.addEventListener("resize", calculateFontSize);
  window.addEventListener("resize", calculateDeckCardWidth);
  window.addEventListener("resize", calculateFightCardWidth);
});
