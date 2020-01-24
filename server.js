// var express = require("express");
// var app = express();
// app.use(express.static(__dirname + '/dist'))
// app.get('/',function(req , res){
// 	res.status(200).send('OK')
// })
// app.listen(4200,function(request , response){
	
// });
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/MuseUI'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/MuseUI/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);