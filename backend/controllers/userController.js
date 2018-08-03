const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo) {
        return userModel.doesEmailExist(userInfo)
    },

    userLogin() {

    },

};

module.exports = userController;