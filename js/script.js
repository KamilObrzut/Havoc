const calculateHeroSize = () => {
  const heroArea = document.querySelector(".hero-area");
  const heroElements = document.querySelectorAll(".hero");
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
calculateHeroSize();

const calculateFontSize = () => {
  const textsToResize = document.querySelectorAll(".description");
  const heroDivs = document.querySelectorAll(".hero");

  heroDivs.forEach((heroDiv) => {
    const heroDivWidth = heroDiv.offsetWidth;

    textsToResize.forEach((textToResize) => {
      const scale = heroDivWidth / 180;
      const fontSize = 10 * scale;

      textToResize.style.fontSize = `${fontSize}px`;
    });
  });
};
calculateFontSize();

const calculateCardWidthLastChild = () => {
  const enemyDeck = document.querySelector(".enemy-deck");
  const lastCardInEnemyDeck = enemyDeck.lastElementChild;
  const playerDeck = document.querySelector(".player-deck");
  const lastCardInPlayerDeck = playerDeck.lastElementChild;
  const enemyFightCards = document.querySelector(".enemy-fight-cards");
  const lastCardinEnemyFightCards = enemyFightCards.lastElementChild;
  const playerFightCards = document.querySelector(".player-fight-cards");
  const lastCardinPlayerFightCards = playerFightCards.lastElementChild;

  const cardWidth = lastCardInEnemyDeck.offsetHeight * 0.89;
  const cardFightWidth = lastCardinEnemyFightCards.offsetHeight * 0.89;
  lastCardInEnemyDeck.style.width = `${cardWidth}px`;
  lastCardInPlayerDeck.style.width = `${cardWidth}px`;
  lastCardinEnemyFightCards.style.width = `${cardFightWidth}px`;
  lastCardinPlayerFightCards.style.width = `${cardFightWidth}px`;

  document.documentElement.style.setProperty("--card-width", `${cardWidth}px`);
  document.documentElement.style.setProperty(
    "--cardFight-width",
    `${cardFightWidth}px`
  );
};
calculateCardWidthLastChild();

window.addEventListener("resize", calculateHeroSize);
window.addEventListener("resize", calculateFontSize);
window.addEventListener("resize", calculateCardWidthLastChild);
