const questions = [
    {
        id: 'q1',
        text: 'On a scale of 1 to 4, what is your emotional sensitivity?',
        type: 'radio',
        options: [
            { value: '1', label: '1 - Thick skinned' },
            { value: '2', label: '2 - Moderately sensitive' },
            { value: '3', label: '3 - Quite sensitive' },
            { value: '4', label: '4 - Very emotionally sensitive' }
        ]
    },
    {
        id: 'q2',
        text: 'What\'s your social battery?',
        type: 'radio',
        options: [
            { value: 'introvert', label: 'Introvert' },
            { value: 'ambivert', label: 'Somewhere in the middle' },
            { value: 'extrovert', label: 'EXTROVERT' }
        ]
    },
    {
        id: 'q3',
        text: 'What is your taste in music?',
        type: 'radio',
        options: [
            { value: 'pop', label: 'Pop' },
            { value: 'rock', label: 'Rock' },
            { value: 'classical', label: 'Classical' },
            { value: 'indie', label: 'Indie' },
            { value: 'rap', label: 'Rap' }
        ]
    },
    {
        id: 'q4',
        text: 'What trait do you look for most in a friend?',
        type: 'radio',
        options: [
            { value: 'funny', label: 'Funny' },
            { value: 'calm', label: 'Calm and composed' },
            { value: 'responsible', label: 'Responsible' },
            { value: 'troublemaker', label: 'Troublemaker' },
            { value: 'spontaneous', label: 'Spontaneous' },
            { value: 'happy', label: 'Happy go lucky' }
        ]
    },
    {
        id: 'q5',
        text: 'What are your hobbies?',
        type: 'radio',
        options: [
            { value: 'movies', label: 'Watching movies' },
            { value: 'arts', label: 'Arts' },
            { value: 'gaming', label: 'Gaming' },
            { value: 'reading', label: 'Reading' },
            { value: 'sports', label: 'Playing sports' }
        ]
    },
    {
        id: 'q6',
        text: 'Ideal travel destination?',
        type: 'radio',
        options: [
            { value: 'nature', label: 'Somewhere with a lot of greenery; forests etc.' },
            { value: 'beach', label: 'Coastal areas and beaches' },
            { value: 'history', label: 'Places with rich history and beautiful architecture' },
            { value: 'desert', label: 'Deserts' }
        ]
    },
    {
        id: 'q7',
        text: 'Preferred communication style?',
        type: 'radio',
        options: [
            { value: 'calls', label: 'Calls' },
            { value: 'texting', label: 'Texting' },
            { value: 'irl', label: 'Real life interaction' },
            { value: 'memes', label: 'Sending memes' }
        ]
    },
    {
        id: 'q8',
        text: 'Ideal weekend with a friend:',
        type: 'radio',
        options: [
            { value: 'crowd', label: 'Going out somewhere crowded' },
            { value: 'explore', label: 'Exploring a new place' },
            { value: 'home', label: 'Staying home and watching something' },
            { value: 'mood', label: 'Depends entirely on my mood' }
        ]
    },
    {
        id: 'q9',
        text: 'When you have an argument with a friend, what do you usually do?',
        type: 'radio',
        options: [
            { value: 'talk', label: 'Talk it out immediately' },
            { value: 'alone', label: 'Need some alone time' },
            { value: 'pretend', label: 'Pretend nothing happened' },
            { value: 'joke', label: 'Make a joke and hope it disappears' }
        ]
    }
];

let currentPerson = 'A'; // 'A' or 'B'
let currentQuestionIndex = 0;
let answers = {
    A: {},
    B: {}
};

