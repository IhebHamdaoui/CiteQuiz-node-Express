import { existsSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Vérification si la BDD existe au démarrage du serveur
const BDD_EXISTE = !existsSync(process.env.DB_FILE);

// Création de la BDD
const createDataBase = async(connectionPromise) => {
    let connection = await connectionPromise;

    await connection.exec(
        `
        CREATE TABLE IF NOT EXISTS matiere(
            id_matiere INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            intitule TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS theme(
            id_theme INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            id_matiere INTEGER NOT NULL,
            CONSTRAINT fk_matiere
                FOREIGN KEY(id_matiere)
                REFERENCES matiere(id_matiere)
                ON DELETE SET NULL
                ON UPDATE CASCADE
        );

        CREATE TABLE IF NOT EXISTS question(
            id_question INTEGER PRIMARY KEY NOT NULL,
            id_theme INTEGER NOT NULL,
            nom_de_quiz TEXT,
            contenu_question TEXT NOT NULL,
            reponse_option_1 TEXT NOT NULL,
            reponse_option_2 TEXT NOT NULL,
            reponse_option_3 TEXT NOT NULL,
            reponse_correcte INTEGER NOT NULL,
            CONSTRAINT fk_theme
                FOREIGN KEY(id_theme)
                REFERENCES theme(id_theme)
                ON DELETE SET NULL
                ON UPDATE CASCADE
        );
        `
    );
    return connection;
}

// Base de données dans un fichier
let connectionPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

if(BDD_EXISTE) {
    connectionPromise = createDataBase(connectionPromise);
}

export default connectionPromise;