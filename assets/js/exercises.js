// Exercise functionality
const exerciseData = {
    muscle: {
        title: 'Progressive Muscle Relaxation',
        instructions: 'Tense each muscle group for 5 seconds (face, arms, legs, back, buttocks & chest), then release. Focus on the difference between tension and relaxation. Scroll for timer',
        duration: 180
    },
    breathing: {
        title: 'Guided Breathing',
        instructions: 'Follow the expanding and contracting circle. Breathe in for 4 counts, hold for 4, and exhale for 4. Scroll for timer',
        duration: 180
    },
    mindfulness: {
        title: 'Mindfulness Meditation',
        instructions: 'Watch the particles flow and observe your thoughts without judgment. Let them pass like clouds. Scroll for timer',
        duration: 300
    },
    grounding: {
        title: 'Grounding Technique (5-4-3-2-1)',
        instructions: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Scroll for timer',
        duration: 240
    },
    bodyscan: {
        title: 'Body Scan Relaxation',
        instructions: 'The figure will glow as you scan through your body from head to toe. Relax your body as its highlighted. Scroll for timer',
        duration: 300
    },
    visualization: {
        title: 'Visualization & Imagery',
        instructions: 'Close your eyes and imagine a serene scene. Focus on the details your mind creates and immerse yourself in the tranquility. Scroll for timer',
        duration: 240
    }
};

let currentExercise = null;
let exerciseTimer = null;
let timeRemaining = 0;
let isRunning = false;

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    const exerciseButtons = document.querySelectorAll('.exercise-btn');
    exerciseButtons.forEach(btn => {
        btn.addEventListener('click', openExercise);
    });

    const closeBtn = document.getElementById('closeExercise');
    closeBtn.addEventListener('click', closeExercise);

    const modal = document.getElementById('exerciseModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeExercise();
        }
    });

    document.getElementById('startBtn').addEventListener('click', startExercise);
    document.getElementById('pauseBtn').addEventListener('click', pauseExercise);
    document.getElementById('resetBtn').addEventListener('click', resetExercise);
});

function openExercise(e) {
    const exerciseType = e.target.dataset.exercise;
    currentExercise = exerciseType;
    const data = exerciseData[exerciseType];

    document.getElementById('exerciseTitle').textContent = data.title;
    document.getElementById('exerciseInstructions').textContent = data.instructions;
    timeRemaining = data.duration;
    updateTimerDisplay();

    // Show modal
    document.getElementById('exerciseModal').classList.add('active');

    // Create animation
    createAnimation(exerciseType);

    // Reset buttons
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    isRunning = false;
}

function closeExercise() {
    document.getElementById('exerciseModal').classList.remove('active');
    if (exerciseTimer) {
        clearInterval(exerciseTimer);
    }
    isRunning = false;
    currentExercise = null;
}

function createAnimation(exerciseType) {
    const animationArea = document.getElementById('animationArea');
    animationArea.innerHTML = ''; // Clear previous animation

    switch(exerciseType) {
        case 'muscle':
            createMuscleAnimation(animationArea);
            break;
        case 'breathing':
            createBreathingAnimation(animationArea);
            break;
        case 'mindfulness':
            createMindfulnessAnimation(animationArea);
            break;
        case 'grounding':
            createGroundingAnimation(animationArea);
            break;
        case 'bodyscan':
            createBodyScanAnimation(animationArea);
            break;
        case 'visualization':
            createVisualizationAnimation(animationArea);
            break;
    }
}

function createMuscleAnimation(container) {
    const zones = document.createElement('div');
    zones.className = 'muscle-zones';
    zones.innerHTML = `
        <div class="muscle-zone" style="animation-delay: 0s;">💪</div>
        <div class="muscle-zone" style="animation-delay: 0.5s;">🦵</div>
        <div class="muscle-zone" style="animation-delay: 1s;">🤲</div>
        <div class="muscle-zone" style="animation-delay: 1.5s;">😤</div>
    `;
    container.appendChild(zones);
}

function createBreathingAnimation(container) {
    const circle = document.createElement('div');
    circle.className = 'breathing-circle';
    container.appendChild(circle);
}

function createMindfulnessAnimation(container) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'meditation-particles';

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        const delay = i * 0.3;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animationDelay = delay + 's';
        particleContainer.appendChild(particle);
    }

    container.appendChild(particleContainer);
}

function createGroundingAnimation(container) {
    const elements = document.createElement('div');
    elements.className = 'grounding-elements';
    elements.innerHTML = `
        <div class="sense-element" title="See - 5 things">👀</div>
        <div class="sense-element" title="Touch - 4 things">✋</div>
        <div class="sense-element" title="Hear - 3 things">👂</div>
        <div class="sense-element" title="Smell - 2 things">👃</div>
        <div class="sense-element" title="Taste - 1 thing">👅</div>
    `;
    container.appendChild(elements);

    const senseElements = elements.querySelectorAll('.sense-element');
    senseElements.forEach((el, index) => {
        el.addEventListener('click', () => {
            el.style.background = 'rgba(255, 255, 255, 0.8)';
            el.style.transformOrigin = 'center';
            setTimeout(() => {
                el.style.background = 'rgba(255, 255, 255, 0.3)';
            }, 300);
        });
    });
}

function createBodyScanAnimation(container) {
    const outline = document.createElement('div');
    outline.className = 'body-scan-outline';
    outline.textContent = '🧘‍♀️';
    container.appendChild(outline);
}

function createVisualizationAnimation(container) {
    const scene = document.createElement('div');
    scene.className = 'visualization-scene';
    scene.innerHTML = `
        <div class="sun"></div>
        <div class="cloud" style="top: 40px;"></div>
        <div class="cloud"></div>
        <div class="ground"></div>
    `;
    container.appendChild(scene);
}

function startExercise() {
    if (isRunning) return;
    isRunning = true;
    
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';

    exerciseTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(exerciseTimer);
            isRunning = false;
            completeExercise();
        }
    }, 1000);
}

function pauseExercise() {
    if (!isRunning) return;
    clearInterval(exerciseTimer);
    isRunning = false;

    document.getElementById('startBtn').textContent = 'Resume';
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function resetExercise() {
    clearInterval(exerciseTimer);
    isRunning = false;
    
    const data = exerciseData[currentExercise];
    timeRemaining = data.duration;
    updateTimerDisplay();

    document.getElementById('startBtn').textContent = 'Start';
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

function completeExercise() {
    const modal = document.getElementById('exerciseModal');
    const content = modal.querySelector('.exercise-modal-content');
    
    // Create completion message
    const message = document.createElement('div');
    message.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        padding: 20px;
        border-radius: 10px;
        margin-top: 20px;
        font-size: 18px;
        animation: slideInFromBottom 0.5s ease-out;
    `;
    message.textContent = '✨ Great job! Exercise completed. You did amazing!';
    content.appendChild(message);

    document.getElementById('startBtn').textContent = 'Start';
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

// Add animation for completion message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromBottom {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
