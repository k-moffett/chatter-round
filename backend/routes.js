const userController = require('./controllers/userController')

module.exports = (app) => {

	app.get('/', (req, res) => {
        res.sendFile(path.join( __dirname, 'build'));
      });

    app.post('/signup', (req, res) => {
        let userInfo = req.body
        userController.userSignUp(userInfo, /*sessid*/)
        .then((response) => {
            if (response.sessid === undefined) {
                res.send(response.emailExists)
            } else {
                console.log(response.sessid)
            res.cookie('sessid', response.sessid.toString())
            }
        })
        .catch((error) => {console.log(error)});
    });
      
};