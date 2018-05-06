const soundPlayer = new SoundPlayer();

const stopwatch = new Stopwatch();
const confirmDialog = new ConfirmDialog();

const storage = new Storage();
const router = new Router();

const controller = new Controller(storage, router);

const moduleProfiles = new ModuleProfiles(controller);
const moduleNavbar = new ModuleNavbar(controller, moduleProfiles);
const moduleSettings = new ModuleSettings(controller);

const moduleRating = new ModuleRating(controller);

const gameArea = new GameArea(controller);



/*
const carusel = document.getElementById('carusel');
let intrevalt = 5000;

setInterval(() => {

  const bgUrl = configWrappers['suicide squad']
    .frontSideLinks[Math.floor(Math.random() * 6)];

  document.getElementById('caruselBackside')
    .style.backgroundImage = bgUrl;

  carusel.classList.add('active-card');
  setTimeout(() => {
    carusel.classList.remove('active-card');
  }, 2500);

}, intrevalt);*/