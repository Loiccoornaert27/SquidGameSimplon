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

