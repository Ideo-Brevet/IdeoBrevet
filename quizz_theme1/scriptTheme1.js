// Récupérer mes 3 blocks div HTML (le header, la div questions et la div result)
let header_screen = document.getElementById("header_screen");
let questions_screen = document.getElementById("questions_screen");
let result_screen = document.getElementById("result_screen");

// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz(){
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function() {
        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";

            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";
        }
    }
}


// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers, answerCorrect) {
    this.title = title,
    this.answers = answers,
    this.answerCorrect = answerCorrect,

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        // Le append sert à afficher le html (il existe le after et le prepend si on veut afficher au-dessus ou en-dessous)
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        // Fonction pour voir à combien de question on est sur le total de questions présents
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + "/" + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => { 
        let answerSelect = e.target;
        if(this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");
            quiz.nbrCorrects++;
        }
        else {
            answerSelect.classList.add("answersWrong");
            let RightAnswer = document.getElementById(this.answerCorrect);
            RightAnswer.classList.add("answersCorrect");
        }

        // Mise en place d'une fonction Timeout pour passer à la prochaine question, timer d'une seconde après le click sur un élément
        setTimeout(function() {
            questions_screen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
        }, 1100);
    }

    // Si la réponse choisit par le user est égale à la réponse correcte retourner True sinon False
    this.isCorrectAnswer = function(answerUser) {
        if(answerUser == this.answerCorrect) {
            return true;
        }
        else {
            return false;
        }
    }
};


// On va récupérer notre fonction Quiz pour implémenter ses données dans ses arguments 
// Partie Création des mes données de Questions :
let quiz = new Quiz();

let question1 = new Question("Quand a commencé la guerre ? ", ["Décembre 1939", "Septembre 1939", "Janvier 1940"], 2);
quiz.addQuestion(question1);

let question2 = new Question("Quand la France a-t-elle était occupée par les allemands ? ", ["1940 à 1944", "1941 à 1945", "1942 à 1943"], 1);
quiz.addQuestion(question2);

let question3 = new Question("Qui instaure le régime de Vichy ? ", ["Charles de Gaulle", "Philippe Pétain", "Pierre Kœnig"], 2);
quiz.addQuestion(question3);

let question4 = new Question("Quand le general de Gaulle lance t-il un appel radio invitant les français à le rejoindre ? ", ["le 18 juin 1941", "le 19 juin 1940", "le 18 juin 1940"], 3);
quiz.addQuestion(question4);

let question5 = new Question("Quels sont les trois partenaires principaux de l'Axe ? ", ["l'Allemagne , l'Italie et le Japon","l'Allemagne, l'URSS et le Japon","l'Allemagne, l'Italie et la Chine"], 1);
quiz.addQuestion(question5);

let question6 = new Question("Quels sont les trois partenaires des forces alliés ? ", ["France, Italie, USA", "France, URSS, USA", "France, Suisse, USA"], 2);
quiz.addQuestion(question6);

let question7 = new Question(" Quand les alliés débarquent-ils en Normandie ? ", ["1944", "1943", "Fin 1945"], 1);
quiz.addQuestion(question7);

let question8 = new Question("Quelles sont les dates de la bataille de Stalingrad ? ", ["Septembre 1942 à août 1943", "Juillet 1942 à février 1943", "Décembre 1942 à juillet 1943"], 2);
quiz.addQuestion(question8);

let question9 = new Question("Quel est la date de la fin de la guerre en Europe ? ", ["8 mai 1944", "18 mai 1945", " 8 mai 1945"], 3);
quiz.addQuestion(question9);

let question10 = new Question(" Quand les bombes d'Hiroshima et de nagasaki ont-elles étaient lancées? ", ["Les 6 et 9 août 1944", "Les 6 et 9 août 1945", "Les 15 et 16 août 1945"], 2);
quiz.addQuestion(question10);


// Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function(NbrQuestion) {
    NbrQuestion.textContent = quiz.questions.length;
});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";

    quiz.displayCurrentQuestion();
}


// Récupérer le bouton dans mon html avec le ElementById car le ElementsByClassName n'a pas le addEventListener)
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);