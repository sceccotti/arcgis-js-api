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

define(["require","exports","tslib","../../../../../core/arrayUtils","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/promiseUtils","../../../../../core/typedArrayUtil","../../../../../core/workers","../../../../../core/libs/gl-matrix-2/mat3","../../../../../core/libs/gl-matrix-2/mat3f64","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../support/buffer/utils","../../core/shaderLibrary/attributes/VertexPosition.glsl","../../core/util/TwoVectorPosition","../GridLocalOriginFactory","../localOriginHelper","../LocalOriginManager","../Object3D","./bufferLayouts","./edgeBufferWriters","./EdgeProcessingWorker","./EdgeRenderer","./strokes","./util","../TextureBackedBuffer/BufferManager","../../../../webgl/BufferObject","../../../../webgl/VertexArrayObject"],(function(e,t,r,n,i,a,o,s,c,d,u,l,f,g,h,p,m,v,b,y,E,x,w,O,T,R,_,M,j,C,I){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EdgeView=void 0;var B=function(){function e(e,t,r){var n=this;this.rctx=e,this.techniqueRepository=t,this.callbacks=r,this.profilingCallback=null,this.perObjectData=new Map,this.renderers=new Map,this.localOrigins=new E.LocalOriginManager(new b),this.numberOfRenderedEdges=0,this.gpuMemoryUsage=0,this.worker=new T,this.destroyed=!1,this.tmpModelPosition=h.vec3f64.create(),this.tmpCameraPosition=h.vec3f64.create(),this.componentColorManager=new j.BufferManager(this.rctx,2),c.open("EdgeProcessingWorker").then((function(e){n.destroyed?e.close():n.workerThread=e}));for(var i=w.VertexLayout.createBuffer(4),a=0;a<4;a++)i.sideness.set(a,0,0===a||3===a?0:1),i.sideness.set(a,1,0===a||1===a?0:1);this.verticesBufferObject=C.createVertex(this.rctx,35044,i.buffer)}return e.prototype.destroy=function(){var e=this;this.destroyed||(this.perObjectData.forEach((function(t,r){e.perObjectData.delete(r),t.renderables.forEach((function(t){e.removeRenderable(t)}))})),this.strokesTexture=a.disposeMaybe(this.strokesTexture),this.componentColorManager=a.destroyMaybe(this.componentColorManager),this.workerThread=a.destroyMaybe(this.workerThread),this.verticesBufferObject=a.disposeMaybe(this.verticesBufferObject),this.perObjectData.clear(),this.renderers.clear(),this.destroyed=!0)},e.prototype.getUsedMemory=function(){return this.gpuMemoryUsage},Object.defineProperty(e.prototype,"numberOfRenderedPrimitives",{get:function(){return this.numberOfRenderedEdges},enumerable:!1,configurable:!0}),e.prototype.shouldRender=function(){return this.renderers.size>0},e.prototype.addComponentObject=function(e,t,n,i,a,s,c,d){return r.__awaiter(this,void 0,void 0,(function(){var u,l;return r.__generator(this,(function(r){switch(r.label){case 0:return this.hasObject(e)?[2]:(l={loaded:o.create((function(e){return u=e})),renderables:[],center:n},this.perObjectData.set(e,l),[4,this.addComponentGeometry(t,l,i,a,s,c,d)]);case 1:return r.sent(),this.callbacks.setNeedsRender(),u(),[2]}}))}))},e.prototype.addOrUpdateObject=function(e,t,i,a,s){return r.__awaiter(this,void 0,void 0,(function(){var c,d,u,l,f,g,h,p=this;return r.__generator(this,(function(r){switch(r.label){case 0:if(c=new Array,u={loaded:o.create((function(e){return d=e})),renderables:[]},l=this.perObjectData.get(e),this.perObjectData.set(e,u),s&&s.mergeGeometries&&e.geometries.length>1&&function(e){for(var t=null,r=null,i=0;i<e.geometries.length;i++){var a=e.geometryRecords[i];if(a.material.supportsEdges){if(t){if(!n.equals(t,a.transformation))return!1}else t=a.transformation;if(!r&&a.origin)r=a;else if(r&&a.origin&&r.origin.id!==a.origin.id)return!1}}return!0}(e))c.push(this.addObjectMergedGeometries(e,u,t,i));else for(f=0;f<e.geometries.length;f++)g=e.geometries[f],h=e.geometryRecords[f],h.material.supportsEdges&&c.push(this.addGeometryData(e,u,g.data,h,t[0],i,a));return[4,o.all(c)];case 1:return r.sent(),l&&l.loaded.then((function(){l.renderables.forEach((function(e){return p.removeRenderable(e)})),p.callbacks.setNeedsRender()})),this.callbacks.setNeedsRender(),d(),[2]}}))}))},e.prototype.hasObject=function(e){return this.perObjectData.has(e)},e.prototype.updateAllComponentOpacities=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,i=this;return r.__generator(this,(function(r){switch(r.label){case 0:return n=t instanceof Array?function(e){return t[e]}:function(){return t},[4,this.getObjectEntry(e)];case 1:return r.sent().renderables.forEach((function(e){for(var t=e.components.meta.length,r=0;r<t;r++){var a=n(r),o=e.components.meta[r],s=o.index;o.material.opacity=a,e.components.buffer.textureBuffer.setDataElement(s,1,3,255*a)}i.updateTransparency(e)})),this.callbacks.setNeedsRender(),[2]}}))}))},e.prototype.updateAllComponentMaterials=function(e,t,n,i){return r.__awaiter(this,void 0,void 0,(function(){var a,o,s,c,d=this;return r.__generator(this,(function(r){switch(r.label){case 0:return a=e instanceof x,o=!!n.slicePlaneEnabled,s=M.determineRendererType(t),c=R.EdgeRenderer.getKey(s,o,a),[4,this.getObjectEntry(e)];case 1:return r.sent().renderables.forEach((function(e){if(c!==e.rendererKey){var r=d.renderers.get(e.rendererKey),n=d.acquireRenderer(s,o,a);r.removeRenderable(e),r.refCount.decrement(),e.rendererKey=c,n.addRenderable(e)}for(var u=0;u<t.length;u++)e.components.meta[u].material=t[u];i&&d.updateComponentBuffer(e.components),d.updateTransparency(e)})),this.callbacks.setNeedsRender(),[2]}}))}))},e.prototype.updateObjectVisibility=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){switch(r.label){case 0:return[4,this.getObjectEntry(e)];case 1:return r.sent().renderables.forEach((function(e){return e.visible=t})),this.callbacks.setNeedsRender(),[2]}}))}))},e.prototype.removeObject=function(e){var t=this,r=this.perObjectData.get(e);r&&(this.perObjectData.delete(e),r.loaded.then((function(){r.renderables.forEach((function(e){return t.removeRenderable(e)})),t.callbacks.setNeedsRender()})))},e.prototype.getObjectEntry=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t;return r.__generator(this,(function(r){switch(r.label){case 0:if(!(t=this.perObjectData.get(e)))throw"no object";return[4,t.loaded];case 1:return r.sent(),[2,t]}}))}))},e.prototype.removeAll=function(){var e=this;this.perObjectData.forEach((function(t,r){e.removeObject(r)}))},e.prototype.render=function(e,t){var r=this;if(!a.isNone(this.componentColorManager)){this.localOrigins.updateViewMatrices(e.camera.viewMatrix);var n=e.camera.viewInverseTransposeMatrix,i=h.vec3f64.create(),o=new v.TwoVectorPosition,s=new m.VertexPosition.ViewProjectionTransform,c=u.mat3f64.create();g.vec3.set(i,n[3],n[7],n[11]),o.set(i),g.vec3.copy(s.worldFromView_TH,o.high),g.vec3.copy(s.worldFromView_TL,o.low),d.mat3.fromMat4(s.viewFromCameraRelative_RS,e.camera.viewMatrix),l.mat4.copy(s.projFromView,e.camera.projectionMatrix);var f=u.mat3f64.create();d.mat3.transpose(f,s.viewFromCameraRelative_RS),d.mat3.invert(c,f),this.renderers.forEach((function(e){0===e.refCount.value&&(r.renderers.delete(e.key),e.dispose())})),this.componentColorManager.garbageCollect(),this.componentColorManager.updateTextures();var p=0,b=0;if(this.renderers.forEach((function(e){return e.forEachRenderable((function(e){p+=e.statistics.averageEdgeLength,b++}),t)})),0!==b){var y={distanceFalloffFactor:40*p/b,minimumEdgeLength:M.estimateLengthAtDistance(e.camera.fullViewport[3],e.camera.fovY,1,3.5*e.camera.pixelRatio),transparency:t,viewProjectionTransform:s,transformNormal_ViewFromGlobal:c};this.updateObjectCameraDistances(e),this.numberOfRenderedEdges=0,this.renderers.forEach((function(t){r.renderRegularEdges(t,e,y),r.renderSilhouetteEdges(t,e,y)}))}}},e.prototype.updateTransparency=function(e){var t=M.determineEdgeTransparency(e.components.meta),r=M.determineObjectTransparency(e.components.meta);t===e.edgeTransparency&&r===e.objectTransparency||(e.edgeTransparency=t,e.objectTransparency=r,this.renderers.get(e.rendererKey).setRenderablesDirty())},e.prototype.computeModelTransformWithLocalOrigin=function(e,t,r){if(e.getCombinedStaticTransformation(t,r),t.origin)this.localOrigins.register(t.origin);else{var n=g.vec3.set(this.tmpModelPosition,r[12],r[13],r[14]);t.origin=this.localOrigins.acquire(n)}return y.applyToModelMatrix(t.origin.vec3,r),r},e.prototype.updateComponentBuffer=function(e){for(var t=e.meta,r=e.buffer,n=0;n<t.length;n++){var a=t[n].material,o=t[n].index,s=i.clamp(Math.round(a.size*R.LINE_WIDTH_FRACTION_FACTOR),0,255),c=i.clamp(a.extensionLength,-R.EXTENSION_LENGTH_OFFSET,255-R.EXTENSION_LENGTH_OFFSET)+R.EXTENSION_LENGTH_OFFSET,d="solid"===a.type?0:1,u=255*a.opacity,l=a.color,f=255*l[0],g=255*l[1],h=255*l[2],p=255*l[3];r.textureBuffer.setData(o,0,f,g,h,p),r.textureBuffer.setData(o,1,s,c,d,u)}},e.prototype.createComponentBuffers=function(e){if(a.isNone(this.componentColorManager))return null;for(var t=new Array,r=this.componentColorManager.getBuffer(e.length),n=0;n<e.length;n++){var i=e[n],o=r.acquireIndex();t.push({index:o,material:i})}var s={meta:t,buffer:r};return this.updateComponentBuffer(s),s},e.prototype.extractEdges=function(e,t,r,n,i){return this.worker.process({data:t,originalIndices:i,writerSettings:e,skipDeduplicate:r},n?null:this.workerThread)},e.prototype.createEdgeResources=function(e){var t={};if(a.isNone(this.verticesBufferObject))return t;if(e.regular.lodInfo.lengths.length>0){var r=new I(this.rctx,w.EdgeShaderAttributeLocations,{vertices:w.glVertexLayout,instances:O.RegularEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:C.createVertex(this.rctx,35044,e.regular.instancesData.buffer)});t.regular={vao:r,lod:e.regular.lodInfo}}if(e.silhouette.lodInfo.lengths.length>0){r=new I(this.rctx,w.EdgeShaderAttributeLocations,{vertices:w.glVertexLayout,instances:O.SilhouetteEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:C.createVertex(this.rctx,35044,e.silhouette.instancesData.buffer)});t.silhouette={vao:r,lod:e.silhouette.lodInfo}}return t},e.prototype.addGeometryData=function(e,t,n,i,a,o,s){return r.__awaiter(this,void 0,void 0,(function(){var c,d,u,l;return r.__generator(this,(function(r){return c=n.getAttribute("position"),d=this.computeModelTransformWithLocalOrigin(e,i,f.mat4f64.create()),u=i.origin,l={position:c,indices:n.getIndices("position"),modelTransform:d,origin:u},[2,this.addPositionData(t,l,a,o,s)]}))}))},e.prototype.addPositionData=function(e,t,n,i,o){return void 0===o&&(o=!1),r.__awaiter(this,void 0,void 0,(function(){var s,c,d,u,l,f,g,h,p,m,v,b,y,E,x;return r.__generator(this,(function(r){switch(r.label){case 0:if(s=this.createComponentBuffers([n]),a.isNone(s))return[2];for(c=this.acquireRenderer(n.type,!!i.slicePlaneEnabled),d=t.modelTransform,u=t.origin,l=t.indices,f=t.position,g=f.data.length/f.strideIdx,h=w.EdgeInputBufferLayout.createBuffer(g),p=0;p<g;p++)h.position.set(p,0,f.data[f.offsetIdx+p*f.strideIdx+0]),h.position.set(p,1,f.data[f.offsetIdx+p*f.strideIdx+1]),h.position.set(p,2,f.data[f.offsetIdx+p*f.strideIdx+2]);return M.fillComponenBufferIndices(s.meta,[0,h.componentIndex.count],h.componentIndex),[4,this.extractEdges(c.writerSettings,h,!1,o,l)];case 1:return m=r.sent(),v=this.createEdgeResources(m),b=v.regular,y=v.silhouette,E=(b?b.vao.size:0)+(y?y.vao.size:0),x={regular:b,silhouette:y,transform:{modelMatrix:d,origin:u},statistics:{gpuMemoryUsage:E,averageEdgeLength:m.averageEdgeLength},components:s,visible:!0,edgeTransparency:M.determineEdgeTransparency(s.meta),objectTransparency:M.determineObjectTransparency(s.meta),distanceToCamera:0,rendererKey:c.key},e.renderables.push(x),c.addRenderable(x),this.gpuMemoryUsage+=E,[2]}}))}))},e.prototype.addComponentGeometry=function(e,t,n,i,o,s,c){return r.__awaiter(this,void 0,void 0,(function(){var d,u,l,f,g,h,m,v,b,y,E;return r.__generator(this,(function(r){switch(r.label){case 0:return d=this.createComponentBuffers(s),a.isNone(d)?[2]:(u=M.determineRendererType(s),l=this.acquireRenderer(u,c.slicePlaneEnabled||!1,!1),f=w.EdgeInputBufferLayout.createBuffer(n.count),p.vec3.copy(f.position,n),M.fillComponenBufferIndices(d.meta,o,f.componentIndex,i),!0,!1,g=l.writerSettings,[4,this.extractEdges(g,f,!0,!1,i)]);case 1:return h=r.sent(),m=this.createEdgeResources(h),v=m.regular,b=m.silhouette,y=(v?v.vao.size:0)+(b?b.vao.size:0),E={regular:v,silhouette:b,transform:e,statistics:{gpuMemoryUsage:y,averageEdgeLength:h.averageEdgeLength},components:d,visible:!0,edgeTransparency:M.determineEdgeTransparency(d.meta),objectTransparency:M.determineObjectTransparency(d.meta),distanceToCamera:0,rendererKey:l.key},t.renderables.push(E),l.addRenderable(E),this.gpuMemoryUsage+=y,[2]}}))}))},e.prototype.addObjectMergedGeometries=function(e,t,n,i){return r.__awaiter(this,void 0,void 0,(function(){var a,o,c,d,u,l,g,h,p,m,v,b,y,E,x,w,O,T,R,_;return r.__generator(this,(function(r){switch(r.label){case 0:for(a=new Map,o=0,c=null,d=null,R=0;R<e.geometries.length;R++)p=e.geometries[R],u=e.geometryRecords[R],u.material.supportsEdges&&(!d&&u.origin&&(d=u),b=p.data.getIndices("position"),o+=b?b.length:0,(b&&null==c||c===Uint16Array)&&(c=s.isUint16Array(b)?Uint16Array:Uint32Array));for(l=o?new c(o):null,g=[],h=0,R=0;R<e.geometries.length;R++)if(p=e.geometries[R],m=e.geometryRecords[R],m.material.supportsEdges){if(v=p.data.getAttribute("position"),b=p.data.getIndices("position"),null==(y=a.get(v.data))){for(y=g.length/3,E=v.offsetIdx;E<v.data.length;E+=v.strideIdx)g.push(v.data[E+0]),g.push(v.data[E+1]),g.push(v.data[E+2]);a.set(v.data,y)}if(b)for(x=0;x<b.length;x++)l[h++]=y+b[x]}for(w=d||e.geometryRecords[0],O=this.computeModelTransformWithLocalOrigin(e,w,f.mat4f64.create()),T=w.origin,R=0;R<e.geometryRecords.length;R++)e.geometryRecords[R].origin=T;return _={position:{data:g,offsetIdx:0,strideIdx:3},indices:l,modelTransform:O,origin:T},[4,this.addPositionData(t,_,n[0],i)];case 1:return r.sent(),[2]}}))}))},e.prototype.acquireRenderer=function(e,t,r){void 0===r&&(r=!0);var n=R.EdgeRenderer.getKey(e,t,r),i=this.renderers.get(n);return a.isNone(this.strokesTexture)&&(this.strokesTexture=_.generateStrokesTexture(this.rctx)),i||(i=new R.EdgeRenderer(this.rctx,this.techniqueRepository,{type:e,slicePlaneEnabled:t,strokesTexture:this.strokesTexture,legacy:r}),this.renderers.set(n,i)),i.refCount.increment(),i},e.prototype.removeRenderable=function(e){var t=this.renderers.get(e.rendererKey);if(t){t.removeRenderable(e),t.refCount.decrement(),function(e){e.regular&&(e.regular.vao.vertexBuffers.instances.dispose(),e.regular.vao.dispose(!1),e.regular.vao=null);e.silhouette&&(e.silhouette.vao.vertexBuffers.instances.dispose(),e.silhouette.vao.dispose(!1),e.silhouette.vao=null)}(e),"origin"in e.transform&&this.localOrigins.release(e.transform.origin),this.gpuMemoryUsage-=e.statistics.gpuMemoryUsage;for(var r=0,n=e.components.meta;r<n.length;r++){var i=n[r];e.components.buffer.releaseIndex(i.index)}}},e.prototype.updateObjectCameraDistances=function(e){var t=this,r=e.camera.viewInverseTransposeMatrix;g.vec3.set(this.tmpCameraPosition,r[3],r[7],r[11]),this.perObjectData.forEach((function(e,r){var n="getCenter"in r?r.getCenter():e.center,i=g.vec3.distance(n,t.tmpCameraPosition);e.renderables.forEach((function(e){return e.distanceToCamera=i}))}))},e.prototype.renderRegularEdges=function(e,t,r){var n=this;e.bindRegularEdges(t,r);var i=r.transparency;e.forEachRenderable((function(i){if(i.visible&&i.regular){var a=M.computeEdgeCount(i.regular.lod.lengths,i.distanceToCamera,r);"origin"in i.transform&&(t.localViewMatrixForEdges=n.localOrigins.getViewMatrix(i.transform.origin)),e.renderRegularEdges(i,t,a),n.numberOfRenderedEdges+=a}}),i)},e.prototype.renderSilhouetteEdges=function(e,t,r){var n=this;e.bindSilhouetteEdges(t,r);var i=r.transparency;e.forEachRenderable((function(i){if(i.visible&&i.silhouette){var a=M.computeEdgeCount(i.silhouette.lod.lengths,i.distanceToCamera,r);"origin"in i.transform&&(t.localViewMatrixForEdges=n.localOrigins.getViewMatrix(i.transform.origin)),e.renderSilhouetteEdges(i,t,a),n.numberOfRenderedEdges+=a}}),i)},e}();t.EdgeView=B}));