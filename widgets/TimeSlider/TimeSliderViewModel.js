// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../TimeExtent","../../TimeInterval","../../core/Accessor","../../core/compilerUtils","../../core/mathUtils","../../core/accessorSupport/decorators","../../core/accessorSupport/ensureType","../../layers/support/timeUtils"],(function(t,e,n,r,i,o,l,u,a,p,s,m){return function(t){function e(e){var n=t.call(this,e)||this;return n.fullTimeExtent=null,n.loop=!0,n.mode="time-window",n.stops={count:10},n.timerId=null,n.view=null,n}return n(e,t),e.prototype.destroy=function(){null!=this.timerId&&(clearInterval(this.timerId),this.timerId=null)},Object.defineProperty(e.prototype,"effectiveStops",{get:function(){var t=this.fullTimeExtent,e=this.stops;if(!e)return[];if("dates"in e){var n=e.dates;if(null==n||0===n.length)return null;var r=n.sort((function(t,e){return t.getTime()-e.getTime()}));return t?r.filter((function(e){var n=t.start,r=t.end;return!(e.getTime()<n.getTime()||e.getTime()>r.getTime())})):r}if("count"in e){var i=e.timeExtent||t;return this._divideTimeExtentByCount(i,e.count)}if("interval"in e){i=e.timeExtent||t;return this._divideTimeExtentByInterval(i,e.interval)}return[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"playRate",{set:function(t){t<=0||t>36e5||("playing"===this.state&&this._startAnimation(),this._set("playRate",t))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this.values&&this.fullTimeExtent?this.timerId?"playing":"ready":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"timeExtent",{get:function(){var t=this.mode,e=this.values;if(!e||0===e.length)return null;switch(t){case"instant":return new i({start:e[0],end:e[0]});case"time-window":return e.length>1?new i({start:e[0],end:e[1]}):null;case"cumulative-from-start":return new i({start:null,end:e[0]});case"cumulative-from-end":return new i({start:e[0],end:null});default:return void u.neverReached(t)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"values",{set:function(t){var e=this.fullTimeExtent,n=this.view;if(e){var r=e.start,i=e.end,o=r.getTime(),l=i.getTime();t=t&&t.filter((function(t){return t})).map((function(t){var e=t.getTime(),n=a.clamp(e,o,l);return new Date(n)}))}n&&(n.timeExtent=this._toTimeExtent(t)),this._set("values",t)},enumerable:!0,configurable:!0}),e.prototype.next=function(){this.values&&this.fullTimeExtent&&this._step(!0)},e.prototype.play=function(){this._clearAnimation(),this._startAnimation()},e.prototype.previous=function(){this._step(!1)},e.prototype.stop=function(){this._clearAnimation()},e.prototype._clearAnimation=function(){null!=this.timerId&&(clearInterval(this.timerId),this.timerId=null)},e.prototype._startAnimation=function(){var t=this;this._step(),this.timerId=setInterval((function(){t._step()}),this.playRate)},e.prototype._step=function(t){void 0===t&&(t=!0);var e=this.effectiveStops,n=this.values;if(n&&0!==n.length&&!(n.length>e.length)){var r=e.map((function(t){return t.getTime()})).sort((function(t,e){return t-e})),i=n.map((function(t){return t.getTime()})).map((function(t){var e=r.indexOf(t);if(-1!==e)return e;var n=r.reduce((function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e}));return r.indexOf(n)})),o=i.map((function(e){return e+(t?1:-1)})),l=o.some((function(t){return t<0||t>r.length-1})),u=this.loop,a=this.state;if(l)if(u){var p=Math.min.apply(Math,i),s=Math.max.apply(Math,i),m=t?i.map((function(t){return t-p})):i.map((function(t){return t+(r.length-1-s)}));this.values=m.map((function(t){return new Date(r[t])}))}else"playing"===a&&this.stop();else this.values=o.map((function(t){return new Date(r[t])}))}},e.prototype._divideTimeExtentByCount=function(t,e){if(void 0===e&&(e=10),!t||!e)return[];var n=t.start,r=t.end;if(!n||!r)return[];var i=Math.floor((r.getTime()-n.getTime())/e),l=new o({value:i});return this._divideTimeExtentByInterval(t,l)},e.prototype._divideTimeExtentByInterval=function(t,e,n){if(void 0===n&&(n=1e4),!t||!e)return[];var r=t.start,i=t.end;if(!r||!i)return[];if((i.getTime()-r.getTime())/e.toMilliseconds()>n)return this._divideTimeExtentByCount(t);for(var o=[],l=e.value,u=e.unit,a=r;a.getTime()<=i.getTime();)o.push(new Date(a.getTime())),a=m.offsetDate(a,l,u);return o},e.prototype._toTimeExtent=function(t){if(!t||0===t.length)return null;var e=t[0],n=t.length>1?t[1]:t[0];switch(this.mode){case"instant":case"time-window":return new i({start:e,end:n});case"cumulative-from-start":return new i({start:null,end:e});case"cumulative-from-end":return new i({start:e,end:null});default:return null}},r([p.property({dependsOn:["stops","fullTimeExtent"],readOnly:!0})],e.prototype,"effectiveStops",null),r([p.property({type:i})],e.prototype,"fullTimeExtent",void 0),r([p.property({nonNullable:!0})],e.prototype,"loop",void 0),r([p.property({nonNullable:!0})],e.prototype,"mode",void 0),r([p.property({nonNullable:!0,value:1e3})],e.prototype,"playRate",null),r([p.property({dependsOn:["fullTimeExtent","timerId","values"],readOnly:!0})],e.prototype,"state",null),r([p.property({cast:function(t){return t?("interval"in t&&(t.interval=s.ensureType(o,t.interval)),"timeExtent"in t&&(t.timeExtent=s.ensureType(i,t.timeExtent)),t):null}})],e.prototype,"stops",void 0),r([p.property({dependsOn:["values"],readOnly:!0})],e.prototype,"timeExtent",null),r([p.property()],e.prototype,"timerId",void 0),r([p.property({value:null})],e.prototype,"values",null),r([p.property()],e.prototype,"view",void 0),r([p.property()],e.prototype,"next",null),r([p.property()],e.prototype,"play",null),r([p.property()],e.prototype,"previous",null),r([p.property()],e.prototype,"stop",null),e=r([p.subclass("esri.widgets.TimeSlider.TimeSliderViewModel")],e)}(p.declared(l))}));