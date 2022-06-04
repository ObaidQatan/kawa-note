const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const JSONStorage = require('../../packages/JSONStorage');

const configCheckController = ()=>{
    //TODO: Solve the issue of configering file name...............................
    //NOTE: To solve this issue, there must be a config file to direct the process '.kawa.config'
    
    if(JSONStorage.fileExists(path.join(__dirname, `../../${process.env.CONFIG_FILENAME}`))){
        //TODO: retrive configs from .kawa.config
        let configs;
        try {
            configs = JSONStorage.readData(path.join(__dirname, `../../${process.env.CONFIG_FILENAME}`));
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
        new JSONStorage(path.join(__dirname, `../../${process.env.CONFIG_FILENAME}`));
        //TODO: login()
        return false;
    }

}

module.exports = { configCheckController };