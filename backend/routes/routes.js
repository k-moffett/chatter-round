const cookie = require('./cookie')

module.exports = (app) => {

	app.get('/', (req, res) => {
        res.cookie('sessid' , cookie).send('Cookie set');
        //res.sendFile(path.join( __dirname, 'build'));
        //res.send('Hello World!')
      });
      
}