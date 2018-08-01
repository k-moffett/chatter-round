const crypto = require('crypto');
const userController = require('./controllers/userController')

const nonce = () => {
        let text = '';
        let selection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    for (i=0; i<20; i++) {
                text += selection.charAt(Math.floor(Math.random()*selection.length));
            };
        return text;
    }

module.exports = (app) => {

	app.get('/', (req, res) => {
        res.cookie('sessid' , crypto.createHash('sha256').update(`${nonce()+Date.now()}`).digest('hex')).sendFile(path.join( __dirname, 'build'));
      });

    app.post('/signup', (req, res) => {
        console.log(req.body);
        userController.userSignUp(req.body)
    });
      
};