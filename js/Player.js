class Player {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;

    this.gameSettings = {
      wrapper: "",
      level: "",
    };

    this.topScores = {
      'E' : 0,
      'M' : 0,
      'H' : 0,
    }
  }
};