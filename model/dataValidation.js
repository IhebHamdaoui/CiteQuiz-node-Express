// Méthode permettant de valider les caractéristique du nom de la matière. Usage : Serveur
export const nomMatiereValide = (nomMatiere) => {
    return !!nomMatiere &&
    typeof nomMatiere === 'string' &&
    nomMatiere.length >= 5 &&
    nomMatiere.length <= 50;
};