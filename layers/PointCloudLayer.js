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

define(["require","exports","tslib","../PopupTemplate","../request","../core/arrayUtils","../core/Error","../core/lang","../core/Logger","../core/maybe","../core/MultiOriginJSONSupport","../core/object","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","./Layer","./mixins/ArcGISService","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/ScaleRangeLayer","./mixins/SceneService","./pointCloudFilters/typeUtils","./support/commonProperties","./support/Field","./support/fieldProperties","./support/FieldsIndex","../popup/ExpressionInfo","../renderers/support/pointCloud/typeUtils","../support/popupUtils"],(function(e,r,t,o,n,i,a,p,s,l,d,u,y,c,f,v,g,h,_,m,b,w,I,S,x,T,P,F,L){"use strict";var O=s.getLogger("esri.layers.PointCloudLayer"),j=x.defineFieldProperties();return function(e){function r(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];var o=e.apply(this,r)||this;return o.operationalLayerType="PointCloudLayer",o.popupEnabled=!0,o.popupTemplate=null,o.opacity=1,o.filters=[],o.fields=null,o.outFields=null,o.path=null,o.legendEnabled=!0,o.renderer=null,o.type="point-cloud",o}return t.__extends(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t.__assign({url:e},r):e},Object.defineProperty(r.prototype,"defaultPopupTemplate",{get:function(){return this.attributeStorageInfo?this.createPopupTemplate():null},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"fieldsIndex",{get:function(){return new T(this.fields)},enumerable:!1,configurable:!0}),r.prototype.getFieldDomain=function(e){var r=this.fieldsIndex.get(e);return r&&r.domain?r.domain:null},r.prototype.readServiceFields=function(e,r,t){return Array.isArray(e)?e.map((function(e){var r=new S;return"FieldTypeInteger"===e.type&&((e=p.clone(e)).type="esriFieldTypeInteger"),r.read(e,t),r})):Array.isArray(r.attributeStorageInfo)?r.attributeStorageInfo.map((function(e){return new S({name:e.name,type:"ELEVATION"===e.name?"double":"integer"})})):null},Object.defineProperty(r.prototype,"elevationInfo",{set:function(e){this._set("elevationInfo",e),this._validateElevationInfo()},enumerable:!1,configurable:!0}),r.prototype.writeRenderer=function(e,r,t,o){u.setDeepValue("layerDefinition.drawingInfo.renderer",e.write(null,o),r)},r.prototype.load=function(e){var r=this,t=l.isSome(e)?e.signal:null,o=this.loadFromPortal({supportedTypes:["Scene Service"]},e).then((function(){return r._fetchService(t)}),(function(){return r._fetchService(t)}));return this.addResolvingPromise(o),y.resolve(this)},r.prototype.createPopupTemplate=function(e){var r=L.createPopupTemplate(this,e);return this.formatPopupTemplateReturnsField(r),this.formatPopupTemplateRGBField(r),r},r.prototype.formatPopupTemplateReturnsField=function(e){var r=this.fieldsIndex.get("RETURNS");if(r){var o=i.find(e.fieldInfos,(function(e){return e.fieldName===r.name}));if(o){var n=new P({name:"pcl-returns-decoded",title:r.alias||r.name,expression:"\n        var returnValue = $feature."+r.name+';\n        return (returnValue % 16) + " / " + Floor(returnValue / 16);\n      '});e.expressionInfos=t.__spreadArrays(e.expressionInfos||[],[n]),o.fieldName="expression/pcl-returns-decoded"}}},r.prototype.formatPopupTemplateRGBField=function(e){var r=this.fieldsIndex.get("RGB");if(r){var o=i.find(e.fieldInfos,(function(e){return e.fieldName===r.name}));if(o){var n=new P({name:"pcl-rgb-decoded",title:r.alias||r.name,expression:"\n        var rgb = $feature."+r.name+';\n        var red = Floor(rgb / 65536, 0);\n        var green = Floor((rgb - (red * 65536)) / 256,0);\n        var blue = rgb - (red * 65536) - (green * 256);\n\n        return "rgb(" + red + "," + green + "," + blue + ")";\n      '});e.expressionInfos=t.__spreadArrays(e.expressionInfos||[],[n]),o.fieldName="expression/pcl-rgb-decoded"}}},r.prototype.queryCachedStatistics=function(e,r){return t.__awaiter(this,void 0,void 0,(function(){var o,i,p,s,l;return t.__generator(this,(function(t){switch(t.label){case 0:return[4,this.load(r)];case 1:if(t.sent(),!this.attributeStorageInfo)throw new a("scenelayer:no-cached-statistics","Cached statistics are not available for this layer");if(!(o=this.fieldsIndex.get(e)))throw new a("pointcloudlayer:field-unexisting","Field '"+e+"' does not exist on the layer");for(i=0,p=this.attributeStorageInfo;i<p.length;i++)if((s=p[i]).name===o.name)return l=c.join(this.parsedUrl.path,"./statistics/"+s.key),[2,n(l,{query:{f:"json"},responseType:"json",signal:r?r.signal:null}).then((function(e){return e.data}))];throw new a("pointcloudlayer:no-cached-statistics","Cached statistics for this attribute are not available")}}))}))},r.prototype.saveAs=function(e,r){return t.__awaiter(this,void 0,void 0,(function(){var o=this;return t.__generator(this,(function(n){return[2,this._debouncedSaveOperations(1,t.__assign(t.__assign({},r),{getTypeKeywords:function(){return o._getTypeKeywords()},portalItemLayerType:"point-cloud"}),e)]}))}))},r.prototype.save=function(){return t.__awaiter(this,void 0,void 0,(function(){var e,r=this;return t.__generator(this,(function(t){return e={getTypeKeywords:function(){return r._getTypeKeywords()},portalItemLayerType:"point-cloud"},[2,this._debouncedSaveOperations(0,e)]}))}))},r.prototype.validateLayer=function(e){if(e.layerType&&"PointCloud"!==e.layerType)throw new a("pointcloudlayer:layer-type-not-supported","PointCloudLayer does not support this layer type",{layerType:e.layerType});if(isNaN(this.version.major)||isNaN(this.version.minor))throw new a("layer:service-version-not-supported","Service version is not supported.",{serviceVersion:this.version.versionString,supportedVersions:"1.x-2.x"});if(this.version.major>2)throw new a("layer:service-version-too-new","Service version is too new.",{serviceVersion:this.version.versionString,supportedVersions:"1.x-2.x"})},r.prototype.hasCachedStatistics=function(e){return null!=this.attributeStorageInfo&&this.attributeStorageInfo.some((function(r){return r.name===e}))},r.prototype._getTypeKeywords=function(){return["PointCloud"]},r.prototype._validateElevationInfo=function(){var e=this.elevationInfo;e&&("absolute-height"!==e.mode&&O.warn(".elevationInfo=","Point cloud layers only support absolute-height elevation mode"),e.featureExpressionInfo&&"0"!==e.featureExpressionInfo.expression&&O.warn(".elevationInfo=","Point cloud layers do not support featureExpressionInfo"))},t.__decorate([f.property({type:["PointCloudLayer"]})],r.prototype,"operationalLayerType",void 0),t.__decorate([f.property(I.popupEnabled)],r.prototype,"popupEnabled",void 0),t.__decorate([f.property({type:o,json:{name:"popupInfo",write:!0}})],r.prototype,"popupTemplate",void 0),t.__decorate([f.property({readOnly:!0,json:{read:!1},dependsOn:["fields","title","attributeStorageInfo"]})],r.prototype,"defaultPopupTemplate",null),t.__decorate([f.property({readOnly:!0,json:{write:!1,read:!1,origins:{"web-document":{write:!1,read:!1}}}})],r.prototype,"opacity",void 0),t.__decorate([f.property({type:["show","hide"]})],r.prototype,"listMode",void 0),t.__decorate([f.property({types:[w.types],json:{origins:{service:{read:{source:"filters"}}},name:"layerDefinition.filters",write:!0}})],r.prototype,"filters",void 0),t.__decorate([f.property({type:[S]})],r.prototype,"fields",void 0),t.__decorate([f.property({readOnly:!0,dependsOn:["fields"]})],r.prototype,"fieldsIndex",null),t.__decorate([f.reader("service","fields",["fields","attributeStorageInfo"])],r.prototype,"readServiceFields",null),t.__decorate([f.property(j.outFields)],r.prototype,"outFields",void 0),t.__decorate([f.property({readOnly:!0})],r.prototype,"attributeStorageInfo",void 0),t.__decorate([f.property(I.elevationInfo)],r.prototype,"elevationInfo",null),t.__decorate([f.property({type:String,json:{origins:{"web-scene":{read:!0,write:!0},"portal-item":{read:!0,write:!0}},read:!1}})],r.prototype,"path",void 0),t.__decorate([f.property(I.legendEnabled)],r.prototype,"legendEnabled",void 0),t.__decorate([f.property({types:F.types,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:{target:{"layerDefinition.drawingInfo.renderer":{types:F.types},"layerDefinition.drawingInfo.transparency":{type:Number}}}}})],r.prototype,"renderer",void 0),t.__decorate([f.writer("renderer")],r.prototype,"writeRenderer",null),t.__decorate([f.property({json:{read:!1},readOnly:!0})],r.prototype,"type",void 0),r=t.__decorate([f.subclass("esri.layers.PointCloudLayer")],r)}(b.SceneService(g.ArcGISService(h.OperationalLayer(_.PortalLayer(m.ScaleRangeLayer(d.MultiOriginJSONMixin(v)))))))}));