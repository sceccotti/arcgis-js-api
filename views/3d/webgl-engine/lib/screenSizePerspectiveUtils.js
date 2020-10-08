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

define(["require","exports","../../../../core/mathUtils","../../../../geometry/support/geodesicConstants"],(function(e,t,a,r){"use strict";function i(e,t,a){var r=a.parameters,i=a.paddingPixelsOverride;return u.scale=Math.min(r.divisor/(t-r.offset),1),u.factor=function(e){return Math.abs(e*e*e)}(e),u.minPixelSize=r.minPixelSize,u.paddingPixels=i,u}function n(e,t){return 0===e?t.minPixelSize:t.minPixelSize*(1+2*t.paddingPixels/e)}function l(e,t){return Math.max(a.lerp(e*t.scale,e,t.factor),n(e,t))}Object.defineProperty(t,"__esModule",{value:!0}),t.scale=t.applyPrecomputedScaleFactor=t.precomputeScaleFactor=t.applyScaleFactorVec2=t.applyScaleFactor=t.getLabelSettings=t.getSettings=void 0,t.getSettings=function(e){return new c(e,s)},t.getLabelSettings=function(e){var t=s.curvatureDependent,a=s.scaleStart,r=s.scaleFallOffRange;return new c(e,{curvatureDependent:{min:{curvature:t.min.curvature,tiltAngle:t.min.tiltAngle,scaleFallOffFactor:o.curvatureDependent.min.scaleFallOffFactor},max:{curvature:t.max.curvature,tiltAngle:t.max.tiltAngle,scaleFallOffFactor:o.curvatureDependent.max.scaleFallOffFactor}},scaleStart:a,scaleFallOffRange:r,minPixelSize:o.minPixelSize})},t.applyScaleFactor=l,t.applyScaleFactorVec2=function(e,t,r){void 0===r&&(r=[0,0]);var i=Math.min(Math.max(t.scale,n(e[1],t)/e[1]),1);return r[0]=a.lerp(e[0]*i,e[0],t.factor),r[1]=a.lerp(e[1]*i,e[1],t.factor),r},t.precomputeScaleFactor=function(e,t,a,r){r.scale=function(e,t,a){var r=i(e,t,a);return r.minPixelSize=0,r.paddingPixels=0,l(1,r)}(e,t,a),r.factor=0,r.minPixelSize=a.parameters.minPixelSize,r.paddingPixels=a.paddingPixelsOverride},t.applyPrecomputedScaleFactor=function(e,t,a){void 0===a&&(a=[0,0]);var r=Math.min(Math.max(t.scale,n(e[1],t)/e[1]),1);return a[0]=e[0]*r,a[1]=e[1]*r,a},t.scale=function(e,t,a,r){return l(e,i(t,a,r))};var c=function(){function e(e,t,a,r){void 0===a&&(a={camera:{distance:0,fovY:0},divisor:0,offset:0,minPixelSize:0,paddingPixels:0}),this.viewingMode=e,this.description=t,this.parameters=a,this._paddingPixelsOverride=r,2===this.viewingMode?(this.coverageCompensation=this.surfaceCoverageCompensationLocal,this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersLocal):(this.coverageCompensation=this.surfaceCoverageCompensationGlobal,this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersGlobal)}return Object.defineProperty(e.prototype,"paddingPixelsOverride",{get:function(){return this._paddingPixelsOverride||this.parameters.paddingPixels},enumerable:!1,configurable:!0}),e.prototype.update=function(e){return(!this.parameters||this.parameters.camera.fovY!==e.fovY||this.parameters.camera.distance!==e.distance)&&(this.calculateParameters(e,this.parameters),!0)},e.prototype.overridePadding=function(t){return t!==this.paddingPixelsOverride?new e(this.viewingMode,this.description,this.parameters,t):this},e.prototype.calculateParameters=function(e,t){var a=this.description,r=a.scaleStart,i=a.scaleFallOffRange,n=a.minPixelSize,l=e.fovY,c=e.distance,s=this.calculateCurvatureDependentParameters(e),o=this.coverageCompensation(e,s),u=s.tiltAngle,d=s.scaleFallOffFactor,p=Math.sin(u)*c,f=.5*Math.PI-u-l*(.5-r*o),m=p/Math.cos(f),v=f+l*i*o,g=(m-d*(p/Math.cos(v)))/(1-d);return t.camera.fovY=e.fovY,t.camera.distance=e.distance,t.offset=g,t.divisor=m-g,t.minPixelSize=n,t},e.prototype.calculateCurvatureDependentParametersLocal=function(e,t){return void 0===t&&(t=d),t.tiltAngle=this.description.curvatureDependent.min.tiltAngle,t.scaleFallOffFactor=this.description.curvatureDependent.min.scaleFallOffFactor,t},e.prototype.calculateCurvatureDependentParametersGlobal=function(e,t){void 0===t&&(t=d);var i=this.description.curvatureDependent,n=1+e.distance/r.earthRadius,l=Math.sqrt(n*n-1),c=[i.min.curvature,i.max.curvature],s=c[0],o=c[1],u=a.clamp((l-s)/(o-s),0,1),p=[i.min,i.max],f=p[0],m=p[1];return t.tiltAngle=a.lerp(f.tiltAngle,m.tiltAngle,u),t.scaleFallOffFactor=a.lerp(f.scaleFallOffFactor,m.scaleFallOffFactor,u),t},e.prototype.surfaceCoverageCompensationLocal=function(e,t){return(e.fovY-t.tiltAngle)/e.fovY},e.prototype.surfaceCoverageCompensationGlobal=function(e,t){var a=r.earthRadius*r.earthRadius,i=t.tiltAngle+.5*Math.PI,n=e.fovY,l=e.distance,c=l*l+a-2*Math.cos(i)*l*r.earthRadius,s=Math.sqrt(c),o=Math.sqrt(c-a);return(Math.acos(o/s)-Math.asin(r.earthRadius/(s/Math.sin(i)))+.5*n)/n},e}(),s={curvatureDependent:{min:{curvature:a.deg2rad(10),tiltAngle:a.deg2rad(12),scaleFallOffFactor:.5},max:{curvature:a.deg2rad(70),tiltAngle:a.deg2rad(40),scaleFallOffFactor:.8}},scaleStart:.3,scaleFallOffRange:.65,minPixelSize:0},o={curvatureDependent:{min:{scaleFallOffFactor:.7},max:{scaleFallOffFactor:.95}},minPixelSize:14};var u={scale:0,factor:0,minPixelSize:0,paddingPixels:0},d={tiltAngle:0,scaleFallOffFactor:0}}));