const { ipcRenderer } = require("electron");
const { reformErrorMessage } = require("../packages/helper-functions");


const clickBtnEffect = (e)=>{
    e.target.classList.toggle('clicked-btn');
    setTimeout(() => {
        e.target.classList.toggle('clicked-btn');
    }, 90);
}

const closeWindow = (delay)=>{
    if(!delay)
        delay = 0;
    setTimeout(()=>{
        ipcRenderer.send('close');
    },delay);
}

function disableBtn(btnNode,textContent){
    btnNode.disabled = true;
    if(!textContent)
        return
    btnNode.textContent = textContent.toString();
}

function enableBtn(btnNode,textContent){
    btnNode.disabled = false;
    if(!textContent)
        return
    btnNode.textContent = textContent.toString();
}

function register(){
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm_password = document.getElementById("confirm-password").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.querySelector('.date-picker').value;
    const registerBtn = document.getElementById('register-btn');
    
    disableBtn(registerBtn,"Loading");

    if(!(username&&password&&confirm_password&&gender&&dob)){
        enableBtn(registerBtn,"Register");
        return ipcRenderer.send('alert',"All Fields Are Mandatory!");
    }

    
    if(password!==confirm_password){
        enableBtn(registerBtn,"Register");
        return ipcRenderer.send('alert',"Passwords do not match!");
    }


    const form = {
        username,
        password,
        confirm_password,
        gender,
        dob
    }

    ipcRenderer.invoke('register-user',form).then(res=>{
       disableBtn(registerBtn,"Registered")
       ipcRenderer.invoke('login-user',
       {
           username:form.username,
           password:form.password
        }
        ).then(user=>{
        if(!user){
            window.location.href = window.location.href.replace('/register.html', '/login.html');
        }
        disableBtn(registerBtn,"Welcome!");
        
        ipcRenderer.send('pass-user:login-window',JSON.stringify(user));
     }).catch(e=>{
         enableBtn(registerBtn, "Login");
         ipcRenderer.send('error',reformErrorMessage(e,'login-user'));
         return console.log(e);
     })
        //
    }).catch(e=>{
        enableBtn(registerBtn, "Register");
        ipcRenderer.send('error',reformErrorMessage(e,'register-user'));
        return console.log(e);
    })
}