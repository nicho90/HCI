/**
 * Created by Nicho on 07.11.2015.
 */
var SUS = require('../../config/models/sus');

function Sus() {
    this.createEntry = function(callback, input) {
        var entry = new SUS();
        if (input.date != undefined) {
            entry.date = input.date;
        }
        for (var attribute in input) {
            if (attribute != 'date') {
                entry[attribute] = input[attribute];
            }
        }
        entry.save(function(err) {
            if(err) {
                callback({success:false});
            }
            else {
                callback({success:true});
            }
        });
    };

    this.getEntries = function(callback){
        SUS.find({},function(err, result){
            if (err) {
                callback({success: false, message: 'error in finding document'});
            }
            else {
                callback(result);
            }
        }).select('-__v -_id')
    }

}
module.exports = function() {
    return new Sus();
};
