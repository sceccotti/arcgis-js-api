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

define(["require","exports","tslib","../../../webgl/FramebufferObject","../../../webgl/Renderbuffer","../../../webgl/Texture","../../../webgl/Util"],(function(e,t,r,i,h,s,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RenderTargetHelper=void 0;var d={dataType:5121},a={},u=function(){function e(e){this.rctx=e,this._activeTargets=new Set,this._depthTextures=new Map,this._depthBuffers=new Map,this._colorTextures=new Map,this._framebuffers=new Map,this._nextId=1,this.depthTextureSupported=e.capabilities.depthTexture}return e.prototype.dispose=function(){this._depthBuffers.forEach((function(e){return e.dispose()})),this._depthBuffers.clear(),this._depthTextures.forEach((function(e){return e.dispose()})),this._depthTextures.clear(),this._colorTextures.forEach((function(e){return e.dispose()})),this._colorTextures.clear(),this._framebuffers.forEach((function(e){return e.dispose()})),this._framebuffers.clear()},e.prototype.disposeTargetResource=function(e){var t=e.id;this._activeTargets.has(t)&&(this._activeTargets.delete(t),this._depthTextures.has(t)&&(this._depthTextures.get(t).dispose(),this._depthTextures.delete(t)),this._depthBuffers.has(t)&&(this._depthBuffers.get(t).dispose(),this._depthBuffers.delete(t)),this._colorTextures.has(t)&&(this._colorTextures.get(t).dispose(),this._colorTextures.delete(t)))},e.prototype.getDepthTexture=function(e,t){if(this.depthTextureSupported){var r=this._depthTextures.get(e.id);return r&&(r.descriptor.width===t.width&&r.descriptor.height===t.height||(r.dispose(),r=void 0)),r||(r=new s(this.rctx,{target:3553,pixelFormat:34041,dataType:34042,samplingMode:9728,wrapMode:33071,width:t.width,height:t.height}),this._depthTextures.set(e.id,r),this._activeTargets.add(e.id)),r}},e.prototype.getAllocatedDepthTexture=function(e){return this._depthTextures.get(e.id)},e.prototype.getDepthBuffer=function(e,t){if(!this.depthTextureSupported){var i=this._depthBuffers.get(e.id);return i?i.descriptor.width===t.width&&i.descriptor.height===t.height||i.resize(t.width,t.height):(i=new h(this.rctx,r.__assign({internalFormat:34041},t)),this._depthBuffers.set(e.id,i),this._activeTargets.add(e.id)),i}},e.prototype.getColorTexture=function(e,t){var r=this._colorTextures.get(e.id);return r&&(r.descriptor.width===t.width&&r.descriptor.height===t.height||(r.dispose(),r=void 0)),r||(r=new s(this.rctx,{target:3553,pixelFormat:6408,dataType:e.dataType,samplingMode:null!=e.samplingMode?e.samplingMode:9729,wrapMode:33071,width:t.width,height:t.height}),this._colorTextures.set(e.id,r),this._activeTargets.add(e.id)),r},e.prototype.getAllocatedColorTexture=function(e){return this._colorTextures.get(e.id)},e.prototype.registerDepthTarget=function(e){void 0===e&&(e={});var t=this._nextId++;return r.__assign(r.__assign({id:t},a),e)},e.prototype.registerColorTarget=function(e){void 0===e&&(e={});var t=this._nextId++;return r.__assign(r.__assign({id:t},d),e)},e.prototype.getFramebuffer=function(e,t,r){var h=this.getKey(t,r),s=this._framebuffers.get(h),o=this.getColorTexture(t,e);if(this.depthTextureSupported){var d=r?this.getDepthTexture(r,e):void 0;return s?((s.width!==e.width||s.height!==e.height||s.colorTexture!==o||s.depthStencilTexture!==d)&&(s.detachColorTexture(),s.detachDepthStencilTexture(),s.resize(e.width,e.height),s.attachColorTexture(o),s.attachDepthStencilTexture(d)),s):(s=r?new i(this.rctx,{colorTarget:0,depthStencilTarget:4},o,d):new i(this.rctx,{colorTarget:0,depthStencilTarget:0},o),this._framebuffers.set(h,s),s)}var a=r?this.getDepthBuffer(r,e):void 0;return s?((s.width!==e.width||s.height!==e.height||s.colorTexture!==o)&&(s.detachColorTexture(),s.detachDepthStencilBuffer(),s.resize(e.width,e.height),s.attachColorTexture(o),s.attachDepthStencilBuffer(a)),s):(s=new i(this.rctx,{colorTarget:0,depthStencilTarget:r?3:0},o,a),this._framebuffers.set(h,s),s)},e.prototype.getKey=function(e,t){return e.id+"_"+(t?t.id:"X")+"_"+e.name+(t?"_"+t.name:"")},e.prototype.getGpuMemoryUsage=function(){var e=0,t=new Set,r=function(r){t.has(r)||(t.add(r),e+=o.getGpuMemoryUsage(r))};return this._depthTextures.forEach(r),this._colorTextures.forEach(r),this._depthBuffers.forEach(r),this._framebuffers.forEach(r),e},e}();t.RenderTargetHelper=u}));