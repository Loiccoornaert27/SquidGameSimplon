"use strict";
let choixUser; //Va stocker si le choix est pair ou impaire
const btnStart = document.getElementById("btnStart");
const btnPair = document.getElementById("btnPair");
const btnImpair = document.getElementById("btnImpair");
let playerTurn = true;
//Initialisation du stock de billes
let numMarblesPlayer = 10;
let numMarblesAI = 10;
function start() {
}
btnStart === null || btnStart === void 0 ? void 0 : btnStart.addEventListener("click", start);
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
    else if (num % 2 != 0) {
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
            console.log('tu gagnes ' + nbPari + ' billes'); //A changer en inner HTML
            return nbPari;
        }
        else if (choixUser == "impair" && isJoueur || choixUser == "pair" && !isJoueur) {
            console.log('tu perds ' + nbPari + ' billes'); //A changer en inner HTML
            return nbPari * (-1);
        }
    }
    else if (nbBilles % 2 != 0) {
        if (choixUser == "impair" && isJoueur || choixUser == "pair" && !isJoueur) {
            console.log('tu gagnes ' + nbPari + ' billes'); //A changer en inner HTML
            return nbPari;
        }
        else if (choixUser == "pair" && isJoueur || choixUser == "impair" && !isJoueur) {
            console.log('tu perds ' + nbPari + ' billes'); //A changer en inner HTML
            return nbPari * (-1);
        }
    }
}
<<<<<<< Updated upstream
//Fonction qui désigne aléatoirement qui va jouer en premier,
//playerTurn : tour du joueur (true) ou tour IA (false)
=======
//Fonction qui désigne aléatoirement qui va jouer en premier, introduit la variable playerTurn qui définit si c'est le tour du joueur ou non
let playerTurn = true;
>>>>>>> Stashed changes
function whoPlayFirst(playerTurn) {
    playerTurn = Math.random() < 0.5;
    return playerTurn;
}
playerTurn = whoPlayFirst(playerTurn);
console.log("playerTurn is " + playerTurn);
<<<<<<< Updated upstream
//Pari de l'IA
//Génère un nombre de billes pariées par l'IA
//numMarblesAI : nombres de billes de l'IA
//numMarblesPlayer : nombres de billes du joueur
//marblesBetIA : pari de l'IA
=======
//Initialisation du stock de billes
let numMarblesPlayer = 10;
let numMarblesAI = 10;
//Pari de l'IA
>>>>>>> Stashed changes
let marblesBetAI;
function initBetAI(numMarblesAI, numMarblesPlayer) {
    let min = Math.ceil(1);
    //20% de chance de parier plus que le stock de billes du joueur
    let chanceToBetMore = Math.random();
    console.log(chanceToBetMore);
    let max;
    if (chanceToBetMore < 0.7) {
        max = Math.floor(numMarblesAI + 1 && numMarblesPlayer + 1);
    }
    else {
        max = Math.floor(numMarblesAI + 1);
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
marblesBetAI = initBetAI(numMarblesAI, numMarblesPlayer);
<<<<<<< Updated upstream
//Fonction d'addition/soustraction des billes au stock en fonction de *Fonction qui décide qui gagne et qui perd *
=======
//Boucle de jeu
while (numMarblesPlayer || numMarblesAI > 0) {
    (playerTurn == true ? false : true);
}
//Fonction d'ajout ou de retrait  
>>>>>>> Stashed changes
function addRemoveMarbles(numMarblesAI, numMarblesPlayer, nbPari) {
    if (playerTurn == true) {
        numMarblesPlayer += nbPari;
        numMarblesAI -= nbPari;
    }
    else {
        numMarblesAI += nbPari;
        numMarblesPlayer -= nbPari;
    }
<<<<<<< Updated upstream
}
//Boucle de jeu
while (numMarblesPlayer || numMarblesAI > 0) {
    (playerTurn == true ? false : true);
=======
>>>>>>> Stashed changes
}
