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

define(["require","exports","../../../../core/mathUtils","../../../../core/maybe","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../../../../geometry/support/aaBoundingRect","../../../../geometry/support/centroid","../../../../geometry/support/coordsUtils","../../../../layers/graphics/dehydratedFeatures","../../../../layers/graphics/hydratedFeatures","../../support/pointUtils"],(function(e,t,r,o,i,n,a,l,u,s,c,m,f,d,v,p,h){"use strict";function g(e){var t=e.paths[0];if(!t||0===t.length)return null;var r=d.getPointOnPath(t,d.getPathLength(t)/2);return v.makeDehydratedPoint(r[0],r[1],r[2],e.spatialReference)}function y(e,t,r){var o=r?e:p.clonePoint(e);return t&&e?h.pointToPoint(e,o,t)?o:null:o}function x(e){if(Array.isArray(e)){for(var t=0,r=e;t<r.length;t++){if(!x(r[t]))return!1}return!0}return null==e||e>=0}Object.defineProperty(t,"__esModule",{value:!0}),t.namedAnchorToHUDMaterialAnchorPos=t.demResolutionForBoundingBox=t.computeObjectRotation=t.isValidSize=t.validateSymbolLayerSize=t.computeObjectScale=t.overrideColor=t.mixinColorAndOpacity=t.updateVertexAttributeAuxpos1w=t.enlargeExtent=t.computeCentroid=void 0,t.computeCentroid=function(e,t){if("point"===e.type)return y(e,t,!1);if(p.isHydratedGeometry(e))switch(e.type){case"extent":return y(e.center,t,!1);case"polygon":return y(e.centroid,t,!1);case"polyline":return y(g(e),t,!0);case"mesh":return y(e.extent.center,t,!1)}else switch(e.type){case"extent":return y(function(e){var t=r.isFinite(e.zmin);return v.makeDehydratedPoint(.5*(e.xmax+e.xmin),.5*(e.ymax+e.ymin),t?.5*(e.zmax+e.zmin):void 0,e.spatialReference)}(e),t,!0);case"polygon":return y(function(e){var t=e.rings[0];if(!t||0===t.length)return null;var r=f.ringsCentroid(e.rings,e.hasZ);return v.makeDehydratedPoint(r[0],r[1],r[2],e.spatialReference)}(e),t,!0);case"polyline":return y(g(e),t,!0)}},t.enlargeExtent=function(e,t,r,o){if(void 0===o&&(o=0),e){t||(t=m.create());var i=e,n=.5*i.width*(r-1),a=.5*i.height*(r-1);return i.width<1e-7*i.height?n+=a/20:i.height<1e-7*i.width&&(a+=n/20),u.vec4.set(t,i.xmin-n-o,i.ymin-a-o,i.xmax+n+o,i.ymax+a+o),t}return null},t.updateVertexAttributeAuxpos1w=function(e,t){for(var r=0;r<e.geometries.length;++r){var o=e.geometries[r].data.vertexAttributes.auxpos1;o&&o.data[3]!==t&&(o.data[3]=t,e.geometryVertexAttrsUpdated(r))}},t.mixinColorAndOpacity=function(e,t){var r=s.vec4f64.clone(s.vec4f64.ONES);return o.isSome(e)&&(r[0]=e[0],r[1]=e[1],r[2]=e[2]),o.isSome(t)?r[3]=t:o.isSome(e)&&e.length>3&&(r[3]=e[3]),r},t.overrideColor=function(e,t,r,i,n,a){void 0===a&&(a=[0,0,0,0]);for(var l=0;l<3;++l)o.isSome(e)&&null!=e[l]?a[l]=e[l]:o.isSome(r)&&null!=r[l]?a[l]=r[l]:a[l]=n[l];return o.isSome(t)?a[3]=t:o.isSome(i)?a[3]=i:a[3]=n[3],a},t.computeObjectScale=function(e,t,r,i){void 0===e&&(e=l.vec3f64.ONES),void 0===i&&(i=1);var n=new Array(3);if(o.isNone(t)||o.isNone(r))n[0]=1,n[1]=1,n[2]=1;else{for(var a=void 0,u=0,s=2;s>=0;s--){var c=e[s],m=void 0,f=null!=c,d=0===s&&!a&&!f,v=r[s];"symbol-value"===c||d?m=0!==v?t[s]/v:1:f&&"proportional"!==c&&isFinite(c)&&(m=0!==v?c/v:1),null!=m&&(n[s]=m,a=m,u=Math.max(u,Math.abs(m)))}for(s=2;s>=0;s--)null==n[s]?n[s]=a:0===n[s]&&(n[s]=.001*u)}for(s=2;s>=0;s--)n[s]/=i;return l.vec3f64.fromArray(n)},t.validateSymbolLayerSize=function(e){return null!=e.isPrimitive&&(e=[e.width,e.depth,e.height]),x(e)?null:"Symbol sizes may not be negative values"},t.isValidSize=x,t.computeObjectRotation=function(e,t,r,o){void 0===o&&(o=n.mat4f64.create());var a=e||0,l=t||0,u=r||0;return 0!==a&&i.mat4.rotateZ(o,o,-a/180*Math.PI),0!==l&&i.mat4.rotateX(o,o,l/180*Math.PI),0!==u&&i.mat4.rotateY(o,o,u/180*Math.PI),o},t.demResolutionForBoundingBox=function(e,t){return null!=t.minDemResolution?t.minDemResolution:c.isPoint(e)?t.minDemResolutionForPoints:.01*c.maximumDimension(e)},t.namedAnchorToHUDMaterialAnchorPos={"bottom-left":a.vec2f64.fromValues(0,0),bottom:a.vec2f64.fromValues(.5,0),"bottom-right":a.vec2f64.fromValues(1,0),left:a.vec2f64.fromValues(0,.5),center:a.vec2f64.fromValues(.5,.5),right:a.vec2f64.fromValues(1,.5),"top-left":a.vec2f64.fromValues(0,1),top:a.vec2f64.fromValues(.5,1),"top-right":a.vec2f64.fromValues(1,1)}}));