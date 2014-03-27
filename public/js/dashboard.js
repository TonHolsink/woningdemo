(/**
 * @fileOverview Dashboard Demo
 * @author Ton Holsink
 *
 */
function() {
	/**
	 * @memberOf anonymous
	 */
	var periodBtns = ["Week", "Maand", "Jaar"];
	/**
	 * @memberOf anonymous
	 */
	var graphData = [
		{
			title: "Reparaties",
			periods: [0,1,2],
			period: 2,
			divid: "graph0",
			typ: "lijn",
			data: [
					{
						name: "Verwarming",
						points: [
							[12, 10, 15, 6, 9, 13, 15],
							[3, 67, 55, 68, 54, 42, 26, 25, 56, 48, 63, 42, 38, 44, 34],
							[112, 109, 155, 256, 201, 101, 98, 117, 178, 167, 150, 122]
						]
					},
					{
						name: "Electra",
						points: [
							[4, 5, 12, 23, 18, 14, 11],
							[5, 6, 12, 8, 14, 24, 36, 27, 16, 21, 36, 55, 48, 32, 24],
							[167, 109, 105, 143, 201, 172, 178, 219, 198, 155, 103, 78]
						]
					}
				]
		}
	];

	/**
	 * @memberOf anonymous
	 */
	// var console = {
	// 	log: function() {}
	// };

	/**
	 * @memberOf anonymous
	 */
	function updateDashboard() {
		var date = new Date();
		console.log(date + "");

		$(".graph").each(function() {
			$(this).empty();
		});

		//Anders verversen de grafieken niet met de timer
		if (typeof google.visualization == "undefined") {
			google.setOnLoadCallback(fetchGraphs);
		} else {
			fetchGraphs();
		};

	};

	/**
	 * @memberOf anonymous
	 */
	function fetchGraphs() {
		$.each(graphData, function(i, g) {
			showGraph(g);
		});
	};

	/**
	 * @memberOf anonymous
	 */
	function showGraph(graph) {
		var today = new Date();
		var factor = (graph.period == 2) ? 30 : (graph.period == 1) ? 2 : 1;

		var d = new google.visualization.DataTable();
		d.addColumn('date', "Datum");
		$.each(graph.data, function(i, data) {
			d.addColumn('number', data.name);
		});

		for (var i = 0; i < graph.data[0].points[graph.period].length; i++) {
			var x = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i * factor);
			var a = [x];
			$.each(graph.data, function(j, data) {
				a.push(data.points[graph.period][i]);
			});
			d.addRow(a);
		};

		var options = {
			title: graph.title,
			hAxis: {format: (graph.period == 2) ? "MMM-yyyy" : "dd-MM"}
		};

		var chart = new google.visualization.LineChart(document.getElementById(graph.divid));
		chart.draw(d, options);

	};

	function showGraphWorking(graph, nr) {
		var today = new Date();
		var d = new google.visualization.DataTable();
		d.addColumn('date', "Datum");
		$.each(graph.data, function(i, data) {
			d.addColumn('number', data.name);
			$.each(data.points[graph.period], function(ofs, value) {
				d.addRow([new Date(today.getFullYear(), today.getMonth(), today.getDate() - ofs), value]);
			});
		});

		var options = {
			title: 'Company Performance',
			hAxis: {format: "dd-MM"}
		};

		var chart = new google.visualization.LineChart(document.getElementById('graph0'));
		chart.draw(d, options);

	};

	/**
	 * @memberOf anonymous
	 */
	function constructToolbar(i) {
		var periods = graphData[i].periods;
		var tbar = $("#toolbarMagTop");
		tbar.empty();
		if ((periods) && (periods.length > 1)) {
			$.each(periods, function(i, p) {
				tbar.append("<button data-period=" + p + " class='periodBtn'>" + periodBtns[p] + "</button>");
			});
		}
	};

	$(function() {

		updateDashboard();
		//window.setInterval(updateDashboard, 10000);
	});

})();
