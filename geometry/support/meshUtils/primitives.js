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

define(["require","exports","../../../core/libs/gl-matrix-2/mat3f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","./georeference"],(function(r,e,a,n,t,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.boxFaceOrder=e.convertUnitGeometry=e.createUnitSizePlane=e.createUnitSizeCylinder=e.createUnitSizeSphere=e.createUnitSizeBox=void 0,e.createUnitSizeBox=function(){for(var r=s.faceDescriptions,e=s.faceVertexOffsets,a=s.uvScales,n=4*r.length,t=new Float64Array(3*n),o=new Float32Array(3*n),i=new Float32Array(2*n),c=new Uint32Array(2*r.length*3),l=0,f=0,v=0,u=0,h=0;h<r.length;h++){for(var p=r[h],g=l/3,w=0,m=e;w<m.length;w++){var x=m[w];c[u++]=g+x}for(var y=p.corners,d=0;d<4;d++){var A=y[d],M=0;i[v++]=.25*a[d][0]+p.uvOrigin[0],i[v++]=p.uvOrigin[1]-.25*a[d][1];for(var O=0;O<3;O++)0!==p.axis[O]?(t[l++]=.5*p.axis[O],o[f++]=p.axis[O]):(t[l++]=.5*A[M++],o[f++]=0)}}return{position:t,normal:o,uv:i,faces:c}},e.createUnitSizeSphere=function(r){void 0===r&&(r=0);for(var e=Math.round(8*Math.pow(2,r)),a=2*e,n=(e-1)*(a+1)+2*a,t=new Float64Array(3*n),o=new Float32Array(3*n),i=new Float32Array(2*n),s=new Uint32Array(3*((e-1)*a*2)),l=0,f=0,v=0,u=0,h=0;h<=e;h++){var p=h/e*Math.PI+.5*Math.PI,g=Math.cos(p),w=Math.sin(p);c[2]=w;for(var m=0===h||h===e,x=m?a-1:a,y=0;y<=x;y++){var d=y/x*2*Math.PI;c[0]=-Math.sin(d)*g,c[1]=Math.cos(d)*g;for(var A=0;A<3;A++)t[l]=.5*c[A],o[l]=c[A],++l;i[f++]=(y+(m?.5:0))/a,i[f++]=h/e,0!==h&&y!==a&&(h!==e&&(s[v++]=u,s[v++]=u+1,s[v++]=u-a),1!==h&&(s[v++]=u,s[v++]=u-a,s[v++]=u-a-1)),u++}}return{position:t,normal:o,uv:i,faces:s}},e.createUnitSizeCylinder=function(r){void 0===r&&(r=0);for(var e=Math.round(16*Math.pow(2,r)),a=4*(e+1)+2*e,n=new Float64Array(3*a),t=new Float32Array(3*a),o=new Float32Array(2*a),i=new Uint32Array(3*(4*e)),s=0,l=0,f=0,v=0,u=0,h=0;h<=5;h++)for(var p=0===h||5===h,g=h<=1||h>=4,w=2===h||4===h,m=p?e-1:e,x=0;x<=m;x++){var y=x/m*2*Math.PI,d=p?0:.5;c[0]=d*Math.sin(y),c[1]=d*-Math.cos(y),c[2]=h<=2?.5:-.5;for(var A=0;A<3;A++)n[s++]=c[A],t[l++]=g?2===A?h<=1?1:-1:0:2===A?0:c[A]/d;o[f++]=(x+(p?.5:0))/e,o[f++]=h<=1?1*h/3:h<=3?1*(h-2)/3+1/3:1*(h-4)/3+2/3,w||0===h||x===e||(5!==h&&(i[v++]=u,i[v++]=u+1,i[v++]=u-e),1!==h&&(i[v++]=u,i[v++]=u-e,i[v++]=u-e-1)),u++}return{position:n,normal:t,uv:o,faces:i}},e.createUnitSizePlane=function(r){for(var e=i.facingAxisOrderSwap[r],a=i.position,n=i.normal,t=new Float64Array(a.length),o=new Float32Array(n.length),s=0,c=0;c<4;c++)for(var l=s,f=0;f<3;f++){var v=e[f],u=Math.abs(v)-1,h=v>=0?1:-1;t[s]=a[l+u]*h,o[s]=n[l+u]*h,s++}return{position:t,normal:o,uv:new Float32Array(i.uv),faces:new Uint32Array(i.faces)}};var i={position:[-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],normal:[0,0,1,0,0,1,0,0,1,0,0,1],uv:[0,1,1,1,1,0,0,0],faces:[0,1,2,0,2,3],facingAxisOrderSwap:{east:[3,1,2],west:[-3,-1,2],north:[-1,3,2],south:[1,-3,2],up:[1,2,3],down:[1,-2,-3]}};e.convertUnitGeometry=function(r,e,a){!function(r){for(var e=0;e<r.position.length;e+=3)r.position[e+2]+=.5}(r),function(r,e){if(null==e)return;var a="number"==typeof e?[e,e,e]:[null!=e.width?e.width:1,null!=e.depth?e.depth:1,null!=e.height?e.height:1];l[0]=a[0],l[4]=a[1],l[8]=a[2];for(var t=0;t<r.position.length;t+=3){for(var o=0;o<3;o++)c[o]=r.position[t+o];n.vec3.transformMat3(c,c,l);for(o=0;o<3;o++)r.position[t+o]=c[o]}if(a[0]!==a[1]||a[1]!==a[2]){l[0]=1/a[0],l[4]=1/a[1],l[8]=1/a[2];for(t=0;t<r.normal.length;t+=3){for(o=0;o<3;o++)c[o]=r.normal[t+o];n.vec3.transformMat3(c,c,l),n.vec3.normalize(c,c);for(o=0;o<3;o++)r.normal[t+o]=c[o]}}}(r,a&&a.size);var t=o.georeference(r,e,a);return{vertexAttributes:{position:t.position,normal:t.normal,uv:r.uv},components:[{faces:r.faces,material:a&&a.material||null}],spatialReference:e.spatialReference}};var s={faceDescriptions:[{axis:[0,-1,0],uvOrigin:[0,.625],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[1,0,0],uvOrigin:[.25,.625],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[0,1,0],uvOrigin:[.5,.625],corners:[[1,-1],[-1,-1],[-1,1],[1,1]]},{axis:[-1,0,0],uvOrigin:[.75,.625],corners:[[1,-1],[-1,-1],[-1,1],[1,1]]},{axis:[0,0,1],uvOrigin:[0,.375],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[0,0,-1],uvOrigin:[0,.875],corners:[[-1,1],[1,1],[1,-1],[-1,-1]]}],uvScales:[[0,0],[1,0],[1,1],[0,1]],faceVertexOffsets:[0,1,2,0,2,3]};e.boxFaceOrder={south:0,east:1,north:2,west:3,up:4,down:5};var c=t.vec3f64.create(),l=a.mat3f64.create()}));