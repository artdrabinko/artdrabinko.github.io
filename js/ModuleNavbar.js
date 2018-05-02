class ModuleNavbar {
  constructor(controller, moduleProfiles) {
    this.controller = controller;
    this.moduleProfiles = moduleProfiles;

    this.navBar = document.getElementById('navBar');

    this.btnShowRatingSection = document.getElementById('btnShowRatingSection');
    this.btnShowRatingSection.addEventListener('click', this.hendlerButtonRatingSection.bind(this), false);

    this.btnPreviousSection = document.getElementById('btnPreviousSection');
    this.btnPreviousSection.addEventListener('click', this.hendlerButtonPreviousSection.bind(this), false);

    this.btnContinue = document.getElementById('btnContinue');
    this.btnContinue.addEventListener('click', this.showSectionUserForm.bind(this), false);

    this.btnShowRulesSection = document.getElementById('btnShowRulesSection');
    this.btnShowRulesSection.addEventListener('click', this.showSectionRules.bind(this), false);

    this.btnShowProfiles = document.getElementById('btnShowProfiles');
    this.btnShowProfiles.addEventListener('click', this.showProfilesTable.bind(this), false);

    this.buttonMenuGame = document.getElementById('buttonMenuGame');
    this.buttonMenuGame.addEventListener('click', this.heandlerButtonMenuGame.bind(this), false);

    this.menuGameSettings = document.getElementById('menuGameSettings');
    this.menuGameSettings.addEventListener('click', this.heandlerMenuGameSettings.bind(this), false);

    this.labelGameTime = document.getElementById('gameTime');

    document.body.addEventListener('click', this.hideMenuGameSettings.bind(this), false);

    this.subscribe();
  }

  hide() {
    this.navBar.classList.add('hide');
  }

  show() {
    this.navBar.classList.remove('hide');
  }

  showSectionRules() {
    soundPlayer.playClickButtonSound();
    this.hide();
    this.controller.router.routToSectionRules();
  }

  showSectionUserForm() {
    soundPlayer.playClickButtonSound();
    this.show();
    this.controller.router.routToSectionUserForm();
  }

  showProfilesTable() {
    soundPlayer.playShowCloseTableSound();
    this.moduleProfiles.show();
  }

  showMenuGameSettings() {
    this.menuGameSettings.classList.remove('hide');
    stopwatch.pause();
  }

  hideMenuGameSettings() {
    this.menuGameSettings.classList.add('hide');
    stopwatch.play();
  }

  subscribe() {
    const subscribes = [{
      'action': "start-game",
      'heandler': this.heandlerNotifications.bind(this),
    }, {
      'action': "all-settings-downloaded",
      'heandler': this.heandlerNotifications.bind(this),
    } ];

    if (this.controller) {
      this.controller.subscribeToNotifications(subscribes);
    } else {
      console.log("error");
    }
  }

  heandlerNotifications(notification) {
    console.log("heandlerNotifications");
    console.log(notification);

    if (notification.action === "start-game") {
      this.btnShowProfiles.classList.add('hide');
      this.btnShowRulesSection.classList.add('hide');
      this.btnPreviousSection.classList.add('hide');

      this.btnShowRatingSection.classList.remove('hide');
      this.buttonMenuGame.classList.remove('hide');
      this.labelGameTime.classList.remove('hide');

      const firstName = this.controller.store.getCurrentProfileName();
      document.getElementById("userName").innerHTML = firstName;
    }

    if (notification.action === "all-settings-downloaded") {
      this.btnShowRulesSection.classList.add('hide');
      this.btnShowProfiles.classList.add('hide');

      this.btnPreviousSection.classList.remove('hide');
      this.buttonMenuGame.classList.remove('hide');
    }
  }

  heandlerMenuGameSettings(e){
    e.stopPropagation();
  }

  heandlerButtonMenuGame(e) {
    console.log("heandlerButtonMenuGame");
    e.stopPropagation();
    soundPlayer.playClickButtonSound();
    
    if (this.menuGameSettings.classList.contains('hide')) {
      this.showMenuGameSettings();
    } else {
      this.hideMenuGameSettings();
    }
  }

  /*
  hendler возвращает пользователя на предыдущий этап
  */
  hendlerButtonPreviousSection() {
    console.log('hendlerButtnoPreviousSection');
    soundPlayer.playClickButtonSound();

    this.controller.router.routBackToSettingsWrappers();
  }

  hendlerButtonRatingSection(){
    console.log('hendlerButtonRatingSection');
    
  }
}