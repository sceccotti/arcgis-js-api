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

define(["require","exports"],(function(a,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getTetrahedronShapes=e.getDiamondShapes=e.getInvertedConeShapes=e.getConeShapes=e.getCylinderShapes=e.getCubeShapes=e.getWaterSymbolShapes=e.getExtrudeSymbolShapes=e.getPathSymbolShapes=e.shapes=void 0,e.shapes={fill:[{type:"path",path:"M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z"}],pathSymbol3DLayer:[{type:"path",path:"M 3,12 L 12,0 L 11,-2 L -4,5 L -1,5 L 1,7 L 3,10 L 3,12 Z"},{type:"circle",cx:-2,cy:10,r:5}],extrudeSymbol3DLayer:[{type:"path",path:"M -7,-5 L -2,0 L -2,7 L -7,3 L -7,-5 Z"},{type:"path",path:"M -2,0 L -2,7 L 10,-3 L 10,-10 L -2,0 Z"},{type:"path",path:"M -7,-5 L -2,0 L 10,-10 L -2,-10 L -7,-5 Z"}],cone:[{type:"path",path:"M 0,-10 L -8,5 L -4,6.5 L 0,7 L 4,6.5 L 8,5 Z"}],tallCone:[{type:"path",path:"M 0,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 0,-9 Z"}],invertedCone:[{type:"path",path:"M 0,7 L -8,-8 L 8,-8 Z"},{type:"path",path:"M -8,-8 L -4,-9.5 L 0,-10 L 4,-9.5 L 8,-8 L 4,-6.5 L 0,-6 L -4,-6.5 Z"}],cube:[{type:"path",path:"M -10,-7 L 0,-12 L 10,-7 L 0,-2 L -10,-7 Z"},{type:"path",path:"M -10,-7 L 0,-2 L 0,12 L -10,7 L -10,-7 Z"},{type:"path",path:"M 0,-2 L 10,-7 L 10,7 L 0,12 L 0,-2 Z"}],tallCube:[{type:"path",path:"M -3.5,-8.5 L 0,-9.5 L 3.5,-8.5 L 0,-7.5 L -3.5,-8.5 Z"},{type:"path",path:"M -3.5,-8.5 L 0,-7.5 L 0,9 L -3.5,8 L -3.5,-8.5 Z"},{type:"path",path:"M 0,-7.5 L 3.5,-8.5 L 3.5,8 L 0,9 L 0,-7.5 Z"}],cylinder:[{type:"path",path:"M -8,-9 L -8,7 L -4,8.5 L 0,9 L 4,8.5 L 8,7 L 8,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:8,ry:2}],tallCylinder:[{type:"path",path:"M -3.5,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 3.5,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:3.5,ry:1}],diamond:[{type:"path",path:"M 0,-10 L 10,-1 L -1,1 L 0,-10 Z"},{type:"path",path:"M 0,-10 L -1,1 L -8,-1 L 0,-10 Z"},{type:"path",path:"M -1,1 L 0,10 L -8,-1 L -1,1 Z"},{type:"path",path:"M -1,0 L 0,10 L 10,-1 L -1,1 Z"}],tetrahedron:[{type:"path",path:"M 0,-10 L 10,7 L 0,0 L 0,-10 Z"},{type:"path",path:"M 0,-10 L 0,0 L -8,7 L 0,-10 Z"},{type:"path",path:"M 10,7 L 0,0 L -8,7 L 10,7 Z"}]},e.getPathSymbolShapes=function(a){var e=22,t=22;return a<1?e*=.75:a>1&&(t*=1.25),[{type:"path",path:[{command:"M",values:[22,0]},{command:"L",values:[19.25,0]},{command:"L",values:[0,t-11]},{command:"L",values:[e-11,t-11]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[22,0]},{command:"L",values:[22,2.75]},{command:"L",values:[e-11,22]},{command:"L",values:[e-11,t-11]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[e-11,t-11]},{command:"L",values:[0,t-11]},{command:"L",values:[0,22]},{command:"L",values:[e-11,22]},{command:"Z",values:[]}]}]},e.getExtrudeSymbolShapes=function(a){var e=.5*a;return[{type:"path",path:[{command:"M",values:[0,22*.7*.5]},{command:"L",values:[6.6,22*.7]},{command:"L",values:[6.6,22*.7+e]},{command:"L",values:[0,22*.7+e-22*.7*.5]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[6.6,22*.7]},{command:"L",values:[6.6,22*.7+e]},{command:"L",values:[22,e]},{command:"L",values:[22,0]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[6.6,0]},{command:"L",values:[22,0]},{command:"L",values:[6.6,22*.7]},{command:"L",values:[0,22*.7*.5]},{command:"Z",values:[]}]}]},e.getWaterSymbolShapes=function(){return[{type:"path",path:"M80,80.2v-27c-1.5,0.7-2.8,1.6-3.9,2.8c-1.8,2.1-4.4,3.3-7.1,3.5c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.4,3.6c-1.8,2.1-4.4,3.3-7.2,3.4C8.3,59.3,5.7,58,3.9,56c-1.1-1.2-2.4-2.1-3.9-2.8v27"},{type:"path",path:"M11,59.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.4-3.6s5.1,1.3,7.4,3.6c1.8,2,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.3-3.6s5.1,1.3,7.4,3.6c1.8,2.1,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c1.1-1.2,2.4-2.1,3.9-2.8v-24c-1.5,0.7-2.8,1.6-3.9,2.8c-1.8,2.1-4.4,3.3-7.1,3.5c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.7-0.1-5.3-1.4-7.1-3.4c-2.2-2.3-4.7-3.6-7.4-3.6s-5.1,1.3-7.4,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.7-0.1-5.3-1.4-7.1-3.4c-1.1-1.2-2.4-2.1-3.9-2.8v24c1.5,0.7,2.8,1.6,3.9,2.8C5.7,58,8.3,59.3,11,59.4z"},{type:"path",path:"M11,35.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.4-3.6s5.1,1.3,7.4,3.6c1.8,2,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c2.2-2.3,4.7-3.6,7.3-3.6s5.1,1.3,7.4,3.6c1.8,2.1,4.4,3.3,7.2,3.4c2.7-0.1,5.3-1.4,7.1-3.4c1.1-1.2,2.4-2.1,3.9-2.8V3.6c-1.5,0.7-2.8,1.6-3.9,2.8c-2.2,2.1-4.6,3.4-7.1,3.4s-5-1.3-7.1-3.4s-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6S42.5,9.9,40,9.9s-5-1.3-7.1-3.4s-4.7-3.6-7.4-3.6s-5.1,1.3-7.3,3.6c-1.8,2.1-4.4,3.3-7.2,3.4c-2.5,0-5-1.3-7.1-3.4C2.8,5.3,1.4,4.3,0,3.6v25.6c1.5,0.7,2.8,1.6,3.9,2.8C5.7,34.1,8.3,35.3,11,35.4z"}]},e.getCubeShapes=function(a,e){var t=e?20:a,m=e?4:6,p=(t-=t<=22?.5*m:m,e?.35*t:.5*t);return[{type:"path",path:[{command:"M",values:[.5*t,0]},{command:"L",values:[t,.5*p]},{command:"L",values:[.5*t,p]},{command:"L",values:[0,.5*p]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,.5*p]},{command:"L",values:[.5*t,p]},{command:"L",values:[.5*t,a]},{command:"L",values:[0,a-.5*p]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.5*t,p]},{command:"L",values:[.5*t,a]},{command:"L",values:[t,a-.5*p]},{command:"L",values:[t,.5*p]},{command:"Z",values:[]}]}]},e.getCylinderShapes=function(a,e){var t=e?20:a,m=e?4:6,p=.5*(t-=t<=22?.5*m:m),c=.15*t,L=a-c;return[{type:"ellipse",cx:.5*t,cy:L,rx:p,ry:c},{type:"path",path:[{command:"M",values:[0,c]},{command:"L",values:[0,L]},{command:"L",values:[t,L]},{command:"L",values:[t,c]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*t,cy:c,rx:p,ry:c}]},e.getConeShapes=function(a,e){var t=e?20:a,m=e?4:6,p=.15*(t-=t<=22?.5*m:m),c=a-p;return[{type:"ellipse",cx:.5*t,cy:c,rx:.5*t,ry:p},{type:"path",path:[{command:"M",values:[.5*t,0]},{command:"L",values:[t,c]},{command:"L",values:[0,c]},{command:"Z",values:[]}]}]},e.getInvertedConeShapes=function(a){var e=a,t=.15*(e-=e<22?3:6);return[{type:"path",path:[{command:"M",values:[0,0]},{command:"L",values:[e,0]},{command:"L",values:[.5*e,a-t]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*e,cy:0,rx:.5*e,ry:t}]},e.getDiamondShapes=function(a){var e=a,t=a,m=e-=e<22?2:4,p=t,c=Math.floor(a/10)-1||1;return[{type:"path",path:[{command:"M",values:[.45*m,0]},{command:"L",values:[m,.5*p-c]},{command:"L",values:[.45*m-c,.5*p+c]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*m,0]},{command:"L",values:[.45*m-c,.5*p+c]},{command:"L",values:[0,.5*p-c]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,.5*p-c]},{command:"L",values:[.45*m-c,.5*p+c]},{command:"L",values:[.45*m,t]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*m,t]},{command:"L",values:[m,.5*p-c]},{command:"L",values:[.45*m-c,.5*p+c]},{command:"Z",values:[]}]}]},e.getTetrahedronShapes=function(a){var e=a;return[{type:"path",path:[{command:"M",values:[.45*a,0]},{command:"L",values:[a,e-=e<22?1:2]},{command:"L",values:[.45*a,.6*e]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*a,0]},{command:"L",values:[.45*a,.6*e]},{command:"L",values:[0,e]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,e]},{command:"L",values:[.45*a,.6*e]},{command:"L",values:[a,e]},{command:"Z",values:[]}]}]}}));