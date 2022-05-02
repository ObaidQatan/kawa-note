const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');

function fileExists(filePath){
    try {
        if(fs.existsSync(filePath)){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        dialog.showErrorBox('Something Went Wrong!', error.message);
    }
}

const configCheckController = ()=>{
    if(fileExists(path.join(__dirname, '../../.kawa.config'))){
        //TODO: retrive configs from .kawa.config
        let configString = fs.readFileSync(path.join(__dirname, '../../.kawa.config'), 'utf8');
        let configs;
        try {
            configs = JSON.parse(configString);
        } catch (error) {
            return false;
        }
            //TODO: if configs are valid && isLogined == true --> pass()
        if(configs.isLogined && configs.username && configs.password){
            return true;
        }else{
            return false;
        }
            //TODO: else --> login()
    }else{
        //TODO: create .kawa.config
        fs.writeFileSync(path.join(__dirname, '../../.kawa.config'), '{}');
        //TODO: login()
        return false;
    }

}

module.exports = { configCheckController };