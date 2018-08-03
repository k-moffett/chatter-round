const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo, /*sessid*/) {
        return userModel.doesEmailExist(userInfo, /*sessid*/)
    },

    userLogin() {

    },

};

module.exports = userController;