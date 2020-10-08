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

define(["require","exports","tslib","./geometry","./core/Collection","./core/collectionUtils","./core/JSONSupport","./core/lang","./core/Loadable","./core/loadAll","./core/Logger","./core/maybe","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./portal/Portal","./portal/PortalItem","./support/basemapDefinitions","./webdoc/support/writeUtils","@dojo/framework/shim/Promise"],(function(e,r,t,o,a,s,n,i,l,p,c,u,f,y,d,h,m,b,_){"use strict";var L=0,g=c.getLogger("esri.Basemap");return function(r){function n(e){var t=r.call(this,e)||this;t.id=null,t.portalItem=null,t.spatialReference=null,t.thumbnailUrl=null,t.title="Basemap",t.id=Date.now().toString(16)+"-basemap-"+L++,t.baseLayers=new a,t.referenceLayers=new a;var o=function(e){e.parent&&e.parent!==t&&"remove"in e.parent&&e.parent.remove(e),e.parent=t,"elevation"===e.type&&g.error("Layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"' is not supported as a basemap layer and will therefore be ignored.")},s=function(e){e.parent=null};return t.baseLayers.on("after-add",(function(e){return o(e.item)})),t.referenceLayers.on("after-add",(function(e){return o(e.item)})),t.baseLayers.on("after-remove",(function(e){return s(e.item)})),t.referenceLayers.on("after-remove",(function(e){return s(e.item)})),t}var l;return t.__extends(n,r),l=n,n.prototype.initialize=function(){var e=this;this.when().catch((function(r){g.error("#load()","Failed to load basemap (title: '"+e.title+"', id: '"+e.id+"')",r)})),this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)},n.prototype.destroy=function(){for(var e,r=0,t=this.baseLayers.removeAll();r<t.length;r++){t[r].destroy()}for(var o=0,a=this.referenceLayers.removeAll();o<a.length;o++){a[o].destroy()}this.baseLayers.destroy(),this.referenceLayers.destroy(),null===(e=this.portalItem)||void 0===e||e.destroy(),this.portalItem=null},n.prototype.normalizeCtorArgs=function(e){return e&&"resourceInfo"in e&&(this._set("resourceInfo",e.resourceInfo),delete(e=t.__assign({},e)).resourceInfo),e},Object.defineProperty(n.prototype,"baseLayers",{set:function(e){this._set("baseLayers",s.referenceSetter(e,this._get("baseLayers")))},enumerable:!1,configurable:!0}),n.prototype._writeBaseLayers=function(e,r,o){var a=[];e?(o=t.__assign(t.__assign({},o),{layerContainerType:"basemap"}),this.baseLayers.forEach((function(e){var r=_.getLayerJSON(e,o.webmap?o.webmap.getLayerJSONFromResourceInfo(e):null,o);u.isSome(r)&&a.push(r)})),this.referenceLayers.forEach((function(e){var r=_.getLayerJSON(e,o.webmap?o.webmap.getLayerJSONFromResourceInfo(e):null,o);u.isSome(r)&&(r.isReference=!0,a.push(r))})),r.baseMapLayers=a):r.baseMapLayers=a},Object.defineProperty(n.prototype,"referenceLayers",{set:function(e){this._set("referenceLayers",s.referenceSetter(e,this._get("referenceLayers")))},enumerable:!1,configurable:!0}),n.prototype.writeTitle=function(e,r){r.title=e||"Basemap"},n.prototype.load=function(e){return this.addResolvingPromise(this._loadFromSource(e)),f.resolve(this)},n.prototype.loadAll=function(){var e=this;return p.loadAll(this,(function(r){r(e.baseLayers,e.referenceLayers)}))},n.prototype.clone=function(){var e={id:this.id,title:this.title,portalItem:this.portalItem,baseLayers:this.baseLayers.slice(),referenceLayers:this.referenceLayers.slice()};return this.loaded&&(e.loadStatus="loaded"),new l({resourceInfo:this.resourceInfo}).set(e)},n.prototype.read=function(e,t){this.resourceInfo||this._set("resourceInfo",{data:e,context:t}),r.prototype.read.call(this,e,t)},n.prototype.write=function(e,o){return e=e||{},o&&o.origin||(o=t.__assign({origin:"web-map"},o)),r.prototype.write.call(this,e,o),!this.loaded&&this.resourceInfo&&this.resourceInfo.data.baseMapLayers&&(e.baseMapLayers=this.resourceInfo.data.baseMapLayers.map((function(e){var r=i.clone(e);return r.url&&y.isProtocolRelative(r.url)&&(r.url="https:"+r.url),r.templateUrl&&y.isProtocolRelative(r.templateUrl)&&(r.templateUrl="https:"+r.templateUrl),r}))),e},n.prototype._loadFromSource=function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,o,a,s,n,i,l=this;return t.__generator(this,(function(t){switch(t.label){case 0:return o=(r=this).resourceInfo,a=r.portalItem,f.throwIfAborted(e),s=[],o?(n=o.context?o.context.url:null,s.push(this._loadLayersFromJSON(o.data,n,e)),o.data.id&&!o.data.title&&(i=o.data.id,s.push(b.getBasemapTitle(i).then((function(e){e&&l.read({title:e},o.context)}))))):a&&s.push(this._loadFromItem(a,e)),[4,f.all(s)];case 1:return t.sent(),[2]}}))}))},n.prototype._loadLayersFromJSON=function(r,o,a){return t.__awaiter(this,void 0,void 0,(function(){var s,n,i,l,p,c,u,y;return t.__generator(this,(function(t){switch(t.label){case 0:return s=this.resourceInfo&&this.resourceInfo.context,n=this.portalItem&&this.portalItem.portal||s&&s.portal||null,i=s&&"web-scene"===s.origin?"web-scene":"web-map",[4,new Promise((function(r,t){e(["./portal/support/layersCreator"],r,t)}))];case 1:return l=t.sent(),p=[],f.throwIfAborted(a),r.baseMapLayers&&Array.isArray(r.baseMapLayers)&&(c={context:{origin:i,url:o,portal:n,layerContainerType:"basemap"},defaultLayerType:"DefaultTileLayer"},u=l.populateOperationalLayers(this.baseLayers,r.baseMapLayers.filter((function(e){return!e.isReference})),c),p.push(u),y=l.populateOperationalLayers(this.referenceLayers,r.baseMapLayers.filter((function(e){return e.isReference})),c),p.push(y)),[4,f.eachAlways(p)];case 2:return t.sent(),[2]}}))}))},n.prototype._loadFromItem=function(e,r){return t.__awaiter(this,void 0,void 0,(function(){var o,a;return t.__generator(this,(function(t){switch(t.label){case 0:return[4,e.load(r)];case 1:return[4,t.sent().fetchData("json",r)];case 2:return o=t.sent(),a=y.urlToObject(e.itemUrl),this._set("resourceInfo",{data:o.baseMap,context:{origin:"web-map",portal:e.portal||h.getDefault(),url:a}}),this.read(this.resourceInfo.data,this.resourceInfo.context),this.read({spatialReference:o.spatialReference},this.resourceInfo.context),this.read({title:e.title,thumbnailUrl:e.thumbnailUrl},{origin:"portal-item",portal:e.portal||h.getDefault(),url:a}),[2,this._loadLayersFromJSON(this.resourceInfo.data,a,r)]}}))}))},n.fromId=function(e){var r=b.esriBasemapDefinitions[e];return r?l.fromJSON(r):null},t.__decorate([d.property({json:{write:{ignoreOrigin:!0,target:"baseMapLayers",writer:function(e,r,t,o){this._writeBaseLayers(e,r,o)}},origins:{"web-scene":{write:{ignoreOrigin:!0,target:{baseMapLayers:{type:a}},writer:function(e,r,t,o){this._writeBaseLayers(e,r,o)}}}}}})],n.prototype,"baseLayers",null),t.__decorate([d.property({type:String,json:{origins:{"web-scene":{write:!0}}}})],n.prototype,"id",void 0),t.__decorate([d.property({type:m})],n.prototype,"portalItem",void 0),t.__decorate([d.property()],n.prototype,"referenceLayers",null),t.__decorate([d.property({readOnly:!0})],n.prototype,"resourceInfo",void 0),t.__decorate([d.property({type:o.SpatialReference})],n.prototype,"spatialReference",void 0),t.__decorate([d.property()],n.prototype,"thumbnailUrl",void 0),t.__decorate([d.property({type:String,json:{origins:{"web-scene":{write:{isRequired:!0}}}}})],n.prototype,"title",void 0),t.__decorate([d.writer("title")],n.prototype,"writeTitle",null),n=l=t.__decorate([d.subclass("esri.Basemap")],n)}(n.JSONSupportMixin(l))}));