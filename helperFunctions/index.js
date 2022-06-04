const { base64ToUtf8, getMsgTime, utf8ToBase64, encodeToNp } = require('./helper');


module.exports = {
    utf8ToBase64,
    getDailyTime: getMsgTime,
    base64ToUtf8,
    encodeToNp
}