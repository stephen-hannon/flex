!function(t){function e(e){for(var n,i,o=e[0],l=e[1],c=e[2],h=0,d=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);for(u&&u(e);d.length;)d.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={0:0},s=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;s.push([0,1]),a()}({0:function(t,e,a){a("e6Wu"),t.exports=a("WQPq")},"43pR":function(t,e,a){"use strict";var n=a("Nnty");a.n(n).a},G2hz:function(t,e,a){},Nnty:function(t,e,a){},SKxd:function(t,e,a){},WQPq:function(t,e,a){},YGuH:function(t,e,a){"use strict";var n=a("bnLI");a.n(n).a},b81r:function(t,e,a){"use strict";var n=a("SKxd");a.n(n).a},bnLI:function(t,e,a){},e6Wu:function(t,e,a){"use strict";a.r(e);var n=a("oCYn"),r=a("6n/F"),s=a.n(r),i=a("7O5W"),o=a("8tEE"),l=a("wHSu"),c=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card",class:{"card-wide":this.wide}},[e("div",{staticClass:"card-content"},[this._t("default")],2)])};c._withStripped=!0;var u={props:{wide:Boolean}},h=(a("nMAr"),a("KHd+")),d=Object(h.a)(u,c,[],!1,null,"54cdc180",null);d.options.__file="src/components/Card.vue";var f=d.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"collapsible-container",class:{"collapsible-collapsed":t.collapsed}},[a("button",{staticClass:"collapsible-header",attrs:{title:"Click to "+(t.collapsed?"expand":"collapse")+" section"},on:{click:function(e){return t.$emit("toggle",!t.collapsed)}}},[t._v("\n\t\t"+t._s(t.header)+"\n\t\t"),t._m(0)]),t._v(" "),a("transition",{attrs:{name:"slide"}},[t.collapsed?t._e():a("div",{staticClass:"collapsible-content"},[t._t("default")],2)])],1)};p._withStripped=!0;var m={model:{prop:"collapsed",event:"toggle"},props:{collapsed:Boolean,header:String}},v=(a("43pR"),Object(h.a)(m,p,[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"collapsible-header-icon"},[e("i",{staticClass:"fas fa-chevron-up"})])}],!1,null,"02f7cdec",null));v.options.__file="src/components/Collapsible.vue";var w=v.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[t._v("\n\t$ "),a("input",t._b({directives:[{name:"model",rawName:"v-model.lazy.number",value:t._value,expression:"_value",modifiers:{lazy:!0,number:!0}}],staticClass:"appearance-textfield hide-steppers",attrs:{type:"number",required:""},domProps:{value:t._value},on:{change:function(e){t._value=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}},"input",t.$attrs,!1))])};g._withStripped=!0;var b={inheritAttrs:!1,model:{prop:"value",event:"submit"},props:{value:{validator:function(t){return!isNaN(parseFloat(t))}}},data:function(){return{_value:null}},watch:{value:{immediate:!0,handler:function(t){this._value=t}}},methods:{onSubmit:function(t){var e=t.target;this.$emit("submit",this._value),this._value=null,e&&e[0]&&e[0].blur&&e[0].blur()}}},y=Object(h.a)(b,g,[],!1,null,null,null);y.options.__file="src/components/Input.vue";var D=y.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-message",class:t.type&&"form-"+t.type},[a("button",{staticClass:"float-right icon-button",attrs:{title:"Close message"},on:{click:function(e){return t.$emit("close")}}},[a("i",{staticClass:"fas fa-times",attrs:{title:"Close message"}})]),t._v(" "),t._t("default")],2)};_._withStripped=!0;var C={props:{type:String}},B=(a("b81r"),Object(h.a)(C,_,[],!1,null,"61d2d687",null));B.options.__file="src/components/Message.vue";var S=B.exports,x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"stats-list"},[a("li",[a("i",{staticClass:"fas fa-calendar-alt"}),t._v(" "),a("span",{staticClass:"stat"},[t._v(t._s(t._f("currencySafe")(t.rates.total)))]),t._v(" in total\n\t")]),t._v(" "),a("li",[a("i",{staticClass:"fas fa-calendar-day"}),t._v(" "),a("span",{staticClass:"stat"},[t._v(t._s(t._f("currencySafe")(t.rates.perDay)))]),t._v(" per day\n\t")]),t._v(" "),a("li",[a("i",{staticClass:"fas fa-calendar-week"}),t._v(" "),a("span",{staticClass:"stat"},[t._v(t._s(t._f("currencySafe")(t.rates.perWeek)))]),t._v(" per week\n\t")])])};x._withStripped=!0;var k={props:{rates:Object}},O=(a("YGuH"),Object(h.a)(k,x,[],!1,null,"ff5b7946",null));O.options.__file="src/components/StatsList.vue";var I=O.exports,M=a("Wgwc"),j=a.n(M),A=function(t){return"".concat(t<0?"−":"","$").concat(Math.abs(t).toFixed(2))};function N(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=[],n=!0,r=!1,s=void 0;try{for(var i,o=t[Symbol.iterator]();!(n=(i=o.next()).done)&&(a.push(i.value),!e||a.length!==e);n=!0);}catch(t){r=!0,s=t}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}return a}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var E=function(t,e){return Math.round(100*t+100*e)/100},P=function(t,e){return e?t.map(function(t){var a=N(t,2),n=a[0],r=a[1];return[n,E(r,e)]}):t},$=function(t,e){return j()("Spring"===e?new Date(t,0,15):new Date(t,7,25)).day(0)},T=function(t,e){return j()("Spring"===e?new Date(t,4,7):new Date(t,11,15)).day(6)},W=function(t){var e,a=j()(t),n=a.get("year"),r=T(n,"Fall"),s=T(n,"Spring");return r.add(12096e5,"ms").isBefore(a)?(n++,e="Spring"):e=s.add(12096e5,"ms").isBefore(a)?"Fall":"Spring",{year:n+("Spring"===e?.1:.2),name:"".concat(e," ").concat(n),start:$(n,e).valueOf(),end:T(n,e).valueOf()}},R=function(t,e){var a=t/864e5;return{total:e,perDay:t>0?e/a||0:null,perWeek:t>0?e/(a/7)||0:null}},V=function(t,e,a,n,r){var s=(t-e)/(a-e);return Math.max(0,Math.min(s,1))*(r-n)+n},F=function(t,e,a,n){return t!==e?function(t,e){var a=[],n=j()(t),r=n.startOf("day").add(1,"day");for(n.isSame(r)||(a.push(t),n=r);n.isBefore(e);)a.push(n.valueOf()),n=n.add(1,"day");return a.push(e),a}(t,e).map(function(r){return[r,V(r,t,e,a,n)]}):[[t,a],[e,n]]};function G(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=[],n=!0,r=!1,s=void 0;try{for(var i,o=t[Symbol.iterator]();!(n=(i=o.next()).done)&&(a.push(i.value),!e||a.length!==e);n=!0);}catch(t){r=!0,s=t}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}return a}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var q=function(t){var e=G(t.split("\t"),4),a=e[0],n=e[1],r=e[2],s=e[3];if(void 0===s||"Flex Points"!==a)return null;var i=n.replace(/\s/g," ").replace(/\B[AP]M/," $&"),o=Date.parse(i),l=s.match(/[\d.]+/);if(isNaN(o)||!l)return null;var c=s.match(/[-\u2013]/),u=+l[0];return c&&c.index<l.index&&(u=-u),{date:o,amountChange:u,details:r}},Y=a("kh7J");function L(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function J(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=[],n=!0,r=!1,s=void 0;try{for(var i,o=t[Symbol.iterator]();!(n=(i=o.next()).done)&&(a.push(i.value),!e||a.length!==e);n=!0);}catch(t){r=!0,s=t}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}return a}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}i.b.add(o.a,l.a,l.b,l.i,l.j,l.c,l.k,l.h,l.g,l.d,l.e,l.f),i.a.watch(),n.a.config.productionTip=!1,n.a.component("app-card",f),n.a.component("app-collapsible",w),n.a.component("app-input",D),n.a.component("app-message",S),n.a.component("app-stats-list",I),n.a.filter("currency",A),n.a.filter("currencySafe",function(t){return"number"!=typeof t||isNaN(t)?"$—":A(t)}),n.a.filter("date",function(t){return j()(t).format("ddd, MMMM D, YYYY")}),new n.a({el:"#flexible",data:{chartData:null,collapseInstructions:!1,currentIdealBalanceIndex:null,debugNow:null,loaderShow:!0,manualDates:{start:null,end:null},now:Date.now(),platformGuess:"windows",processedView:null,rawData:"",rawDataComplete:!0,rawDataError:!1,remainingBalance:null,showMessages:{rawDataComplete:!1},startBalance:500,tabOption:null,tabOptions:{macos:"macOS",mobile:"Mobile",windows:"Windows"}},computed:{ctrlOrCmd:function(){return"macos"===this.tabOption?"⌘ Cmd":"Ctrl"},inSemester:function(){return this.now>this.semester.start-12096e5},inSemesterCurrent:function(){return this.getNow()>this.semesterCurrent.start-12096e5},quickData:function(){return F(Math.min(this.semester.start,this.now),this.now,this.startBalance,this.remainingBalance)},rates:function(){return{past:R(this.semester&&Math.min(this.now,this.semester.end)-this.semester.start,this.spentBalance),future:R(this.semester&&this.semester.end-Math.max(this.now,this.semester.start),this.remainingBalanceSafe)}},remainingBalanceIdeal:function(){return this.getIdealBalanceAtDate(this.now)},remainingBalanceIdealCurrent:function(){return this.getIdealBalanceAtDate(this.getNow(),this.semesterCurrent)},remainingBalanceRelative:function(){return this.remainingBalanceSafe-this.remainingBalanceIdeal},remainingBalanceSafe:function(){return null==this.remainingBalance?this.remainingBalanceIdeal:this.remainingBalance},semester:function(){return this.findSemesterAdjusted(this.now)},semesterCurrent:function(){var t=W(this.getNow());return t.year===this.semester.year?this.semester:t},spentBalance:function(){return E(this.startBalance,-this.remainingBalanceSafe)}},watch:{now:function(){this.manualDates={start:null,end:null}},rawData:function(t){t&&(-1===t.indexOf("Flex Points")?this.rawDataError=!0:this.parseRawData(t),this.rawData=null)},startBalance:function(){this.makeChart()}},mounted:function(){Math.max(document.documentElement.clientWidth,window.innerWidth||0)<728&&(this.collapseInstructions=!0);var t=window.navigator.userAgent;/iPhone|iPad|iPod|Android/.test(t)?this.platformGuess="mobile":-1!==t.indexOf("Mac")&&(this.platformGuess="macos"),this.tabOption=this.platformGuess;var e=window.location.hash.match(/^#now=(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2})?$/);if(null!==e){var a=J(e,3),n=a[1],r=a[2],s=new Date("".concat(n).concat(r||"T00:00:00"));this.debugNow=s.getTime(),this.now=this.debugNow,console.log("Setting debug date to",s)}this.loaderShow=!1,this.makeChart()},methods:{adjustIncompleteData:function(t){t=Number(t),"parse"!==this.processedView||this.rawDataComplete||isNaN(t)||(this.showMessages.rawDataComplete=!1,this.remainingBalance=t,this.chartData=P(this.chartData,t-this.chartData[this.chartData.length-1][1]),this.makeChart())},changeSemesterDate:function(t,e,a){var n=864e5*e;if("start"===t){if(this.semester.start+n<this.semester.end){if(a)return!0;this.manualDates.start+=n}}else if("end"===t&&this.semester.end+n>this.semester.start){if(a)return!0;this.manualDates.end+=n}if(a)return!1;this.makeChart()},findSemesterAdjusted:function(t){var e=W(t);return this.manualDates.start&&(e.start+=this.manualDates.start),this.manualDates.end&&(e.end+=this.manualDates.end),e},getIdealBalanceAtDate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.semester;return V(t,e.start,e.end,this.startBalance,0)},getNow:function(){return this.debugNow||Date.now()},makeChart:function(){var t="quick"===this.processedView?this.quickData:this.chartData,e="parse"!==this.processedView||this.rawDataComplete?[]:F(this.semester.start,t[0][0],this.startBalance,t[0][1]),a=F(this.now,Math.max(this.semester.end,this.now),this.remainingBalance,0),n=t?[].concat(L(e),L(t),L(a)).map(function(t){var e=J(t,1)[0];return[e,this.getIdealBalanceAtDate(e)]},this):F(this.semester.start,this.semester.end,this.startBalance,0),r=n.findIndex(function(t){return J(t,1)[0]>=this.now},this);-1===r&&(r=n.length),n.splice(r,0,{x:this.now,y:this.remainingBalanceIdeal,marker:{enabled:!0}});var i=[{name:"Ideal balance",colorIndex:1,data:n,id:"ideal"}];return t&&i.push({name:"Estimated balance",colorIndex:0,className:"line-dash",data:e,id:"estimated",linkedTo:"actual"},{name:"Actual balance",colorIndex:0,step:"quick"!==this.processedView?"left":null,data:t,id:"actual"},{name:"Projected balance",colorIndex:0,className:"line-dash",data:a,id:"projected",linkedTo:":previous"}),s.a.chart("chart",{chart:{type:"line",styledMode:!0,spacingLeft:0,spacingRight:0,events:{load:"demo"!==this.processedView?function(){var t=this.get("ideal").data[r],e=this.get("actual")&&this.get("actual").data[r];this.tooltip.refresh(e?[t,e]:[t])}:void 0}},plotOptions:{line:{marker:{enabled:!1}}},series:i,time:{useUTC:!1},title:{text:246.01===this.remainingBalance?"My name is Jean Valjean":void 0},tooltip:{split:!0,valueDecimals:2,valuePrefix:"$",xDateFormat:"%a, %B %e, %Y, %l:%M %p"},xAxis:{crosshair:{snap:!1},labels:{format:"{value:%b %e}"},type:"datetime"},yAxis:{crosshair:{snap:!1},max:this.startBalance,title:{text:"Flex Points"},labels:{format:"${value}"}}})},parseRawData:function(t){this.now=this.getNow();var e=function(t,e){for(var a,n=t.split("\n"),r=[],s=!1,i=!1,o=0,l=0;l<n.length&&!s;l++){var c=q(n[l]);if(null!==c){var u=c.date,h=c.amountChange,d=c.details;"GUI Location"===d&&0===r.length&&(i=!0);var f=r[0]?E(r[0][1],-o):0;o=h,r.unshift([u,f]),h===e?s=!0:"PatronImport Location"===d&&h>=110&&(s=!0,a=h)}}return{parsedRawData:r,rawDataComplete:s,rawDataCompleteEnd:i,newStartBalance:a}}(t,this.startBalance),a=e.parsedRawData,n=e.rawDataComplete,r=e.rawDataCompleteEnd,s=e.newStartBalance;if(this.chartData=a,this.rawDataComplete=n,0!==this.chartData.length){var i;this.scrollToResults(),this.rawDataError=!1,void 0!==s&&(this.startBalance=s),r||(this.rawDataComplete?this.chartData=P(this.chartData,this.startBalance-this.chartData[0][1]):this.showMessages.rawDataComplete=!0);var o=J(this.chartData[this.chartData.length-1],2);i=o[0],this.remainingBalance=o[1],W(i).year!==this.semester.year?this.now=i:this.chartData.push([this.now,this.remainingBalance]),this.processedView="parse",this.makeChart()}else this.rawDataError=!0},scrollToResults:function(){this.$nextTick(function(){document.getElementById("results").scrollIntoView()})},useDemo:function(){this.scrollToResults(),this.rawDataComplete=!0,this.chartData=Y,this.startBalance=Y[0][1];var t=J(Y[Y.length-1],2);this.now=t[0],this.remainingBalance=t[1],this.processedView="demo",this.makeChart()},useQuick:function(t){this.scrollToResults(),this.now=this.getNow(),this.rawDataComplete=!0,this.remainingBalance=t,this.processedView="quick",this.makeChart()}}}),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("./service-worker.js").catch(function(t){console.log("Unable to register service worker:",t)})})},kh7J:function(t){t.exports=JSON.parse("[[1515909600000,500],[1516040940000,485.03],[1516197720000,480.44],[1516224300000,474.2],[1516395540000,468.12],[1516425120000,464.33],[1516504440000,460.54],[1516662660000,458.95],[1516741680000,453.46],[1516913940000,446.57],[1516934400000,441.19],[1517274600000,438.41],[1517519100000,433.32],[1517600940000,430.37],[1518037320000,427.98],[1518123360000,422.04],[1518144360000,414.1],[1518198240000,409.45],[1518241380000,404.26],[1518475620000,397.67],[1518476520000,389.23],[1518652380000,381.55],[1518843720000,377.76],[1518969540000,375.37],[1519060980000,370.88],[1519159560000,365.39],[1519333080000,360.05],[1519533360000,354.96],[1519742820000,352.57],[1519764240000,346.57],[1519937940000,342.84],[1520012040000,334.2],[1520371440000,329.81],[1520522820000,321.73],[1521432120000,310.2],[1521574560000,304.21],[1521671100000,299.67],[1521749100000,293.99],[1521750960000,289.7],[1522179360000,286.5],[1522287780000,268.52],[1522878540000,264.58],[1522958520000,261.38],[1523032200000,254.84],[1523137440000,250.99],[1523229000000,248.6],[1523303820000,242.61],[1523386920000,239.96],[1523387760000,234.87],[1523562960000,231.67],[1523636760000,223.83],[1523749380000,215.95],[1523751660000,212.5],[1523928000000,204.11],[1523993940000,197.62],[1524018060000,190.64],[1524187440000,179.39],[1524250440000,176.44],[1524272160000,170.95],[1524345180000,163.16],[1524434280000,159.96],[1524520560000,154.99],[1524598740000,148.5],[1524600780000,147.21],[1524768060000,140.22],[1524779040000,134.73],[1524779940000,131.75],[1524956880000,116.77],[1524958560000,111.78],[1525207200000,104.7],[1525210860000,98.46],[1525235160000,96.47],[1525360920000,88.59],[1525454940000,86.4],[1525533180000,75.63],[1525534800000,73.48],[1525545000000,63.49],[1525618200000,53.74],[1525650300000,46.75],[1525830060000,45],[1525876080000,40.01],[1525966620000,21.02],[1526004540000,15.53],[1526061420000,0.33],[1526370300000,0]]")},nMAr:function(t,e,a){"use strict";var n=a("G2hz");a.n(n).a}});
//# sourceMappingURL=main.c90b9c76398d364eae61.js.map