"use strict";
let choixUser; //Va stocker si le choix est pair ou impaire
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
function start() {
    screenStart.setAttribute("style", "display: none");
    screenRules.setAttribute("style", "display: block");
}
btnStart.addEventListener("click", start);
closeWindowRules.addEventListener("click", closeRules);
function closeRules() {
    // Cache l'écran des règles et Affiche l'écran de jeu
    function closeRules() {
        const screenRules = document.getElementsByClassName("screen-rules")[0];
        const screenGame = document.getElementsByClassName("screen-game")[0];
        generateMarblesPlayerImage();
        screenRules.setAttribute("style", "display: none");
        screenGame.setAttribute("style", "display: block");
    }
    btnStart.addEventListener("click", start);
    function pairClick() {
        btnPair.setAttribute("style", "display: none");
        btnImpair.setAttribute("style", "display: none");
        player_hand.setAttribute("style", "display : flex");
        ai_hand.setAttribute("style", "display : flex");
        choixUser = "pair";
    }
    btnPair.addEventListener("click", pairClick);
    function impairClick() {
        btnPair.setAttribute("style", "display: none");
        btnImpair.setAttribute("style", "display: none");
        player_hand.setAttribute("style", "display : flex");
        ai_hand.setAttribute("style", "display : flex");
        choixUser = "impair";
    }
    btnImpair.addEventListener("click", impairClick);
    // Génere les billes dans la mains du joueur en fonction de la variable numMarblesPlayer
    function generateMarblesPlayerImage() {
        const playerMarbles = document.getElementsByClassName("player-marbles")[0];
        for (let i = 1; i <= numMarblesPlayer; i++) {
            // Création de l'image
            let img = document.createElement('img');
            img.src = "./image/bille.png";
            img.classList.add("marble");
            img.addEventListener("click", () => { confirmationMarblesPLayer(i); });
            playerMarbles.appendChild(img);
            console.log("Nouvelle image généré !");
        }
    }
    function confirmationMarblesPLayer(numberOfMarble) {
        marblesBetPlayer = numberOfMarble;
        displayConfirmationButton();
    }
    // Fait apparaitre les bouttons oui/non
    function displayConfirmationButton() {
        let confirmationBtn = document.querySelector(".validationButton");
        confirmationBtn.setAttribute("style", "display: flex");
        let noBtn = document.querySelector('.no');
        noBtn.addEventListener("click", noButton);
        let yesBtn = document.querySelector('.yes');
        yesBtn.addEventListener("click", yesButton);
        updateTextMiddle(`Voulez vous pariez ${marblesBetPlayer} ${marblesBetPlayer === 1 ? "bille" : "billes"} ? `);
    }
    // Fait disparaitre les bouttons oui/non
    function noButton() {
        marblesBetPlayer = 0;
        let confirmationBtn = document.querySelector(".validationButton");
        confirmationBtn.setAttribute("style", "display: none");
        updateTextMiddle(`Choisissez le nombre de billes à parier`);
    }
    // Enleve les billes joueur et fait apparaitre les bouton pair/impair
    function yesButton() {
        let confirmationBtn = document.querySelector(".validationButton");
        let marblesPlayers = document.querySelector('.player-marbles');
        confirmationBtn.setAttribute("style", "display: none");
        marblesPlayers.setAttribute("style", "display: none");
        let playerChoice = document.querySelector('.player-choice');
        playerChoice.setAttribute("style", "display: flex");
        updateTextMiddle(`Choisissez pair ou impair`);
    }
    // Change le texte du milieu
    function updateTextMiddle(str) {
        let displayTxt = document.querySelector(".display-text p");
        displayTxt.innerHTML = str;
    }
    function pairClick() {
        return "pair";
    }
    btnPair === null || btnPair === void 0 ? void 0 : btnPair.addEventListener("click", pairClick);
    function impairClick() {
        return "impair";
    }
    btnImpair === null || btnImpair === void 0 ? void 0 : btnImpair.addEventListener("click", impairClick);
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
                txtMain.innerHTML = 'tu gagnes ' + nbPari + ' billes'; //A changer en inner HTML
                return nbPari;
            }
            else if (choixUser == "impair" && isJoueur || choixUser == "pair" && !isJoueur) {
                txtMain.innerHTML = 'tu gagnes ' + nbPari + ' billes'; //A changer en inner HTML
                return nbPari * (-1);
            }
        }
        else if (nbBilles % 2 != 0) {
            if (choixUser == "impair" && isJoueur || choixUser == "pair" && !isJoueur) {
                txtMain.innerHTML = 'tu gagnes ' + nbPari + ' billes'; //A changer en inner HTML
                return nbPari;
            }
            else if (choixUser == "pair" && isJoueur || choixUser == "impair" && !isJoueur) {
                txtMain.innerHTML = 'tu gagnes ' + nbPari + ' billes'; //A changer en inner HTML
                return nbPari * (-1);
            }
        }
    }
    //Fonction qui désigne aléatoirement qui va jouer en premier,
    //playerTurn : tour du joueur (true) ou tour IA (false)
    function whoPlayFirst(playerTurn) {
        playerTurn = Math.random() < 0.5;
        return playerTurn;
    }
    playerTurn = whoPlayFirst(playerTurn);
    console.log("playerTurn is " + playerTurn);
    //Pari de l'IA
    let marblesBetIA;
    function initBetIA(numMarblesIA, numMarblesPlayer) {
        let min = 1;
        //20% de chance de parier plus que le stock de billes du joueur
        let chanceToBetMore = Math.random();
        let max;
        if (chanceToBetMore < 0.7) {
            max = Math.floor(numMarblesIA + 1 && numMarblesPlayer + 1);
        }
        else {
            max = Math.floor(numMarblesAI + 1);
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }
    marblesBetAI = initBetAI(numMarblesAI, numMarblesPlayer);
    //Fonction d'addition/soustraction des billes au stock en fonction de *Fonction qui décide qui gagne et qui perd *
    function addRemoveMarbles(numMarblesAI, numMarblesPlayer, nbPari) {
        if (playerTurn == true) {
            numMarblesPlayer += nbPari;
            numMarblesAI -= nbPari;
        }
        else {
            numMarblesAI += nbPari;
            numMarblesPlayer -= nbPari;
        }
    }
    //Boucle de jeu
    while (numMarblesPlayer || numMarblesAI > 0) {
        (playerTurn == true ? false : true);
    }
}
