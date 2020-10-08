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

define(["require","exports","../../../../core/maybe","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../layers/graphics/dehydratedFeatures","../graphics/elevationAlignmentUtils","../graphics/ElevationContext","../graphics/featureExpressionInfoUtils","./I3SUtil","../../support/geometryUtils","../../support/orientedBoundingBox","../../support/projectionUtils"],(function(e,t,i,r,s,n,a,o,c,h,p,u,v,l){"use strict";return function(){function e(e,t,i,r,n,o,c){void 0===c&&(c={}),this.indexSR=e,this._renderCoordsHelper=t,this.extent=r,this.elevationProvider=n,this.options=c,this.fp=u.frustum.create(),this._poi=s.vec3f64.create(),this.minDistance=1/0,this.maxDistance=0,this.maxLodLevel=2,this._tmp1=s.vec3f64.create(),this._tmp2=s.vec3f64.create(),this._tmp3=s.vec3f64.create(),this._tmp0=s.vec3f64.create(),this.screenspaceErrorBias=c.screenspaceErrorBias||1,this.progressiveLoadFactor=c.progressiveLoadFactor||1,this.updateCamera(i),this.engineSR=this._renderCoordsHelper.spatialReference,this.updateElevationInfo(o),this.tmpPoint=a.makeDehydratedPoint(0,0,0,e)}return e.prototype.updateElevationInfo=function(e){null!=e?(this._elevationContext=c.ElevationContext.fromElevationInfo(e),this._elevationContext.updateFeatureExpressionInfoContext(h.createContextWithoutExpressionSupport(h.extractExpressionInfo(e,!1)))):this._elevationContext=null},e.prototype.updateCamera=function(e){u.frustum.fromMatrix(e.viewMatrix,e.projectionMatrix,this.fp),this._screenSizeFactor=1/(e.perScreenPixelRatio/2),this._camPos=e.eye,this.minDistance=1/0,this.maxDistance=0},e.prototype.setPointOfInterest=function(e){this._poi=e},e.prototype.updateScreenSpaceErrorBias=function(e){var t=this.screenspaceErrorBias;return this.screenspaceErrorBias=e,t},e.prototype.updateExtent=function(e){this.extent=e},e.prototype.getRenderMbs=function(e){var t=e.renderMbs;return t[3]<0&&(n.vec4.copy(t,e.mbs),this._elevationContext&&t[3]<1e5&&(this.tmpPoint.x=t[0],this.tmpPoint.y=t[1],this.tmpPoint.z=t[2],t[2]=o.evaluateElevationAlignmentAtPoint(this.tmpPoint,this.elevationProvider,this._elevationContext,this._renderCoordsHelper)),l.mbsToMbs(t,this.indexSR,t,this.engineSR)),t},e.prototype.getVisibilityObb=function(e){if(i.isSome(e.visibilityObb))return e.visibilityObb;var t=e.serviceObb;return i.isNone(t)||t.halfSize[0]<0?void 0:(e.serviceObbInRenderSR=this._computeRenderObb(t,e.serviceObbInRenderSR,e.mbs[3]),e.serviceObbInRenderSR)},e.prototype._computeRenderObb=function(e,t,r){if(i.isNone(t)&&(t=v.create()),t.halfSize[0]<0){var s=0;this._elevationContext&&r<1e5&&(this.tmpPoint.x=e.center[0],this.tmpPoint.y=e.center[1],this.tmpPoint.z=e.center[2],s=o.evaluateElevationAlignmentAtPoint(this.tmpPoint,this.elevationProvider,this._elevationContext,this._renderCoordsHelper)-e.center[2]),p.transformObb(e,this.indexSR,t,this.engineSR,s)}return t},e.prototype.isNodeVisible=function(e){var t=this.getRenderMbs(e);if(!this.isMBSinExtent(t))return!1;var r=this.getVisibilityObb(e);return i.isSome(r)?v.isVisible(r,this.fp):this.isMBSVisible(t)},e.prototype.isGeometryVisible=function(e){var t=e.geometryObb;return i.isSome(t)?v.isVisible(t,this.fp):this.isNodeVisible(e)},e.prototype.isMBSinExtent=function(e){return!this.extent||0!==p.intersectBoundingBoxWithMbs(this.extent,e)},e.prototype.isMBSVisible=function(e){return u.frustum.intersectsSphere(this.fp.planes,u.sphere.wrap(e[3],e))},e.prototype.screenSpaceDiameterMbs=function(e,t){var i=this.getRenderMbs(e),s=Math.sqrt(r.vec3.squaredDistance(i,this._camPos)),n=s-i[3];return this._updateMinMaxDistance(s),n<0?.5*Number.MAX_VALUE:t/n*this._screenSizeFactor},e.prototype.calcCameraDistance=function(e){return this.calcCameraDistanceToCenter(e)-this.getRenderMbs(e)[3]},e.prototype.calcCameraDistanceToCenter=function(e){var t=this.getRenderMbs(e),i=r.vec3.distance(t,this._camPos);return this._updateMinMaxDistance(i),i},e.prototype.calcAngleDependentLoD=function(e){var t=this.getRenderMbs(e),i=t[3],s=(Math.abs(t[0]*(t[0]-this._camPos[0])+t[1]*(t[1]-this._camPos[1])+t[2]*(t[2]-this._camPos[2]))/r.vec3.length(t)+i)/r.vec3.distance(t,this._camPos);return Math.min(1,s)},e.prototype.hasLOD=function(e){return 0!==e.lodMetric},e.prototype.getDistancePlanarMode=function(e,t){var i=e[0]-t[0],r=e[1]-t[1],s=e[2]-t[2],n=i*i+r*r,a=t[3];if(n<=a*a)return Math.abs(s);var o=Math.sqrt(n)-a;return Math.sqrt(s*s+o*o)},e.prototype.getDistanceGlobeMode=function(e,t){var i=r.vec3.length(t),s=r.vec3.length(e)-i;r.vec3.scale(this._tmp0,e,r.vec3.dot(e,t)/r.vec3.squaredLength(e));var n=r.vec3.squaredDistance(t,this._tmp0),a=t[3];if(n<=a*a)return Math.abs(s);var o=r.vec3.scale(this._tmp0,t,1/i),c=i,h=a*a/2/c,p=r.vec3.scale(this._tmp1,o,c-h),u=e,v=r.vec3.subtract(this._tmp2,u,p),l=r.vec3.subtract(this._tmp2,v,r.vec3.scale(this._tmp3,o,r.vec3.dot(o,v))),m=r.vec3.add(this._tmp2,p,r.vec3.scale(this._tmp2,l,a/r.vec3.length(l))),d=r.vec3.distance(u,m);if(s>=2e5){var f=r.vec3.subtract(this._tmp1,u,m),b=r.vec3.dot(f,o)/r.vec3.length(f);b<.08&&(b=1e-4),d/=b}return d},e.prototype.getDistance=function(e,t){return this.engineSR===l.SphericalECEFSpatialReference?this.getDistanceGlobeMode(e,t):this.getDistancePlanarMode(e,t)},e.prototype._updateMinMaxDistance=function(e){e>0?(this.minDistance=Math.min(this.minDistance,e),this.maxDistance=Math.max(this.maxDistance,e)):(this.minDistance=0,this.maxDistance=Math.max(this.maxDistance,-e))},e.prototype.getLodLevel=function(e){if(0===e.lodMetric||!e.resources.hasFeatureData)return 0;if(0===e.childCount)return this.maxLodLevel;if(this.progressiveLoadFactor<1){var t=this.progressiveLoadFactor*this.screenspaceErrorBias,i=this.screenspaceErrorBias;return this.evaluateLODmetric(e,t)?this.evaluateLODmetric(e,i)?2:1:0}return this.evaluateLODmetric(e,this.screenspaceErrorBias)?this.maxLodLevel:0},e.prototype.evaluateLODmetric=function(e,t){switch(e.lodMetric){case 2:var i=this.getRenderMbs(e),r=this.getDistance(this._camPos,i),s=2*r/this._screenSizeFactor,n=r+i[3];return this._updateMinMaxDistance(n),e.maxError*t<=s;case 1:var a=this.screenSpaceDiameterMbs(e,e.mbs[3]*t);return this.options.angleDependentLoD&&(a*=this.calcAngleDependentLoD(e)),a<e.maxError;case 3:return this.screenSpaceDiameterMbs(e,e.maxError)*t<10;case 4:return this.calcCameraDistance(e)>e.maxError*t}return!1},e.prototype.distToPOI=function(e){var t=this.getRenderMbs(e);return r.vec3.distance(t,this._poi)-t[3]},e.prototype.distCameraToPOI=function(){return r.vec3.distance(this._camPos,this._poi)},e}()}));