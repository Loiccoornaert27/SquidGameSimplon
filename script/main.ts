const btnStart = document.querySelector(".start-button") as HTMLButtonElement;
const screenStart = document.querySelector(".screen-start") as HTMLButtonElement;
const screenRules = document.querySelector(".screen-rules") as HTMLDivElement;
const screenGame = document.querySelector(".screen-game") as HTMLDivElement;
const btnPair = document.querySelector(".pair-bloc-choice") as HTMLButtonElement;
const btnImpair = document.querySelector(".impair-bloc-choice") as HTMLButtonElement;
const closeWindowRules = document.querySelector(".close-rules") as HTMLButtonElement;
const player_hand = document.querySelector(".playerHand-close") as HTMLDivElement;
const ai_hand = document.querySelector(".iaHand-close") as HTMLDivElement;
let txtMain = document.querySelector(".display-text") as HTMLDivElement;
const btnRules = document.querySelector(".rules-button") as HTMLDivElement;
const btnRestart = document.querySelector(".restart-button") as HTMLDivElement;
let noBtn = document.querySelector('.no') as Element;
let yesBtn = document.querySelector('.yes') as Element;
let muteBtn= document.querySelector('.muteBtn') as HTMLDivElement;
let music=document.getElementsByTagName('audio')[0] as HTMLMediaElement;
let bg=document.querySelector('.imgbackground')as Element;
let gameBG=document.querySelector('.gameBG') as Element;

let playerTurn: boolean = true; // tour du joueur vrai/faux
let choixUser: String; //Va stocker si le choix est pair ou impair
// let choixIA : String; //Va stocker si le choix est pair ou impair pour l'IA (obsolete)
let numMarblesPlayer: number = 10;//Initialisation du stock de billes joueur
let numMarblesAI: number = 10;//Initialisation du stock de billes IA
let marblesBetPlayer = 0; // Nombre de billes parié par l'utilisateur
let marblesBetAI: number;// Nombre de billes parié par l'IA

let playerChoiceConfirmed = false;


btnRules.addEventListener("click", () => { displayRules() });
btnStart.addEventListener("click", game);
closeWindowRules.addEventListener("click", () => { displayRules(false) });
btnPair.addEventListener("click", pairClick);
btnImpair.addEventListener("click", impairClick);
noBtn.addEventListener("click", noButton);
yesBtn.addEventListener("click", yesButton);
btnRestart.addEventListener("click", restart);
muteBtn.addEventListener("click",muteUnmute);


// ---------------------------------------------------------------------

// Affiche/Enleve l'affichage des règles
function displayRules(show = true) {
    show ? screenRules.setAttribute("style", "display: flex") : screenRules.setAttribute("style", "display: none");
}

// Affiche/Enleve l'affichage des boutons Oui/Non pour la confirmation du choix de l'utilisateur
function displayConfirmationButton(show = true) {
    let confirmationBtn = document.querySelector(".validationButton") as Element;

    if (show) {
        confirmationBtn.setAttribute("style", "display: flex");
        playerTurn ? updateTextMiddle(`Voulez vous pariez ${marblesBetPlayer} ${marblesBetPlayer === 1 ? "bille" : "billes"} ? `) : updateTextMiddle(`Voulez vous mettre ${marblesBetPlayer} ${marblesBetPlayer === 1 ? "bille dans votre main " : "billes dans votre main "} ? `)
    }
    else {
        confirmationBtn.setAttribute("style", "display: none");
    }
}

// Affiche/Enleve l'affichage des billes du joueur
function displayMarblesPlayer(show = true) {
    let playerMables = document.querySelector('.player-marbles') as Element;
    generateMarblesPlayerImage()

    show ? (playerMables.setAttribute("style", "display: grid")) : (playerMables.setAttribute("style", "display: none"));
}

function displayPairImpaire(show = true) {
    let playerChoice = document.querySelector(".player-choice") as Element;
    show ? (playerChoice.setAttribute("style", "display: flex")) : (playerChoice.setAttribute("style", "display: none"));
}

// Affiche/Enleve l'affichage du ScreenGame
function displayScreenGame(show = true) {
    if (show) {
        screenGame.setAttribute("style", "display: block");
    }
    else {
        screenGame.setAttribute("style", "display: none");
    }
}

function displayCloseHands(show = true) {
    if (show) {
        player_hand.setAttribute("style", "display : flex");
        ai_hand.setAttribute("style", "display : flex");
    }
    else {
        player_hand.setAttribute("style", "display : none");
        ai_hand.setAttribute("style", "display : none");
    }
}

function displayOpenHands(show = true) {
    const player_hand_open = document.querySelector(".playerHand-open") as HTMLDivElement;
    const ai_hand_open = document.querySelector(".iaHand-open") as HTMLDivElement;

    if (show) {
        player_hand_open.setAttribute("style", "display : flex");
        ai_hand_open.setAttribute("style", "display : flex");
    }
    else {
        player_hand_open.setAttribute("style", "display : none");
        ai_hand_open.setAttribute("style", "display : none");
    }
}

