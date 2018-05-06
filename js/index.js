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