class SoundPlayer {
  constructor() {
    this.audio = new Audio();
    //this.playRandomSound();
    this.countLaughtSound = 0;
  }

  playShowCloseTableSound() {
    const newAudio = new Audio();
    const showCloseSound = "audio/show-close-table.mp3";
    newAudio.src = showCloseSound;
    newAudio.play();
  }

  playClickButtonSound() {
    const clickSound = "audio/click.mp3";
    this.audio.src = clickSound;
    this.audio.play();
  }

  playSlideWrapper(){
    const newAudio = new Audio();
    const playSlideWrapper = "audio/interface/slide.mp3";
    newAudio.src = playSlideWrapper;
    newAudio.play();
  }

  playStartSound() {
    setTimeout(() => {
      const newAudio = new Audio();
      const startSound = "audio/game-area-sounds/start-game.mp3";
      newAudio.src = startSound;
      newAudio.play();
    }, 300);
  }

  playLastPairSound() {
    setTimeout(() => {
      const newAudio = new Audio();
      const lastPairSound = "audio/game-area-sounds/last-pair.mp3";
      newAudio.src = lastPairSound;
      newAudio.play();
    }, 500);
  }

  playLaughSound() {
    if (this.countLaughtSound === 0) {

      setTimeout(() => {
        const newAudio = new Audio();
        const matchSound = "audio/game-area-sounds/laugh.mp3";
        newAudio.src = matchSound;
        newAudio.play();
      }, 100);

      this.countLaughtSound++;
    } else {
      if (this.countLaughtSound > 3) {
        this.countLaughtSound = 0;
      } else {
        this.countLaughtSound++;
      }
    }
  }

  playMatchSound() {
    setTimeout(() => {
      const newAudio = new Audio();
      const matchSound = "audio/game-area-sounds/match.mp3";
      newAudio.src = matchSound;
      newAudio.play();
    }, 100);
  }

  playRandomSound() {
    setInterval(() => {
      const newRandomAudio = new Audio();
      const clickSound = "audio/random/volk.mp3";
      newRandomAudio.src = clickSound;
      newRandomAudio.play();

    }, 14000);
  }

  playWinSound() {
    const winSound = "audio/groza.mp3";
    this.audio.src = winSound;
    this.audio.play();
  }

  playStopWinSound() {
    this.audio.pause();
  }
}