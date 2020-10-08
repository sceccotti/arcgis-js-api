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

define(["require","exports","tslib","../config","../Graphic","../PopupTemplate","../request","../core/Collection","../core/CollectionFlattener","../core/Handles","../core/jsonMap","../core/lang","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","../core/accessorSupport/write","../geometry/Extent","../geometry/SpatialReference","../geometry/support/scaleUtils","../geometry/support/spatialReferenceUtils","./Layer","./mixins/BlendLayer","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./mixins/TemporalLayer","./support/arcgisLayerUrl","./support/commonProperties","./support/ExportWMSImageParameters","./support/WMSSublayer","./support/wmsUtils"],(function(e,r,t,a,o,n,i,s,p,l,u,y,d,c,m,f,g,h,_,v,b,x,w,S,I,E,R,L,O,U,P,M,q,F){"use strict";var j=new u.JSONMap({bmp:"image/bmp",gif:"image/gif",jpg:"image/jpeg",png:"image/png",svg:"image/svg+xml"},{ignoreUnknown:!1});function T(e,r,t){var a=new Map;e.every((function(e){return null==e.id}))&&(e=y.clone(e)).forEach((function(e,r){return e.id=r}));for(var o=0,n=e;o<n.length;o++){var i=n[o];(d=new q).read(i,r),-1===(null==t?void 0:t.indexOf(d.name))&&(d.visible=!1),a.set(d.id,d)}for(var p=[],l=0,u=e;l<u.length;l++){i=u[l];var d=a.get(i.id);if(null!=i.parentLayerId&&i.parentLayerId>=0){var c=a.get(i.parentLayerId);c.sublayers||(c.sublayers=new s),c.sublayers.unshift(d)}else p.unshift(d)}return p}return(function(e){function r(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];var a=e.apply(this,r)||this;return a._sublayersHandles=new l,a.allSublayers=new p({root:a,rootCollectionNames:["sublayers"],getChildrenFunction:function(e){return e.sublayers}}),a.customParameters=null,a.customLayerParameters=null,a.copyright=null,a.description=null,a.dimensions=null,a.fullExtent=null,a.fullExtents=null,a.featureInfoFormat=null,a.featureInfoUrl=null,a.imageFormat=null,a.imageMaxHeight=2048,a.imageMaxWidth=2048,a.imageTransparency=!0,a.legendEnabled=!0,a.mapUrl=null,a.isReference=null,a.operationalLayerType="WMS",a.spatialReference=null,a.spatialReferences=null,a.sublayers=null,a.type="wms",a.url=null,a.version=null,a.watch("sublayers",(function(e,r){r&&(r.forEach((function(e){e.layer=null})),a._sublayersHandles.removeAll(),a._sublayersHandles=null),e&&(e.forEach((function(e){e.parent=a,e.layer=a})),a._sublayersHandles||(a._sublayersHandles=new l),a._sublayersHandles.add([e.on("after-add",(function(e){var r=e.item;r.parent=a,r.layer=a})),e.on("after-remove",(function(e){var r=e.item;r.parent=null,r.layer=null}))]))}),!0),a}return t.__extends(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t.__assign({url:e},r):e},r.prototype.destroy=function(){var e;null===(e=this._exportWMSImageParameters)||void 0===e||e.destroy()},r.prototype.load=function(e){var r=this,t=d.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["WMS"]},e).then((function(){return r._fetchService(t)}),(function(){return r._fetchService(t)}))),m.resolve(this)},r.prototype.readFullExtentFromItemOrMap=function(e,r){var t=r.extent;return new _({xmin:t[0][0],ymin:t[0][1],xmax:t[1][0],ymax:t[1][1]})},r.prototype.writeFullExtent=function(e,r){r.extent=[[e.xmin,e.ymin],[e.xmax,e.ymax]]},r.prototype.readImageFormat=function(e,r){var t=r.supportedImageFormatTypes;return t&&t.indexOf("image/png")>-1?"image/png":t&&t[0]},r.prototype.readSpatialReferenceFromItemOrDocument=function(e,r){return new v(r.spatialReferences[0])},r.prototype.writeSpatialReferences=function(e,r){var t=this.spatialReference&&this.spatialReference.wkid;e&&t?(r.spatialReferences=e.filter((function(e){return e!==t})),r.spatialReferences.unshift(t)):r.spatialReferences=e},r.prototype.readSublayersFromItemOrMap=function(e,r,t){return T(r.layers,t,r.visibleLayers)},r.prototype.readSublayers=function(e,r,t){return T(r.layers,t)},r.prototype.writeSublayers=function(e,r,a,o){r.layers=[];var n=new Map,i=e.flatten((function(e){var r=e.sublayers;return r&&r.toArray()})).toArray();i.forEach((function(e){"number"==typeof e.parent.id&&(n.has(e.parent.id)?n.get(e.parent.id).push(e.id):n.set(e.parent.id,[e.id]))})),i.forEach((function(e){var a=t.__assign({sublayer:e},o),i=e.write({parentLayerId:"number"==typeof e.parent.id?e.parent.id:-1},a);if(n.has(e.id)&&(i.sublayerIds=n.get(e.id)),!e.sublayers&&e.name){var s=e.write({},a);delete s.id,r.layers.push(s)}})),r.visibleLayers=i.filter((function(e){return e.visible&&!e.sublayers})).map((function(e){return e.name}))},r.prototype.createExportImageParameters=function(e,r,t,a){var o,n=a&&a.pixelRatio||1,i=b.getScale({extent:e,width:r})*n;return null===(o=this._exportWMSImageParameters)||void 0===o||o.destroy(),this._exportWMSImageParameters=new M({layer:this,extent:e,scale:i}),this._exportWMSImageParameters.toJSON()},r.prototype.fetchImage=function(e,r,a,o){var n,s;return t.__awaiter(this,void 0,void 0,(function(){var p,l,u,y,d,c,m;return t.__generator(this,(function(f){return p=this.mapUrl,(l=this.createExportImageParameters(e,r,a,o)).layers?(y=null===(n=null==o?void 0:o.timeExtent)||void 0===n?void 0:n.start,d=null===(s=null==o?void 0:o.timeExtent)||void 0===s?void 0:s.end,c=y&&d?y.getTime()===d.getTime()?F.toISOString(y):F.toISOString(y)+"/"+F.toISOString(d):void 0,m={responseType:"image",query:this._mixCustomParameters(t.__assign(t.__assign({width:r,height:a},l),{time:c})),signal:null==o?void 0:o.signal},(null==o?void 0:o.timestamp)&&(m.query=t.__assign({_ts:o.timestamp},m.query)),[2,i(p,m).then((function(e){return e.data}))]):((u=document.createElement("canvas")).width=r,u.height=a,[2,u])}))}))},r.prototype.fetchFeatureInfo=function(e,r,a,s,p){var l=this,u=F.getPopupLayers(this._exportWMSImageParameters.visibleSublayers);if(!this.featureInfoUrl||!u)return null;var y="1.3.0"===this.version?{I:s,J:p}:{x:s,y:p},d=t.__assign({query_layers:u,request:"GetFeatureInfo",info_format:this.featureInfoFormat,feature_count:25,width:r,height:a},y),c=t.__assign(t.__assign({},this.createExportImageParameters(e,r,a)),d);return c=this._mixCustomParameters(c),i(this.featureInfoUrl,{query:c,responseType:"text"}).then((function(e){var r=l.featureInfoUrl;for(var t in r+=-1===r.indexOf("?")?"?":"",c)r+="?"===r.substring(r.length-1,r.length)?"":"&",r+=t+"="+c[t];var a=document.createElement("iframe");return a.src=r,a.frameBorder="0",a.marginHeight="0",a.marginWidth="0",a.innerHTML=e.data,a.style.width="100%",new o({sourceLayer:l,popupTemplate:new n({title:l.title,content:a})})}))},r.prototype.findSublayerById=function(e){return this.allSublayers.find((function(r){return r.id===e}))},r.prototype.findSublayerByName=function(e){return this.allSublayers.find((function(r){return r.name===e}))},r.prototype.supportsSpatialReference=function(e){return U.isWmsServer(this.url)||this.spatialReferences.some((function(r){var t=900913===r?v.WebMercator:new v({wkid:r});return x.equals(t,e)}))},r.prototype._fetchService=function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,o;return t.__generator(this,(function(n){switch(n.label){case 0:return this.resourceInfo?[3,2]:(this.parsedUrl.query&&this.parsedUrl.query.service&&(this.parsedUrl.query.SERVICE=this.parsedUrl.query.service,delete this.parsedUrl.query.service),this.parsedUrl.query&&this.parsedUrl.query.request&&(this.parsedUrl.query.REQUEST=this.parsedUrl.query.request,delete this.parsedUrl.query.request),[4,i(this.parsedUrl.path,{query:t.__assign(t.__assign({SERVICE:"WMS",REQUEST:"GetCapabilities"},this.parsedUrl.query),this.customParameters),responseType:"xml",signal:e})]);case 1:r=n.sent(),this.resourceInfo=F.parseCapabilities(r.data),n.label=2;case 2:return this.parsedUrl&&("https"!==(o=new f.Url(this.parsedUrl.path)).scheme||o.port&&"443"!==o.port||-1!==a.request.httpsDomains.indexOf(o.host)||a.request.httpsDomains.push(o.host)),this.read(this.resourceInfo,{origin:"service"}),[2]}}))}))},r.prototype._mixCustomParameters=function(e){if(!this.customLayerParameters&&!this.customParameters)return e;var r=t.__assign(t.__assign({},this.customParameters),this.customLayerParameters);for(var a in r)e[a.toLowerCase()]=r[a];return e},t.__decorate([g.property({readOnly:!0})],r.prototype,"allSublayers",void 0),t.__decorate([g.property({json:{type:Object,write:!0}})],r.prototype,"customParameters",void 0),t.__decorate([g.property({json:{type:Object,write:!0}})],r.prototype,"customLayerParameters",void 0),t.__decorate([g.property({type:String,json:{write:!0}})],r.prototype,"copyright",void 0),t.__decorate([g.property()],r.prototype,"description",void 0),t.__decorate([g.property({readOnly:!0})],r.prototype,"dimensions",void 0),t.__decorate([g.property({json:{type:[[Number]],read:{source:"extent"},write:{target:"extent"},origins:{service:{read:{source:"extent"}}}}})],r.prototype,"fullExtent",void 0),t.__decorate([g.reader(["web-document","portal-item"],"fullExtent",["extent"])],r.prototype,"readFullExtentFromItemOrMap",null),t.__decorate([g.writer(["web-document","portal-item"],"fullExtent",{extent:{type:[[Number]]}})],r.prototype,"writeFullExtent",null),t.__decorate([g.property()],r.prototype,"fullExtents",void 0),t.__decorate([g.property({type:String,json:{write:{ignoreOrigin:!0}}})],r.prototype,"featureInfoFormat",void 0),t.__decorate([g.property({type:String,json:{write:{ignoreOrigin:!0}}})],r.prototype,"featureInfoUrl",void 0),t.__decorate([g.property({type:String,json:{origins:{"web-document":{default:"image/png",type:j.jsonValues,read:{reader:j.read,source:"format"},write:{writer:j.write,target:"format"}}}}})],r.prototype,"imageFormat",void 0),t.__decorate([g.reader("imageFormat",["supportedImageFormatTypes"])],r.prototype,"readImageFormat",null),t.__decorate([g.property({type:Number,json:{read:{source:"maxHeight"},write:{target:"maxHeight"}}})],r.prototype,"imageMaxHeight",void 0),t.__decorate([g.property({type:Number,json:{read:{source:"maxWidth"},write:{target:"maxWidth"}}})],r.prototype,"imageMaxWidth",void 0),t.__decorate([g.property()],r.prototype,"imageTransparency",void 0),t.__decorate([g.property(P.legendEnabled)],r.prototype,"legendEnabled",void 0),t.__decorate([g.property({type:["show","hide","hide-children"]})],r.prototype,"listMode",void 0),t.__decorate([g.property({type:String,json:{write:{ignoreOrigin:!0}}})],r.prototype,"mapUrl",void 0),t.__decorate([g.property({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:function(){return{enabled:!1}}}}})],r.prototype,"isReference",void 0),t.__decorate([g.property({type:["WMS"]})],r.prototype,"operationalLayerType",void 0),t.__decorate([g.property({type:v,json:{origins:{service:{read:{source:"extent.spatialReference"}}},write:!1}})],r.prototype,"spatialReference",void 0),t.__decorate([g.reader(["web-document","portal-item"],"spatialReference",["spatialReferences"])],r.prototype,"readSpatialReferenceFromItemOrDocument",null),t.__decorate([g.property({type:[Number],json:{read:{source:"spatialReferences"},write:{ignoreOrigin:!0}}})],r.prototype,"spatialReferences",void 0),t.__decorate([g.writer(["web-document","portal-item"],"spatialReferences")],r.prototype,"writeSpatialReferences",null),t.__decorate([g.property({type:s.ofType(q),json:{write:{target:"layers",overridePolicy:function(e,r,t){if(function(e,r){return e.some((function(e){for(var t in e)if(h.willPropertyWrite(e,t,null,r))return!0;return!1}))}(this.allSublayers,t))return{ignoreOrigin:!0}}}}})],r.prototype,"sublayers",void 0),t.__decorate([g.reader(["web-document","portal-item"],"sublayers",["layers","visibleLayers"])],r.prototype,"readSublayersFromItemOrMap",null),t.__decorate([g.reader("service","sublayers",["layers"])],r.prototype,"readSublayers",null),t.__decorate([g.writer("sublayers",{layers:{type:[q]},visibleLayers:{type:[String]}})],r.prototype,"writeSublayers",null),t.__decorate([g.property({json:{read:!1},readOnly:!0,value:"wms"})],r.prototype,"type",void 0),t.__decorate([g.property(P.url)],r.prototype,"url",void 0),t.__decorate([g.property({type:String,json:{write:{ignoreOrigin:!0}}})],r.prototype,"version",void 0),r=t.__decorate([g.subclass("esri.layers.WMSLayer")],r)}(S.BlendLayer(O.TemporalLayer(R.RefreshableLayer(L.ScaleRangeLayer(I.OperationalLayer(E.PortalLayer(c.MultiOriginJSONMixin(w)))))))))}));