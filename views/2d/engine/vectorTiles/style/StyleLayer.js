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

define(["require","exports","tslib","./Filter","./StyleDefinition","./StyleProperty","../../webgl/definitions"],(function(t,i,e,a,n,r,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.TextLayout=i.IconLayout=i.CircleStyleLayer=i.SymbolStyleLayer=i.LineStyleLayer=i.FillStyleLayer=i.BackgroundStyleLayer=i.StyleLayer=void 0;var l=function(){function t(t,i,e){switch(this.type=t,this.typeName=i.type,this.id=i.id,this.source=i.source,this.sourceLayer=i["source-layer"],this.minzoom=i.minzoom,this.maxzoom=i.maxzoom,this.filter=i.filter,this.layout=i.layout,this.paint=i.paint,this.z=e,t){case 0:this._layoutDefinition=n.StyleDefinition.backgroundLayoutDefinition,this._paintDefinition=n.StyleDefinition.backgroundPaintDefinition;break;case 1:this._layoutDefinition=n.StyleDefinition.fillLayoutDefinition,this._paintDefinition=n.StyleDefinition.fillPaintDefinition;break;case 2:this._layoutDefinition=n.StyleDefinition.lineLayoutDefinition,this._paintDefinition=n.StyleDefinition.linePaintDefinition;break;case 3:this._layoutDefinition=n.StyleDefinition.symbolLayoutDefinition,this._paintDefinition=n.StyleDefinition.symbolPaintDefinition;break;case 4:this._layoutDefinition=n.StyleDefinition.circleLayoutDefinition,this._paintDefinition=n.StyleDefinition.circlePaintDefinition}this._layoutProperties=this._parseLayout(this.layout),this._paintProperties=this._parsePaint(this.paint)}return t.prototype.getFeatureFilter=function(){return void 0!==this._featureFilter?this._featureFilter:this._featureFilter=a.createFilter(this.filter)},t.prototype.getLayoutProperty=function(t){return this._layoutProperties[t]},t.prototype.getPaintProperty=function(t){return this._paintProperties[t]},t.prototype.getLayoutValue=function(t,i,e){var a,n=this._layoutProperties[t];n&&(a=n.getValue(i,e));var r=this._layoutDefinition[t];return void 0===a&&(a=r.default),"enum"===r.type?a=r.values.indexOf(a):"array"===r.type&&"enum"===r.value&&(a=a.map((function(t){return r.values.indexOf(t)}))),a},t.prototype.getPaintValue=function(t,i,e){var a,n=this._paintProperties[t];n&&(a=n.getValue(i,e));var r=this._paintDefinition[t];return void 0===a&&(a=r.default),"enum"===r.type&&(a=r.values.indexOf(a)),a},t.prototype.isPainterDataDriven=function(){var t=this._paintProperties;if(t)for(var i in t)if(t[i].isDataDriven)return!0;return!1},t.prototype._parseLayout=function(t){var i={};for(var e in t){var a=this._layoutDefinition[e];a&&(i[e]=new r(a,t[e]))}return i},t.prototype._parsePaint=function(t){var i={};for(var e in t){var a=this._paintDefinition[e];a&&(i[e]=new r(a,t[e]))}return i},t}();i.StyleLayer=l;var s=function(t){function i(i,e,a){return t.call(this,i,e,a)||this}return e.__extends(i,t),i}(l);i.BackgroundStyleLayer=s;var u=function(t){function i(i,e,a){var n=t.call(this,i,e,a)||this,r=n.getPaintProperty("fill-color");n.hasDataDrivenColor=!!r&&r.isDataDriven;var o=n.getPaintProperty("fill-opacity");n.hasDataDrivenOpacity=!!o&&o.isDataDriven,n.hasDataDrivenFill=n.hasDataDrivenColor||n.hasDataDrivenOpacity;var l=n.getPaintProperty("fill-outline-color");return n.outlineUsesFillColor=!l,n.hasDataDrivenOutlineColor=!!l&&l.isDataDriven,n.hasDataDrivenOutline=(l?n.hasDataDrivenOutlineColor:n.hasDataDrivenColor)||n.hasDataDrivenOpacity,n}return e.__extends(i,t),i}(l);i.FillStyleLayer=u;var D=function(t){function i(i,e,a){var r=t.call(this,i,e,a)||this,l=r.getPaintProperty("line-color");r.hasDataDrivenColor=!!l&&l.isDataDriven;var s=r.getPaintProperty("line-opacity");r.hasDataDrivenOpacity=!!s&&s.isDataDriven;var u=r.getPaintProperty("line-width");r.hasDataDrivenWidth=!!u&&u.isDataDriven,r.hasDataDrivenLine=r.hasDataDrivenColor||r.hasDataDrivenOpacity||r.hasDataDrivenWidth;var D=e.paint["line-width"];return D||(D=n.StyleDefinition.linePaintDefinition["line-width"].default),r.isThinLine=!r.hasDataDrivenWidth&&"number"==typeof D&&D<o.THIN_LINE_THRESHOLD,r}return e.__extends(i,t),i}(l);i.LineStyleLayer=D;var y=function(t){function i(i,e,a){var n=t.call(this,i,e,a)||this,r=n.getPaintProperty("icon-color");n.hasDataDrivenIconColor=!!r&&r.isDataDriven;var o=n.getPaintProperty("icon-opacity");n.hasDataDrivenIconOpacity=!!o&&o.isDataDriven;var l=n.getLayoutProperty("icon-size");n.hasDataDrivenIconSize=!!l&&l.isDataDriven,n.hasDataDrivenIcon=n.hasDataDrivenIconColor||n.hasDataDrivenIconOpacity||n.hasDataDrivenIconSize;var s=n.getPaintProperty("text-color");n.hasDataDrivenTextColor=!!s&&s.isDataDriven;var u=n.getPaintProperty("text-opacity");n.hasDataDrivenTextOpacity=!!u&&u.isDataDriven;var D=n.getLayoutProperty("text-size");return n.hasDataDrivenTextSize=!!D&&D.isDataDriven,n.hasDataDrivenText=n.hasDataDrivenTextColor||n.hasDataDrivenTextOpacity||n.hasDataDrivenTextSize,n}return e.__extends(i,t),i}(l);i.SymbolStyleLayer=y;var h=function(t){function i(i,e,a){var n=t.call(this,i,e,a)||this,r=n.getPaintProperty("circle-radius");n.hasDataDrivenRadius=!!r&&r.isDataDriven;var o=n.getPaintProperty("circle-color");n.hasDataDrivenColor=!!o&&o.isDataDriven;var l=n.getPaintProperty("circle-opacity");n.hasDataDrivenOpacity=!!l&&l.isDataDriven;var s=n.getPaintProperty("circle-stroke-width");n.hasDataDrivenStrokeWidth=!!s&&s.isDataDriven;var u=n.getPaintProperty("circle-stroke-color");n.hasDataDrivenStrokeColor=!!u&&u.isDataDriven;var D=n.getPaintProperty("circle-stroke-opacity");n.hasDataDrivenStrokeOpacity=!!D&&D.isDataDriven;var y=n.getPaintProperty("circle-blur");return n.hasDataDrivenBlur=!!y&&y.isDataDriven,n}return e.__extends(i,t),i}(l);i.CircleStyleLayer=h;var c=function(t,i,e,a){this.allowOverlap=t.getLayoutValue("icon-allow-overlap",i,a),this.ignorePlacement=t.getLayoutValue("icon-ignore-placement",i,a),this.keepUpright=t.getLayoutValue("icon-keep-upright",i,a),this.offset=t.getLayoutValue("icon-offset",i,a),this.optional=t.getLayoutValue("icon-optional",i,a),this.padding=t.getLayoutValue("icon-padding",i,a),this.rotate=t.getLayoutValue("icon-rotate",i,a),this.rotationAlignment=t.getLayoutValue("icon-rotation-alignment",i,a),this.size=t.getLayoutValue("icon-size",i,a),2===this.rotationAlignment&&(this.rotationAlignment=e?0:1)};i.IconLayout=c;var p=function(t,i,e,a){this.allowOverlap=t.getLayoutValue("text-allow-overlap",i,a),this.anchor=t.getLayoutValue("text-anchor",i,a),this.fontArray=t.getLayoutValue("text-font",i,a),this.ignorePlacement=t.getLayoutValue("text-ignore-placement",i,a),this.justify=t.getLayoutValue("text-justify",i,a),this.keepUpright=t.getLayoutValue("text-keep-upright",i,a),this.letterSpacing=t.getLayoutValue("text-letter-spacing",i,a),this.lineHeight=t.getLayoutValue("text-line-height",i,a),this.maxAngle=t.getLayoutValue("text-max-angle",i,a),this.maxWidth=t.getLayoutValue("text-max-width",i,a),this.offset=t.getLayoutValue("text-offset",i,a),this.optional=t.getLayoutValue("text-optional",i,a),this.padding=t.getLayoutValue("text-padding",i,a),this.rotate=t.getLayoutValue("text-rotate",i,a),this.rotationAlignment=t.getLayoutValue("text-rotation-alignment",i,a),this.size=t.getLayoutValue("text-size",i,a),this.transform=t.getLayoutValue("text-transform",i,a),this.writingMode=t.getLayoutValue("text-writing-mode",i,a),2===this.rotationAlignment&&(this.rotationAlignment=e?0:1)};i.TextLayout=p}));