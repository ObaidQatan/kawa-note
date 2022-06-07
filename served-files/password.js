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

const enter = ()=>{
    const password = document.getElementById("password").value.trim();
    const enter_btn = document.getElementById('enter-btn');

    disableBtn(enter_btn,"Loading");

    if(!password){
        enableBtn(enter_btn,"Enter");
        return ipcRenderer.send('alert',"Please Enter Your Password!");
    }

    ipcRenderer.invoke('validate-password',password).then(res=>{
        disableBtn(enter_btn,"Welcome!");
        console.log(res);
        
        ipcRenderer.send('pass-user:password-window',JSON.stringify(res));
     }).catch(e=>{
         enableBtn(enter_btn, "Enter");
         ipcRenderer.send('error',reformErrorMessage(e,'validate-password'));
         return console.log(e);
     })
}

const logout = ()=>{
    ipcRenderer.invoke('remove-user').then(isRemoved=>{
        if(isRemoved)
            ipcRenderer.send('logout');
        else
            ipcRenderer.send('error',"Logout Failed!");
    }).catch(e=>{
        ipcRenderer.send('error',reformErrorMessage(e,'remove-user'));
        return console.log(e);
    });
}