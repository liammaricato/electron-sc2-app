const buildStepsContainer = document.getElementById('build-steps')

const builds = JSON.parse(localStorage.getItem('builds')) || []
const currentBuildId = sessionStorage.getItem('openBuildId') || 0

const build = builds.find(build => build.id == currentBuildId)

if (!build) {
    // close()
}

document.getElementById('build-title').textContent = build.title || 'Untitled build'

for (step of build.steps) {
    createBuildStep(step)
}

function createBuildStep(step) {
    const stepEl = document.createElement('div')
    stepEl.classList.add('build-step')
    stepEl.innerHTML = `
        <input type="time" name="time" placeholder="Time" value="${step.time}" disabled>
        <input type="text" name="supply" placeholder="supply" value="${step.supply}" disabled>
        <input type="text" name="description" placeholder="description" value="${step.description}" disabled>
    `

    buildStepsContainer.appendChild(stepEl)
}

// =============== PLAYER ===============

const timerDisplay = document.getElementById('timer-display')
const playPauseBtn = document.getElementById('player-play-pause')
const playIcon = document.getElementById('play-icon')
const pauseIcon = document.getElementById('pause-icon')
const restartBtn = document.getElementById('player-restart')
const stopBtn = document.getElementById('player-stop')

let timerInterval
let currentTime = 0
let timerRunning = false

const buildStepsEls = document.querySelectorAll('.build-step')
let currentStepIndex = 0

playPauseBtn.addEventListener('click', () => {
    togglePlayPauseIcon()

    if (!timerRunning) {
        timerRunning = true
        checkHighlightedStep()
        
        clearInterval(timerInterval)
        timerInterval = setInterval(() => {
            currentTime++
            updateTimerDisplay()
            checkHighlightedStep()
        }, 1000)
    } else {
        clearInterval(timerInterval)
        timerRunning = false
    }
})

stopBtn.addEventListener('click', () => {
    if (timerRunning) {
        togglePlayPauseIcon()
        clearInterval(timerInterval)
        timerRunning = false
    }

    restartPlayer()
})

restartBtn.addEventListener('click', () => {
    restartPlayer()
    checkHighlightedStep()
})

function togglePlayPauseIcon() {
    playIcon.classList.toggle('hidden')
    pauseIcon.classList.toggle('hidden')
}

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60)
    const seconds = currentTime % 60
    timerDisplay.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function checkHighlightedStep() {
    buildStepsEls[currentStepIndex].classList.add('highlight')

    nextStep = build.steps[currentStepIndex + 1]

    if (!nextStep) return

    if (nextStep.time == timerDisplay.value) {
        buildStepsEls[currentStepIndex].classList.remove('highlight')
        currentStepIndex++
        buildStepsEls[currentStepIndex].classList.add('highlight')
    }
}

function restartPlayer() {
    buildStepsEls[currentStepIndex].classList.remove('highlight')
    currentTime = 0
    currentStepIndex = 0
    updateTimerDisplay()
}