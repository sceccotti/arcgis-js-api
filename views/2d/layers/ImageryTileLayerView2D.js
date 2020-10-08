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

define(["require","exports","tslib","../../../geometry","../../../Graphic","../../../core/has","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/screenUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../layers/support/PixelBlock","../../../layers/support/TileInfo","../../../layers/support/rasterDatasets/RawBlockCache","../../../layers/support/rasterFunctions/pixelUtils","../../../layers/support/rasterFunctions/rasterProjectionHelper","../engine/RasterTileContainer","./LayerView2D","../tiling/TileInfoView","../tiling/TileQueue","../tiling/TileStrategy","../../layers/ImageryTileLayerView","../../layers/LayerView","../../layers/RefreshableLayerView","../../support/drapedUtils"],(function(e,t,i,r,s,a,o,l,n,h,u,c,p,y,d,_,f,b,m,g,w,v,I,P,U,R){"use strict";var T=o.getLogger("esri.views.2d.layers.ImageryTileLayerView2D"),x=[0,0];return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._tileStrategy=null,t._tileInfoView=null,t._fetchQueue=null,t._blockCacheRegistryUrl=null,t._blockCacheRegistryId=null,t._bitmapView=null,t._emptyTilePixelBlock=null,t._srcResolutions=null,t._previousLOD=null,t._needBlockCacheUpdate=!1,t._globalSymbolizerParams=null,t._symbolizerParams=null,t._abortController=null,t._globalUpdateRequested=!1,t.useWebGLForProcessing=!0,t.datumTransformation=null,t._redrawDebounced=n.debounce((function(e){return t._redrawImage(e)}),2e3),t}return i.__extends(t,e),t.prototype.initialize=function(){var e=this.updateFullExtent();this.addResolvingPromise(e)},Object.defineProperty(t.prototype,"useProgressiveUpdate",{get:function(){return null==this._get("useProgressiveUpdate")||this._get("useProgressiveUpdate")},set:function(e){var t=this;this._tileStrategy&&this.useProgressiveUpdate!==e&&(this._tileStrategy.destroy(),this._bitmapView.removeAllChildren(),this._tileStrategy=new v({cachePolicy:e?"keep":"purge",resampling:!1,acquireTile:function(e){return t.acquireTile(e)},releaseTile:function(e){return t.releaseTile(e)},cacheSize:e?40:0,tileInfoView:this._tileInfoView}),this._set("useProgressiveUpdate",e),this.requestUpdate())},enumerable:!1,configurable:!0}),t.prototype.hitTest=function(e,t){if(this.suspended)return n.resolve(null);var i=this.view.toMap(h.createScreenPoint(e,t));return n.resolve(new s({attributes:{},geometry:i}))},t.prototype.update=function(e){var t;this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume();var i=e.state,s=i.extent,a=i.resolution,o=i.scale,l=this._tileInfoView.getClosestInfoForScale(o);if(this.layer.raster){if(!this.useProgressiveUpdate||this._needBlockCacheUpdate){var n=this._srcResolutions[l.level],h=s.toJSON?s:r.Extent.fromJSON(s);d.update(this._blockCacheRegistryUrl,this._blockCacheRegistryId,h,a,n,this.layer.raster.ioConfig.sampling)}this._needBlockCacheUpdate=!1,(null===(t=this._previousLOD)||void 0===t?void 0:t.level)!==l.level&&(this._previousLOD=l,null!=this._symbolizerParams&&this._updateSymbolizerParams())}this.notifyChange("updating")},t.prototype.attach=function(){var e=this;this.layer.increaseRasterJobHandlerUsage(),a("esri-webgl-texture-float")&&a("esri-webgl-color-buffer-float")||(this.useWebGLForProcessing=!1),this.layer.raster&&(this.layer.raster.ioConfig.allowPartialFill=!0),this._initializeTileInfo(),this._tileInfoView=new g(this.tileInfo,this.fullExtent),this._fetchQueue=new w({tileInfoView:this._tileInfoView,concurrency:10,process:function(t,i){return e.fetchTile(t,i)}}),this._tileStrategy=new v({cachePolicy:this.useProgressiveUpdate?"keep":"purge",resampling:!1,acquireTile:function(t){return e.acquireTile(t)},releaseTile:function(t){return e.releaseTile(t)},cacheSize:this.useProgressiveUpdate?40:0,tileInfoView:this._tileInfoView}),this._bitmapView=new b.RasterTileContainer(this._tileInfoView),this.container.addChild(this._bitmapView),this.handles.add([u.watch(this,["layer.bandIds","layer.renderer"],(function(){return e._redrawDebounced().catch((function(e){n.isAbortError(e)||T.error(e)}))})),u.watch(this,["layer.interpolation"],(function(t,i){"majority"!==t&&"majority"!==i||!e._canUseMajorityInterpolationOnDataSource()?e._redrawDebounced().catch((function(e){n.isAbortError(e)||T.error(e)})):e.refreshDebounced()})),u.watch(this,["layer.multidimensionalDefinition"],this.refreshDebounced)],"attach"),this._updateBlockCacheRegistry()},t.prototype.detach=function(){this.handles.remove("attach"),this.layer.decreaseRasterJobHandlerUsage(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null,d.unregister(this._blockCacheRegistryUrl,this._blockCacheRegistryId)},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){var e=this;!this.hasTilingEffects&&this.useProgressiveUpdate||(this._abortController&&this._abortController.abort(),this._abortController=n.createAbortController(),0===this._fetchQueue.length&&this._redrawImage(this._abortController.signal).then((function(){e._globalUpdateRequested=!1,e.requestUpdate()}))),this.requestUpdate()},t.prototype.createFetchPopupFeaturesQueryGeometry=function(e,t){return R.createQueryGeometry(e,t,this.view)},t.prototype.doRefresh=function(){return i.__awaiter(this,void 0,void 0,(function(){var e=this;return i.__generator(this,(function(t){return this.updateRequested||this.suspended?[2]:(this._updateSymbolizerParams(),this._updateBlockCacheRegistry(),this._fetchQueue.reset(),this._tileStrategy.tiles.forEach((function(t){return e._enqueueTileFetch(t)})),this.notifyChange("updating"),[2])}))}))},t.prototype.isUpdating=function(){return this._fetchQueue.length>0||this._globalUpdateRequested},t.prototype.acquireTile=function(e){var t,i,r=this._bitmapView.createTile(e),s=r.bitmap;return t=this._tileInfoView.getTileCoords(x,r.key),s.x=t[0],s.y=t[1],s.resolution=this._tileInfoView.getTileResolution(r.key),i=this._tileInfoView.tileInfo.size,s.width=i[0],s.height=i[1],this._enqueueTileFetch(r),this.requestUpdate(),this._needBlockCacheUpdate=!0,this._globalUpdateRequested=this.hasTilingEffects||!this.useProgressiveUpdate,r},t.prototype.releaseTile=function(e){var t=this;this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",(function(){e.destroy(),t.requestUpdate()})),this.requestUpdate()},t.prototype.fetchTile=function(e,t){var i=!l.isNone(t)&&t.signal,r=this._canUseWebGLForProcessing(),s={tileInfo:this.tileInfo,signal:l.unwrap(i),registryId:this._blockCacheRegistryId,requestRawData:r,srcResolution:this._srcResolutions[e.level],datumTransformation:this.datumTransformation,interpolation:r?"nearest":this.layer.interpolation};return this.layer.fetchTile(e.level,e.row,e.col,s)},t.prototype._canUseWebGLForProcessing=function(){return this.useWebGLForProcessing&&this.layer.symbolizer.canRenderInWebGL&&!("majority"===this.layer.interpolation&&this._canUseMajorityInterpolationOnDataSource())},t.prototype._initializeTileInfo=function(){var e=this.view.spatialReference,t=new r.Point({x:this.fullExtent.xmin,y:this.fullExtent.ymax,spatialReference:e}),i=f.computeProjectedScales(this.layer.rasterInfo,e),s=i.scales,a=i.srcResolutions,o=y.create({spatialReference:e,size:512,scales:s});(0===o.origin.x||o.origin.x>t.x)&&(o.origin=t),this._set("tileInfo",o),this._srcResolutions=null!=a?a:[]},t.prototype._enqueueTileFetch=function(e,t){return i.__awaiter(this,void 0,void 0,(function(){var t,r,s,a,o,l,h,u,c,p=this;return i.__generator(this,(function(i){switch(i.label){case 0:if(this._fetchQueue.has(e.key.id))return[2];i.label=1;case 1:return i.trys.push([1,13,,14]),[4,this._fetchQueue.push(e.key)];case 2:if(t=i.sent(),r=this.layer.bandIds,s=!this.useProgressiveUpdate||this.hasTilingEffects&&!this._globalSymbolizerParams,!this._globalUpdateRequested||this.moving||0!==this._fetchQueue.length)return[3,7];s=!1,i.label=3;case 3:return i.trys.push([3,5,,6]),[4,this._redrawImage(this._abortController&&this._abortController.signal)];case 4:return i.sent(),[3,6];case 5:return a=i.sent(),n.isAbortError(a)&&T.error(a),[3,6];case 6:this._globalUpdateRequested=!1,i.label=7;case 7:return(o=this._canUseWebGLForProcessing())&&!this.hasTilingEffects&&null==this._symbolizerParams&&this._updateSymbolizerParams(),t&&t.pixelBlock?o?[3,9]:(l={extent:t.extent,pixelBlock:t.pixelBlock},[4,this.layer.applyRenderer(l,this.hasTilingEffects&&this._globalSymbolizerParams&&"stretch"===this._globalSymbolizerParams.type?this._globalSymbolizerParams:null)]):[3,11];case 8:return h=i.sent(),e.bitmap.rawPixelData=l,e.bitmap.source=h,[3,10];case 9:e.bitmap.source=t.pixelBlock,i.label=10;case 10:return e.bitmap.symbolizerParameters=o?this._globalSymbolizerParams||this._symbolizerParams:null,!e.bitmap.transformGrid&&o?e.bitmap.transformGrid=t.transformGrid:e.bitmap.transformGrid=null,[3,12];case 11:u=this._createEmptyTilePixelBlock(),e.bitmap.source=u,e.bitmap.symbolizerParameters=o?this._symbolizerParams:null,e.bitmap.transformGrid=null,i.label=12;case 12:return e.bitmap.bandIds=r,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.bitmap.interpolation=this._getLayerInterpolation(),e.bitmap.suspended=s,e.bitmap.invalidateTexture(),e.once("attach",(function(){return p.requestUpdate()})),this._bitmapView.addChild(e),[3,14];case 13:return c=i.sent(),n.isAbortError(c)||T.error(c),[3,14];case 14:return this.requestUpdate(),[2]}}))}))},t.prototype._redrawImage=function(e){return i.__awaiter(this,void 0,void 0,(function(){var t,r,s=this;return i.__generator(this,(function(a){switch(a.label){case 0:return this.layer.updateRenderer(),this.hasTilingEffects?[4,this._updateGlobalSymbolizerParams(e)]:[3,2];case 1:return a.sent(),[3,3];case 2:this._updateSymbolizerParams(),this._globalSymbolizerParams=null,a.label=3;case 3:return t=this.layer.bandIds,r=this._bitmapView.children.map((function(e){return i.__awaiter(s,void 0,void 0,(function(){var r,s;return i.__generator(this,(function(i){switch(i.label){case 0:return(r=this._canUseWebGLForProcessing())?[3,2]:(s=e.bitmap,[4,this.layer.applyRenderer(e.bitmap.rawPixelData,this.hasTilingEffects&&this._globalSymbolizerParams&&"stretch"===this._globalSymbolizerParams.type?this._globalSymbolizerParams:null)]);case 1:s.source=i.sent(),i.label=2;case 2:return e.bitmap.symbolizerParameters=r?this._globalSymbolizerParams||this._symbolizerParams:null,e.bitmap.bandIds=t,e.bitmap.interpolation=this._getLayerInterpolation(),e.bitmap.suspended=!1,[2]}}))}))})),[4,n.eachAlways(r)];case 4:return a.sent(),this.container.requestRender(),[2]}}))}))},t.prototype._createEmptyTilePixelBlock=function(){if(!this._emptyTilePixelBlock){var e=this._tileInfoView.tileInfo.size[0],t=this._tileInfoView.tileInfo.size[1];this._emptyTilePixelBlock=new p({width:e,height:t,pixels:[new Uint8Array(e*t)],mask:new Uint8Array(e*t),pixelType:"u8"})}return this._emptyTilePixelBlock},t.prototype._updateGlobalSymbolizerParams=function(e){return i.__awaiter(this,void 0,void 0,(function(){var t,r,s;return i.__generator(this,(function(i){switch(i.label){case 0:return t={srcResolution:this._srcResolutions[this._previousLOD.level],registryId:this._blockCacheRegistryId,signal:e},[4,this.layer.fetchPixels(this.view.extent,this.view.width,this.view.height,t)];case 1:return(r=i.sent())&&r.pixelBlock?(s=this.layer.symbolizer.generateWebGLParameters({pixelBlock:_.extractBands(r.pixelBlock,this.layer.bandIds),isGCS:this.view.spatialReference.isGeographic,resolution:{x:this._previousLOD.resolution,y:this._previousLOD.resolution},bandIds:this.layer.bandIds}),!this._canUseWebGLForProcessing()&&s&&"stretch"===s.type&&this.layer.renderer&&"raster-stretch"===this.layer.renderer.type&&(s.factor=s.factor.map((function(e){return 255*e})),s.outMin=Math.round(255*s.outMin),s.outMax=Math.round(255*s.outMax)),this._globalSymbolizerParams=s,[2]):[2]}}))}))},t.prototype._updateSymbolizerParams=function(){this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null,isGCS:this.view.spatialReference.isGeographic,resolution:{x:this._previousLOD.resolution,y:this._previousLOD.resolution},bandIds:this.layer.bandIds})},t.prototype._updateBlockCacheRegistry=function(){var e=this.layer,t=e.url,i=e.rasterInfo,r=e.multidimensionalDefinition,s=e.raster,a=(null==i?void 0:i.multidimensionalInfo)?s.getSliceIndex(r):null,o=d.getRasterId(t,a);o!==this._blockCacheRegistryUrl&&(null==this._blockCacheRegistryUrl&&d.unregister(this._blockCacheRegistryUrl,this._blockCacheRegistryId),this._blockCacheRegistryId=d.register(o,this.layer.raster.rasterInfo),this._blockCacheRegistryUrl=o)},t.prototype._canUseMajorityInterpolationOnDataSource=function(){var e=this.layer.rasterInfo,t=e.bandCount,i=e.attributeTable,r=e.colormap,s=e.pixelType;return 1===t&&(null!=i||null!=r||"u8"===s||"s8"===s)},t.prototype._getLayerInterpolation=function(){var e=this.layer.renderer.type;return"raster-colormap"===e||"unique-value"===e||"class-breaks"===e?"nearest":this.layer.interpolation},i.__decorate([c.property()],t.prototype,"useProgressiveUpdate",null),t=i.__decorate([c.subclass("esri.views.2d.layers.ImageryTileLayerView2D")],t)}(I.ImageryTileLayerView(U.RefreshableLayerView(m.LayerView2DMixin(P))))}));