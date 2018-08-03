const crypto = require('crypto');
const connection = require('../config/db/connection');
connection.connect();

const userModel = {

    doesEmailExist(userInfo, /*sessid*/) {
        console.log(userInfo, /*sessid*/)
        console.log('sessid USERMODEL: ', /*sessid*/)
        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM users WHERE email = ${connection.escape(userInfo.email)}`, function (error, results, fields) {
                if (error) throw error && reject(error);
                console.log(results[0], 'USERMODEL RESULTS');
                if (results[0] === undefined) {
                    userModel.createUser(userInfo, /*sessid*/)
                } else {
                    resolve({'email-exists': true})
                }
            });

        })

    },

    createUser(userInfo, /*sessid*/) {
        let sessid = crypto.createHash('sha256').update(`${nonce()+Date.now()}`).digest('hex')
        
            return new Promise((resolve, reject) => {

                connection.query(`INSERT INTO users (username, email, dateOfBirth, password, sessid) VALUES (${connection.escape(userInfo.userName)}, ${connection.escape(userInfo.email)}, ${connection.escape(userInfo.dateOfBirth)}, ${connection.escape(userInfo.password)}, ${connection.escape(sessid)});`, function (error, results, fields) {
                if (error) throw error;
                console.log( 'USERMODEL RESULTS: ', results);
                resolve(results, sessid)
                });

            });
    },

};

module.exports = userModel;