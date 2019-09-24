'use strict';
/* eslint-env browser, node */

import Vue from 'vue';
import Highcharts from 'highcharts';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
	faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
	faArrowLeft, faArrowRight, faRedo, faTimes, faBars, faUser, faCommentAlt, faChevronUp,
	faCalendarAlt, faCalendarDay, faCalendarWeek,
} from '@fortawesome/free-solid-svg-icons';

import CardComponent from '../components/Card.vue';
import ChartComponent from '../components/Chart.vue';
import CollapsibleComponent from '../components/Collapsible.vue';
import DateAdjustComponent from '../components/DateAdjust.vue';
import InputComponent from '../components/Input.vue';
import MessageComponent from '../components/Message.vue';
import StatsListComponent from '../components/StatsList.vue';

import * as filters from './filters';
import * as utils from './utils';
import { parseData } from './parse';
import sampleData from '../assets/sample-data.json';

library.add(
	faGithub,
	faArrowLeft, faArrowRight, faRedo, faTimes, faBars, faUser, faCommentAlt, faChevronUp,
	faCalendarAlt, faCalendarDay, faCalendarWeek,
);
dom.watch();

Vue.config.productionTip = false;
Vue.component('app-card', CardComponent);
Vue.component('app-chart', ChartComponent);
Vue.component('app-collapsible', CollapsibleComponent);
Vue.component('app-date-adjust', DateAdjustComponent);
Vue.component('app-input', InputComponent);
Vue.component('app-message', MessageComponent);
Vue.component('app-stats-list', StatsListComponent);

Vue.filter('currency', filters.formatCurrency);
Vue.filter('currencySafe', filters.formatCurrencySafe);
Vue.filter('date', filters.formatDate);

