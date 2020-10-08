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

define(["require","exports","tslib","../../../../../core/Logger","../../../../../core/maybe","../../../../../core/typedArrayUtil","../../../../../core/libs/gl-matrix-2/mat3","../../../../../core/libs/gl-matrix-2/mat3f32","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../core/libs/gl-matrix-2/vec4","../../../../../core/libs/gl-matrix-2/vec4f32","../../../../../geometry/support/aaBoundingBox","../../../layers/support/symbolColorUtils","../../../support/orientedBoundingBox","../../../support/buffer/BufferView","../../../support/buffer/glUtil","../../../support/buffer/InterleavedLayout","./interface","./RenderSubmitSystem","./SourceGeometry","./IndexRange/ComponentRangeRunLengthEncoded","./Material/ComponentMaterial","./Material/ComponentTechnique","../../core/util/BucketedObjectStore","../../core/util/TwoVectorPosition","../../lib/AutoDisposable","../../lib/ComponentUtils","../../lib/geometryDataUtils","../../lib/Util","../../lib/TextureBackedBuffer/BufferManager","../../materials/internal/MaterialUtil","../../../../webgl/BufferObject","../../../../webgl/VertexArrayObject"],(function(e,t,o,n,r,i,a,s,c,p,u,l,m,h,f,b,g,y,d,v,C,_,x,w,M,D,S,P,A,B,j,O,R,I){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentObject=t.Renderable=t.RenderGeometry=t.ComponentObjectCollection=void 0;var V=n.getLogger("esri.views.3d.webgl-engine.collections.Component.ComponentObjectCollection"),k=function(){function e(e){this._renderManager=e,this._objects=new M.BucketedObjectStore,this._renderSubmit=new v.RenderSubmitSystem(this),this._renderManager.register(this._renderSubmit),this._componentBufferManager=new j.BufferManager(e.rctx)}return e.prototype.dispose=function(){B.assert(0===this.count,"ObjectCollection should be empty upon disposal"),this._componentBufferManager=r.destroyMaybe(this._componentBufferManager)},e.prototype.createObject=function(e){var t=new H;return t.toMapSpace=e.toMapSpace.slice(),t.transform=e.transform,t.obb=f.clone(e.obb),t.components=new U(this._componentBufferManager,e.geometry.componentOffsets),t.renderable=this._createRenderable(e,t.components),t.intersectionGeometry=new G(e.geometry.positionData,t.components),this._objects.add(e.visible?J:0,t),t},e.prototype.destroyObject=function(e){var t=e;this._objects.remove(t),t.dispose(),this._notifyDirty()},e.prototype.setObjectVisibility=function(e,t){var o=e;if(t!==o.visible){var n=t?o.bucketKey|J:o.bucketKey&~J;this._objects.updateKey(o,n),this._notifyDirty()}},Object.defineProperty(e.prototype,"count",{get:function(){return this._objects.count},enumerable:!1,configurable:!0}),e.prototype.preSubmit=function(e){var t=e.camera.eye;this._objects.forEach((function(e,o){o&J&&e.forEach((function(e){var o=c.vec3.squaredDistance(t,e.obb.center);e.renderable.meta.cameraDepthSquared=o}))}))},e.prototype.updateMaterial=function(e,t){var o=e.renderable.material;t(o),o.dirty&&this._notifyDirty()},e.prototype.setAllComponentVisibilities=function(e,t){var o=e;o.components.visibility.reset(t),o.components.visibilityDirty(),this._notifyDirty()},e.prototype.forEachVisibleComponent=function(e,t){return e.components.visibility.forEachComponent(t)},e.prototype.getComponentCount=function(e){var t=e,o=t.components.visibility.componentCount();return{visible:o,invisible:t.components.count-o}},e.prototype.setComponentData=function(e,t){var o=e,n=o.renderable.material;if(d.isVaryingComponentParameters(t)){for(var r=o.components,i=r.materialDataBuffer,a=r.materialDataIndices,s={castShadows:!0,pickable:!0,externalColor:l.vec4f32.create(),externalColorMixMode:1},c=i.textureBuffer,p=new Uint8Array(4),u=new Uint32Array(p.buffer),m=0,f=0,b=0,g=!1,y=0,v=0;v<r.count;v++)t(v,s),m+=+(s.externalColor[3]<1),f+=+(3===s.externalColorMixMode&&1===s.externalColor[3]),b+=+s.castShadows,h.encodeSymbolColor(s.externalColor,s.externalColorMixMode,p),p[2]=254&p[2]|+s.castShadows,c.setData(a[v],0,p[0],p[1],p[2],p[3]),g=g||v>0&&y!==u[0],y=u[0],s.pickable!==P.getVisibility(r.pickability,v)&&(r.pickability=P.updateVisibilityWithCount(r.pickability,r.count,v,s.pickable));g?(n.componentParameters=new x.ComponentParametersVarying,n.componentParameters.castShadows=q(b,r.count),n.componentParameters.transparent=q(m,r.count),n.componentParameters.opaqueOverride=q(f,r.count),n.componentParameters.texture=c,c.updateTexture()):(n.componentParameters=new x.ComponentParametersUniform,n.componentParameters.castShadows=s.castShadows?0:2,n.componentParameters.externalColor=s.externalColor,n.componentParameters.externalColorMixMode=s.externalColorMixMode)}else n.componentParameters=new x.ComponentParametersUniform,n.componentParameters.castShadows=t.castShadows?0:2,n.componentParameters.externalColor=t.externalColor,n.componentParameters.externalColorMixMode=t.externalColorMixMode;this._notifyDirty()},e.prototype.getComponentAabb=function(e,t,o){return e.intersectionGeometry.getComponentAabb(t,o)},e.prototype.getComponentObb=function(e){return e.obb},e.prototype.getObjectTransform=function(e){return e.transform},e.prototype.getComponentPositions=function(e,t,o){return e.intersectionGeometry.getComponentPositions(t,o)},e.prototype.intersect=function(e,t,o,n,i,s){var p=e;r.isSome(i)&&(i.localOrigin=p.transform.position);var u=a.mat3.invert(N,p.transform.rotationScale);c.vec3.sub(z,t,p.transform.position),c.vec3.sub(K,o,p.transform.position),c.vec3.transformMat3(z,z,u),c.vec3.transformMat3(K,K,u);var l=a.mat3.transpose(N,u);return p.intersectionGeometry.intersect(z,K,n,l,i,s)},e.prototype.addEdges=function(e,t,o,n){var r=e,i=r.intersectionGeometry,a=i.indices,s=i.positions,c=r.components.offsets;return t.addComponentObject(e,r.transform,r.obb.center,s,a,c,o,n)},e.prototype.addComponentHighlight=function(e,t){var o=e.components;r.isNone(o.highlightCounts)&&(o.highlightCounts=new Uint32Array(o.count+1)),0===o.highlightCounts[t]++&&(o.highlightsDirty(),this._notifyDirty()),o.highlightCounts[o.count]++},e.prototype.removeComponentHighlight=function(e,t){var o=e.components;if(r.isNone(o.highlightCounts))V.warn("Removing non-existing highlight.");else{var n=o.highlightCounts[t],i=o.highlightCounts[o.count];if(0!==n){if(n>1)return o.highlightCounts[t]=n-1,void(o.highlightCounts[o.count]=i-1);o.highlightCounts[t]=0,o.highlightsDirty(),this._notifyDirty(),1===i?o.highlightCounts=null:o.highlightCounts[o.count]=i-1}else V.warn("Removing non-existing highlight.")}},e.prototype.clearHighlights=function(e){var t=e.components;r.isSome(t.highlightCounts)&&(t.highlightCounts=null,t.highlightsDirty(),this._notifyDirty())},e.prototype.getObjectGPUMemoryUsage=function(e){return e.renderable.meta.gpuMemoryEstimate},Object.defineProperty(e.prototype,"visibleObjects",{get:function(){return this._objects.getBucket(J)},enumerable:!1,configurable:!0}),e.prototype._createRenderable=function(e,t){for(var o=this._renderManager.rctx,n=e.geometry,i=n.vertices.layoutParameters,p=R.createVertex(o,35044,n.vertices.data),l=r.applySome(n.indices,(function(e){return R.createIndex(o,35044,e)})),m=g.glLayout(C.createVertexBufferLayout(i)),h=new Uint16Array(n.vertices.count),f=0;f<t.count;f++){var b=t.offsets[f],y=t.offsets[f+1],d=t.materialDataIndices[f];if(r.isSome(n.indices))for(var v=b;v<y;v++){h[n.indices[v]]=d}else for(v=b;v<y;v++)h[v]=d}var _=R.createVertex(o,35044,h.buffer),M=new D.TwoVectorPosition(e.transform.position),S=s.mat3f32.clone(e.transform.rotationScale);a.mat3.invert(S,S),a.mat3.transpose(S,S);var P=new w.ComponentDrawParameters;c.vec3.copy(P.worldFromModel_TL,M.low),c.vec3.copy(P.worldFromModel_TH,M.high),a.mat3.copy(P.worldFromModel_RS,e.transform.rotationScale),a.mat3.copy(P.transformNormal_GlobalFromModel,S),u.vec4.copy(P.toMapSpace,e.toMapSpace);var A=new x.ComponentMaterial,B=new I(o,A.attributeLocations,{data:m,componentIndices:L},{data:p,componentIndices:_},r.unwrap(l)),j=new T;return j.material=A,j.drawParameters=P,j.geometry=new E(B,n.primitiveType,i,r.isSome(l)),j.meta.cameraDepthSquared=.5,j.meta.gpuMemoryEstimate=p.byteSize+_.byteSize+(r.isSome(l)?l.byteSize:0),j},e.prototype._notifyDirty=function(){this._renderManager.notifyDirty()},e}();t.ComponentObjectCollection=k;var U=function(e){function t(t,o){var n=e.call(this)||this;n.pickability=null,n.highlightCounts=null,n.cachedGeometryRanges=null,n.cachedHighlightRanges=null,n.offsets=i.slice(o);var r=n.count;n.visibility=new _.ComponentRangeRunLengthEncoded(r),n.materialDataBuffer=t.getBuffer(r),n.materialDataIndices=new Uint16Array(r);for(var a=0;a<r;a++)n.materialDataIndices[a]=n.materialDataBuffer.acquireIndex();return n}return o.__extends(t,e),t.prototype.dispose=function(){e.prototype.dispose.call(this);for(var t=0;t<this.count;t++)this.materialDataBuffer.releaseIndex(this.materialDataIndices[t])},Object.defineProperty(t.prototype,"count",{get:function(){return this.offsets.length-1},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"geometryRanges",{get:function(){return r.isNone(this.cachedGeometryRanges)&&(this.cachedGeometryRanges=this.visibility.computeOffsetRanges(this.offsets)),this.cachedGeometryRanges},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"highlightRanges",{get:function(){return r.isNone(this.highlightCounts)?null:(r.isNone(this.cachedHighlightRanges)&&(this.cachedHighlightRanges=function(e,t,o){var n=[],r=o.length;t.forEachComponent((function(t){return e[t]>0&&(r!==t-1&&(n.length&&n.push(o[r+1]-n[n.length-1]),n.push(o[t])),r=t),!0})),n.length&&n.push(o[r+1]-n[n.length-1]);return n}(this.highlightCounts,this.visibility,this.offsets)),this.cachedHighlightRanges)},enumerable:!1,configurable:!0}),t.prototype.highlightsDirty=function(){this.cachedHighlightRanges=null},t.prototype.visibilityDirty=function(){this.cachedGeometryRanges=null,this.cachedHighlightRanges=null},t}(S.AutoDisposable);var G=function(){function e(e,t){this._indices=r.isSome(e.indices)?e.indices:A.generateDefaultIndexArray(e.positions.length/3),this._positions=new b.BufferViewVec3f(e.positions),this._components=t}return e.prototype.getComponentAabb=function(e,t){if(r.isSome(this._perComponentAabbs)){for(var o=0;o<6;o++)t[o]=this._perComponentAabbs[6*e+o];return t}return this._computePerComponentAabbs(),this.getComponentAabb(e,t)},e.prototype.getComponentPositions=function(e,t){t.indices=this._indices,t.data=this._positions.typedBuffer,t.stride=this._positions.typedBufferStride,t.startIndex=this._components.offsets[e],t.endIndex=this._components.offsets[e+1]},e.prototype.intersect=function(e,t,o,n,i,a){var s=this,p={data:this._positions.typedBuffer,strideIdx:this._positions.typedBufferStride,offsetIdx:0,size:3},u=this._indices,l=this._components.offsets,m=O.computeInvDir(e,t,F);this._components.visibility.forEachComponent((function(h){if(!P.getVisibility(s._components.pickability,h))return!0;var f=s.getComponentAabb(h,W);if(r.isSome(i)&&i.applyToAabb(f),!O.intersectAabbInvDir(f,e,m,o))return!0;var b=l[h]/3,g=l[h+1]/3;return O.intersectTriangles(e,t,b,g,u,p,void 0,i,(function(e,t,o){return a(h,e,c.vec3.transformMat3(t,t,n),o)})),!0}))},e.prototype._computePerComponentAabbs=function(){var e=this._components.count;this._perComponentAabbs=new Float32Array(6*e);for(var t=0;t<e;t++)this._computeAABB(t)},e.prototype._computeAABB=function(e){for(var t=this._indices,o=this._positions,n=this._components.offsets,r=n[e],i=n[e+1],a=[0,0,0],s=[1/0,1/0,1/0],p=[-1/0,-1/0,-1/0],u=r;u<i;u++){var l=t[u];o.getVec(l,a),c.vec3.min(s,s,a),c.vec3.max(p,p,a)}var m=6*e;this._perComponentAabbs[m++]=s[0],this._perComponentAabbs[m++]=s[1],this._perComponentAabbs[m++]=s[2],this._perComponentAabbs[m++]=p[0],this._perComponentAabbs[m++]=p[1],this._perComponentAabbs[m]=p[2]},Object.defineProperty(e.prototype,"positions",{get:function(){return this._positions},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"indices",{get:function(){return this._indices},enumerable:!1,configurable:!0}),e}(),E=function(e){function t(t,o,n,r){var i=e.call(this)||this;return i.vao=t,i.primitiveType=o,i.parameters=n,i.indexed=r,i}return o.__extends(t,e),o.__decorate([S.autoDispose()],t.prototype,"vao",void 0),t}(S.AutoDisposable);t.RenderGeometry=E;var T=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.meta={cameraDepthSquared:0,gpuMemoryEstimate:0},t}return o.__extends(t,e),o.__decorate([S.autoDispose()],t.prototype,"geometry",void 0),t}(S.AutoDisposable);t.Renderable=T;var L=g.glLayout(y.newLayout().u16("componentIndex")),H=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.__extends(t,e),Object.defineProperty(t.prototype,"visible",{get:function(){return!!(this.bucketKey&J)},enumerable:!1,configurable:!0}),o.__decorate([S.autoDispose()],t.prototype,"renderable",void 0),o.__decorate([S.autoDispose()],t.prototype,"components",void 0),t}(M.BucketStorable);function q(e,t){return e===t?0:0===e?2:1}t.ComponentObject=H;var N=s.mat3f32.create(),F=p.vec3f64.create(),z=p.vec3f64.create(),K=p.vec3f64.create(),W=m.create(),J=1}));