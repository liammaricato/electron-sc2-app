const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron/main')

function screenPath(name) {
  return `../renderer/screens/${name}/index.html`
}

let mainWindow
let timerWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    resizable: false,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadFile(screenPath('menu'))

  mainWindow.on('closed', () => {
    mainWindow = null
    if (timerWindow) timerWindow.close()

    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

function createTimerWindow() {
  timerWindow = new BrowserWindow({
    width: 620,
    height: 650,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  timerWindow.loadFile(screenPath('timer'))

  timerWindow.on('closed', () => {
    timerWindow = null

    if (mainWindow) {
      mainWindow.send('timer-window-closed')
    }
  })
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })

  globalShortcut.register('CmdOrCtrl+Shift+K', () => {
    if (timerWindow) {
      timerWindow.focus()
    } else {
      createTimerWindow()
    }

    timerWindow.send('start-timer')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Comunicação entre processos para abrir a janela do timer
ipcMain.on('open-timer-window', () => {
  if (!timerWindow) createTimerWindow()
})

// Comunicação entre processos para fechar a janela do timer
ipcMain.on('close-timer-window', () => {
  if (timerWindow) timerWindow.close()
})