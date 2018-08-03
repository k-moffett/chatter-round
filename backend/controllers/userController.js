const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo, sessid) {
        return userModel.doesEmailExist(userInfo, sessid)
    },

    userLogin(userinfo) {
        return userModel.loginUser(userinfo, sessid)
    },

};

module.exports = userController;