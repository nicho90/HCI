/**
 * Created by Andre on 02.11.2015.
 */
/**
 * Created by Andre on 02.11.2015.
 */
var SURVEY = require('../../config/models/survey');

function Survey() {
    this.createEntry = function(callback, input) {
        var entry = new SURVEY({
            userId: input.userId
        });
        if (input.date != undefined) {
            entry.date = input.date;
        }
        for (var attribute in input) {
            if (attribute != 'userId' && attribute != 'data') {
                entry[attribute] = input[attribute];
            }
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
        UMUX.find({},function(err, result){
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
    return new Survey();
};
