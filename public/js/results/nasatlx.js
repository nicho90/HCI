/* TLX-Calculation
 *
 * implemented by Nicho 07.11.2015
 */
 $( document ).ready(function() {
    $.get( "result/nasatlx", function( data ) {

        if(data.length != 0) {

            var finalScores = [];

            // START SCORE CALCULATION
            for(var i=0; i<data.length; i++) {

                // Highlighting of own row with calculated score
                var highlight = '';
                if(document.cookie.substr(7, 21) === data[i].userId) {
                    highlight = ' class="info"';
                }

                $("#results tbody").append(
                    '<tr' + highlight +'><th>' + (i+1) + '</th>' +
                    '<td>' + data[i].mentalDemand + '</td>' +
                    '<td>' + data[i].physicalDemand + '</td>' +
                    '<td>' + data[i].temporalDemand + '</td>' +
                    '<td>' + data[i].performance + '</td>' +
                    '<td>' + data[i].effort + '</td>' +
                    '<td>' + data[i].frustration + '</td></tr>'
                );
            }
        } else {
            console.log("No nasatlx-data available.");
        }


        // MEAN SCORE
        var mean_1 = 0;
        var mean_2 = 0;
        var mean_3 = 0;
        var mean_4 = 0;
        var mean_5 = 0;
        var mean_6 = 0;
        for(var i=0; i<data.length; i++) {
            mean_1 = mean_1 + data[i].mentalDemand;
            mean_2 = mean_2 + data[i].physicalDemand;
            mean_3 = mean_3 + data[i].temporalDemand;
            mean_4 = mean_4 + data[i].performance;
            mean_5 = mean_5 + data[i].effort;
            mean_6 = mean_6 + data[i].frustration;
        }
        mean_1 = mean_1/data.length;
        mean_2 = mean_2/data.length;
        mean_3 = mean_3/data.length;
        mean_4 = mean_4/data.length;
        mean_5 = mean_5/data.length;
        mean_6 = mean_6/data.length;

        // VARIANZ
        var s_1 = 0;
        var s_2 = 0;
        var s_3 = 0;
        var s_4 = 0;
        var s_5 = 0;
        var s_6 = 0;

        for(var i=0; i<data.length; i++) {
            s_1 = s_1 + Math.pow((data[i].mentalDemand-mean_1),2);
            s_2 = s_2 + Math.pow((data[i].physicalDemand-mean_2),2);
            s_3 = s_3 + Math.pow((data[i].temporalDemand-mean_3),2);
            s_4 = s_4 + Math.pow((data[i].performance-mean_4),2);
            s_5 = s_5 + Math.pow((data[i].effort-mean_5),2);
            s_6 = s_6 + Math.pow((data[i].frustration-mean_6),2);
        }
        
        s_1 = s_1/data.length;
        s_2 = s_2/data.length;
        s_3 = s_3/data.length;
        s_4 = s_4/data.length;
        s_5 = s_5/data.length;
        s_6 = s_6/data.length;

        s_1 = Math.sqrt(s_1);
        s_2 = Math.sqrt(s_2);
        s_3 = Math.sqrt(s_3);
        s_4 = Math.sqrt(s_4);
        s_5 = Math.sqrt(s_5);
        s_6 = Math.sqrt(s_6);

        // MIN-MAX
        //var max = Math.max.apply(null, finalScores);
        //var min = Math.min.apply(null, finalScores);

        $("#results tbody").append(
            '<tr><th>MEAN</th>' +
            '<td>' + mean_1 + '</td>' +
            '<td>' + mean_2 + '</td>' +
            '<td>' + mean_3 + '</td>' +
            '<td>' + mean_4 + '</td>' +
            '<td>' + mean_5 + '</td>' +
            '<td>' + mean_6 + '</td></tr>'
        );

        $("#results tbody").append(
            '<tr><th>STD</th>' +
            '<td>' + s_1 + '</td>' +
            '<td>' + s_2 + '</td>' +
            '<td>' + s_3 + '</td>' +
            '<td>' + s_4 + '</td>' +
            '<td>' + s_5 + '</td>' +
            '<td>' + s_6 + '</td></tr>'
        );

        /*$("#results tbody").append(
            '<tr><th>MIN</th>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<th>' + min + '</th></tr>'
        );

        $("#results tbody").append(
            '<tr><th>MAX</th>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<th>' + max + '</th></tr>'
        );*/
    });
 });
