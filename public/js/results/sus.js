/* SUS Score-Calculation
 *
 * implemented by Nicho 07.11.2015
 */
 $( document ).ready(function() {
    $.get( "http://hci-research.uni-muenster.de/api/sus", function( data ) {
        console.log(data);

        if(data.length != 0) {

            // START SCORE CALCULATION
            for(var i=0; i<data.length; i++) {

                var array = [];
                array.push(data[i].question_1-1);
                array.push(5-data[i].question_2);
                array.push(data[i].question_3-1);
                array.push(5-data[i].question_4);
                array.push(data[i].question_5-1);
                array.push(5-data[i].question_6);
                array.push(data[i].question_7-1);
                array.push(5-data[i].question_8);
                array.push(data[i].question_9-1);
                array.push(5-data[i].question_10);

                var sum = array[0]+array[1]+array[2]+array[3]+array[4]+array[5]+array[6]+array[7]+array[8]+array[9];
                var finalScore = sum*2.5; array[0]+

                data[i].score = finalScore;
            }

            $("#results tbody").append(
                '<tr><td>' + i + '</td><td>' + data[i].score + '</td></tr>'
            );
        } else {
            console.log("No sus-data available.");
        }
    });
 });
