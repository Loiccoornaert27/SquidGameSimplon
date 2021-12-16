/*****Fonction qui décide qui gagne et qui perd ********/
//nbBilles : le nombre de billes choisies
//choixUser : pair ou impair
//nbPari : le nombre de billes pariées
//isJoueur : false c'est l'IA, true c'est le joueur
function checkResult(nbBilles : number,choixUser: String,nbPari:number, isJoueur:Boolean ){
    if(nbBilles % 2 == 0){
        if(choixUser=="pair" && isJoueur || choixUser=="impair" && !isJoueur){
            console.log('tu gagnes '+nbPari +' billes');
        }
        else if(choixUser=="impair" && isJoueur || choixUser=="pair" && !isJoueur){
            console.log('tu perds ' +nbPari+ ' billes');
        }
    }
    else if(nbBilles % 2 != 0){
        if(choixUser=="impair" && isJoueur || choixUser=="pair" && !isJoueur){
            console.log('tu gagnes '+nbPari +' billes');
        }
        else if(choixUser=="pair" && isJoueur || choixUser=="impair" && !isJoueur){
            console.log('tu perds ' +nbPari+ ' billes');
        }
    }
}