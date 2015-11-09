/**
 * Created by Andre on 01.11.2015.
 */
var NASATLX = require('../../config/models/nasatlx');

function Nasatlx() {
    this.createEntry = function(callback, input) {
        console.log(input);

        var entry = new NASATLX({
            userId: input.userId,
            mentalDemand: input.mentalDemand,
            physicalDemand: input.physicalDemand,
            temporalDemand: input.temporalDemand,
            performance: input.performance,
            effort: input.effort,
            frustration: input.frustration
        });
        if (input.date != undefined) {
            entry.date = input.date;
        }
        entry.save(function(err) {
            if(err) {
                callback({success:false})
            }
            else {
                callback({success:true})
            }
        });

    };

    this.getEntries = function(callback){
        NASATLX.find({},function(err, result){
            if (err) {
                callback({success: false, message: 'error in finding document'});
            }
            else {
                callback(result);
            }
        }).select('-__v -_id');
    }

    this.getEntryByID = function(callback, id) {
        NASATLX.find({'userId':id},function(err, result){
            if (err) {
                callback({success: false, message: 'error in finding document'})
            }
            else {
                callback({success: true, result: result})
            }
        }).select('-__v -_id')
    }
}
module.exports = function() {
    return new Nasatlx();
};
