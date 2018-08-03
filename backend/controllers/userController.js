const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo, sessid) {
        return userModel.doesEmailExist(userInfo, sessid)
    },

    userLogin(userInfo, sessid) {
        return userModel.validatePassword(userInfo, sessid)
    },

};

module.exports = userController;