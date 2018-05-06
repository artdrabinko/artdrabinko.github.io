class GameArea {
  constructor(controller) {
    this.areaSettings = {
      level: "M",
      countCards: 18,
      wrapperCards: "girls",
      cardsSizeStyle: "card-size-medium",
      backgroundImage: "url('https://dcgamedevblog.files.wordpress.com/2014/09/bg1.jpg')",
    }

    this.counterRemainingCards = this.areaSettings.countCards;
    this.arrayCardsToRemove = [];
    this.controller = controller;
    this.gameArea = document.getElementById('gameArea');

    this.buttonShowGameArena = document.getElementById('buttonShowGameArena');
    this.buttonShowGameArena.addEventListener('click', this.showGameArena.bind(this), false);

    this.gameArea.addEventListener('click', this.heandlerClickArea.bind(this), false)
    this.rain = document.getElementById('rain');

    this.btnNewGame = document.getElementById("btnNewGame");
    this.btnNewGame.addEventListener('click', this.restartGame.bind(this), false);

    this.carusel = document.getElementById('caruselSection');

    this.subscribe();
  }

  subscribe() {
    const subscribes = [{
      'action': "start-game",
      'heandler': this.heandlerNotifications.bind(this),
    }, ];

    if (this.controller) {
      this.controller.subscribeToNotifications(subscribes);
    } else {
      console.log("error");
    }
  }

  heandlerEntryButton(event) {
    if (event.keyCode === 13 && this.isShowCarusel) {
      this.showGameArena();
    }
  }

  showButtonEntryToArea() {
    setTimeout(() => {
      document.getElementById('progessBar').classList.add('hide');
      this.buttonShowGameArena.classList.remove('hide');
      window.onkeyup = this.heandlerEntryButton.bind(this);
      this.isShowCarusel = true;
    }, 2000);
  }

  showPreviewGameCarusel() {
    const wrapper = this.areaSettings.wrapperCards;
    const bgWrapperCarusel = configWrappers[wrapper].wrapperLink;
    const wrapperCount = configWrappers[wrapper].frontSideLinks.length;

    document.getElementById('caruselFrontSide')
      .style.backgroundImage = bgWrapperCarusel;

    this.caruselInterval = setInterval(() => {
      const bgUrl = configWrappers[wrapper]
        .frontSideLinks[Math.floor(Math.random() * wrapperCount)];

      document.getElementById('caruselBackside')
        .style.backgroundImage = bgUrl;

      carusel.classList.add('active-card');
      setTimeout(() => {
        carusel.classList.remove('active-card');

      }, 2500);

    }, 4000);

    this.carusel.classList.remove('hide');
    this.showButtonEntryToArea();
  }

  hidePreviewGameCarusel() {
    this.carusel.classList.add('hide');
   
    this.isShowCarusel = false;

    clearInterval(this.caruselInterval);

    this.buttonShowGameArena.classList.add('hide');
    document.getElementById('progessBar').classList.remove('hide');
  }

  showGameArena() {
    document.getElementById('settingsLevel').classList.add('hide');
    this.hidePreviewGameCarusel();
    this.gameArea.classList.remove('hide');
    
    stopwatch.start();
    soundPlayer.playStartSound();
    this.controller.notifySubscribers("game-loaded");
  }

  hideGameArena() {
    this.gameArea.classList.add('hide');
  }

  runRain() {
    this.rain.classList.remove('hide');
  }

  stopRain() {
    this.rain.classList.add('hide');
  }

  heandlerNotifications(notification) {
    console.log("heandlerNotifications");
    console.log(notification);

    if (notification.action === "start-game") {
      this.startGame();
    }
  }

  heandlerClickArea(e) {
    const currentSelectedCard = e.target.parentElement;

    if (currentSelectedCard.classList.contains('game-card')) {

      currentSelectedCard.classList.add('active-card', 'selected');

      if (this.previousSelectedCard && this.previousSelectedCard !== currentSelectedCard) {

        this.compareCards(this.previousSelectedCard, currentSelectedCard);
        this.previousSelectedCard = null;

      } else {
        this.previousSelectedCard = currentSelectedCard;
      }

    }
  }

  setArenaBackground() {
    const nameWrapper = this.areaSettings.wrapperCards;

    if (configWrappers[nameWrapper].backgroundImageLink) {
      const bgUrl = configWrappers[nameWrapper].backgroundImageLink;
      document.body.style.backgroundImage = bgUrl;
    }
  }

  setAreaSettings(playerSettings) {
    this.areaSettings.level = playerSettings.level;
    this.areaSettings.wrapperCards = playerSettings.wrapper;
    this.setArenaBackground();

    switch (playerSettings.level) {
      case "E":
        this.counterRemainingCards = 10;
        this.areaSettings.countCards = 10;
        this.areaSettings.cardsSizeStyle = "card-size-large";
        break;
      case "M":
        this.counterRemainingCards = 18;
        this.areaSettings.countCards = 18;
        this.areaSettings.cardsSizeStyle = "card-size-medium";
        break;
      case "H":
        this.counterRemainingCards = 24;
        this.areaSettings.countCards = 24;
        this.areaSettings.cardsSizeStyle = "card-size-small";
        break;
      default:
        console.log(`We have a trouble!`);
        break;
    }
  }

  compareGameTimes() {
    const currtentGameTime = stopwatch.getTimeSeconds();
    console.log(currtentGameTime);
    const playerLevel = this.playerSettings.level;
    console.log(playerLevel);

    this.controller
      .store.compareGameTimesByLevel(currtentGameTime, playerLevel);
  }

  checkCounterRemainingCards() {
    if (this.counterRemainingCards === 0) {
      this.playerWon();
    } else {
      soundPlayer.playMatchSound();
    }

    if (this.counterRemainingCards === 2) {
      soundPlayer.playLastPairSound();
    }
  }

  runGarbageCards() {
    const arr_len = this.arrayCardsToRemove.length;

    for (let i = 0; i < arr_len; i++) {
      const card = this.arrayCardsToRemove.pop();
      card.classList.add('effect-bounce');
      card.classList.remove('selected');

      setTimeout(() => {
        card.classList.add('hidden');
      }, 1400);
    }

    this.counterRemainingCards -= 2;
    this.checkCounterRemainingCards();
  }

  compareCards(previousSelectedCard, currentSelectedCard) {
    const prevCardBackUrl = previousSelectedCard
      .getElementsByClassName("theback")[0]
      .style.backgroundImage;

    const currentCardBackUrl = currentSelectedCard
      .getElementsByClassName("theback")[0]
      .style.backgroundImage;

    if (prevCardBackUrl === currentCardBackUrl) {
      this.arrayCardsToRemove.push(previousSelectedCard);
      this.arrayCardsToRemove.push(currentSelectedCard);

      setTimeout(() => {
        this.runGarbageCards();
      }, 1000);
    } else {
      soundPlayer.playLaughSound();

      setTimeout(() => {
        previousSelectedCard.classList.remove('active-card', 'selected');
        currentSelectedCard.classList.remove('active-card', 'selected');
      }, 1000);
    }
  }

  getWrapperBackgroundUrl() {
    const wrapperUrl = configWrappers[this.areaSettings.wrapperCards].wrapperLink;
    console.log(wrapperUrl);

    return wrapperUrl;
  }

  getRandomBackgroundUrl() {
    const arrayUrls = configWrappers[this.areaSettings.wrapperCards].frontSideLinks;
    const randomNumber = Math.floor(Math.random() * arrayUrls.length);

    return arrayUrls[randomNumber];
  }

  createCard() {
    const card = document.createElement('div');
    card.classList.add('card', 'game-card', this.areaSettings.cardsSizeStyle);

    let frontSide = document.createElement('div');
    frontSide.classList.add('thefront');
    frontSide.style.backgroundImage = this.getWrapperBackgroundUrl();

    let backSide = document.createElement('div');
    backSide.classList.add('theback');
    backSide.style.backgroundImage = this.getRandomBackgroundUrl();

    card.appendChild(frontSide);
    card.appendChild(backSide);

    return card;
  }

  generateArrayRandomCards() {
    let arrayCards = [];
    const countCards = this.areaSettings.countCards;

    for (let i = 0; i < countCards / 2; i++) {
      const card = this.createCard();
      arrayCards.push(card);
      arrayCards.push(card.cloneNode(true));
    }

    return arrayCards;
  }

  getArrayRandomPositions(count) {
    let arrayR = [];
    for (let i = 0; i < count; i++) {
      arrayR.push(i);
    }

    const arr_len = arrayR.length;
    let max = arr_len - 1;

    for (let i = 0; i < arr_len; i++) {
      let r = Math.floor(Math.random() * max);

      let tmp = arrayR[r];
      arrayR[r] = arrayR[max];
      arrayR[max] = tmp;

      max--;
    }

    return arrayR;
  }

  fillArena() {
    const arrayCards = this.generateArrayRandomCards();
    const countCards = arrayCards.length;

    const arrayRandomPositions = this.getArrayRandomPositions(countCards);

    for (let i = 0; i < countCards; i++) {
      const randomPos = arrayRandomPositions[i];
      this.gameArea.appendChild(arrayCards[randomPos]);
      // this.addCardOnAreaWithDelay(arrayCards[i]);
    }
  }


  /**************Блин артур убери этот трэш****************/
  playerWon() {
    soundPlayer.playWinSound();
    this.runRain();
    stopwatch.stop();
    this.compareGameTimes();

    setTimeout(() => {
      function callback(){
        this.restartGame();
      }
  
      confirmDialog.confirm("Congratulations! You won!<br/ > Start new game?", callback.bind(this));
    }, 800);

  }

  pauseGame() {

  }

  resumeGame() {

  }

  restartGame() {
    function callback(){
      soundPlayer.playStopWinSound();
      this.stopRain();
      stopwatch.stop();
      stopwatch.reset();
      this.gameArea.innerHTML = "";
      this.gameArea.classList.add('hide');
      document.getElementById('btnShowRatingSection').classList.add('hide');
      document.getElementById('gameTime').classList.add('hide');
      document.getElementById('menuGameSettings').classList.add('hide');
      document.getElementById('settingsLevel').classList.add('hide');
      document.getElementById('btnPreviousSection').classList.remove('hide');
      this.controller.router.routToSettingsWrappers();
    
    }

    confirmDialog.confirm("Are you sure?", callback.bind(this));
  }
  /**************Блин артур убери этот трэш****************/



  startGame() {
    console.log("start game - Area");
    this.playerSettings = this.controller.store.getCurrentProfileSettings();

    this.setAreaSettings(this.playerSettings);
    this.showPreviewGameCarusel();
    this.fillArena();
  }


}