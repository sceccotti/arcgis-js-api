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

define(["require","exports","tslib","../../../Graphic","../../../core/arrayUtils","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/SetUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../geometry/support/aaBoundingRect","../../../geometry/support/contains","../../../layers/graphics/dehydratedFeatures","../../../layers/graphics/hydratedFeatures","../../../layers/graphics/controllers/I3SOnDemandController","../../../layers/support/fieldUtils","../../../renderers/support/renderingInfoUtils","../../../tasks/operations/zscale","../../../tasks/support/Query","./I3SPointsWorkerHandle","./LayerView3D","./graphics/Graphics3DFeatureLikeLayerView","./graphics/QueryEngine","./i3s/I3SUtil","./support/DefinitionExpressionSceneLayerView","./support/fieldProperties","./support/layerViewUpdatingProperties","./support/PopupSceneLayerView","../../3d/support/debugFlags","../support/GraphicsMap","../support/orientedBoundingBox","../support/projectionUtils","../../layers/SceneLayerView","../../layers/support/FeatureFilter","../../support/Scheduler","@dojo/framework/shim/Promise"],(function(e,t,r,i,o,n,a,s,d,u,l,p,c,h,g,f,y,_,b,m,v,x,E,S,I,F,O,w,D,C,N,A,T,G,V,R,M,U){"use strict";var P=n.getLogger("esri.views.3d.layers.SceneLayerGraphicsView3D"),j=D.defineFieldProperties(),L=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e._nodesAddedToStage=new Map,e.drapeSourceType=1,e._queryEngine=null,e._memCache=null,e.loadedGraphics=new T.GraphicsMap,e.holeFilling="always",e.progressiveLoadFactor=1,e.supportsHeightUnitConversion=!0,e._coordinatesOutsideExtentErrors=0,e._maxCoordinatesOutsideExtentErrors=20,e}return r.__extends(n,t),n.prototype.initialize=function(){var t=this,r=this.layer;O.checkSpatialReferences(r,this.view.spatialReference,this.view.viewingMode);for(var i=0,o=["layer.renderer","layer.labelingInfo","layer.labelsVisible","definitionExpressionFields","filter"];i<o.length;i++){var n=o[i];this.updatingHandles.add(this,n,(function(){return t._updateRequiredFields()}))}this.updatingHandles.add(r,"rangeInfos",(function(e){return t._rangeInfosChanged(e)}),2),this.updatingHandles.add(r,"renderer",(function(e,r){return t._rendererChange(e,r)})),this.updatingHandles.add(this,"layer.objectIdFilter",(function(){return t._filterChange()})),this.updatingHandles.add(this,"parsedDefinitionExpression",(function(){return t._filterChange()})),this.handles.add(u.init(A,"I3S_TREE_SHOW_TILES",(function(r){if(r&&!t._treeDebugger){var i=t._controller.crsIndex;new Promise((function(t,r){e(["./support/I3STreeDebugger"],t,r)})).then((function(e){var r=e.I3STreeDebugger;!t._treeDebugger&&A.I3S_TREE_SHOW_TILES&&(t._treeDebugger=new r({lv:t,view:t.view,nodeSR:i}))}))}else r||!t._treeDebugger||A.I3S_TREE_SHOW_TILES||(t._treeDebugger.destroy(),t._treeDebugger=null)}))),this._updateRequiredFields(),this._set("graphics3d",new I.default({owner:this,layer:r,preferredUpdatePolicy:1,scaleVisibilityEnabled:!0,filterVisibilityEnabled:!0,timeExtentVisibilityEnabled:!1,frustumVisibilityEnabled:!1,elevationAlignmentEnabled:!0,elevationFeatureExpressionEnabled:!1,suspendResumeExtentMode:"data",dataExtent:r.fullExtent,updateClippingExtent:function(e){return t._updateClippingExtent(e)}})),this.graphics3d.elevationAlignment&&this.graphics3d.elevationAlignment.events.on("invalidate-elevation",(function(e){return t._invalidateElevation(e)})),this.supportsHeightUnitConversion&&(this._verticalScale=v.getGeometryZScaler("point",r.spatialReference,this.view.spatialReference)),this.addResolvingPromise(this.graphics3d.setup()),this._memCache=this.view.resourceController.memoryController.getMemCache(r.uid),this._controller=new _({layerView:this,scaleVisibilityEnabled:!1}),this.when((function(){t._queryEngine=new F.default({layerView:t,task:U.Task.FEATURE_QUERY_ENGINE}),t.updatingHandles.add(t,"maximumNumberOfFeatures",(function(e){return t._controller.featureTarget=e}),2),t.updatingHandles.add(t,"suspended",(function(e){e&&t._removeAllNodeData()}))}))},n.prototype.destroy=function(){this._treeDebugger&&(this._treeDebugger.destroy(),this._treeDebugger=null),this.graphics3d&&(this.graphics3d.destroy(),this._set("graphics3d",null)),this._controller&&(this._controller.destroy(),this._controller=null),this._queryEngine&&(this._queryEngine.destroy(),this._queryEngine=null),this._memCache.destroy(),this._memCache=null,this._nodesAddedToStage=null},Object.defineProperty(n.prototype,"maximumNumberOfFeatures",{get:function(){var e=this.graphics3d&&this.graphics3d.graphicsCore&&this.graphics3d.graphicsCore.displayFeatureLimit;return e?e.maximumNumberOfFeatures:0},set:function(e){null!=e?(this._override("maximumNumberOfFeatures",e),this._controller.fixedFeatureTarget=!0):(this._clearOverride("maximumNumberOfFeatures"),this._controller.fixedFeatureTarget=!1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"maximumNumberOfFeaturesExceeded",{get:function(){return!this.suspended&&(!!this._controller&&!this._controller.leafsReached)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"hasM",{get:function(){return!1},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"hasZ",{get:function(){return!0},enumerable:!1,configurable:!0}),n.prototype.notifyGraphicUpdate=function(e,t){this.graphics3d.graphicsCore.notifyGraphicUpdate(e,t)},n.prototype.whenGraphicAttributes=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i,o=this;return r.__generator(this,(function(r){return i=function(e){for(var t=new Map,r=[],i=0,n=e;i<n.length;i++){var a=n[i],s=o._findGraphicNodeAndIndex(a),d=t.get(s.node);d||(d={node:s.node,indices:[],graphics:[]},r.push(d),t.set(s.node,d)),d.indices.push(s.index),d.graphics.push(a)}return r},[2,O.whenGraphicAttributes(this.layer,e,this._getObjectIdField(),t,i,{populateObjectId:!0})]}))}))},n.prototype.getGraphicFromGraphicUid=function(e){if(!this.loadedGraphics)return null;var t=y.hydrateGraphic(this.loadedGraphics.find((function(t){return t.uid===e})),this.layer),r=this._getObjectIdField();return t&&t.attributes&&t.attributes[r]?(t.layer=this.layer,t.sourceLayer=this.layer,t):null},n.prototype.whenGraphicBounds=function(e,t){return this.graphics3d.graphicsCore.whenGraphicBounds(e,t)},n.prototype.computeAttachmentOrigin=function(e,t){return this.graphics3d.graphicsCore.computeAttachmentOrigin(e,t)},n.prototype.canResume=function(){return t.prototype.canResume.call(this)&&(!this._controller||this._controller.rootNodeVisible)},n.prototype.isUpdating=function(){return!!(this._controller&&this._controller.updating||this.graphics3d&&this.graphics3d.updating)},n.prototype.getRenderingInfo=function(e,t,r){var i=m.getRenderingInfo(e,{renderer:t,arcade:r});if(i&&i.color){var o=i.color;o[0]=o[0]/255,o[1]=o[1]/255,o[2]=o[2]/255}return i},n.prototype.getRenderingInfoAsync=function(e,t,i,o){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(n){return[2,m.getRenderingInfoAsync(e,r.__assign({renderer:t,arcade:i},o))]}))}))},Object.defineProperty(n.prototype,"symbolUpdateType",{get:function(){return this.graphics3d.graphicsCore.symbolUpdateType},enumerable:!1,configurable:!0}),n.prototype._findGraphicNodeAndIndex=function(e){for(var t=e.attributes[this.layer.objectIdField],r=0,i=o.keysOfMap(this._nodesAddedToStage);r<i.length;r++){var n=i[r],a=this._nodesAddedToStage.get(n),s=this._findGraphicIndex(a.bundle,t);if(s>=0)return{node:a.node,index:s}}return null},n.prototype._findGraphicIndex=function(e,t){for(var r=0;r<e.length;r++)for(var i=0,o=e[r].featureIds;i<o.length;i++){if(o[i]===t)return r}return-1},n.prototype.highlight=function(e){return this.graphics3d.highlight(e,this.layer.objectIdField)},n.prototype.extractBinaryPointData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i;return r.__generator(this,(function(r){switch(r.label){case 0:return i={geometryBuffer:e.geometryBuffer},[4,new E.I3SPointsWorkerHandle(this.view.resourceController.scheduler).invoke(i,t).then((function(e){if(a.isSome(e))return{positionData:e.positions,featureIds:e.featureIds};throw new Error("Failed to decompress Draco point data")}))];case 1:return[2,r.sent()]}}))}))},n.prototype.checkExtent=function(e,t){e&&!g.extentContainsCoords3D(e,t)&&(this._coordinatesOutsideExtentErrors<this._maxCoordinatesOutsideExtentErrors&&P.error("Service Error: Coordinates outside of layer extent"),this._coordinatesOutsideExtentErrors+1===this._maxCoordinatesOutsideExtentErrors&&P.error("Maximum number of errors reached. Further errors are ignored."),this._coordinatesOutsideExtentErrors++)},n.prototype.addNode=function(e,t,o){return r.__awaiter(this,void 0,void 0,(function(){var n,d,u,l,h,g,y,_,b,m,v,x,E,S,I,F,O,w,D,C,N,A,T,R,M,U,j,L,W,Z,K,J,Y,X,$,ee,te,re,ie,oe,ne,ae,se,de,ue;return r.__generator(this,(function(r){switch(r.label){case 0:return k(t)||q(t)?this._nodesAddedToStage.has(e.index)?(P.error("I3S node "+e.id+" already added"),[2,void 0]):(n=this._getObjectIdField(),d=this.layer.fullExtent&&function(e,t){e.xmin-=t,e.ymin-=t,e.xmax+=t,e.ymax+=t,e.hasZ&&(e.zmin-=t,e.zmax+=t);e.hasM&&(e.mmin-=t,e.mmax+=t);return e}(this.layer.fullExtent.clone(),.5),u=this._controller.crsVertex,l=this.view.spatialReference,h=[],g=[],y=[],k(t)&&null!=t.geometryBuffer?[4,this.extractBinaryPointData(t,o)]:[3,2]):[2,s.reject()];case 1:if(null==(_=r.sent()))return[2,s.reject()];for(b=this.graphics3d.graphicsCore,m=_.positionData,R=_.featureIds,3,v=m.length/3,x=0;x<v;x++)E=a.isSome(e.serviceObb)?e.serviceObb.center:[0,0,0],S=3*x,I=c.vec3f64.fromValues(m[S+0],m[S+1],m[S+2]),p.vec3.add(I,I,E),e.serviceObb||y.push(I[0],I[1],I[2]),d&&this.checkExtent(d,I),j=[],W=R[x],Z={},null!=W&&(Z[n]=W),K=null==W?i.generateUID():W,V.bufferToBuffer(I,u,0,Q,l,0,1),ee=f.makeDehydratedPoint(Q[0],Q[1],Q[2],l),te=this.loadedGraphics.get(K),a.isSome(te)?(te.level<e.level&&(z.property="geometry",z.graphic=te,z.oldValue=a.unwrap(te.geometry),z.newValue=ee,te.geometry=ee,b.graphicUpdateHandler(z)),j.push(te)):(F=i.generateUID(),j.push({objectId:K,uid:F,geometry:ee,attributes:Z,visible:!0,level:e.level})),h.push.apply(h,j),g.push({featureIds:[W],graphics:j});r.label=2;case 2:if(q(t))for(O=[0,0,0],w=0,D=t.pointData;w<D.length;w++)for(C=D[w],N=C.featureDataPosition,A=N.length,T=C.geometries||[H[A]],R=C.featureIds,d&&this.checkExtent(d,N),M=0;M<T.length;M++)if(U=T[M],"points"===U.params.type){for(j=[],L=M<R.length?M:0,W=R[L],Z={},null!=W&&(Z[n]=W),K=null==W?i.generateUID():W,J=void 0,"Embedded"===U.type&&(J=U.params.vertexAttributes.position),Y=0;Y<J.length;Y+=A){for(X=0;X<A;X++)O[X]=N[X]+J[Y+X];$=3===A,e.serviceObb||y.push(O[0],O[1],$?O[2]:0),V.bufferToBuffer(O,u,0,Q,l,0,1),ee=f.makeDehydratedPoint(Q[0],Q[1],$?Q[2]:void 0,l),te=this.loadedGraphics.get(K),a.isSome(te)?j.push(te):j.push({objectId:K,uid:i.generateUID(),geometry:ee,attributes:Z,visible:!0})}h.push.apply(h,j),g.push({featureIds:C.featureIds,graphics:j})}if(e.numFeatures=h.length,this._updateNodeMemory(e),re=t.attributeDataInfo,B((ie={bundle:g,attributeInfo:re,node:e}).bundle,ie.attributeInfo),y.length>0&&(oe=this._controller.crsIndex,ne=oe.isGeographic?this.view.renderSpatialReference:oe,V.bufferToBuffer(y,u,0,y,ne,0,y.length/3),ae={data:y,size:3,offsetIdx:0,strideIdx:3},e.serviceObb=G.compute(ae),oe.isGeographic&&V.vectorToVector(e.serviceObb.center,ne,e.serviceObb.center,oe),this._controller.updateVisibility(e.index)),!this._controller.isGeometryVisible(e))return this._cacheNodeData(ie),[2,s.resolve()];if(this._verticalScale)for(se=0,de=h;se<de.length;se++)ue=de[se],this._verticalScale(ue.geometry);return this._nodesAddedToStage.set(e.index,ie),this.loadedGraphics.addMany(h),this._filterNode(ie),this._treeDebugger&&this._treeDebugger.update(),[2,s.resolve()]}}))}))},n.prototype.isNodeLoaded=function(e){return this._nodesAddedToStage.has(e)},n.prototype.isNodeReloading=function(){return!1},n.prototype.updateNodeState=function(){},n.prototype._updateNodeMemory=function(e){e.memory=4096+(a.isSome(e.numFeatures)?e.numFeatures*this.graphics3d.graphicsCore.usedMemoryPerGraphic:0)},n.prototype._cacheNodeData=function(e){var t=e.bundle.reduce((function(e,t){return t.graphics.reduce((function(e,t){return f.estimateSize(t)+e}),512+8*t.featureIds.length+e)}),1024);this._memCache.put(this._getMemCacheKey(e.node),e,t)},n.prototype._getMemCacheKey=function(e){return""+e.index},n.prototype._removeAllNodeData=function(){var e=this;this._nodesAddedToStage.forEach((function(t){if(t){var r=t.node;e._updateNodeMemory(r),e._cacheNodeData(t)}})),this._nodesAddedToStage.clear(),this._treeDebugger&&this._treeDebugger.update(),this.loadedGraphics.clear()},n.prototype.removeNode=function(e){var t=this._removeNodeStageData(e);t&&(this._updateNodeMemory(t.node),this._cacheNodeData(t))},n.prototype._removeNodeStageData=function(e){var t=this._nodesAddedToStage.get(e);if(!t)return null;for(var r=0,i=t.bundle;r<i.length;r++){var o=i[r];this.loadedGraphics.removeMany(o.graphics)}return this._nodesAddedToStage.delete(e),this._treeDebugger&&this._treeDebugger.update(),t},n.prototype.loadCachedNodeData=function(e){return s.resolve(this._memCache.pop(this._getMemCacheKey(e)))},n.prototype.addCachedNodeData=function(e,t,r){if(!this._nodesAddedToStage.has(e.index)){for(var i=0,o=t.bundle;i<o.length;i++){var n=o[i];this.loadedGraphics.addMany(n.graphics)}return this._nodesAddedToStage.set(e.index,t),this._updateNodeMemory(e),this.setAttributeData(e.index,r),this._filterNode(t),this._treeDebugger&&this._treeDebugger.update(),s.resolve()}P.error("I3S node "+e.id+" already added")},n.prototype.getLoadedNodeIds=function(){var e=[];return this._nodesAddedToStage.forEach((function(t){return e.push(t.node.id)})),e.sort()},n.prototype.getVisibleNodes=function(){var e=new Array;return this._nodesAddedToStage.forEach((function(t){return e.push(t.node)})),e},n.prototype.getLoadedNodeIndices=function(e){this._nodesAddedToStage.forEach((function(t,r){return e.push(r)}))},n.prototype.getLoadedAttributes=function(e){var t=this._nodesAddedToStage.get(e);if(t&&a.isSome(t.attributeInfo))return t.attributeInfo.loadedAttributes},n.prototype.getAttributeData=function(e){var t=this._nodesAddedToStage.get(e);if(t&&a.isSome(t.attributeInfo))return t.attributeInfo.attributeData},n.prototype.setAttributeData=function(e,t){var r=this._nodesAddedToStage.get(e);if(r&&(r.attributeInfo=t,B(r.bundle,t),this._filterNode(r),this.graphics3d.graphicsCore.labelsEnabled)){var i=r.bundle.map((function(e){return e.graphics.length&&e.graphics[0].uid}));this.graphics3d.graphicsCore.updateLabelingInfo(i)}},n.prototype._updateClippingExtent=function(e){return this._controller&&this._controller.updateClippingArea(e),!1},n.prototype._getObjectIdField=function(){return this.layer.objectIdField||"OBJECTID"},n.prototype._rendererChange=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i,o,n,a;return r.__generator(this,(function(r){switch(r.label){case 0:return i=this.layer.fields,o=new Set,e?[4,e.collectRequiredFields(o,i)]:[3,2];case 1:return r.sent(),n=d.valuesOfSet(o).sort(),[3,3];case 2:n=[],r.label=3;case 3:return o.clear(),t?[4,t.collectRequiredFields(o,i)]:[3,5];case 4:return r.sent(),a=d.valuesOfSet(o).sort(),[3,6];case 5:a=[],r.label=6;case 6:return n.length===a.length&&n.every((function(e,t){return n[t]===a[t]}))?[2]:(this._reloadAllNodes(),[2])}}))}))},n.prototype._rangeInfosChanged=function(e){null!=e&&e.length>0&&P.warn("Unsupported property: rangeInfos are currently only serialized to and from web scenes but do not affect rendering.")},n.prototype._filterChange=function(){var e=this;this._nodesAddedToStage.forEach((function(t){return e._filterNode(t)}))},n.prototype._reloadAllNodes=function(){this._removeAllNodeData(),this._controller&&this._controller.restartNodeLoading()},n.prototype._filterNode=function(e){var t=this._getObjectIdField(),r=null;if(this.layer.objectIdFilter){var i=this.layer.objectIdFilter.ids,o="include"===this.layer.objectIdFilter.method;r=function(e){return i.indexOf(e)>=0===o}}for(var n=this.parsedDefinitionExpression,a=0,s=e.bundle;a<s.length;a++)for(var d=0,u=s[a].graphics;d<u.length;d++){var l=u[d],p=l.visible;r&&!r(l.attributes[t])?l.visible=!1:l.visible=!n||this._evaluateClause(n,l),p!==l.visible&&(z.graphic=l,z.property="visible",z.oldValue=p,z.newValue=l.visible,this.graphics3d.graphicsCore.graphicUpdateHandler(z))}},n.prototype._updateRequiredFields=function(){return r.__awaiter(this,void 0,void 0,(function(){var e,t,i,o,n,s,u,l,p;return r.__generator(this,(function(r){switch(r.label){case 0:return t=(e=this).layer,i=e.layer,o=i.fields,n=i.renderer,s=i.labelsVisible,u=e.filter,l=e.definitionExpressionFields,p=new Set,n?[4,n.collectRequiredFields(p,o)]:[3,2];case 1:r.sent(),r.label=2;case 2:return s?[4,b.collectLabelingFields(p,t)]:[3,4];case 3:r.sent(),r.label=4;case 4:return a.isSome(u)?[4,b.collectFilterFields(p,t,u)]:[3,6];case 5:r.sent(),r.label=6;case 6:return b.collectFields(p,o,l),this._set("requiredFields",d.valuesOfSet(p).sort()),[2]}}))}))},n.prototype._invalidateElevation=function(e){var t=this._controller.crsIndex;V.boundingRectToBoundingRect(e.extent,e.spatialReference,W,t),this._controller.updateElevationChanged(W,t)},n.prototype.createQuery=function(){var e={outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference};return a.isSome(this.filter)?this.filter.createQuery(e):new x(e)},n.prototype.queryFeatures=function(e,t){return this._queryEngine.executeQuery(this._ensureQuery(e),t&&t.signal)},n.prototype.queryObjectIds=function(e,t){return this._queryEngine.executeQueryForIds(this._ensureQuery(e),t&&t.signal)},n.prototype.queryFeatureCount=function(e,t){return this._queryEngine.executeQueryForCount(this._ensureQuery(e),t&&t.signal)},n.prototype.queryExtent=function(e,t){return this._queryEngine.executeQueryForExtent(this._ensureQuery(e),t&&t.signal)},n.prototype._ensureQuery=function(e){return this._addDefinitionExpressionToQuery(a.isNone(e)?this.createQuery():x.from(e))},n.prototype.getUsedMemory=function(){var e=this.graphics3d&&this.graphics3d.graphicsCore;return e?e.usedMemory:0},n.prototype.getUnloadedMemory=function(){var e=this.graphics3d&&this.graphics3d.graphicsCore;return.8*((this._controller?this._controller.unloadedMemoryEstimate:0)+(e?e.unprocessedMemoryEstimate:0))},n.prototype.ignoresMemoryFactor=function(){return this._controller&&this._controller.fixedFeatureTarget},n.prototype.getNumberOfNodes=function(){return this._nodesAddedToStage.size},n.prototype.getNumberOfFeatures=function(){return this.loadedGraphics.length},Object.defineProperty(n.prototype,"performanceInfo",{get:function(){var e={displayedNumberOfFeatures:this.loadedGraphics.length,maximumNumberOfFeatures:this.maximumNumberOfFeatures,totalNumberOfFeatures:-1,nodes:this.getNumberOfNodes(),core:this.graphics3d.graphicsCore.performanceInfo};return this._controller&&this._controller.updateStats(e),e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"test",{get:function(){return{controller:this._controller}},enumerable:!1,configurable:!0}),r.__decorate([l.property()],n.prototype,"graphics3d",void 0),r.__decorate([l.property({aliasOf:"graphics3d.graphicsCore.hasDraped"})],n.prototype,"hasDraped",void 0),r.__decorate([l.property({type:M})],n.prototype,"filter",void 0),r.__decorate([l.property()],n.prototype,"loadedGraphics",void 0),r.__decorate([l.property()],n.prototype,"layer",void 0),r.__decorate([l.property({aliasOf:"layer"})],n.prototype,"i3slayer",void 0),r.__decorate([l.property()],n.prototype,"_controller",void 0),r.__decorate([l.property({dependsOn:["_controller.updating","graphics3d.updating"]})],n.prototype,"updating",void 0),r.__decorate([l.property({dependsOn:["_controller.rootNodeVisible"]})],n.prototype,"suspended",void 0),r.__decorate([l.property()],n.prototype,"holeFilling",void 0),r.__decorate([l.property(C.updatingProgress)],n.prototype,"updatingProgress",void 0),r.__decorate([l.property({aliasOf:"_controller.updatingProgress"})],n.prototype,"updatingProgressValue",void 0),r.__decorate([l.property(j.requiredFields)],n.prototype,"requiredFields",void 0),r.__decorate([l.property(j.availableFields)],n.prototype,"availableFields",void 0),r.__decorate([l.property({type:Number,dependsOn:["graphics3d.graphicsCore.displayFeatureLimit"]})],n.prototype,"maximumNumberOfFeatures",null),r.__decorate([l.property({readOnly:!0,dependsOn:["suspended","_controller.leafsReached"]})],n.prototype,"maximumNumberOfFeaturesExceeded",null),r.__decorate([l.property({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.point.lodFactor"})],n.prototype,"lodFactor",void 0),r.__decorate([l.property({readOnly:!0})],n.prototype,"hasM",null),r.__decorate([l.property({readOnly:!0})],n.prototype,"hasZ",null),n=r.__decorate([l.subclass("esri.views.3d.layers.SceneLayerGraphicsView3D")],n)}(w.DefinitionExpressionSceneLayerView(N.PopupSceneLayerView(S.LayerView3D(R))));function q(e){return"pointData"in e}function k(e){return"geometryBuffer"in e}function B(e,t){for(var r=0;r<e.length;r++)for(var i=0,o=e[r].graphics;i<o.length;i++){var n=o[i];if(n.attributes||(n.attributes={}),a.isSome(t)&&a.isSome(t.loadedAttributes))for(var s=0,d=t.loadedAttributes;s<d.length;s++){var u=d[s].name;t.attributeData[u]&&(n.attributes[u]=O.getCachedAttributeValue(t.attributeData[u],r))}}}var H={2:{type:"Embedded",params:{type:"points",vertexAttributes:{position:[0,0]}}},3:{type:"Embedded",params:{type:"points",vertexAttributes:{position:[0,0,0]}}}},Q=c.vec3f64.create(),z={graphic:null,property:null,oldValue:null,newValue:null},W=h.create();return L}));