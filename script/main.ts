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
const btnRules  = document.getElementsByClassName("rules-button")[0] as HTMLElement;
let noBtn = document.querySelector('.no') as Element;
let yesBtn = document.querySelector('.yes') as Element;

let playerTurn:boolean=true; // tour du joueur vrai/faux
let choixUser : String; //Va stocker si le choix est pair ou impair
let numMarblesPlayer: number = 10;//Initialisation du stock de billes joueur
let numMarblesAI: number = 10;//Initialisation du stock de billes IA
let marblesBetPlayer = 0; // Nombre de billes parié par l'utilisateur
let marblesBetAI:number;// Nombre de billes parié par l'IA


btnRules.addEventListener("click",() => {displayRules()});
btnStart.addEventListener("click",start);
closeWindowRules.addEventListener("click",() => {displayRules(false)});
btnPair.addEventListener("click",pairClick);
btnImpair.addEventListener("click",impairClick);
noBtn.addEventListener("click", noButton);
yesBtn.addEventListener("click", yesButton);



// Cache l'écran Start et Affiche l'écran des règles
function start() {
    screenStart.setAttribute("style", "display: none");
    displayScreenGame();
}

// ---------------------------------------------------------------------

// Affiche/Enleve l'affichage des règles
function displayRules(show = true){
    show ? screenRules.setAttribute("style", "display: block") : screenRules.setAttribute("style", "display: none");
}

// Affiche/Enleve l'affichage des boutons Oui/Non pour la confirmation du choix de l'utilisateur
function displayConfirmationButton(show = true){
    let confirmationBtn = document.querySelector(".validationButton") as Element;
   
    if (show) {
        confirmationBtn.setAttribute("style", "display: flex");
        updateTextMiddle(`Voulez vous pariez ${marblesBetPlayer} ${marblesBetPlayer === 1 ? "bille" : "billes"} ? `);
    }
    else {
        confirmationBtn.setAttribute("style", "display: none");
    }
}

// Affiche/Enleve l'affichage des billes du joueur
function displayMarblesPlayer(show = true){
    let playerMables = document.querySelector('.player-marbles') as Element;

    show ? (playerMables.setAttribute("style", "display: flex")) :  (playerMables.setAttribute("style", "display: none"));
}

function displayPairImpaire(show = true){
    let playerChoice = document.querySelector(".player-choice") as Element;
    show ? (playerChoice.setAttribute("style", "display: flex")) :  (playerChoice.setAttribute("style", "display: none"));
}

// Affiche/Enleve l'affichage du ScreenGame
function displayScreenGame(show = true) {
    if (show){
        generateMarblesPlayerImage();
        screenGame.setAttribute("style", "display: block");
    }
    else {
        screenGame.setAttribute("style", "display: none");
    }
}

function displayCloseHands(show = true){
    if (show){
        player_hand.setAttribute("style","display : flex");
        ai_hand.setAttribute("style","display : flex");
    }
    else {
        player_hand.setAttribute("style","display : none");
        ai_hand.setAttribute("style","display : none");
    }
}

function displayOpenHands(show = true){
    const player_hand_open = document.querySelector(".playerHand-open") as HTMLDivElement;
    const ai_hand_open = document.querySelector(".iaHand-open") as HTMLDivElement;

    if (show){
        player_hand_open.setAttribute("style","display : flex");
        ai_hand_open.setAttribute("style","display : flex");
    }
    else {
        player_hand_open.setAttribute("style","display : none");
        ai_hand_open.setAttribute("style","display : none");
    }
}

function displayText(show = true){
    show ? txtMain.setAttribute("style","display : flex") : txtMain.setAttribute("style","display : none");
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

        img.addEventListener("click", () => {confirmationMarblesPLayer(i);}); 

        playerMarbles.appendChild(img); // Ajoute l'image créer dans la div
    }
}

//Confirmation du nb de billes
function confirmationMarblesPLayer(numberOfMarble : number){
    marblesBetPlayer = numberOfMarble;
    displayConfirmationButton();
}

