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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","../../../../core/has","./FreeList","./Utils"],(function(e,t,r,i,o){Object.defineProperty(t,"__esModule",{value:!0});var n=["FILL","LINE","MARKER","TEXT","LABEL"];var s=function(){function e(e,t,r,n){for(var s in this._strides=e,this._displayList=t,this._freeListsAndStorage={},this._dirtyMap=null,this._dirtyMap=r,e)for(var a in this._freeListsAndStorage[s]={vtxFreeList:n?new i.FreeList(n):null,idxFreeList:n?new i.FreeList(n):null,vertexBuffers:{},indexBuffer:n?new Uint32Array(n):null},e[s])this._freeListsAndStorage[s].vertexBuffers[a]={data:n?o.allocateTypedArrayBuffer(n,e[s][a]):null,stride:e[s][a]}}return e.fromTileData=function(t,r){var s=function(e){for(var t=e.getStrides(),r={},i=0;i<t.length;i++)r[n[i]]=t[i];return r}(t),a=[0,0,0,0,0],d=[0,0,0,0,0],u=[];t.tileDisplayData.displayObjectRegistry.forEach((function(e){u.push(e)}));for(var f=0,v=u;f<v.length;f++)for(var x=0,l=v[f].displayRecords;x<l.length;x++){var F=l[x];a[F.geometryType]=Math.max(a[F.geometryType],F.vertexFrom+F.vertexCount),d[F.geometryType]=Math.max(d[F.geometryType],F.indexFrom+F.indexCount)}for(var c=new e(s,t.tileDisplayData.displayList,r,null),h=0;h<t.tileBufferData.geometries.length;++h){var m=a[h],y=d[h],p=t.tileBufferData.geometries[h],_=n[h],g=c._storageFor(_),C=t.tileBufferData.geometries[h].indexBuffer;g.indexBuffer=C,g.idxFreeList=new i.FreeList(C.length),g.idxFreeList.allocate(y);var L=void 0;for(var B in p.vertexBuffer){var D=t.tileBufferData.geometries[h].vertexBuffer[B];g.vertexBuffers[B].data=D.data,g.vertexBuffers[B].stride=D.stride;var T=o.strideToPackingFactor(D.stride),M=D.data.length*T/D.stride;L||(L=M)}g.vtxFreeList=new i.FreeList(L),g.vtxFreeList.allocate(m)}return c},e.prototype.delete=function(e){var t=n[e.geometryType];this._freeVertices(t,e.vertexFrom,e.vertexCount),this._freeIndices(t,e.indexFrom,e.indexCount),this._displayList.removeFromList(e),e.vertexFrom=void 0,e.indexFrom=void 0},e.prototype.setMeshData=function(e,t,r,i,s){var a=n[e.geometryType];e.meshData=null;var d=void 0,u=void 0;void 0===e.vertexFrom?(u=t.vertexCount,d=this._allocateVertices(a,u)):t.vertexCount>e.vertexCount?(this._freeVertices(a,e.vertexFrom,e.vertexCount),u=t.vertexCount,d=this._allocateVertices(a,u)):t.vertexCount===e.vertexCount?(d=e.vertexFrom,u=e.vertexCount):(this._freeVertices(a,e.vertexFrom+t.vertexCount,e.vertexCount-t.vertexCount),d=e.vertexFrom,u=t.vertexCount);var f=!0,v=void 0,x=void 0,l=void 0;if(void 0===e.indexFrom?(v=s,l=t.indexCount,x=this._allocateIndices(a,l)):t.indexCount>e.indexCount?(v=this._displayList.removeFromList(e),this._freeIndices(a,e.indexFrom,e.indexCount),l=t.indexCount,x=this._allocateIndices(a,l)):t.indexCount===e.indexCount?(f=!1,x=e.indexFrom,l=e.indexCount):(v=this._displayList.removeFromList(e),this._freeIndices(a,e.indexFrom+t.indexCount,e.indexCount-t.indexCount),x=e.indexFrom,l=t.indexCount),-1!==d&&-1!==x){var F=this._storageFor(a);if(o.copyMeshData(d,x,F.vertexBuffers,F.indexBuffer,t,r,i),e.vertexFrom=d,e.indexFrom=x,e.vertexCount=t.vertexCount,e.indexCount=t.indexCount,this._dirtyMap)for(var c in this._dirtyMap.markDirtyIndices(e.geometryType,e.indexFrom,e.indexCount),r)this._dirtyMap.markDirtyVertices(e.geometryType,c,e.vertexFrom,e.vertexCount);return f&&this._displayList.addToList(e,v),!0}return-1!==d&&this._freeVertices(a,d,u),-1!==x&&this._freeIndices(a,x,l),e.setMeshDataFromBuffers(t,r,i),e.vertexFrom=void 0,e.vertexCount=0,e.indexFrom=void 0,e.indexCount=0,!1},e.prototype._allocateVertices=function(e,t){var r=this._storageFor(e),i=r.vtxFreeList.allocate(t);return-1===i?-1:r.vtxFreeList.fragmentation>.5?-1:i},e.prototype._freeVertices=function(e,t,i){var n=this._storageFor(e);if(n.vtxFreeList.free(t,i),r("esri-feature-tiles-debug"))for(var s in n.vertexBuffers)for(var a=n.vertexBuffers[s].data,d=this._stridesFor(e,s),u=o.strideToPackingFactor(d),f=t*d/u,v=i*d/u,x=f;x<f+v;++x)a[x]=0},e.prototype._freeIndices=function(e,t,i){var o=this._storageFor(e);if(o.idxFreeList.free(t,i),r("esri-feature-tiles-debug"))for(var n=o.indexBuffer,s=t;s<t+i;++s)n[s]=0},e.prototype._allocateIndices=function(e,t){var r=this._storageFor(e),i=r.idxFreeList.allocate(t);return-1===i?-1:r.idxFreeList.fragmentation>.5?-1:i},e.prototype._storageFor=function(e){return this._freeListsAndStorage[e]},e.prototype._stridesFor=function(e,t){return this._strides[e][t]},e}();t.default=s}));