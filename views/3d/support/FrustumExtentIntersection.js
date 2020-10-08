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

define(["require","exports","../../../core/compilerUtils","../../../core/mathUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../geometry/support/aaBoundingBox","../../../geometry/support/aaBoundingRect","../../../geometry/support/geodesicConstants","./geometryUtils","./intersectionUtils","./mathUtils","./projectionUtils"],(function(e,t,i,r,n,o,s,a,c,l,p,d,h,u,g){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrustumExtentIntersection=void 0;var f=.5*Math.PI,x=f/Math.PI*180,v=f*p.earthRadius,m=.9*p.earthRadius,y=function(){function e(e){this.renderCoordsHelper=e.renderCoordsHelper,this.extent=new Array(4),this.planes=new Array(6),this.maxSpan=0,this.center={origin:a.vec3f64.create(),direction:a.vec3f64.create()};for(var t=0;t<4;t++)this.extent[t]={origin:a.vec3f64.create(),direction:a.vec3f64.create(),cap:{next:null,direction:a.vec3f64.create()}},this.planes[t]=d.plane.create();this.planes[4]=d.plane.create(),this.planes[5]=d.plane.create(),this.planesWithoutFar=this.planes.slice(0,5)}return e.prototype.update=function(e,t,i,r){void 0===r&&(r=!0);var n=this.extent;this.toRenderBoundingExtent(e,t,i),s.vec3.add(this.center.origin,n[0].origin,n[2].origin),s.vec3.scale(this.center.origin,this.center.origin,.5),this.renderCoordsHelper.worldUpAtPosition(this.center.origin,this.center.direction),r||s.vec3.scale(this.center.direction,this.center.direction,-1);for(var o=0;o<4;o++){var a=n[o];this.renderCoordsHelper.worldUpAtPosition(a.origin,a.direction);var c=n[3===o?0:o+1];a.cap.next=c.origin,u.directionFromTo(a.cap.direction,a.origin,c.origin),d.plane.fromVectorsAndPoint(a.direction,a.cap.direction,a.origin,this.planes[o]),r||s.vec3.scale(a.direction,a.direction,-1)}d.plane.fromVectorsAndPoint(n[0].cap.direction,n[1].cap.direction,n[0].origin,this.planes[4]),r?d.plane.negate(this.planes[4],this.planes[5]):(d.plane.copy(this.planes[4],this.planes[5]),d.plane.negate(this.planes[4],this.planes[4])),this.maxSpan=Math.max(Math.abs(e[0]-e[2]),Math.abs(e[1]-e[3])),this.maxSpanSpatialReference=t},e.prototype.isVisibleInFrustum=function(e,t){if(void 0===t&&(t=!1),null==e)return!1;if(1===this.renderCoordsHelper.viewingMode){var i=this.maxSpanSpatialReference.isGeographic?x:v;if(this.maxSpan>i)return!0;if(e.altitude>=m)return this.isVisibleInFrustumGlobal(e)}if(0===this.maxSpan){var r=this.extent[0];return!(t||!e.intersectsRay(d.ray.wrap(r.origin,r.direction)))}for(var n=0;n<this.extent.length;n++){r=this.extent[n];if(!t&&e.intersectsRay(d.ray.wrap(r.origin,r.direction)))return!0;if(e.intersectsLineSegment(d.lineSegment.fromPoints(r.origin,r.cap.next,C),r.cap.direction))return!0}var o=t?this.planes:this.planesWithoutFar;for(n=0;n<e.lines.length;n++){var s=e.lines[n];if(h.frustumLineSegment(o,s.origin,s.endpoint,s.direction))return!0}return!1},e.prototype.toRenderBoundingExtentGlobal=function(e,t,i){l.center(e,R),R[2]=i,g.computeLinearTransformation(t,R,S,this.renderCoordsHelper.spatialReference),n.mat4.invert(M,S),c.empty(w);for(var o=0,a=b;o<a.length;o++)for(var p=a[o],d=p.x0,h=p.x1,u=p.y0,f=p.y1,x=0;x<5;x++){var v=x/4;R[0]=r.lerp(e[d],e[h],v),R[1]=r.lerp(e[u],e[f],v),R[2]=i,g.vectorToVector(R,t,R,this.renderCoordsHelper.spatialReference),s.vec3.transformMat4(R,R,M),c.expandPointInPlace(w,R)}s.vec3.set(this.extent[0].origin,w[0],w[1],w[2]),s.vec3.set(this.extent[1].origin,w[3],w[1],w[2]),s.vec3.set(this.extent[2].origin,w[3],w[4],w[2]),s.vec3.set(this.extent[3].origin,w[0],w[4],w[2]);for(x=0;x<4;++x)s.vec3.transformMat4(this.extent[x].origin,this.extent[x].origin,S)},e.prototype.toRenderBoundingExtentLocal=function(e,t){s.vec3.set(this.extent[0].origin,e[0],e[1],t),s.vec3.set(this.extent[1].origin,e[2],e[1],t),s.vec3.set(this.extent[2].origin,e[2],e[3],t),s.vec3.set(this.extent[3].origin,e[0],e[3],t)},e.prototype.toRenderBoundingExtent=function(e,t,r){switch(this.renderCoordsHelper.viewingMode){case 1:this.toRenderBoundingExtentGlobal(e,t,r);break;case 2:this.toRenderBoundingExtentLocal(e,r);break;default:i.neverReached(this.renderCoordsHelper.viewingMode)}},e.prototype.isVisibleInFrustumGlobal=function(e){if(s.vec3.dot(this.center.direction,e.direction)<0)return!0;for(var t=0;t<4;t++){var i=this.extent[t];if(s.vec3.dot(i.direction,e.direction)<0)return!0}return!1},e}();t.FrustumExtentIntersection=y;var b=[{x0:0,y0:1,x1:2,y1:1},{x0:0,y0:3,x1:2,y1:3},{x0:0,y0:1,x1:0,y1:3},{x0:2,y0:1,x1:2,y1:3}],R=a.vec3f64.create(),S=o.mat4f64.create(),M=o.mat4f64.create(),w=c.create(),C=d.lineSegment.create();t.default=y}));