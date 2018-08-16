const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo, sessid) {
        return userModel.doesEmailExist(userInfo, sessid)
    },

    userLogin(userInfo, sessid) {
        return userModel.doesLoginEmailExist(userInfo, sessid)
    },

    validateAccount(sessid) {
        return userModel.validateAccount(sessid)
    },

    getUser(sessid) {
        return userModel.getUser(sessid)
    },

    logout(sessid) {
        return userModel.logout(sessid)
    }

};

module.exports = userController;