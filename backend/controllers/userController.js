const userModel = require('../models/userModel')

const userController = {

    userSignUp(userInfo) {
        console.log(userInfo, 'USERCONTROLLER')
        userModel.signUp()
    },

    userLogin() {

    },

};

module.exports = userController;