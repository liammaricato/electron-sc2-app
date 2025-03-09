const { ipcRenderer } = require('electron')

const nowSound = new Audio('../../assets/now.mp3')

const timerBtn = document.getElementById('start-timer')
const timerDisplay = document.getElementById('timer-display')
const timerBar = document.getElementById('timer-bar')

let timerInterval
let startingTime = 0
let timeLeft = 0
let timerRunning = false

document.getElementById('timer-30').addEventListener('click', () => setTimerOption(30))
document.getElementById('timer-31').addEventListener('click', () => setTimerOption(31))
document.getElementById('timer-32').addEventListener('click', () => setTimerOption(32))

function setTimerOption(seconds) {
  startingTime = seconds
  timeLeft = seconds
  updateTimerDisplay()
}

timerBtn.addEventListener('click', () => {
  if (timerRunning) {
    clearInterval(timerInterval)
    timerRunning = false
    timerBtn.textContent = 'Start'
    timeLeft = startingTime
    updateTimerDisplay()
    return
  }

  const [minutes, seconds] = timerDisplay.value.split(':').map(Number)
  const timeInput = minutes * 60 + seconds

  if (timeInput > 0) {
    startingTime = timeInput
    timeLeft = timeInput
    startTimer()
  }
})

function startTimer() {
  timerRunning = true
  timerBtn.textContent = 'Stop'

  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timeLeft--
    updateTimerDisplay()

    if (timeLeft <= 0) {
      nowSound.play()
      clearInterval(timerInterval)
      timerRunning = false
      timerBtn.textContent = 'Start'
      timeLeft = startingTime
      updateTimerDisplay()

      if (document.getElementById('repeat').checked) {
        startTimer()
      }
    }
  }, 1000)
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  timerDisplay.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const progress = (timeLeft / startingTime) * 100
  timerBar.style.width = `${progress}%`
}

ipcRenderer.on('start-timer', () => {
  if (timerDisplay.value === '00:00') {
    setTimerOption(30)
  }
  
  timerBtn.click()
})