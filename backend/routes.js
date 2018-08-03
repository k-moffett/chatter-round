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
            res.cookie('sessid', response.sessid).send(response[0])
        })
        .catch((error) => {console.log(error)});
    });
      
};