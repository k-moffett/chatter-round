const connection = require('../config/db/connection');
connection.connect();

const userModel = {

    doesEmailExist(userInfo, sessid) {

        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM users WHERE email = ${connection.escape(userInfo.email)}`, function (error, results, fields) {
                if (error) throw error && reject(error);
                if (results[0] === undefined) {
                    resolve(userModel.doesUserNameExist(userInfo, sessid));
                } else {
                    resolve('emailExists');
                }
            });

        });

    },

    doesUserNameExist(userInfo, sessid) {

        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM users WHERE username = ${connection.escape(userInfo.userName)}`, function (error, results, fields) {
                if (error) throw error && reject(error);
                if (results[0] === undefined) {
                    resolve(userModel.createUser(userInfo, sessid));
                } else {
                    resolve('usernameExists');
                }
            });

        })

    },

    createUser(userInfo, sessid) {

        return new Promise((resolve, reject) => {

            connection.query(`INSERT INTO users (username, email, dateOfBirth, password, sessid) VALUES (${connection.escape(userInfo.userName)}, ${connection.escape(userInfo.email)}, ${connection.escape(userInfo.dateOfBirth)}, ${connection.escape(userInfo.password)}, ${connection.escape(sessid)});`, function (error, results, fields) {
                if (error) throw error && reject(error);
                resolve('accountCreated')
            });

        })

    },

    validatePassword(userInfo, sessid) {

        return new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM users WHERE email=${connection.escape(userInfo.email)};`, function (error, results, fields) {
                if (error) throw error && reject(error);
                if (results[0].password === userInfo.password){
                    resolve(userModel.loginUser(userInfo, sessid));
                } else {
                    resolve('incorrectPassword')
                }

            });

        });

    },

    loginUser(userInfo, sessid) {

        return new Promise((resolve, reject) => {

            connection.query(`UPDATE users SET sessid=${connection.escape(sessid)} WHERE email=${connection.escape(userInfo.email)};`, function (error, results, fields) {
                if (error) throw error && reject(error);
                resolve('loginSuccessful')
            });

        })

    },

};

module.exports = userModel;