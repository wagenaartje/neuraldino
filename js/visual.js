var chart;

function generateChart() {
	chart = Highcharts.chart('chart', {
		chart: {
			type: 'area'
		},
		title: {
			text: 'Activation values'
		},
		xAxis: {
			allowDecimals: false,
			labels: {
				enabled: false
			},
			lineWidth: 0,
			lineColor: 'transparent',
			minorTickLength: 0,
			tickLength: 0,
			minorGridLineWidth: 0,
		},
		yAxis: {

			labels: {
				formatter: function() {
					return this.value;
				}
			},
			title: null,
		},
		tooltip: {
			pointFormat: 'Activation value of {point.y: ,.f}'
		},
		plotOptions: {
			area: {
				pointStart: 0,
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series: [{
			showInLegend: false,
			name: ' ',
			data: [0.5, 0.6, 0.9, .1, .2, .1, 0.9],
			color: '#428bca',
			animation: false
		}],
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false
		}
	});

}

function updateButtons(){
	if(zeros + ones > 0){
		$('.teach').attr('class', 'btn btn-default teach');
	}
}

function addPointToChart(point){
	var shift = chart.series[0].data.length > 100;
	chart.series[0].addPoint(point, true, shift, false);
}

function updateProgressBar(){
  var total = zeros + ones;
  $('.zeros').css('width', zeros/total * 100 + '%');
  $('.ones').css('width', ones/total * 100 + '%');
	$(".setsize").text(trainingset.length);
}

function log(text){
  $('.log').append(" > ", text, "<br>");
  $('.log').animate({ scrollTop: $('.log').prop("scrollHeight")}, 10);
}
