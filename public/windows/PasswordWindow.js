const { BrowserWindow, nativeImage, ipcMain } = require('electron');
const path = require('path');
const { validatePasswordController } = require('../controllers/validatePasswordController');
const { createMainWindow } = require('./MainWindow');
let passwordWindow;

const createPasswordWindow = ()=>{
    // Create the browser window.
    passwordWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 450,
        minWidth: 300,
        backgroundColor: '#282c34',
        title: 'KawaNote| Confirm',
        frame: false,
        resizable: true,
        movable: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });
    passwordWindow.id = 2;
    passwordWindow.setMenu(null)
    // passwordWindow.maximize();
    passwordWindow.setIcon(nativeImage.createFromPath(path.join(__dirname, '../logo192.png')));
    // Open the DevTools.
    passwordWindow.webContents.openDevTools();

    // and load the index.html of the app.
    passwordWindow.loadURL(`file://${path.join(__dirname, '../../served-files/password.html')}`);
    // passwordWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`);

    passwordWindow.on('closed', ()=>{
        passwordWindow = null;
    });

    ipcMain.handle('validate-password',(event,password)=>{
        let user = validatePasswordController(password);
        if(!user)
            throw new Error("Failed to validate password!");
        
        return user;
    });

    ipcMain.on('pass-user',(event,user)=>{
        passwordWindow.close();

        createMainWindow();
    });
}

const isPasswordWindow = ()=>{
    return passwordWindow?true:false;
}

const getPasswordWindow = ()=>{
    /**
     * @returns {BrowserWindow}
     */
    return passwordWindow;
}

exports.createPasswordWindow = createPasswordWindow;
exports.isPasswordWindow = isPasswordWindow;
exports.getPasswordWindow = getPasswordWindow;