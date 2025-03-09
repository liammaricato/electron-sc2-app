const { ipcRenderer } = require('electron')

const timerBtn = document.getElementById('open-timer')
const buildsBtn = document.getElementById('open-builds')

let timerWindowToggle = false
let buildsWindowToggle = false

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

buildsBtn.addEventListener('click', () => {
  if (buildsWindowToggle) {
    ipcRenderer.send('close-builds-window')
    buildsBtn.classList.remove('active')
    buildsWindowToggle = false
  } else {
    ipcRenderer.send('open-builds-window')
    buildsBtn.classList.add('active')
    buildsWindowToggle = true
  }
})

ipcRenderer.on('timer-window-closed', () => {
  timerBtn.classList.remove('active')
  timerWindowToggle = false
})

ipcRenderer.on('builds-window-closed', () => {
  buildsBtn.classList.remove('active')
  buildsWindowToggle = false
})