const connection = require('../config/db/connection');
connection.connect();

const userModel = {

    signUp(userInfo) {
        return new Promise((resolve, reject) => {
            
            connection.query(`SELECT * FROM users WHERE email = ${connection.escape(userInfo.email)}`, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            });
            
        });
    },

};

module.exports = userModel;