new Vue({
	el: '#flexible',

	data: {
		chartData: null,
		collapseInstructions: false,
		currentIdealBalanceIndex: null,
		debugNow: null,
		loaderShow: true,
		manualDates: {
			start: {},
			end: {},
		},
		now: Date.now(),
		platformGuess: 'windows',
		/** @type {'quick' | 'parse' | 'demo'} */
		processedView: 'quick',
		rawData: '',
		rawDataComplete: true,
		rawDataError: false,
		remainingBalance: 150,
		showMessages: {
			rawDataComplete: false,
		},
		startBalance: 500,
		tabOption: null, // currently selected tab
		tabOptions: {
			macos: 'macOS',
			mobile: 'Mobile',
			windows: 'Windows',
		},
	},

	computed: {
		chartProps () {
			return {
				chartData: this.chartData,
				now: this.now,
				processedView: this.processedView,
				rawDataComplete: this.rawDataComplete,
				remainingBalance: this.remainingBalance,
				remainingBalanceIdeal: this.remainingBalanceIdeal,
				semester: this.semester,
				startBalance: this.startBalance,
			};
		},
		/**
		 * @returns {string} A representation of the command or control key,
		 * depending on whether the macOS tab is selected or not
		 */
		ctrlOrCmd () {
			return (this.tabOption === 'macos') ? '\u2318 Cmd' : 'Ctrl';
		},
		inSemester () {
			return (this.now > this.semester.start - utils.softSemesterLimit);
		},
		inSemesterCurrent () {
			return (this.getNow() > this.semesterCurrent.start - utils.softSemesterLimit);
		},
		quickData () {
			return utils.interpolateLine(
				Math.min(this.semester.start, this.now),
				this.now,
				this.startBalance,
				this.remainingBalance,
			);
		},
		rates () {
			return {
				past: utils.getRates(
					this.semester && Math.min(this.now, this.semester.end) - this.semester.start,
					this.spentBalance,
				),
				future: utils.getRates(
					this.semester && this.semester.end - Math.max(this.now, this.semester.start),
					this.remainingBalanceSafe,
				),
			};
		},
		remainingBalanceIdeal () {
			return this.getIdealBalanceAtDate(this.now);
		},
		remainingBalanceIdealCurrent () {
			return this.getIdealBalanceAtDate(this.getNow(), this.semesterCurrent);
		},
		remainingBalanceRelative () {
			return this.remainingBalanceSafe - this.remainingBalanceIdeal;
		},
		/**
		 * If `remainingBalance` is null (unset), fall back to `remainingBalanceIdeal`
		 */
		remainingBalanceSafe () {
			return this.remainingBalance == null ? this.remainingBalanceIdeal : this.remainingBalance;
		},
		semester () {
			return utils.findSemester(this.now, this.manualDates);
		},
		semesterCurrent () {
			return utils.findSemester(this.getNow(), this.manualDates);
		},
		spentBalance () {
			return utils.addCurrency(
				this.startBalance,
				-this.remainingBalanceSafe
			);
		},
	},


	watch: {
		rawData (rawData) {
			if (rawData) {
				// quick sanity check
				if (rawData.indexOf('Flex Points') === -1) {
					this.rawDataError = true;
				} else {
					this.parseRawData(rawData);
				}

				this.rawData = null;
			}
		},

		// startBalance () {
		// 	this.makeChart();
		// },
	},

	mounted () {
		// max-width of the two primary `section` elements, plus padding
		const MIN_TWO_COLUMN_SIZE = 2 * (300 + 32 * 2);
		// https://stackoverflow.com/a/8876069/3902568
		const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (viewportWidth < MIN_TWO_COLUMN_SIZE) {
			this.collapseInstructions = true;
		}

		// Basic user agent sniffing to determine which tab to show initially.
		// It's not perfect, but it's just a convenience.
		const userAgent = window.navigator.userAgent;
		if (/iPhone|iPad|iPod|Android/.test(userAgent)) {
			this.platformGuess = 'mobile';
		} else if (userAgent.indexOf('Mac') !== -1) {
			this.platformGuess = 'macos';
		}
		// else stays as 'windows'
		this.tabOption = this.platformGuess;

		// Allow overriding the current date/time by URL hash. No public interface
		// since it could break things.
		const nowDate = window.location.hash.match(/^#now=(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2})?$/);
		if (nowDate !== null) {
			const [, date, time] = nowDate;
			const now = new Date(`${date}${time || 'T00:00:00'}`); // force local timezone
			this.debugNow = now.getTime();
			this.now = this.debugNow;

			// eslint-disable-next-line no-console
			console.log('Setting debug date to', now);
		}

		this.loaderShow = false;

		this.makeChart();
	},

	methods: {
		/**
		 * Adjusts `chartData` so its last balance value is `remainingBalance`
		 * @param {number} remainingBalance
		 * @returns {void}
		 */
		adjustIncompleteData (remainingBalance) {
			remainingBalance = Number(remainingBalance);

			if (
				this.processedView === 'parse'
				&& !this.rawDataComplete
				&& !isNaN(remainingBalance)
			) {
				this.showMessages.rawDataComplete = false;
				this.remainingBalance = remainingBalance;
				this.chartData = utils.adjustBalances(
					this.chartData,
					remainingBalance - this.chartData[this.chartData.length - 1][1]
				);
				this.makeChart();
			}
		},

		/**
		 * Modifies the semester start or end date by adding or subtracting days
		 * @param {number} deltaDay - how many days to add (can be negative)
		 * @param {'start' | 'end'} startOrEnd - whether the start or end date should be changed
		 */
		changeSemesterDate (deltaDay, startOrEnd) {
			const datesObj = this.manualDates[startOrEnd];
			if (datesObj[this.semester.id] === undefined || deltaDay === 0) {
				this.$set(
					datesObj,
					this.semester.id,
					deltaDay
				);
			} else {
				datesObj[this.semester.id] += deltaDay;
			}

			this.makeChart();
		},

		getIdealBalanceAtDate (date, semester = this.semester) {
			return utils.interpolatePoint(date, semester.start, semester.end, this.startBalance, 0);
		},

		getNow () {
			return this.debugNow || Date.now();
		},

		/**
		 * @returns {Highcharts.ChartObject}
		 */
		makeChart () {
			const actualData = this.processedView === 'quick' ? this.quickData : this.chartData;

			const estimatedData = (this.processedView === 'parse' && !this.rawDataComplete)
				? utils.interpolateLine(
					this.semester.start,
					actualData[0][0],
					this.startBalance,
					actualData[0][1],
				)
				: [];

			const projectedData = utils.interpolateLine(
				this.now,
				Math.max(this.semester.end, this.now),
				this.remainingBalance,
				0
			);

			const idealBalanceData = actualData
				? [...estimatedData, ...actualData, ...projectedData].map(function ([date]) {
					return [
						date,
						this.getIdealBalanceAtDate(date),
					];
				}, this)
				: utils.interpolateLine(
					this.semester.start,
					this.semester.end,
					this.startBalance,
					0,
				);

			let currentIdealBalanceIndex = idealBalanceData.findIndex(function ([date]) {
				return date >= this.now;
			}, this);

			if (currentIdealBalanceIndex === -1) {
				currentIdealBalanceIndex = idealBalanceData.length;
			}

			idealBalanceData.splice(currentIdealBalanceIndex, 0, {
				x: this.now,
				y: this.remainingBalanceIdeal,
				marker: {
					enabled: true,
				},
			});

			const series = [
				{
					name: 'Ideal balance',
					colorIndex: 1,
					data: idealBalanceData,
					id: 'ideal',
				},
			];

			if (actualData) {
				series.push({
					name: 'Estimated balance',
					colorIndex: 0,
					className: 'line-dash',
					data: estimatedData,
					id: 'estimated',
					linkedTo: 'actual',
				}, {
					name: 'Actual balance',
					colorIndex: 0,
					step: (this.processedView !== 'quick') ? 'left' : null,
					data: actualData,
					id: 'actual',
				}, {
					name: 'Projected balance',
					colorIndex: 0,
					className: 'line-dash',
					data: projectedData,
					id: 'projected',
					linkedTo: ':previous',
				});
			}

			return Highcharts.chart('chart', {
				chart: {
					type: 'line',
					styledMode: true,
					spacingLeft: 0,
					spacingRight: 0,
					events: {
						load: this.processedView !== 'demo'
							? function () {
								const pointIdeal = this.get('ideal').data[currentIdealBalanceIndex];
								const pointActual = this.get('actual')
									&& this.get('actual').data[currentIdealBalanceIndex];

								this.tooltip.refresh(
									pointActual ? [pointIdeal, pointActual] : [pointIdeal]
								);
							}
							: undefined,
					},
				},
				plotOptions: {
					line: {
						marker: {
							enabled: false,
						},
					},
				},
				series,
				time: {
					useUTC: false,
				},
				title: {
					// Easter egg :)
					text: this.remainingBalance === 246.01 ? 'My name is Jean Valjean' : undefined,
				},
				tooltip: {
					split: true,
					valueDecimals: 2,
					valuePrefix: '$',
					xDateFormat: '%a, %B %e, %Y, %l:%M %p',
				},
				xAxis: {
					crosshair: {
						snap: false,
					},
					labels: {
						format: '{value:%b %e}',
					},
					type: 'datetime',
				},
				yAxis: {
					crosshair: {
						snap: false,
					},
					max: this.startBalance,
					title: {
						text: 'Flex Points',
					},
					labels: {
						format: '${value}',
					},
				},
			});
		},

		parseRawData (rawData) {
			this.now = this.getNow(); // in case the page has been loaded for a long time

			const {
				parsedRawData,
				rawDataComplete,
				rawDataCompleteEnd,
				newStartBalance,
			} = parseData(rawData, this.startBalance);
			this.chartData = parsedRawData;
			this.rawDataComplete = rawDataComplete;

			// Check for invalid data supplied
			if (this.chartData.length === 0) {
				this.rawDataError = true;
				return;
			}

			this.scrollToResults();
			this.rawDataError = false;

			if (newStartBalance !== undefined) {
				this.startBalance = newStartBalance;
			}

			if (!rawDataCompleteEnd) {
				// If the data goes all the way back to the beginning, we know the current
				// balance, so we adjust the remaining balance from 0
				if (this.rawDataComplete) {
					this.chartData = utils.adjustBalances(
						this.chartData,
						this.startBalance - this.chartData[0][1],
					);
				} else {
					this.showMessages.rawDataComplete = true;
				}
			}

			let lastDate;
			[lastDate, this.remainingBalance] = this.chartData[this.chartData.length - 1];

			const dataSemester = utils.findSemester(lastDate, this.manualDates);
			// If the data was from a different (previous) semester, update `now` to match this semester.
			if (dataSemester.id !== this.semester.id) {
				this.now = lastDate;
			} else {
				// `else` because we don't need a duplicate point if `this.now` is already `lastDate`.
				this.chartData.push([this.now, this.remainingBalance]);
			}

			this.processedView = 'parse';
			this.makeChart();
		},

		scrollToResults () {
			this.$nextTick(function () {
				document.getElementById('results').scrollIntoView();
			});
		},

		useDemo () {
			this.scrollToResults();

			this.rawDataComplete = true;
			this.chartData = sampleData;
			this.startBalance = sampleData[0][1];
			[this.now, this.remainingBalance] = sampleData[sampleData.length - 1];

			this.processedView = 'demo';
			this.makeChart();
		},

		useQuick (quickBalance) {
			this.scrollToResults();
			this.now = this.getNow();
			this.rawDataComplete = true;

			this.remainingBalance = quickBalance;
			this.processedView = 'quick';
			this.makeChart();
		},
	},
});

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./service-worker.js').catch(error => {
			// eslint-disable-next-line no-console
			console.log('Unable to register service worker:', error);
		});
	});
}
