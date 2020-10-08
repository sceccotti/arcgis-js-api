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

define(["require","exports","../../core/compilerUtils","./zscale"],(function(t,e,r,n){"use strict";function o(t,e){return e}function i(t,e,r,n){switch(r){case 0:return h(t,e+n,0);case 1:return"lowerLeft"===t.originPosition?h(t,e+n,1):function(t,e,r){var n=t.translate,o=t.scale;return n[r]-e*o[r]}(t,e+n,1)}}function s(t,e,r,n){switch(r){case 2:return h(t,e,2);default:return i(t,e,r,n)}}function a(t,e,r,n){switch(r){case 2:return h(t,e,3);default:return i(t,e,r,n)}}function u(t,e,r,n){switch(r){case 3:return h(t,e,3);default:return s(t,e,r,n)}}function h(t,e,r){var n=t.translate,o=t.scale;return n[r]+e*o[r]}Object.defineProperty(e,"__esModule",{value:!0}),e.JSONFeatureSetParserContext=void 0;var c=function(){function t(t){this.options=t,this.geometryTypes=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"],this.previousCoordinate=[0,0],this.transform=null,this.applyTransform=o,this.lengths=[],this.currentLengthIndex=0,this.toAddInCurrentPath=0,this.vertexDimension=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,this.AttributesConstructor=function(){}}return t.prototype.createFeatureResult=function(){return{fields:[],features:[]}},t.prototype.finishFeatureResult=function(t){if(this.options.applyTransform&&(t.transform=null),this.AttributesConstructor=function(){},this.coordinateBuffer=null,this.lengths.length=0,t.hasZ){var e=n.getGeometryZScaler(t.geometryType,this.options.sourceSpatialReference,t.spatialReference);if(e)for(var r=0,o=t.features;r<o.length;r++){e(o[r].geometry)}}},t.prototype.createSpatialReference=function(){return{}},t.prototype.addField=function(t,e){t.fields.push(e);var r=t.fields.map((function(t){return t.name}));this.AttributesConstructor=function(){for(var t=0,e=r;t<e.length;t++){this[e[t]]=null}}},t.prototype.addFeature=function(t,e){t.features.push(e)},t.prototype.prepareFeatures=function(t){var e=this;switch(this.options.applyTransform&&t.transform&&(this.transform=t.transform,this.applyTransform=this.deriveApplyTransform(t)),this.vertexDimension=2,t.hasZ&&this.vertexDimension++,t.hasM&&this.vertexDimension++,t.geometryType){case"esriGeometryPoint":this.addCoordinate=function(t,r,n){return e.addCoordinatePoint(t,r,n)},this.createGeometry=function(t){return e.createPointGeometry(t)};break;case"esriGeometryPolygon":this.addCoordinate=function(t,r,n){return e.addCoordinatePolygon(t,r,n)},this.createGeometry=function(t){return e.createPolygonGeometry(t)};break;case"esriGeometryPolyline":this.addCoordinate=function(t,r,n){return e.addCoordinatePolyline(t,r,n)},this.createGeometry=function(t){return e.createPolylineGeometry(t)};break;case"esriGeometryMultipoint":this.addCoordinate=function(t,r,n){return e.addCoordinateMultipoint(t,r,n)},this.createGeometry=function(t){return e.createMultipointGeometry(t)};break;default:r.neverReached(t.geometryType)}},t.prototype.createFeature=function(){return this.lengths.length=0,this.currentLengthIndex=0,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,{attributes:new this.AttributesConstructor}},t.prototype.addLength=function(t,e,r){0===this.lengths.length&&(this.toAddInCurrentPath=e),this.lengths.push(e)},t.prototype.createPointGeometry=function(t){var e={x:0,y:0,spatialReference:t.spatialReference};return t.hasZ&&(e.z=0),t.hasM&&(e.m=0),e},t.prototype.addCoordinatePoint=function(t,e,r){switch(e=this.applyTransform(this.transform,e,r,0),r){case 0:t.x=e;break;case 1:t.y=e;break;case 2:"z"in t?t.z=e:t.m=e;break;case 3:t.m=e}},t.prototype.transformPathLikeValue=function(t,e){var r=0;return e<=1&&(r=this.previousCoordinate[e],this.previousCoordinate[e]+=t),this.applyTransform(this.transform,t,e,r)},t.prototype.addCoordinatePolyline=function(t,e,r){this.dehydratedAddPointsCoordinate(t.paths,e,r)},t.prototype.addCoordinatePolygon=function(t,e,r){this.dehydratedAddPointsCoordinate(t.rings,e,r)},t.prototype.addCoordinateMultipoint=function(t,e,r){0===r&&t.points.push([]);var n=this.transformPathLikeValue(e,r);t.points[t.points.length-1].push(n)},t.prototype.createPolygonGeometry=function(t){return{rings:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},t.prototype.createPolylineGeometry=function(t){return{paths:[[]],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},t.prototype.createMultipointGeometry=function(t){return{points:[],spatialReference:t.spatialReference,hasZ:!!t.hasZ,hasM:!!t.hasM}},t.prototype.dehydratedAddPointsCoordinate=function(t,e,r){if(null===this.coordinateBuffer){var n=this.lengths.reduce((function(t,e){return t+e}),0);this.coordinateBuffer=new Float64Array(n*this.vertexDimension)}0===r&&0==this.toAddInCurrentPath--&&(t.push([]),this.toAddInCurrentPath=this.lengths[++this.currentLengthIndex]-1,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0);var o=this.transformPathLikeValue(e,r),i=t[t.length-1];0===r&&i.push(new Float64Array(this.coordinateBuffer.buffer,this.coordinateBufferPtr*Float64Array.BYTES_PER_ELEMENT,this.vertexDimension)),this.coordinateBuffer[this.coordinateBufferPtr++]=o},t.prototype.deriveApplyTransform=function(t){var e=t.hasZ,r=t.hasM;return e&&r?u:e?s:r?a:i},t}();e.JSONFeatureSetParserContext=c}));