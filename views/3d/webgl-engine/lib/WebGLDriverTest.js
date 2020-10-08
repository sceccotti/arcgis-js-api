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

define(["require","exports","../../../../core/maybe","../../../../core/libs/gl-matrix-2/vec3f64","../../../webgl","./doublePrecisionUtils","./Util"],(function(e,n,t,r,o,i,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.clearTestWebGLDriver=n.testWebGLDriver=void 0;var c=function(){function e(e){this.context=e,this._doublePrecisionRequiresObfuscation=null}return Object.defineProperty(e.prototype,"doublePrecisionRequiresObfuscation",{get:function(){if(t.isNone(this._doublePrecisionRequiresObfuscation)){var e=u(this.context,!1),n=u(this.context,!0);this._doublePrecisionRequiresObfuscation=0!==e&&(0===n||e/n>5)}return this._doublePrecisionRequiresObfuscation},enumerable:!1,configurable:!0}),e}(),s=null;function u(e,n){var t=new o.FramebufferObject(e,{colorTarget:0,depthStencilTarget:0},{target:3553,wrapMode:33071,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1});var c=o.BufferObject.createVertex(e,35044,new Uint16Array([0,0,1,0,0,1,1,1])),s=new o.VertexArrayObject(e,{a_pos:0},{geometry:[{name:"a_pos",count:2,type:5123,offset:0,stride:4,normalized:!1}]},{geometry:c}),u=r.vec3f64.fromValues(5633261.287538229,2626832.878767164,1434988.0495278358),l=r.vec3f64.fromValues(5633271.46742708,2626873.6381334523,1434963.231608387),v=function(t,r){var a="\n\n  precision highp float;\n\n  attribute vec2 a_pos;\n\n  uniform vec3 u_highA;\n  uniform vec3 u_lowA;\n  uniform vec3 u_highB;\n  uniform vec3 u_lowB;\n\n  varying vec4 v_color;\n\n  "+(n?"#define DOUBLE_PRECISION_REQUIRES_OBFUSCATION":"")+"\n\n  #ifdef DOUBLE_PRECISION_REQUIRES_OBFUSCATION\n\n  vec3 dpPlusFrc(vec3 a, vec3 b) {\n    return mix(a, a + b, vec3(notEqual(b, vec3(0))));\n  }\n\n  vec3 dpMinusFrc(vec3 a, vec3 b) {\n    return mix(vec3(0), a - b, vec3(notEqual(a, b)));\n  }\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = dpPlusFrc(hiA, hiB);\n    vec3 e = dpMinusFrc(t1, hiA);\n    vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;\n    return t1 + t2;\n  }\n\n  #else\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = hiA + hiB;\n    vec3 e = t1 - hiA;\n    vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;\n    return t1 + t2;\n  }\n\n  #endif\n\n  const float MAX_RGBA_FLOAT =\n    255.0 / 256.0 +\n    255.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 / 256.0;\n\n  const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);\n\n  vec4 float2rgba(const float value) {\n    // Make sure value is in the domain we can represent\n    float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);\n\n    // Decompose value in 32bit fixed point parts represented as\n    // uint8 rgba components. Decomposition uses the fractional part after multiplying\n    // by a power of 256 (this removes the bits that are represented in the previous\n    // component) and then converts the fractional part to 8bits.\n    vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);\n\n    // Convert uint8 values (from 0 to 255) to floating point representation for\n    // the shader\n    const float toU8AsFloat = 1.0 / 255.0;\n\n    return fixedPointU8 * toU8AsFloat;\n  }\n\n  void main() {\n    vec3 val = dpAdd(u_highA, u_lowA, -u_highB, -u_lowB);\n\n    v_color = float2rgba(val.z / 25.0);\n\n    gl_Position = vec4(a_pos * 2.0 - 1.0, 0.0, 1.0);\n  }\n  ",c=new o.Program(e,a,"\n  precision highp float;\n\n  varying vec4 v_color;\n\n  void main() {\n    gl_FragColor = v_color;\n  }\n  ",{a_pos:0}),s=new Float32Array(6);i.encodeDoubleArray(t,s,3);var u=new Float32Array(6);return i.encodeDoubleArray(r,u,3),e.bindProgram(c),c.setUniform3f("u_highA",s[0],s[2],s[4]),c.setUniform3f("u_lowA",s[1],s[3],s[5]),c.setUniform3f("u_highB",u[0],u[2],u[4]),c.setUniform3f("u_lowB",u[1],u[3],u[5]),c}(u,l),f=e.getBoundFramebufferObject(),d=e.getViewport(),h=d.x,p=d.y,b=d.width,A=d.height;e.bindFramebuffer(t),e.setViewport(0,0,1,1),e.bindVAO(s),e.drawArrays(5,0,4);var _=new Uint8Array(4);t.readPixels(0,0,1,1,6408,5121,_),v.dispose(),s.dispose(!1),c.dispose(),t.dispose(),e.setViewport(h,p,b,A),e.bindFramebuffer(f);var m=(u[2]-l[2])/25,g=a.unpackFloatRGBA(_);return Math.abs(m-g)}n.testWebGLDriver=function(e){return(t.isNone(s)||s.context!==e)&&(s=new c(e)),s},n.clearTestWebGLDriver=function(e){t.isSome(s)&&s.context===e&&(s=null)}}));