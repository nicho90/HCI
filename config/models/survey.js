/**
 * Created by Andre on 02.11.2015.
 */
var mongoose = require('mongoose');

// define the schema for our user model
var surveySchema = mongoose.Schema({
    date  :  { type: Date, default: Date.now },
    userId: String,
    question_1: Number,
    question_2: Number,
    question_3: Number,
    question_4: Number,
    question_5: Number
});

// create the model for measurements and expose it to our app
module.exports = mongoose.model('survey', surveySchema);