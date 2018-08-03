const crypto = require('crypto');
const connection = require('../config/db/connection');
connection.connect();

const nonce = () => {
    let text = '';
    let selection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (i=0; i<20; i++) {
            text += selection.charAt(Math.floor(Math.random()*selection.length));
        };
    return text;
}

const userModel = {

    doesEmailExist(userInfo) {

        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM users WHERE email = ${connection.escape(userInfo.email)}`, function (error, results, fields) {
                if (error) throw error && reject(error);
                if (results[0] === undefined) {
                    resolve(userModel.createUser(userInfo))
                } else {
                    resolve({'emailExists': true})
                }
            });

        })

    },

    createUser(userInfo) {
        let sessid = crypto.createHash('sha256').update(`${nonce()+Date.now()}`).digest('hex')

            return new Promise((resolve, reject) => {

                connection.query(`INSERT INTO users (username, email, dateOfBirth, password, sessid) VALUES (${connection.escape(userInfo.userName)}, ${connection.escape(userInfo.email)}, ${connection.escape(userInfo.dateOfBirth)}, ${connection.escape(userInfo.password)}, ${connection.escape(sessid)});`, function (error, results, fields) {
                if (error) throw error && reject(error);
                resolve({'sessid': sessid})
                });

            });
    },

};

module.exports = userModel;