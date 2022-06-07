const { retriveUser, encodeUserConfigFileName } = require("../../packages/helper-functions")


function loginUserController(form){
    //NOTE: for Login validation will be as follows: NOTE: Login....
    //    1. Check if .username.kawa.config exists
    //    2. If exists, check if .username.kawa.config is valid
    //    3. If valid, check if username from the file name is the same as the encoded username in it
    //    4. If same --> pass()
    //    5. If not same --> login()
    let user = retriveUser(`.${encodeUserConfigFileName(form.username)}`);
    if(!user)
        throw new Error("You are not registered with this username yet!");
    
    if(!(user.username && user.password && user.dob && user.gender)){
        return false;
    }
    
    if(user.username !== form.username)
        throw new Error("Username that you have entered does not match with the one stored in your data file! It seems that you or somebody else have tried to miss with your data file.\nPlease rename your data file with your actual username then try to login once again.");
    
    if(user.password !== form.password)
        throw new Error("Password is not correct!");

    delete user.password;
    return user;
}

module.exports = { loginUserController }