class Storage {
  constructor() {
    this.listProfiles = [];
    this.usersRating = [];
    this.listSubscribers = [];
    this.currentProfileId = null;

    this.loadData();
    console.log(this.usersRating);
  }

  updateProfilesData() {
    localStorage.setItem("listProfiles", JSON.stringify(this.listProfiles));
  }

  updateRatingData() {
    console.log(this.usersRating);
    localStorage.setItem("usersRating", JSON.stringify(this.usersRating));

    this.notifySubscribers("update-rating");
  }

  loadData() {
    const loadedProfiles = JSON.parse(localStorage.getItem('listProfiles'));
    this.listProfiles = loadedProfiles ? loadedProfiles : [];

    const loadedRating = JSON.parse(localStorage.getItem('usersRating'));
    this.usersRating = loadedRating ? loadedRating : {
      'E': [],
      'M': [],
      'H': [],
    };
  }

  /* action - string is type a of actions "ADDED_PLAYER"
   */
  notifySubscribers(action) {
    for (let index = 0; index < this.listSubscribers.length; index++) {

      const subscriber = this.listSubscribers[index];

      if (subscriber["action"] === "ADDED_PLAYER") {

        subscriber['heandler']({
          "action": "ADDED_PLAYER",
          "notice": "ADDED_PLAYER, hello from Store",
        });

      }
      if (subscriber["action"] === "update-rating") {
        subscriber['heandler']({
          "action": "update-rating",
          "notice": "updated users rating",
        });
      }

    }
  }

  subscribeToNotifications(action, heandler) {
    console.log("subscribeToNotifications");

    this.listSubscribers.push({
      'action': action,
      'heandler': heandler,
    })
  }

  isPlayerExist(player) {
    for (let index = 0; index < this.listProfiles.length; index++) {
      if (this.listProfiles[index].email === player.email) {
        return true;
      }
    }

    return false;
  }

  addNewProfile(player) {
    if (this.isPlayerExist(player)) {
      return false;
    } else {
      this.listProfiles.push(player);
      localStorage.setItem("listProfiles", JSON.stringify(this.listProfiles));
      //this.notifySubscribers("ADDED_PLAYER");
      return true;
    }

  }

  selectAllProfiles() {
    return this.listProfiles.slice();
  }

  getAllRatingByLevel(level) {
    return this.usersRating[level].slice();
  }

  setCurrentProfile(userId) {
    this.currentProfileId = userId;
  }

  deepCompareRating(gameTime, level) {
    console.log("deepCompareRating");

    function compareByLevel(usersA, usersB) {
      return usersA.topScores[level] - usersB.topScores[level];
    }

    console.log(this.usersRating);
    this.usersRating[level].sort(compareByLevel);
    console.log(this.usersRating);

    for (let index = 0; index < this.usersRating[level].length; index++) {
      if (index > 10) {
        this.usersRating[level][index].pop();
      }
    }
    this.updateRatingData();
  }

  compareTimeGlobalRating(gameTime, level) {
    const ratingByLevel = this.usersRating[level];

    console.log(this.usersRating);
    console.log(this.usersRating[level]);

    if (ratingByLevel.length < 10) { //Т.е в массиве меньше 10 элементов
      this.usersRating[level].push(this.listProfiles[this.currentProfileId]);
      //this.updateRatingData();
      this.deepCompareRating(gameTime, level);
    } else { //в массиве больше 10 добовляй сортируй и режь 10 потом save
      this.usersRating[level].push(this.listProfiles[this.currentProfileId]);
      this.deepCompareRating(gameTime, level);
    }

  }

  compareGameTimesByLevel(gameTime, level) {
    const currentScores = this.listProfiles[this.currentProfileId].topScores;
    console.log(currentScores);
    console.log(level);
    console.log(currentScores[level]);
    if (!currentScores[level] || gameTime < currentScores[level]) {
      console.log("new your record!");
      this.setProfileScoreByLevel(gameTime, level);
    } else {
      console.log("Бывало и лучше!");
    }
  }

  setProfileScoreByLevel(gameTime, level) {
    this.listProfiles[this.currentProfileId].topScores[level] = gameTime;
    this.compareTimeGlobalRating(gameTime, level);
    
  }

  setProfileGameWrapper(wrapperKey) {
    this.listProfiles[this.currentProfileId].gameSettings.wrapper = wrapperKey;
    this.updateProfilesData();
  }

  setProfileGameLevel(level) {
    this.listProfiles[this.currentProfileId].gameSettings.level = level;
    this.updateProfilesData();
  }

  getCurrentProfileSettings() {
    return this.listProfiles[this.currentProfileId].gameSettings;
  }

  getCurrentProfileName() {
    return this.listProfiles[this.currentProfileId].firstName;
  }

  getCurrentProfileLevel() {
    return this.listProfiles[this.currentProfileId].gameSettings.level;
  }

}