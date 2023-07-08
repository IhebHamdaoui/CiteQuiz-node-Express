
export const abc = 'abc';
// const btnAccueil = document.getElementById('btnAccueil');
// const btnGererMatieres = document.getElementById('btnGererMatieres');
// const btnGererThemes = document.getElementById('btnGererThemes');
// const btnGererQuestions = document.getElementById('btnGererQuestions');
// const btnGererQuiz = document.getElementById('btnGererQuiz');
// const btnGererEtudiants = document.getElementById('btnGererEtudiants');


export const menuBtnsManagement = () => {
    const btnsMenu = document.querySelectorAll('.menuBouttons');
    btnsMenu.forEach((btn) => {
        btn.addEventListener('click', (e)=> {
            e.preventDefault();
            btnsMenu.forEach('click', () => {
                const btnId = btn.id;
                const element = document.getElementById(`${btnId}`);
                element.style.backgroundColor = '#89c403';
            });
            const btnId = btn.id;
            const element = document.getElementById(`${btnId}`);
            element.style.backgroundColor = 'red';
            switch(btnId) {
                case 'btnAccueil' : location.href('/tdbProfesseur');
                case 'btnGererMatieres' : location.href('/matieres');
                case 'btnGererThemes' : location.href('/');
                case 'btnGererQuestions' : location.href('/');
                case 'btnGererQuiz' : location.href('/');
                case 'btnGererEtudiants' : location.href('/');
            }
        });
    });
};