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

define(["require","exports","../../../../core/compilerUtils","../../../../core/Logger","../../../../core/maybe","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","./graphicSymbolUtils","../../webgl-engine/materials/HUDMaterial"],(function(e,t,r,n,a,l,c,i,o,s,f,m){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.get=void 0;var h=n.getLogger("esri.views.3d.layers.graphics.labelPlacement");function p(e){var t=e.graphics3DGraphic.graphics3DSymbol,r=f.getGraphics3DSymbol(t);return a.isSome(r)?r.symbol.symbolLayers.getItemAt(0):null}function u(e,t){return"the requested label placement '"+e+"' is currently unsupported for "+t+" in SceneView"}function b(e){var t=e.graphics3DGraphic.graphic.geometry;if(a.isNone(t))return null;var n=t.type;switch(n){case"polyline":case"extent":case"multipoint":return{placement:"center-center",normalizedOffset:null,anchor:"center"};case"polygon":var l=p(e);return a.isSome(l)&&"extrude"===l.type?O["above-center"]:{placement:"center-center",normalizedOffset:null,anchor:"center"};case"point":case"mesh":return O["above-center"];default:return void r.neverReached(n)}}function g(e,t,r){var n=r.graphics3DGraphic._graphics[0],l=a.isSome(n)?n.getBoundingBoxObjectSpace(L):L,o=i.vec3f64.fromValues(l[3]-l[0],l[4]-l[1],l[5]-l[2]),s=Math.sqrt(o[0]*o[0]+o[1]*o[1]);e.centerOffset[0]=s/2*t.normalizedOffset[0];var f=e.translation[2],m=o[2]/2*t.normalizedOffset[1];e.translation[2]=0,e.elevationOffset=f+m;var h=c.vec3.length(o);e.centerOffset[2]=h/2*t.normalizedOffset[2]}function v(e){return{screenLength:e.screenLength,minWorldLength:e.minWorldLength,maxWorldLength:e.maxWorldLength}}t.get=function(e){var t=function(e){var t=e.labelClass.labelPlacement,r=e.labelSymbol,n=e.graphics3DGraphic,l=f.getGraphics3DSymbol(n.graphics3DSymbol),c=a.isSome(l)?l.symbol:null,i=O[t]||b(e);if("point-3d"===c.type&&c.supportsCallout()&&c.hasVisibleVerticalOffset()&&!n.isDraped)return{placement:null,hasLabelVerticalOffset:!1,verticalOffset:v(c.verticalOffset),anchor:null,normalizedOffset:null};if(r&&r.hasVisibleVerticalOffset()&&("point-3d"!==c.type||!c.supportsCallout()||!c.verticalOffset||n.isDraped))return function(e){switch(e){case"above-center":return!0;default:return!1}}(i.placement)?{placement:"above-center",verticalOffset:v(r.verticalOffset),anchor:"bottom",normalizedOffset:[0,i.normalizedOffset[1],0],hasLabelVerticalOffset:!0}:(h.errorOncePerTick("Callouts and vertical offset on labels are currently only supported with 'above-center' label placement (not with "+t+" placement)"),null);return{placement:null,verticalOffset:null,anchor:null,normalizedOffset:null,hasLabelVerticalOffset:!1}}(e);if(a.isNone(t))return null;var n=function(e,t){if(t.anchor)return t;var n=e.labelClass.labelPlacement,l=O[n],c=l||b(e);n&&!l&&h.warnOncePerTick("the requested label placement '"+n+"' is not currently supported in SceneView");return function(e,t){var n=t.graphics3DGraphic.graphic.geometry;if(a.isNone(n))return null;if(a.isSome(t.disablePlacement)){return t.labelClass.labelPlacement?(h.warnOncePerTick(u(e.placement,t.disablePlacement.logEntityDescription)),b(t)):e}var l=n.type;switch(l){case"polyline":case"polygon":case"extent":case"multipoint":if(t.labelClass.labelPlacement)return h.warnOncePerTick(u(e.placement,"'"+l+"' geometries")),b(t);break;case"point":case"mesh":return e;default:r.neverReached(l)}return e}(c,e)}(e,t);if(a.isNone(n))return null;var c=n.anchor,d=!!t.hasLabelVerticalOffset;return function(e,t,r){var n=r.graphics3DGraphic.graphic.geometry;if(a.isNone(n))return null;switch(n.type){case"point":!function(e,t,r){var n=p(r);if(a.isNone(n))return;switch(r.graphics3DGraphic.getCenterObjectSpace(e.translation),n.type){case"icon":case"text":!function(e,t,r){var n=r.graphics3DGraphic,l=n._graphics[0],c=a.isSome(l)?l.getScreenSize():null;if(!n.isDraped&&a.isSome(c)){var i=function(e,t){void 0===t&&(t=w);var r=e.graphics3DGraphic._graphics[0],n=a.isSome(r)?r.stageObject.geometryRecords[0].material:null;if(n&&n instanceof m.default){var l=n.getParameters().anchorPos;t[0]=2*(l[0]-.5),t[1]=2*(l[1]-.5)}else t[0]=0,t[1]=0;return t}(r);S[0]=c[0]/2*(t.normalizedOffset[0]-i[0]),S[1]=c[1]/2*(t.normalizedOffset[1]-i[1]),e.screenOffset[0]=S[0],e.hasLabelVerticalOffset?(e.centerOffset[1]=S[1],e.centerOffsetUnits="screen"):e.screenOffset[1]=S[1]}else e.hasLabelVerticalOffset||"center"===e.anchor||(O[r.labelClass.labelPlacement]&&h.warnOncePerTick("the requested placement '"+t.placement+"' is currently unsupported for draped graphics"),e.anchor="center")}(e,t,r);break;case"object":g(e,t,r)}}(e,t,r);break;case"polygon":!function(e,t,r){var n=p(r);if(a.isNone(n))return;switch(n.type){case"extrude":var l=r.graphics3DGraphic._graphics[0];a.isSome(l)&&l.getBoundingBoxObjectSpace(L),s.center(L,e.translation),e.translation[2]=s.height(L)/2,g(e,t,r)}}(e,t,r);break;case"mesh":g(e,t,r)}return e}({anchor:c,verticalOffset:t.verticalOffset,screenOffset:l.vec2f64.create(),centerOffset:o.vec4f64.fromValues(0,0,0,-1),centerOffsetUnits:"world",translation:i.vec3f64.create(),elevationOffset:0,hasLabelVerticalOffset:d},n,e)};var O={"above-center":{placement:"above-center",normalizedOffset:[0,1,0],anchor:"bottom"},"above-left":{placement:"above-left",normalizedOffset:[-1,1,0],anchor:"bottom-right"},"above-right":{placement:"above-right",normalizedOffset:[1,1,0],anchor:"bottom-left"},"below-center":{placement:"below-center",normalizedOffset:[0,-1,2],anchor:"top"},"below-left":{placement:"below-left",normalizedOffset:[-1,-1,0],anchor:"top-right"},"below-right":{placement:"below-right",normalizedOffset:[1,-1,0],anchor:"top-left"},"center-center":{placement:"center-center",normalizedOffset:[0,0,1],anchor:"center"},"center-left":{placement:"center-left",normalizedOffset:[-1,0,0],anchor:"right"},"center-right":{placement:"center-right",normalizedOffset:[1,0,0],anchor:"left"}},d={"above-center":["default","esriServerPointLabelPlacementAboveCenter"],"above-left":["esriServerPointLabelPlacementAboveLeft"],"above-right":["esriServerPointLabelPlacementAboveRight"],"below-center":["esriServerPointLabelPlacementBelowCenter"],"below-left":["esriServerPointLabelPlacementBelowLeft"],"below-right":["esriServerPointLabelPlacementBelowRight"],"center-center":["esriServerPointLabelPlacementCenterCenter"],"center-left":["esriServerPointLabelPlacementCenterLeft"],"center-right":["esriServerPointLabelPlacementCenterRight"]},y=function(e){var t=d[e],r=O[e];t.forEach((function(e){O[e]=r}))};for(var P in d)y(P);Object.freeze&&(Object.freeze(O),Object.keys(O).forEach((function(e){Object.freeze(O[e]),Object.freeze(O[e].normalizedOffset)})));var S=[0,0],w=[0,0],L=s.create()}));