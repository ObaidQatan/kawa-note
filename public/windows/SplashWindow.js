const { BrowserWindow, nativeImage } = require('electron');
const path = require('path');
const { configCheckController } = require('../controllers/configCheckController');
const { createMainWindow } = require('./MainWindow');
const { createLoginWindow } = require('./LoginWindow');
const { createPasswordWindow } = require('./PasswordWindow');
let splashWindow;

const createSplashWindow = ()=>{
    // Create the browser window.
    splashWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 450,
        minWidth: 300,
        backgroundColor: '#282c34',
        title: 'KawaNote',
        frame: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });
    splashWindow.id = -2;
    splashWindow.setMenu(null)
    // splashWindow.maximize();
    splashWindow.setIcon(nativeImage.createFromPath(path.join(__dirname, '../logo192.png')));
    // Open the DevTools.
    // splashWindow.webContents.openDevTools();

    // and load the index.html of the app.
    splashWindow.loadURL(`file://${path.join(__dirname, '../../served-files/splash.html')}`);
    // splashWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`);

    splashWindow.on('closed', ()=>{
        splashWindow.destroy();
    });

    //chechk if the config file exists
    const valid = configCheckController();
    setTimeout(() => {
        if(valid){
            splashWindow.close();

            createPasswordWindow();
        }else{
            splashWindow.close();
            createLoginWindow();
        }
    }, 2000);
}

const isSplashWindow = ()=>{
    return splashWindow?true:false;
}

const getSplashWindow = ()=>{
    /**
     * @returns {BrowserWindow}
     */
    return splashWindow;
}

exports.createSplashWindow = createSplashWindow;
exports.isSplashWindow = isSplashWindow;
exports.getSplashWindow = getSplashWindow;