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

define(["require","exports","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../core/libs/gl-matrix-2/vec4f64","../../../../../geometry/support/aaBoundingBox","../../../support/debugFlags","../../../support/buffer/glUtil","../../core/shaderLibrary/output/OutputHighlight.glsl","../Camera","../DefaultVertexAttributeLocations","../intersectorUtils","../Util","./InstanceData","./InstanceOctree","./LevelSelector","./RenderInstanceData","../../materials/DefaultMaterial","../../materials/internal/MaterialUtil","../../materials/renderers/utils","../../../../webgl/BufferObject","../../../../webgl/Util","../../../../webgl/VertexArrayObject"],(function(e,t,n,r,a,i,s,o,l,c,u,d,h,f,p,g,m,b,v,y,_,I,D,C){Object.defineProperty(t,"__esModule",{value:!0});var x=function(e){var t=e.baseBoundingSphere.radius,n=e.levels.map((function(e){return e.minScreenSpaceRadius}));return new m.LevelSelector(t,n)};t.setLevelSelectorFactory=function(e){x=e};var S=function(){function e(e,t){var n=e.rctx,r=t.geometry,a=t.material,i=r.data.toRenderData();this.materialRep=e.materialRep,a.setParameterValues({instancedDoublePrecision:!0});var s=a.createBufferWriter(),o=s.vertexBufferLayout,c=s.elementCount(i),u=s.allocate(c);s.write({},i,u,0),this.geometry=r,this.material=a,this.glMaterials=_.acquireMaterials(a,this.materialRep),this.vertexBufferLayout=o,this.vbo=I.createVertex(n,35044,u.buffer),this.vao=new C(n,d.Default3D,{geometry:l.glLayout(o)},{geometry:this.vbo}),this.vertexCount=c}return e.prototype.destroy=function(){_.releaseMaterials(this.material,this.materialRep),this.vbo.dispose(),this.vao.dispose()},Object.defineProperty(e.prototype,"boundingInfo",{get:function(){return this.geometry.boundingInfo},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"triangleCount",{get:function(){return this.vertexCount/3},enumerable:!0,configurable:!0}),e.prototype.intersect=function(e,t,n,r,a,i){var s=this.geometry.id,o=a.toString();this.material.intersect(this.geometry,null,e.transform.transform,e,n,r,(function(n,r,l,c){if(n>=0){if(null!=t&&!t(e.rayBeginPoint,e.rayEndPoint,n))return;var u={type:"external",metadata:{layerUid:i.layerUid,graphicUid:i.graphicUid(a)}};if((null==e.results.min.drapedLayerOrder||c>=e.results.min.drapedLayerOrder)&&(null==e.results.min.dist||n<e.results.min.dist)&&(e.results.min.set(u,o,n,r,e.transform.transform,c,null,s,l),e.results.min.intersector="LodRenderer"),0!==e.options.store&&(null==e.results.max.drapedLayerOrder||c>=e.results.max.drapedLayerOrder)&&(null==e.results.max.dist||n>e.results.max.dist)&&(e.results.max.set(u,o,n,r,e.transform.transform,c,null,s,l),e.results.min.intersector="LodRenderer"),2===e.options.store){var d=new h.IntersectorResult(e.results.min.ray);d.set(u,o,n,r,e.transform.transform,c,null,s,l),d.intersector="LodRenderer",e.results.all.push(d)}}}))},e}();t.LodComponentData=S;var R=function(){function e(e,t){var n=this;this.components=[],this.minScreenSpaceRadius=t.minScreenSpaceRadius,t.components.forEach((function(t){n.components.push(new S(e,t))}))}return e.prototype.destroy=function(){this.components.forEach((function(e){e.destroy()}))},e.prototype.intersect=function(e,t,n,r,a,i){this.components.forEach((function(s){s.intersect(e,t,n,r,a,i)}))},Object.defineProperty(e.prototype,"boundingBox",{get:function(){if(!this._boundingBox){var e=s.empty();this.components.forEach((function(t){s.expand(e,t.boundingInfo.bbMin),s.expand(e,t.boundingInfo.bbMax)})),this._boundingBox=e}return this._boundingBox},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"boundingSphere",{get:function(){if(!this._boundingSphere){var e=this.boundingBox,t=a.vec3f64.create();s.center(e,t),this._boundingSphere={center:t,radius:.5*s.diameter(e)}}return this._boundingSphere},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"triangleCount",{get:function(){return this.components.reduce((function(e,t){return e+t.triangleCount}),0)},enumerable:!0,configurable:!0}),e}();t.LodLevelData=R;var E=function(){function e(e,n,r,a){var i=this;this.type="Lod",this.isGround=!1,this._levels=[],this._renderInstanceData=[],this._highlightRenderInstanceData=[],this._instanceIndex=0,this._slicePlane=!1,this._enableLevelSelection=!0,this._lastCamera=new u.default,this._updateCyclesWithStaticCamera=-1,this._needFullCycle=!1,this.canRender=!0,this._symbol=e,this._optionalFields=n,this._metadata=r,this._instanceBufferLayout=v.getInstanceBufferLayout({instancedDoublePrecision:!0,instanced:n}),this._glInstanceBufferLayout=l.glLayout(this._instanceBufferLayout,{divisor:1}),this._instanceData=new p.InstanceData(this._optionalFields,a),this._instanceData.on("instance-added",(function(){i.requestUpdateCycle()})),this._instanceData.on("instance-removed",(function(){i.requestUpdateCycle()})),this._instanceData.on("instance-transform-changed",(function(e){i.requestUpdateCycle(),i._metadata.notifyGraphicUpdate(e.index,2)})),this._instanceData.on("instance-visibility-changed",(function(e){i.requestUpdateCycle(!0),i._metadata.notifyGraphicUpdate(e.index,1)})),this._instanceData.on("instance-highlight-changed",(function(){i.requestUpdateCycle(!0)})),this._enableLevelSelection=this._symbol.levels.length>1,t.lodRenderers.push(this)}return e.prototype.destroy=function(){t.lodRenderers.splice(t.lodRenderers.indexOf(this),1)},Object.defineProperty(e.prototype,"levels",{get:function(){return this._levels},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"baseBoundingBox",{get:function(){return this._levels[this._levels.length-1].boundingBox},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"baseBoundingSphere",{get:function(){return this._levels[this._levels.length-1].boundingSphere},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"baseMaterial",{get:function(){return this._levels[this._levels.length-1].components[0].material},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"slicePlane",{get:function(){return this._slicePlane},set:function(e){this._slicePlane=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectionHandlerId",{get:function(){return this._metadata.layerUid},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"instanceData",{get:function(){return this._instanceData},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"memoryUsage",{get:function(){var e={cpu:0,gpu:0};return this._renderInstanceData.forEach((function(t){var n=t.memoryUsage;e.cpu+=n.cpu,e.gpu+=n.gpu})),this._highlightRenderInstanceData.forEach((function(t){var n=t.memoryUsage;e.cpu+=n.cpu,e.gpu+=n.gpu})),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderStats",{get:function(){var e=this,t=this._instanceData.size,n=[];return this._levels.forEach((function(t,r){var a=e._renderInstanceData[r],i=e._highlightRenderInstanceData[r],s=a.size+i.size,o=t.triangleCount;n.push({renderedInstances:s,renderedTriangles:s*o,trianglesPerInstance:o})})),{totalInstances:t,renderedInstances:n.reduce((function(e,t){return e+t.renderedInstances}),0),renderedTriangles:n.reduce((function(e,t){return e+t.renderedTriangles}),0),levels:n}},enumerable:!0,configurable:!0}),e.prototype.initializeRenderContext=function(e){var t=this;this._initContext=e;var n=e.rctx;this._symbol.levels.forEach((function(r){t._levels.push(new R(e,r)),t._renderInstanceData.push(new b.RenderInstanceData(n,t._instanceBufferLayout)),t._highlightRenderInstanceData.push(new b.RenderInstanceData(n,t._instanceBufferLayout))})),this._levelSelector=x(this)},e.prototype.uninitializeRenderContext=function(){this.invalidateOctree(),this._levels.forEach((function(e){e.destroy()})),this._renderInstanceData.forEach((function(e){e.destroy()})),this._highlightRenderInstanceData.forEach((function(e){e.destroy()}))},Object.defineProperty(e.prototype,"slots",{get:function(){return[4,6]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"needsHighlight",{get:function(){return this._highlightRenderInstanceData.reduce((function(e,t){return e+t.size}),0)>0},enumerable:!0,configurable:!0}),e.prototype.prepareRender=function(e){this.runUpdates(e)},e.prototype.render=function(e){var t=this,n=e.rctx,r=4===e.slot?3:6===e.slot?5:null;if(r){if(!this.baseMaterial.isVisible()||!this.baseMaterial.isVisibleInPass(e.pass))return!1;var a=e.camera,i={slot:r,view:a.viewMatrix,proj:a.projectionMatrix,origin:[0,0,0],viewInvTransp:a.viewInverseTransposeMatrix,viewport:a.fullViewport,fovY:a.fovY,nearFar:[a.near,a.far],shadowMap:e.shadowMap,shadowMappingEnabled:!!e.shadowMap&&e.shadowMap.enabled,ssaoEnabled:!!e.ssaoHelper&&e.ssaoHelper.enabled,pixelRatio:a.pixelRatio,slicePlane:e.sliceHelper&&e.sliceHelper.plane,cameraAboveGround:a.aboveGround,hudVisibilityTexture:e.offscreenRenderingHelper?e.offscreenRenderingHelper.hudVisibilityTexture:null,highlightDepthTexture:e.offscreenRenderingHelper?e.offscreenRenderingHelper.depthTexture:null,hasOccludees:!1,linearDepthTexture:null,linearDepthTextureID:0,lastFrameColorTexture:null,lastFrameColorTextureID:0,reprojectionMat:null,ssrViewMat:null,rpProjectionMat:null,ssrEnabled:!1};n.bindVAO();for(var s=function(n){var a=e.isHighlightPass?o._highlightRenderInstanceData[n]:o._renderInstanceData[n];o._levels[n].components.forEach((function(s){t.renderComponent(e,r,i,a,s,n)}))},o=this,l=0;l<this._levels.length;++l)s(l);return!0}},e.prototype.intersect=function(e,t,n,i){var s=this;if(this.baseMaterial.isVisible()){var o=a.vec3f64.create();r.vec3.subtract(o,i,n);var l=function(a){s._instanceData.getCombinedModelTransform(a,M),e.transform.set(M),r.vec3.transformMat4(F,n,e.transform.inverse),r.vec3.transformMat4(P,i,e.transform.inverse);var o=s._instanceData.getState(a),l=s._instanceData.getLodLevel(a);f.assert(o&p.StateFlags.ACTIVE,"invalid instance state"),f.assert(l>=0&&l<s._levels.length,"invaid lod level"),s._levels[l].intersect(e,t,F,P,a,s._metadata)};this.baseMaterial.getParameters().verticalOffset?this.octree.forEach(l):this.octree.forEachAlongRay(n,o,l)}},e.prototype.queryDepthRange=function(e){return this.queryDepthRangeOctree(e)},e.prototype.notifyShaderTransformationChanged=function(){this.invalidateOctree()},e.prototype.requestUpdateCycle=function(e){void 0===e&&(e=!1),this._updateCyclesWithStaticCamera=-1,e&&(this._needFullCycle=!0),this.needsUpdates&&this._initContext.requestRender()},Object.defineProperty(e.prototype,"needsUpdates",{get:function(){return this._instanceData.size>0&&this._updateCyclesWithStaticCamera<1},enumerable:!0,configurable:!0}),e.prototype.runUpdates=function(e){if(!o.LOD_INSTANCE_RENDERER_DISABLE_UPDATES){if(this._enableLevelSelection){var t=e.equals(this._lastCamera);this._lastCamera.copyFrom(e),t||this.requestUpdateCycle()}var n=this._needFullCycle?this._instanceData.size:2e3;this._needFullCycle=!1,this.updateInstances(e,n),this.needsUpdates&&this._initContext.requestRender()}},Object.defineProperty(e.prototype,"octree",{get:function(){return this._octree||(this._octree=this.buildOctree()),this._octree},enumerable:!0,configurable:!0}),e.prototype.invalidateOctree=function(){this._octree&&(this._octree.destroy(),this._octree=null)},e.prototype.buildOctree=function(){for(var e=new g.InstanceOctree(this._instanceData,this.baseBoundingSphere),t=this._instanceData,n=t.view?t.view.state:null,r=0;r<this._instanceData.capacity;++r){n.get(r)&p.StateFlags.ACTIVE&&e.addInstance(r)}return e},e.prototype.queryDepthRangeOctree=function(e){var t=e.eye,n=e.viewForward,a=this.octree.findClosest(n,"front-to-back",e.frustum),i=this.octree.findClosest(n,"back-to-front",e.frustum);if(null!=a&&null!=i){this._instanceData.view.boundingSphere.getVec(a,T),r.vec3.subtract(T,T,t);var s=r.vec3.dot(T,n)-T[3];this._instanceData.view.boundingSphere.getVec(i,T),r.vec3.subtract(T,T,t);var o=r.vec3.dot(T,n)+T[3];return{near:Math.max(e.near,s),far:Math.min(e.far,o)}}return{near:1/0,far:-1/0}},e.prototype.startUpdateCycle=function(){this._updateCyclesWithStaticCamera++,this._renderInstanceData.forEach((function(e){e.startUpdateCylce()})),this._highlightRenderInstanceData.forEach((function(e){e.startUpdateCylce()})),this.needsUpdates&&this._initContext.requestRender()},e.prototype.updateInstances=function(e,t){var n=this._enableLevelSelection,r=this._levelSelector;r.updateCamera(e),this._renderInstanceData.forEach((function(e){e.beginUpdate()})),this._highlightRenderInstanceData.forEach((function(e){e.beginUpdate()}));var a=this._instanceData,i=this._instanceData.view,s=a.size,o=a.capacity,l=this._instanceIndex;t=Math.min(s,t);for(var c=0;c<t;++c){0===l&&this.startUpdateCycle();var u=i.state.get(l),d=0;if(u&p.StateFlags.ALLOCATED){var h=i.lodLevel.get(l);if(u&p.StateFlags.ACTIVE&&this._renderInstanceData[h].freeTail(),u&p.StateFlags.HIGHLIGHT_ACTIVE&&this._highlightRenderInstanceData[h].freeTail(),u&p.StateFlags.REMOVE)a.freeInstance(l);else if(u&p.StateFlags.VISIBLE){var f=0;if(n&&(i.modelOrigin.getVec(l,L),f=r.selectLevel(L,a.getCombinedMedianScaleFactor(l))),d=u&~(p.StateFlags.ACTIVE|p.StateFlags.HIGHLIGHT_ACTIVE|p.StateFlags.TRANSFORM_CHANGED),f>=0){var g=this._renderInstanceData[f],m=g.allocateHead();if(O(i,l,g.view,m),d|=p.StateFlags.ACTIVE,u&p.StateFlags.HIGHLIGHT){var b=this._highlightRenderInstanceData[f],v=b.allocateHead();O(i,l,b.view,v),d|=p.StateFlags.HIGHLIGHT_ACTIVE}}i.state.set(l,d),i.lodLevel.set(l,f)}else d=u&~(p.StateFlags.ACTIVE|p.StateFlags.HIGHLIGHT_ACTIVE|p.StateFlags.TRANSFORM_CHANGED),i.state.set(l,d);if(this._octree){var y=!!(u&p.StateFlags.ACTIVE),_=!!(d&p.StateFlags.ACTIVE);!y&&_?this._octree.addInstance(l):y&&!_?this._octree.removeInstance(l):y&&_&&u&p.StateFlags.TRANSFORM_CHANGED&&(this._octree.removeInstance(l),this._octree.addInstance(l))}l=(l+1)%o}else l=(l+1)%o,t++}this._instanceIndex=l,this._renderInstanceData.forEach((function(e){e.endUpdate()})),this._highlightRenderInstanceData.forEach((function(e){e.endUpdate()}))},e.prototype.renderComponent=function(e,t,n,r,a,i){var s=a.glMaterials.get(e.pass);if(s&&s.beginSlot(t)&&0!==r.size){var l=e.rctx,u=l.capabilities.instancing;s.ensureParameters(n);var h=s.getTechnique(),p=s.getPipelineState(t);l.setPipelineState(p),s.bind(l,n),l.bindVAO(a.vao),h.ensureAttributeLocations(a.vao);var g=h.program;e.isHighlightPass&&c.OutputHighlight.bindOutputHighlight(l,g,n),h.bindDraw(n),o.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL&&0===e.pass&&(g.setUniform4fv("externalColor",U[Math.min(i,U.length-1)]),g.setUniform1i("colorMixMode",y.colorMixModes.replace));var m=r.capacity,b=r.headIndex,v=r.tailIndex,_=r.firstIndex,I=this._glInstanceBufferLayout,C=function(e,t){D.bindVertexBufferLayout(l,d.Default3D,r.buffer,I,e),u.drawArraysInstanced(h.primitiveType,0,a.vertexCount,t-e),D.unbindVertexBufferLayout(l,d.Default3D,r.buffer,I)};a.material.getParameters().transparent&&null!=_?b>v?(f.assert(_>=v&&_<=b,"invalid firstIndex"),C(_,b),C(v,_)):b<v&&(_<=b?(f.assert(_>=0&&_<=b,"invalid firstIndex"),C(_,b),C(v,m),C(0,_)):(f.assert(_>=v&&_<=m,"invalid firstIndex"),C(_,m),C(0,b),C(v,_))):b>v?C(v,b):b<v&&(C(0,b),C(v,m)),l.bindVAO(null)}},e}();function O(e,t,n,r){_.encodeDoubleVec3(e.modelOrigin,t,n.modelOriginHi,n.modelOriginLo,r),n.model.copyFrom(r,e.model,t),n.modelNormal.copyFrom(r,e.modelNormal,t),e.color&&n.color&&n.color.copyFrom(r,e.color,t),e.featureAttribute&&n.featureAttribute&&n.featureAttribute.copyFrom(r,e.featureAttribute,t)}t.LodRenderer=E,t.lodRenderers=[];var L=a.vec3f64.create(),T=i.vec4f64.create(),M=n.mat4f64.create(),F=a.vec3f64.create(),P=a.vec3f64.create(),U=[[1,0,1,1],[0,0,1,1],[0,1,0,1],[1,1,0,1],[1,0,0,1]]}));