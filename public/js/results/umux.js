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
    });
 });
