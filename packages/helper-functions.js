const encode = require('../packages/npEnc.js').encode;
const crypto = require('crypto');
const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const { decode } = require('../packages/npEnc.js');
const JSONStorage = require('./JSONStorage.js');

function encodeToBase64(string){
    return Buffer.from(string).toString("base64");
}

function encodeToNp(string){
    return encode(string);
}

function cipher(string){
    const cipher = crypto.createCipher('aes-192-cbc', process.env.CTYPTO_SECRET_KEY);
    
    let encrypted = cipher.update(string,"utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}


function decipher(encryptedData){
    const decipher = crypto.createDecipher('aes-192-cbc', process.env.CTYPTO_SECRET_KEY);
    let decrypted = decipher.update(encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
}


function decodeFromBase64(string){
    return Buffer.from(string, 'base64').toString('utf-8');
}

function decodeFromNp(string){
    return decode(string);
}

function retriveFlowConfigs(){
    if(JSONStorage.fileExists(path.join(__dirname, `../${process.env.CONFIG_FILENAME}`))){
        //TODO: retrive configs from .kawa.config
        let encodedConfigs;
        //
        encodedConfigs = fs.readFileSync(path.join(__dirname, `../${process.env.CONFIG_FILENAME}`), 'utf8');
        if(encodedConfigs.length===0)
            throw new Error('Config file is empty!');
        //

        //TODO: decode encodedConfigs
        let decodedConfigs = decodeFromBase64(encodedConfigs); //from cipher
        decodedConfigs = decodeFromNp(decodedConfigs); //from npEnc
        decodedConfigs = decipher(decodedConfigs); //from base64

        //
        let configs = JSON.parse(decodedConfigs);
        //

        return configs;
    }else{
        throw new Error('Config file does not exist!');
    }
}

function retriveUser(user_config_file_name){
    if(JSONStorage.fileExists(path.join(__dirname, `../${user_config_file_name}`))){
        let data = JSONStorage.readData(path.join(__dirname, `../${user_config_file_name}`));
        let user = {};

        user.username = data[encodeToBase64(encodeToNp('username'))]
        user.password = data[encodeToBase64(encodeToNp('password'))]
        user.gender = data[encodeToBase64(encodeToNp('gender'))]
        user.dob = data[encodeToBase64(encodeToNp('dob'))]
        //
        user.username = decodeFromBase64(decodeFromNp(decodeFromBase64(user.username)));
        user.password = decodeFromBase64(decodeFromNp(decipher(user.password)));
        user.gender = decodeFromBase64(decodeFromNp(decodeFromBase64(user.gender)));
        user.gender = user.gender==='0'?'male':'female';
        user.dob = decodeFromBase64(decodeFromNp(decodeFromBase64(user.dob)));

        return user;
    }else{
        return null;
    }
}

function deleteUserConfig(user_config_file_name){
    if(JSONStorage.fileExists(path.join(__dirname, `../${user_config_file_name}`))){
        fs.unlinkSync(path.join(__dirname, `../${user_config_file_name}`));
        return true;
    }else{
        throw new Error('User is not registered yet!');
    }
}

function updateFlowConfig(user){
    let configs = {};
    if(user){
        configs.user_config_file_name = encodeToBase64(encodeToNp(encodeToBase64(`.${user.username}${process.env.CONFIG_FILENAME}`)));
        configs.remember_me = true;
    }
    
    try {
        configs = JSON.stringify(configs);
    } catch (error) {
        throw new Error("Data is not in JSON format!");
    }
    configs = cipher(configs)
    configs = encodeToNp(configs)
    configs = encodeToBase64(configs);
    try {
        fs.writeFileSync(path.join(__dirname,`../${process.env.CONFIG_FILENAME}`), configs);
    } catch (error) {
        throw new Error("Failed to update configurations!");
    }
}

function reformErrorMessage(error, channel){
    return `${error}`.replace(`Error: Error invoking remote method '${channel}':`,"").trim();
}

module.exports = {
    encodeToBase64,
    encodeToNp,
    cipher,
    decipher,
    decodeFromBase64,
    decodeFromNp,
    retriveFlowConfigs,
    retriveUser,
    deleteUserConfig,
    updateFlowConfig,
    reformErrorMessage
};