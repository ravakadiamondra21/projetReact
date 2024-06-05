function compterChambre(nbAdulte, nbEnfant, nbFamiliale, nbCouple, nbSimple){
    var nbPersonne = Number(nbAdulte) + Number(nbEnfant);
    var nbChambre = (nbFamiliale * 4) + (nbCouple * 2) + (nbSimple * 1)

    console.log(nbPersonne + " sy " +nbChambre)
    if(nbPersonne > nbChambre) {
        return false
    } else if(nbPersonne <= nbChambre){
        return true
    }
}

export default compterChambre