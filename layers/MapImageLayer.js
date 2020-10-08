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

define(["require","exports","tslib","../request","../core/Error","../core/HandleOwner","../core/loadAll","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/accessorSupport/decorators","../core/accessorSupport/ensureType","../core/accessorSupport/PropertyOrigin","../geometry/support/scaleUtils","./Layer","./mixins/ArcGISMapService","./mixins/ArcGISService","./mixins/BlendLayer","./mixins/CustomParametersMixin","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./mixins/SublayersOwner","./mixins/TemporalLayer","./support/commonProperties","./support/ExportImageParameters","./support/Sublayer","./support/sublayerUtils"],(function(e,r,t,i,a,o,s,n,p,l,u,c,y,d,m,g,h,_,v,f,b,S,x,w,O,L,I,M,P){"use strict";return function(e){function r(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];var i=e.apply(this,r)||this;return i.alwaysRefetch=!1,i.dpi=96,i.gdbVersion=null,i.imageFormat="png24",i.imageMaxHeight=2048,i.imageMaxWidth=2048,i.imageTransparency=!0,i.labelsVisible=!1,i.isReference=null,i.operationalLayerType="ArcGISMapServiceLayer",i.sourceJSON=null,i.sublayers=null,i.type="map-image",i.url=null,i}return t.__extends(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t.__assign({url:e},r):e},r.prototype.load=function(e){var r=this,t=n.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).then((function(){return r._fetchService(t)}),(function(){return r._fetchService(t)}))),l.resolve(this)},r.prototype.readImageFormat=function(e,r){var t=r.supportedImageFormatTypes;return t&&t.indexOf("PNG32")>-1?"png32":"png24"},r.prototype.writeSublayers=function(e,r,i,a){if(this.loaded&&e){var o=e.slice().reverse().flatten((function(e){var r=e.sublayers;return r&&r.toArray().reverse()})).toArray(),s=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&this.capabilities.exportMap.supportsDynamicLayers){var n=y.nameToId(a.origin);if(3===n){var p=this.createSublayersForOrigin("service").sublayers;s=P.shouldWriteSublayerStructure(o,p,2)}else if(n>3){var l=this.createSublayersForOrigin("portal-item");s=P.shouldWriteSublayerStructure(o,l.sublayers,y.nameToId(l.origin))}}var u=[],c=t.__assign({writeSublayerStructure:s},a),d=s;o.forEach((function(e){var r=e.write({},c);u.push(r),d=d||"user"===e.originOf("visible")})),u.some((function(e){return Object.keys(e).length>1}))&&(r.layers=u),d&&(r.visibleLayers=o.filter((function(e){return e.visible})).map((function(e){return e.id})))}},r.prototype.createExportImageParameters=function(e,r,i,a){var o=a&&a.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());var s=new I.ExportImageParameters({layer:this,scale:d.getScale({extent:e,width:r})*o}),n=s.toJSON();s.destroy();var p=!a||!a.rotation||this.version<10.3?{}:{rotation:-a.rotation},l=e&&e.spatialReference,u=l.wkid||JSON.stringify(l.toJSON());n.dpi*=o;var c={};if(null==a?void 0:a.timeExtent){var y=a.timeExtent.toJSON(),m=y.start,g=y.end;c.time=m&&g&&m===g?""+m:(null==m?"null":m)+","+(null==g?"null":g)}else this.timeInfo&&!this.timeInfo.hasLiveData&&(c.time="null,null");return t.__assign(t.__assign(t.__assign({bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:u,imageSR:u,size:r+","+i},n),p),c)},r.prototype.fetchImage=function(e,r,o,s){return t.__awaiter(this,void 0,void 0,(function(){var n,p,u;return t.__generator(this,(function(c){return n={responseType:"image"},s&&s.timestamp&&(n.query={_ts:s.timestamp}),s&&s.signal&&(n.signal=s.signal),p=this.parsedUrl.path+"/export",null==(u=t.__assign(t.__assign(t.__assign({},this.parsedUrl.query),this.createExportImageParameters(e,r,o,s)),{f:"image",_ts:this.alwaysRefetch?Date.now():null})).dynamicLayers||this.capabilities.exportMap.supportsDynamicLayers?(n.query?n.query=t.__assign(t.__assign({},u),n.query):n.query=u,[2,i(p,n).then((function(e){return e.data})).catch((function(e){if(l.isAbortError(e))throw e;throw new a("mapimagelayer:image-fetch-error","Unable to load image: "+p,{error:e})}))]):[2,l.reject(new a("mapimagelayer:dynamiclayer-not-supported","service "+this.url+" doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.",{query:u}))]}))}))},r.prototype.loadAll=function(){var e=this;return s.default(this,(function(r){r(e.allSublayers)}))},r.prototype._fetchService=function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,a;return t.__generator(this,(function(o){switch(o.label){case 0:return this.sourceJSON?(this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl}),[2]):[4,i(this.parsedUrl.path,{query:t.__assign({f:"json"},this.parsedUrl.query),signal:e})];case 1:return r=o.sent(),a=r.data,r.ssl&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=a,this.read(a,{origin:"service",url:this.parsedUrl}),[2]}}))}))},t.__decorate([u.property()],r.prototype,"alwaysRefetch",void 0),t.__decorate([u.property()],r.prototype,"dpi",void 0),t.__decorate([u.property()],r.prototype,"gdbVersion",void 0),t.__decorate([u.property({json:{read:!1,write:!1}})],r.prototype,"popupEnabled",void 0),t.__decorate([u.property()],r.prototype,"imageFormat",void 0),t.__decorate([u.reader("imageFormat",["supportedImageFormatTypes"])],r.prototype,"readImageFormat",null),t.__decorate([u.property({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],r.prototype,"imageMaxHeight",void 0),t.__decorate([u.property({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],r.prototype,"imageMaxWidth",void 0),t.__decorate([u.property()],r.prototype,"imageTransparency",void 0),t.__decorate([u.property({json:{read:!1,write:!1}})],r.prototype,"labelsVisible",void 0),t.__decorate([u.property({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:function(){return{enabled:!1}}}}})],r.prototype,"isReference",void 0),t.__decorate([u.property({type:["ArcGISMapServiceLayer"]})],r.prototype,"operationalLayerType",void 0),t.__decorate([u.property()],r.prototype,"sourceJSON",void 0),t.__decorate([u.property({json:{write:{ignoreOrigin:!0}}})],r.prototype,"sublayers",void 0),t.__decorate([u.writer("sublayers",{layers:{type:[M]},visibleLayers:{type:[c.Integer]}})],r.prototype,"writeSublayers",null),t.__decorate([u.property({type:["show","hide","hide-children"]})],r.prototype,"listMode",void 0),t.__decorate([u.property({json:{read:!1},readOnly:!0,value:"map-image"})],r.prototype,"type",void 0),t.__decorate([u.property(L.url)],r.prototype,"url",void 0),r=t.__decorate([u.subclass("esri.layers.MapImageLayer")],r)}(_.BlendLayer(O.TemporalLayer(x.ScaleRangeLayer(S.RefreshableLayer(w.SublayersOwner(g.ArcGISMapService(h.ArcGISService(f.OperationalLayer(b.PortalLayer(p.MultiOriginJSONMixin(v.CustomParametersMixin(o.HandleOwnerMixin(m)))))))))))))}));