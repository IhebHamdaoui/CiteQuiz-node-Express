import connectionPromise from "./connexion.js";

//****************************************************\\
//*************** Lister les matières ****************\\
//****************************************************\\
//
export const listerMatieres = async() => {
    let connexion = await connectionPromise;
    let matieres = await connexion.all(
        `SELECT * FROM matiere`
    );
    return matieres;
}

//****************************************************\\
//*************** Trouver une matière ****************\\
//****************************************************\\
// 
export const trouverMatiereID = async(intitule) => {
    let connexion = await connectionPromise;
    let matiere = await connexion.all(
        `SELECT id_matiere FROM matiere WHERE intitule = "${intitule}"`
    );
    return matiere;
}

//****************************************************\\
//*********** Ajouter une nouvelle matière ***********\\
//****************************************************\\
// 
export const ajouterMatiere = async(intitule) => {
    let connexion = await connectionPromise;
    connexion.run(
        `INSERT INTO matiere(
            intitule
        ) VALUES (?)`,
        [intitule]
    );
};

//****************************************************\\
//*************** Supprimer une matière **************\\
//****************************************************\\
//
export const supprimerMatiere = async(intitule) => {
    let connexion = await connectionPromise;
    connexion.run(
        `DELETE FROM matiere
            WHERE intitule = "${intitule}"`
    );
};

//****************************************************\\
//*************** Modifier une matière ***************\\
//****************************************************\\
//
export const modifierMatiere = async(id, intitule) => {
    let connexion = await connectionPromise;
    connexion.run(
        `
        UPDATE matiere 
        SET intitule = "${intitule}" WHERE id_matiere = "${id}"
        `
    );
};

