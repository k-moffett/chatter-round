const cookie = require('./cookie')
const crypto = require('crypto')

const nonce = () => {
        let text = ''
        let selection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	    for (i=0; i<20; i++) {
                text += selection.charAt(Math.floor(Math.random()*selection.length))
            }
        return text
    }

module.exports = (app) => {

	app.get('/', (req, res) => {
        res.cookie('sessid' , crypto.createHash('sha256').update(`${nonce()+Date.now()}`).digest('hex')).send('Cookie set');
        //res.sendFile(path.join( __dirname, 'build'));
        //res.send('Hello World!')
      });
      
}