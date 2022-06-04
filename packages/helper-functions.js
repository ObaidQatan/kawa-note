const encode = require('../packages/npEnc.js').encode;
const crypto = require('crypto');
const { ipcRenderer } = require('electron');

function encodeToBase64(string){
    return Buffer.from(string).toString("base64");
}

function encodeToNp(string){
    return encode(string);
}

function cipher(string){
    const cipher = crypto.createCipher('aes-256-gcm', process.env.CTYPTO_SECRET_KEY);
    
    let encrypted = cipher.update(string, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}


module.exports = { encodeToBase64, encodeToNp, cipher }