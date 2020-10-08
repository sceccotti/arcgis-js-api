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

define(["require","exports","tslib","../../../../../core/Error","../../../../../core/has","../../../../../core/Logger","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/promiseUtils","../../../../../core/accessorSupport/diffUtils","../../../../../layers/support/FieldsIndex","../../../engine/webgl/definitions","../../../engine/webgl/Utils","../../../engine/webgl/util/debug","../tileRenderers/support/visualVariablesUtils","@dojo/framework/shim/Promise"],(function(t,e,r,i,s,n,a,o,u,l,h,c,p,d,f){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isAggregateId=e.DISPLAY_ID_TYPE_AGGREGATE=e.DISPLAY_ID_TYPE_FEATURE=void 0;var _=n.getLogger("esri.views.layers.2d.features.support.AttributeStore"),y=d.createDebugLogger(d.DEBUG_ATTR_UPDATES,_);e.DISPLAY_ID_TYPE_FEATURE=0,e.DISPLAY_ID_TYPE_AGGREGATE=1;var g=function(t){return(2147483648&t)>>>31},b=function(t){return 2147483647&t};e.isAggregateId=function(t){return g(t)===e.DISPLAY_ID_TYPE_AGGREGATE};var m={sharedArrayBuffer:s("esri-shared-array-buffer"),oesTextureFloat:s("esri-webgl-texture-float"),maxTextureSize:s("esri-webgl-max-texture-size"),atomics:s("esri-atomics")};function x(t,e){return function(r){return e(t(r))}}var A=function(){function t(t,e,r,i){this.size=0,this.texelSize=4;var s=i.pixelType,n=i.layout,a=i.textureOnly;this.textureOnly=a||!1,this.pixelType=s,this._ctype=e,this.layout=n,this._resetRange(),this._shared=t,this.size=r,a||(this.data=this._initData(s,r,t,e))}return Object.defineProperty(t.prototype,"buffer",{get:function(){return o.andThen(this.data,(function(t){return t.buffer}))},enumerable:!1,configurable:!0}),t.prototype.unsetComponentAllTexels=function(t,e){for(var r=o.unwrap(this.data),i=0;i<this.size*this.size;i++)r[i*this.texelSize+t]&=~e;this.dirtyStart=0,this.dirtyEnd=this.size*this.size-1},t.prototype.setComponentAllTexels=function(t,e){for(var r=o.unwrap(this.data),i=0;i<this.size*this.size;i++)r[i*this.texelSize+t]|=255&e;this.dirtyStart=0,this.dirtyEnd=this.size*this.size-1},t.prototype.setComponent=function(t,e,r){for(var i=o.unwrap(this.data),s=0,n=r;s<n.length;s++){var a=n[s];i[a*this.texelSize+t]|=e,this.dirtyStart=Math.min(this.dirtyStart,a),this.dirtyEnd=Math.max(this.dirtyEnd,a)}},t.prototype.setComponentTexel=function(t,e,r){o.unwrap(this.data)[r*this.texelSize+t]|=e,this.dirtyStart=Math.min(this.dirtyStart,r),this.dirtyEnd=Math.max(this.dirtyEnd,r)},t.prototype.unsetComponentTexel=function(t,e,r){o.unwrap(this.data)[r*this.texelSize+t]&=~e,this.dirtyStart=Math.min(this.dirtyStart,r),this.dirtyEnd=Math.max(this.dirtyEnd,r)},t.prototype.getData=function(t,e){var r=b(t);return o.unwrap(this.data)[r*this.texelSize+e]},t.prototype.setData=function(t,e,r){var i=b(t),s=1<<e;0!=(this.layout&s)?(this.data[i*this.texelSize+e]=r,this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,i)):_.error("mapview-attributes-store","Tried to set a value for a texel's readonly component")},t.prototype.lock=function(){5121===this.pixelType?this._shared&&m.atomics&&"local"!==this._ctype&&Atomics.store(this.data,0,1):s("esri-2d-debug")&&_.error("AttributeStore-Bad-Type","Tried to unlock non integer array type with float array")},t.prototype.unlock=function(){5121===this.pixelType?this._shared&&m.atomics&&"local"!==this._ctype&&Atomics.store(this.data,0,0):s("esri-2d-debug")&&_.error("AttributeStore-Bad-Type","Tried to unlock non integer array type with float array")},t.prototype.expand=function(t){if(this.size=t,!this.textureOnly){var e=this._initData(this.pixelType,t,this._shared,this._ctype),r=o.unwrap(this.data);e.set(r),this.data=e}},t.prototype.toMessage=function(){var t=this.dirtyStart,e=this.dirtyEnd,r=this.texelSize;if(t>e)return null;this._resetRange();var i=!(this._shared||"local"===this._ctype),s=this.pixelType,n=this.layout,a=o.unwrap(this.data);return a.slice?{start:t,end:e,data:i&&a.slice(t*r,(e+1)*r)||null,pixelType:s,layout:n}:i?{start:t,end:e,data:new(p.getPixelArrayCtor(this.pixelType))(Array.prototype.slice.call(this.data,t*r,(e+1)*r)),pixelType:s,layout:n}:{start:t,end:e,data:null,pixelType:s,layout:n}},t.prototype._initData=function(t,e,r,i){for(var s=r&&"local"!==i?SharedArrayBuffer:ArrayBuffer,n=p.getPixelArrayCtor(t),a=new n(new s(e*e*4*n.BYTES_PER_ELEMENT)),o=0;o<a.length;o+=4)a[o+1]=255;return a},t.prototype._resetRange=function(){this.dirtyStart=2147483647,this.dirtyEnd=0},t}(),T=function(){function n(t){this._attributeComputeMap=new Map,this._blocks=new Array,this._filters=new Array(c.MAX_FILTERS),this._targetType=0,this._abortController=u.createAbortController(),this._hasScaleExpr=!1,this._size=32,this._idsToHighlight=new Set;var e=m.oesTextureFloat?5126:5121;y("Creating AttributeStore "+(m.sharedArrayBuffer?"with":"without")+" shared memory"),s("esri-2d-debug")&&m.sharedArrayBuffer&&!m.atomics&&_.warn("Browser supports SharedArrayBuffer but not Atomics. Rendering may be impacted"),this._client=t,this._blockDescriptors=[{pixelType:5121,layout:1},{pixelType:5121,layout:15,textureOnly:!0},{pixelType:e,layout:15},{pixelType:e,layout:15}],this._blocks=this._blockDescriptors.map((function(){return null}))}return n.prototype.destroy=function(){this._abortController.abort()},Object.defineProperty(n.prototype,"hasScaleExpr",{get:function(){return this._hasScaleExpr},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"_signal",{get:function(){return this._abortController.signal},enumerable:!1,configurable:!0}),n.prototype.update=function(t,r){var i=l.diff(this._schema,r);if(i&&(s("esri-2d-update-debug")&&console.debug("Applying Update - AttributeStore:",i),t.storage.data=!0,this._schema=r,this._attributeComputeMap.clear(),!o.isNone(r))){switch(r.target){case"feature":this._targetType=e.DISPLAY_ID_TYPE_FEATURE;break;case"aggregate":this._targetType=e.DISPLAY_ID_TYPE_AGGREGATE}for(var n=0,a=r.mapping;n<a.length;n++){var u=a[n];this._bindAttribute(u)}}},n.prototype.onTileData=function(t,e){if(!o.isNone(e.addOrUpdate))for(var r=e.addOrUpdate.getCursor();r.next();){var i=r.getDisplayId();this.setAttributeData(i,r)}},n.prototype.invalidateResources=function(){this._createResourcesPromise=null,this._abortController.abort(),this._abortController=u.createAbortController()},n.prototype.setHighlight=function(t,e){return r.__awaiter(this,void 0,void 0,(function(){var i,s,n,a,o;return r.__generator(this,(function(r){switch(r.label){case 0:for(1,i=this._getBlock(0),s=e.map((function(t){return b(t)})),i.lock(),i.unsetComponentAllTexels(0,1),i.setComponent(0,1,s),i.unlock(),this._idsToHighlight.clear(),n=0,a=t;n<a.length;n++)o=a[n],this._idsToHighlight.add(o);return[4,this.sendUpdates()];case 1:return r.sent(),[2]}}))}))},n.prototype.updateFilters=function(t,e){return r.__awaiter(this,void 0,void 0,(function(){var i,n,a,o,l,h,c=this;return r.__generator(this,(function(r){switch(r.label){case 0:return i=e.config,n=e.service,a=e.spatialReference,o=i.filters,l=o.map((function(t,e){return c._updateFilter(t,e,n,a)})),[4,u.all(l)];case 1:return h=r.sent(),h.some((function(t){return t}))&&(t.storage.filters=!0,s("esri-2d-update-debug")&&console.debug("Applying Update - AttributeStore:","Filters changed")),[2]}}))}))},n.prototype.setData=function(t,e,r,i){var s=b(t);this._ensureSizeForTexel(s),this._getBlock(e).setData(t,r,i)},n.prototype.getData=function(t,e,r){return this._getBlock(e).getData(t,r)},n.prototype.getHighlightFlag=function(t){return this._idsToHighlight.has(t)?c.HIGHLIGHT_FLAG:0},n.prototype.setAttributeData=function(t,e){var r=this,i=b(t);if(this._ensureSizeForTexel(i),this._getBlock(0).setData(i,0,this.getFilterFlags(e)),this._targetType===g(t)){var s=this._attributeComputeMap,n=m.oesTextureFloat?1:2;s.size&&s.forEach((function(t,s){var o=s*n%4,u=Math.floor(s*n/4),l=r._getBlock(u+c.ATTRIBUTE_DATA_VV),h=t(e);if(m.oesTextureFloat)l.setData(i,o,h);else if(h===c.NAN_MAGIC_NUMBER)l.setData(i,o,255),l.setData(i,o+1,255);else{var p=a.clamp(Math.round(h),-32767,32766)+32768,d=255&p,f=(65280&p)>>8;l.setData(i,o,d),l.setData(i,o+1,f)}}))}},n.prototype.sendUpdates=function(){var t=this;if(this._nextUpdate)return this._nextUpdate.promise;if(this._currUpdate)return this._nextUpdate=u.createResolver(),this._nextUpdate.promise;var e={blocks:this._blocks.map((function(t){return o.isSome(t)?t.toMessage():null}))};return this._currUpdate=this._createResources().then((function(){var r=function(){if(t._currUpdate=null,t._nextUpdate){var e=t._nextUpdate;t._nextUpdate=null,t.sendUpdates().then((function(){return e.resolve()}))}},i=t._client.update(e,t._signal).then(r).catch(r);return t._client.render(t._signal),i})).catch((function(e){return u.isAbortError(e)?(t._createResourcesPromise=null,t._createResources()):(_.error(new i("mapview-attribute-store","Encountered an error during client update",e)),u.resolve())})),this._currUpdate},n.prototype._ensureSizeForTexel=function(t){for(;t>=this._size*this._size;)if(this._expand())return},n.prototype._bindAttribute=function(t){var e;if(null!=t.fieldIndex)t.normalizationField&&_.warn("mapview-arcade","Ignoring normalizationField specified with an arcade expression which is not supported."),e=function(e){return e.getComputedNumericAtIndex(t.fieldIndex)};else{if(!t.field)return void(s("esri-2d-debug")&&console.error("Unable to create evaluator. Found neither a field nor fieldIndex in",t));e=t.normalizationField?function(e){var r=e.readAttribute(t.normalizationField);return r?e.readAttribute(t.field)/r:null}:function(e){return e.readAttribute(t.field)}}if(t.valueRepresentation){e=x(e,(function(e){return f.getVisualVariableSizeValueRepresentationRatio(e,t.valueRepresentation)}))}this._attributeComputeMap.set(t.binding,x(e,(function(t){return null===t||isNaN(t)||t===1/0?c.NAN_MAGIC_NUMBER:t})))},n.prototype._createResources=function(){var t=this;if(o.isSome(this._createResourcesPromise))return this._createResourcesPromise;this._getBlock(c.ATTRIBUTE_DATA_ANIMATION),y("Initializing AttributeStore");var e={shared:m.sharedArrayBuffer&&!("local"===this._client.type),size:this._size,blocks:o.mapMany(this._blocks,(function(t){return{textureOnly:t.textureOnly,buffer:t.buffer,pixelType:t.pixelType}}))},r=this._client.initialize(e,this._signal).catch((function(e){u.isAbortError(e)?t._createResourcesPromise=null:_.error(new i("mapview-attribute-store","Encountered an error during client initialization",e))}));return this._createResourcesPromise=r,r.then((function(){return o.isNone(t._createResourcesPromise)?t._createResources():void 0})),r},n.prototype._getBlock=function(t){var e=this._blocks[t];if(o.isSome(e))return e;y("Initializing AttributeBlock at index "+t);var r=m.sharedArrayBuffer,i=this._client.type,s=new A(r,i,this._size,this._blockDescriptors[t]);return this._blocks[t]=s,this._createResourcesPromise=null,s},n.prototype._expand=function(){if(this._size<m.maxTextureSize){var t=this._size<<=1;return y("Expanding block size to",t,this._blocks),o.forEachSome(this._blocks,(function(e){return e.expand(t)})),this._createResourcesPromise=null,this._size=t,0}return _.error(new i("mapview-limitations","Maximum number of onscreen features exceeded.")),-1},n.prototype._updateFilter=function(t,e,i,s){return r.__awaiter(this,void 0,void 0,(function(){var n,a,u,l;return r.__generator(this,(function(r){switch(r.label){case 0:return n=this._filters[e],a=o.isSome(n)&&n.hash,n||t?a===JSON.stringify(t)?[2,!1]:o.isNone(t)?(u=1<<e+1,l=this._getBlock(0),this._filters[e]=null,l.setComponentAllTexels(0,u),this.sendUpdates(),[2,!0]):[4,this._getFilter(e,i)]:[2,!1];case 1:return[4,r.sent().update(t,s)];case 2:return r.sent(),[2,!0]}}))}))},n.prototype._getFilter=function(e,i){return r.__awaiter(this,void 0,void 0,(function(){var s,n,a;return r.__generator(this,(function(r){switch(r.label){case 0:return s=this._filters[e],o.isSome(s)?[2,s]:[4,new Promise((function(e,r){t(["../../../../../layers/graphics/data/FeatureFilter"],e,r)}))];case 1:return n=r.sent().default,a=new n({geometryType:i.geometryType,hasM:!1,hasZ:!1,timeInfo:i.timeInfo,fieldsIndex:new h(i.fields)}),this._filters[e]=a,[2,a]}}))}))},n.prototype.isVisible=function(t){return!!(2&this._getBlock(0).getData(t,0))},n.prototype.getFilterFlags=function(t){for(var r,i=0,s=(r=t.getDisplayId(),g(r)===e.DISPLAY_ID_TYPE_AGGREGATE?254:255),n=0;n<this._filters.length;n++){var a=!!(s&1<<n),u=this._filters[n];i|=(!a||o.isNone(u)||u.check(t)?1:0)<<n}var l=0;if(this._idsToHighlight.size){var h=t.getObjectId();l=this.getHighlightFlag(h)}return i<<1|l},n}();e.default=T}));