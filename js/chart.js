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
			pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
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

jQuery(function ($) {
    $('.panel-heading span.clickable').on("click", function (e) {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel
            $(this).parents('.panel').find('.panel-body').slideDown();
            $(this).removeClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
        else {
            // collapse the panel
            $(this).parents('.panel').find('.panel-body').slideUp();
            $(this).addClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
    });
});
