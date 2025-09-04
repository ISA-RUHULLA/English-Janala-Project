const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(json => displayLesson(json.data))

};

const loadLessonWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(json => displayLessonWord(json.data))
};
const displayLessonWord = (words) => {
    console.log(words)
    const lessonWordContainer = document.getElementById('load-lesson-word');
    lessonWordContainer.innerHTML = '';

    words.forEach(word => {
        console.log(word)
        const lessonWordDiv = document.createElement('div');
        lessonWordDiv.innerHTML = `<div class="lesson-card bg-white rounded shadow py-10 px-2 mb-5 mr-4 space-y-5 ">
            <h1 class="font-semibold md:font-bold text-2xl">${word.word}</h1>
            <p class="font-semibold">"${word.meaning}/${word.pronunciation}"</p>
            <div class="font-semibold font-bangla">${word.meaning}</div>
            <div class="flex  justify-between p-10 mt-5">
                <button class="btn bg-sky-200 rounded hover:bg-sky-400"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-sky-200 rounded hover:bg-sky-400"><i class="fa-solid fa-volume-high"></i></button>

            </div>

        </div>`;

        lessonWordContainer.appendChild(lessonWordDiv);

    });


}

const displayLesson = lessons => {
    // get the container & clear the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.textContent = '';
    // get the lesson one by one
    console.log(levelContainer)
    for (const lesson of lessons) {
        // create the div
        const levelDiv = document.createElement('div');
        // create a button
        levelDiv.innerHTML = `<button id="lesson-${lesson.level_no}" onclick="loadLessonWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no} </button>`;
        // append the button to the container
        levelContainer.appendChild(levelDiv);
    };
};

loadLesson();