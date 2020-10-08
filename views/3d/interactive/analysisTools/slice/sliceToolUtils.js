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

define(["require","exports","tslib","../../../../../geometry","../../../../../core/compilerUtils","../../../../../core/Logger","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/screenUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/quat","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../Manipulator3D","../../manipulatorUtils","./sliceToolConfig","../../../support/geometryUtils","../../../support/stack","../../../support/geometryUtils/vector","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryData","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Util","../../../webgl-engine/materials/ColorMaterial","../../../webgl-engine/materials/ImageMaterial","../../../webgl-engine/materials/NativeLineMaterial","../../../webgl-engine/materials/RibbonLineMaterial","../../../webgl-engine/materials/SlicePlaneMaterial"],(function(e,t,a,r,i,n,s,o,c,l,d,u,v,g,m,p,R,T,_,f,b,y,A,S,h,P,E,w,I){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DidPointerMoveRecentlyFlag=t.isAlwaysDrapedLayer=t.shapeToPlane=t.planeToShape=t.addArrowTips=t.createArrowGeometry=t.createResizeManipulator=t.createGridManipulator=t.createOutlineManipulator=t.createRotateManipulator=t.createShiftManipulator=t.isDiagonalResizeHandle=t.calculateDiagonalResizeHandleScale=t.calculateResizeHandlePadding=t.calculateScreenSpaceBasisLength2=t.updateRotateTiltHandle=t.updateRotateHeadingHandle=t.updateResizeHandle=t.updateShiftRestartHandle=t.createRotatePlane=t.calculateBoundedPlaneTranslateRotate=t.createShiftPlane=t.calculatePlaneHalfSize=t.resizePlane=t.forceHorizontalOrVertical=t.normalToBases=t.createPlane=void 0;var O=n.getLogger("esri.views.3d.interactive.analysisTools.slice.sliceToolUtils");function M(e,t,a,r,n,s){var o=v.vec3.dot(e,t),c=_.sv3d.get(),l=_.sv3d.get(),d=0===r?Math.abs(o)>R.VERTICAL_DOT_THRESHOLD?1:2:r;switch(d){case 2:var u=Math.abs(o)<=R.SMALL_ANGLE_DOT_THRESHOLD?e:a.viewUp;v.vec3.cross(c,u,t),v.vec3.copy(l,t);break;case 1:v.vec3.cross(c,a.viewUp,t),v.vec3.cross(l,t,c);break;case 3:u=Math.abs(o)<=R.SMALL_ANGLE_DOT_THRESHOLD?t:a.viewUp;v.vec3.cross(c,u,e),v.vec3.cross(l,e,c);break;default:i.neverReached(d)}var g=v.vec3.cross(_.sv3d.get(),c,l);v.vec3.dot(g,a.viewForward)>0&&v.vec3.scale(l,l,-1),v.vec3.normalize(n,c),v.vec3.normalize(s,l)}function L(e,t){switch(t){case 0:return{basis:e.basis1,direction:1,position:v.vec3.add(_.sv3d.get(),e.origin,e.basis1),edge:t};case 1:return{basis:e.basis2,direction:1,position:v.vec3.add(_.sv3d.get(),e.origin,e.basis2),edge:t};case 2:return{basis:e.basis1,direction:-1,position:v.vec3.subtract(_.sv3d.get(),e.origin,e.basis1),edge:t};case 3:return{basis:e.basis2,direction:-1,position:v.vec3.subtract(_.sv3d.get(),e.origin,e.basis2),edge:t}}}function D(e,t,a){var r=a.projectPoint(v.vec3.add(_.sv3d.get(),e,t),c.castRenderScreenPointArray3(_.sv3d.get())),i=a.projectPoint(v.vec3.subtract(_.sv3d.get(),e,t),c.castRenderScreenPointArray3(_.sv3d.get()));return v.vec3.squaredLength(v.vec3.subtract(r,r,i))}function H(e){var t=v.vec3.length(e.basis1),a=v.vec3.length(e.basis2);return R.RESIZE_HANDLE_EDGE_PADDING_FRAC*Math.min(t,a)}function F(e){return H(e)}function N(e){return 0!==e.direction[0]&&0!==e.direction[1]}function U(e,t,a){var r=function(r){var i=(r?t:e).slice(0),n=v.vec3.subtract(_.sv3d.get(),i[0],i[1]);v.vec3.normalize(n,n);var s=v.vec3.subtract(_.sv3d.get(),i[i.length-1],i[i.length-2]);if(v.vec3.normalize(s,s),a.padding>0){var c=v.vec3.scale(g.vec3f64.create(),s,-a.padding);if(i[i.length-1]=v.vec3.add(c,c,i[i.length-1]),a.bothEnds){var m=v.vec3.scale(g.vec3f64.create(),n,-a.padding);i[0]=v.vec3.add(m,m,i[0])}}var p=r?a.tipFocusMultiplier:1,R=a.tipLength*(a.focusTipLength?p:1),T=a.tipRadius*p,f=l.mat4.identity(_.sm4d.get());if(a.padding>0){var y=R/4,S=v.vec3.set(_.sv3d.get(),0,y,0),h=1+a.padding/y;l.mat4.translate(f,f,S),l.mat4.scale(f,f,v.vec3.set(_.sv3d.get(),h,h,h)),l.mat4.translate(f,f,v.vec3.scale(S,S,-1/h))}var P=l.mat4.identity(d.mat4f64.create()),E=g.vec3f64.fromValues(0,1,0),w=l.mat4.fromQuat(d.mat4f64.create(),u.quat.rotationTo(_.sq4d.get(),E,s));w[12]=i[i.length-1][0],w[13]=i[i.length-1][1],w[14]=i[i.length-1][2],l.mat4.multiply(w,w,f);var I,O,M=[{part:"tube",geometry:new b(function(e,t,a){var r=[];if(o.isSome(t))r.push([e,t.thickness/2],[-e,t.thickness/2],[-e,-t.thickness/2],[e,-t.thickness/2]);else for(var i=0;i<12;i++){var n=i/12*2*Math.PI;r.push([Math.cos(n)*e,Math.sin(n)*e])}return A.createPathExtrusionGeometry(r,a,[],[],!1)}(a.tubeRadius*(r?a.tubeFocusMultiplier:1)+a.padding,a.flat,i),"arrow-tube"),transform:P}];if(o.isSome(a.flat)?I=new b(A.createExtrudedTriangle(R,T,T,a.flat.thickness),"arrow-tip"):(I=new b(A.createConeGeometry(R,T,24,!1,!1,!0),"arrow-tip"),O=new b(A.createConeGeometry(R,T,24,!1,!0,!1),"arrow-cap")),M.push({part:"tip",geometry:I,transform:w}),O&&M.push({part:"cap",geometry:O,transform:w}),a.bothEnds){var L=l.mat4.fromQuat(d.mat4f64.create(),u.quat.rotationTo(_.sq4d.get(),E,n));L[12]=i[0][0],L[13]=i[0][1],L[14]=i[0][2],l.mat4.multiply(L,L,f),M.push({part:"tip",geometry:I,transform:L}),O&&M.push({part:"cap",geometry:O,transform:L})}return M};return{normal:r(!1),focused:r(!0)}}function C(e,t){var r=v.vec3.subtract(g.vec3f64.create(),e[e.length-1],e[e.length-2]);if(v.vec3.normalize(r,r),v.vec3.scale(r,r,R.ROTATE_HEADING_TIP_LENGTH),v.vec3.add(r,r,e[e.length-1]),t){var i=v.vec3.subtract(g.vec3f64.create(),e[0],e[1]);return v.vec3.normalize(i,i),v.vec3.scale(i,i,R.ROTATE_HEADING_TIP_LENGTH),v.vec3.add(i,i,e[0]),a.__spreadArrays([i],e,[r])}return a.__spreadArrays(e,[r])}function G(e,t){return f.angleAroundAxis(t,e.basis2,e.basis1)+V}t.createPlane=function(e,t,a,r,i,n,s,o){return M(t,s.worldUpAtPosition(e,_.sv3d.get()),i,n,o.basis1,o.basis2),v.vec3.scale(o.basis1,o.basis1,a),v.vec3.scale(o.basis2,o.basis2,r),v.vec3.copy(o.origin,e),T.plane.fromVectorsAndPoint(o.basis2,o.basis1,o.origin,o.plane),o},t.normalToBases=M,t.forceHorizontalOrVertical=function(e,t,a){var r=t.worldUpAtPosition(e.origin,_.sv3d.get()),i=e.basis1,n=G(e,r),s=Math.round(n/V)*V;return T.boundedPlane.rotate(e,s-n,i,a)},t.resizePlane=function(e,t,a,r,i,n){var s=v.vec3.copy(_.sv3d.get(),i.origin);v.vec3.add(s,s,v.vec3.scale(_.sv3d.get(),i.basis1,e.direction[0]<0?1:-1)),v.vec3.add(s,s,v.vec3.scale(_.sv3d.get(),i.basis2,e.direction[1]<0?1:-1));var o=v.vec3.length(i.basis1),c=v.vec3.length(i.basis2),l=v.vec3.subtract(_.sv3d.get(),a,s),d=v.vec3.subtract(_.sv3d.get(),t,s),u=0,g=0;if(N(e)){var m=F(i),p=F(n);u=o-.5*e.direction[0]*v.vec3.dot(i.basis1,d)/o,g=c-.5*e.direction[1]*v.vec3.dot(i.basis2,d)/c;var f=p/m;u*=f,g*=f}var b=u+.5*e.direction[0]*v.vec3.dot(i.basis1,l)/o,y=g+.5*e.direction[1]*v.vec3.dot(i.basis2,l)/c,A=v.vec3.scale(_.sv3d.get(),i.basis1,b/o),S=v.vec3.scale(_.sv3d.get(),i.basis2,y/c);(b<=0||D(n.origin,A,r)<=R.PLANE_MIN_BASIS_SCREEN_LEN2)&&v.vec3.copy(A,n.basis1),(y<=0||D(n.origin,S,r)<=R.PLANE_MIN_BASIS_SCREEN_LEN2)&&v.vec3.copy(S,n.basis2);var h=v.vec3.copy(_.sv3d.get(),s);return v.vec3.add(h,h,v.vec3.scale(_.sv3d.get(),A,e.direction[0]<0?-1:1)),v.vec3.add(h,h,v.vec3.scale(_.sv3d.get(),S,e.direction[1]<0?-1:1)),T.boundedPlane.fromValues(h,A,S,n)},t.calculatePlaneHalfSize=function(e,t){return R.INITIAL_PLANE_HALF_SIZE_VIEW_PROPORTION*Math.min(t.width,t.height)*t.computeRenderPixelSizeAt(e)},t.createShiftPlane=function(e,t,a,r){var i=v.vec3.cross(_.sv3d.get(),t,a);return v.vec3.cross(i,i,t),T.plane.fromPositionAndNormal(e,i,r)},t.calculateBoundedPlaneTranslateRotate=function(e,t){return p.calculateTranslateRotateFromBases(e.basis1,e.basis2,e.origin,t)},t.createRotatePlane=function(e,t,a,r){var i=t.worldUpAtPosition(e.origin,_.sv3d.get()),n=_.sv3d.get();switch(a){case 1:v.vec3.copy(n,i);break;case 2:v.vec3.copy(n,e.basis1)}return T.plane.fromPositionAndNormal(e.origin,n,r)},t.updateShiftRestartHandle=function(e,t,a,r){var i=L(a,2),n=_.sm4d.get();l.mat4.rotateZ(n,t,i.edge*Math.PI/2);var s=v.vec3.normalize(_.sv3d.get(),i.basis),o=v.vec3.scale(_.sv3d.get(),s,i.direction*r.computeScreenPixelSizeAt(i.position)*R.SHIFT_RESTART_OFFSET_DISTANCE);v.vec3.add(o,o,i.position);var d=r.projectPoint(o,c.castRenderScreenPointArray3(_.sv3d.get())),u=function(e,t){var a=e.viewport,r=a[0],i=a[1],n=a[2],s=a[3],o=Math.min(n,s)/16,c=!0;t[0]<r+o?(t[0]=r+o,c=!1):t[0]>r+n-o&&(t[0]=r+n-o,c=!1);t[1]<i+o?(t[1]=i+o,c=!1):t[1]>i+s-o&&(t[1]=i+s-o,c=!1);return c}(r,d);T.ray.fromRender(r,d,k),v.vec3.normalize(k.direction,k.direction);var m=_.sv3d.get();!u&&T.boundedPlane.intersectRay(a,k,m)&&(o=m),n[12]=0,n[13]=0,n[14]=0,e.modelTransform=n,e.renderLocation=g.vec3f64.clone(o),u?e.state|=z:e.state&=~z},t.updateResizeHandle=function(e,t,a,r){var i=v.vec3.length(r.basis1),n=v.vec3.length(r.basis2),s=H(r),o=F(r),c=v.vec3.set(_.sv3d.get(),0,0,0);v.vec3.add(c,v.vec3.scale(_.sv3d.get(),r.basis1,t.direction[0]),v.vec3.scale(_.sv3d.get(),r.basis2,t.direction[1])),v.vec3.add(c,r.origin,c);var d=0,u=1;if(N(t))1===t.direction[0]&&-1===t.direction[1]?d=V:1===t.direction[0]&&1===t.direction[1]?d=Math.PI:-1===t.direction[0]&&1===t.direction[1]&&(d=3*Math.PI/2),u=o;else{var g=0!==t.direction[0]?1:2;d=1===g?V:0,u=(1===g?n:i)-s}var m=l.mat4.identity(_.sm4d.get());l.mat4.rotateZ(m,m,d),l.mat4.scale(m,m,v.vec3.set(_.sv3d.get(),u,u,u)),l.mat4.multiply(m,a,m),m[12]=0,m[13]=0,m[14]=0,e.modelTransform=m,e.renderLocation=c},t.updateRotateHeadingHandle=function(e,t,a,r){var i=r.worldUpAtPosition(a.origin,_.sv3d.get()),n=L(a,0),s=l.mat4.identity(_.sm4d.get());l.mat4.rotateZ(s,s,n.edge*Math.PI/2),l.mat4.rotateX(s,s,-G(a,i)),l.mat4.multiply(s,t,s),s[12]=0,s[13]=0,s[14]=0,e.modelTransform=s,e.renderLocation=n.position},t.updateRotateTiltHandle=function(e,t,a){var r=L(a,1),i=l.mat4.identity(_.sm4d.get());l.mat4.rotateZ(i,i,r.edge*Math.PI/2),l.mat4.rotateX(i,i,V),l.mat4.multiply(i,t,i),i[12]=0,i[13]=0,i[14]=0,e.modelTransform=i,e.renderLocation=r.position},t.calculateScreenSpaceBasisLength2=D,t.calculateResizeHandlePadding=H,t.calculateDiagonalResizeHandleScale=F,t.isDiagonalResizeHandle=N,t.createShiftManipulator=function(e){var r=[g.vec3f64.fromValues(0,0,-R.SHIFT_RESTART_ARROW_LENGTH/2),g.vec3f64.fromValues(0,0,R.SHIFT_RESTART_ARROW_LENGTH/2)],i=C(r,!0),n=function(e,t){return U(r,r,{tubeRadius:R.SHIFT_RESTART_TUBE_RADIUS,tipRadius:R.SHIFT_RESTART_TIP_RADIUS,tipLength:R.SHIFT_RESTART_TIP_LENGTH,tubeFocusMultiplier:R.SHIFT_RESTART_TUBE_FOCUS_MULTIPLIER,tipFocusMultiplier:R.SHIFT_RESTART_TIP_FOCUS_MULTIPLIER,padding:e,bothEnds:!0,flat:null,focusTipLength:!0,addCap:t})},s=n(0,!1),o=n(R.SHIFT_RESTART_ARROW_OUTLINE_WIDTH,!0),c=new h({color:R.SHIFT_RESTART_ARROW_TIP_COLOR,cullFace:2},"slice-shift");c.renderOccluded=16;var l=new h({color:R.SHIFT_RESTART_ARROW_CAP_COLOR,cullFace:2},"slice-shift");l.renderOccluded=16;var d=new h({color:R.SHIFT_RESTART_TUBE_COLOR,cullFace:2},"slice-shift");d.renderOccluded=16;var u=new h({color:R.SHIFT_RESTART_OUTLINE_COLOR,transparent:!0,writeDepth:!1,cullFace:1},"slice-shift");u.renderOccluded=2;var v=new b(A.createPolylineGeometry([[0,0,0],[-R.SHIFT_RESTART_OFFSET_DISTANCE,0,0]]),"slice-rotate-heading"),p=new b(A.createPolylineGeometry([[0,0,0],[-R.SHIFT_RESTART_OFFSET_DISTANCE,0,0]]),"slice-rotate-heading"),T=new E({color:R.SHIFT_RESTART_CALLOUT_COLOR},"slice-rotate-heading");return T.renderOccluded=4,new m.Manipulator3D({view:e,renderObjects:a.__spreadArrays(s.normal.map((function(e){var a=e.part,r=e.geometry,i=e.transform;return{geometry:r,material:"tip"===a?c:"cap"===a?l:d,transform:i,stateMask:1|t.DidPointerMoveRecentlyFlag}})),o.normal.map((function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:u,transform:r,stateMask:1|t.DidPointerMoveRecentlyFlag}})),[{geometry:v,material:T,stateMask:1|t.DidPointerMoveRecentlyFlag|z}],s.focused.map((function(e){var a=e.part,r=e.geometry,i=e.transform;return{geometry:r,material:"tip"===a?c:"cap"===a?l:d,transform:i,stateMask:2|t.DidPointerMoveRecentlyFlag}})),o.focused.map((function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:u,transform:r,stateMask:2|t.DidPointerMoveRecentlyFlag}})),[{geometry:p,material:T,stateMask:2|t.DidPointerMoveRecentlyFlag|z}]),autoScaleRenderObjects:!1,collisionType:{type:"line",paths:[i]},collisionPriority:1,radius:R.SHIFT_RESTART_TIP_RADIUS,state:t.DidPointerMoveRecentlyFlag})},t.createRotateManipulator=function(e,a){var r=new P({transparent:!0,writeDepth:!1,textureId:a.id},"slice-rotate"),i=R.ROTATE_HEADING_OFFSET_DISTANCE,n=R.ROTATE_HEADING_DISC_RADIUS,s=n*R.ROTATE_HEADING_DISC_RADIUS_FOCUS_MULTIPLIER,o=function(e){var t,a,r=new Uint32Array([0,1,2,2,3,0]);return new b(new y.GeometryData(((t={})[S.VertexAttrConstants.POSITION]={size:3,data:new Float32Array([i-e,-e,0,i+e,-e,0,i+e,e,0,i-e,e,0])},t[S.VertexAttrConstants.UV0]={size:2,data:new Float32Array([0,0,1,0,1,1,0,1])},t),((a={})[S.VertexAttrConstants.POSITION]=r,a[S.VertexAttrConstants.UV0]=r,a)))};r.renderOccluded=16;var c=new b(A.createPolylineGeometry([[0,0,0],[i-n,0,0]]),"slice-rotate-heading"),l=new b(A.createPolylineGeometry([[0,0,0],[i-s,0,0]]),"slice-rotate-heading"),d=new E({color:R.ROTATE_HEADING_CALLOUT_COLOR},"slice-rotate-heading");d.renderOccluded=4;var u=[{geometry:o(n),material:r,stateMask:1|t.DidPointerMoveRecentlyFlag},{geometry:c,material:d,stateMask:1|t.DidPointerMoveRecentlyFlag},{geometry:o(s),material:r,stateMask:2|t.DidPointerMoveRecentlyFlag},{geometry:l,material:d,stateMask:2|t.DidPointerMoveRecentlyFlag}];return new m.Manipulator3D({view:e,renderObjects:u,autoScaleRenderObjects:!1,collisionType:{type:"disc",direction:[0,0,1],offset:[i,0,0]},collisionPriority:1,radius:n/2,state:t.DidPointerMoveRecentlyFlag})},t.createOutlineManipulator=function(e){var t=new b(A.createPolylineGeometry([[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0],[-1,-1,0]]),"slice-outline"),r=a.__spreadArrays(R.PLANE_OUTLINE_COLOR),i=new w({color:r,writeDepth:!1,width:R.PLANE_OUTLINE_WIDTH},"slice-outline");return i.renderOccluded=4,{manipulator:new m.Manipulator3D({view:e,renderObjects:[{geometry:t,material:i}],interactive:!1,autoScaleRenderObjects:!1,worldSized:!0}),material:i}},t.createGridManipulator=function(e){var t=new b(A.createSquareGeometry(),"slice-grid"),r=a.__spreadArrays(R.PLANE_BACKGROUND_COLOR),i=new I({backgroundColor:r,gridColor:R.GRID_COLOR,gridWidth:4},"slice-grid");return i.renderOccluded=4,{manipulator:new m.Manipulator3D({view:e,renderObjects:[{geometry:t,material:i}],interactive:!1,autoScaleRenderObjects:!1,worldSized:!0}),material:i}},t.createResizeManipulator=function(e,t){var r=N(t),i=r?[g.vec3f64.fromValues(1,0,0),g.vec3f64.fromValues(0,0,0),g.vec3f64.fromValues(0,1,0)]:[g.vec3f64.fromValues(1,0,0),g.vec3f64.fromValues(-1,0,0)],n=new b(A.createPolylineGeometry(i),"slice-resize"),s=a.__spreadArrays(R.HANDLE_COLOR,[1]),o=r?R.RESIZE_HANDLE_CORNER_WIDTH:R.RESIZE_HANDLE_EDGE_WIDTH,c=o*R.DISPLAY_FOCUS_MULTIPLIER,l=function(e){return e>1?function(e){var t=new w({color:s,width:e},"slice-resize");return t.renderOccluded=4,t}(e):((t=new E({color:s},"slice-resize")).renderOccluded=4,t);var t};return new m.Manipulator3D({view:e,renderObjects:[{geometry:n,material:l(o),stateMask:1},{geometry:n,material:l(c),stateMask:2}],collisionType:{type:"line",paths:[i]},autoScaleRenderObjects:!1,worldSized:!0,radius:r?R.RESIZE_HANDLE_CORNER_INPUT_RADIUS:R.RESIZE_HANDLE_EDGE_INPUT_RADIUS})},t.createArrowGeometry=U,t.addArrowTips=C,t.planeToShape=function(e,t,a,i){if(o.isNone(e))return null;var n=o.isSome(i.position)?i.position:new r.Point;t.fromRenderCoords(e.origin,n,a),i.position=n;var c=t.worldUpAtPosition(e.origin,_.sv3d.get()),l=t.worldBasisAtPosition(e.origin,1,_.sv3d.get());return i.width=2*v.vec3.length(e.basis1),i.height=2*v.vec3.length(e.basis2),i.tilt=s.rad2deg(G(e,c)),i.heading=s.rad2deg(function(e,t,a){return f.angleAroundAxis(e.basis1,a,t)-V}(e,c,l)),i},t.shapeToPlane=function(e,t,a){return o.isNone(e)||o.isNone(e.position)?null:t.toRenderCoords(e.position,a.origin)?(t.worldBasisAtPosition(a.origin,0,a.basis1),t.worldBasisAtPosition(a.origin,1,a.basis2),T.plane.fromVectorsAndPoint(a.basis2,a.basis1,a.origin,a.plane),T.boundedPlane.rotate(a,-s.deg2rad(e.heading),T.boundedPlane.normal(a),a),T.boundedPlane.rotate(a,s.deg2rad(e.tilt),a.basis1,a),v.vec3.scale(a.basis1,a.basis1,e.width/2),v.vec3.scale(a.basis2,a.basis2,e.height/2),T.boundedPlane.updateUnboundedPlane(a),a):(O.error("Failed to project slice plane position, projection from "+e.position.spatialReference.wkid+" is not supported"),null)},t.isAlwaysDrapedLayer=function(e){switch(e.type){case"building-scene":case"csv":case"feature":case"geo-rss":case"geojson":case"graphics":case"group":case"integrated-mesh":case"kml":case"map-notes":case"ogc-feature":case"point-cloud":case"route":case"scene":case"stream":case"unknown":case"unsupported":case null:return!1;case"base-dynamic":case"base-elevation":case"base-tile":case"bing-maps":case"elevation":case"imagery":case"imagery-tile":case"map-image":case"open-street-map":case"tile":case"vector-tile":case"wcs":case"web-tile":case"wms":case"wmts":return!0;default:return i.neverReached(e.type),!1}},t.DidPointerMoveRecentlyFlag=16;var z=32,k=T.ray.create(),V=Math.PI/2}));