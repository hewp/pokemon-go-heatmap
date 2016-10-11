var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/entries');

app.use(express.static(__dirname + '/client'));                 
app.use('/bower_components',  express.static(__dirname + '/bower_components')); 
app.use(morgan('dev'));                                         
app.use(bodyParser.json());                                                            

require('./app/routes.js')(app);

app.listen(port);
console.log('App listening on port ' + port);

//__dirname = path to what is execued in this case its ..../pokemon-go-heatmap