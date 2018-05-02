const soundPlayer = new SoundPlayer();

const stopwatch = new Stopwatch();


const storage = new Storage();
const router = new Router();

const controller = new Controller(storage, router);

const moduleProfiles = new ModuleProfiles(controller);
const moduleNavbar = new ModuleNavbar(controller, moduleProfiles);
const moduleSettings = new ModuleSettings(controller);

const moduleRating = new ModuleRating(controller);

const gameArea = new GameArea(controller);




/*
const gameA= document.getElementById('gameArea');

gameA.addEventListener('click', (e) =>{
  const card = e.target.parentElement;
  console.log(card);
  console.log(card.classList.contains('game-card'));
   ;
  if(card.classList.contains('game-card')){
    card.classList.add('effect-bounce');
     setTimeout(()=>{
      card.classList.add('hidden');
     }, 1500);
    // card1.classList.remove('active-card', 'selected', 'effect-bounce');
   }else{
     card1.classList.add('effect-bounce');
     setTimeout(()=>{
       card1.classList.add('hidden');
     }, 1500);
   }
},false);

card1.addEventListener('click', () => {
  console.log("LOL");
  
  if(card1.classList.contains('effect-bounce')){
   // card1.classList.remove('active-card', 'selected', 'effect-bounce');
  }else{
    card1.classList.add('effect-bounce');
    setTimeout(()=>{
      card1.classList.add('hidden');
    }, 1500);
  }
 
}, false);*/