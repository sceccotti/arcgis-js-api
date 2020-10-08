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

define(["require","exports","tslib","../../core/has","../../core/Logger","../../core/maybe","./Renderbuffer","./Texture"],(function(t,e,i,r,n,s,h,o){"use strict";var a=n.getLogger("esri.views.webgl.FrameBufferObject"),c=function(){function t(e,r,n,a){var c,l;if(this._context=null,this._glName=null,this._depthAttachment=null,this._stencilAttachment=null,this._colorAttachments=new Map,this._initialized=!1,this._context=e,this._desc=i.__assign({},r),this._id=t._nextId++,s.isSome(e.instanceCounter)&&e.instanceCounter.increment(4,this),n){var d=void 0;if(Array.isArray(n))for(var f=0,u=n;f<u.length;f++){var _=u[f],p=_.attachmentPoint,m=_.texture,T=m instanceof o?m:new o(e,m);d=T.descriptor,this._colorAttachments.set(p,T),this._validateColorAttachmentPoint(p),this._validateTextureDimensions(d,this._desc)}else n instanceof o?(d=n.descriptor,this._colorAttachments.set(36064,n)):(d=n,this._colorAttachments.set(36064,new o(e,n))),0!==(null===(c=this._desc)||void 0===c?void 0:c.colorTarget)&&console.error("Framebuffer is initialized with a texture however the descriptor indicates using a renderbuffer color attachment!"),this._validateTextureDimensions(d,this._desc)}if(a instanceof h){var E=null!==(l=this._desc.depthStencilTarget)&&void 0!==l?l:3;2===E?this._stencilAttachment=a:1===E||3===E?this._depthAttachment=a:console.error('If a Renderbuffer is provided, "depthStencilTarget" must be one of STENCIL_RENDER_BUFFER, DEPTH_RENDER_BUFFER or DEPTH_STENCIL_RENDER_BUFFER'),t._validateBufferDimensions(a.descriptor,this._desc)}else if(a){this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var A=void 0;a instanceof o?(this._depthStencilTexture=a,A=this._depthStencilTexture.descriptor):(A=a,this._depthStencilTexture=new o(this._context,A)),this._validateTextureDimensions(A,this._desc)}}return t.prototype.dispose=function(){if(this._context){var t=this._context,e=t.getBoundFramebufferObject();if(this._disposeColorAttachments(),this._disposeDepthStencilAttachments(),this._glName)t.gl.deleteFramebuffer(this._glName),this._glName=null;s.isSome(t.instanceCounter)&&t.instanceCounter.decrement(4,this),t.bindFramebuffer(e),this._context=null}},Object.defineProperty(t.prototype,"id",{get:function(){return this._id},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"glName",{get:function(){return this._glName},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"descriptor",{get:function(){return this._desc},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"colorTexture",{get:function(){var t=this._colorAttachments.get(36064);return t&&t instanceof o?t:null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"colorAttachment",{get:function(){return this._colorAttachments.get(36064)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"depthStencilAttachment",{get:function(){return this._depthStencilTexture||this._depthAttachment||this._stencilAttachment},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"depthStencilTexture",{get:function(){return this._depthStencilTexture},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._desc.width},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._desc.height},enumerable:!1,configurable:!0}),t.prototype.getColorTexture=function(t){var e=this._colorAttachments.get(t);return e&&e instanceof o?e:null},t.prototype.attachColorTexture=function(t,e){if(void 0===e&&(e=36064),t){this._validateColorAttachmentPoint(e);var i=t.descriptor;if(this._validateTextureDimensions(i,this._desc),this._disposeColorAttachments(),this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,e,r.TEXTURE_2D,t.glName,0)}this._colorAttachments.set(e,t)}},t.prototype.detachColorTexture=function(t){void 0===t&&(t=36064);var e=this._colorAttachments.get(t);if(e instanceof o){var i=e;if(this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl;r.framebufferTexture2D(r.FRAMEBUFFER,t,r.TEXTURE_2D,null,0)}return this._colorAttachments.delete(t),i}},t.prototype.attachDepthStencilTexture=function(t){if(t){var e=t.descriptor;if(34041!==e.pixelFormat&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!"),34042!==e.dataType&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8_WEBGL!"),this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!"),this._validateTextureDimensions(e,this._desc),this._desc.depthStencilTarget&&4!==this._desc.depthStencilTarget&&(this._desc.depthStencilTarget=4),this._disposeDepthStencilAttachments(),this._initialized){this._context.bindFramebuffer(this);var i=this._context.gl;i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,t.glName,0)}this._depthStencilTexture=t}},t.prototype.detachDepthStencilTexture=function(){var t=this._depthStencilTexture;if(t&&this._initialized){this._context.bindFramebuffer(this);var e=this._context.gl;this._context.gl.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,null,0)}return this._depthStencilTexture=null,t},t.prototype.attachDepthStencilBuffer=function(e){if(e){var i=e.descriptor;if(34041!==i.internalFormat&&33189!==i.internalFormat&&console.error("Depth/Stencil buffer must have correct internalFormat"),t._validateBufferDimensions(i,this._desc),this._disposeDepthStencilAttachments(),this._desc.depthStencilTarget=34041===i.internalFormat?3:1,this._initialized){this._context.bindFramebuffer(this);var r=this._context.gl,n=1===this._desc.depthStencilTarget?r.DEPTH_ATTACHMENT:r.DEPTH_STENCIL_ATTACHMENT;r.framebufferRenderbuffer(r.FRAMEBUFFER,n,r.RENDERBUFFER,e.glName)}this._depthAttachment=e}},t.prototype.detachDepthStencilBuffer=function(){var t=this._context.gl,e=this._depthAttachment;if(e&&this._initialized){this._context.bindFramebuffer(this);var i=1===this._desc.depthStencilTarget?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(t.FRAMEBUFFER,i,t.RENDERBUFFER,null)}return this._depthAttachment=null,e},t.prototype.copyToTexture=function(t,e,i,r,n,s,h){(t<0||e<0||n<0||s<0)&&console.error("Offsets cannot be negative!"),(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!");var o=this._desc,a=h.descriptor;3553!==h.descriptor.target&&console.error("Texture target must be TEXTURE_2D!"),(t+i>o.width||e+r>o.height||n+i>a.width||s+r>a.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");var c=this._context;c.bindTexture(h),c.bindFramebuffer(this),c.gl.copyTexSubImage2D(3553,0,n,s,t,e,i,r)},t.prototype.readPixels=function(t,e,i,r,n,s,h){(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!"),h||console.error("Target memory is not initialized!"),this._context.bindFramebuffer(this),this._context.gl.readPixels(t,e,i,r,n,s,h)},t.prototype.resize=function(t,e){var i=this._desc;if(i.width!==t||i.height!==e){if(!this._initialized)return i.width=t,i.height=e,this._colorAttachments.forEach((function(i){i&&i.resize(t,e)})),void(this._depthStencilTexture&&this._depthStencilTexture.resize(t,e));i.width=t,i.height=e,this._colorAttachments.forEach((function(i){i&&i.resize(t,e)})),null!=this._depthStencilTexture?this._depthStencilTexture.resize(t,e):(this._depthAttachment||this._stencilAttachment)&&(this._depthAttachment&&this._depthAttachment.resize(t,e),this._stencilAttachment&&this._stencilAttachment.resize(t,e)),this._context.getBoundFramebufferObject()===this&&this._context.bindFramebuffer(null),this._initialized=!1}},t.prototype.initialize=function(){var t,e,i,n;if(this._initialized)return!1;var s=this._context,a=s.gl;this._glName&&a.deleteFramebuffer(this._glName);var c=a.createFramebuffer(),d=this._desc,f=null!==(t=d.colorTarget)&&void 0!==t?t:1,u=null!==(e=d.width)&&void 0!==e?e:1,_=null!==(i=d.height)&&void 0!==i?i:1;if(a.bindFramebuffer(a.FRAMEBUFFER,c),0===this._colorAttachments.size)if(0===f)this._colorAttachments.set(36064,l(s,d));else{var p=new h(s,{internalFormat:32854,width:u,height:_});this._colorAttachments.set(36064,p)}this._colorAttachments.forEach((function(t,e){t&&(t instanceof o?a.framebufferTexture2D(a.FRAMEBUFFER,e,a.TEXTURE_2D,t.glName,0):a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,t.glName))}));var m=null!==(n=d.depthStencilTarget)&&void 0!==n?n:0;switch(m){case 1:case 3:this._depthAttachment||(this._depthAttachment=new h(s,{internalFormat:1===d.depthStencilTarget?33189:34041,width:u,height:_}));var T=1===m?a.DEPTH_ATTACHMENT:a.DEPTH_STENCIL_ATTACHMENT;a.framebufferRenderbuffer(a.FRAMEBUFFER,T,a.RENDERBUFFER,this._depthAttachment.glName);break;case 2:this._stencilAttachment||(this._stencilAttachment=new h(s,{internalFormat:36168,width:u,height:_})),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.STENCIL_ATTACHMENT,a.RENDERBUFFER,this._stencilAttachment.glName);break;case 4:if(!this._depthStencilTexture){s.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");var E={target:3553,pixelFormat:34041,dataType:34042,samplingMode:9728,wrapMode:33071,width:u,height:_};this._depthStencilTexture=new o(s,E)}a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,this._depthStencilTexture.glName,0)}r("esri-validate-shaders")&&(a.checkFramebufferStatus(a.FRAMEBUFFER)!==a.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!"));return this._glName=c,this._initialized=!0,!0},t.prototype._disposeColorAttachments=function(){var t=this;this._colorAttachments.forEach((function(e,i){if(e instanceof o){if(t._initialized)t._context.bindFramebuffer(t),(r=t._context.gl).framebufferTexture2D(r.FRAMEBUFFER,i,r.TEXTURE_2D,null,0);e.dispose()}else if(e instanceof WebGLRenderbuffer){var r=t._context.gl;t._initialized&&(t._context.bindFramebuffer(t),r.framebufferRenderbuffer(r.FRAMEBUFFER,i,r.RENDERBUFFER,null)),t._context.gl.deleteRenderbuffer(e)}})),this._colorAttachments.clear()},t.prototype._disposeDepthStencilAttachments=function(){var t=this._context.gl;if(this._depthAttachment){if(this._initialized){this._context.bindFramebuffer(this);var e=1===this._desc.depthStencilTarget?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(t.FRAMEBUFFER,e,t.RENDERBUFFER,null)}this._depthAttachment.dispose(),this._depthAttachment=null}this._stencilAttachment&&(this._initialized&&(this._context.bindFramebuffer(this),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,null)),this._stencilAttachment.dispose(),this._stencilAttachment=null),this._depthStencilTexture&&(this._initialized&&(this._context.bindFramebuffer(this),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,null,0)),this._depthStencilTexture.dispose(),this._depthStencilTexture=null)},t._validateBufferDimensions=function(t,e){console.assert(t.width>=0&&t.height>=0),void 0!==e.width&&e.width>=0&&void 0!==e.height&&e.height>=0?e.width===t.width&&e.height===t.height||console.error("Renderbuffer dimensions must match the framebuffer's!"):(e.width=t.width,e.height=t.height)},t.prototype._validateTextureDimensions=function(t,e){console.assert(t.width>=0&&t.height>=0),3553!==t.target&&console.error("Texture type must be TEXTURE_2D!"),void 0!==e.width&&e.width>=0&&void 0!==e.height&&e.height>=0?e.width===t.width&&e.height===t.height||console.error("Color attachment texture must match the framebuffer's!"):(e.width=t.width,e.height=t.height)},t.prototype._validateColorAttachmentPoint=function(e){if(-1===t._MAX_COLOR_ATTACHMENTS){var i=this._context.capabilities.drawBuffers;if(i){var r=this._context.gl;t._MAX_COLOR_ATTACHMENTS=r.getParameter(i.MAX_COLOR_ATTACHMENTS)}else t._MAX_COLOR_ATTACHMENTS=1}var n=e-36064;n+1>t._MAX_COLOR_ATTACHMENTS&&a.error("esri.FrameBufferObject","illegal attachment point for color attachment: "+(n+1)+". Implementation supports up to "+t._MAX_COLOR_ATTACHMENTS+" color attachments")},t._nextId=0,t._MAX_COLOR_ATTACHMENTS=-1,t}(),l=function(t,e){return new o(t,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,wrapMode:33071,width:e.width,height:e.height})};return c}));