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

define(["require","exports","../../../../../webgl","../../VertexStream"],(function(t,e,i,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Bloom=void 0;var r=[1,0],o=[0,1],n=[1,.8,.6,.4,.2],a=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],u=function(){function t(){this._intensityFBO=null,this._compositeFBO=null,this._mipsFBOs=new Array(5),this._nMips=5,this._kernelSizeArray=[3,5,7,9,11],this._size=[0,0],this._programDesc={luminosityHighPass:{vsPath:"post-processing/pp",fsPath:"post-processing/bloom/luminosityHighPass",attributes:{a_position:0}},gaussianBlur:{vsPath:"post-processing/pp",fsPath:"post-processing/bloom/gaussianBlur",attributes:{a_position:0}},composite:{vsPath:"post-processing/pp",fsPath:"post-processing/bloom/composite",attributes:{a_position:0}},blit:{vsPath:"post-processing/pp",fsPath:"post-processing/blit",attributes:{a_position:0}}}}return t.prototype.dispose=function(){if(this._quad&&(this._quad.dispose(),this._quad=null),this._intensityFBO&&(this._intensityFBO.dispose(),this._intensityFBO=null),this._compositeFBO&&(this._compositeFBO.dispose(),this._compositeFBO=null),this._mipsFBOs){for(var t=0;t<this._nMips;t++)this._mipsFBOs[t]&&(this._mipsFBOs[t].horizontal.dispose(),this._mipsFBOs[t].vertical.dispose());this._mipsFBOs=null}},t.prototype.draw=function(t,e,i){var u=t.context,h=t.state,l=t.painter,p=t.pixelRatio,d=h.size,m=l.materialManager,_=u.gl,c=this._programDesc,f=Math.round(p*d[0]),b=Math.round(p*d[1]),g=i.strength,F=i.radius,B=i.threshold;this._quad||(this._quad=new s(u,[-1,-1,1,-1,-1,1,1,1])),this._createOrResizeResources(t),u.setStencilTestEnabled(!1),u.setBlendingEnabled(!0),u.setBlendFunction(1,771),u.setStencilWriteMask(0);var O=this._quad;O.bind(),u.bindFramebuffer(this._intensityFBO);var T=m.getProgram(t,c.luminosityHighPass);u.bindProgram(T),u.bindTexture(e.colorTexture,0),T.setUniform1i("u_texture",0),T.setUniform3fv("u_defaultColor",[0,0,0]),T.setUniform1f("u_defaultOpacity",0),T.setUniform1f("u_luminosityThreshold",B),T.setUniform1f("u_smoothWidth",.01);var v=[Math.round(f/2),Math.round(b/2)];u.setViewport(0,0,v[0],v[1]),u.setClearColor(0,0,0,0),u.clear(_.COLOR_BUFFER_BIT),O.draw(),u.setBlendingEnabled(!1);for(var x=this._intensityFBO.colorTexture,w=0;w<this._nMips;w++){var M=m.getProgram(t,c.gaussianBlur,[{name:"radius",value:this._kernelSizeArray[w]}]);u.bindProgram(M),u.bindTexture(x,w+1),M.setUniform1i("u_colorTexture",w+1),M.setUniform2fv("u_texSize",v),M.setUniform2fv("u_direction",r),u.setViewport(0,0,v[0],v[1]);var y=this._mipsFBOs[w];u.bindFramebuffer(y.horizontal),O.draw(),x=y.horizontal.colorTexture,u.bindFramebuffer(y.vertical),u.bindTexture(x,w+1),M.setUniform2fv("u_direction",o),O.draw(),x=y.vertical.colorTexture,v[0]=Math.round(v[0]/2),v[1]=Math.round(v[1]/2)}u.setViewport(0,0,f,b);var z=m.getProgram(t,c.composite,[{name:"nummips",value:5}]);u.bindFramebuffer(this._compositeFBO),u.bindProgram(z),z.setUniform1f("u_bloomStrength",g),z.setUniform1f("u_bloomRadius",F),z.setUniform1fv("u_bloomFactors",n),z.setUniform3fv("u_bloomTintColors",a),u.bindTexture(this._mipsFBOs[0].vertical.colorTexture,1),z.setUniform1i("u_blurTexture1",1),u.bindTexture(this._mipsFBOs[1].vertical.colorTexture,2),z.setUniform1i("u_blurTexture2",2),u.bindTexture(this._mipsFBOs[2].vertical.colorTexture,3),z.setUniform1i("u_blurTexture3",3),u.bindTexture(this._mipsFBOs[3].vertical.colorTexture,4),z.setUniform1i("u_blurTexture4",4),u.bindTexture(this._mipsFBOs[4].vertical.colorTexture,5),z.setUniform1i("u_blurTexture5",5),O.draw(),u.bindFramebuffer(e),u.setBlendingEnabled(!0);var P=m.getProgram(t,c.blit);u.bindProgram(P),u.bindTexture(this._compositeFBO.colorTexture,6),P.setUniform1i("u_texture",6),u.setBlendFunction(1,1),O.draw(),O.unbind(),u.setBlendFunction(1,771),u.setStencilTestEnabled(!0)},t.prototype._createOrResizeResources=function(t){var e=t.context,s=t.state,r=t.pixelRatio,o=s.size,n=Math.round(r*o[0]),a=Math.round(r*o[1]);if(!this._compositeFBO||this._size[0]!==n||this._size[1]!==a){this._size[0]=n,this._size[1]=a;var u=[Math.round(n/2),Math.round(a/2)];this._compositeFBO?this._compositeFBO.resize(n,a):this._compositeFBO=new i.FramebufferObject(e,{colorTarget:0,depthStencilTarget:0,width:n,height:a}),this._intensityFBO?this._intensityFBO.resize(u[0],u[1]):this._intensityFBO=new i.FramebufferObject(e,{colorTarget:0,depthStencilTarget:0,width:u[0],height:u[1]},{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!1,width:u[0],height:u[1]});for(var h=0;h<this._nMips;h++)this._mipsFBOs[h]?(this._mipsFBOs[h].horizontal.resize(u[0],u[1]),this._mipsFBOs[h].vertical.resize(u[0],u[1])):this._mipsFBOs[h]={horizontal:new i.FramebufferObject(e,{colorTarget:0,depthStencilTarget:0,width:u[0],height:u[1]},{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!1,width:u[0],height:u[1]}),vertical:new i.FramebufferObject(e,{colorTarget:0,depthStencilTarget:0,width:u[0],height:u[1]},{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!1,width:u[0],height:u[1]})},u[0]=Math.round(u[0]/2),u[1]=Math.round(u[1]/2)}},t}();e.Bloom=u}));