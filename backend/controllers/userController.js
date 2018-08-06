const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo, sessid) {
        return userModel.doesEmailExist(userInfo, sessid)
    },

    userLogin(userInfo, sessid) {
        return userModel.doesLoginEmailExist(userInfo, sessid)
    },

    validateAccount() {
        
    }

};

module.exports = userController;