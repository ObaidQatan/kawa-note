const { ipcRenderer } = require("electron");


const clickBtnEffect = (e)=>{
    e.target.classList.toggle('clicked-btn');
    setTimeout(() => {
        e.target.classList.toggle('clicked-btn');
    }, 90);
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
        enableBtn(registerBtn,"Register")
        return alert("All fields are mandatory");
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
    })
}