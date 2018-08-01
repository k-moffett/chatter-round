const connection = require('../config/db/connection')

const userModel = {

    signUp() {
        connection.connect();
 
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        });
 
        connection.end();
    }

};

module.exports = userModel;