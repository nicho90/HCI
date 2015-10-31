/**
 * Created by Andre on 30.10.2015.
 */
var mongoose = require('mongoose');

// define the schema for our user model
var diarySchema = mongoose.Schema({
    date  :  { type: Date, default: Date.now },
    userId: String,
    device: String,
    reason: String
});

// create the model for measurements and expose it to our app
module.exports = mongoose.model('Diary', diarySchema);