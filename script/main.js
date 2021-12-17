"use strict";
let choixUser; //Va stocker si le choix est pair ou impaire
const btnStart = document.getElementsByClassName("start-button")[0];
const btnPair = document.getElementsByClassName("pair-bloc choice")[0];
const btnImpair = document.getElementsByClassName("impair-bloc choice")[0];
const btnCloseHelp = document.getElementsByClassName("close-rules")[0];
let txtMain = document.getElementsByClassName("display-text")[0];
function start() {
}
btnStart.addEventListener("click", start);
function pairClick() {
    btnPair.setAttribute("style", "display: none");
    btnImpair.setAttribute("style", "display: none");
    return "pair";
}
btnPair.addEventListener("click", pairClick);
function impairClick() {
    return "impair";
}
btnImpair.addEventListener("click", impairClick);
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
//Fonction qui désigne aléatoirement qui va jouer le premier joueur, introduit la variable playerTurn qui définit si c'est le tour du joueur ou non
function whoPlayFirst(playerTurn) {
    playerTurn = Math.random() < 0.5;
    return playerTurn;
}
//Initialisation du stock de billes
let numMarblesPlayer = 10;
let numMarblesIA = 10;
//Pari de l'IA
let marblesBetIA;
function initBetIA(numMarblesIA, numMarblesPlayer) {
    let min = Math.ceil(1);
    //20% de chance de parier plus que le stock de billes du joueur
    let chanceToBetMore = Math.random();
    let max;
    if (chanceToBetMore < 0.7) {
        max = Math.floor(numMarblesIA + 1 && numMarblesPlayer + 1);
    }
    else {
        max = Math.floor(numMarblesIA + 1);
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
