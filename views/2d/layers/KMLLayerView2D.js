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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../../../request","../../../core/Collection","../../../core/Handles","../../../core/promiseUtils","../../../core/scheduling","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../geometry/Extent","../../../geometry/support/webMercatorUtils","../../../layers/support/kmlUtils","../../../support/GraphicsCollection","../engine","./LayerView2D","./graphics/GraphicsView2D","../../layers/LayerView"],(function(e,t,i,n,s,o,r,a,l,p,h,c,u,d,y,_,f,g){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new o,t._bitmapIndex=new Map,t._mapImageContainer=new y.BitmapContainer,t._featuresMap=new Map,t.allVisiblePoints=new d.GraphicsCollection,t.allVisiblePolylines=new d.GraphicsCollection,t.allVisiblePolygons=new d.GraphicsCollection,t.allVisibleMapImages=new s,t}return i.__extends(t,e),t.prototype.hitTest=function(e,t){var i=this;if(this.suspended||!this._pointsView&&!this._polylinesView&&!this._polygonsView)return r.resolve(null);var n=[this._pointsView.hitTest(e,t),this._polylinesView.hitTest(e,t),this._polygonsView.hitTest(e,t)];return r.all(n).then((function(e){return e.filter((function(e){return e&&(e.layer=i.layer,e.sourceLayer=i.layer),!!e}))[0]||null}))},t.prototype.update=function(e){this._polygonsView&&this._polygonsView.processUpdate(e),this._polylinesView&&this._polylinesView.processUpdate(e),this._pointsView&&this._pointsView.processUpdate(e)},t.prototype.attach=function(){var e=this;this._handles.add([this.allVisibleMapImages.on("change",(function(t){t.added.forEach((function(t){return e._addMapImage(t)})),t.removed.forEach((function(t){return e._removeMapImage(t)}))}))]),this.container.addChild(this._mapImageContainer),this._polygonsView=new f.default({view:this.view,graphics:this.allVisiblePolygons,requestUpdateCallback:function(){return e.requestUpdate()}}),this.container.addChild(this._polygonsView.container),this._polylinesView=new f.default({view:this.view,graphics:this.allVisiblePolylines,requestUpdateCallback:function(){return e.requestUpdate()}}),this.container.addChild(this._polylinesView.container),this._pointsView=new f.default({view:this.view,graphics:this.allVisiblePoints,requestUpdateCallback:function(){return e.requestUpdate()}}),this.container.addChild(this._pointsView.container),this.watch("layer.visibleSublayers",(function(){return e._refreshCollections()})),this._fetchingPromise=this._fetchService().then((function(){e._fetchingPromise=null,e.notifyChange("updating")}))},t.prototype.detach=function(){this._handles.removeAll(),this._mapImageContainer.removeAllChildren(),this.container.removeAllChildren(),this._bitmapIndex.clear(),this._polygonsView&&(this._polygonsView.destroy(),this._polygonsView=null),this._polylinesView&&(this._polylinesView.destroy(),this._polylinesView=null),this._pointsView&&(this._pointsView.destroy(),this._pointsView=null)},t.prototype.moveStart=function(){},t.prototype.viewChange=function(){this._polygonsView.viewChange(),this._polylinesView.viewChange(),this._pointsView.viewChange()},t.prototype.moveEnd=function(){},t.prototype.isUpdating=function(){return null!=this._fetchingPromise||this._pointsView.updating||this._polygonsView.updating||this._polylinesView.updating},t.prototype._addMapImage=function(e){var t=this;this.view.spatialReference.isWGS84&&n(e.href,{responseType:"image"}).then((function(i){var n=i.data,s=h.fromJSON(e.extent);c.canProject(s,t.view.spatialReference)&&(s=c.project(s,t.view.spatialReference));var o=new y.Bitmap(n);o.x=s.xmin,o.y=s.ymax,o.resolution=s.width/n.naturalWidth,o.rotation=e.rotation,t._mapImageContainer.addChild(o),t._bitmapIndex.set(e,o)}))},t.prototype._fetchService=function(){var e=this;return this._handles.remove("refresh-collections"),this._getParsedKML().then((function(t){return e._fetchSublayerService(e.layer,t)}))},t.prototype._fetchSublayerService=function(e,t){var i=this,n=e.sublayers;if(!n||0===n.length)return r.resolve();var s=[];return n.forEach((function(e){var n=l.whenTrueOnce(e,"visible").then((function(){return e.load()})).then((function(){return i._getGraphicsForSublayer(e,t)})).then((function(t){return r.create((function(n){e.networkLink?n():(i._featuresMap.set(e,t),i._handles.add(a.schedule((function(){i._refreshCollections(),n()})),"refresh-collections"))}))})).then((function(){return i._fetchSublayerService(e,e.sourceJSON||t)}));e.visible&&s.push(n)})),r.all(s).then((function(){}))},t.prototype._getParsedKML=function(){return u.fetchService(this.layer.url,this.view.spatialReference,this.layer.refreshInterval).then((function(e){return u.parseKML(e.data)}))},t.prototype._getGraphicsForSublayer=function(e,t){return i.__awaiter(this,void 0,void 0,(function(){var n,s,o,r,a;return i.__generator(this,(function(i){switch(i.label){case 0:return n=null,t.sublayers.some((function(t){return n=t,t.id===e.id}))?(s={},(o=n.points)?[4,u.getGraphics(n.points)]:[3,2]):[2,null];case 1:o=i.sent(),i.label=2;case 2:return s.points=o,(r=n.polylines)?[4,u.getGraphics(n.polylines)]:[3,4];case 3:r=i.sent(),i.label=4;case 4:return s.polylines=r,(a=n.polygons)?[4,u.getGraphics(n.polygons)]:[3,6];case 5:a=i.sent(),i.label=6;case 6:return[2,(s.polygons=a,s.mapImages=n.mapImages,s)]}}))}))},t.prototype._refreshCollections=function(){var e=this,t=this.get("layer.visibleSublayers");this.allVisiblePoints.removeAll(),this.allVisiblePolylines.removeAll(),this.allVisiblePolygons.removeAll(),this.allVisibleMapImages.removeAll(),t&&t.length&&t.forEach((function(t){var i=e._featuresMap.get(t);i&&(e.allVisiblePoints.addMany(i.points),e.allVisiblePolylines.addMany(i.polylines),e.allVisiblePolygons.addMany(i.polygons),e.allVisibleMapImages.addMany(i.mapImages))}))},t.prototype._removeMapImage=function(e){var t=this._bitmapIndex.get(e);t&&(this._mapImageContainer.removeChild(t),this._bitmapIndex.delete(e))},i.__decorate([p.property()],t.prototype,"_pointsView",void 0),i.__decorate([p.property()],t.prototype,"_polylinesView",void 0),i.__decorate([p.property()],t.prototype,"_polygonsView",void 0),i.__decorate([p.property()],t.prototype,"_fetchingPromise",void 0),i.__decorate([p.property({dependsOn:["_fetchingPromise","_pointsView.updating","_polygonsView.updating","_polylinesView.updating"]})],t.prototype,"updating",void 0),t=i.__decorate([p.subclass("esri.views.2d.layers.KMLLayerView2D")],t)}(_.LayerView2DMixin(g))}));