let choixUser : String; //Va stocker si le choix est pair ou impaire
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


function start(){
    screenStart.setAttribute("style", "display: none");
    screenRules.setAttribute("style", "display: block");
}

btnStart.addEventListener("click",start);
closeWindowRules.addEventListener("click",closeRules);


function closeRules(){
    screenRules.setAttribute("style", "display: none");
    screenGame.setAttribute("style", "display: block");
}
btnStart.addEventListener("click",start);

function pairClick(){
    
    btnPair.setAttribute("style", "display: none");
    btnImpair.setAttribute("style", "display: none");
    player_hand.setAttribute("style","display : flex");
    ai_hand.setAttribute("style","display : flex");
    choixUser="pair";
}
btnPair.addEventListener("click",pairClick);

function impairClick(){
    
    btnPair.setAttribute("style", "display: none");
    btnImpair.setAttribute("style", "display: none");
    player_hand.setAttribute("style","display : flex");
    ai_hand.setAttribute("style","display : flex");
    choixUser="impair";
}

btnImpair.addEventListener("click",impairClick);

/*Fonction qui permet de déterminer si l'IA choisit pair ou impair*/
function aiChoose(){
    let num= Math.floor(Math.random()*10);
    if(num%2 == 0){
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
let marblesBetIA:number;
function initBetIA(numMarblesIA:number,numMarblesPlayer: number){
    let min = 1;
    //20% de chance de parier plus que le stock de billes du joueur
    let chanceToBetMore=Math.random();
    let max:number;
    if(chanceToBetMore<0.7){
        max = Math.floor(numMarblesIA + 1 && numMarblesPlayer + 1); 
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
//Boucle de jeu
while(numMarblesPlayer||numMarblesAI>0){
    
   
    (playerTurn==true?false:true)
   }