// Particle background setup
function initParticles() {
    const container = document.getElementById('particles');
    const symbols = ['✦', '✧', '·', '♡'];
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Randomize initial properties
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 15;
        const size = 0.5 + Math.random() * 1.5;
        
        particle.style.left = `${left}vw`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.fontSize = `${size}rem`;
        
        container.appendChild(particle);
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startQuiz() {
    currentPerson = 'A';
    currentQuestionIndex = 0;
    answers = { A: {}, B: {} };
    renderQuestion();
    showScreen('quiz-screen');
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    const personIndicator = document.getElementById('person-indicator');
    const progress = document.getElementById('progress');
    
    personIndicator.innerText = `PERSON ${currentPerson}`;
    
    // Calculate progress
    const totalQuestions = questions.length * 2;
    const answeredSoFar = (currentPerson === 'A' ? 0 : questions.length) + currentQuestionIndex;
    progress.style.width = `${(answeredSoFar / totalQuestions) * 100}%`;

    // Render options
    let optionsHtml = '';
    const currentAnswers = answers[currentPerson][q.id] || [];

    q.options.forEach(opt => {
        const isSelected = currentAnswers.includes(opt.value);
        optionsHtml += `
            <label class="option-label ${isSelected ? 'selected' : ''}" onclick="toggleOption('${q.id}', '${opt.value}', '${q.type}', ${q.max})">
                <div class="${q.type === 'radio' ? 'custom-radio' : 'custom-checkbox'}"></div>
                <input type="${q.type}" name="${q.id}" value="${opt.value}" ${isSelected ? 'checked' : ''}>
                <span class="option-text">${opt.label}</span>
            </label>
        `;
    });

    container.innerHTML = `
        <h3>${q.text}</h3>
        <div class="options-container">
            ${optionsHtml}
        </div>
    `;

    // Handle button states
    document.getElementById('prev-btn').style.display = (currentQuestionIndex === 0 && currentPerson === 'A') ? 'none' : 'block';
    
    const nextBtn = document.getElementById('next-btn');
    if (currentPerson === 'B' && currentQuestionIndex === questions.length - 1) {
        nextBtn.innerText = 'SEE RESULTS ✨';
    } else {
        nextBtn.innerText = 'NEXT →';
    }
}

window.toggleOption = function(qId, value, type, max) {
    let current = answers[currentPerson][qId] || [];
    
    if (type === 'radio') {
        current = [value];
    } else if (type === 'checkbox') {
        if (current.includes(value)) {
            current = current.filter(v => v !== value);
        } else {
            if (current.length < max) {
                current.push(value);
            } else {
                return;
            }
        }
    }
    
    answers[currentPerson][qId] = current;
    renderQuestion();
}

window.nextQuestion = function() {
    const q = questions[currentQuestionIndex];
    const currentAns = answers[currentPerson][q.id] || [];
    
    // Validation
    if (currentAns.length === 0) {
        alert('Please select an option!');
        return;
    }
    if (q.type === 'checkbox' && currentAns.length !== q.max) {
        alert(`Please select exactly ${q.max} options.`);
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        if (currentPerson === 'A') {
            currentPerson = 'B';
            currentQuestionIndex = 0;
            renderQuestion();
        } else {
            calculateResults();
        }
    }
}

window.prevQuestion = function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    } else {
        if (currentPerson === 'B') {
            currentPerson = 'A';
            currentQuestionIndex = questions.length - 1;
            renderQuestion();
        } else {
            showScreen('landing-screen');
        }
    }
}

function calculateResults() {
    let score = 0;
    const totalQuestions = questions.length;
    let matchDetails = [];

    // Simple matching algorithm
    questions.forEach(q => {
        const ansA = answers.A[q.id];
        const ansB = answers.B[q.id];
        
        if (q.type === 'radio') {
            if (ansA[0] === ansB[0]) {
                score += 1;
            } else if (q.id === 'q2') { // Social battery special case
                if ((ansA[0] === 'introvert' && ansB[0] === 'extrovert') || (ansA[0] === 'extrovert' && ansB[0] === 'introvert')) {
                    score += 0.8; // Opposites attract
                } else {
                    score += 0.5;
                }
            } else if (q.id === 'q1') { // Sensitivity (1-4)
                const diff = Math.abs(parseInt(ansA[0]) - parseInt(ansB[0]));
                score += (3 - diff) / 3;
            } else {
                score += 0.2; 
            }
        } else if (q.type === 'checkbox') {
            let matches = 0;
            ansA.forEach(a => {
                if (ansB.includes(a)) matches++;
            });
            score += (matches / q.max);
        }
    });

    let percentage = Math.round((score / totalQuestions) * 100);
    
    // Adjust boundaries
    if (percentage < 25) percentage = Math.floor(Math.random() * 15) + 25; 
    if (percentage > 98) percentage = 98; 

    showScreen('results-screen');
    animateScore(percentage);
    
    const msgEl = document.getElementById('result-message');
    if (percentage >= 80) msgEl.innerText = "Soulmates spotted! 💖";
    else if (percentage >= 60) msgEl.innerText = "Great Bestie Potential! ✨";
    else if (percentage >= 40) msgEl.innerText = "You can make it work! ☕";
    else msgEl.innerText = "Maybe just acquaintances? 😅";

}

function animateScore(targetPercentage) {
    const circle = document.getElementById('score-circle');
    const text = document.getElementById('score-text');
    
    circle.setAttribute('stroke-dasharray', `0, 100`);
    text.textContent = '0%';
    
    setTimeout(() => {
        circle.setAttribute('stroke-dasharray', `${targetPercentage}, 100`);
        let current = 0;
        const interval = setInterval(() => {
            current += 2;
            if (current >= targetPercentage) {
                current = targetPercentage;
                clearInterval(interval);
            }
            text.textContent = `${current}%`;
        }, 30);
    }, 100);
}

window.restart = function() {
    showScreen('landing-screen');
}

// Initialize
initParticles();
