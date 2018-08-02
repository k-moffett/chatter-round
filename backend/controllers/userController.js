const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo, sessid) {
        return userModel.createUser(userInfo, sessid)
    },

    userLogin() {

    },

};

module.exports = userController;