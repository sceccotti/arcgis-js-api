/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../../../core/has","../../../../../../core/mathUtils","../../../../../../chunks/builtins","../../../../../webgl/FramebufferObject","../../../../../webgl/RenderingContext","../../VertexStream"],(function(e,t,i,r,s,n,a){"use strict";const o=[1,0],u=[0,1];let l=function(){function e(){this._blurFBO=null,this._size=[0,0],this._programDesc={gaussianBlur:{vsPath:"post-processing/pp",fsPath:"post-processing/blur/gaussianBlur",attributes:{a_position:0}},radialBlur:{vsPath:"post-processing/pp",fsPath:"post-processing/blur/radial-blur",attributes:{a_position:0}},blit:{vsPath:"post-processing/pp",fsPath:"post-processing/blit",attributes:{a_position:0}}}}var t=e.prototype;return t.dispose=function(){this._blurFBO&&(this._blurFBO.dispose(),this._blurFBO=null)},t.draw=function(e,t,i){const{context:r}=e,{type:s,radius:n}=i;if(0===n)return;this._createOrResizeResources(e),this._quad||(this._quad=new a(r,[-1,-1,1,-1,-1,1,1,1]));const o=this._quad;o.bind(),"blur"===s?this._gaussianBlur(e,t,n):this._radialBlur(e,t),o.unbind()},t._gaussianBlur=function(e,t,i){const{context:r,state:s,painter:n,pixelRatio:a}=e,{size:l}=s,{materialManager:d}=n,c=this._programDesc,b=this._quad,h=[Math.round(a*l[0]),Math.round(a*l[1])],p=this._blurFBO,_=d.getProgram(e,c.gaussianBlur,[{name:"radius",value:Math.ceil(i)}]);r.bindProgram(_),r.setBlendingEnabled(!1),r.bindFramebuffer(p),r.bindTexture(t.colorTexture,4),_.setUniform1i("u_colorTexture",4),_.setUniform2fv("u_texSize",h),_.setUniform2fv("u_direction",o),_.setUniform1f("u_sigma",i),b.draw(),r.bindFramebuffer(t),r.setStencilWriteMask(0),r.setStencilTestEnabled(!1),r.setDepthWriteEnabled(!1),r.setDepthTestEnabled(!1),r.bindTexture(p.colorTexture,5),_.setUniform1i("u_colorTexture",5),_.setUniform2fv("u_direction",u),b.draw(),r.setBlendingEnabled(!0),r.setBlendFunction(1,771),r.setStencilTestEnabled(!0)},t._radialBlur=function(e,t){const{context:i,painter:r}=e,{materialManager:s}=r,n=this._programDesc,a=this._quad,o=this._blurFBO;i.bindFramebuffer(o);const u=s.getProgram(e,n.radialBlur);i.bindProgram(u),i.setBlendingEnabled(!1),i.bindTexture(t.colorTexture,4),u.setUniform1i("u_colorTexture",4),a.draw(),i.bindFramebuffer(t),i.setStencilWriteMask(0),i.setStencilTestEnabled(!1),i.setDepthWriteEnabled(!1),i.setDepthTestEnabled(!1),i.setBlendingEnabled(!0);const l=s.getProgram(e,n.blit);i.bindProgram(l),i.bindTexture(o.colorTexture,5),l.setUniform1i("u_texture",5),i.setBlendFunction(1,771),a.draw()},t._createOrResizeResources=function(e){const{context:t,state:i,pixelRatio:r}=e,{size:n}=i,a=Math.round(r*n[0]),o=Math.round(r*n[1]);this._blurFBO&&this._size[0]===a&&this._size[1]===o||(this._size[0]=a,this._size[1]=o,this._blurFBO?this._blurFBO.resize(a,o):this._blurFBO=new s(t,{colorTarget:0,depthStencilTarget:0,width:a,height:o},{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!1,width:a,height:o}))},e}();e.Blur=l,Object.defineProperty(e,"__esModule",{value:!0})}));