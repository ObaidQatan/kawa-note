const { encode } = require("../packages/np-encode");

module.exports = function utf8ToBase64(string){
    return Buffer.from(string,'utf-8').toString('base64');
}


module.exports = function base64ToUtf8(string){
    return Buffer.from(string,'base64').toString('utf-8');
}

module.exports = function getMsgTime(timestamp){
    let hours = new Date(timestamp).getHours();
    let minutes = new Date(timestamp).getMinutes();

    let ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12; // can be 0
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0'+hours : hours;

    minutes = minutes < 10 ? '0'+minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

module.exports = encodeNoNp = encode