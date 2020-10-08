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

define(["require","exports","tslib","../../../../Color","../../../../core/lang","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../../../../symbols/support/ObjectSymbol3DLayerResource","../../../../symbols/support/symbolLayerUtils3D","./ElevationAligners","./elevationAlignmentUtils","./ElevationContext","./Graphics3DLodInstanceGraphicLayer","./Graphics3DSymbolLayer","./graphicUtils","./lodResourceUtils","./objectResourceUtils","./pointUtils","./primitiveObjectSymbolUtils","./symbolComplexity","../support/FastSymbolUpdates","../../support/pointUtils","../../support/projectionUtils","../../webgl-engine/lib/Util","../../webgl-engine/lib/lodRendering/LodRenderer","../../webgl-engine/lib/lodRendering/LodResources","../../webgl-engine/materials/DefaultMaterial"],(function(e,t,r,s,i,a,o,n,l,c,h,d,u,p,m,f,y,v,b,_,g,S,P,x,R,L,E,C,U,O,w,T,z){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Graphics3DObjectSymbolLayer=void 0;var G=function(e){function t(t,r,s,i){var a=e.call(this,t,r,s,i)||this;return a._resources=null,a._optionalFields=[],a._instanceIndexToGraphicUid=new Map,a.ensureDrapedStatus(!1),a}return r.__extends(t,e),t.prototype.getCachedSize=function(){var e=a.isSome(this._resources)?this._resources.symbolSize:[1,1,1];return{width:e[0],depth:e[1],height:e[2]}},t.prototype.doLoad=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,s,i,a;return r.__generator(this,(function(r){switch(r.label){case 0:if(t=this._getIdHint("_objectmat"),!this._drivenProperties.size&&g.validateSymbolLayerSize(this.symbolLayer))throw new Error;return s=this.symbolLayer,this.isPrimitive?(i=s.resource?s.resource.primitive:p.defaultPrimitive,this._resources=this._createResourcesForPrimitive(i,t),[3,3]):[3,1];case 1:return a=this,[4,this._createResourcesForUrl(s.resource.href,e)];case 2:a._resources=r.sent(),r.label=3;case 3:return this.complexity=this.computeComplexity(),[2]}}))}))},Object.defineProperty(t.prototype,"extentPadding",{get:function(){return a.isSome(this._resources)?this._resources.extentPadding:0},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isPrimitive",{get:function(){return!(this.symbolLayer.resource&&this.symbolLayer.resource.href)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lodRenderer",{get:function(){return a.get(this._resources,"lodRenderer")},enumerable:!1,configurable:!0}),t.prototype.setMaterialTransparencyParams=function(e,t){void 0===t&&(t=a.get(this.symbolLayer,"material","color"));var r=this._getCombinedOpacity(t),s=r<1||this.needsDrivenTransparentPass;return e.transparent=s,e.opacity=r,e},t.prototype._createResourcesForPrimitive=function(e,t){if(!R.isValidPrimitive(e))throw new Error("Unknown object symbol primitive: "+e);var r=this.symbolLayer,n=u.create(m.objectSymbolLayerPrimitiveBoundingBox(e)),l=h.vec3f64.fromArray(u.size(n)),p=h.vec3f64.fromArray(m.objectSymbolLayerSizeWithResourceSize(l,r)),f=c.vec3.length(p),y={usePBR:this._context.physicalBasedRenderingEnabled,isSchematic:!0,instanced:["transformation"],ambient:h.vec3f64.ONES,diffuse:h.vec3f64.ONES,slicePlaneEnabled:this._context.slicePlaneEnabled,sliceHighlightDisabled:!0,castShadows:this.symbolLayer.castShadows,offsetTransparentBackfaces:!this.symbolLayer.isPrimitive},v=y.usePBR;this.setMaterialTransparencyParams(y);var b=this.symbol;if("point-3d"===b.type&&b.verticalOffset){var _=b.verticalOffset,g=_.screenLength,S=_.minWorldLength,P=_.maxWorldLength;y.verticalOffset={screenLength:o.pt2px(g),minWorldLength:S||0,maxWorldLength:null!=P?P:1/0},y.castShadows=!1}if(this._context.screenSizePerspectiveEnabled&&(y.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),this._drivenProperties.color)y.externalColor=d.vec4f64.ONES;else{var x=a.isSome(r.material)&&r.material.color,L=a.isSome(x)?s.toUnitRGBA(x):d.vec4f64.ONES;y.externalColor=L}this._fastUpdates=E.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions(n,p,l,a.none)),this._fastUpdates.enabled?(i.mixin(y,this._fastUpdates.materialParameters),y.instanced.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(y.instanced.push("color"),this._optionalFields.push("color"));var C=new z(y,t),U=R.primitiveLodResources(e,C,t);if(!U)throw new Error("Unknown object symbol primitive: "+e);var O=T.materialsFromLodResources(U).map((function(e){return{opacity:1,transparent:e.getParameters().transparent}})),w=this._createStageResources(U,v);return{lodResources:U,lodRenderer:this._createLodRenderer(U),stageResources:w,symbolSize:p,extentPadding:f,isEsriSymbolResource:!1,isWosr:!1,originalMaterialParameters:O,physicalBasedRenderingEnabled:v,resourceBoundingBox:n,resourceSize:l,dispose:a.none,pivotOffset:a.none}},t.prototype._createResourcesForUrl=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var s,n,l,d,p,f,y,v,b,_,g,x,R,L,C,U,O,w,z,G,B,A,V,I,D,F,j,M,N,W=this;return r.__generator(this,(function(r){switch(r.label){case 0:return n={instanced:s=["transformation"],slicePlaneEnabled:this._context.slicePlaneEnabled,castShadows:this.symbolLayer.castShadows},l={materialParamsMixin:n,streamDataRequester:this._context.streamDataRequester,cache:this._context.sharedResources.objectResourceCache},this._fastUpdates=E.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions(a.none,a.none,a.none,a.none)),this._fastUpdates.enabled?(i.mixin(l.materialParamsMixin,this._fastUpdates.materialParameters),s.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(s.push("color"),this._optionalFields.push("color")),"point-3d"===(d=this.symbol).type&&d.verticalOffset&&(p=d.verticalOffset,f=p.screenLength,y=p.minWorldLength,v=p.maxWorldLength,l.materialParamsMixin.verticalOffset={screenLength:o.pt2px(f),minWorldLength:y||0,maxWorldLength:null!=v?v:1/0},l.materialParamsMixin.castShadows=!1),l.signal=t,l.usePBR=this._context.physicalBasedRenderingEnabled,b=l.usePBR,[4,P.fetch(e,l)];case 1:return _=r.sent(),g=_.isEsriSymbolResource,x=_.isWosr,R=_.remove,L=S.makeLodResources(_.lods),S.fillEstimatedMinScreenSpaceRadius(L),L.levels.sort((function(e,t){return e.minScreenSpaceRadius-t.minScreenSpaceRadius})),L.levels[0].minScreenSpaceRadius=Math.min(2,L.levels[0].minScreenSpaceRadius),C=this._context,U=this.symbolLayer.material,O=this._getExternalColorParameters(U),w=a.get(this.symbolLayer,"material","color"),z=this._getCombinedOpacity(w,{hasIntrinsicColor:!0}),G=this.needsDrivenTransparentPass,B=T.materialsFromLodResources(L),A=T.materialsFromLodResources(L).map((function(e){var t=e.getParameters();return{opacity:t.opacity||1,transparent:t.transparent}})),B.forEach((function(e){var t=e.getParameters();e.setParameterValues(O);var r=t.opacity*z,s=r<1||G||t.transparent;e.setParameterValues({opacity:r,transparent:s}),C.screenSizePerspectiveEnabled&&e.setParameterValues({screenSizePerspective:C.sharedResources.screenSizePerspectiveSettings})})),V=_.referenceBoundingBox,I=h.vec3f64.fromArray(u.size(V)),D=h.vec3f64.fromArray(L.levels[0].pivotOffset),F=h.vec3f64.fromArray(m.objectSymbolLayerSizeWithResourceSize(I,this.symbolLayer)),j=c.vec3.length(F),E.updateFastSymbolUpdatesState(this._fastUpdates,this._context.renderer,this._fastVisualVariableConvertOptions(V,F,I,D))&&B.forEach((function(e){return e.setParameterValues(W._fastUpdates.materialParameters)})),M=this._createStageResources(L,b),N=this._createLodRenderer(L),[2,{lodResources:L,lodRenderer:N,stageResources:M,symbolSize:F,extentPadding:j,isEsriSymbolResource:g,isWosr:x,originalMaterialParameters:A,physicalBasedRenderingEnabled:b,resourceBoundingBox:V,resourceSize:I,dispose:R,pivotOffset:D}]}}))}))},t.prototype._createStageResources=function(e,t){var r=this._context.stage,s=T.materialsFromLodResources(e);t!==this._context.physicalBasedRenderingEnabled&&this.physicalBasedRenderingChanged();for(var i=0,a=s;i<a.length;i++){var o=a[i];r.add(3,o)}for(var n=T.texturesFromLodResources(e),l=0,c=n;l<c.length;l++){var h=c[l];r.add(4,h)}for(var d=T.geometriesFromLodResources(e),u=0,p=d;u<p.length;u++){var m=p[u];r.add(2,m)}return{materials:s,textures:n,geometries:d}},t.prototype._createLodRenderer=function(e){var t=this,r=this._context.stage,s={layerUid:this._context.layer.uid,graphicUid:function(e){return t._instanceIndexToGraphicUid.get(e)},notifyGraphicUpdate:function(e,r){return t._context.notifyGraphicUpdate(t._instanceIndexToGraphicUid.get(e),r)}},i=this._fastUpdates.enabled?{applyTransform:function(e,r,s){e.getFeatureAttribute(r,I),n.mat4.copy(s,E.evaluateModelTransform(t._fastUpdates.materialParameters,I,s))},scaleFactor:function(e,r,s){return r.getFeatureAttribute(s,I),E.evaluateModelTransformScale(e,t._fastUpdates.materialParameters,I)}}:null,a=new w.LodRenderer(e,this._optionalFields,s,i);return a.slicePlane=this._context.slicePlaneEnabled,r.addRenderPlugin(a.slots,a),a},t.prototype._getExternalColorParameters=function(e){var t={};return this._drivenProperties.color?t.externalColor=d.vec4f64.ONES:a.isSome(e)&&a.isSome(e.color)?t.externalColor=s.toUnitRGBA(e.color):(t.externalColor=d.vec4f64.ONES,t.colorMixMode="ignore"),t},t.prototype.destroy=function(){e.prototype.destroy.call(this);var t=this._context.stage;if(a.isSome(this._resources)){t.removeRenderPlugin(this._resources.lodRenderer),this._resources.lodRenderer.destroy();for(var r=this._resources.stageResources,s=0,i=r.materials;s<i.length;s++){var o=i[s];t.remove(3,o.id)}for(var n=0,l=r.textures;n<l.length;n++){var c=l[n];t.remove(4,c.id)}for(var h=0,d=r.geometries;h<d.length;h++){var u=d[h];t.remove(2,u.id)}a.isSome(this._resources.dispose)&&this._resources.dispose()}this._resources=null},t.prototype.createGraphics3DGraphic=function(e){var t=e.graphic;if(!this._validateGeometry(t.geometry))return null;var r=x.placePointOnGeometry(t.geometry);if(a.isNone(r))return this.logger.warn("unsupported geometry type for icon symbol: "+t.geometry.type),null;var s=this.setGraphicElevationContext(t,new v.ElevationContext),i=e.renderingInfo;return this._createAs3DShape(t,r,i,s,t.uid)},t.prototype.notifyDestroyGraphicLayer=function(e){this._instanceIndexToGraphicUid.delete(e.instanceIndex)},t.prototype.graphicLayerToGraphicId=function(){return 0},t.prototype.layerOpacityChanged=function(){if(a.isNone(this._resources))return!0;for(var e=this._drivenProperties.opacity,t=!this.isPrimitive,r=this._resources.stageResources.materials,s=this._resources.originalMaterialParameters,i=0;i<r.length;i++){var o=r[i],n=a.get(this.symbolLayer,"material","color"),l=s[i],c=this._getCombinedOpacity(n,{hasIntrinsicColor:t})*l.opacity;o.setParameterValues({opacity:c,transparent:c<1||e||l.transparent})}return!0},t.prototype.layerElevationInfoChanged=function(e,t){return this.updateGraphics3DGraphicElevationInfo(e,t,y.needsElevationUpdates3D)},t.prototype.slicePlaneEnabledChanged=function(){if(a.isNone(this._resources))return!0;this._resources.lodRenderer.slicePlane=this._context.slicePlaneEnabled;for(var e=0,t=this._resources.stageResources.materials;e<t.length;e++){t[e].setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled})}return!0},t.prototype.physicalBasedRenderingChanged=function(){if(a.isNone(this._resources))return!0;for(var e=this._resources,t=e.stageResources,r=e.isEsriSymbolResource,s=e.isWosr,i=0,o=t.materials;i<o.length;i++){var n=o[i];this.isPrimitive?n.setParameterValues({usePBR:this._context.physicalBasedRenderingEnabled,isSchematic:!0}):r&&!s&&n.setParameterValues({usePBR:this._context.physicalBasedRenderingEnabled,isSchematic:!1})}return!0},t.prototype.pixelRatioChanged=function(){return!0},t.prototype.applyRendererDiff=function(e,t){if(a.isNone(this._resources))return!0;var r=this._resources,s=r.stageResources.materials,i=r.lodRenderer,o=r.resourceBoundingBox,n=r.symbolSize,l=r.resourceSize,c=r.pivotOffset;for(var h in e.diff)switch(h){case"visualVariables":if(!E.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions(o,n,l,c)))return!1;for(var d=0,u=s;d<u.length;d++){u[d].setParameterValues(this._fastUpdates.materialParameters)}i.notifyShaderTransformationChanged();break;default:return!1}return!0},t.prototype.computeComplexity=function(){return a.isNone(this._resources)?e.prototype.computeComplexity.call(this):{primitivesPerFeature:T.geometriesFromLodLevelResources(this._resources.lodResources.levels[0]).reduce((function(e,t){return e+t.data.getIndices(O.VertexAttrConstants.POSITION).length}),0)/3,primitivesPerCoordinate:0,estimated:!1,memory:L.defaultSymbolLayerMemoryComplexity(this.symbol,this.symbolLayer)}},t.prototype.hasLodRenderer=function(){return a.isSome(this._resources)},t.prototype._createAs3DShape=function(e,t,r,s,i){if(!this.hasLodRenderer()||a.isNone(this._resources))return null;var o=this.getFastUpdateAttrValues(e),n=!this._fastUpdates.enabled&&this._hasPerInstanceColor()?g.mixinColorAndOpacity(r.color,r.opacity):null,l=this._context.clippingExtent;if(C.pointToVector(t,B,this._context.elevationProvider.spatialReference),a.isSome(l)&&!u.containsPoint(l,B))return null;var c=this._requiresTerrainElevation(s),h=this._computeGlobalTransform(t,s,V,c?D:null),d=this._computeLocalTransform(this._resources,this.symbolLayer,r,A),p=this._resources.lodRenderer.instanceData,m=p.addInstance();this._instanceIndexToGraphicUid.set(m,i),p.setLocalTransform(m,d,!1),p.setGlobalTransform(m,h),o&&p.setFeatureAttribute(m,o),n&&p.setColor(m,n);var v=f.perLodInstanceElevationAligner,_=new b(this,m,v,s);return c&&(_.alignedSampledElevation=D.sampledElevation),_.needsElevationUpdates=y.needsElevationUpdates3D(s.mode),x.extendPointGraphicElevationContext(_,t,this._context.elevationProvider),_},t.prototype._computeGlobalTransform=function(e,t,r,s){var i=y.evaluateElevationAlignmentAtPoint(e,this._context.elevationProvider,t,this._context.renderCoordsHelper,s);return B[0]=e.x,B[1]=e.y,B[2]=i,U.computeLinearTransformation(e.spatialReference,B,r,this._context.renderCoordsHelper.spatialReference),r},t.prototype._computeLocalTransform=function(e,t,r,s){return n.mat4.identity(s),this._applyObjectRotation(r,!1,s),this._applyObjectRotation(t,!0,s),this._applyObjectScale(e,r,s),this._applyAnchor(e,t,s),s},t.prototype._applyObjectScale=function(e,t,r){if(!this._fastUpdates.enabled||!this._fastUpdates.requiresShaderTransformation){var s=this._drivenProperties.size&&t.size?t.size:e.symbolSize,i=g.computeObjectScale(s,e.symbolSize,e.resourceSize,this._context.renderCoordsHelper.unitInMeters);1===i[0]&&1===i[1]&&1===i[2]||n.mat4.scale(r,r,i)}},t.prototype.prepareSymbolLayerPatch=function(e){if("partial"===e.diff.type){var t=e.diff.diff;this._preparePatchTransform(e,t),this._preparePatchColor(e,t)}},t.prototype.updateGeometry=function(e,t){if(a.isNone(this._resources))return!0;var r=t&&x.placePointOnGeometry(t);if(a.isNone(r))return!1;var s=this.getGeometryElevationMode(t);if(e.elevationContext.mode!==s)return!1;var i=this._requiresTerrainElevation(e.elevationContext);return this._computeGlobalTransform(r,e.elevationContext,V,i?D:null),i&&(e.alignedSampledElevation=D.sampledElevation),this._resources.lodRenderer.instanceData.setGlobalTransform(e.instanceIndex,V,!0),x.extendPointGraphicElevationContext(e,r,this._context.elevationProvider),!0},t.prototype._preparePatchTransform=function(e,t){var r=this;if((t.heading||t.tilt||t.roll||t.width||t.height||t.depth||t.anchor||t.anchorPosition)&&!a.isNone(this._resources)){var s=function(e,t,r){return a.unwrapOr(null!=e&&"complete"===e.type?e.newValue:t,r)},i=s(t.heading,this.symbolLayer.heading,0),o=s(t.tilt,this.symbolLayer.tilt,0),n=s(t.roll,this.symbolLayer.roll,0),l=s(t.width,this.symbolLayer.width,void 0),c=s(t.height,this.symbolLayer.height,void 0),d=s(t.depth,this.symbolLayer.depth,void 0),u=s(t.anchor,this.symbolLayer.anchor,void 0),p=s(t.anchorPosition,this.symbolLayer.anchorPosition,void 0);delete t.heading,delete t.tilt,delete t.roll,delete t.width,delete t.height,delete t.depth,delete t.anchor,delete t.anchorPosition;var f={heading:i,tilt:o,roll:n,anchor:u,anchorPosition:p},y=this._resources;1===this.loadStatus&&e.symbolLayerStatePatches.push((function(){y.symbolSize=h.vec3f64.fromArray(m.objectSymbolLayerSizeWithResourceSize(y.resourceSize,{width:l,height:c,depth:d,isPrimitive:r.symbolLayer.isPrimitive}))})),e.graphics3DGraphicPatches.push((function(e,t){var s=r._computeLocalTransform(y,f,t,A),i=e.instanceIndex;y.lodRenderer.instanceData.setLocalTransform(i,s,!0)}))}},t.prototype._preparePatchColor=function(e,t){var r=this;if(t.material&&"partial"===t.material.type){var i=t.material.diff;if(i.color&&"complete"===i.color.type&&null!=i.color.newValue&&null!=i.color.oldValue){var o=i.color.newValue,n=a.isSome(o)?s.toUnitRGBA(o):d.vec4f64.ONES;delete i.color;var l=this._resources;a.isNone(l)||e.graphics3DGraphicPatches.push((function(e){var t;r._hasPerInstanceColor()?(l.lodRenderer.instanceData.setColor(e.instanceIndex,n),t=r.setMaterialTransparencyParams({},o)):t=r.setMaterialTransparencyParams({externalColor:n},o);for(var s=0,i=l.stageResources.materials;s<i.length;s++){i[s].setParameterValues(t)}}))}}},t.prototype._requiresTerrainElevation=function(e){return"absolute-height"!==e.mode},t.prototype._applyObjectRotation=function(e,t,r){if(!(this._fastUpdates.enabled&&this._fastUpdates.requiresShaderTransformation&&t))return g.computeObjectRotation(e.heading,e.tilt,e.roll,r)},t.prototype._computeAnchor=function(e,t,r){var s=h.vec3f64.create();switch(r.anchor){case"center":c.vec3.copy(s,u.center(e)),c.vec3.negate(s,s);break;case"top":var i=u.center(e);c.vec3.set(s,-i[0],-i[1],-e[5]);break;case"bottom":i=u.center(e);c.vec3.set(s,-i[0],-i[1],-e[2]);break;case"relative":i=u.center(e);var o=u.size(e),n=r.anchorPosition,l=n?h.vec3f64.fromValues(n.x,n.y,n.z):h.vec3f64.ZEROS;c.vec3.multiply(s,o,l),c.vec3.add(s,s,i),c.vec3.negate(s,s);break;case"origin":default:a.isSome(t)?c.vec3.negate(s,t):c.vec3.copy(s,h.vec3f64.ZEROS)}return s},t.prototype._applyAnchor=function(e,t,r){if(!this._fastUpdates.enabled||!this._fastUpdates.requiresShaderTransformation){var s=this._computeAnchor(e.resourceBoundingBox,e.pivotOffset,t);s&&n.mat4.translate(r,r,s)}},t.prototype._hasPerInstanceColor=function(){return this._drivenProperties.color||this._drivenProperties.opacity},t.prototype._fastVisualVariableConvertOptions=function(e,t,r,s){var i=a.isSome(e)?h.vec3f64.fromArray(u.size(e)):h.vec3f64.ONES,o=a.isSome(e)?this._computeAnchor(e,s,this.symbolLayer):h.vec3f64.ZEROS,n=this._context.renderCoordsHelper.unitInMeters,l=g.computeObjectScale(a.isSome(t)?t:void 0,t,r,n),c=h.vec3f64.fromValues(this.symbolLayer.tilt||0,this.symbolLayer.roll||0,this.symbolLayer.heading||0);return{modelSize:i,symbolSize:a.isSome(t)?t:h.vec3f64.ONES,unitInMeters:n,transformation:{anchor:o,scale:l,rotation:c}}},t}(_.default);t.Graphics3DObjectSymbolLayer=G;var B=h.vec3f64.create(),A=l.mat4f64.create(),V=l.mat4f64.create(),I=d.vec4f64.create(),D={verticalDistanceToGround:0,sampledElevation:0};t.default=G}));