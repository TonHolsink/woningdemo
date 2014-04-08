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
							[48, 67, 55, 68, 54, 42, 36, 35, 46, 48, 53, 42, 38, 44, 40],
							[112, 109, 155, 256, 201, 101, 98, 117, 178, 167, 150, 122]
						]
					},
					{
						name: "Electra",
						points: [
							[4, 5, 12, 13, 15, 17, 19],
							[15, 16, 12, 8, 14, 24, 26, 27, 22, 20, 31, 45, 48, 34, 24],
							[167, 109, 105, 143, 201, 172, 178, 219, 198, 155, 103, 78]
						]
					}
				]
		},
		{
			title: "Logins",
			periods: [0,1,2],
			period: 2,
			divid: "graph1",
			typ: "lijn",
			data: [
					{
						name: "Logins met ww",
						points: [
							[308, 304, 295, 274, 266, 275, 282],
							[595, 587, 575, 568, 574, 552, 566, 555, 546, 548, 553, 542, 538, 544, 534],
							[2542, 2435, 2620, 2544, 2214, 2334, 2336, 2435, 2320, 2422, 2215, 2005]
						]
					},
					{
						name: "Unieke bezoekers",
						points: [
							[288, 274, 265, 254, 236, 255, 262],
							[562, 555, 520, 544, 514, 534, 536, 535, 520, 522, 515, 505, 508, 524, 511],
							[2262, 2255, 2120, 2044, 1914, 2034, 2136, 2235, 2120, 2022, 1915, 1805]
						]
					}
				]
		},
		{
			title: "Verhuurde woningen",
			periods: [0,1,2],
			period: 1,
			divid: "graph2",
			typ: "lijn",
			data: [
					{
						name: "Type A",
						points: [
							[1308, 1204, 1295, 1474, 1566, 1275, 1282],
							[2595, 2787, 2575, 2368, 2174, 2152, 2266, 2255, 2346, 2648, 2453, 2442, 2338, 2444, 2534],
							[5542, 5435, 5620, 5544, 5214, 5334, 5336, 5435, 5320, 5422, 5215, 5005]
						]
					},
					{
						name: "Type B",
						points: [
							[1088, 974, 1065, 1254, 1136, 1055, 1062],
							[2062, 2255, 2120, 1944, 2014, 2034, 2036, 2035, 2020, 2022, 2015, 2005, 2008, 2024, 2011],
							[4262, 4255, 4120, 4044, 4914, 4034, 4136, 4235, 4120, 4022, 4915, 4805]
						]
					},
					{
						name: "Type C",
						points: [
							[488, 574, 465, 654, 536, 455, 462],
							[1362, 1355, 1320, 1344, 1314, 1334, 1336, 1335, 1320, 1322, 1315, 1305, 1308, 1324, 1311],
							[2262, 2255, 2120, 2044, 1914, 2034, 2136, 2235, 2120, 2022, 1915, 1805]
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
		var title = graph.title + " - " + periodBtns[graph.period];
		var divid = graph.divid;

		//Zet de titel
		$("#" + divid).parent("div").find(".graphTitle").text(title);

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
			title: title,
			chartArea: {left: 40, top: 10, height: 140},
			vAxis: {viewWindow: {min: 0}},
			hAxis: {format: (graph.period == 2) ? "MMM-yyyy" : "dd-MM"},
			legend: {} //Moet bestaan!
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

	/**
	 * Initializes the charts
	 * @memberOf anonymous
	 */
	function initCharts() {
		//Update het dashboard de eerste keer
		updateDashboard();
		//Zet een timer voor het updaten
		window.setInterval(updateDashboard, 10000);
	}

	$(function() {
		//BODY CLICK EVENTS
		$("body").click(function(event) {
			var el = $(event.target);

			//GRAFIEKEN VERGROOT ICOON
			if (el.hasClass("magnify")) {

			}
		});

		google.setOnLoadCallback(initCharts);
	});

})();
