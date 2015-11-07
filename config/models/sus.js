/**
 * Created by Nicho on 07.11.2015.
 */
var mongoose = require('mongoose');

// define the schema for our user model
var susSchema = mongoose.Schema({
    date  :  { type: Date, default: Date.now },
    userId: String,
    question_1: Number,
    question_2: Number,
    question_3: Number,
    question_4: Number,
    question_5: Number,
    question_6: Number,
    question_7: Number,
    question_8: Number,
    question_9: Number,
    question_10: Number
});

// create the model for measurements and expose it to our app
module.exports = mongoose.model('SUS', susSchema);
