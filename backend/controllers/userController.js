const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo) {
        console.log(userInfo, 'USERCONTROLLER')
        return userModel.signUp(userInfo)
    },

    userLogin() {

    },

};

module.exports = userController;