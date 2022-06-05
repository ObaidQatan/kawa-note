const { deleteUserConfig } = require("../../packages/helper-functions")

function deleteUserConfigController(username){
    let isDeleted = deleteUserConfig(`.${username}${process.env.CONFIG_FILENAME}`);
    
    return isDeleted;
}

module.exports = { deleteUserConfigController }