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
                var genderOptions = createHighChartsOptionsGender(result);
                var programOptions = createHighChartsOptionsProgram(result);
                var options={
                    gender: genderOptions,
                    program: programOptions
                }
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
    options.borrow={
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: ['Presenter','Dog','HDMI-Cable','GPS-Device']
        },
        title: {
            text: 'What items can you borrow?'
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
            data: [0,0,0,0],
            stack: 'Male'
        }, {
            name: 'Female',
            data: [0,0,0,0],
            stack: 'Female'
        }]
    }

    for (var i = 0; i < result.length; i++) {
        if (result[i].gender === 'Male') {
            options.question_1.series[0].data[result[i].question_1 -1] += 1;
            options.question_2.series[0].data[result[i].question_2 -1] += 1;
            options.question_3.series[0].data[result[i].question_3 -1] += 1;
            options.question_4.series[0].data[result[i].question_4 -1] += 1;
            options.question_5.series[0].data[result[i].question_5 -1] += 1;
            options.question_6.series[0].data[result[i].question_6 -1] += 1;
            options.question_7.series[0].data[result[i].question_7 -1] += 1;
            options.borrow.series[0].data[0] += getValueForFalseOrTrue(result[i].firstCB);
            options.borrow.series[0].data[1] += getValueForFalseOrTrue(result[i].secondCB);
            options.borrow.series[0].data[2] += getValueForFalseOrTrue(result[i].thirdCB);
            options.borrow.series[0].data[3] += getValueForFalseOrTrue(result[i].fourthCB);
        }
        else {
            options.question_1.series[1].data[result[i].question_1 -1] += 1;
            options.question_2.series[1].data[result[i].question_2 -1] += 1;
            options.question_3.series[1].data[result[i].question_3 -1] += 1;
            options.question_4.series[1].data[result[i].question_4 -1] += 1;
            options.question_5.series[1].data[result[i].question_5 -1] += 1;
            options.question_6.series[1].data[result[i].question_6 -1] += 1;
            options.question_7.series[1].data[result[i].question_7 -1] += 1;
            options.borrow.series[1].data[0] += getValueForFalseOrTrue(result[i].firstCB);
            options.borrow.series[1].data[1] += getValueForFalseOrTrue(result[i].secondCB);
            options.borrow.series[1].data[2] += getValueForFalseOrTrue(result[i].thirdCB);
            options.borrow.series[1].data[3] += getValueForFalseOrTrue(result[i].fourthCB);
        }
    }
    return options;
}
function getValueForFalseOrTrue(object){
    if (object) {
        return 1
    }
    else {
        return 0
    }
}
function createHighChartsOptionsProgram(result) {
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
                name: 'Bachelor',
                data: [0,0,0,0,0],
                stack: 'Bachelor'
            }, {
                name: 'Master',
                data: [0,0,0,0,0],
                stack: 'Master'
            }, {
                name: 'PhD',
                data: [0,0,0,0,0],
                stack: 'PhD'
            }, {
                name: 'Other',
                data: [0,0,0,0,0],
                stack: 'Other'
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
                name: 'Bachelor',
                data: [0,0],
                stack: 'Bachelor'
            }, {
                name: 'Master',
                data: [0,0],
                stack: 'Master'
            }, {
                name: 'PhD',
                data: [0,0],
                stack: 'PhD'
            }, {
                name: 'Other',
                data: [0,0],
                stack: 'Other'
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
    options.borrow={
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: ['Presenter','Dog','HDMI-Cable','GPS-Device']
        },
        title: {
            text: 'What items can you borrow?'
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
            name: 'Bachelor',
            data: [0,0,0,0],
            stack: 'Bachelor'
        }, {
            name: 'Master',
            data: [0,0,0,0],
            stack: 'Master'
        }, {
            name: 'PhD',
            data: [0,0,0,0],
            stack: 'PhD'
        }, {
            name: 'Other',
            data: [0,0,0,0],
            stack: 'Other'
        }]}


    for (var i = 0; i < result.length; i++) {
        console.log
        if (result[i].program === 'bachelor') {
            options.question_1.series[0].data[result[i].question_1 -1] += 1;
            options.question_2.series[0].data[result[i].question_2 -1] += 1;
            options.question_3.series[0].data[result[i].question_3 -1] += 1;
            options.question_4.series[0].data[result[i].question_4 -1] += 1;
            options.question_5.series[0].data[result[i].question_5 -1] += 1;
            options.question_6.series[0].data[result[i].question_6 -1] += 1;
            options.question_7.series[0].data[result[i].question_7 -1] += 1;
            options.borrow.series[0].data[0] += getValueForFalseOrTrue(result[i].firstCB);
            options.borrow.series[0].data[1] += getValueForFalseOrTrue(result[i].secondCB);
            options.borrow.series[0].data[2] += getValueForFalseOrTrue(result[i].thirdCB);
            options.borrow.series[0].data[3] += getValueForFalseOrTrue(result[i].fourthCB);
        }
        else if (result[i].program === 'master') {
            options.question_1.series[1].data[result[i].question_1 -1] += 1;
            options.question_2.series[1].data[result[i].question_2 -1] += 1;
            options.question_3.series[1].data[result[i].question_3 -1] += 1;
            options.question_4.series[1].data[result[i].question_4 -1] += 1;
            options.question_5.series[1].data[result[i].question_5 -1] += 1;
            options.question_6.series[1].data[result[i].question_6 -1] += 1;
            options.question_7.series[1].data[result[i].question_7 -1] += 1;
            options.borrow.series[1].data[0] += getValueForFalseOrTrue(result[i].firstCB);
            options.borrow.series[1].data[1] += getValueForFalseOrTrue(result[i].secondCB);
            options.borrow.series[1].data[2] += getValueForFalseOrTrue(result[i].thirdCB);
            options.borrow.series[1].data[3] += getValueForFalseOrTrue(result[i].fourthCB);
        }
        else if (result[i].program === 'phd') {
            options.question_1.series[2].data[result[i].question_1 -1] += 1;
            options.question_2.series[2].data[result[i].question_2 -1] += 1;
            options.question_3.series[2].data[result[i].question_3 -1] += 1;
            options.question_4.series[2].data[result[i].question_4 -1] += 1;
            options.question_5.series[2].data[result[i].question_5 -1] += 1;
            options.question_6.series[2].data[result[i].question_6 -1] += 1;
            options.question_7.series[2].data[result[i].question_7 -1] += 1;
            options.borrow.series[2].data[0] += getValueForFalseOrTrue(result[i].firstCB);
            options.borrow.series[2].data[1] += getValueForFalseOrTrue(result[i].secondCB);
            options.borrow.series[2].data[2] += getValueForFalseOrTrue(result[i].thirdCB);
            options.borrow.series[2].data[3] += getValueForFalseOrTrue(result[i].fourthCB);
        }
        else{
            options.question_1.series[3].data[result[i].question_1 -1] += 1;
            options.question_2.series[3].data[result[i].question_2 -1] += 1;
            options.question_3.series[3].data[result[i].question_3 -1] += 1;
            options.question_4.series[3].data[result[i].question_4 -1] += 1;
            options.question_5.series[3].data[result[i].question_5 -1] += 1;
            options.question_6.series[3].data[result[i].question_6 -1] += 1;
            options.question_7.series[3].data[result[i].question_7 -1] += 1;
            options.borrow.series[3].data[0] += getValueForFalseOrTrue(result[i].firstCB);
            options.borrow.series[3].data[1] += getValueForFalseOrTrue(result[i].secondCB);
            options.borrow.series[3].data[2] += getValueForFalseOrTrue(result[i].thirdCB);
            options.borrow.series[3].data[3] += getValueForFalseOrTrue(result[i].fourthCB);
        }
    }
    return options;
}
module.exports = function() {
    return new Survey();
};
