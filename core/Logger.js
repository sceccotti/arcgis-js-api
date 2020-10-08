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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../config","./has","./maybe","./string","@dojo/framework/shim/Promise"],(function(e,r,t,o,n,i,s){"use strict";var l={info:0,warn:1,error:2,none:3};return function(){function e(r){this.level=null,this._module="",this._parent=null,this.writer=null,this._loggedMessages={error:new Map,warn:new Map,info:new Map},null!=r.level&&(this.level=r.level),null!=r.writer&&(this.writer=r.writer),this._module=r.module,e._loggers[this.module]=this;var t=this.module.lastIndexOf(".");-1!==t&&(this._parent=e.getLogger(this.module.slice(0,t)))}return Object.defineProperty(e.prototype,"module",{get:function(){return this._module},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this._parent},enumerable:!1,configurable:!0}),e.prototype.error=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["error","always"],e))},e.prototype.warn=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["warn","always"],e))},e.prototype.info=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["info","always"],e))},e.prototype.errorOnce=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["error","once"],e))},e.prototype.warnOnce=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["warn","once"],e))},e.prototype.infoOnce=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["info","once"],e))},e.prototype.errorOncePerTick=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["error","oncePerTick"],e))},e.prototype.warnOncePerTick=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["warn","oncePerTick"],e))},e.prototype.infoOncePerTick=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._log.apply(this,t.__spreadArrays(["info","oncePerTick"],e))},Object.defineProperty(e,"test",{get:function(){return{resetLoggers:function(r){void 0===r&&(r={});var t=e._loggers;return e._loggers=r,t},set throttlingDisabled(r){e._throttlingDisabled=r}}},enumerable:!1,configurable:!0}),e.getLogger=function(r){var t=e._loggers[r];return t||(t=new e({module:r})),t},e.prototype._log=function(r,n){for(var i=[],s=2;s<arguments.length;s++)i[s-2]=arguments[s];if(this._matchLevel(r)){if("always"!==n&&!e._throttlingDisabled){var l=this._argsToKey(i),a=this._loggedMessages[r].get(l);if("once"===n&&null!=a||"oncePerTick"===n&&a&&a>=e._tickCounter)return;this._loggedMessages[r].set(l,e._tickCounter),e._scheduleTickCounterIncrement()}for(var p=0,c=o.log.interceptors;p<c.length;p++){var u=c[p];if(u.apply(void 0,t.__spreadArrays([r,this.module],i)))return}var h=this._inheritedWriter();h.apply(void 0,t.__spreadArrays([r,this.module],i))}},e.prototype._parentWithMember=function(e,r){for(var t=this;i.isSome(t);){var o=t[e];if(i.isSome(o))return o;t=t.parent}return r},e.prototype._inheritedWriter=function(){return this._parentWithMember("writer",this._consoleWriter)},e.prototype._consoleWriter=function(e,r){for(var o=[],n=2;n<arguments.length;n++)o[n-2]=arguments[n];console[e].apply(console,t.__spreadArrays(["["+r+"]"],o))},e.prototype._matchLevel=function(e){var r=o.log.level?o.log.level:n("esri-debug-messages")?"info":"warn";return l[this._parentWithMember("level",r)]<=l[e]},e.prototype._argsToKey=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t=function(e,r){return"object"!=typeof r||Array.isArray(r)?r:"[Object]"};return s.numericHash(JSON.stringify(e,t))},e._scheduleTickCounterIncrement=function(){e._tickCounterScheduled||(e._tickCounterScheduled=!0,Promise.resolve().then((function(){e._tickCounter++,e._tickCounterScheduled=!1})))},e._loggers={},e._tickCounter=0,e._tickCounterScheduled=!1,e._throttlingDisabled=!1,e}()}));