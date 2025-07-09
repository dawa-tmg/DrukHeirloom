const categoryBoxClass = 'h-45 w-45 border-2 border-[#4D99AA] flex items-center justify-center text-[#4D99AA] text-xl font-medium hover:bg-[#4D99AA] hover:text-white text-center p-2 cursor-pointer';
const questionNumClass = 'text-3xl font-bold text-white';
const hrClass = 'w-full h-[2px] bg-white my-3 mx-auto';
const questionClass = 'text-xl text-white';
const optionClass = 'text-xl font-bold text-white';
const formClass = 'py-10 mx-auto';
const optionsGridClass = 'grid grid-cols-2 gap-4';
const labelClass = 'flex items-center space-x-2';
const inputClass = 'accent-[#032A33] input'
const spanClass = 'text-xl font-bold text-white';
const submitBtnClass = 'mt-6 bg-[#032A33] text-xl text-white px-5 py-3 rounded rounded-xl font-bold hover:bg-[#B3BFC7] hover:text-[#032A33]';

const quizContainer = document.getElementById('quizContainer');
const catContainer = document.getElementById('categoryContainer');

const textMsg = document.createElement('h2');
textMsg.setAttribute('class', questionNumClass)
textMsg.innerText = 'Select the category to start the quiz...'
quizContainer.appendChild(textMsg)

function renderQuizCategory(cate) {
    const categoryBox = document.createElement('div');
    categoryBox.setAttribute('class', categoryBoxClass);
    categoryBox.innerText = cate;

    categoryBox.addEventListener('click', () => {
    const isActive = categoryBox.classList.contains('active-category');

        document.querySelectorAll('.active-category').forEach(box => {
            box.classList.remove('active-category');
            box.style.backgroundColor = '';
            box.style.color = '';
        });

        if (!isActive) {
            categoryBox.classList.add('active-category');
            categoryBox.style.backgroundColor = "#4D99AA";
            categoryBox.style.color = "#ffffff";

            renderQuiz(cate);
        }
    });

    catContainer.appendChild(categoryBox);
}

function renderQuiz(category) {
    quizContainer.innerHTML = '';

    let quizList;

    if (quizData[1] && quizData[1][category]) {
        quizList = quizData[1][category].quiz;
    }
    
    if (!quizList) {
        quizContainer.innerText = 'No quiz available for this category.';
        return;
    }

    quizList.forEach((q) => {
        const questionNum = document.createElement('h2');
        questionNum.setAttribute('class', questionNumClass);
        questionNum.innerText = `Question: ${q.id}`;

        const hr = document.createElement('div');
        hr.setAttribute('class', hrClass);

        const question = document.createElement('p');
        question.setAttribute('class', questionClass);
        question.innerText = q.question;

        const form = document.createElement('form');
        form.setAttribute('class', formClass);

        const optionsGrid = document.createElement('div');
        optionsGrid.setAttribute('class', optionsGridClass);

        q.options.forEach((opt) => {
            const label = document.createElement('label');
            label.setAttribute('class', labelClass);

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `answer_${q.id}`;
            input.value = opt;
            input.setAttribute('class', inputClass);

            const span = document.createElement('span');
            span.setAttribute('class', spanClass);
            span.innerText = opt;

            label.appendChild(input);
            label.appendChild(span);
            optionsGrid.appendChild(label);
        });

        form.appendChild(optionsGrid);

        quizContainer.appendChild(questionNum);
        quizContainer.appendChild(hr);
        quizContainer.appendChild(question);
        quizContainer.appendChild(form);
    });
    
    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Submit Answers';
    submitBtn.setAttribute('class', submitBtnClass);

    submitBtn.addEventListener('click', () => {
        let score = 0;
        quizList.forEach(q => {
            const selected = document.querySelector(`input[name="answer_${q.id}"]:checked`);
            console.log('1' + selected)
            if (selected) {
                if (selected.value === q.answer) {
                    score += 1;
                } else {
                    const answerContainer = document.createElement('div');
                    answerContainer.setAttribute('class', 'bg-[#B3BFC7] p-5 my-5 rounded rounded-xl');
                    const answer = document.createElement('li');
                    answer.setAttribute('class', 'text-xl text-[#032A33] font-semibold py-3')
                    answer.innerText = `Answer for [${q.question}] is [${q.answer}]`;

                    answerContainer.appendChild(answer);
                    quizContainer.appendChild(answerContainer);
                }
            }   
        });
        const resultContainer = document.createElement('div');
        resultContainer.setAttribute('class', 'bg-[#032A33] grid grid-cols-2 p-5 my-5 rounded rounded-xl');

        const review = document.createElement('p');
        review.setAttribute('class', 'text-lg text-white font-semibold text-center');
        review.innerText = `You answered ${score} questions correctly.`

        const scores = document.createElement('p');
        scores.setAttribute('class', 'lg text-white font-semibold text-center');
        scores.innerText = `Your score is: ${score}`
       
        resultContainer.appendChild(review)
        resultContainer.appendChild(scores)
        quizContainer.appendChild(resultContainer)

        document.querySelectorAll('input.input[type="radio"]').forEach(radio => {
        radio.checked = false;})
    });
    
    quizContainer.appendChild(submitBtn);
}

axios
  .get("http://localhost:3001/quiz")
  .then((response) => {   const resetBtn = document.createElement('button');
    resetBtn.innerText = 'Reset';
    resetBtn.setAttribute('class', submitBtnClass);
    quizData = response.data;

    quizData[0].category.forEach((elem) => {
      renderQuizCategory(elem);
    });
    // renderQuiz(quizData[0].category[0]);
  })
  .catch((err) => {
    console.error('Failed to load quiz data', err);
  });
