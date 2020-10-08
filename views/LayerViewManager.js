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

define(["require","exports","tslib","../core/Error","../core/HandleOwner","../core/Logger","../core/maybe","../core/promiseUtils","../core/scheduling","../core/watchUtils","../core/accessorSupport/decorators","./support/WatchUpdatingTracking"],(function(e,r,a,t,i,n,o,l,s,c,y,d){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var h=n.getLogger("esri.views.LayerViewManager"),p=new Map;p.set("view.map.basemap.baseLayers","view.basemapView.baseLayerViews"),p.set("view.map.ground.layers","view.groundView.layerViews"),p.set("view.map.layers","view.layerViews"),p.set("view.map.basemap.referenceLayers","view.basemapView.referenceLayerViews");var w=function(){function e(e,r,a){var i=this;this.layer=e,this.view=r,this.layerViewImporter=a,this._controller=l.createAbortController(),this._deferred=l.createDeferred(),this._started=!1,this.done=!1,l.onAbort(this._controller.signal,(function(){var r=new t("cancelled:layerview-create","layerview creation cancelled",{layer:e});i._deferred.reject(r)}))}return Object.defineProperty(e.prototype,"promise",{get:function(){return this._deferred.promise},enumerable:!1,configurable:!0}),e.prototype.destroy=function(){this._controller.abort();var e=this.layerView;if(e){var r=this.layer,a=this.view;r.emit("layerview-destroy",{view:a,layerView:e}),a.emit("layerview-destroy",{layer:r,layerView:e}),this.done=!0,this.layer=null,this.layerView=null,this.view=null,this.layerViewImporter=null}},e.prototype.start=function(){var e,r;return a.__awaiter(this,void 0,void 0,(function(){var i,n,s,c,y,d,h,p,w,u,f=this;return a.__generator(this,(function(a){switch(a.label){case 0:if(this._started)return[2];this._started=!0,n=(i=this)._controller.signal,s=i.layer,c=i.view,this._map=c.map,a.label=1;case 1:return a.trys.push([1,13,,14]),[4,s.load({signal:n})];case 2:return a.sent(),"prefetchResources"in s?[4,s.prefetchResources({signal:n})]:[3,4];case 3:a.sent(),a.label=4;case 4:return s.createLayerView?[4,s.createLayerView(c,{signal:n})]:[3,6];case 5:return y=a.sent(),[3,8];case 6:if(!this.layerViewImporter.hasLayerViewModule(s))throw new t("layer:view-not-supported","No layerview implementation was found");return[4,this.layerViewImporter.importLayerView(s)];case 7:d=a.sent(),l.throwIfAborted(n),y="default"in d?new d.default({layer:s,view:c}):new d({layer:s,view:c}),a.label=8;case 8:p=function(){o.isSome(h)&&(h.remove(),h=null),y.destroy(),y.layer=null,y.parent=null,y.view=null,f.done=!0},h=l.onAbort(n,p),l.throwIfAborted(n),a.label=9;case 9:return a.trys.push([9,11,,12]),[4,y.when()];case 10:return a.sent(),[3,12];case 11:throw w=a.sent(),p(),w;case 12:return(null===(r=null===(e=this._map)||void 0===e?void 0:e.allLayers)||void 0===r?void 0:r.includes(s))?(this.layerView=y,s.emit("layerview-create",{view:c,layerView:y}),c.emit("layerview-create",{layer:s,layerView:y}),this.done=!0,this._deferred.resolve(y),[3,14]):(this._deferred.reject(new t("view:no-layerview-for-layer","The layer has been removed from the map",{layer:s})),p(),[2]);case 13:return u=a.sent(),s.emit("layerview-create-error",{view:c,error:u}),c.emit("layerview-create-error",{layer:s,error:u}),this.done=!0,this._deferred.reject(new t("layerview:create-error","layerview creation failed",{layer:s,error:u})),[3,14];case 14:return[2]}}))}))},e}(),u=function(e){function r(r){var a=e.call(this,r)||this;return a._layerLayerViewInfoMap=new Map,a._watchUpdatingTracking=new d.WatchUpdatingTracking,a.view=null,a._preloadLayerViewModules=function(){var e=a.view,r=a.get("view.map.allLayers");e&&r&&r.forEach((function(e){a.layerViewImporter.hasLayerViewModule(e)&&a.layerViewImporter.importLayerView(e)}))},a._reschedule=function(){a.handles.remove("reschedule"),a.handles.add(s.schedule(a._doWork),"reschedule"),a.notifyChange("updating")},a._doWork=function(){var e,r,t,i=a.get("view.map");if(a._map!==i&&(a.clear(),a._map=i),a.handles.has("reschedule")){a.handles.remove("reschedule"),a.handles.remove("collection-change");var n=i&&i.allLayers;if(n){n.forEach(a._createLayerView,a),a._refreshCollections();var o=[];a._layerLayerViewInfoMap.forEach((function(e,r){n.includes(r)||o.push(e)}));for(var l=0,s=o;l<s.length;l++){var c=s[l];a._layerLayerViewInfoMap.delete(c.layer),c.destroy()}var y=[null===(e=i.ground)||void 0===e?void 0:e.layers,null===(r=i.basemap)||void 0===r?void 0:r.baseLayers,null===(t=i.basemap)||void 0===t?void 0:t.referenceLayers,i.layers].filter((function(e){return!!e}));a.handles.add(y.map((function(e){return a._watchUpdatingTracking.addOnCollectionChange(e,a._reschedule)})),"collection-change"),a.notifyChange("updating")}}},a.handles.add([c.on(a,"view.map.allLayers","change",a._preloadLayerViewModules,a._preloadLayerViewModules),a.watch(["view.map.basemap","view.map.ground","view.map.layers","view.ready"],a._reschedule,!0)]),a}return a.__extends(r,e),r.prototype.initialize=function(){this._preloadLayerViewModules()},r.prototype.destroy=function(){this.clear(),this._watchUpdatingTracking.destroy(),this.view=null,this._map=null},Object.defineProperty(r.prototype,"updating",{get:function(){if(this.handles.has("reschedule")||this._watchUpdatingTracking.updating)return!0;var e=!0;return this._layerLayerViewInfoMap.forEach((function(r){return e=e&&r.done})),!e},enumerable:!1,configurable:!0}),r.prototype.clear=function(){this.destroyed||(this._layerLayerViewInfoMap.forEach((function(e){return e.destroy()})),this._layerLayerViewInfoMap.clear(),this._refreshCollections())},r.prototype.whenLayerView=function(e){return this._reschedule(),this._doWork(),this._layerLayerViewInfoMap.has(e)?this._layerLayerViewInfoMap.get(e).promise:l.reject(new t("view:no-layerview-for-layer","No layerview has been found for the layer",{layer:e}))},r.prototype._refreshCollections=function(){var e=this;p.forEach((function(r,a){e._populateLayerViewsOwners(e.get(a),e.get(r),e.view)}))},r.prototype._populateLayerViewsOwners=function(e,r,a){var t=this;if(e&&r){var i=0;e.forEach((function(e){var n=t._layerLayerViewInfoMap.get(e);if(n&&n.layerView){var o=n.layerView;o.layer=e,o.parent=a,r.getItemAt(i)!==o&&r.splice(i,0,o),e.layers&&t._populateLayerViewsOwners(e.layers,o.layerViews,o),i+=1}})),i<r.length&&r.splice(i,r.length)}else r&&r.removeAll()},r.prototype._createLayerView=function(e){var r=this;if(this._layerLayerViewInfoMap.has(e))return this.view.ready&&this._layerLayerViewInfoMap.get(e).start(),void this.notifyChange("updating");e.load().catch((function(){})),this.layerViewImporter.hasLayerViewModule(e)&&this.layerViewImporter.importLayerView(e);var a=new w(e,this.view,this.layerViewImporter);a.promise.then((function(){r._refreshCollections(),r.notifyChange("updating")}),(function(a){var t,i;a&&(l.isAbortError(a)||"cancelled:layerview-create"===a.name)||h.error("Failed to create layerview for layer title:'"+(null!==(t=e.title)&&void 0!==t?t:"no title")+"', id:'"+(null!==(i=e.id)&&void 0!==i?i:"no id")+"' of type '"+e.type+"'.",{layer:e,error:a}),r._refreshCollections(),r.notifyChange("updating")})),this._layerLayerViewInfoMap.set(e,a),this.view.ready&&a.start(),this.notifyChange("updating")},a.__decorate([y.property({readOnly:!0})],r.prototype,"_watchUpdatingTracking",void 0),a.__decorate([y.property()],r.prototype,"layerViewImporter",void 0),a.__decorate([y.property({readOnly:!0,dependsOn:["_watchUpdatingTracking.updating"]})],r.prototype,"updating",null),a.__decorate([y.property()],r.prototype,"view",void 0),r=a.__decorate([y.subclass("esri.views.LayerViewManager")],r)}(i.HandleOwner);r.default=u}));