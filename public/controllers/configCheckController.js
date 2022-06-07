const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const { decodeFromNp, decipher, decodeFromBase64, encodeToBase64, updateFlowConfig, encodeToNp } = require('../../packages/helper-functions');
const JSONStorage = require('../../packages/JSONStorage');

const configCheckController = ()=>{
    //TODO: Solve the issue of configuring file name...............................
    //NOTE: To solve this issue, there must be a config file to direct the process '.kawa.config'
    if(JSONStorage.fileExists(path.join(__dirname, `../../${process.env.CONFIG_FILENAME}`))){
        //TODO: retrive configs from .kawa.config
        let encodedConfigs;
        try {
            encodedConfigs = fs.readFileSync(path.join(__dirname, `../../${process.env.CONFIG_FILENAME}`), 'utf8');
            if(encodedConfigs.length===0)
                throw new Error('Config file is empty!');
        } catch (error) {
            return false;
        }

        //TODO: decode encodedConfigs
        let decodedConfigs;
        try {
            decodedConfigs = decipher(decodeFromNp(decodeFromBase64(encodedConfigs)));
            // decodedConfigs = decipher(encodedConfigs); //from cipher
            // decodedConfigs = decodeFromNp(decodedConfigs); //from npEnc
            // decodedConfigs = decodeFromBase64(decodedConfigs); //from base64
        } catch (error) {
            return false;
        }

        let configs = {};
        try {
            configs = JSON.parse(decodedConfigs);
        } catch (error) {
            return false;
        }

        let user_config_file_name;
        
        try {
            user_config_file_name = decodeFromBase64(decodeFromNp(decodeFromBase64(configs.user_config_file_name)));
            if(!(user_config_file_name && configs.remember_me)){
                return false;
            }
        } catch (error) {
            return false;
        }

        if(JSONStorage.fileExists(path.join(__dirname, `../../${user_config_file_name}`))){
            //TODO: retrive configs from .username.kawa.config
            let userConfigs;
            try {
                userConfigs = JSONStorage.readData(path.join(__dirname, `../../${user_config_file_name}`));
            } catch (error) {
                console.log('coud not read data json')
                return false;
            }

            //TODO: if userConfigs are valid --> password_window()
            if(
                userConfigs[encodeToBase64(encodeToNp('username'))] &&
                userConfigs[encodeToBase64(encodeToNp('password'))] &&
                userConfigs[encodeToBase64(encodeToNp('dob'))] &&
                userConfigs[encodeToBase64(encodeToNp('gender'))]
            ){
                return true;
            }else{
                return false;
            }
                //TODO: else --> login()
        }else{
            return false;
        }
    }else{
        //TODO: create .kawa.config
       updateFlowConfig();
        //TODO: login()
        return false;
    }

}

module.exports = { configCheckController };