// Réinitialise le nombre de bille parier par le joueur 
function noButton(){
    marblesBetPlayer = 0;

    displayConfirmationButton(false);

    updateTextMiddle(`Choisissez le nombre de billes à parier`);
}

// Enleve les billes joueur et fait apparaitre les bouton pair/impair
function yesButton(){
    displayConfirmationButton(false);
    displayMarblesPlayer(false);
    displayPairImpaire();

    updateTextMiddle(`Choisissez pair ou impair`);
}

// Change le texte du milieu
function updateTextMiddle(str : string){
    let displayTxt = document.querySelector(".display-text p") as Element;
    displayTxt.innerHTML = str;
}

//Fonction qui enregistre le pair
function pairClick(){
    choixUser="pair";
    displayPairImpaire(false);
    revealHands()
}

//Fonction qui enregistre le pair
function impairClick(){
    choixUser="impair";
    displayPairImpaire(false);
    revealHands()
}

function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function revealHands(){
    displayText(false);
    displayCloseHands();

    await sleep(2000);

    displayCloseHands(false);
    displayOpenHands();

    updateTextMiddle("Texte a mettre pour le reveal ICI");
    displayText();
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
function checkResult(nbBilles : number,choixUser: String,nbPari:number, isJoueur:Boolean ){
    if(nbBilles % 2 == 0){
        if(choixUser=="pair" && isJoueur || choixUser=="impair" && !isJoueur){
            txtMain.innerHTML='tu gagnes '+nbPari +' billes';  //A changer en inner HTML
            return nbPari;
        }
        else if(choixUser=="impair" && isJoueur || choixUser=="pair" && !isJoueur){
            txtMain.innerHTML='tu gagnes '+nbPari +' billes';  //A changer en inner HTML
            return nbPari*(-1);
        }
    }
    else if(nbBilles % 2 != 0){
        if(choixUser=="impair" && isJoueur || choixUser=="pair" && !isJoueur){
            txtMain.innerHTML='tu gagnes '+nbPari +' billes';  //A changer en inner HTML
            return nbPari;
        }
        else if(choixUser=="pair" && isJoueur || choixUser=="impair" && !isJoueur){
            txtMain.innerHTML='tu gagnes '+nbPari +' billes';  //A changer en inner HTML
            return nbPari*(-1);
        }
    }
}

//Fonction qui désigne aléatoirement qui va jouer en premier,
//playerTurn : tour du joueur (true) ou tour IA (false)
function whoPlayFirst(playerTurn:boolean){
    playerTurn=Math.random()<0.5;
    return playerTurn;
}
playerTurn= whoPlayFirst(playerTurn);
console.log("playerTurn is "+playerTurn)

//Pari de l'IA
//Génère un nombre de billes pariées par l'IA
//numMarblesAI : nombres de billes de l'IA
//numMarblesPlayer : nombres de billes du joueur
//marblesBetIA : pari de l'IA
function initBetAI(numMarblesAI:number,numMarblesPlayer: number){
    let min = Math.ceil(1);
    //20% de chance de parier plus que le stock de billes du joueur
    let chanceToBetMore=Math.random();
    let max:number;
    if(chanceToBetMore<0.7){
        max = Math.floor(numMarblesAI+1&&numMarblesPlayer+1);
    }else{
        max = Math.floor(numMarblesAI+1);
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
marblesBetAI = initBetAI(numMarblesAI,numMarblesPlayer);

 //Fonction d'addition/soustraction des billes au stock en fonction de *Fonction qui décide qui gagne et qui perd *
function addRemoveMarbles(numMarblesAI:number,numMarblesPlayer: number,nbPari:number){
    if (playerTurn==true){
        numMarblesPlayer+=nbPari;
        numMarblesAI-=nbPari;
    }else{
        numMarblesAI+=nbPari;
        numMarblesPlayer-=nbPari;
    }
}