class Router {
  constructor() {
    this.sectionRules = document.getElementById('rules');
    this.sectionUserForm = document.getElementById('userForm');

    this.settingsWrappers = document.getElementById('settingsWrappers');
    this.settingsLevel = document.getElementById('settingsLevel');

    this.previousSection = null;
    this.currentSection = this.sectionRules;
  }

  routToSection(destinationSection) {
    this.currentSection.classList.add('hide');
    destinationSection.classList.remove('hide');

    this.previousSection = this.currentSection;
    this.currentSection = destinationSection;
  }

  routToPreviousSection() {
    if (this.previousSection !== null) {
      routToSection(this.previousSection);
    }
  }

  routToSectionRules() {
    this.routToSection(this.sectionRules);
  }

  routToSectionUserForm() {
    this.routToSection(this.sectionUserForm);
  }

  routBackToSettingsWrappers(){
    this.settingsLevel.classList.add('hide');
    this.routToSection(this.settingsWrappers);
  }
  
  routToSettingsWrappers() {
    this.routToSection(this.settingsWrappers);
  }

  routToSettingsLevel() {
    this.routToSection(this.settingsLevel);
  }

  routToGameArea(){
    this.routToSection(this.settingsLevel);
  }


  /*
  routToModuleSettings(routConfig) {
    console.log("ROUTER - routToModuleSettings");
    console.log(routConfig);

    routConfig.departureSection.classList.add("hide");
    this.settingsLevel.heandlerRouter(routConfig);
  }

*/
}