/**
 * Created by Andre on 08.11.2015.
 */


function init() {
    loadSurvey2();
}

init();
function loadSurvey1(options){
    $(function () {
        $('#resultSurvey').highcharts({
            chart: options.chart,
            title: options.title,
            xAxis: options.xAxis,
            yAxis: options.yAxis,
            plotOptions: options.plotOptions,
            series: options.series
        });
    });
}