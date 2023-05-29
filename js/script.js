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
  const btnFightEnemy = document.querySelector(".btn-fight-enemy");
  const btnFightPlayer = document.querySelector(".btn-fight-player");

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
  let usedCards = [];
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
      usedCards.push(card);
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
      usedCards.push(card);
    });
  };
  createCardDivs();

  // Marking cards functions
  const enemyCards = Array.from(enemyDeck.childNodes);
  const playerCards = Array.from(playerDeck.childNodes);
  let enemyMarkedCards = [];
  let playerMarkedCards = [];

  enemyCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const cardClassList = event.target.classList;
      const cardColor = cardClassList[1].split("-")[0];

      if (btnFightEnemy.classList.contains("disable")) {
        return;
      }

      if (enemyMarkedCards.length === 0) {
        enemyMarkedCards.push(card);
        cardClassList.add("marked");
      } else if (cardClassList.contains("marked")) {
        cardClassList.remove("marked");
        enemyMarkedCards = enemyMarkedCards.filter((markedCard) => markedCard !== card);
      } else if (cardColor === enemyMarkedCards[0].classList[1].split("-")[0] || cardColor.includes("white")) {
        enemyMarkedCards.push(card);
        cardClassList.add("marked");
      }
    });
  });

  playerCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const cardClassList = event.target.classList;
      const cardColor = cardClassList[1].split("-")[0];

      if (btnFightPlayer.classList.contains("disable")) {
        return;
      }

      if (playerMarkedCards.length === 0) {
        playerMarkedCards.push(card);
        cardClassList.add("marked");
      } else if (cardClassList.contains("marked")) {
        cardClassList.remove("marked");
        playerMarkedCards = playerMarkedCards.filter((markedCard) => markedCard !== card);
      } else if (cardColor === playerMarkedCards[0].classList[1].split("-")[0] || cardColor.includes("white")) {
        playerMarkedCards.push(card);
        cardClassList.add("marked");
      }
    });
  });

  // Move cards to fight function
  const moveEnemyCardsToFight = () => {
    enemyCards.forEach((card) => {
      if (card.classList.contains("marked") && enemyCards.includes(card)) {
        enemyFightCards.appendChild(card);
        card.classList.remove("marked");
      }
    });
  };
  const moveEnemyCardsToDeck = () => {
    const enemyAttackCards = Array.from(enemyFightCards.childNodes);
    enemyAttackCards.forEach((card) => {
      enemyDeck.appendChild(card);
      card.classList.remove("marked");
    });
    enemyMarkedCards = [];
  };

  const movePlayerCardsToFight = () => {
    playerCards.forEach((card) => {
      if (card.classList.contains("marked") && playerCards.includes(card)) {
        playerFightCards.appendChild(card);
        card.classList.remove("marked");
      }
    });
  };
  const movePlayerCardsToDeck = () => {
    const playerAttackCards = Array.from(playerFightCards.childNodes);
    playerAttackCards.forEach((card) => {
      playerDeck.appendChild(card);
      card.classList.remove("marked");
    });
    playerMarkedCards = [];
  };

  btnDownEnemy.addEventListener("click", moveEnemyCardsToFight);
  btnUpEnemy.addEventListener("click", moveEnemyCardsToDeck);
  btnUpPlayer.addEventListener("click", movePlayerCardsToFight);
  btnDownPlayer.addEventListener("click", movePlayerCardsToDeck);

  //Animation attack
  const heroEnemy = document.querySelector(".enemy-hero");
  const heroPlayer = document.querySelector(".player-hero");

  const enemyAnimationAttack = () => {
    if (enemyFightCards.childElementCount === 0) {
      return;
    }
    heroEnemy.classList.add("enemy-hero-attack-animation");
    setTimeout(() => {
      heroEnemy.classList.remove("enemy-hero-attack-animation");
    }, 1000);
  };
  const playerAnimationAttack = () => {
    if (playerFightCards.childElementCount === 0) {
      return;
    }
    heroPlayer.classList.add("player-hero-attack-animation");
    setTimeout(() => {
      heroPlayer.classList.remove("player-hero-attack-animation");
    }, 1000);
  };

  btnFightEnemy.addEventListener("click", enemyAnimationAttack);
  btnFightPlayer.addEventListener("click", playerAnimationAttack);

  //FirstTurn Function
  const firstTurn = () => {
    const enemySpeedValue = document.querySelector(".enemy-speed").textContent.slice(-1);
    const playerSpeedValue = document.querySelector(".player-speed").textContent.slice(-1);

    if (enemySpeedValue > playerSpeedValue) {
      btnFightPlayer.classList.add("disable");
    } else {
      btnFightEnemy.classList.add("disable");
    }
  };
  firstTurn();

  //Toggle fight button
  const toggleButtons = () => {
    btnFightEnemy.classList.toggle("disable");
    btnFightPlayer.classList.toggle("disable");
  };

  //Fight functions
  const fightEnemy = () => {
    if (enemyFightCards.childElementCount === 0) {
      return;
    }

    let totalAttack = 0;
    let totalHeal = 0;
    let totalDraw = 0;

    enemyFightCards.childNodes.forEach((card) => {
      const attack = parseInt(card.getAttribute("data-attack"));
      const heal = parseInt(card.getAttribute("data-heal"));
      const draw = parseInt(card.getAttribute("data-draw"));

      totalAttack += attack;
      totalHeal += heal;
      totalDraw += draw;
    });

    while (enemyFightCards.firstChild) {
      enemyFightCards.removeChild(enemyFightCards.firstChild);
    }

    const changeHealth = () => {
      let playerHealthElement = document.querySelector(".player-health");
      let playerHealth = parseInt(playerHealthElement.textContent.slice(-1));
      let playerNewHealth = playerHealth - totalAttack;
      playerHealthElement.textContent = "Zdrowie: " + playerNewHealth + " " + "( - " + totalAttack + " )";
      playerHealthElement.style.color = "red";

      let enemyHealthElement = document.querySelector(".enemy-health");
      let enemyHealth = parseInt(enemyHealthElement.textContent.slice(-1));
      let enemyNewHealth = enemyHealth + totalHeal;
      enemyHealthElement.textContent = "Zdrowie: " + enemyNewHealth + " " + "( + " + totalHeal + " )";
      enemyHealthElement.style.color = "green";

      setTimeout(() => {
        playerHealthElement.style.color = "";
        playerHealthElement.textContent = "Zdrowie: " + playerNewHealth;
        enemyHealthElement.style.color = "";
        enemyHealthElement.textContent = "Zdrowie: " + enemyNewHealth;
      }, 2000);
    };
    changeHealth();

    const addNewCards = () => {
      const remainingCards = baseCardsDatabase.filter((card) => !usedCards.includes(card));

      for (let i = 0; i < totalDraw; i++) {
        if (remainingCards.length === 0) {
          break;
        }

        const randomIndex = Math.floor(Math.random() * remainingCards.length);
        const card = remainingCards.splice(randomIndex, 1)[0];

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", card.name);
        cardDiv.setAttribute("data-attack", card.attack);
        cardDiv.setAttribute("data-heal", card.heal);
        cardDiv.setAttribute("data-draw", card.draw);
        enemyDeck.appendChild(cardDiv);

        usedCards.push(card);
        console.log(usedCards);
      }
      enemyMarkedCards = [];
    };
    addNewCards();

    enemyMarkedCards = [];
    toggleButtons();
  };

  const fightPlayer = () => {
    if (playerFightCards.childElementCount === 0) {
      return;
    }

    let totalAttack = 0;
    let totalHeal = 0;
    let totalDraw = 0;

    playerFightCards.childNodes.forEach((card) => {
      const attack = parseInt(card.getAttribute("data-attack"));
      const heal = parseInt(card.getAttribute("data-heal"));
      const draw = parseInt(card.getAttribute("data-draw"));

      totalAttack += attack;
      totalHeal += heal;
      totalDraw += draw;
    });

    while (playerFightCards.firstChild) {
      playerFightCards.removeChild(playerFightCards.firstChild);
    }

    const changeHealth = () => {
      let enemyHealthElement = document.querySelector(".enemy-health");
      let enemyHealth = parseInt(enemyHealthElement.textContent.slice(-1));
      let enemyNewHealth = enemyHealth - totalAttack;
      enemyHealthElement.textContent = "Zdrowie: " + enemyNewHealth + " " + "( - " + totalAttack + " )";
      enemyHealthElement.style.color = "red";

      let playerHealthElement = document.querySelector(".player-health");
      let playerHealth = parseInt(playerHealthElement.textContent.slice(-1));
      let playerNewHealth = playerHealth + totalHeal;
      playerHealthElement.textContent = "Zdrowie: " + playerNewHealth + " " + "( + " + totalHeal + " )";
      playerHealthElement.style.color = "green";

      setTimeout(() => {
        enemyHealthElement.style.color = "";
        enemyHealthElement.textContent = "Zdrowie: " + enemyNewHealth;
        playerHealthElement.style.color = "";
        playerHealthElement.textContent = "Zdrowie: " + playerNewHealth;
      }, 2000);
    };
    changeHealth();

    const addNewCards = () => {
      const remainingCards = baseCardsDatabase.filter((card) => !usedCards.includes(card));

      for (let i = 0; i < totalDraw; i++) {
        if (remainingCards.length === 0) {
          break;
        }

        const randomIndex = Math.floor(Math.random() * remainingCards.length);
        const card = remainingCards.splice(randomIndex, 1)[0];

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", card.name);
        cardDiv.setAttribute("data-attack", card.attack);
        cardDiv.setAttribute("data-heal", card.heal);
        cardDiv.setAttribute("data-draw", card.draw);
        playerDeck.appendChild(cardDiv);

        usedCards.push(card);
        console.log(usedCards);
      }
    };
    addNewCards();

    playerMarkedCards = [];
    toggleButtons();
  };

  btnFightPlayer.addEventListener("click", fightPlayer);
  btnFightEnemy.addEventListener("click", fightEnemy);

  console.log(usedCards);

  window.addEventListener("resize", calculateHeroSize);
  window.addEventListener("resize", calculateFontSize);
  window.addEventListener("resize", calculateDeckCardWidth);
  window.addEventListener("resize", calculateFightCardWidth);
});
