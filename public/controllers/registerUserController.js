function registerUserController(form={
//interface
    username: 'username value',
    password: 'password value',
    confirm_password: 'password value',
    gender: 'male',
    dob: '2000-12-12',
}){

//TODO: encodeCredintials()
form.username = encodeToBase64(form.username);
form.gender = form.gender==='male'?'0':'1';
form.dob = new Date(form.dob);
form.password = encodeToNp(form.password);
form.password = cipher(form.password);
form.password = encodeToHex(form.password);
delete form.confirm_password;
console.log(form);

}

module.exports = { registerUserController };