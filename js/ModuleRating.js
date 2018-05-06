class ModuleRating {
  constructor(controller) {
    this.controller = controller;
    this.selectedLevel = "E";

    this.ratingSection = document.getElementById('ratingSection');
    this.ratingTable = document.getElementById('ratingTable');

    this.btnShowRatingSection = document.getElementById('btnShowRatingSection');
    this.btnShowRatingSection.addEventListener('click', this.show.bind(this), false)

    this.ratingLevelButtons = document.getElementById('ratingLevelButtons');
    this.ratingLevelButtons.addEventListener('click', this.heandlerLevelButtons.bind(this), false);

    this.btnHideCloseRating = document.getElementById('btnHideCloseRating');
    this.btnHideCloseRating.addEventListener('click', this.hide.bind(this), false);

    this.loadRaiting();
    this.subscribe();
  }

  subscribe() {
    const subscribes = [{
      'action': "update-rating",
      'heandler': this.heandlerNotifications.bind(this),
    }];

    if (this.controller) {
      this.controller.store.subscribeToNotifications(subscribes);
    } else {
      console.log("error");
    }
  }

  heandlerNotifications(notification) {
    console.log("heandlerNotifications");
    console.log(notification);
    this.updateTable();
  }

  createRowProfile(profilePlayer, index) {
    let profileRow = document.createElement("tr");
    profileRow.classList.add("profile-row");

    let number = document.createElement("td");
    number.innerHTML = index;

    let tdFirstName = document.createElement("td");
    tdFirstName.innerHTML = profilePlayer["firstName"];

    let tdLastName = document.createElement("td");
    tdLastName.innerHTML = profilePlayer["lastName"];

    let tdWrapper = document.createElement("td");
    tdWrapper.innerHTML = profilePlayer['wrapper'];

    let tdTime = document.createElement("td");
    tdTime.innerHTML = stopwatch.toHHMMSS(profilePlayer['time']);

    profileRow.appendChild(number);
    profileRow.appendChild(tdFirstName);
    profileRow.appendChild(tdLastName);
    profileRow.appendChild(tdWrapper);
    profileRow.appendChild(tdTime);

    return profileRow;
  }

  heandlerLevelButtons(e) {
    const level = e.target.getAttribute('level');

    if (level) {
      soundPlayer.playClickButtonSound();
      const buttons = this.ratingLevelButtons.querySelectorAll('button');
      const buttons_len = buttons.length;

      for (let i = 0; i < buttons_len; i++) {
        buttons[i].classList.remove('button-selected');
      }

      e.target.classList.add('button-selected');
    }

    if (level === "E") {
      console.log('heandlerLevelButtons - E');
      this.selectedLevel = "E";
      this.updateTable();
    } else if (level === "M") {
      console.log('heandlerLevelButtons - M');
      this.selectedLevel = "M";
      this.updateTable();
    } else if (level === "H") {
      console.log('heandlerLevelButtons - H');
      this.selectedLevel = "H";
      this.updateTable();
    }
  }

  loadRaiting() {
    this.arrayProfilesByRating = this.controller.store.getAllRatingByLevel(this.selectedLevel);
    this.render();
  }

  hide() {
    soundPlayer.playShowCloseTableSound();

    this.ratingTable.classList.add('effect-hide');

    setTimeout(() => {
      this.ratingSection.classList.add('hide');
      this.ratingTable.classList.remove('effect-hide');
      stopwatch.play();
    }, 600);
  }

  show() {
    stopwatch.pause();
    this.updateTable();
    soundPlayer.playShowCloseTableSound();

    this.ratingSection.classList.remove('hide');
  }

  clear() {
    let rows = this.ratingTable.querySelectorAll(".profile-row");

    for (let index = 0; index < rows.length; index++) {
      rows[index].remove();
    }
  }

  updateTable() {
    this.clear();
    this.arrayProfilesByRating = this.controller.store.getAllRatingByLevel(this.selectedLevel);
    this.render();
  }

  render() {
    const that = this;
    function compareByLevel(usersA, usersB) {
      return usersA.time - usersB.time;
    }

    this.arrayProfilesByRating.sort(compareByLevel);

    if (this.arrayProfilesByRating.length > 0) {
      const arr_len = this.arrayProfilesByRating.length;

      for (let index = 0; index < arr_len; index++) {
        let profileRow = this.createRowProfile(this.arrayProfilesByRating[index], index + 1);
        this.ratingTable.appendChild(profileRow);
      }
    } else {
      this.clear();
    }
  }

}