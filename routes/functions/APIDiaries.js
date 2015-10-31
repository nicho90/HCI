/**
 * Created by Andre on 30.10.2015.
 */
var mongoose = require('mongoose');
var Diarie = require('../../config/models/diaries');

function Diaries() {
    this.createEntry = function(callback, input) {
        var entry = new Diarie({
            userId: input.userId,
            device: input.device,
            reason: input.reason
        })
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
        Diarie.find({},function(err, result){
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
    return new Diaries();
};
