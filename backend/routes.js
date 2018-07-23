
module.exports = (app) => {

	app.get('/', (req, res) => {
        //res.sendFile(path.join( __dirname, 'build'));
        res.send('Hello World!')
      });
      
}