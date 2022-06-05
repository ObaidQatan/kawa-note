const { ipcRenderer } = require("electron");
const { reformErrorMessage } = require("../packages/helper-functions");

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

const login = ()=>{
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const login_btn = document.getElementById('login-btn');

    disableBtn(login_btn,"Loading");

    if(!(password && username)){
        enableBtn(login_btn,"Login");
        return ipcRenderer.send('alert',"All Fields Are Mandatory!");
    }

    ipcRenderer.invoke('login-user',{username,password}).then(user=>{
        if(!user){
            enableBtn(login_btn, "Login");
            ipcRenderer.invoke("error-sync","Your information seems to be corrupted! You or somebody else have tried to miss with your data file.\nUnfortunately, you will have to register once again.")
            .then(()=>{
                ipcRenderer.invoke("alert-sync", "You will not be able to register again until you delete your corrupted data file.\nDelete data file now?")
                .then((btn_index)=>{
                    if(btn_index === 0){

                        disableBtn(login_btn,"Processing...");
                        ipcRenderer.invoke("delete-data-file",username).then((isDeleted)=>{
                            if(!isDeleted)
                                throw new Error("Could not delete data file!");
                                
                            enableBtn(login_btn,"Login");
                            ipcRenderer.send("alert", "Data file deleted successfully!");
                        }).catch(e=>{
                            enableBtn(login_btn, "Login");
                            ipcRenderer.send("error",reformErrorMessage(e,'delete-data-file'));
                            return console.log(e);
                        })

                    }else{
                        ipcRenderer.send('alert',"Please delete your corrupted data file manually or register with another username.");
                    }
                });
            });
        }
        disableBtn(login_btn,"Welcome!");
        console.log(user);
        
        ipcRenderer.send('pass-user',JSON.stringify(user));
     }).catch(e=>{
         enableBtn(login_btn, "Login");
         ipcRenderer.send('error',reformErrorMessage(e,'login-user'));
         return console.log(e);
     })
}