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

define(["require","exports","tslib","../../../core/maybe","../../../core/libs/gl-matrix-2/mat3","../../../core/libs/gl-matrix-2/mat3f32","../../../core/libs/gl-matrix-2/vec2f32","../../../layers/support/rasterFunctions/pixelUtils","./DisplayObject","../../webgl/rasterUtils"],(function(t,e,r,s,i,o,a,n,u,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.RasterBitmap=void 0;var d={bandCount:3,outMin:0,outMax:1,minCutOff:[0,0,0],maxCutOff:[255,255,255],factor:[1/255,1/255,1/255],useGamma:!1,gamma:[1,1,1],gammaCorrection:[1,1,1],colormap:null,colormapOffset:null,type:"stretch"},h=function(t){function e(e,r,s){void 0===e&&(e=null),void 0===r&&(r=null),void 0===s&&(s=null);var i=t.call(this)||this;return i._textureInvalidated=!0,i._memoryUsed=null,i.stencilRef=0,i.coordScale=[1,1],i._symbolizerParameters=null,i.height=null,i.pixelRatio=1,i.resolution=0,i.rotation=0,i._source=null,i.rawPixelData=null,i._suspended=!1,i._bandIds=null,i._interpolation=null,i._transformGrid=null,i.width=null,i.x=0,i.y=0,i.transforms={dvs:o.mat3f32.create()},i.source=e,i.transformGrid=r,i.interpolation=s,i}return r.__extends(e,t),Object.defineProperty(e.prototype,"symbolizerParameters",{get:function(){return this._symbolizerParameters||d},set:function(t){this._symbolizerParameters=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"source",{get:function(){return this._source},set:function(t){this._source=t,this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null,this._rasterTextureBandIds=null,this._memoryUsed=null)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"suspended",{get:function(){return this._suspended},set:function(t){this._suspended&&!t&&this.stage&&(this.ready(),this.requestRender()),this._suspended=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bandIds",{get:function(){return this._bandIds},set:function(t){this._bandIds=t,this.invalidateTexture()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"interpolation",{get:function(){return this._interpolation},set:function(t){this._interpolation=t,this._rasterTexture&&this._rasterTexture.setSamplingMode("bilinear"===t||"cubic"===t?9729:9728)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"transformGrid",{get:function(){return this._transformGrid},set:function(t){this._transformGrid=t,this._transformGridTexture&&(this._transformGridTexture.dispose(),this._transformGridTexture=null,this._memoryUsed=null)},enumerable:!1,configurable:!0}),e.prototype.invalidateTexture=function(){this._textureInvalidated||(this._textureInvalidated=!0,this.requestRender())},e.prototype.setTransform=function(t){var e=i.mat3.identity(this.transforms.dvs),r=t.toScreenNoRotation([0,0],this.x,this.y),s=r[0],o=r[1],n=this.resolution/this.pixelRatio/t.resolution,u=n*this.width,l=n*this.height,d=Math.PI*this.rotation/180;i.mat3.translate(e,e,a.vec2f32.fromValues(s,o)),i.mat3.translate(e,e,a.vec2f32.fromValues(u/2,l/2)),i.mat3.rotate(e,e,-d),i.mat3.translate(e,e,a.vec2f32.fromValues(-u/2,-l/2)),i.mat3.scaleByVec2(e,e,a.vec2f32.fromValues(u,l)),i.mat3.multiply(this.transforms.dvs,t.displayViewMat3,e)},e.prototype.getTextures=function(){if(!this._rasterTexture)return null;var t=[],e=[];return this._transformGridTexture&&(e.push(this._transformGridTexture),t.push("u_transformGrid")),this._rasterTexture&&(e.push(this._rasterTexture),t.push("u_image")),this._colormapTexture&&(e.push(this._colormapTexture),t.push("u_colormap")),{names:t,textures:e}},e.prototype.getMemoryUsage=function(){if(s.isNone(this._memoryUsed)){var t=this.getTextures();if(null==t)return 0;this._memoryUsed=t.textures.map((function(t){return t.descriptor.width*t.descriptor.height*4})).reduce((function(t,e){return t+e}))}return this._memoryUsed},e.prototype.onAttach=function(){this.invalidateTexture()},e.prototype.onDetach=function(){this.invalidateTexture()},e.prototype.updateTexture=function(t){var e,r,s,i=t.context;if(!this.stage)return null===(e=this._rasterTexture)||void 0===e||e.dispose(),null===(r=this._transformGridTexture)||void 0===r||r.dispose(),null===(s=this._colormapTexture)||void 0===s||s.dispose(),this._rasterTexture=null,this._rasterTextureBandIds=null,this._transformGridTexture=null,void(this._colormapTexture=null);if(this._textureInvalidated){this._textureInvalidated=!1;var o=this.source,a=o&&o.pixels&&o.pixels.length>0;this._createOrDestroyRasterTexture(i),this._rasterTexture&&(a?(this._updateColormapTexture(i),this.transformGrid&&!this._transformGridTexture&&(this._transformGridTexture=l.createTransformTexture(i,this.transformGrid))):this._rasterTexture.setData(null)),this.suspended||(this.ready(),this.requestRender())}},e.prototype._createOrDestroyRasterTexture=function(t){var e=this.source?n.extractBands(this.source,this.bandIds):null;if(e&&e.pixels&&e.pixels.length>0){var r=null==this._rasterTextureBandIds&&null==this.bandIds||this._rasterTextureBandIds&&this.bandIds&&this._rasterTextureBandIds.join("")===this.bandIds.join("");if(this._rasterTexture){if(r)return;this._rasterTexture.dispose(),this._rasterTextureBandIds=null,this._rasterTexture=null}this._rasterTexture=l.createRasterTexture(t,e,this.interpolation||"nearest"),this._rasterTextureBandIds=this.bandIds}else this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTextureBandIds=null,this._rasterTexture=null)},e.prototype._updateColormapTexture=function(t){var e=this._colormap,r=this.symbolizerParameters.colormap;return r?e?r.length!==e.length||r.some((function(t,r){return t!==e[r]}))?(this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),this._colormapTexture=l.createColormapTexture(t,r),void(this._colormap=r)):void 0:(this._colormapTexture=l.createColormapTexture(t,r),void(this._colormap=r)):(this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),void(this._colormap=null))},e}(u.DisplayObject);e.RasterBitmap=h}));