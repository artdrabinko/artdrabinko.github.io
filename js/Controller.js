class Controller {
  constructor(storage, router) {
    this.store = storage;
    this.router = router;

    this.listSubscribers = [];
  }

  /*request to Storage for get array profiles players*/
  getAllProfiles() {
    const arrayProfiles = this.store.selectAllProfiles();
    return arrayProfiles;
  }

  /* checked player data before request to Storage  */
  isCorrectUserData(player) {
    if (player.lastName.length < 2) {
      return false;
    } else if (player.firstName.length < 2) {
      return false;
    } else if (player.email.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  /*request add new player profile at Storage*/
  addNewProfile(player) {
    const response = {
      status: false,
      message: 'Error',
    };

    if (this.isCorrectUserData(player)) {
      const isSuccess = this.store.addNewProfile(player);

      if (isSuccess) {
        response.status = true;
        response.message = "Profile successfully added";
        return response;
      } else {
        response.message = `Profile with email ${player.email} exist!`;
        return response;
      }

    } else {
      response.message = "Incorrect profile data";
      return response;
    }
  }

  subscribeToNotifications(arraySubscribes) {
    const arr_len = arraySubscribes.length;

    for (let i = 0; i < arr_len; i++) {
      this.listSubscribers.push(arraySubscribes[i]);
    }
  }


  /* Any module or object might subscrib to action from 
  other modules and objects. Needed only subscribe to Nitification
  give 2 parametrs: 
  1. action - string is type a of actions "ADDED_PLAYER"
  2. heandler callback  */

  notifySubscribers(action) {
    console.log("notifySubscribers " + action);

    for (let index = 0; index < this.listSubscribers.length; index++) {
      const subscriber = this.listSubscribers[index];
      switch (action) {
        case "start-game":
          if (subscriber.action == "start-game") {
            const notification = {
              "action": "start-game",
              "notice": "game was started",
            }

            subscriber['heandler'](notification);
          }
          break;
        case "all-settings-downloaded":
          if (subscriber.action == "all-settings-downloaded") {
            const notification = {
              "action": "all-settings-downloaded",
              "notice": "all profile settings are downloaded!",
            }

            subscriber['heandler'](notification);
          }
          break;
        case "game-loaded":
          if (subscriber.action == "game-loaded") {
            const notification = {
              "action": "game-loaded",
              "notice": "Game-loaded you can play!",
            }

            subscriber['heandler'](notification);
          }
          break;
        default:
          console.log("i don't now this action!");
          break;
      }
    }
  }

}