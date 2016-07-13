var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrSchema = new Schema({
    username: {type: String, required: true},
    location: {type: [Number], required: true},
    pokemon: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Entry', EntrSchema);