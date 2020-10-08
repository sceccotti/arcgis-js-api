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

define(["require","exports","tslib","../../../core/maybe","../../../core/promiseUtils","../../../core/typedArrayUtil","../../../libs/i3s/I3SWorker"],(function(e,t,r,n,o,i,s){"use strict";var a,f;function u(e){for(var t=e.modifications,r=f._malloc(8*t.length),n=new Float64Array(f.HEAPU8.buffer,r,t.length),o=0;o<t.length;++o)n[o]=t[o];f.setModifications(e.context,r,t.length,e.isGeodetic),f._free(r)}function c(e,t){if(!f)return null;var r=e.context,o=e.localOrigin,s=e.globalTrafo,a=e.mbs,u=e.obb,c=e.elevationOffset,l=e.geometryBuffer,d=e.geometryDescriptor,y=e.indexToVertexProjector,h=e.vertexToRenderProjector,m=f._malloc(l.byteLength),_=f._malloc(33*Float64Array.BYTES_PER_ELEMENT),g=new Uint8Array(f.HEAPU8.buffer,m,l.byteLength);g.set(new Uint8Array(l));var E=new Float64Array(f.HEAPU8.buffer,_,33);b(E,o);var p=E.byteOffset+3*E.BYTES_PER_ELEMENT,v=new Float64Array(E.buffer,p);b(v,s),p+=16*E.BYTES_PER_ELEMENT,b(v=new Float64Array(E.buffer,p),a),p+=4*E.BYTES_PER_ELEMENT,n.isSome(u)&&(b(v=new Float64Array(E.buffer,p),u.center),p+=3*E.BYTES_PER_ELEMENT,b(v=new Float64Array(E.buffer,p),u.halfSize),p+=3*E.BYTES_PER_ELEMENT,b(v=new Float64Array(E.buffer,p),u.quaternion));var w=d,A={isDraco:!1,isLegacy:!1,color:e.layouts.some((function(e){return e.some((function(e){return"color"===e.name}))})),normal:e.needNormals&&e.layouts.some((function(e){return e.some((function(e){return"normalCompressed"===e.name}))})),uv0:e.layouts.some((function(e){return e.some((function(e){return"uv0"===e.name}))})),uvRegion:e.layouts.some((function(e){return e.some((function(e){return"uvRegion"===e.name}))})),featureIndex:w.featureIndex},L=f.process(r,!!e.obb,m,g.byteLength,w,A,_,c,y,h,e.normalReferenceFrame);if(f._free(_),f._free(m),L.error.length>0)throw"i3s.wasm: "+L.error;if(L.discarded)return null;var M=L.componentOffsets.length>0?i.slice(L.componentOffsets):null,S=L.featureIds.length>0?i.slice(L.featureIds):null,T=i.slice(L.interleavedVertedData).buffer,O=1===L.indicesType?i.slice(new Uint16Array(L.indices.buffer,L.indices.byteOffset,L.indices.byteLength/2)):i.slice(new Uint32Array(L.indices.buffer,L.indices.byteOffset,L.indices.byteLength/4)),P=i.slice(L.positions),F=1===L.positionIndicesType?i.slice(new Uint16Array(L.positionIndices.buffer,L.positionIndices.byteOffset,L.positionIndices.byteLength/2)):i.slice(new Uint32Array(L.positionIndices.buffer,L.positionIndices.byteOffset,L.positionIndices.byteLength/4)),I={layout:e.layouts[0],interleavedVertexData:T,indices:O,hasColors:L.hasColors,hasModifications:L.hasModifications,positionData:{data:P,indices:F}};return S&&t.push(S.buffer),M&&t.push(M.buffer),t.push(T),t.push(O.buffer),t.push(P.buffer),t.push(F.buffer),{componentOffsets:M,featureIds:S,transformedGeometry:I,obb:L.obb}}function l(e){var t=e.context,r=e.buffer,n=f._malloc(r.byteLength),o=r.byteLength/Float64Array.BYTES_PER_ELEMENT,i=new Float64Array(f.HEAPU8.buffer,n,o),s=new Float64Array(r);i.set(s),f.filterOBBs(t,n,o),s.set(i),f._free(n)}function d(e){f&&f.destroy(e)}function b(e,t){for(var r=0;r<t.length;++r)e[r]=t[r]}function y(){return f?o.resolve():(a||(a=s.getWorkerModule().then((function(e){f=e,a=null}))),a)}Object.defineProperty(t,"__esModule",{value:!0}),t.test=t.ensureWASM=t.filterObbsForModificationsSync=t.interpretObbModificationResults=t.setModificationsSync=t.destroyContext=t.setLegacySchema=t.setModifications=t.filterObbsForModifications=t.dracoDecompressPointCloudData=t.process=void 0,t.process=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,y()];case 1:return r.sent(),t=[e.geometryBuffer],[2,{result:c(e,t),transferList:t}]}}))}))},t.dracoDecompressPointCloudData=function(e){var t;return r.__awaiter(this,void 0,void 0,(function(){var n,o,s,a,u,c,l,d;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,y()];case 1:if(r.sent(),n=[e.geometryBuffer],o=e.geometryBuffer,s=o.byteLength,a=f._malloc(s),(u=new Uint8Array(f.HEAPU8.buffer,a,s)).set(new Uint8Array(o)),c=f.dracoDecompressPointCloudData(a,u.byteLength),f._free(a),c.error.length>0)throw"i3s.wasm: "+c.error;return l=(null===(t=c.featureIds)||void 0===t?void 0:t.length)>0?i.slice(c.featureIds):null,d=i.slice(c.positions),l&&n.push(l.buffer),n.push(d.buffer),[2,{result:{positions:d,featureIds:l},transferList:n}]}}))}))},t.filterObbsForModifications=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,y()];case 1:return r.sent(),l(e),[2,{result:t={buffer:e.buffer},transferList:[t.buffer]}]}}))}))},t.setModifications=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){switch(t.label){case 0:return[4,y()];case 1:return t.sent(),u(e),[2]}}))}))},t.setLegacySchema=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){switch(t.label){case 0:return[4,y()];case 1:return t.sent(),f.setLegacySchema(e.context,e.jsonSchema),[2]}}))}))},t.destroyContext=function(e){d(e)},t.setModificationsSync=u,t.interpretObbModificationResults=function(e){return 0===e?0:1===e?1:2===e?2:3},t.filterObbsForModificationsSync=l,t.ensureWASM=y,t.test={transform:c,destroy:d}}));