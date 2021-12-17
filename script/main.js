"use strict";
let choixUser; //Va stocker si le choix est pair ou impaire
const btnStart = document.getElementById("btnStart");
const btnPair = document.getElementById("btnPair");
const btnImpair = document.getElementById("btnImpair");
const btnRules = document.getElementsByClassName("rules-button")[0];
const popRules = document.getElementsByClassName("screen-rules")[0];
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
//Fonction qui désigne aléatoirement qui va jouer en premier,
//playerTurn : tour du joueur (true) ou tour IA (false)
function whoPlayFirst(playerTurn) {
    playerTurn = Math.random() < 0.5;
    return playerTurn;
}
playerTurn = whoPlayFirst(playerTurn);
console.log("playerTurn is " + playerTurn);
//Pari de l'IA
//Génère un nombre de billes pariées par l'IA
//numMarblesAI : nombres de billes de l'IA
//numMarblesPlayer : nombres de billes du joueur
//marblesBetIA : pari de l'IA
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
// while(numMarblesPlayer||numMarblesAI>0){
//     (playerTurn==true?false:true)
//    }
//Affichage des règles du jeu
//btnRules : bouton qui affiche les règles
//popRules : pop up des règles
function showRules(popRules) {
    popRules.setAttribute("style", "display: normal");
    // popRules.style.display="normal";
    console.log("les regles vont s'afficher");
}
btnRules.addEventListener("click", () => { showRules(popRules); });
// btnRules.addEventListener("click",() => {popRules.setAttribute("style", "display: true")});
