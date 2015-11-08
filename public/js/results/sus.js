/* SUS Score-Calculation
 *
 * implemented by Nicho 07.11.2015
 */
 $( document ).ready(function() {
    $.get( "result/sus", function( data ) {
        if(data.length != 0) {

            var finalScores = [];

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
                var finalScore = sum*2.5;

                data[i].score = finalScore;
                finalScores.push(finalScore);

                // Highlighting of own row with calculated score
                var highlight = '';
                if(document.cookie.substr(7, 21) === data[i].userId) {
                    highlight = ' class="info"';
                }

                $("#results tbody").append(
                    '<tr' + highlight +'><th>' + (i+1) + '</th>' +
                    '<td>' + data[i].question_1 + '</td>' +
                    '<td>' + data[i].question_2 + '</td>' +
                    '<td>' + data[i].question_3 + '</td>' +
                    '<td>' + data[i].question_4 + '</td>' +
                    '<td>' + data[i].question_5 + '</td>' +
                    '<td>' + data[i].question_6 + '</td>' +
                    '<td>' + data[i].question_7 + '</td>' +
                    '<td>' + data[i].question_8 + '</td>' +
                    '<td>' + data[i].question_9 + '</td>' +
                    '<td>' + data[i].question_10 + '</td>' +
                    '<th>' + data[i].score + '</th></tr>'
                );
            }
        } else {
            console.log("No sus-data available.");
        }

        // MEAN SCORE
        var meanScore = 0;
        for(var i=0; i<data.length; i++) {
            meanScore = meanScore + data[i].score;
        }
        meanScore = meanScore/data.length;

        // VARIANZ
        var s = 0;
        for(var i=0; i<data.length; i++) {
            s = s + Math.pow((data[i].score-meanScore),2);
        }
        s = s/data.length;
        s = Math.sqrt(s);

        // MIN-MAX
        var max = Math.max.apply(null, finalScores);
        var min = Math.min.apply(null, finalScores);

        $("#results tbody").append(
            '<tr><th>MEAN</th>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<th></th>' +
            '<th>' + meanScore + '</th></tr>'
        );

        $("#results tbody").append(
            '<tr><th>STD</th>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<th></th>' +
            '<th>' + s + '</th></tr>'
        );

        $("#results tbody").append(
            '<tr><th>MIN</th>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<th></th>' +
            '<th>' + min + '</th></tr>'
        );

        $("#results tbody").append(
            '<tr><th>MAX</th>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<th></th>' +
            '<th>' + max + '</th></tr>'
        );
    });
 });
