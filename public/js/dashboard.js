/**
 * @fileOverview Dashboard Demo
 * @author Ton Holsink
 *
 */
function () {
	/**
	 * @memberOf anonymous
	 */
	var periodBtns = ["Week", "Maand", "Jaar"];
	/**
	 * The graphs shown
	 * @memberOf anonymous
	 */
	var graphShown = [0, 1, 2];
	/**
	 * @memberOf anonymous
	 */
	var graphData = [
		{
			title: "Reparaties",
			periods: [0,1,2],
			period: 2,
			typ: "lijn",
			totals: false,
			yearTotals: false,
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
			typ: "vbar",
			totals: false,
			yearTotals: false,
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
			typ: "lijn",
			totals: false,
			yearTotals: false,
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
		fetchCharts();

	};

	/**
	 * Iterates over graphData, and calls fetchGraph for each record
	 * in order to display the graph.
	 * Displays the insight chart.
	 * @memberOf anonymous
	 */
	function fetchCharts() {
		console.log("graphShown: " + graphShown)
		for (var i = 0; i < graphShown.length; i++) {
			var graph = graphData[graphShown[i]];
			var divid = "graph" + i;
			fetchGraph(graph, graph.period, divid);
		};
	};

	/**
	 * Fetches an individual graph through an Ajax call
	 * If successful showGraph is called to display it
	 * @param {object} graph A graphData record
	 * @param {int} period The period
	 * @param {string} divid The css id of the container
	 * @memberOf anonymous
	 */
	function fetchGraph(graph, period, divid) {
		$("#" + divid).empty();
		showGraph(graph, period, divid);
	};

	/**
	 * @memberOf anonymous
	 */
	function showGraph(graph, period, divid) {
		var title = graph.title + " - " + periodBtns[period];
		// var divid = "graph" + dividx;

		//Zet de titel
		$("#" + divid).parent("div").find(".graphTitle").text(title);

		var today = new Date();
		var factor = (period == 2) ? 30 : (period == 1) ? 2 : 1;

		var d = new google.visualization.DataTable();
		d.addColumn('date', "Datum");
		$.each(graph.data, function(i, data) {
			d.addColumn('number', data.name);
		});

		for (var i = 0; i < graph.data[0].points[period].length; i++) {
			var x = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i * factor);
			var a = [x];
			$.each(graph.data, function(j, data) {
				a.push(data.points[period][i]);
			});
			d.addRow(a);
		};

		var options = {
			title: title,
			chartArea: {left: 40, top: 10, height: 140},
			vAxis: {viewWindow: {min: 0}},
			hAxis: {format: (period == 2) ? "MMM-yyyy" : "dd-MM"},
			legend: {} //Moet bestaan!
		};

		//Layout aanpassingen grote versie
		if (divid == "graphMag") {
			options.legend.position = "bottom";
			options.chartArea.left = "auto";
			options.chartArea.height = "auto";
		}

		//Bepaal het type grafiek
		var chart;
		if (graph.typ.toUpperCase() == "HBAR") {
			chart = new google.visualization.BarChart(document.getElementById(divid));
		} else if (graph.typ.toUpperCase() == "VBAR") {
			chart = new google.visualization.ColumnChart(document.getElementById(divid));
		} else if (graph.typ.toUpperCase() == "PIE") {
			chart = new google.visualization.PieChart(document.getElementById(divid));
		} else {
			chart = new google.visualization.LineChart(document.getElementById(divid));
		}
		chart.draw(d, options);

		//In de grote versie kunnen eventueel ook de jaartotalen en de totalen worden weergegeven
		if (divid == "graphMag") {
			// //Jaartotalen
			// if (graph.yearTotals) {
			// 	$("#tblMagYearTot").empty().append(json.yeartotals);
			// }
			var table = new google.visualization.Table(document.getElementById('tblMag'));
			var opts = {showRowNumber: true, width: "100%"};
			//Hack omdat anders het popup venster raar doet
			if (d.getNumberOfRows() > 10) {
				opts.height = "240px";
			}
			table.draw(d, opts);

			//Koppelen selectie tabel en grafiek
			google.visualization.events.addListener(table, 'select', function() {
				chart.setSelection(table.getSelection());
			});

			//Totalen
			// if (graph.totals) {
			// 	var dataTot = new google.visualization.DataTable(json.totals);
			// 	var tableTot = new google.visualization.Table(document.getElementById('tblMagTot'));
			// 	tableTot.draw(dataTot, {sort: "disable"});
			// }
		}

	};

	/**
	 * Initializes the graph selects and binds the change event
	 * to show the selected graph
	 * @memberOf anonymous
	 */
	function initGraphSelects() {
		$(".graphSelect").each(function(dividx, sel) {
			$.each(graphData, function(i, graph) {
				$(sel).append(new Option(graph.title, i));
			});

			$(sel).val(graphShown[dividx]);

			$(sel).change(function(event) {
				var i = this.selectedIndex;
				var graph = graphData[i];
				var divid = "graph" + dividx;
				//TODO: SHOW SPINNER??????????????????????????????
				fetchGraph(graph, graph.period, divid);
				graphShown[dividx] = i;
			});
		});
	};

	/**
	 * Utility function for the period tabbar
	 * @param {int} i The index of the graphData record
	 * @memberOf anonymous
	 */
	function constructTabbar(i) {
		var periods = graphData[i].periods;
		var tabs = $("#tabs");
		tabs.empty();
		if ((periods) && (periods.length > 1)) {
			$.each(periods, function(idx, p) {
				var klass = "";
				if (graphData[i].period == p) {
					klass = " class='active'";
				}
				tabs.append("<li data-period='" + p + "'" + klass + "><a href='javascript:' class='periodTab'>" + periodBtns[p] + "</a></li>");
			});
		}
	};

	/**
	 * Initializes the magnified popup
	 * @memberOf anonymous
	 */
	function initMagnify() {
		$("#tblMagYearTot").empty();
		$("#tblMag").empty();
		$("#tblMagTot").empty();
		$("#graphMag").empty();
	};

	/**
	 * Initializes the charts
	 * @memberOf anonymous
	 */
	function initCharts() {
		//Initialize the graph selects
		initGraphSelects();

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
				//Welk volgnummer heeft de graphdiv???
				var dividx = el.parents("div.graphDiv").attr("data-divID");
				//Welk graphData index hoort daar bij
				var idx = graphShown[dividx];
				//Index van graphObject in array
				var graph = graphData[idx];
				constructTabbar(idx);
				initMagnify();
				var graphMag = $("#graphMag").data("data", {"graphIdx": idx, "period": graph.period});
				$("#popupMag").bPopup({onClose: function() {
					if (graph.period != graphMag.data("data").period) {
						//synchroniseren graphId
						graph.period = graphMag.data("data").period;
						var divid = "graph" + dividx;
						fetchGraph(graph, graph.period, divid);

					};
				}});
				fetchGraph(graph, graph.period, "graphMag");
			//GRAFIEKEN POPUP PERIODE BUTTONS
			} else if (el.hasClass("periodTab")) {
				var li = $(el).parent();
				if (!li.hasClass('active')) {
					var period = li.attr("data-period");
					if (period) {
						$(".periodTab").each(function(idx, anchor) {
							$(anchor).parent().removeClass("active");
						});
						li.addClass("active");

						var graphMag = $("#graphMag");
						initMagnify();
						var idx = graphMag.data("data").graphIdx;
						var graph = graphData[idx];
						graphMag.data("data").period = period;
						fetchGraph(graph, period, "graphMag");
					}
				}
			}
		});

		google.setOnLoadCallback(initCharts);
	});

})();
