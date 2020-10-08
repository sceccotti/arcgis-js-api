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

define(["require","exports","../../../../../webgl","../../VertexStream"],(function(e,t,i,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EdgeEnhance=void 0;var r=function(){function e(){this._fbo=null,this._size=[0,0],this._programDesc={"edge-enhance":{vsPath:"post-processing/pp",fsPath:"post-processing/edge-enhance",attributes:{a_position:0}},blit:{vsPath:"post-processing/pp",fsPath:"post-processing/blit",attributes:{a_position:0}}}}return e.prototype.dispose=function(){this._fbo&&(this._fbo.dispose(),this._fbo=null),this._quad&&(this._quad.dispose(),this._quad=null)},e.prototype.draw=function(e,t,i){this._createOrResizeResources(e);var r=e.context,o=e.state,n=e.painter,a=e.pixelRatio,h=n.materialManager,u=this._programDesc,d=o.size,c=[Math.round(a*d[0]),Math.round(a*d[1])],p=r.gl;this._quad||(this._quad=new s(r,[-1,-1,1,-1,-1,1,1,1]));var _=this._fbo,b=this._quad;b.bind();var l=h.getProgram(e,u["edge-enhance"]);r.bindProgram(l),r.bindFramebuffer(_),r.setClearColor(0,0,0,0),r.clear(p.COLOR_BUFFER_BIT),r.bindTexture(t.colorTexture,4),l.setUniform1i("u_colorTexture",4),l.setUniform2fv("u_texSize",c),b.draw(),r.bindFramebuffer(t),r.setStencilWriteMask(0),r.setStencilTestEnabled(!1),r.setDepthWriteEnabled(!1),r.setDepthTestEnabled(!1),r.setBlendingEnabled(!0);var f=h.getProgram(e,u.blit);r.bindProgram(f),r.bindTexture(_.colorTexture,6),f.setUniform1i("u_texture",6),r.setBlendFunction(1,771),b.draw(),b.unbind()},e.prototype._createOrResizeResources=function(e){var t=e.context,s=e.state,r=e.pixelRatio,o=s.size,n=Math.round(r*o[0]),a=Math.round(r*o[1]);this._fbo&&this._size[0]===n&&this._size[1]===a||(this._size[0]=n,this._size[1]=a,this._fbo?this._fbo.resize(n,a):this._fbo=new i.FramebufferObject(t,{colorTarget:0,depthStencilTarget:0,width:n,height:a}))},e}();t.EdgeEnhance=r}));