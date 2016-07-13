var mongoose = require('mongoose');
var Entry = require('./mongooseModel.js');

module.exports = function(app) {

    app.get('/entry', function(req, res){
        var query = Entry.find({});
        query.exec(function(err, entry){
            if(err) {
                res.send(err);
            } else {
                res.json(entry);
            }
        });
    });

    app.post('/entry', function(req, res){

        var newEntry = new Entry(req.body);
        newEntry.save(function(err){
            if(err)
                res.send(err);
            else
                res.json(req.body);
        });
    });

    app.post('/query/', function(req, res){

        var pokemon = req.body.pokemon;
        var query = Entry.find({});

        query = query.where('pokemon').equals(pokemon);

        query.exec(function(err, entry){
            if(err)
                res.send(err);
            else 
                res.json(entry);
        });
    });

};
