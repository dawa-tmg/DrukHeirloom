const categoryBoxClass = 'h-45 w-45 border-2 border-[#4D99AA] flex items-center justify-center text-[#4D99AA] text-xl font-medium hover:bg-[#4D99AA] hover:text-white text-center p-2 cursor-pointer';
const questionNumClass = 'text-3xl font-bold text-white';
const hrClass = 'w-full h-[2px] bg-white my-3 mx-auto';
const questionClass = 'text-xl text-white';
const optionClass = 'text-xl font-bold text-white';

const quizContainer = document.getElementById('quizContainer');
const catContainer = document.getElementById('categoryContainer');

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
    quizContainer.innerHTML = '';  // clear previous quiz

    // Find quiz for selected category
    // Note: your data structure has category names as keys in response.data[1]
    let quizList = quizData[1][category]?.quiz;
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
        form.classList.add('py-10', 'mx-auto');

        const optionsGrid = document.createElement('div');
        optionsGrid.classList.add('grid', 'grid-cols-2', 'gap-4');

        q.options.forEach((opt) => {
            const label = document.createElement('label');
            label.classList.add('flex', 'items-center', 'space-x-2');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `answer_${q.id}`;
            input.value = opt;
            input.classList.add('accent-[#032A33]');

            const span = document.createElement('span');
            span.classList.add('text-xl', 'font-bold', 'text-white');
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
}

axios
  .get("http://localhost:3001/quiz")
  .then((response) => {
    quizData = response.data;

    // Render categories from first object in data
    quizData[0].category.forEach((elem) => {
      renderQuizCategory(elem);
    });

    // Optionally, render first category quiz by default:
    renderQuiz(quizData[0].category[0]);
  })
  .catch((err) => {
    console.error('Failed to load quiz data', err);
  });
