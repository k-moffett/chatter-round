const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo) {
        return userModel.signUp(userInfo, sessid)
    },

    userLogin() {

    },

};

module.exports = userController;