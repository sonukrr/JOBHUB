var express = require("express");
var app = express();
app.use(express.static(__dirname + '/dist/MuseUI'))
app.get('/',function(req , res){
    res.sendFile(path.join(__dirname+'/dist/MuseUI/index.html'));
    res.status(200).send('OK')
})

app.listen(process.env.PORT || 8080);
// Start the app by listening on the default Heroku port
