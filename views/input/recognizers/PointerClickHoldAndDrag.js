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

define(["require","exports","tslib","../../../core/clock","../InputHandler","./support"],(function(t,e,i,n,o,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PointerClickHoldAndDrag=e.DefaultParameters=void 0,e.DefaultParameters={maximumClickDelay:300,movementUntilMouseDrag:1.5,movementUntilPenDrag:6,movementUntilTouchDrag:6,holdDelay:500};var a=function(t){function o(i,o,r,a,s,l){void 0===i&&(i=e.DefaultParameters.maximumClickDelay),void 0===o&&(o=e.DefaultParameters.movementUntilMouseDrag),void 0===r&&(r=e.DefaultParameters.movementUntilPenDrag),void 0===a&&(a=e.DefaultParameters.movementUntilTouchDrag),void 0===s&&(s=e.DefaultParameters.holdDelay),void 0===l&&(l=n.default);var m=t.call(this,!1)||this;return m.maximumClickDelay=i,m.movementUntilMouseDrag=o,m.movementUntilPenDrag=r,m.movementUntilTouchDrag=a,m.holdDelay=s,m._clock=l,m._pointerState=new Map,m._pointerDrag=m.registerOutgoing("pointer-drag"),m._immediateClick=m.registerOutgoing("immediate-click"),m._pointerHold=m.registerOutgoing("hold"),m.registerIncoming("pointer-down",m._handlePointerDown.bind(m)),m.registerIncoming("pointer-up",(function(t){m._handlePointerLoss(t,"pointer-up")})),m.registerIncoming("pointer-capture-lost",(function(t){m._handlePointerLoss(t,"pointer-capture-lost")})),m.registerIncoming("pointer-cancel",(function(t){m._handlePointerLoss(t,"pointer-cancel")})),m._moveHandle=m.registerIncoming("pointer-move",m._handlePointerMove.bind(m)),m._moveHandle.pause(),m}return i.__extends(o,t),o.prototype.onUninstall=function(){this._pointerState.forEach((function(t){null!=t.holdTimeout&&(t.holdTimeout.remove(),t.holdTimeout=null)})),t.prototype.onUninstall.call(this)},o.prototype._handlePointerDown=function(t){var e=this,i=t.data,n=i.native.pointerId,o=null;0===this._pointerState.size&&(o=this._clock.setTimeout((function(){var i=e._pointerState.get(n);if(i){if(!i.isDragging){var o=i.previousEvent;e._pointerHold.emit(o,void 0,t.modifiers),i.holdEmitted=!0}i.holdTimeout=null}}),this.holdDelay));var r={startEvent:i,previousEvent:i,startTimestamp:t.timestamp,isDragging:!1,downButton:i.native.button,holdTimeout:o,modifiers:new Set};this._pointerState.set(n,r),this.startCapturingPointer(i.native),this._moveHandle.resume(),this._pointerState.size>1&&this.startDragging(t)},o.prototype._createPointerDragData=function(t,e,i){return{action:t,startEvent:e.startEvent,previousEvent:e.previousEvent,currentEvent:i}},o.prototype._handlePointerMove=function(t){var e=t.data,i=e.native.pointerId,n=this._pointerState.get(i);if(n){if(n.isDragging)this._pointerDrag.emit(this._createPointerDragData("update",n,e),void 0,n.modifiers);else r.euclideanDistance(e,n.startEvent)>this._getDragThreshold(e.native.pointerType)&&this.startDragging(t);n.previousEvent=e}},o.prototype._getDragThreshold=function(t){switch(t){case"touch":return this.movementUntilTouchDrag;case"pen":return this.movementUntilPenDrag;case"mouse":default:return this.movementUntilMouseDrag}},o.prototype.startDragging=function(t){var e=this,i=t.data,n=i.native.pointerId;this._pointerState.forEach((function(o){null!=o.holdTimeout&&(o.holdTimeout.remove(),o.holdTimeout=null),o.isDragging||(o.modifiers=t.modifiers,o.isDragging=!0,n===o.startEvent.native.pointerId?e._pointerDrag.emit(e._createPointerDragData("start",o,i)):e._pointerDrag.emit(e._createPointerDragData("start",o,o.previousEvent),t.timestamp))}))},o.prototype._handlePointerLoss=function(t,e){var i=t.data,n=i.native.pointerId,o=this._pointerState.get(n);if(o){if(null!=o.holdTimeout&&(o.holdTimeout.remove(),o.holdTimeout=null),o.isDragging)this._pointerDrag.emit(this._createPointerDragData("end",o,"pointer-up"===e?i:o.previousEvent),void 0,o.modifiers);else if("pointer-up"===e&&o.downButton===i.native.button)t.timestamp-o.startTimestamp<=this.maximumClickDelay&&!o.holdEmitted&&this._immediateClick.emit(i);this._pointerState.delete(n),this.stopCapturingPointer(i.native),0===this._pointerState.size&&this._moveHandle.pause()}},o}(o.InputHandler);e.PointerClickHoldAndDrag=a}));