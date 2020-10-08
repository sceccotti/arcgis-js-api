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

define(["require","exports"],(function(e,o){"use strict";function r(e,o,r){for(var n=0;n<r;++n)o[2*n]=e[n],o[2*n+1]=e[n]-o[2*n]}Object.defineProperty(o,"__esModule",{value:!0}),o.encodeDoubleArraySplit=o.decodeDoubleArray=o.encodeDoubleArray=o.encodeDouble=void 0,o.encodeDouble=function(e,o){u[0]=e,u[1]=e-u[0],o[0]=u[0],o[1]=u[1]},o.encodeDoubleArray=r,o.decodeDoubleArray=function(e,o,r){for(var n=0;n<r;++n)o[n]=e[2*n]+e[2*n+1]},o.encodeDoubleArraySplit=function(e,o,a,c){for(var d=0;d<c;++d)n[0]=e[d],r(n,u,1),o[d]=u[0],a[d]=u[1]};var n=new Float64Array(1),u=new Float32Array(2)}));