const { ipcRenderer } = require("electron/renderer");
const fs = require('fs');
const { decipher, decodeFromNp, decodeFromBase64, retriveFlowConfigs, retriveUser } = require("../../packages/helper-functions");
const JSONStorage = require("../../packages/JSONStorage");

const validatePasswordController = (password) => {
    let configs;
    try {
        configs = retriveFlowConfigs();
    } catch (error) {
        console.log("hereee")
        console.log(error)
        return false;
    }
    
    let user_config_file_name = decodeFromBase64(decodeFromNp(decodeFromBase64(configs.user_config_file_name)));

    if(!(user_config_file_name && configs.remember_me))
        throw new Error("Failed to identify user!");
    
    let user = retriveUser(user_config_file_name);

    if(user.password !== password)
        throw new Error("Invalid password!");
    
    //NOTE: Valid
    //TODO: Return User

    delete user.password;
    return user;
}

module.exports = { validatePasswordController }