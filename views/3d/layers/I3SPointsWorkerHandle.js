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

define(["require","exports","tslib","../support/WorkerHandle"],(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.I3SPointsWorkerHandle=void 0;var o=function(e){function r(r){return e.call(this,"SceneLayerWorker","dracoDecompressPointCloudData",r)||this}return t.__extends(r,e),r.prototype.getTransferList=function(e){return[e.geometryBuffer]},r}(n.WorkerHandle);r.I3SPointsWorkerHandle=o}));