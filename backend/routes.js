const userController = require('./controllers/userController')

module.exports = (app) => {

	app.get('/', (req, res) => {
        res.sendFile(path.join( __dirname, 'build'));
      });

    app.post('/signup', (req, res) => {
        let userInfo = req.body
        userController.userSignUp(userInfo, /*sessid*/)
        .then((response) => {
            console.log('/signup RESPONSE: ', response)
            if (response.emailExists === false) {
                res.cookie('sessid', response.sessid)
            }   else if (response.emailExists === true) {
                res.send(response)
            }
        })
        .catch((error) => {console.log(error)});
    });
      
};