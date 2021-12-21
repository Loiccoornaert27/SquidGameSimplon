"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const btnStart = document.querySelector(".start-button");
const screenStart = document.querySelector(".screen-start");
const screenRules = document.querySelector(".screen-rules");
const screenGame = document.querySelector(".screen-game");
const btnPair = document.querySelector(".pair-bloc-choice");
const btnImpair = document.querySelector(".impair-bloc-choice");
const closeWindowRules = document.querySelector(".close-rules");
const player_hand = document.querySelector(".playerHand-close");
const ai_hand = document.querySelector(".iaHand-close");
let txtMain = document.querySelector(".display-text");
const btnRules = document.querySelector(".rules-button");
const btnRestart = document.querySelector(".restart-button");
let noBtn = document.querySelector('.no');
let yesBtn = document.querySelector('.yes');
let muteBtn = document.querySelector('.muteBtn');
let music = document.querySelector('.music');
let bg = document.querySelector('.imgbackground');
// let gameBG=document.querySelector('.gameBG') as Element;
let playerTurn = true; // tour du joueur vrai/faux
let choixUser; //Va stocker si le choix est pair ou impair
// let choixIA : String; //Va stocker si le choix est pair ou impair pour l'IA (obsolete)
let numMarblesPlayer = 10; //Initialisation du stock de billes joueur
let numMarblesAI = 10; //Initialisation du stock de billes IA
let marblesBetPlayer = 0; // Nombre de billes parié par l'utilisateur
let marblesBetAI; // Nombre de billes parié par l'IA
let playerChoiceConfirmed = false;
btnRules.addEventListener("click", () => { displayRules(); });
btnStart.addEventListener("click", game);
closeWindowRules.addEventListener("click", () => { displayRules(false); });
btnPair.addEventListener("click", pairClick);
btnImpair.addEventListener("click", impairClick);
noBtn.addEventListener("click", noButton);
yesBtn.addEventListener("click", yesButton);
btnRestart.addEventListener("click", restart);
muteBtn.addEventListener("click", muteUnmute);
// ---------------------------------------------------------------------
// Affiche/Enleve l'affichage des règles
function displayRules(show = true) {
    show ? screenRules.setAttribute("style", "display: block") : screenRules.setAttribute("style", "display: none");
}
// Affiche/Enleve l'affichage des boutons Oui/Non pour la confirmation du choix de l'utilisateur
function displayConfirmationButton(show = true) {
    let confirmationBtn = document.querySelector(".validationButton");
    if (show) {
        confirmationBtn.setAttribute("style", "display: flex");
        updateTextMiddle(`Voulez vous pariez ${marblesBetPlayer} ${marblesBetPlayer === 1 ? "bille" : "billes"} ? `);
    }
    else {
        confirmationBtn.setAttribute("style", "display: none");
    }
}
// Affiche/Enleve l'affichage des billes du joueur
function displayMarblesPlayer(show = true) {
    let playerMables = document.querySelector('.player-marbles');
    generateMarblesPlayerImage();
    show ? (playerMables.setAttribute("style", "display: grid")) : (playerMables.setAttribute("style", "display: none"));
}
function displayPairImpaire(show = true) {
    let playerChoice = document.querySelector(".player-choice");
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
    const player_hand_open = document.querySelector(".playerHand-open");
    const ai_hand_open = document.querySelector(".iaHand-open");
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
    let test = document.querySelector(".display-text");
    show ? test.style.display = "flex" : test.style.display = "none";
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
    const playerMarbleshand = document.querySelector(".marblesInPlayerHand");
    const iaMarbleshand = document.querySelector(".marblesInAIHand");
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
function greyFilter(show = true) {
    const playerMarbles = Array.from(document.querySelectorAll('.marble'));
    let beginIndex = marblesBetPlayer;
    if (show) {
        for (let i = beginIndex; i < playerMarbles.length; i++) {
            playerMarbles[i].setAttribute("style", "filter: grayscale(100%)");
        }
    }
    else {
        for (let i = 0; i < playerMarbles.length; i++) {
            playerMarbles[i].removeAttribute("style");
        }
    }
}
//Confirmation du nb de billes
function confirmationMarblesPLayer(numberOfMarble) {
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
    updateTextMiddle(`Choisissez le nombre de billes à parier`);
}
// Enleve les billes joueur et fait apparaitre les bouton pair/impair
function yesButton() {
    return __awaiter(this, void 0, void 0, function* () {
        displayConfirmationButton(false);
        displayMarblesPlayer(false);
        greyFilter(false);
        if (playerTurn) {
            updateTextMiddle(`Choisissez pair ou impair`);
            displayPairImpaire();
        }
        else {
            nextLoop();
        }
    });
}
// Change le texte du milieu
function updateTextMiddle(str) {
    let displayTxt = document.querySelector(".display-text p");
    displayTxt.innerHTML = str;
}
//Fonction qui enregistre le pair
function pairClick() {
    return __awaiter(this, void 0, void 0, function* () {
        choixUser = "pair";
        playerChoiceConfirmed = true;
        displayPairImpaire(false);
        nextLoop();
    });
}
//Fonction qui enregistre le pair
function impairClick() {
    return __awaiter(this, void 0, void 0, function* () {
        choixUser = "impair";
        playerChoiceConfirmed = true;
        displayPairImpaire(false);
        nextLoop();
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function revealHands() {
    return __awaiter(this, void 0, void 0, function* () {
        displayText(false);
        displayCloseHands();
        generateMarblesInHands();
        yield sleep(2000);
        displayCloseHands(false);
        displayOpenHands();
        displayText();
        yield sleep(4000);
        displayOpenHands(false);
    });
}
function revealAIChoice(choixIA) {
    return __awaiter(this, void 0, void 0, function* () {
        updateTextMiddle(`L'IA a choisi ${choixIA}`);
    });
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
function checkResult(nbBilles, choixUser, nbPari, isJoueur) {
    if (nbBilles % 2 == 0) {
        if (choixUser == "pair" && isJoueur || choixUser == "impair" && !isJoueur) {
            updateTextMiddle(`tu gagnes ${nbPari} billes`);
            return nbPari;
        }
        else {
            updateTextMiddle(`tu perds ${nbPari} billes`);
            return nbPari * (-1);
        }
    }
    else {
        if (choixUser == "impair" && isJoueur || choixUser == "pair" && !isJoueur) {
            updateTextMiddle(`tu gagnes ${nbPari} billes`);
            return nbPari;
        }
        else {
            updateTextMiddle(`tu perds ${nbPari} billes`);
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
//marblesBetIA : pari de l'IA
function initBetAI(numMarblesAI, numMarblesPlayer) {
    let min = Math.ceil(1);
    //20% de chance de parier plus que le stock de billes du joueur
    let chanceToBetMore = Math.random();
    let max;
    if (chanceToBetMore < 0.7) {
        max = Math.floor(numMarblesAI + 1 && numMarblesPlayer + 1);
    }
    else {
        max = Math.floor(numMarblesAI + 1);
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
function beginGame() {
    return __awaiter(this, void 0, void 0, function* () {
        displayScreenGame();
        playerTurn ? updateTextMiddle("Vous commencez !") : updateTextMiddle("L'ordinateur commence !");
        console.log("playerTurn is " + playerTurn);
        yield sleep(1500);
        marblesBetAI = initBetAI(numMarblesAI, numMarblesPlayer);
        playerTurn ? updateTextMiddle("Quelle quantité de billes voulez vous parier") : updateTextMiddle("Choisissez le nombre de billes a faire deviner");
        displayMarblesPlayer();
    });
}
function nextLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        if (playerTurn) {
            //ajouter l'event pour choix joueur
            // choixUser = prompt("pair ou impair") as string;
            let winlose = checkResult(marblesBetAI, choixUser, marblesBetPlayer, playerTurn);
            numMarblesPlayer += winlose;
            numMarblesAI -= winlose;
        }
        else {
            choixUser = aiChoose();
            revealAIChoice(choixUser);
            yield sleep(2000);
            let winlose = checkResult(marblesBetPlayer, choixUser, marblesBetAI, playerTurn);
            numMarblesPlayer += winlose;
            numMarblesAI -= winlose;
        }
        yield revealHands();
        console.log("nombres de billes joueur : " + numMarblesPlayer);
        console.log("nombres de billes IA : " + numMarblesAI);
        playerTurn === true ? playerTurn = false : playerTurn = true;
        if (numMarblesPlayer > 0 && numMarblesAI > 0) {
            console.log("On continue !");
            beginGame();
        }
        else {
            numMarblesPlayer <= 0 ? updateTextMiddle("Tu as perdu !") : updateTextMiddle("Tu as gagné !");
            console.log("C'est fini");
            btnRestart.style.display = "flex";
        }
    });
}
// Boucle de jeu
function game() {
    btnStart.setAttribute("style", "display: none");
    bg.setAttribute("src", "../image/gameBackground.jpg");
    playerTurn = whoPlayFirst();
    console.log(`Valeur de playerTurn début de game -> ${playerTurn}`);
    beginGame();
    console.log(`Bille joueur -> ${numMarblesPlayer}`);
    console.log(`Bille ia -> ${numMarblesAI}`);
}
//fct restart
function restart() {
    btnRestart.setAttribute("style", "display: none");
    numMarblesAI = 10;
    numMarblesPlayer = 10;
    game();
}
/***Fonction qui gère le bouton mute ******/
function muteUnmute() {
    if (!music.muted) {
        muteBtn.setAttribute("src", "../image/mut-but-w.png");
        music.muted = true;
    }
    else {
        muteBtn.setAttribute("src", "../image/vol-but-w.png");
        music.muted = false;
    }
}
/***Fonction qui met en pause l'animation du gif *****/
document.addEventListener('DOMContentLoaded', function () {
    function stopAnim() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sleep(5000);
            bg.setAttribute("src", "../image/background-static.png");
            bg.classList.remove("background");
            console.log("paused");
        });
    }
    stopAnim();
});
