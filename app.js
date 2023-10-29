const title = document.getElementById("title");

// Get option label element
const optionOne = document.querySelector("#labelOne");

const optionsContainer = document.querySelector("#optionsContainer");

// Create icons for answers
const wrongAnswerIcon = document.createElement("i");
wrongAnswerIcon.classList = "fa-regular fa-circle-xmark ml-auto";

const correctAnswerIcon = document.createElement(`i`);
correctAnswerIcon.classList = "fa-regular fa-circle-check ml-auto";

//buttons
const submitButton = document.querySelector(`#submitButton`)
const nextButton = document.querySelector(`#nextButton`)

//questions
const questionElement = document.querySelector("#question")
const questionCountElement = document.querySelector("#questionCount");
const highScore = document.querySelector("#highScore");
const scoreElement = document.querySelector("#score");


let questionIndex = 0

const initalQuestion = questions[0];

const chosenOptionIds = [];
const submitted = [];
let currentScore = 0;

submitButton.addEventListener("click", onSubmit)
nextButton.addEventListener("click", handleNext)


function onSubmit() {
    const selectedOptionId = chosenOptionIds[questionIndex];
    if (submitted.length === chosenOptionIds.length) return;

    submitted.push(selectedOptionId);
    // get the correct answer of the current question
    const currentQuestionAnswer = questions[questionIndex].correctAnswer;
    const allLabels = document.querySelectorAll("label");
    allLabels.forEach(label => {
        const value = label.getAttribute("data-value");
        const id = label.getAttribute("id");

        if (value === currentQuestionAnswer) {
            // if it is correct add green color and checkmark
            label.classList.replace("bg-sky-50", "bg-green-200");
            label.classList.replace("border-sky-200", "border-green-300");
            if (id === selectedOptionId) {
                currentScore = currentScore + 1;

            }
        } else {
            label.classList.replace("bg-sky-50", "bg-red-200");
            label.classList.replace("border-sky-200", "border-red-300");
        }
    });


    scoreElement.innerHTML = `${currentScore}/${questions.length}`;
}

// console.log(questionIndex);

function handleNext() {
    if (questionIndex === questions.length - 1) {
        restart();
        return
    };
    questionIndex++;
    const nextQuestion = questions[questionIndex]
    renderQuestion(nextQuestion, questionIndex)
}

/**
 * @description Renders the current question to the DOM
 * @param {*} currentQuestion  the current question to render to the DOM
 * @param {*} currentQuestionIndex  the current index of the question
 */
function renderQuestion(currentQuestion, currentQuestionIndex) {
    // Add 1 to the currentQuestionIndex to get the question number to display to users
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

    const options = currentQuestion.options.map((item, index) => {
        return createOptionItem(item, index, currentQuestionIndex);
    })

    optionsContainer.replaceChildren(...options);
    questionCountElement.innerHTML = `${questionNumber} of ${questions.length} Questions`;

    if (questionNumber === questions.length) {
        nextButton.innerHTML = "Restart"
    }

}

const createOptionItem = (value, index, questionIndex) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.classList = "border bg-sky-50 border-sky-200 rounded-md px-3 py-1.5 flex items-center mb-3"
    input.classList = "mr-2"
    label.addEventListener("click", onSelectAnswer);
    label.setAttribute("data-index", questionIndex);
    label.setAttribute("data-value", value);
    label.setAttribute("id", `label${index}`);

    input.setAttribute("value", value);
    input.setAttribute("type", "radio");
    input.setAttribute("name", `q${questionIndex}`);

    label.append(input, value);

    return label;
}

function onSelectAnswer(event) {
    let questionIndex = event.target.getAttribute("data-index");
    questionIndex = parseInt(questionIndex, 10);
    if (chosenOptionIds[questionIndex]) return;
    const optionId = event.target.getAttribute("id");
    if (optionId) {
        chosenOptionIds[questionIndex] = optionId;
    }
}

function restart() {
    currentScore = 0;
    questionIndex = 0;
    questionCountElement.innerHTML = `${questionIndex + 1} of ${questions.length} Questions`;
    scoreElement.innerHTML = `${currentScore}/${questions.length}`;
    nextButton.innerHTML = "Next question"
    renderQuestion(initalQuestion, 0);
}

// call the render function on load to populate the question
renderQuestion(initalQuestion, 0)

