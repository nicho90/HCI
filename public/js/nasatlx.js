/**
 * Created by Andre on 06.11.2015.
 */
// Create a set of parallel arrays for each of the scales
var scale      = new Array();
var left       = new Array();
var right      = new Array();
var def        = new Array();
var NUM_SCALES = 6;

scale[0]  = "Mental Demand";
left[0]   = "Low";
right[0]  = "High";
def[0]    = "How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc)? Was the task easy or demanding, simple or complex, exacting or forgiving?";

scale[1]  = "Physical Demand";
left[1]   = "Low";
right[1]  = "High";
def[1]    = "How much physical activity was required (e.g. pushing, pulling, turning, controlling, activating, etc)? Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?";

scale[2]  = "Temporal Demand";
left[2]   = "Low";
right[2]  = "High";
def[2]    = "How much time pressure did you feel due to the rate of pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?";

scale[3]  = "Performance";
left[3]   = "Good";
right[3]  = "Poor";
def[3]    = "How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)? How satisfied were you with your performance in accomplishing these goals?";

scale[4]  = "Effort";
left[4]   = "Low";
right[4]  = "High";
def[4]    = "How hard did you have to work (mentally and physically) to accomplish your level of performance?";

scale[5]  = "Frustration";
left[5]   = "Low";
right[5]  = "High";
def[5]    = "How insecure, discouraged, irritated, stressed and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?";

// Pairs of factors in order in the original instructions, numbers
// refer to the index in the scale, left, right, def arrays.
var pair  = new Array();
pair[0]   = "4 3";
pair[1]   = "2 5";
pair[2]   = "2 4";
pair[3]   = "1 5";
pair[4]   = "3 5";
pair[5]   = "1 2";
pair[6]   = "1 3";
pair[7]   = "2 0";
pair[8]   = "5 4";
pair[9]   = "3 0";
pair[10]  = "3 2";
pair[11]  = "0 4";
pair[12]  = "0 1";
pair[13]  = "4 1";
pair[14]  = "5 0";

// Variable where the results end up
var results_rating = new Array();
var results_tally  = new Array();


for (var i = 0; i < NUM_SCALES; i++)
    results_tally[i] = 0;

// Used to randomize the pairings presented to the user
function randOrd()
{
    return (Math.round(Math.random())-0.5);
}

// Make sure things are good and mixed
for (i = 0; i < 100; i++)
{
    pair.sort(randOrd);
}

// They click on a scale entry
function scaleClick(index, val)
{
    results_rating[index] = val;

    // Turn background color to white for all cells
    for (i = 5; i <= 100; i += 5)
    {
        var top = "t_" + index + "_" + i;
        var bottom = "b_" + index + "_" + i;
        document.getElementById(top).bgColor='#FFFFFF';
        document.getElementById(bottom).bgColor='#FFFFFF';
    }

    var top = "t_" + index + "_" + val;
    var bottom = "b_" + index + "_" + val;
    document.getElementById(top).bgColor='#AAAAAA';
    document.getElementById(bottom).bgColor='#AAAAAA';
}
function createURL(valueArray) {
    var urlString = ''
    urlString += '?mentalDemand=' + valueArray[0];
    urlString += '&physicalDemand=' + valueArray[1];
    urlString += '&temporalDemand=' + valueArray[2];
    urlString += '&performance=' + valueArray[3];
    urlString += '&effort=' + valueArray[4];
    urlString += '&frustration=' +valueArray[5];
    return urlString
}
// Users want to proceed after doing the scales
function buttonPart1()
{
    // Check to be sure they click on every scale
    for (var i = 0; i < NUM_SCALES; i++)
    {
        if (!results_rating[i])
        {
            alert('A value must be selected for every scale!');
            return false;
        }
    }

    console.log("api/nasatlx" + createURL(results_rating));

    $.post( "api/nasatlx" + createURL(results_rating), function( data ) {
        location.href='/results-nasatlx.html';
    });

    /*var urlString = ;
    executeRequest(urlString, function() {

    });*/
    return true;
}
/*function executeRequest(urlString, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/nasatlx"+urlString, false);
    xhttp.send();
    callback();
}*/
