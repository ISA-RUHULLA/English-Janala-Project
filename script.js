const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(json => displayLesson(json.data))

};

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('lesson-btn');
    for (const button of buttons) {
        button.classList.remove('bg-blue-700', 'text-white');
    }
};

const loadLessonWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            removeActiveClass();
            const clickbtn = document.getElementById(`lesson-btn-${id}`);
            clickbtn.classList.add('bg-blue-700', 'text-white');
            displayLessonWord(json.data)
        });
};

const loadWordDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(json => displayWordDetails(json.data))
};




const displayWordDetails = (word) => {
    console.log(word)
    const modalTitle = document.getElementsByClassName('modal-title');
    modalTitle[0].innerHTML = `<div>
                    <h1 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h1>
                </div>
                <div>
                    <h1 class="font-bold">Meaning</h1>
                    <p class="font-bangla">${word.meaning}</p>
                </div>
                <div>
                    <h1 class="font-bold">Example</h1>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h1 class="font-bold font-bangla">সমর্থক শব্দ গুলো</h1>
                    <span class="btn">${word.synonyms[0]}</span>
                    <span class="btn">${word.synonyms[1]}</span>
                    <span class="btn">${word.synonyms[2]}</span>
                </div>`;
    document.getElementById('my_modal_5').showModal();

};

const displayLessonWord = (words) => {
    console.log(words)
    const lessonWordContainer = document.getElementById('load-lesson-word');
    lessonWordContainer.innerHTML = '';

    if (words.length === 0) {
        lessonWordContainer.innerHTML = `
            <div class="text-center col-span-3">
                <img src="./assets/alert-error.png" alt="Alert Error" class="mx-auto item-center mb-5">
                <p class="font-bangla text-[13px] space-y-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-bold text-xl">নেক্সট Lesson এ যান</h1>
            </div>`;
        return;
    }

    words.forEach(word => {
        console.log(word)
        const lessonWordDiv = document.createElement('div');
        lessonWordDiv.innerHTML = `<div class="lesson-card bg-white rounded shadow py-10 px-2 mb-5 mr-4 space-y-5 ">
            <h1 class="font-semibold md:font-bold text-2xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h1>
            <p class="font-semibold">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}/${word.pronunciation ? word.pronunciation : 'pronunciation পাওয়া যায় নি।'}"</p>
            <div class="font-semibold font-bangla">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}</div>
            <div class="flex  justify-between p-10 mt-5">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-sky-200 rounded hover:bg-sky-400"><i class="fa-solid fa-circle-info"></i></button>
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
        levelDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLessonWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no} </button>`;
        // append the button to the container
        levelContainer.appendChild(levelDiv);
    };
};

loadLesson();