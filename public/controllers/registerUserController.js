const { ipcRenderer } = require("electron/renderer");
const path = require('path');
const { encodeToBase64, encodeToNp, cipher } = require("../../packages/helper-functions");
const JSONStorage = require("../../packages/JSONStorage");

function registerUserController(form){
/**
 * form={
//interface
    username: 'username value',
    password: 'password value',
    confirm_password: 'password value',
    gender: 'male',
    dob: '2000-12-12',
}
 */
//TODO: encodeCredintials()
let username = form.username;
try {
    form.username = encodeToBase64(form.username);
    form.username = encodeToNp(form.username);
    form.username = encodeToBase64(form.username);
    
    form.gender = form.gender==='male'?encodeToBase64('0'):encodeToBase64('1');
    form.gender = encodeToNp(form.gender);
    form.gender = encodeToBase64(form.gender);
    
    form.dob = encodeToBase64(new Date(form.dob).toDateString());
    form.dob = encodeToNp(form.dob);
    form.dob = encodeToBase64(form.dob);
    
    form.password = encodeToBase64(form.password);
    form.password = encodeToNp(form.password);
    form.password = cipher(form.password);
    
    delete form.confirm_password;

} catch (error) {
    ipcRenderer.send('error',error.message);
}


//TODO: create storage
//TODO: If username already exists --> return error
if(JSONStorage.fileExists(path.join(__dirname, `../../${'.'+username+process.env.CONFIG_FILENAME}`)))
    throw new Error("A user with the same username already exists!/nPlease try another username.");

var storage = new JSONStorage(path.join(__dirname, `../../${'.'+username+process.env.CONFIG_FILENAME}`),true);

//NOTE: Registration will creates a new config for the user .username.kawa.config and if already exists --> reject()
let data = {};
data[encodeToBase64(encodeToNp('username'))] = form.username;
data[encodeToBase64(encodeToNp('password'))] = form.password;
data[encodeToBase64(encodeToNp('dob'))] = form.dob;
data[encodeToBase64(encodeToNp('gender'))] = form.gender;

storage.setDataAll(data)
}

module.exports = { registerUserController };