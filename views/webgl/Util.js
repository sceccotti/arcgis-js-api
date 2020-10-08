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

define(["require","exports","tslib","../../core/compilerUtils","../../core/maybe"],(function(e,r,t,n,i){"use strict";function a(e){return e[0].stride}function o(e){switch(e){case 5126:case 5124:case 5125:return 4;case 5122:case 5123:return 2;case 5120:case 5121:return 1;default:throw n.neverReached(e),new Error("Unknown data type")}}function s(e){switch(e){case 6406:case 6409:return 1;case 6410:return 2;case 6407:return 3;case 6408:case 34041:return 4;case 33325:return 2;case 33326:case 35898:case 33327:return 4;case 33328:case 34842:return 8;case 34836:return 16;case 33189:return 2;case 34041:return 4;case 32854:return 2;case 36168:return 1;default:n.neverReached(e)}return 0}Object.defineProperty(r,"__esModule",{value:!0}),r.getGpuMemoryUsage=r.getBytesPerElementFormat=r.unbindVertexBufferLayout=r.bindVertexBufferLayout=r.setBaseInstanceOffset=r.copyFramebufferToTexture=r.findAttribute=r.hasAttribute=r.addDescriptor=r.getTypedArrayConstructor=r.getBytesPerElement=r.getStride=r.vertexCount=void 0,r.vertexCount=function(e,r){return e.vertexBuffers[r].size/a(e.layout[r])},r.getStride=a,r.getBytesPerElement=o,r.getTypedArrayConstructor=function(e){switch(e){case 5120:return Int8Array;case 5126:return Float32Array;case 5124:return Int32Array;case 5122:return Int16Array;case 5121:return Uint8Array;case 5125:return Uint32Array;case 5123:return Uint16Array;default:throw n.neverReached(e),new Error("Unknown data type")}},r.addDescriptor=function(e,r,t,n,i,a){var s=o(n);if(e.length>0){var u=e[0].stride,c=u+s*t;e.forEach((function(e){return e.stride=c})),e.push({name:r,count:t,type:n,offset:u,stride:c,normalized:i,divisor:a})}else e.push({name:r,count:t,type:n,offset:0,stride:s*t,normalized:i,divisor:a})},r.hasAttribute=function(e,r){for(var t=0;t<e.length;t++)if(e[t].name===r)return!0;return!1},r.findAttribute=function(e,r){for(var t=0;t<e.length;t++)if(e[t].name===r)return e[t];return null},r.copyFramebufferToTexture=function(e,r,t,n,i){void 0===i&&(i=0);var a=e.getBoundFramebufferObject(),o=e.getBoundTexture(0);e.bindFramebuffer(r),e.bindTexture(t,0),e.gl.copyTexImage2D(e.gl.TEXTURE_2D,i,t.descriptor.pixelFormat,n[0],n[1],n[2],n[3],0),e.gl.flush(),e.bindFramebuffer(a),e.bindTexture(o,0)},r.setBaseInstanceOffset=function(e,r){var n={};for(var i in e)n[i]=e[i].map((function(e){return e.divisor?t.__assign(t.__assign({},e),{baseInstance:r}):e}));return n},r.bindVertexBufferLayout=function(e,r,t,n,i){var a=e.gl,o=e.capabilities.instancing;e.bindBuffer(t);for(var s=0,u=n;s<u.length;s++){var c=u[s],f=r[c.name],d=(i||(0+c.baseInstance?c.baseInstance:0))*c.stride;if(void 0===f&&console.error("There is no location for vertex attribute '"+c.name+"' defined."),c.baseInstance&&!c.divisor&&console.error("Vertex attribute '"+c.name+"' uses baseInstanceOffset without divisor."),c.count<=4)a.vertexAttribPointer(f,c.count,c.type,c.normalized,c.stride,c.offset+d),a.enableVertexAttribArray(f),c.divisor&&c.divisor>0&&o&&o.vertexAttribDivisor(f,c.divisor);else if(9===c.count)for(var v=0;v<3;v++)a.vertexAttribPointer(f+v,3,c.type,c.normalized,c.stride,c.offset+12*v+d),a.enableVertexAttribArray(f+v),c.divisor&&c.divisor>0&&o&&o.vertexAttribDivisor(f+v,c.divisor);else if(16===c.count)for(v=0;v<4;v++)a.vertexAttribPointer(f+v,4,c.type,c.normalized,c.stride,c.offset+16*v+d),a.enableVertexAttribArray(f+v),c.divisor&&c.divisor>0&&o&&o.vertexAttribDivisor(f+v,c.divisor);else console.error("Unsupported vertex attribute element count: "+c.count)}},r.unbindVertexBufferLayout=function(e,r,t,n){var i=e.gl,a=e.capabilities.instancing;e.bindBuffer(t);for(var o=0,s=n;o<s.length;o++){var u=s[o],c=r[u.name];if(u.count<=4)i.disableVertexAttribArray(c),u.divisor&&u.divisor>0&&a&&a.vertexAttribDivisor(c,0);else if(9===u.count)for(var f=0;f<3;f++)i.disableVertexAttribArray(c+f),u.divisor&&u.divisor>0&&a&&a.vertexAttribDivisor(c+f,0);else if(16===u.count)for(f=0;f<4;f++)i.disableVertexAttribArray(c+f),u.divisor&&u.divisor>0&&a&&a.vertexAttribDivisor(c+f,0);else console.error("Unsupported vertex attribute element count: "+u.count)}e.unbindBuffer(34962)},r.getBytesPerElementFormat=s,r.getGpuMemoryUsage=function e(r){if(i.isNone(r))return 0;if("colorAttachment"in r)return r.glName?e(r.colorAttachment)+e(r.depthStencilAttachment):0;if("descriptor"in r)return r.glName?e(r.descriptor):0;var t=r.internalFormat||"pixelFormat"in r&&r.pixelFormat;if(!t)return 0;var n="hasMipmap"in r&&r.hasMipmap?1.3:1,a=r.width*r.height;return s(t)*a*n}}));