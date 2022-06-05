const { BrowserWindow, nativeImage, ipcMain } = require('electron');
const path = require('path');
const { updateFlowConfig } = require('../../packages/helper-functions');
const { deleteUserConfigController } = require('../controllers/deleteUserConfigController');
const { loginUserController } = require('../controllers/loginUserController');
const { registerUserController } = require('../controllers/registerUserController');
const { createMainWindow } = require('./MainWindow');
let loginWindow;

const createLoginWindow = ()=>{
    // Create the browser window.
    loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 450,
        minWidth: 300,
        backgroundColor: '#282c34',
        title: 'KawaNote| Login',
        frame: false,
        resizable: true,
        movable: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });
    loginWindow.id = 1;
    loginWindow.setMenu(null)
    // loginWindow.maximize();
    loginWindow.setIcon(nativeImage.createFromPath(path.join(__dirname, '../logo192.png')));
    // Open the DevTools.
    loginWindow.webContents.openDevTools();

    // and load the index.html of the app.
    loginWindow.loadURL(`file://${path.join(__dirname, '../../served-files/login.html')}`);
    // loginWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`);

    loginWindow.on('closed', ()=>{
        loginWindow = null;
    });

    ipcMain.handle('register-user',(event,form)=>{
        return registerUserController(form);
    });

    ipcMain.handle('login-user',(event,form)=>{
        let user = loginUserController(form);
        //TODO: update .kawa.config file with user's info
        updateFlowConfig(user);
        
        return user;
    });

    ipcMain.on('pass-user',(event,user)=>{
        loginWindow.close();

        createMainWindow();
    });

    ipcMain.handle('delete-data-file',(event,username)=>{
        let isDeleted = deleteUserConfigController(username);

        return isDeleted;
    })
}

const isLoginWindow = ()=>{
    return loginWindow?true:false;
}

const getLoginWindow = ()=>{
    /**
     * @returns {BrowserWindow}
     */
    return loginWindow;
}

exports.createLoginWindow = createLoginWindow;
exports.isLoginWindow = isLoginWindow;
exports.getLoginWindow = getLoginWindow;