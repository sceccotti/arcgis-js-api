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

define(["require","exports","tslib","../../../../core/Error","../../../../core/Logger","../../../../core/mathUtils","../../../../core/screenUtils","../../../webgl","./color","./enums","./SymbolProperties"],(function(e,r,t,n,a,o,i,_,s,E,u){"use strict";var c;Object.defineProperty(r,"__esModule",{value:!0}),r.createProgramDescriptor=r.getPixelArrayCtor=r.getPixelBytes=r.getBytes=r.geometryToMappedGeometry=r.createTextureFromTexelData=r.createGeometryData=r.C_VBO_INFO=r.copyMeshData=r.getTransformParams=r.getVVType=r.getJoinType=r.getCapType=r.isNumber=r.isDefined=r.getTextProperties=r.allocateTypedArrayBufferwithData=r.allocateTypedArrayBuffer=r.strideToPackingFactor=r.getNamedBuffers=r.getStrides=r.C_LABEL_STRIDE_SPEC=r.C_TEXT_STRIDE_SPEC=r.C_LINE_STRIDE_SPEC=r.C_FILL_STRIDE_SPEC_DD=r.C_FILL_STRIDE_SPEC=r.C_ICON_STRIDE_SPEC=r.C_LABEL_VERTEX_DEF=r.C_TEXT_VERTEX_DEF=r.C_LINE_VERTEX_DEF=r.C_FILL_VERTEX_DEF_DD=r.C_FILL_VERTEX_DEF=r.C_ICON_VERTEX_DEF=r.C_VBO_PERINSTANCE_VV=r.C_VBO_PERINSTANCE=r.C_VBO_GEOMETRY=void 0;var T=a.getLogger("esri.views.2d.engine.webgl.Utils");function C(e){for(var r={},t=0,n=e;t<n.length;t++){var a=n[t];r[a.name]=a.strideInBytes}return r}r.C_VBO_GEOMETRY="geometry",r.C_VBO_PERINSTANCE="per_instance",r.C_VBO_PERINSTANCE_VV="per_instance_vv",r.C_ICON_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:32,divisor:0}],r.C_FILL_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:32,divisor:0}],r.C_FILL_VERTEX_DEF_DD=[{name:r.C_VBO_GEOMETRY,strideInBytes:12,divisor:0}],r.C_LINE_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:36,divisor:0}],r.C_TEXT_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:32,divisor:0}],r.C_LABEL_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:36,divisor:0}],r.C_ICON_STRIDE_SPEC=C(r.C_ICON_VERTEX_DEF),r.C_FILL_STRIDE_SPEC=C(r.C_FILL_VERTEX_DEF),r.C_FILL_STRIDE_SPEC_DD=C(r.C_FILL_VERTEX_DEF_DD),r.C_LINE_STRIDE_SPEC=C(r.C_LINE_VERTEX_DEF),r.C_TEXT_STRIDE_SPEC=C(r.C_TEXT_VERTEX_DEF),r.C_LABEL_STRIDE_SPEC=C(r.C_LABEL_VERTEX_DEF),r.getStrides=function(e,t){switch(e){case E.WGLGeometryType.MARKER:return r.C_ICON_STRIDE_SPEC;case E.WGLGeometryType.FILL:return t?r.C_FILL_STRIDE_SPEC_DD:r.C_FILL_STRIDE_SPEC;case E.WGLGeometryType.LINE:return r.C_LINE_STRIDE_SPEC;case E.WGLGeometryType.TEXT:return r.C_TEXT_STRIDE_SPEC;case E.WGLGeometryType.LABEL:return r.C_LABEL_STRIDE_SPEC}};var f=[r.C_VBO_GEOMETRY],y=[r.C_VBO_GEOMETRY],l=[r.C_VBO_GEOMETRY],p=[r.C_VBO_GEOMETRY],d=[r.C_VBO_GEOMETRY];function L(e){switch(e){case E.WGLGeometryType.MARKER:return f;case E.WGLGeometryType.FILL:return y;case E.WGLGeometryType.LINE:return l;case E.WGLGeometryType.TEXT:return p;case E.WGLGeometryType.LABEL:return d}}function m(e){switch(e%4){case 0:case 2:return 4;case 1:case 3:return 1}}function I(e){switch(e){case 5120:case 5121:return 1;case 5122:case 5123:return 2;case 5126:case 5124:case 5125:return 4}}r.getNamedBuffers=L,r.strideToPackingFactor=m,r.allocateTypedArrayBuffer=function(e,r){switch(r%4){case 0:case 2:return new Uint32Array(Math.floor(e*r/4));case 1:case 3:return new Uint8Array(e*r)}},r.allocateTypedArrayBufferwithData=function(e,r){switch(r%4){case 0:case 2:return new Uint32Array(e);case 1:case 3:return new Uint8Array(e)}},r.getTextProperties=function(e){return u.TextProperties.pool.acquire(e.color?s.copyAndPremultiply(e.color):[255,255,255,255],e.haloColor?s.copyAndPremultiply(e.haloColor):[255,255,255,255],i.pt2px(e.haloSize),i.pt2px(e.font.size),e.angle*Math.PI/180,e.xoffset/e.font.size,e.yoffset/e.font.size,"left"===e.horizontalAlignment?0:"right"===e.horizontalAlignment?1:.5,"top"===e.verticalAlignment?0:"bottom"===e.verticalAlignment?1:.5)},r.isDefined=function(e){return null!=e},r.isNumber=function(e){return"number"==typeof e},r.getCapType=function(e,r){switch(e){case"butt":return 0;case"round":return r?2:1;case"square":return 2;default:return T.error(new n("mapview-invalid-type","Cap type "+e+" is not a valid option. Defaulting to round")),1}},r.getJoinType=function(e){switch(e){case"miter":return 2;case"bevel":return 0;case"round":return 1;default:return T.error(new n("mapview-invalid-type","Join type "+e+" is not a valid option. Defaulting to round")),1}},r.getVVType=function(e){switch(e){case"opacity":return E.VVType.OPACITY;case"color":return E.VVType.COLOR;case"rotation":return E.VVType.ROTATION;case"size":return E.VVType.SIZE;default:return T.error("Cannot interpret unknown vv: "+e),null}},r.getTransformParams=function(e){return{transform:e.transform,hasZ:e.hasZ,hasM:e.hasM}},r.copyMeshData=function(e,r,t,n,a,o,i){for(var _ in o)for(var s=o[_].stride,E=m(s),u=o[_].data,c=t[_].data,T=s*a.vertexCount/E,C=s*e/E,f=s*a.vertexFrom/E,y=0;y<T;++y)c[y+C]=u[y+f];var l=a.indexCount;for(y=0;y<l;++y)n[y+r]=i[y+a.indexFrom]-a.vertexFrom+e},r.C_VBO_INFO=((c={})[r.C_VBO_GEOMETRY]=35044,c),r.createGeometryData=function(e,r){for(var t=[],n=0;n<5;++n){for(var a={},o=0,i=L(n);o<i.length;o++){var _=i[o];a[_]={data:r(n,_)}}t.push({data:e(n),buffers:a})}return t},r.createTextureFromTexelData=function(e,r){var t,n;return o.isPowerOfTwo(r.width)&&o.isPowerOfTwo(r.height)?(t=!0,n=9987):(t=!1,n=9729),new _.Texture(e,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,hasMipmap:t,samplingMode:n,wrapMode:33071,flipped:!0},r)},r.geometryToMappedGeometry=function(e){return{vertexFrom:void 0,vertexTo:void 0,geometry:e}},r.getBytes=I,r.getPixelBytes=function(e){switch(e){case 5121:return 1;case 32819:return 2;case 5126:return 4;default:return void T.error(new n("webgl-utils","Unable to handle type "+e))}},r.getPixelArrayCtor=function(e){switch(e){case 5121:return Uint8Array;case 32819:return Uint16Array;case 5126:return Float32Array;default:return void T.error(new n("webgl-utils","Unable to handle type "+e))}};var D=new Map;r.createProgramDescriptor=function(e,r){if(!D.has(e)){var n=function(e){var r={},n=function(n){var a=e[n],o=0;r[n]=a.map((function(e){var r=t.__assign(t.__assign({},e),{normalized:e.normalized||!1,divisor:e.divisor||0,offset:o,stride:0});return o+=e.count*I(e.type),r})),r[n].forEach((function(e){return e.stride=o}))};for(var a in e)n(a);return r}(r),a={strides:function(e){var r={};for(var t in e){var n=e[t];r[t]=n.length?n[0].stride:0}return r}(n),bufferLayouts:n,attributes:function(e){var r={};for(var t in e)for(var n=0,a=e[t];n<a.length;n++){var o=a[n];r[o.name]=o.location}return r}(r)};D.set(e,a)}return D.get(e)}}));