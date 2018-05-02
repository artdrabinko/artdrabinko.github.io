class Stopwatch {
  constructor() {
    this.seconds = 0;
    this.isPaused = false;
    this.update = this.update.bind(this);
    this.timeLabel = document.getElementById('gameTime');

  }

  toHHMMSS(secends) {
    let sec_num = secends;
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  }

  update() {
    if(!this.isPaused) {
      this.seconds++;
      this.timeLabel.innerHTML = this.toHHMMSS(this.seconds);
    }
  }

  pause(){
    console.log("pause");
    
    
    this.isPaused = true;
    console.log(this);
  }

  play(){
    this.isPaused = false;
  }

  reset() {
    this.seconds = 0;
  }

  start() {
    this.interval = setInterval(this.update, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  getTimeSeconds(){
    return this.seconds;
  }
}