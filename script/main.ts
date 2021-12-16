let choixUser : String; //Va stocker si le choix est pair ou impaire
const btnStart = document.getElementById("btnStart");
const btnPair = document.getElementById("btnPair"); 
const btnImpair = document.getElementById("btnImpair");

function start(){

}

btnStart?.addEventListener("click",start);

function pairClick(){
    return "pair";
}
btnPair?.addEventListener("click",pairClick);

function impairClick(){
    return"impair";
}

btnImpair?.addEventListener("click",impairClick);

/*Fonction qui permet de déterminer si l'IA choisit pair ou impair*/
function aiChoose(){
    let num= Math.floor(Math.random()*10);
    if(num%2 == 0){
        return "pair";
    }
    else if(num % 2 !=0){
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

//Fonction qui désigne aléatoirement qui va jouer en premier, introduit la variable playerTurn qui définit si c'est le tour du joueur ou non
let playerTurn:boolean=true;
function whoPlayFirst(playerTurn:boolean){
    playerTurn=Math.random()<0.5;
    return playerTurn;
}
playerTurn= whoPlayFirst(playerTurn);
console.log("playerTurn is "+playerTurn)

//Initialisation du stock de billes
let numMarblesPlayer: number = 10;
let numMarblesAI: number = 10;

//Pari de l'IA
let marblesBetAI:number;
function initBetAI(numMarblesAI:number,numMarblesPlayer: number){
    let min = Math.ceil(1);
    //20% de chance de parier plus que le stock de billes du joueur
    let chanceToBetMore=Math.random();
    console.log(chanceToBetMore);
    let max:number;
    if(chanceToBetMore<0.7){
        max = Math.floor(numMarblesAI+1&&numMarblesPlayer+1);
    }else{
        max = Math.floor(numMarblesAI+1);
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
marblesBetAI = initBetAI(numMarblesAI,numMarblesPlayer);


//Boucle de jeu
while(numMarblesPlayer||numMarblesAI>0){
    
   
    (playerTurn==true?false:true)
   }


 //Fonction d'ajout ou de retrait  
function addRemoveMarbles(numMarblesAI:number,numMarblesPlayer: number,nbPari:number){
    if (playerTurn==true){
        numMarblesPlayer+=nbPari;
        numMarblesAI-=nbPari;
    }else{
        numMarblesAI+=nbPari;
        numMarblesPlayer-=nbPari;
    }
}