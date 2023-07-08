import connectionPromise from "./connexion.js";

// Ajouter un nouveau thème
export const ajouterTheme = async(id_domaine_competence, id_theme, intitule) => {
    let connexion = await connectionPromise;
    connexion.run(
        `INSERT INTO theme(
            id_theme, id_domaine_competence, intitule
        ) VALUES (?, ?, ?)`,
        [id_domaine_competence, id_theme, intitule]
    );
};

// Supprimer un thème
export const supprimerTheme = async(id_theme) => {
    let connexion = await connectionPromise;
    connexion.run(
        `DELETE FROM theme
            WHERE id_theme = ${id_theme}`
    );
};

// Modifier un thème
export const modifierTheme = async(id_domaine_competence, id_theme, intitule) => {
    let connexion = await connectionPromise;
    connexion.run(
        `
        UPDATE theme 
        SET 
            id_domaine_competence = ?,
            intitule = ? 
        WHERE id_theme = ?,
        `, [id_domaine_competence, intitule, id_theme]
    );
};