'use strict';
/* eslint-env browser */
import Highcharts from 'highcharts';
import sampleData from './sample-data.json';

var Flex = {};

Flex.demoText = sampleData.data;

/* Array of semester data (starting with LATEST semester)
 * Keys in object:
 *   year: year plus 0.1 if spring, 0.2 if fall
 *   name: human-readable name: [Spring|Fall] <year>
 *   start: unix time of the start of the semester
 *   end: unix time of the end of the semester
 */
Flex.semesters = [
	{
		year: 2018.2,
		name: 'Fall 2018',
		start: 1534482000000, // Date.parse('2018-8-17')
		end: 1544918400000 // Date.parse('2018-12-16')
	},
	{
		year: 2018.1,
		name: 'Spring 2018',
		start: 1515888000000, // Date.parse('2018-01-14')
		end: 1526169600000 // Date.parse('2018-05-13')
	}
];
// Flex.NOW = Date.parse('2018-04-01');//1523577600000;
Flex.NOW = Date.now();

Flex.semesters.forEach(function (semester) {
	// If we're already past the start of the semester
	if (Flex.NOW > semester.start) {
		Flex.semester = semester;
		Flex.IN_SEMESTER = (Flex.NOW < semester.end);
	}
});

/**
 * @private
 * @param {number} amount - the currency amount, as a float
 * @returns {string} the amount, formatted with a dollar sign and rounded to two decimal places
 */
Flex.formatCurrency = function (amount) {
	if (typeof amount !== 'number') return '';

	return '$' + amount.toFixed(2);
};

/**
 * Function to add two numbers that avoids floating-point errors like .1 + .2 !== .3
 * @private
 * @param {number} x
 * @param {number} y
 * @returns {number} x + y, with two digits of precision
 */
Flex.addCurrency = function (x, y) {
	return Math.round((x + y) * 100) / 100;
};


/**
 * @param {array} data - array of points of the format [timestamp, amount]
 */
Flex.makeChart = function (data) {
	var series = [
		{
			name: 'Ideal usage',
			color: 'red',
			lineWidth: 1,
			enableMouseTracking: false,
			data: [
				[Flex.semester.start, Flex.START_AMOUNT],
				[Flex.semester.end, 0]
			]
		},
		{
			name: 'Actual balance',
			color: 'steelblue',
			step: 'left',
			data: data
		}
	];

	// If we're in the middle of the semester, add a dashed line with projected usage
	if (Flex.IN_SEMESTER) {
		series.push({
			name: 'Projected balance',
			color: 'steelblue',
			dashStyle: 'shortdash',
			enableMouseTracking: false,
			data: [
				[Flex.NOW, Flex.amountRemaining],
				[Flex.semester.end, 0]
			]
		});
	}

	return Highcharts.chart('chart', {
		chart: {
			type: 'line'
		},
		title: {
			text: Flex.semester.name + ' Flex Point Usage'
		},
		xAxis: {
			crosshair: {
				snap: false
			},
			type: 'datetime'
		},
		yAxis: {
			crosshair: {
				snap: false
			},
			title: {
				text: 'Flex Points'
			},
			labels: {
				format: '${value}'
			}
		},
		plotOptions: {
			line: {
				marker: {
					enabled: false
				}
			}
		},
		series: series,
		tooltip: {
			valueDecimals: 2,
			valuePrefix: '$'
		}
	});
};

/**
 * @param {object} obj - object containing the following floats:
 * pastPerDay, pastPerWeek, futurePerDay, futurePerWeek
 */
