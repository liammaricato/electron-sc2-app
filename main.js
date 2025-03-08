const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron/main')

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

  mainWindow.loadFile('index.html')

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

  timerWindow.loadFile('timer.html')

  timerWindow.on('closed', () => {
    timerWindow = null

    if (mainWindow) {
      mainWindow.send('timer-window-closed')
    }
  })
}

function createBuildsWindow() {
  buildsWindow = new BrowserWindow({
    width: 620,
    height: 650,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  buildsWindow.loadFile('builds.html')

  buildsWindow.on('closed', () => {
    buildsWindow = null

    if (mainWindow) {
      mainWindow.send('builds-window-closed')
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

ipcMain.on('open-builds-window', () => {
  if (!buildsWindow) createBuildsWindow()
})

ipcMain.on('close-builds-window', () => {
  if (buildsWindow) buildsWindow.close()
})