const connection = require('../config/db/connection');

const userModel = {

    signUp(userInfo) {
        console.log(userInfo)
        return new Promise((resolve, reject) => {
            connection.connect();

            connection.query(`SELECT * FROM users WHERE email = ${connection.escape(userInfo.email)}`, function (error, results, fields) {
            if (error) throw error;
            console.log(results, 'USERMODEL');
            resolve(results)
            });

        });
    },

};

module.exports = userModel;