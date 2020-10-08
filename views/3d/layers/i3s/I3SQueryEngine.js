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

define(["require","exports","tslib","../../../../core/Accessor","../../../../core/Error","../../../../core/Handles","../../../../core/maybe","../../../../core/accessorSupport/decorators","../../../../geometry/Extent","../../../../layers/graphics/data/QueryEngine","../../../../tasks/support/FeatureSet","../../../../tasks/support/Query"],(function(e,t,r,n,i,o,a,u,s,c,y,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.I3SQueryEngine=void 0;var l=c.default,p=function(e){function t(t){var r=e.call(this,t)||this;return r._dataQueryEngineInstance=null,r._handles=new o,r}return r.__extends(t,e),Object.defineProperty(t.prototype,"defaultQueryJSON",{get:function(){return new d({outSpatialReference:this.spatialReference}).toJSON()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"dataQueryEngine",{get:function(){return this.ensureDataQueryEngine()},enumerable:!1,configurable:!0}),t.prototype.initialize=function(){var e=this;this._handles.add(this.layerView.on("visible-geometry-changed",(function(){return e.spatialIndex.events.emit("changed")})))},t.prototype.destroy=function(){this._dataQueryEngineInstance&&(this._dataQueryEngineInstance.destroy(),this._dataQueryEngineInstance=null),this._handles&&(this._handles.destroy(),this._handles=null),this._set("layerView",null)},t.prototype.executeQueryForCount=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return[2,this.dataQueryEngine.executeQueryForCount(this._ensureQueryJSON(e),t)]}))}))},t.prototype.executeQueryForExtent=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,i,o,a;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,this.dataQueryEngine.executeQueryForExtent(this._ensureQueryJSON(e),t)];case 1:return n=r.sent(),i=n.count,o=n.extent,a=s.fromJSON(o),[2,{count:i,extent:a}]}}))}))},t.prototype.executeQueryForIds=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return[2,this.dataQueryEngine.executeQueryForIds(this._ensureQueryJSON(e),t)]}))}))},t.prototype.executeQuery=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o,a;return r.__generator(this,(function(r){switch(r.label){case 0:if((n=this._ensureQueryJSON(e)).returnGeometry)throw new i("feature-store:unsupported-query","returnGeometry is not yet supported for mesh scene layer queries");if(n.returnCentroid)throw new i("feature-store:unsupported-query","returnCentroid is not yet supported for mesh scene layer queries");return[4,this.dataQueryEngine.executeQuery(n,t)];case 1:return o=r.sent(),(a=y.fromJSON(o)).features.forEach((function(e){e.geometry=null})),[2,a]}}))}))},t.prototype._ensureQueryJSON=function(e){if(a.isNone(e))return this.defaultQueryJSON;var t=e.toJSON();return t.outSpatialReference||(e.outSpatialReference=this.spatialReference),t},t.prototype.ensureDataQueryEngine=function(){if(this._dataQueryEngineInstance)return this._dataQueryEngineInstance;var e=this.layer.objectIdField||"OBJECTID",t=this.layer.fields.map((function(e){return e.toJSON()})),r=this.layerView.view.resourceController.scheduler,n=this.spatialReference.toJSON(),i=this.task,o=this.spatialIndex;return this._dataQueryEngineInstance=new l({hasZ:!0,hasM:!1,geometryType:"esriGeometryPolygon",fields:t,timeInfo:null,spatialReference:n,objectIdField:e,featureStore:o,scheduler:r,task:i}),this._dataQueryEngineInstance},r.__decorate([u.property({constructOnly:!0})],t.prototype,"layerView",void 0),r.__decorate([u.property({constructOnly:!0})],t.prototype,"task",void 0),r.__decorate([u.property({constructOnly:!0})],t.prototype,"spatialIndex",void 0),r.__decorate([u.property({readOnly:!0,aliasOf:"layerView.view.spatialReference"})],t.prototype,"spatialReference",void 0),r.__decorate([u.property({readOnly:!0,aliasOf:"layerView.i3slayer"})],t.prototype,"layer",void 0),r.__decorate([u.property({readOnly:!0,dependsOn:["spatialReference"]})],t.prototype,"defaultQueryJSON",null),t=r.__decorate([u.subclass("esri.views.3d.layers.i3s.I3SQueryEngine")],t)}(n);t.I3SQueryEngine=p,t.default=p}));