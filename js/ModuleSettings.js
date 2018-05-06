class ModuleSettings {
  constructor(controller) {
    this.controller = controller;

    this.settingsWrapper = document.getElementById('settingsWrappers');
    this.listWrappers = document.getElementById('listWrappers');
    this.settingsLevel = document.getElementById('settingsLevel');

    this.listWrappers.addEventListener('click', this.heandlerSettigsWrapper.bind(this), false);
    this.settingsLevel.addEventListener('click', this.heandlerSettigsLevel.bind(this), false);

    this.selectedWrapper = '';
    this.slideIsRun = false;

    this.buttonSetWrapper = document.getElementById('buttonSetWrapper');
    this.buttonSetWrapper.addEventListener('click', this.heandlerButtonSetWrapper.bind(this), false);

    this.buttonSlideLeft = document.getElementById('buttonSlideLeft');
    this.buttonSlideRight = document.getElementById('buttonSlideRight');

    this.buttonSlideLeft.addEventListener('click', this.heandlerSlideButtons.bind(this), false);
    this.buttonSlideRight.addEventListener('click', this.heandlerSlideButtons.bind(this), false);

    this.buttonStartGame = document.getElementById('buttonStartGame');
    this.buttonStartGame.addEventListener('click', this.heandlerButtonStartGame.bind(this), false);

    this.loadCardWrappers();
    this.subscribe();

    this.interval = setInterval(()=>{
      if(!this.slideIsRun){
        this.nextSlideWrapper();
      }
    }, 5000);
  }

  showSettingsWrappers() {
    this.settingsWrapper.classList.remove('hide');
    
  }

  hideSettingsWrappers() {
    this.settingsWrapper.classList.add('hide');
    clearInterval(this.interval);
  }

  showButtonSetWrapper() {
    this.buttonSetWrapper.classList.remove('hide');
  }

  hideButtonSetWrapper() {
    this.buttonSetWrapper.classList.add('hide');
  }

  heandlerButtonSetWrapper() {
    soundPlayer.playClickButtonSound();
    console.log(this.selectedWrapper);

    this.controller.store.setProfileGameWrapper(this.selectedWrapper);
    this.hideSettingsWrappers();
    this.showSettigsLevel();
  }

  createCardWrapper(name, wrapperUrl) {
    const li = document.createElement('li');
    const wrapperContainer = document.createElement('div');
    const card = document.createElement('div');
    const cardSpan = document.createElement('span');

    wrapperContainer.setAttribute("wrapper", name);
    wrapperContainer.classList.add("flex", "column", "h-center");

    card.classList.add("wrapper-card-slider");
    card.style.backgroundImage = wrapperUrl;
    cardSpan.innerHTML = name.toUpperCase();

    wrapperContainer.appendChild(card);
    wrapperContainer.appendChild(cardSpan);
    li.appendChild(wrapperContainer);

    return li;
  }

  loadCardWrappers() {
    const wrapperUrl = configWrappers;

    let counter = 1;
    for (const key in configWrappers) {
      const wrapperUrl = configWrappers[key].wrapperLink;
      const cardWrapper = this.createCardWrapper(key, wrapperUrl);

      if (counter > 3) {
        cardWrapper.classList.add('hide');
      }

      this.listWrappers.appendChild(cardWrapper);
      counter++;
    }
  }

  setSelectedWrapperHTMLElement(wrapper) {
    if (this.selectedWrapperHTMLElement) {
      this.selectedWrapperHTMLElement.classList.remove('selected');
    }

    wrapper.classList.add('selected');
    this.selectedWrapperHTMLElement = wrapper;
  }

  checkHideSlide(slide) {
    const cards = slide.getElementsByClassName("selected");

    if (cards.length) {
      cards[0].classList.remove("selected");
      this.hideButtonSetWrapper();
    }
  }

  previousSlideWrapper() {
    this.slideIsRun = true;
    const listSlides = this.listWrappers.querySelectorAll('li');
    const list_len = listSlides.length;

    for (let i = 0; i < list_len; i++) {
      const slide = listSlides[i];
      slide.classList.add('effect-show-left-slide');
      setTimeout(function(){
        slide.classList.remove('effect-show-left-slide');
      }, 700);
      if(i == 0){
        setTimeout(()=>{
          slide.classList.add('hide');
          this.listWrappers.appendChild(slide);
          this.slideIsRun = false;
        }, 700);
      }
      if (i === 3) {
        slide.classList.remove('hide');
        this.checkHideSlide(this.listWrappers.firstChild);
      }
    }
  }

  nextSlideWrapper() {
    this.slideIsRun = true;
    const listSlides = this.listWrappers.querySelectorAll('li');
    const list_len = listSlides.length;

    for (let i = 0; i < list_len; i++) {
      const slide = listSlides[i];
      slide.classList.add('effect-show-right-slide');
      setTimeout(()=>{
        slide.classList.remove('effect-show-right-slide');
      }, 650);
      if (i === 2) {
        setTimeout(()=>{
          slide.classList.add('hide');
          this.slideIsRun = false;
        }, 650);

        this.checkHideSlide(slide);
        this.listWrappers.insertBefore(this.listWrappers.lastChild, listSlides[0]);
        this.listWrappers.firstChild.classList.remove("hide");
      }
    }
  }

  heandlerSlideButtons(e) {
    const buttonId = e.target.id;

    if (buttonId === 'buttonSlideRight' && !this.slideIsRun) {
      soundPlayer.playSlideWrapper();
      clearInterval(this.interval);
      this.nextSlideWrapper();
    }

    if (buttonId === 'buttonSlideLeft' && !this.slideIsRun) {
      soundPlayer.playSlideWrapper();
      clearInterval(this.interval);
      this.previousSlideWrapper();
    }
  }

  heandlerSettigsWrapper(e) {
    const cardWrapper = e.target.parentElement;
    const wrapper = cardWrapper.getAttribute('wrapper');

    if (wrapper) {
      soundPlayer.playClickButtonSound();
      clearInterval(this.interval);
      this.setSelectedWrapperHTMLElement(e.target);
      this.selectedWrapper = wrapper;
      this.showButtonSetWrapper();
    }
  }

  showSettigsLevel() {
    this.settingsLevel.classList.remove('hide');
  }

  hideSettigsLevel() {
    this.hideButtonStartGame();
    this.settingsLevel.classList.add('hide');
  }

  showButtonStartGame() {
    this.buttonStartGame.classList.remove('hide');
  }

  hideButtonStartGame() {
    this.buttonStartGame.classList.add('hide');
  }

  heandlerButtonStartGame() {
    soundPlayer.playClickButtonSound();
    
    this.hideSettigsLevel();
    this.controller.notifySubscribers("start-game");
    this.controller.router.routToGameArea();
    document.getElementById('settingsLevel').classList.add('hide');
  }

  setGameLevel(level) {
    this.controller.store.setProfileGameLevel(level);
    this.showButtonStartGame();
  }

  heandlerSettigsLevel(e) {
    const level = e.target.getAttribute('level');

    if (level) {
      soundPlayer.playClickButtonSound();
      if (this.previousLevelElement) {
        this.previousLevelElement.classList.remove('button-selected');
        e.target.classList.add('button-selected')
        this.previousLevelElement = e.target;
      } else {
        this.previousLevelElement = e.target;
        this.previousLevelElement.classList.add('button-selected')
      }

      this.setGameLevel(level);
    }
  }

  subscribe() {
    const subscribes = [{
      'action': "all-settings-downloaded",
      'heandler': this.heandlerNotifications.bind(this),
    }, ];

    if (this.controller) {
      this.controller.subscribeToNotifications(subscribes);
    } else {
      console.log("error");
    }
  }

  heandlerNotifications(notification) {
    if (notification.action === "all-settings-downloaded") {
      const level = this.controller.store.getCurrentProfileLevel();
      this.setGameLevel(level);

      const buttons = this.settingsLevel.getElementsByClassName('button-blood');

      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        if (button.getAttribute('level') === level) {
          button.classList.add('button-selected');
          this.previousLevelElement = button;
          break;
        }
      }

    }
  }
}