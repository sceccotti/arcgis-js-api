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

define(["require","exports","tslib","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/scheduling","../../../../../core/screenUtils","../../../../../core/watchUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../core/libs/gl-matrix-2/math/common","../../../../../support/elevationInfoUtils","../../Manipulator3D","../../manipulatorUtils","../dragEventPipeline3D","../manipulations/config","../../../support/geometryUtils","../../../support/mathUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/materials/ColorMaterial","../../../../interactive/dragEventPipeline"],(function(t,e,a,r,i,n,o,s,l,c,u,d,g,h,p,m,R,f,D,S,_,I,v,A,y,T,E){"use strict";var M;Object.defineProperty(e,"__esModule",{value:!0}),e.GraphicScaleRotateTransform=void 0,function(t){t.ScaleIn=32,t.ScaleOut=64,t.RotateLeft=128,t.RotateRight=256,t.Unlocked=1024,t.DelayedFocused=2048,t.TouchInput=32768}(M||(M={}));var N=function(){function t(t){var e=this;this.mode=null,this._handles=new i,this._scaleRotateDragData=null,this._activeAnimation=null,this.events=new r,this.getFocused=function(){return e.ringManipulator.focused},this.getScale=function(){return o.isSome(e._scaleRotateDragData)&&"scale"===e._scaleRotateDragData.mode?e._scaleRotateDragData.scale:1},this.tool=t.tool,this.mode=t.mode,this.createManipulator(),this.updateDragState(),this.updateManipulatorTransform()}return t.prototype.destroy=function(){o.isSome(this._activeAnimation)&&(this._activeAnimation.frameTask.remove(),this._activeAnimation=null),this._handles.removeAll(),this.tool.manipulators.remove(this.ringManipulator),this.ringManipulator=null},t.prototype.startAnimation=function(t){var e=this;this.cancelActiveAnimation(),t.start();var r=s.addFrameTask({update:function(a){var r=a.deltaTime;t.update(r)&&e.cancelActiveAnimation()}});this._activeAnimation=a.__assign(a.__assign({},t),{frameTask:r})},t.prototype.cancelActiveAnimation=function(){o.isSome(this._activeAnimation)&&(this._activeAnimation.frameTask.remove(),this._activeAnimation.destroy(),this._activeAnimation=null)},t.prototype.forEachManipulator=function(t){t(this.ringManipulator,2)},t.prototype.createManipulator=function(){var t=this;this.ringManipulator=this.createRingManipulator(),this.tool.manipulators.add(this.ringManipulator);var e=this.ringManipulator,a=this.tool.graphicState.graphic,r=E.createManipulatorDragEventPipeline(e,(function(e,r,i){t._scaleRotateDragData=null;var s=function(t,e){var a=t.allLayerViews.find((function(t){return t.layer===e.layer}));if(o.isNone(e.symbol))return null;var r=e.symbol;return{symbolLayers:r.symbolLayers.map((function(t){var e=null;return"object"===t.type&&(e=t.heading),{heading:e,size:a.getSymbolLayerSize(r,t)}})).toArray()}}(t.tool.view,a);if(o.isNone(s))return t.updateDragState(),null;var l={mode:"none",origin:h.vec3f64.clone(e.renderLocation),angle:0,startAngle:t.tool.symbolRotationAngle,angleDir:0,scale:1,scaleDir:0,startSymbolData:s};t._scaleRotateDragData=l,t.updateDragState();var c=v.sv3d.get();t.tool.view.renderCoordsHelper.worldUpAtPosition(e.renderLocation,c),r.next(D.screenToRenderPlane(t.tool.view,_.plane.fromPositionAndNormal(e.renderLocation,c))).next((function(e){var r=_.plane.normal(e.plane),i=f.calculateInputRotationTransform(e.renderStart,e.renderEnd,l.origin,r),s=I.cyclicalPI.shortestSignedDiff(l.angle,i);l.angleDir=n.clamp(l.angleDir+s,-S.ROTATE_INDICATOR_DIRECTION_BUFFER,S.ROTATE_INDICATOR_DIRECTION_BUFFER),l.angle=i;var c=function(t,e){var a=g.vec3.subtract(v.sv3d.get(),e.renderStart,t.origin),r=g.vec3.subtract(v.sv3d.get(),e.renderEnd,t.origin),i=g.vec3.length(a),n=g.vec3.length(r);if(0===i)return 0;return n/i}(l,e),u=c-l.scale;if(l.scaleDir=n.clamp(l.scaleDir+u,-S.SCALE_INDICATOR_DIRECTION_BUFFER,S.SCALE_INDICATOR_DIRECTION_BUFFER),l.scale=c,t.onScaleChanged(),"none"===l.mode){var d=t.mode||function(t,e,a,r){var i=t.renderStart,n=t.renderEnd,o=b(i,r,v.sv3d.get()),s=b(n,r,v.sv3d.get());if(g.vec3.squaredDistance(o,s)<S.DRAG_THRESHOLD_PX*S.DRAG_THRESHOLD_PX)return null;var l=g.vec3.subtract(v.sv3d.get(),i,a),c=g.vec3.cross(v.sv3d.get(),l,e),u=i,d=g.vec3.add(v.sv3d.get(),u,c),h=b(a,r,v.sv3d.get()),p=o,m=b(d,r,v.sv3d.get()),R=g.vec3.subtract(v.sv3d.get(),m,p),f=g.vec3.subtract(v.sv3d.get(),o,h),D=_.ray.wrap(p,R),I=_.ray.wrap(h,f);if(_.ray.distance2(D,s)<_.ray.distance2(I,s))return"rotate";return"scale"}(e,e.plane,l.origin,t.tool.view.state.camera);if(o.isSome(d)){switch(d){case"rotate":t.tool.emit("graphic-rotate-start",{graphic:a,angle:l.angle});break;case"scale":t.tool.emit("graphic-scale-start",{graphic:a,scale:l.scale})}l.mode=d}}if(t.updateDragState(),o.isSome(a.symbol)){var h=a.symbol.clone(),p=0,m=1;switch(l.mode){default:case"none":break;case"scale":m=l.scale;break;case"rotate":p=l.angle}t.applySymbolData(h,l.startSymbolData,p,m),a.symbol=h,t.updateManipulatorTransform()}switch(e.action){case"start":case"update":switch(l.mode){case"rotate":t.tool.emit("graphic-rotate",{graphic:a,angle:l.angle});break;case"scale":t.tool.emit("graphic-scale",{graphic:a,scale:l.scale})}break;case"end":switch(l.mode){case"rotate":t.tool.emit("graphic-rotate-stop",{graphic:a,angle:l.angle});break;case"scale":t.tool.emit("graphic-scale-stop",{graphic:a,scale:l.scale});break;default:case"none":}}"end"===e.action&&(t.startAnimation(O(t,(function(){return t.onScaleChanged()}))),t._scaleRotateDragData=null,t.updateDragState())})),i.next(E.resetSymbol(a)).next((function(){if(o.isSome(t._scaleRotateDragData)){switch(t._scaleRotateDragData.mode){case"none":break;case"rotate":t.tool.emit("graphic-rotate-stop",{graphic:a,angle:t._scaleRotateDragData.startAngle});break;case"scale":t.tool.emit("graphic-scale-stop",{graphic:a,scale:1})}t.startAnimation(O(t,(function(){return t.onScaleChanged()}))),t._scaleRotateDragData=null}}))}));this._handles.add(r),this._handles.add([this.ringManipulator.events.on("focus-changed",(function(e){var a,r,i,n,o;"focus"===e.action?t.startAnimation((a=t,r=function(){return t.updateDelayedFocusedState()},i=0,n=null,o=function(){return!1},{start:function(){n=a.getFocused,a.getFocused=o,i=0,r()},update:function(t){return i+=t,!n()||i>S.RING_INDICATOR_DELAY_MS?1:0},destroy:function(){a.getFocused=n,r()}})):t.updateDelayedFocusedState()})),this.ringManipulator.events.on("immediate-click",(function(t){t.stopPropagation()})),c.init(this.tool.graphicState,"displaying",(function(e){return t.ringManipulator.available=e})),this.tool.graphicState.on("changed",(function(){return f.placeAtGraphic(t.tool.view,t.ringManipulator,a)}))]),f.placeAtGraphic(this.tool.view,this.ringManipulator,a)},t.prototype.onScaleChanged=function(){this.events.emit("scale-changed"),this.updateManipulatorTransform()},t.prototype.updateDelayedFocusedState=function(){this.ringManipulator.updateStateEnabled(M.DelayedFocused,this.getFocused())},t.prototype.updateDragState=function(){if(this.ringManipulator.updateStateEnabled(M.Unlocked,!(o.isSome(this._scaleRotateDragData)&&"none"!==this._scaleRotateDragData.mode)),o.isSome(this._scaleRotateDragData))switch(this._scaleRotateDragData.mode){case"rotate":this.ringManipulator.updateStateEnabled(M.ScaleIn|M.ScaleOut,!1),this.ringManipulator.updateStateEnabled(M.RotateLeft,this._scaleRotateDragData.angleDir<0),this.ringManipulator.updateStateEnabled(M.RotateRight,this._scaleRotateDragData.angleDir>=0);break;case"scale":this.ringManipulator.updateStateEnabled(M.RotateLeft|M.RotateRight,!1),this.ringManipulator.updateStateEnabled(M.ScaleIn,this._scaleRotateDragData.scaleDir<0),this.ringManipulator.updateStateEnabled(M.ScaleOut,this._scaleRotateDragData.scaleDir>=0)}else this.ringManipulator.updateStateEnabled(M.ScaleIn|M.ScaleOut|M.RotateLeft|M.RotateRight,!1)},t.prototype.updateManipulatorTransform=function(){var t=u.mat4.identity(v.sm4d.get()),e=this.tool.symbolRotationAngle;u.mat4.rotate(t,t,e,h.vec3f64.fromValues(0,0,1));var a=this.getScale(),r=u.mat4.fromScaling(v.sm4d.get(),g.vec3.set(v.sv3d.get(),a,a,a)),i=u.mat4.identity(v.sm4d.get());u.mat4.multiply(i,r,t),this.ringManipulator.modelTransform=i},t.prototype.createRingManipulator=function(){for(var t=function(t,e,a){for(var r=[],i=Math.ceil(S.GEOMETRY_SEGMENTS*(e-t)/(2*Math.PI)),n=0;n<i+1;n++){var o=t+n*(e-t)/i;r.push(h.vec3f64.fromValues(a*Math.cos(o),a*Math.sin(o),0))}return r},e=function(e){return t(0,2*Math.PI,e)},r=function(t,e){return new A(y.createPathExtrusionGeometry(function(t){return[[-t/2,0],[t/2,0],[t/2,S.RING_HEIGHT/2],[-t/2,S.RING_HEIGHT/2]]}(e),t,[],[],!1),"graphic-transform-ring")},i=e(S.RING_RADIUS),n=r(i,S.RING_THICKNESS),o={left:[],right:[]},s=[],l=0;l<2;l++){var c=(N=l*Math.PI-Math.PI/4)+(b=Math.PI/2-S.ROTATE_INDICATOR_ARC_LENGTH),g=N+Math.PI/2-b,p=r(O=t(c,g,S.INNER_INDICATOR_RADIUS),S.INDICATOR_THICKNESS);s.push(O),s.push(t(c,g,S.OUTER_INDICATOR_RADIUS-S.RING_THICKNESS/2)),o.left.push(p),o.right.push(p);for(var f=0;f<2;f++){var D=0===f,_=d.mat4f64.create();if(D){u.mat4.scale(_,_,[1,-1,1]),u.mat4.rotate(_,_,-c,[0,0,1]);var I=Math.round(S.ROTATE_INDICATOR_ARROW_PLACEMENT_PERCENTAGE*(O.length-1));_[12]=O[I][0],_[13]=O[I][1],_[14]=O[I][2]}else{u.mat4.rotate(_,_,g,[0,0,1]);I=Math.round((1-S.ROTATE_INDICATOR_ARROW_PLACEMENT_PERCENTAGE)*(O.length-1));_[12]=O[I][0],_[13]=O[I][1],_[14]=O[I][2]}var v=y.createExtrudedTriangle(S.ROTATE_INDICATOR_ARROW_TIP_LENGTH,0,S.ROTATE_INDICATOR_ARROW_TIP_RADIUS,S.RING_HEIGHT);y.transformInPlace(v,_);var T=new A(v,"graphic-transform-ring-rotate");(D?o.left:o.right).push(T)}}var E=[];for(l=0;l<2;l++){c=(N=l*Math.PI-Math.PI/4)+(b=Math.PI/2-S.SCALE_INDICATOR_ARC_LENGTH),g=N+Math.PI/2-b;var N,b,O=t(c,g,S.OUTER_INDICATOR_RADIUS);E.push(r(O,S.INDICATOR_THICKNESS))}var C=e(S.RING_RADIUS+S.SCALE_INDICATOR_OFFSET1),F=e(S.RING_RADIUS+S.SCALE_INDICATOR_OFFSET2),w=r(C,S.INDICATOR_THICKNESS),P=r(F,S.INDICATOR_THICKNESS),G=e(S.RING_RADIUS-S.SCALE_INDICATOR_OFFSET1),L=e(S.RING_RADIUS-S.SCALE_INDICATOR_OFFSET2),k=r(G,S.INDICATOR_THICKNESS),U=r(L,S.INDICATOR_THICKNESS),H=this.createMaterial(),x=this.createMaterial(.66),K=this.createMaterial(.5),z=this.createMaterial(.33),j=[{geometry:n,material:H,stateMask:M.DelayedFocused},{geometry:n,material:K,stateMask:0}];this.mode&&"scale"!==this.mode||(j=j.concat([{geometry:E,material:H,stateMask:M.DelayedFocused|M.Unlocked},{geometry:w,material:x,stateMask:M.DelayedFocused|M.ScaleIn},{geometry:P,material:z,stateMask:M.DelayedFocused|M.ScaleIn},{geometry:k,material:x,stateMask:M.DelayedFocused|M.ScaleOut},{geometry:U,material:z,stateMask:M.DelayedFocused|M.ScaleOut}])),this.mode&&"rotate"!==this.mode||(j=j.concat([{geometry:o.right,material:H,stateMask:M.DelayedFocused|M.Unlocked},{geometry:o.left,material:H,stateMask:M.DelayedFocused|M.RotateLeft},{geometry:o.right,material:H,stateMask:M.DelayedFocused|M.RotateRight}]));var B=a.__spreadArrays([i],s);return new R.Manipulator3D({view:this.tool.view,renderObjects:j,autoScaleRenderObjects:!1,worldOriented:!0,radius:S.RING_THICKNESS,focusMultiplier:1,touchMultiplier:1.5,elevationInfo:m.getGraphicEffectiveElevationInfo(this.tool.graphicState.graphic),collisionType:{type:"ribbon",paths:B,direction:h.vec3f64.fromValues(0,0,1)}})},t.prototype.createMaterial=function(t){void 0===t&&(t=1);var e=a.__spreadArrays(S.HANDLE_COLOR,[t]),r=new T({color:e,transparent:1!==t,cullFace:2},"graphic-transform");return r.renderOccluded=2,r},t.prototype.applySymbolData=function(t,e,a,r){var i=this;t.symbolLayers.forEach((function(t,n){var s=e.symbolLayers[n],l=s.heading,c=s.size;"object"===t.type&&(t.heading=(o.isSome(l)?l:0)-p.toDegree(a),o.isSome(c)&&"width"in c&&(c.width=i.enforceNonZeroSize(c.width),c.height=i.enforceNonZeroSize(c.height),c.depth=i.enforceNonZeroSize(c.depth),t.width=c.width*r,t.depth=c.depth*r,t.height=c.height*r))}))},t.prototype.enforceNonZeroSize=function(t){return t||this.tool.view.state.camera.computeRenderPixelSizeAt(this.ringManipulator.renderLocation)},Object.defineProperty(t.prototype,"test",{get:function(){return{ringManipulator:this.ringManipulator}},enumerable:!1,configurable:!0}),t}();function b(t,e,a){var r=e.projectPoint(t,l.castRenderScreenPointArray(C)),i=e.renderToScreen(r,F);return g.vec3.set(a,i[0],i[1],0)}function O(t,e){var a=null,r=1,i=function(){return r};return{start:function(){r=t.getScale(),a=t.getScale,t.getScale=i,e()},update:function(t){return r+=((r+1)/2-r)*Math.min(t*S.RING_RESET_ANIMATION_SPEED_FACTOR,1),e(),Math.abs(r-1)<.01?1:0},destroy:function(){t.getScale=a,e()}}}e.GraphicScaleRotateTransform=N;var C=h.vec3f64.create(),F=l.createScreenPointArray()}));