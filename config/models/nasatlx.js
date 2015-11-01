/**
 * Created by Andre on 01.11.2015.
 */
var mongoose = require('mongoose');

// define the schema for our user model
var nasatlxSchema = mongoose.Schema({
    date  :  { type: Date, default: Date.now },
    userId: String,
    metalDemand: Number,
    physicalDemand: Number,
    temporalDemand: Number,
    performance: Number,
    effort: Number,
    frustration: Number
});

// create the model for measurements and expose it to our app
module.exports = mongoose.model('NASATLX', nasatlxSchema);