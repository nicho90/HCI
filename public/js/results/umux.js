/* SUS Score-Calculation
 *
 * implemented by Nicho 07.11.2015
 */
 $( document ).ready(function() {
    $.get( "result/umux", function( data ) {

        console.log(data);

        if(data.length != 0) {

            // START SCORE CALCULATION
            for(var i=0; i<data.length; i++) {

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
                    '</tr>'
                );
            }
        } else {
            console.log("No umux-data available.");
        }


        // MEAN
        var mean_1 = 0;
        var mean_2 = 0;
        var mean_3 = 0;
        var mean_4 = 0;
        for(var i=0; i<data.length; i++) {
            mean_1 = mean_1 + data[i].question_1;
            mean_2 = mean_2 + data[i].question_2;
            mean_3 = mean_3 + data[i].question_3;
            mean_4 = mean_4 + data[i].question_4;
        }
        mean_1 = mean_1/data.length;
        mean_2 = mean_2/data.length;
        mean_3 = mean_3/data.length;
        mean_4 = mean_4/data.length;

        // VARIANZ
        var s_1 = 0;
        var s_2 = 0;
        var s_3 = 0;
        var s_4 = 0;
        for(var i=0; i<data.length; i++) {
            s_1 = s_1 + Math.pow((data[i].question_1-mean_1),2);
            s_2 = s_2 + Math.pow((data[i].question_2-mean_2),2);
            s_3 = s_3 + Math.pow((data[i].question_3-mean_3),2);
            s_4 = s_4 + Math.pow((data[i].question_4-mean_4),2);
        }
        s_1 = s_1/data.length;
        s_2 = s_2/data.length;
        s_3 = s_3/data.length;
        s_4 = s_4/data.length;
        s_1 = Math.sqrt(s_1);
        s_2 = Math.sqrt(s_2);
        s_3 = Math.sqrt(s_3);
        s_4 = Math.sqrt(s_4);


        $("#results tbody").append(
            '<tr><th>MEAN</th>' +
            '<th>' + mean_1 + '</th>' +
            '<th>' + mean_2 + '</th>' +
            '<th>' + mean_3 + '</th>' +
            '<th>' + mean_4 + '</th></tr>'
        );
        $("#results tbody").append(
            '<tr><th>STD</th>' +
            '<th>' + s_1 + '</th>' +
            '<th>' + s_2 + '</th>' +
            '<th>' + s_3 + '</th>' +
            '<th>' + s_4 + '</th></tr>'
        );

    });
 });
