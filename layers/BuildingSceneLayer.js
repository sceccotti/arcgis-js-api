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

define(["require","exports","tslib","../core/Collection","../core/CollectionFlattener","../core/Error","../core/lang","../core/loadAll","../core/Logger","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","../geometry/Extent","../geometry/SpatialReference","./Layer","./buildingSublayers/BuildingComponentSublayer","./buildingSublayers/BuildingGroupSublayer","./mixins/ArcGISService","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/ScaleRangeLayer","./mixins/SceneService","./support/BuildingFilter","./support/BuildingSummaryStatistics","./support/commonProperties","./support/FetchAssociatedFeatureLayer"],(function(e,r,t,o,i,n,a,s,l,u,p,y,c,d,v,f,b,h,g,S,_,m,w,O,I,L,x,F){"use strict";var T=l.getLogger("esri.layers.BuildingSceneLayer"),A=o.ofType(I),B=a.clone(g.sublayersProperty);return B.json.origins["web-scene"]={type:[h],write:{enabled:!0,overridePolicy:function(){return{enabled:!1}}}},B.json.origins["portal-item"]={type:[h],write:{enabled:!0,overridePolicy:function(){return{enabled:!1}}}},function(e){function r(r){var t=e.call(this,r)||this;return t.operationalLayerType="BuildingSceneLayer",t.allSublayers=new i({root:t,rootCollectionNames:["sublayers"],getChildrenFunction:function(e){return"building-group"===e.type?e.sublayers:null}}),t.sublayers=null,t.sublayerOverrides=null,t.filters=new A,t.activeFilterId=null,t.summaryStatistics=null,t.outFields=null,t.type="building-scene",t}return t.__extends(r,e),r.prototype.normalizeCtorArgs=function(e){return"string"==typeof e?{url:e}:e},r.prototype.destroy=function(){this.allSublayers.destroy()},r.prototype.readSublayers=function(e,r,t){var o=this,i=g.readSublayers(e,r,t);return g.forEachSublayer(i,(function(e){return e.layer=o})),this.sublayerOverrides&&(this.applySublayerOverrides(i,this.sublayerOverrides),this.sublayerOverrides=null),i},r.prototype.applySublayerOverrides=function(e,r){var t=r.overrides,o=r.context;g.forEachSublayer(e,(function(e){return e.read(t.get(e.id),o)}))},r.prototype.readSublayerOverrides=function(e,r){for(var t=new Map,o=0,i=e;o<i.length;o++){var a=i[o];null!=a&&"object"==typeof a&&"number"==typeof a.id?t.set(a.id,a):r.messages.push(new n("building-scene-layer:invalid-sublayer-override","Invalid value for sublayer override. Not an object or no id specified.",{value:a}))}return{overrides:t,context:r}},r.prototype.writeSublayerOverrides=function(e,r,t){var o=[];g.forEachSublayer(this.sublayers,(function(e){var r=e.write({},t);Object.keys(r).length>1&&o.push(r)})),o.length>0&&(r.sublayers=o)},r.prototype.writeUnappliedOverrides=function(e,r){r.sublayers=[],e.overrides.forEach((function(e){r.sublayers.push(a.clone(e))}))},r.prototype.write=function(r,t){return r=e.prototype.write.call(this,r,t),!t||"web-scene"!==t.origin&&"portal-item"!==t.origin||(this.sublayers?this.writeSublayerOverrides(this.sublayers,r,t):this.sublayerOverrides&&this.writeUnappliedOverrides(this.sublayerOverrides,r)),r},r.prototype.read=function(r,t){if(e.prototype.read.call(this,r,t),t&&("web-scene"===t.origin||"portal-item"===t.origin)&&null!=r&&Array.isArray(r.sublayers)){var o=this.readSublayerOverrides(r.sublayers,t);this.sublayers?this.applySublayerOverrides(this.sublayers,o):this.sublayerOverrides=o}},r.prototype.readSummaryStatistics=function(e,r){if("string"==typeof r.statisticsHRef){var t=c.join(this.parsedUrl.path,r.statisticsHRef);return new L({url:t})}return null},Object.defineProperty(r.prototype,"elevationInfo",{set:function(e){this._set("elevationInfo",e),this._validateElevationInfo()},enumerable:!1,configurable:!0}),r.prototype.load=function(e){var r=this,t=u.isSome(e)?e.signal:null,o=this.loadFromPortal({supportedTypes:["Scene Service"]},e).catch((function(){})).then((function(){return r._fetchService(t)})).then((function(){return r._fetchAssociatedFeatureService(t)}));return this.addResolvingPromise(o),y.resolve(this)},r.prototype.loadAll=function(){var e=this;return s.loadAll(this,(function(r){g.forEachSublayer(e.sublayers,(function(e){"building-group"!==e.type&&r(e)})),e.summaryStatistics&&r(e.summaryStatistics)}))},r.prototype.saveAs=function(e,r){return t.__awaiter(this,void 0,void 0,(function(){var o=this;return t.__generator(this,(function(i){return[2,this._debouncedSaveOperations(1,t.__assign(t.__assign({},r),{getTypeKeywords:function(){return o._getTypeKeywords()},portalItemLayerType:"building-scene"}),e)]}))}))},r.prototype.save=function(){return t.__awaiter(this,void 0,void 0,(function(){var e,r=this;return t.__generator(this,(function(t){return e={getTypeKeywords:function(){return r._getTypeKeywords()},portalItemLayerType:"building-scene"},[2,this._debouncedSaveOperations(0,e)]}))}))},r.prototype.validateLayer=function(e){if(!e.layerType||"Building"!==e.layerType)throw new n("buildingscenelayer:layer-type-not-supported","BuildingSceneLayer does not support this layer type",{layerType:e.layerType})},r.prototype._getTypeKeywords=function(){return["Building"]},r.prototype._validateElevationInfo=function(){var e=this.elevationInfo;e&&("absolute-height"!==e.mode&&T.warn(".elevationInfo=","Building scene layers only support absolute-height elevation mode"),e.featureExpressionInfo&&"0"!==e.featureExpressionInfo.expression&&T.warn(".elevationInfo=","Building scene layers do not support featureExpressionInfo"))},r.prototype._fetchAssociatedFeatureService=function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,o,i;return t.__generator(this,(function(t){switch(t.label){case 0:r=new F.FetchAssociatedFeatureLayer(this.parsedUrl,this.portalItem,e),t.label=1;case 1:return t.trys.push([1,3,,4]),o=this,[4,r.fetchPortalItem()];case 2:return o.associatedFeatureServiceItem=t.sent(),[3,4];case 3:return i=t.sent(),T.warn("Associated feature service item could not be loaded",i),[3,4];case 4:return[2]}}))}))},t.__decorate([d.property({type:["BuildingSceneLayer"]})],r.prototype,"operationalLayerType",void 0),t.__decorate([d.property({readOnly:!0})],r.prototype,"allSublayers",void 0),t.__decorate([d.property(B)],r.prototype,"sublayers",void 0),t.__decorate([d.reader("service","sublayers")],r.prototype,"readSublayers",null),t.__decorate([d.property({type:A,nonNullable:!0,json:{write:!0}})],r.prototype,"filters",void 0),t.__decorate([d.property({type:String,json:{write:!0}})],r.prototype,"activeFilterId",void 0),t.__decorate([d.property({readOnly:!0,type:L})],r.prototype,"summaryStatistics",void 0),t.__decorate([d.reader("summaryStatistics",["statisticsHRef"])],r.prototype,"readSummaryStatistics",null),t.__decorate([d.property({type:[String],json:{read:!1}})],r.prototype,"outFields",void 0),t.__decorate([d.property(x.readOnlyService(v))],r.prototype,"fullExtent",void 0),t.__decorate([d.property({type:["show","hide","hide-children"]})],r.prototype,"listMode",void 0),t.__decorate([d.property(x.readOnlyService(f))],r.prototype,"spatialReference",void 0),t.__decorate([d.property(x.elevationInfo)],r.prototype,"elevationInfo",null),t.__decorate([d.property({json:{read:!1},readOnly:!0})],r.prototype,"type",void 0),t.__decorate([d.property()],r.prototype,"associatedFeatureServiceItem",void 0),r=t.__decorate([d.subclass("esri.layers.BuildingSceneLayer")],r)}(O.SceneService(S.ArcGISService(_.OperationalLayer(m.PortalLayer(w.ScaleRangeLayer(p.MultiOriginJSONMixin(b)))))))}));