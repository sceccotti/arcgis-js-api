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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../intersectionUtils"],(function(e,r,t,i,n){Object.defineProperty(r,"__esModule",{value:!0}),r.applySurfaceCollisionConstraint=function(e,r,i){void 0===i&&(i=0);var l=e.state.constraints;if(!l.collision.enabled)return!1;var o=n.surfaceElevationBelowEye(e,r),a=e.renderCoordsHelper.getAltitude(r.eye),s=o+l.collision.elevationMargin;if(a>=s)return!1;var v=t.vec3.length(r.eye);if(t.vec3.subtract(c,r.center,r.eye),e.renderCoordsHelper.setAltitude(s,r.eye),1===i)t.vec3.add(r.center,r.eye,c);else if(2===i){var d=(v-a+s)/v;t.vec3.scale(r.center,r.center,d)}return r.markViewDirty(),!0};var c=i.vec3f64.create()}));