import connectionPromise from "./connexion.js";

// Ajouter une nouvelle question
export const ajouterQuestion = async(id_question, id_theme, nom_de_quiz, contenu_question,
    reponse_option_1, reponse_option_2, reponse_option_3, reponse_correcte) => {
    let connexion = await connectionPromise;
    connexion.run(
        `INSERT INTO question(
            id_question, id_theme, nom_de_quiz, contenu_question, 
            reponse_option_1, reponse_option_2, reponse_option_3, 
            reponse_correcte
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id_question, id_theme, nom_de_quiz, contenu_question, 
            reponse_option_1, reponse_option_2, reponse_option_3, 
            reponse_correcte]
    );
};

// Supprimer une question
export const supprimerQuestion = async(id_question) => {
    let connexion = await connectionPromise;
    connexion.run(
        `DELETE FROM question
            WHERE id_question = ${id_question}`
    );
};

// Modifier une question
export const modifierQuestion = async(id_question, id_theme, nom_de_quiz, contenu_question, 
    reponse_option_1, reponse_option_2, reponse_option_3, 
    reponse_correcte) => {
    let connexion = await connectionPromise;
    connexion.run(
        `
        UPDATE question 
        SET 
            id_theme = ?, 
            nom_de_quiz = ?, 
            contenu_question = ?, 
            reponse_option_1 = ?, 
            reponse_option_2 = ?, 
            reponse_option_3 = ?, 
            reponse_correcte = ?
        WHERE id_question = ?,
        `, [id_theme, nom_de_quiz, contenu_question, 
            reponse_option_1, reponse_option_2, reponse_option_3, 
            reponse_correcte, id_question]
    );
};