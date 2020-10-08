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

define(["require","exports","../../../core/Logger","../../../core/mathUtils","../../../core/mathUtils","../../../core/promiseUtils","../../../core/watchUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec2","../../../core/libs/gl-matrix-2/vec2f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../geometry/support/geodesicConstants","./atmosphereUtils","./SimpleAtmosphereTechnique","./resources/SimpleAtmosphereTexture","../support/imageUtils","../support/mathUtils","../support/buffer/glUtil","../support/buffer/InterleavedLayout","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/glUtil3D","../webgl-engine/lib/Util","../../webgl/BufferObject","../../webgl/Texture","../../webgl/Util","../../webgl/VertexArrayObject"],(function(e,t,r,i,a,n,o,s,l,c,h,u,d,p,f,m,g,v,_,C,y,x,b,q,A,U,D,V){"use strict";var R=r.getLogger("esri.views.3d.environment.SimpleAtmosphere"),w=-f.INNER_ATMOSPHERE_DEPTH,T=(p.earthRadius+w)/p.earthRadius,F=(p.earthRadius+0)/p.earthRadius,M=(p.earthRadius+3e5)/p.earthRadius,S=_.makePiecewiseLinearFunction([[50,.1015625],[500,.21875],[5e3,.51171875],[5e4,.4140625]]),j=function(){function e(e,t){this.slot=14,this._renderData={texV:h.vec2f64.create(),silCircleCenter:d.vec3f64.create(),silCircleV1:d.vec3f64.create(),silCircleV2:d.vec3f64.create(),altitudeFade:0,innerScale:0,undergroundFadeAlpha:0},this._fadeVaoCount=0,this._readyResolver=n.createResolver(),this._readyController=n.createAbortController(),this._techniqueRepository=t,this._atmosphereTechniqueConfig=new m.SimpleAtmosphereTechniqueConfiguration,this.view=e}return Object.defineProperty(e.prototype,"canRender",{get:function(){return null!=this._texture},enumerable:!1,configurable:!0}),e.prototype.when=function(){return this._readyResolver.promise},e.prototype.initializeRenderContext=function(e){var t=this,r=e.rctx;this._cameraChangeHandle=o.init(this.view,"state.camera",(function(){return e.requestRender()}),!0),this._atmosphereTechniqueConfig.geometry=0,this._atmosphereConeTechnique=this._techniqueRepository.acquireAndReleaseExisting(m.SimpleAtmosphereTechnique,this._atmosphereTechniqueConfig,this._atmosphereConeTechnique),this._atmosphereTechniqueConfig.geometry=2,this._atmosphereUndergroundTechnique=this._techniqueRepository.acquireAndReleaseExisting(m.SimpleAtmosphereTechnique,this._atmosphereTechniqueConfig,this._atmosphereUndergroundTechnique),this._vao=this._createRibbon(r),this._vaoCount=D.vertexCount(this._vao,"geometry"),this._fadeVao=b.createQuadVAO(r),this._fadeVaoCount=D.vertexCount(this._fadeVao,"geometry"),v.requestImage(g,{signal:this._readyController.signal}).then((function(i){t._texture=new U(r,{pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!0},i),e.requestRender(),t._readyController=null,t._readyResolver.resolve()})).catch((function(e){n.isAbortError(e)||R.error("Unable to initialize simple atmosphere: image request failed",e),t._readyResolver.reject()}))},e.prototype.uninitializeRenderContext=function(){this.destroy()},e.prototype.destroy=function(){this._readyResolver.reject(),this._cameraChangeHandle&&(this._cameraChangeHandle.remove(),this._cameraChangeHandle=null),this._texture&&(this._texture.dispose(),this._texture=null),this._fadeVao&&(this._fadeVao.dispose(),this._fadeVao=null),this._vao&&(this._vao.dispose(),this._vao=null),this._readyController&&(this._readyController.abort(),this._readyController=null)},e.prototype.render=function(e){if(e.slot!==this.slot||0!==e.pass)return!1;this._update(e.camera);var t=e.rctx;if(this._atmosphereConeTechnique.bindPipelineState(t),this._renderData.undergroundFadeAlpha<1){var r=this._atmosphereConeTechnique.program;t.bindProgram(r),r.setUniformMatrix4fv("proj",e.camera.projectionMatrix),r.setUniformMatrix4fv("view",e.camera.viewMatrix),r.setUniform3fv("silCircleCenter",this._renderData.silCircleCenter),r.setUniform3fv("silCircleV1",this._renderData.silCircleV1),r.setUniform3fv("silCircleV2",this._renderData.silCircleV2),r.setUniform2fv("texV",this._renderData.texV),t.bindTexture(this._texture,0),r.setUniform1i("tex",0),e.scenelightingData.setLightDirectionUniform(r),r.setUniform1f("altitudeFade",this._renderData.altitudeFade),r.setUniform1f("innerScale",this._renderData.innerScale),t.bindVAO(this._vao),t.drawArrays(4,0,this._vaoCount)}if(this._renderData.undergroundFadeAlpha>0){r=this._atmosphereUndergroundTechnique.program;t.bindProgram(r),r.setUniform1f("undergroundFadeAlpha",this._renderData.undergroundFadeAlpha),e.scenelightingData.setLightDirectionUniform(r),r.setUniform3fv("cameraPosition",e.camera.eye),t.bindVAO(this._fadeVao),t.drawArrays(5,0,this._fadeVaoCount)}return!0},e.prototype._update=function(e){var t=d.vec3f64.create(),r=p.earthRadius,n=u.vec3.length(e.eye),o=n-r;if(o<0){var s=Math.min(-o/5e3,1);this._renderData.undergroundFadeAlpha=s}else this._renderData.undergroundFadeAlpha=0;var l,h,m,g,v,_=Math.max(50,o),C=r+w;this._renderData.innerScale=(l=r+_,h=r,m=C,g=Math.sqrt(l*l-h*h),v=Math.sqrt(l*l-m*m),l*l/(g*v+h*m)-1),this._renderData.altitudeFade=f.computeInnerAltitudeFade(o),u.vec3.scale(t,e.eye,(r+50)/n),L(t,e.center,e.up,r,this._renderData);var y=H(e,t,e.up,this._renderData),x=S(o),b=.001953125,q=0+y*x*1;if(o>50){L(e.eye,e.center,e.up,r,this._renderData);var A=H(e,e.eye,e.up,this._renderData),U=i.clamp((A-1.5)/(y-1.5),0,1);b=0+U*(1-511/512)*1,q=0+1*a.lerp(1,y*x,U)}c.vec2.set(this._renderData.texV,b,q)},e.prototype._createRibbon=function(e){var t=new Float32Array(1155),r=new Uint32Array(1920);t[0]=0,t[1]=0,t[2]=-1;for(var i=0;i<128;i++){var a=9*i+3;t[a+0]=i,t[a+1]=T,t[a+2]=-1,t[a+3]=i,t[a+4]=F,t[a+5]=0,t[a+6]=i,t[a+7]=M,t[a+8]=1;var n=3*i+1,o=127===i?1:n+3,s=15*i;r[s+0]=n,r[s+1]=n+1,r[s+2]=o+1,r[s+3]=o+1,r[s+4]=o,r[s+5]=n,r[s+6]=n+1,r[s+7]=n+2,r[s+8]=o+2,r[s+9]=o+2,r[s+10]=o+1,r[s+11]=n+1,r[s+12]=n,r[s+13]=o,r[s+14]=0}var l=I.createBuffer(r.length),c=l.position;for(i=0;i<r.length;++i){var h=3*r[i];c.set(i,0,t[h]),c.set(i,1,t[h+1]),c.set(i,2,t[h+2])}return new V(e,x.Default3D,{geometry:C.glLayout(I)},{geometry:A.createVertex(e,35044,l.buffer)})},e}();function L(e,t,r,i,a){var n=u.vec3.length(e),o=i*Math.sqrt(n*n-i*i)/n,s=Math.sqrt(i*i-o*o),l=a.silCircleV1,c=a.silCircleV2;return u.vec3.scale(a.silCircleCenter,e,s/n),u.vec3.cross(l,e,t),u.vec3.squaredLength(l)<1&&u.vec3.cross(l,e,r),u.vec3.scale(l,l,o/u.vec3.length(l)),u.vec3.cross(c,l,e),u.vec3.scale(c,c,o/u.vec3.length(c)),o}var P=l.mat4f64.create(),E=d.vec3f64.create(),O=d.vec3f64.create();function H(e,t,r,i){return u.vec3.add(E,i.silCircleCenter,i.silCircleV2),u.vec3.scale(O,E,M),s.mat4.lookAt(P,t,E,r),q.project(E,P,e.projectionMatrix,e.viewport),q.project(O,P,e.projectionMatrix,e.viewport),u.vec3.distance(E,O)/e.height}var I=y.newLayout().vec3f("position");return j}));