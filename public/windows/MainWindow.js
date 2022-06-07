const { BrowserWindow, nativeImage } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
let mainWindow;

const createMainWindow = ()=>{
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 450,
        minWidth: 300,
        backgroundColor: '#282c34',
        title: 'KawaNote',
        frame: false,
        resizable: true,
        movable: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });
    mainWindow.id = 0;
    mainWindow.setMenu(null)
    // mainWindow.maximize();
    mainWindow.setIcon(nativeImage.createFromPath(path.join(__dirname, '../logo192.png')));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // and load the index.html of the app.
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../build/index.html')}`);
    // mainWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`);

    mainWindow.on('closed', ()=>{
        mainWindow.destroy();
    });
}

const isMainWindow = ()=>{
    return mainWindow?true:false;
}

const getMainWindow = ()=>{
    /**
     * @returns {BrowserWindow}
     */
    return mainWindow;
}

exports.createMainWindow = createMainWindow;
exports.isMainWindow = isMainWindow;
exports.getMainWindow = getMainWindow;