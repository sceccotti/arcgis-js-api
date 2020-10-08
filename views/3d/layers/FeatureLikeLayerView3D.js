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

define(["require","exports","tslib","../../../core/Error","../../../core/maybe","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../layers/graphics/hydratedFeatures","../../../layers/graphics/controllers/FeatureTileController3D","../../../renderers/support/renderingInfoUtils","../../../tasks/support/Query","./graphics/Graphics3DFeatureLikeLayerView","./graphics/QueryEngine","./support/projectExtentUtils","../../support/Scheduler"],(function(e,t,r,n,i,o,s,a,p,u,l,c,d,h,y,g){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FeatureLikeLayerView3D=void 0,t.FeatureLikeLayerView3D=function(e){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.controller=null,t.asyncGraphicsUpdates=!1,t.suspendResumeExtentMode="computed",t.slicePlaneEnabled=!1,t.drapeSourceType=1,t.fullExtentInLocalViewSpatialReference=null,t.suspendResumeExtent=null,t._controllerCreated=!1,t.clippingExtent=null,t.supportsHeightUnitConversion=!0,t.pendingController=null,t.queryEngine=null,t}return r.__extends(t,e),t.prototype.initialize=function(){var e=this,t=this.layer;"isTable"in t&&t.isTable?this.addResolvingPromise(o.reject(new n("featurelayerview:table-not-supported","table feature layer can't be displayed",{layer:t}))):(this._set("graphics3d",new d.default({owner:this,layer:t,frustumVisibilityEnabled:!0,scaleVisibilityEnabled:!0,filterVisibilityEnabled:!0,timeExtentVisibilityEnabled:!0,elevationAlignmentEnabled:!0,elevationFeatureExpressionEnabled:!0,preferredUpdatePolicy:this.asyncGraphicsUpdates?1:0,suspendResumeExtentMode:this.suspendResumeExtentMode,updateClippingExtent:function(t){return e.updateClippingExtent(t)}})),this.updatingHandles.add(this,"asyncGraphicsUpdates",(function(t){e.graphics3d.graphicsCore.preferredUpdatePolicy=t?1:0})),this.updatingHandles.add(this,"suspendResumeExtentMode",(function(t){e.graphics3d.suspendResumeExtentMode=t})),this.addResolvingPromise(this.graphics3d.setup().then((function(){return e.validateGeometryType()})).then((function(){return e.queryEngine=new h.default({layerView:e,task:g.Task.FEATURE_QUERY_ENGINE})})).then((function(){return y.toViewIfLocal(e)})).then((function(t){return e.fullExtentInLocalViewSpatialReference=t})).then((function(){return e.initializeController()}))),this.notifyChange("updating"))},t.prototype.destroy=function(){this.destroyPendingController(),this.controller&&(this.controller.destroy(),this.controller=null),this.graphics3d&&(this.graphics3d.destroy(),this._set("graphics3d",null)),this.queryEngine&&(this.queryEngine.destroy(),this.queryEngine=null),this.loadedGraphics=null},t.prototype.destroyPendingController=function(){this.pendingController&&(this.pendingController.destroy(),this.pendingController=null)},Object.defineProperty(t.prototype,"legendEnabled",{get:function(){return this.canResume()},enumerable:!1,configurable:!0}),t.prototype.notifyGraphicUpdate=function(e,t){this.graphics3d.graphicsCore.notifyGraphicUpdate(e,t)},t.prototype.getRenderingInfo=function(e,t,r){var n=l.getRenderingInfo(e,{renderer:t,arcade:r});if(n&&n.color){var i=n.color;i[0]=i[0]/255,i[1]=i[1]/255,i[2]=i[2]/255}return n},t.prototype.getRenderingInfoAsync=function(e,t,n,i){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(o){return[2,l.getRenderingInfoAsync(e,r.__assign({renderer:t,arcade:n},i))]}))}))},t.prototype.getGraphicFromGraphicUid=function(e){var t=this,r=null;return this.loadedGraphics&&this.loadedGraphics.forEach((function(n){n.uid===e&&(r=p.hydrateGraphic(n,t.layer))})),r},Object.defineProperty(t.prototype,"graphics3DGraphics",{get:function(){return this.graphics3d?this.graphics3d.graphicsCore.graphics3DGraphics:null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"graphics3DGraphicsByObjectID",{get:function(){return this.graphics3d?this.graphics3d.graphicsCore.graphics3DGraphicsByObjectID:null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"symbolUpdateType",{get:function(){return this.graphics3d?this.graphics3d.graphicsCore.symbolUpdateType:null},enumerable:!1,configurable:!0}),t.prototype.whenGraphicBounds=function(e,t){return this.graphics3d?this.graphics3d.graphicsCore.whenGraphicBounds(e,t):null},t.prototype.computeAttachmentOrigin=function(e,t){return this.graphics3d?this.graphics3d.graphicsCore.computeAttachmentOrigin(e,t):null},t.prototype.getSymbolLayerSize=function(e,t){return this.graphics3d?this.graphics3d.graphicsCore.getSymbolLayerSize(e,t):null},t.prototype.queryFeatures=function(e,t){return this.queryEngine.executeQuery(this._ensureQuery(e),i.get(t,"signal"))},t.prototype.queryObjectIds=function(e,t){return this.queryEngine.executeQueryForIds(this._ensureQuery(e),i.get(t,"signal"))},t.prototype.queryFeatureCount=function(e,t){return this.queryEngine.executeQueryForCount(this._ensureQuery(e),i.get(t,"signal"))},t.prototype.queryExtent=function(e,t){return this.queryEngine.executeQueryForExtent(this._ensureQuery(e),i.get(t,"signal"))},t.prototype._ensureQuery=function(e){return i.isNone(e)?this.createQuery():c.from(e)},t.prototype.highlight=function(e){return this.graphics3d.highlight(e,this.layer.objectIdField)},t.prototype.canResume=function(){return!!e.prototype.canResume.call(this)&&(!this.graphics3d||!this.graphics3d.suspended)},t.prototype.getSuspendInfo=function(){var t=e.prototype.getSuspendInfo.call(this);return this.graphics3d?r.__assign(r.__assign({},t),this.graphics3d.suspendInfo):t},t.prototype.isUpdating=function(){return!(!this.graphics3d||this.graphics3d.destroyed)&&!(!(!this._controllerCreated||this.controller&&this.controller.updating)&&this.view.basemapTerrain&&this.view.basemapTerrain.ready&&!this.graphics3d.updating)},t.prototype.initializeController=function(){return r.__awaiter(this,void 0,void 0,(function(){var e;return r.__generator(this,(function(t){switch(t.label){case 0:return e=this.createController(),this.pendingController=e,[4,e.when()];case 1:return t.sent(),this.setControllerWhenInitialized(e),[2]}}))}))},t.prototype.setControllerWhenInitialized=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,this.when()];case 1:return t.sent(),[3,3];case 2:return t.sent(),[3,3];case 3:return this._controllerCreated=!0,this.notifyChange("updating"),!this.isResolved()||this.destroyed?(this.destroyPendingController(),[2]):[4,s.whenTrueOnce(this.view,"basemapTerrain.ready")];case 4:return t.sent(),this.beforeSetController(e),this.pendingController=null,this.controller=e,this.loadedGraphics=e.graphics,this.notifyChange("updating"),[2]}}))}))},t.prototype.updateClippingExtent=function(e){if(this.clippingExtent=e,!this.controller)return!1;switch(this.controller.type){case"stream":return!1;case"feature-tile-3d":return this.controller.extent=e,!0}},t.prototype.validateGeometryType=function(){switch(this.layer.geometryType){case"multipatch":case"multipoint":return o.reject(new n("featurelayerview3d:unsupported-geometry-type","Unsupported geometry type ${geometryType}",{geometryType:this.layer.geometryType}))}},t.prototype._getResourceInfo=function(){var e=this.controller&&this.controller instanceof u?this.controller:null;return{displayedNumberOfFeatures:this.loadedGraphics.length,maximumNumberOfFeatures:e?e.maximumNumberOfFeatures:-1,totalNumberOfFeatures:e?e.serviceDataCount:-1,nodes:0,core:this.graphics3d.graphicsCore.performanceInfo,elevationUpdating:this.graphics3d.elevationAlignment.updating,visibilityFrustum:!this.graphics3d.frustumVisibility.suspended,visibilityScale:!this.graphics3d.scaleVisibility.suspended}},Object.defineProperty(t.prototype,"performanceInfo",{get:function(){return this._getResourceInfo()},enumerable:!1,configurable:!0}),r.__decorate([a.property()],t.prototype,"loadedGraphics",void 0),r.__decorate([a.property({dependsOn:["graphics3d.suspended"]})],t.prototype,"suspended",void 0),r.__decorate([a.property({readOnly:!0,dependsOn:["graphics3d.suspended"]})],t.prototype,"legendEnabled",null),r.__decorate([a.property({dependsOn:["graphics3d.updating","controller.updating"]})],t.prototype,"updating",void 0),r.__decorate([a.property()],t.prototype,"controller",void 0),r.__decorate([a.property()],t.prototype,"graphics3d",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"asyncGraphicsUpdates",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"suspendResumeExtentMode",void 0),r.__decorate([a.property({type:Boolean})],t.prototype,"slicePlaneEnabled",void 0),r.__decorate([a.property({readOnly:!0,dependsOn:["graphics3d.suspendInfo"]})],t.prototype,"suspendInfo",void 0),r.__decorate([a.property({aliasOf:"graphics3d.graphicsCore.hasDraped"})],t.prototype,"hasDraped",void 0),t=r.__decorate([a.subclass("esri.views.3d.layers.FeatureLikeLayerView3D")],t)}(e)}}));