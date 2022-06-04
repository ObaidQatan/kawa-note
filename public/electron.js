const { app, ipcMain, dialog } = require('electron');
const path = require('path');
const { isMainWindow, getMainWindow } = require('./windows/MainWindow');
const { createSplashWindow, isSplashWindow, getSplashWindow } = require('./windows/SplashWindow');
app.isPackaged || require('electron-reloader')(module)

app.whenReady().then(()=>{
    createSplashWindow();
});

app.on('activate', ()=>{
    if(!isSplashWindow){
        createSplashWindow();
    }
});

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

//NOTE: Toolbar Actions Handler
ipcMain.on('tool-bar-action',(event, type)=>{
    if(type === 'adjust'){
        getMainWindow().unmaximize();
    }else if(type === 'minimize'){
        getMainWindow().minimize();
    }else if(type === 'maximize'){
        getMainWindow().maximize();
    }else if(type === 'close'){
        getMainWindow().close();
    }
})

//NOTE: Alert Event Handler
ipcMain.on('alert',(event,message)=>{
    dialog.showMessageBox({
        type: 'info',
        message: message
    });
});

//NOTE: Error Event Handler
ipcMain.on('error',(event,err)=>{
    dialog.showMessageBox({
        type: 'error',
        message: err?.toString()
    });
});
