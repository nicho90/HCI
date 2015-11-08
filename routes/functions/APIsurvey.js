/**
 * Created by Andre on 02.11.2015.
 */
/**
 * Created by Andre on 02.11.2015.
 */
var SURVEY = require('../../config/models/survey');

function Survey() {
    this.createEntry = function(callback, input) {
        var entry = new SURVEY();
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
                callback({success:false})
            }
            else {
                callback({success:true})
            }
        });

    };

    this.getEntries = function(callback){
        SURVEY.find({},function(err, result){
            if (err) {
                callback({success: false, message: 'error in finding document'})
            }
            else {
                var options = createHighChartsOptionsGender(result);
                callback({success: true, result: result, options: options})
            }
        }).select('-__v -_id')
    };
    this.getEntryByID = function(callback, id) {
        SURVEY.find({'userId':id},function(err, result){
            if (err) {
                callback({success: false, message: 'error in finding document'})
            }
            else {
                callback({success: true, result: result})
            }
        }).select('-__v -_id')
    }

}
function createHighChartsOptionsGender(result) {
    var options = {
        question_1:{
            chart: {
                type: 'column'
            },
            xAxis: {
                categories: ['Totally', '', '', '', 'Totally not']
            },
            title: {
                text: 'Satisfaction on topic - compared to gender'
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total count of satisfaction opinions'
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Male',
                data: [0,0,0,0,0],
                stack: 'Male'
            }, {
                name: 'Female',
                data: [0,0,0,0,0],
                stack: 'Female'
            }]
        },
        question_2:{},
        question_3:{chart: {
            type: 'column'
        },
            xAxis: {
                categories: ['Yes','No']
            },
            title: {
                text: 'Appropriate opinion to room - compared to gender'
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total count'
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Male',
                data: [0,0],
                stack: 'Male'
            }, {
                name: 'Female',
                data: [0,0],
                stack: 'Female'
            }]}
    };
    options.question_2 = JSON.parse(JSON.stringify(options.question_1));
    options.question_2.title.text = 'Started to work - compared to gender';
    options.question_2.yAxis.title.text = 'Total Count';
    options.question_5 = JSON.parse(JSON.stringify(options.question_1));
    options.question_5.title.text = 'Feeling for preparation - compared to gender';
    options.question_5.yAxis.title.text = 'Total Count';
    options.question_4 = JSON.parse(JSON.stringify(options.question_3));
    options.question_4.title.text = 'Done with work for the presentation - compared to gender';
    options.question_4.yAxis.title.text = 'Total Count';
    options.question_6 = JSON.parse(JSON.stringify(options.question_3));
    options.question_6.title.text = 'Awareness of presenter - compared to gender';
    options.question_6.yAxis.title.text = 'Total Count';
    options.question_7 = JSON.parse(JSON.stringify(options.question_3));
    options.question_7.title.text = 'Awareness of HDMI-Cable - compared to gender';
    options.question_7.yAxis.title.text = 'Total Count';
    console.log(options.question_6.title.text )

    for (var i = 0; i < result.length; i++) {
        var index = result[i].question_1 -1;
        if (result[i].gender === 'Male') {
            options.question_1.series[0].data[index] += 1;
            options.question_2.series[0].data[index] += 1;
            options.question_3.series[0].data[index] += 1;
            options.question_4.series[0].data[index] += 1;
            options.question_5.series[0].data[index] += 1;
            options.question_6.series[0].data[index] += 1;
            options.question_7.series[0].data[index] += 1;
        }
        else {
            options.question_1.series[1].data[index] += 1;
            options.question_2.series[1].data[index] += 1;
            options.question_3.series[1].data[index] += 1;
            options.question_4.series[1].data[index] += 1;
            options.question_5.series[1].data[index] += 1;
            options.question_6.series[1].data[index] += 1;
            options.question_7.series[1].data[index] += 1;
        }
    }
    return options;
}
module.exports = function() {
    return new Survey();
};
