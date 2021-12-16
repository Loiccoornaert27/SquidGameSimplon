let choixUser : String; //Va stocker si le choix est pair ou impaire
const btnPair = document.getElementById("btnPair"); 
const btnImpair = document.getElementById("btnImpair");

function pairClick(){
    return "pair";
}
btnPair?.addEventListener("click",pairClick);

function impairClick(){
    return"impair";
}

btnImpair?.addEventListener("click",impairClick);

/*****Fonction qui décide qui gagne et qui perd ********/
//nbBilles : le nombre de billes choisies
//choixUser : pair ou impair
//nbPari : le nombre de billes pariées
//isJoueur : false c'est l'IA, true c'est le joueur
function checkResult(nbBilles : number,choixUser: String,nbPari:number, isJoueur:Boolean ){
    if(nbBilles % 2 == 0){
        if(choixUser=="pair" && isJoueur || choixUser=="impair" && !isJoueur){
            console.log('tu gagnes '+nbPari +' billes');  //A changer en inner HTML
            return nbPari;
        }
        else if(choixUser=="impair" && isJoueur || choixUser=="pair" && !isJoueur){
            console.log('tu perds ' +nbPari+ ' billes');  //A changer en inner HTML
            return nbPari*(-1);
        }
    }
    else if(nbBilles % 2 != 0){
        if(choixUser=="impair" && isJoueur || choixUser=="pair" && !isJoueur){
            console.log('tu gagnes '+nbPari +' billes');  //A changer en inner HTML
            return nbPari;
        }
        else if(choixUser=="pair" && isJoueur || choixUser=="impair" && !isJoueur){
            console.log('tu perds ' +nbPari+ ' billes');  //A changer en inner HTML
            return nbPari*(-1);
        }
    }
}

//Fonction qui désigne aléatoirement qui va jouer le premier joueur, introduit la variable playerTurn qui définit si c'est le tour du joueur ou non
function whoPlayFirst(playerTurn:boolean){
    playerTurn=Math.random()<0.5;
    return playerTurn;
}

//Initialisation du stock de billes
let numMarblesPlayer: number = 10;
let numMarblesIA: number = 10;

//Pari de l'IA
let marblesBetIA:number;
function initBetIA(numMarblesIA:number,numMarblesPlayer: number){
    let min = Math.ceil(1);
    //20% de chance de parier plus que le stock de billes du joueur
    let chanceToBetMore=Math.random();
    console.log(chanceToBetMore);
    let max:number;
    if(chanceToBetMore<0.7){
        max = Math.floor(numMarblesIA+1&&numMarblesPlayer+1);
    }else{
        max = Math.floor(numMarblesIA+1);
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
marblesBetIA = initBetIA(numMarblesIA,numMarblesPlayer);


