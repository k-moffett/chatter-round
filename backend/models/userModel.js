const connection = require('../config/db/connection');

const userModel = {

    signUp(userInfo, sessid) {
        console.log(userInfo, sessid)
        console.log('sessid USERMODEL: ', sessid)
            connection.connect();
            connection.query(`SELECT * FROM users WHERE email = ${connection.escape(userInfo.email)}`, function (error, results, fields) {
            if (error) throw error;
            console.log(results, 'USERMODEL RESULTS');
            });
    },

    createUser(userInfo, sessid) {
            return new Promise((resolve, reject) => {
                connection.connect();

                connection.query(`INSERT INTO users (username, email, dateOfBirth, password, sessid) VALUES (${connection.escape(userInfo.userName)}, ${connection.escape(userInfo.email)}, ${connection.escape(userInfo.email)}, ${connection.escape(userInfo.dateOfBirth)}, ${connection.escape(userInfo.password)}, ${connection.escape(sessid)});`, function (error, results, fields) {
                if (error) throw error;
                console.log( 'USERMODEL RESULTS: ', results);
                resolve(results)
                });
            })
    },

};

module.exports = userModel;