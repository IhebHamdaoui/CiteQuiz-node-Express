// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, response, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js'

// Importer les méthodes 
import { listerMatieres, ajouterMatiere, supprimerMatiere, modifierMatiere, trouverMatiereID } from './model/BDD_matiere.js';
import { ajouterTheme, supprimerTheme, modifierTheme } from './model/BDD_theme.js';
import { ajouterQuestion, supprimerQuestion, modifierQuestion } from './model/BDD_question.js';
import { nomMatiereValide } from './model/dataValidation.js';

// Création du serveur
const app = express();
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));

// Ajouter les routes ici ...

//****************************************************\\
//*************** GESTION DES MATIÈRES ***************\\
//****************************************************\\

// Ajout d'une nouvelle matière
app.post('/matieres', async(req, res) => {
    let intitule = req.body.intitule;
    if(!nomMatiereValide(intitule)) {
        res.sendStatus(404);
    } else {
        await ajouterMatiere(intitule);
        res.status(201).end();
    }
});

// Lister les matières
app.get('/matieres', async(req, res) => {
    let matieres = await listerMatieres();
    res.render('matieres', {
        title : 'Gestion des matières',
        contenu : matieres,
        styles : ['/css/matieres.css'],
        scripts : ['/js/matieres.js'],
        titreSection: 'Gérer les matières'
    });
});

// Modifier une matière
app.put('/matieres', async(req, res) => {
    let id = req.body.id_matiere;
    let intitule = req.body.intitule;
    await modifierMatiere(id, intitule);
    res.status(201).end();
});

// Trouver une matière
app.get('/matieres/:intitule', async(req, res) => {
    let intitule = req.params.intitule;
    let matiere = await trouverMatiereID(`${intitule}`);
    res.status(200).json(matiere);
});

// Supprimer une matière
app.delete('/matieres', async(req, res) => {
    let intitule = req.body.intitule;
    await supprimerMatiere(intitule);
    res.status(201).end();
});

app.get('/inscription', async(req, res) => {
    res.render('inscription', {
        title : 'Inscription',
        styles : ['/css/inscription.css'],
        scripts : ['/js/inscription.js']
    });
});

app.get('/tdbProfesseur', async(req, res) => {
    res.render('tdbProfesseur', {
        title : 'Tableau de bord',
        styles : ['/css/tdbProfesseur.css'],
        scripts : ['/js/tdbProfesseur.js'],
        studentImage : '/images/student.png',
        quizImage: '/images/quiz.png',
        imageResultats: '/images/results.png',
        imgChart1: '/images/chart1.png',
        imgChart2: '/images/chart2.png',
        titreSection: 'Mon tableau de bord'
    });
});

app.get('/themes', async(req, res) => {
    res.render('themes', {
        title : 'Gestion des thèmes',
        styles : ['/css/themes.css'],
        scripts : ['/js/themes.js'],
        titreSection: 'Gérer les thèmes'
    });
});

app.get('/questions', async(req, res) => {
    res.render('questions', {
        title : 'Gestion des questions',
        styles : ['/css/questions.css'],
        scripts : ['/js/questions.js'],
        titreSection: 'Gérer les questions'
    });
});

app.get('/quiz', async(req, res) => {
    res.render('quiz', {
        title : 'Gestion des quizs',
        styles : ['/css/quiz.css'],
        scripts : ['/js/quiz.js'],
        titreSection: 'Gérer les quizs'
    });
});

app.get('/etudiants', async(req, res) => {
    res.render('etudiants', {
        title : 'Gestion des quizs',
        styles : ['/css/etudiants.css'],
        scripts : ['/js/etudiants.js'],
        titreSection: 'Gérer les étudiants'
    });
});

app.get('/', (request, response) => {
    response.render('home', {
        title: 'Page d\'accueil',
        styles : ['/css/home.css'],
        scripts : ['/js/home.js'],
        videoAnim: '/images/anim.mp4',
        imgAnim: '/images/teste_tes_connaissances.gif'
    });
});

app.get('/authentification', (req, res) => {
    res.render('authentification', {
        title: 'Authentification',
        styles : ['/css/authentification.css'],
        scripts : ['/js/authentification.js']
    }); 
});

app.get('/tdbEtudiant', (req, res) => {
    res.render('tdbEtudiant', {
        title: 'Tableau de bord',
        styles : ['/css/tdbEtudiant.css'],
        scripts : ['/js/tdbEtudiant.js'],
        titreSection: 'Mon tableau de bord'
    }); 
});

app.get('/quizEtudiant', (req, res) => {
    res.render('quizEtudiant', {
        title: 'Quizs',
        styles : ['/css/quizEtudiant.css'],
        scripts : ['/js/quizEtudiant.js'],
        titreSection: 'Mes quizs'
    }); 
});

app.get('/profilEtudiant', (req, res) => {
    res.render('profilEtudiant', {
        title: 'Gestion de profil',
        styles : ['/css/profilEtudiant.css'],
        scripts : ['/js/profilEtudiant.js'],
        titreSection: 'Gérer mon profil'
    }); 
});


// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${ process.env.PORT }`);
