class ModuleProfiles {
  constructor(controller) {
    this.controller = controller;

    this.profilesSection = document.getElementById('profilesSection');
    this.profilesTable = document.getElementById('profilesTable');
    this.arrayProfiles = [];
    this.activeProfileHTMLElement = null;
    this.isProfileLoaded = false;

    this.playerProfile = null;

    this.btnHideCloseProfiles = document.getElementById('btnHideCloseProfiles');
    this.btnHideCloseProfiles.addEventListener('click', this.hide.bind(this), false);

    this.btnSubmitForm = document.getElementById('btnSubmitForm');
    this.btnSubmitForm.addEventListener('click', this.heandlerUserForm.bind(this), false);

    this.buttonLoadProfile = document.getElementById('buttonLoadProfile');
    this.buttonLoadProfile.addEventListener('click', this.heandlerButtonLoadProfile.bind(this), false);

    this.profilesTable.addEventListener('click', this.heandlerProfileSelector.bind(this), false);

    this.loadProfiles();
  }

  setActiveProfileRow(profileRow) {
    soundPlayer.playClickButtonSound();
    profileRow.classList.add('active');
    this.activeProfileHTMLElement = profileRow;
  }

  heandlerUserForm() {
    const userForm = document.forms.user_form;

    const lastName = userForm.lastName.value;
    const firstName = userForm.firstName.value;
    const email = userForm.email.value;

    const player = new Player(lastName, firstName, email);
    const response = this.controller.addNewProfile(player);

    if (response.status) {
      this.updateTable();
    } else {
      alert(response.message);
    }
  }

  heandlerProfileSelector(e) {
    const profileRow = e.target.parentElement;
    const profileId = profileRow.getAttribute('user-id');

    if (profileId) {
      if (this.activeProfileHTMLElement) {
        this.activeProfileHTMLElement.classList.remove('active');
      }

      this.setActiveProfileRow(profileRow);
      this.showButtonLoadProfile();
    }
  }

  showButtonLoadProfile() {
    this.buttonLoadProfile.disabled = false;
    this.buttonLoadProfile.classList.remove('hide');
  }

  hideButtonLoadProfile() {
    this.buttonLoadProfile.disabled = true;
    this.buttonLoadProfile.classList.add('hide');
  }


  startSettingsGame() {
    let iserId = this.activeProfileHTMLElement.getAttribute('user-id');
    iserId = parseInt(iserId);

    const player = this.arrayProfiles[iserId];
    this.playerProfile = player;
    this.isProfileLoaded = true;

    this.controller.store.setCurrentProfile(iserId);

    if (!this.playerProfile.gameSettings.wrapper) {

      console.log("!player.gameSettings.wrapper");
      this.controller.router.routToSettingsWrappers();

    } else if (!this.playerProfile.gameSettings.level) {

      console.log("!player.gameSettings.level");
      this.controller.notifySubscribers("all-settings-downloaded");

      this.controller.router.routToSettingsLevel();

    } else {
      console.log("all settings exist");

      this.controller.notifySubscribers("all-settings-downloaded");

      this.controller.router.routToSettingsLevel();
    }
  }

  heandlerButtonLoadProfile() {
    soundPlayer.playClickButtonSound();
    this.isProfileLoaded = true;
    this.hide();
    
    setTimeout(() => {
      this.startSettingsGame();
    }, 600);
  }

  createRowProfile(profilePlayer, value) {
    let profileRow = document.createElement("tr");
    profileRow.classList.add("profile-row");
    profileRow.setAttribute("user-id", value);

    let tdFirstName = document.createElement("td");
    tdFirstName.innerHTML = profilePlayer["firstName"];

    let tdLastName = document.createElement("td");
    tdLastName.innerHTML = profilePlayer["lastName"];

    let tdEmail = document.createElement("td");
    tdEmail.innerHTML = profilePlayer["email"];

    profileRow.appendChild(tdFirstName);
    profileRow.appendChild(tdLastName);
    profileRow.appendChild(tdEmail);

    return profileRow;
  }

  loadProfiles() {
    this.arrayProfiles = this.controller.getAllProfiles();
    this.render();
  }

  hide() {
    soundPlayer.playShowCloseTableSound();
    this.hideButtonLoadProfile();

    this.profilesTable.classList.add('effect-hide');

    setTimeout(() => {
      this.profilesSection.classList.add('hide');
      this.profilesTable.classList.remove('effect-hide');
    }, 600);

    if (!this.isProfileLoaded && this.activeProfileHTMLElement) {
      this.activeProfileHTMLElement.classList.remove('active');
    }
  }

  show() {
    this.profilesSection.classList.remove('hide');
  }

  clear() {
    this.hideButtonLoadProfile();
    this.activeProfileHTMLElement = null;
    let rows = this.profilesTable.querySelectorAll(".profile-row");

    for (let index = 0; index < rows.length; index++) {
      rows[index].remove();
    }
  }

  updateTable() {
    this.clear();
    this.arrayProfiles = this.controller.getAllProfiles();
    this.render();

    const rows = this.profilesTable.querySelectorAll(".profile-row");

    this.setActiveProfileRow(rows[rows.length - 1]);

    this.startSettingsGame();
  }

  render() {
    if (this.arrayProfiles.length > 0) {
      const arr_len = this.arrayProfiles.length;

      for (let index = 0; index < arr_len; index++) {
        let profileRow = this.createRowProfile(this.arrayProfiles[index], index);
        this.profilesTable.appendChild(profileRow);
      }
    } else {
      this.clear();
    }
  }

}