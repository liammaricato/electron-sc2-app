const { ipcRenderer } = require('electron')

const timerBtn = document.getElementById('open-timer')

let timerWindowToggle = false

timerBtn.addEventListener('click', () => {
  if (timerWindowToggle) {
    ipcRenderer.send('close-timer-window')
    timerBtn.classList.remove('active')
    timerWindowToggle = false
  } else {
    ipcRenderer.send('open-timer-window')
    timerBtn.classList.add('active')
    timerWindowToggle = true
  }
})

ipcRenderer.on('timer-window-closed', () => {
  timerBtn.classList.remove('active')
  timerWindowToggle = false
})