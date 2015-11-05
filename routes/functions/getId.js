/**
 * Created by Andre on 05.11.2015.
 */
var Diarie = require('../../config/models/diaries');
var thisIsATest;
function Id() {
    this.getID = function(callback) {
        thisIsATest = callback;
        var id = Math.floor(Math.random() * 100000) + 1;
        queryForID(id, function(result) {
            if (result) {
                thisIsATest({success: true, result: id})
            }
        })

    };
    function queryForID(id, callback){
        Diarie.find({_id: id},function(err, result){
            if (err) {
                callback(true);
            }
            else {
                if (result.length > 0 ) {
                    var newId = Math.floor(Math.random() * 100000) + 1;
                    queryForID(newId, function(result) {
                        if (result) {
                            thisIsATest({success: true, result: newId})
                        }
                    });

                }
                else {
                    callback(true);
                }
            }
        }).select('-__v -_id')
    }

}
module.exports = function() {
    return new Id();
};