function displayText(show = true) {
    let test = document.querySelector(".display-text") as HTMLDivElement
    show ? test.style.display  = "flex" : test.style.display = "none";
}

// -----------------------------------------------------------------------

// Génere les billes dans la mains du joueur en fonction de la variable numMarblesPlayer
function generateMarblesPlayerImage() {
    const playerMarbles = document.getElementsByClassName("player-marbles")[0];

    playerMarbles.innerHTML = ''; // Supprime tous les images

    for (let i = 1; i <= numMarblesPlayer; i++) {
        // Création de l'image
        let img = document.createElement('img');
        img.src = "./image/bille.png";
        img.classList.add("marble");

        img.addEventListener("click", () => { confirmationMarblesPLayer(i); });

        playerMarbles.appendChild(img); // Ajoute l'image créer dans la div
    }
}


function generateMarblesInHands() {
    const playerMarbleshand = document.querySelector(".marblesInPlayerHand") as Element;
    const iaMarbleshand = document.querySelector(".marblesInAIHand") as Element;

    playerMarbleshand.innerHTML = ''; // Supprime tous les images
    iaMarbleshand.innerHTML = ''; // Supprime tous les images

    for (let i = 1; i <= marblesBetPlayer; i++) {
        // Création de l'image
        let img = document.createElement('img');
        img.src = "./image/bille.png";

        playerMarbleshand.appendChild(img); // Ajoute l'image créer dans la div
    }

    for (let i = 1; i <= marblesBetAI; i++) {
        // Création de l'image
        let img = document.createElement('img');
        img.src = "./image/bille.png";

        iaMarbleshand.appendChild(img); // Ajoute l'image créer dans la div
    }
}

function greyFilter(show = true){
    const playerMarbles = Array.from(document.querySelectorAll('.marble'));

    let beginIndex = marblesBetPlayer;
    if (show){
        for(let i = beginIndex; i < playerMarbles.length; i++){
            playerMarbles[i].setAttribute("style", "filter: grayscale(100%)")
        }
    }
    else {
        for(let i = 0; i < playerMarbles.length; i++){
            playerMarbles[i].removeAttribute("style")
        }
    }
  
    
}

//Confirmation du nb de billes
function confirmationMarblesPLayer(numberOfMarble: number) {
    greyFilter(false);
    marblesBetPlayer = numberOfMarble;
    greyFilter();
    displayConfirmationButton();
}

// Réinitialise le nombre de bille parier par le joueur 
function noButton() {
    marblesBetPlayer = 0;
    
    greyFilter(false);

    displayConfirmationButton(false);

    playerTurn ? updateTextMiddle(`Choisissez le nombre de billes à parier`) : updateTextMiddle(`Choisissez le nombre de billes à mettre dans votre main`);
}

// Enleve les billes joueur et fait apparaitre les bouton pair/impair
async function yesButton() {
    displayConfirmationButton(false);
    displayMarblesPlayer(false);
    greyFilter(false);


    if(playerTurn){
        updateTextMiddle(`Choisissez pair ou impair`);
        displayPairImpaire();
    }
    else{
        nextLoop();
    }
}

// Change le texte du milieu
function updateTextMiddle(str: string) {
    let displayTxt = document.querySelector(".display-text p") as HTMLParagraphElement;
    displayTxt.innerHTML = str;
}

//Fonction qui enregistre le pair
async function pairClick() {
    choixUser = "pair";
    playerChoiceConfirmed = true;
    displayPairImpaire(false);
   
    nextLoop();

}