Flex.addRates = function (obj) {
	for (var id in obj) {
		var $el = document.getElementById(id);
		var amount = obj[id];

		// sanity check: make sure element exists and amount is a number
		if ($el && typeof amount === 'number') {
			$el.textContent = Flex.formatCurrency(amount);
		}
	}

	var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var now = new Date(Flex.NOW);
	var dateString = MONTHS[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

	document.getElementById('results-header').textContent = 'Results: ' + Flex.formatCurrency(Flex.amountRemaining) + ' remaining as of ' + dateString;
};

Flex.loadDemoData = function (evt) {
	evt.preventDefault();

	// DEBUG
	// Flex.demoText = Flex.demoText.filter(function (entry) {
	// 	return entry[0] < Flex.NOW;
	// });

	Flex.START_AMOUNT = Flex.demoText[0][1];
	Flex.amountRemaining = Flex.demoText[Flex.demoText.length - 1][1];
	Flex.processData(Flex.demoText);
};

Flex.calculateRates = function () {
	var MS_PER_DAY = 1000 * 60 * 60 * 24;
	var DAYS_PER_WEEK = 7;
	var returnObj;

	if (Flex.IN_SEMESTER) {
		var msElapsed = Flex.NOW - Flex.semester.start;
		var daysElapsed = msElapsed / MS_PER_DAY;
		var weeksElapsed = daysElapsed / DAYS_PER_WEEK;

		var msRemaining = Flex.semester.end - Flex.NOW;
		var daysRemaining = msRemaining / MS_PER_DAY;
		var weeksRemaining = daysRemaining / DAYS_PER_WEEK;

		returnObj = {
			pastPerDay: Flex.AMOUNT_SPENT / daysElapsed,
			pastPerWeek: Flex.AMOUNT_SPENT / weeksElapsed,
			futurePerDay: Flex.amountRemaining / daysRemaining,
			futurePerWeek: Flex.amountRemaining / weeksRemaining
		};
	} else {
		var msSemester = Flex.semester.end - Flex.semester.start;
		var daysSemester = msSemester / MS_PER_DAY;
		var weeksSemester = daysSemester / DAYS_PER_WEEK;

		returnObj = {
			pastPerDay: Flex.START_AMOUNT / daysSemester,
			pastPerWeek: Flex.START_AMOUNT / weeksSemester
		};
	}

	return returnObj;
};

/**
 * @param {number[][]} dataArr
 */
Flex.processData = function (dataArr) {
	Flex.AMOUNT_SPENT = Flex.START_AMOUNT - Flex.amountRemaining;

	var latestDate = dataArr[dataArr.length - 1][0];

	for(var i = 0; i < Flex.semesters.length; i++) {
		var semester = Flex.semesters[i];
		if (latestDate > semester.start) {
			Flex.semester = semester;
			Flex.IN_SEMESTER = (Flex.amountRemaining !== 0);
			break;
		}
	}

	var ratesObj = Flex.calculateRates();
	Flex.addRates(ratesObj);

	Flex.makeChart(dataArr);
};

// How we parse:
// Iterate through the table data (which is in reverse chronological order)
// Prepend each flex point change to the beginning of the data list, assuming for now that it ends at zero.
// Stop iterating when we reach a row that is the addition of the full balance (i.e., the semester start).
// If this is never reached (i.e., some data is missing), ask them for their current balance and attempt to
// display the data that way.
Flex.parseRawData = function (rawData) {
	var data = rawData.split('\n').map(function (row) {
		return row.split('\t');
	});

	Flex.amountRemaining = Flex.START_AMOUNT;
	var flexData = [];
	var previousChange = 0;
	var reachedBeginning = false;

	for(var i = 0; i < data.length; i++) {
		var row = data[i];

		if (row.length >= 4 && row[0] === 'Flex Points') {
			var dateString = row[1]
				.replace(/\s/g, ' ')
				.replace(/\B[AP]M/, ' $&'); // Add space before AM or PM so Date.parse understands it.
			var date = Date.parse(dateString);

			var minusMatch = row[3].match(/[-\u2013]/); // look for a minus sign (hyphen or en-dash)
			var spentMatch = row[3].match(/[\d.]+/);
			var amountChange = spentMatch ? +spentMatch[0] : null;

			if (
				!isNaN(date) &&
				amountChange !== null
				// && date < Flex.NOW // debug
			) {
				// account for positive/negative changes
				if (minusMatch && minusMatch.index < spentMatch.index) {
					amountChange = -amountChange;
				}

				var firstAmount = flexData[0] ? Flex.addCurrency(flexData[0][1], -previousChange) : 0;
				previousChange = amountChange;

				flexData.unshift([date, firstAmount]);

				if (amountChange === Flex.START_AMOUNT) {
					reachedBeginning = true;
					break;
				}
			}
		}
	}

	if (reachedBeginning && flexData[0][1] !== Flex.START_AMOUNT) {
		var adjustmentAmount = Flex.START_AMOUNT - flexData[0][1];

		flexData = flexData.map(function (original) {
			original[1] = Flex.addCurrency(original[1], adjustmentAmount);
			return original;
		});
	}

	Flex.amountRemaining = flexData[flexData.length - 1][1];

	if (Flex.amountRemaining !== 0) {
		flexData.push([Flex.NOW, Flex.amountRemaining]);
	}

	Flex.processData(flexData);
};

//// Event Listeners ////

document.addEventListener('DOMContentLoaded', Flex.loadDemoData);

document.getElementById('demo-link').addEventListener('click', Flex.loadDemoData);

document.forms['raw-data-form'].addEventListener('submit', function (event) {
	event.preventDefault();

	Flex.formData = {};

	for(var field of document.forms['raw-data-form'].elements) {
		Flex.formData[field.id] = field.value;
	}

	Flex.START_AMOUNT = +Flex.formData['starting-balance'];
	Flex.parseRawData(Flex.formData['raw-data']);
});