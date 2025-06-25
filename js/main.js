// Loader
const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("lessonWordContainer").classList.add("hidden");
};
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("lessonWordContainer").classList.remove("hidden");
};

// Avtive Navbar
let prevButton = null;
const levelDisplay = document.getElementById("levelDisplay");
levelDisplay.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'A';
    if (!isButton) {
        return;
    }
    e.target.classList.add('active'); // Add .active CSS Class
    if (prevButton !== null) {
        prevButton.classList.remove('active');  // Remove .active CSS Class
    }
    prevButton = e.target;
});

// Login
const navbar = document.getElementById("navbar");
const hero = document.getElementById("hero");
const learnVoc = document.getElementById("learnVoc");
const faq = document.getElementById("faq");
document.getElementById("loginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    if (userName === "" || password === "") {
        // return alert('Please Enter Your Username and Password');
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter Your Username and Password",
            showConfirmButton: true,
        }
        );
    }
    if (password != parseInt(123456)) {
        // alert('Please Enter Correct Password');
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter Correct Password",
            showConfirmButton: true,
        }
        );
    } else {
        navbar.classList.remove("hidden");
        hero.classList.add("hidden");
        learnVoc.classList.remove("hidden");
        faq.classList.remove("hidden");

        Swal.fire({

            icon: "success",
            title: "স্বাগতম",
            text: "চলুন আজ নতুন কিছু শিখা যাক!",
            showConfirmButton: false,
            timer: 2000,
        });
    }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    navbar.classList.add("hidden");
    hero.classList.remove("hidden");
    learnVoc.classList.add("hidden");
    faq.classList.add("hidden");

    Swal.fire({
        icon: "warning",
        title: "লগআউট সফল হয়েছে",
        showConfirmButton: false,
        timer: 2000,
    });
});


// Lesson Levels
const lessonLevels = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((data) => {
            lessonLevelDisplay(data.data);
        });
};

// Lesson Level Display
const lessonLevelDisplay = (lavel) => {
    lavel.forEach((levelBtn) => {
        const LevelDisplay = document.getElementById("levelDisplay");
        const levelDiv = document.createElement("div");
        const levelName = levelBtn.lessonName;
        levelDiv.innerHTML = `
            <a onclick="loadLessonWord(${levelBtn.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>${levelName}</a>
            `;
        LevelDisplay.appendChild(levelDiv);
    });
};

// Call Function
lessonLevels();

// Load Lesson Word
const loadLessonWord = async (lessonId) => {
    // console.log(lessonId);
    showLoader();
    const response = await fetch(
        `https://openapi.programming-hero.com/api/level/${lessonId}`
    );
    const data = await response.json();
    displayWordCard(data.data);
};

// Display Word Card
const displayWordCard = (cardData) => {
    const lessonWordContainer = document.getElementById("lessonWordContainer");
    lessonWordContainer.innerHTML = "";
    if (cardData == 0) {
        const div = document.createElement("div");
        div.classList.add("text-center", "pt-16", "col-span-full", "flex", "flex-col", "justify-center", "items-center");
        div.innerHTML = `
            <img src="./assets/alert-error.png" alt="">
            <p class="text-sm text-[#79716B] ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-[#292524] mt-3 text-3xl font-medium">নেক্সট Lesson এ যান</h2>
            `;
        lessonWordContainer.append(div);
        hideLoader();
    }
    cardData.forEach((element) => {
        if (element.meaning === null) {
            element.meaning = `<strong>অর্থ পাওয়া যায়নি</strong>`;
        }
        const div = document.createElement("div");
        div.classList.add('bg-white', 'rounded-lg');
        div.innerHTML = `
    <div class="card p-3 mb-5 bg-body  text-center">
        <div class="card-body">
            <h5 class="text-2xl font-bold">${element.word}</h5>
            <p>Meaning / Pronounciation</p>
            <p class="card-text text-xl font-medium">"${element.meaning} / ${element.pronunciation}"</p>
            <div class="flex justify-between">
                <button onclick="displayWordDetails(${element.id})" id="vocabularieDetails"
                    class="btn bg-[#1A91FF1A]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${element.word}')" id="audio" class="btn bg-[#1A91FF1A]"><i
                        class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    </div>
    `;
        lessonWordContainer.append(div);
        hideLoader();
    });
};

// Word Details
const displayWordDetails = (cardDetails) => {
    const url = `https://openapi.programming-hero.com/api/word/${cardDetails}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showWordDetails(data.data));
};

// Show Word Details
const showWordDetails = (wordDetails) => {
    if (wordDetails.meaning === null) {
        wordDetails.meaning = "অর্থ খুঁজে পাওয়া যায়নি";
    }
    document.getElementById("wordDetails").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
        <div class="card-body space-y-4">
            <h2  class="card-title text-3xl font-semibold">${wordDetails.word} (<i onclick="pronounceWord('${wordDetails.word}')"
                    class="fa-solid fa-microphone-lines"></i> :${wordDetails.pronunciation})</h2>
            <div>
                <h2 class="text-xl font-semibold mb-2">Meaning</h2>
                <p>${wordDetails.meaning}</p>
            </div>
            <div>
                <h2 class="text-xl font-semibold mb-2">Example</h2>
                <p class="text-lg">${wordDetails.sentence}</p>
            </div>
            <div>
                <h2 class="text-xl font-semibold mb-2">সমার্থক শব্দ গুলো</h2>
                <div id="synonyms">
                </div>
            </div>
        </div>
    </div>
    `;

    // Synonyms
    for (const element of wordDetails.synonyms) {
        const synonyms = document.getElementById("synonyms");
        const span = document.createElement("span");
        span.innerHTML = `
    <button class="btn  cursor-default bg-[#D7E4EF]">${element}</button>
    `;
        synonyms.append(span);
    }
}
// Pronounce Word
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // Japanese
    window.speechSynthesis.speak(utterance);
}