//Fonction qui enregistre le pair
async function impairClick() {
    choixUser = "impair";
    playerChoiceConfirmed = true;
    displayPairImpaire(false);
    
    nextLoop();
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function revealHands() {
    displayText(false);
    displayCloseHands();

    generateMarblesInHands();

    await sleep(2000);

    displayCloseHands(false);
    displayOpenHands();

    displayText();

    await sleep(4000);
    displayOpenHands(false);
}

async function revealAIChoice(choixIA : String){
    updateTextMiddle(`L'IA a choisi ${choixIA}`);
}

// ----------------------------------------------------------------------------------


/*Fonction qui permet de déterminer si l'IA choisit pair ou impair*/
function aiChoose() {
    let num = Math.floor(Math.random() * 10);
    if (num % 2 == 0) {
        return "pair";
    }
    else {
        return "impair";
    }
}

/*****Fonction qui décide qui gagne et qui perd ********/
//nbBilles : le nombre de billes choisies
//choixUser : pair ou impair
//nbPari : le nombre de billes pariées
//isJoueur : false c'est l'IA, true c'est le joueur
function checkResult(nbBilles: number, choixUser: String, nbPari: number, isJoueur: Boolean) {
    if (nbBilles % 2 == 0) {
        if (choixUser == "pair" && isJoueur || choixUser == "impair" && !isJoueur) {
            nbPari>numMarblesAI?nbPari=numMarblesAI:nbPari=nbPari;
            updateTextMiddle(`Tu gagnes ${nbPari} billes`)
            return nbPari;
        }
        else {
            updateTextMiddle(`Tu perds ${nbPari} billes`)
            return nbPari * (-1);
        }
    }
    else {
        if (choixUser == "impair" && isJoueur || choixUser == "pair" && !isJoueur) {
            updateTextMiddle(`Tu gagnes ${nbPari} billes`)
            return nbPari;
        }
        else {
            updateTextMiddle(`Tu perds ${nbPari} billes`)
            return nbPari * (-1);
        }
    }
}

//Fonction qui désigne aléatoirement qui va jouer en premier,
//playerTurn : tour du joueur (true) ou tour IA (false)
function whoPlayFirst() {
    playerTurn = Math.random() < 0.5;
    return playerTurn;
}


//Pari de l'IA
//Génère un nombre de billes pariées par l'IA
//numMarblesAI : nombres de billes de l'IA
//numMarblesPlayer : nombres de billes du joueur
//marblesBetIA : pari de l'IA. Elle pari en fonction de son nombre de billes ou de celles du joueur
function initBetAI(numMarblesAI: number, numMarblesPlayer: number) {
    let min = Math.ceil(1);
    let max: number;
    if(numMarblesAI>numMarblesPlayer){
        max=Math.floor(numMarblesPlayer + 1);
    }
    else{
        max = Math.floor(numMarblesAI + 1);
    }
    
    return Math.floor(Math.random() * (max - min)) + min;
}

/**** Fonction pour que l'ia pioche dans son sachet un nombre aléatoire *****/
//C'est different de la fonction d'avant parce-que c'pas pour parier mais pour faire deviner pair ou impair fait pas iech
function AIRandomMarbles(numMarblesAI:number){
    let min=Math.ceil(1);
    let max: number;
    max = Math.floor(numMarblesAI + 1);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function beginGame() {

    displayScreenGame();

    playerTurn ? updateTextMiddle("A vous de jouer !") : updateTextMiddle("L'ordinateur joue !")  ;

    console.log("playerTurn is " + playerTurn);

    await sleep(1500);
    
    playerTurn ? marblesBetAI = initBetAI(numMarblesAI, numMarblesPlayer) : marblesBetAI=AIRandomMarbles(numMarblesAI);
    
    playerTurn ? updateTextMiddle("Quelle quantité de billes voulez vous parier") : updateTextMiddle("Choisissez le nombre de billes a faire deviner");

    displayMarblesPlayer()
}

async function nextLoop() {
    if (playerTurn) {
        //ajouter l'event pour choix joueur
        // choixUser = prompt("pair ou impair") as string;

        let winlose: number = checkResult(marblesBetAI, choixUser, marblesBetPlayer, playerTurn);
        numMarblesPlayer += winlose;
        numMarblesAI -= winlose;
        
    } else {
        choixUser = aiChoose();
        revealAIChoice(choixUser); 
        await sleep(2000);
        let winlose: number = checkResult(marblesBetPlayer, choixUser, marblesBetAI, playerTurn);
        numMarblesPlayer += winlose;
        numMarblesAI -= winlose;
    }

    await revealHands();

    console.log("L'IA a parié "+marblesBetAI);
    console.log("nombres de billes joueur : " + numMarblesPlayer);
    console.log("nombres de billes IA : " + numMarblesAI);

    playerTurn === true ? playerTurn = false : playerTurn = true;

    if (numMarblesPlayer > 0 && numMarblesAI > 0) {
        console.log("On continue !");
        beginGame();
    }

    else{
        numMarblesPlayer <= 0 ? updateTextMiddle("Tu as perdu !") : updateTextMiddle("Tu as gagné !");
        console.log("C'est fini")
        btnRestart.style.display= "flex";
    }
}

// Boucle de jeu
function game() {
    music.play();
    screenStart.setAttribute("style", "display: none");
    screenGame.style.backgroundImage= "url('../')"; //mise en place de l'image du background

    playerTurn = whoPlayFirst();
    console.log(`Valeur de playerTurn début de game -> ${playerTurn}`);

    beginGame();

    console.log(`Bille joueur -> ${numMarblesPlayer}`);
    console.log(`Bille ia -> ${numMarblesAI}`);
}

//fct restart
function restart(){
    btnRestart.setAttribute("style", "display: none")
    numMarblesAI = 10;
    numMarblesPlayer=10;
    game();
}

/***Fonction qui gère le bouton mute ******/
function muteUnmute(){
    if(!music.muted){
        muteBtn.setAttribute("src","./image/mute.png");
        music.muted=true;
    }
    else{
        muteBtn.setAttribute("src","./image/unmute.png");
        music.muted=false;
    }
}

/***Fonction qui met en pause l'animation du gif *****/
document.addEventListener('DOMContentLoaded', function () {
    async function stopAnim(){
    await sleep(5000);
    bg.setAttribute("src","./image/background-static.png");
    bg.classList.remove("background");
    console.log("paused");
    }
    stopAnim();
});
