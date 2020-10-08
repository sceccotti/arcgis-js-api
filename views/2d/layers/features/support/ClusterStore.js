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

define(["require","exports","tslib","../../../../../geometry","../../../../../core/Evented","../../../../../core/has","../../../../../core/maybe","../../../../../core/accessorSupport/diffUtils","../../../../../geohash/GeohashTree","../../../../../geohash/geohashUtils","../../../../../geometry/support/geodesicConstants","../../../../../geometry/support/spatialReferenceUtils","../../../../../layers/graphics/featureConversionUtils","../../../../../layers/graphics/OptimizedFeature","../../../../../layers/graphics/OptimizedGeometry","../../../../../layers/graphics/data/projectionSupport","../../../engine/webgl/definitions","../Store2D","./FeatureSetReaderJSON"],(function(e,t,r,s,a,i,o,n,u,h,l,c,g,d,p,f,_,y,v){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ClusterStore=void 0;var m=function(e){function t(t,r,s,a,i){var o=this,n=new p.default([],[r,s]);return(o=e.call(this,n,a,null,t)||this).geohashBoundsInfo=i,o}return r.__extends(t,e),Object.defineProperty(t.prototype,"count",{get:function(){return this.attributes.cluster_count},enumerable:!1,configurable:!0}),t.create=function(e,r,s,a,i,o,n,u){var h=new t(r,s,a,o,n);return h.displayId=e.createDisplayId(!0),h.referenceId=u,h.tileLevel=i,h},t.prototype.update=function(e,t,r,s,a,i){return this.geometry.coords[0]=e,this.geometry.coords[1]=t,this.tileLevel=r,this.attributes=s,this.geohashBoundsInfo=a,this.referenceId=null,this.referenceId=i,this},t.prototype.toJSON=function(){return{objectId:this.objectId,referenceId:1===this.attributes.cluster_count?this.referenceId:null,attributes:r.__assign(r.__assign({},this.attributes),{clusterId:this.objectId}),geometry:{x:this.geometry.coords[0],y:this.geometry.coords[1]}}},t}(d.default);function I(e){return 57.29577951308232*e}var b=function(e){function t(t,r,i){var o=e.call(this,t,i)||this;return o.events=new a,o._geohashLevel=0,o._aggregateValueRanges={},o._aggregateValueRangesChanged=!1,o._geohashBuf=[],o._clusters=new Map,o._tiles=new Map,o.geometryInfo=t.geometryInfo,o._spatialReference=r,o._projectionSupportCheck=f.checkProjectionSupport(r,s.SpatialReference.WGS84),o._bitsets.geohash=i.getBitset(i.createBitset()),o._bitsets.inserted=i.getBitset(i.createBitset()),o}return r.__extends(t,e),t.prototype.updateSchema=function(t,s){return r.__awaiter(this,void 0,void 0,(function(){var a,h;return r.__generator(this,(function(r){switch(r.label){case 0:return a=this._schema,[4,e.prototype.updateSchema.call(this,t,s)];case 1:return r.sent(),[4,this._projectionSupportCheck];case 2:return r.sent(),h=n.diff(a,s),t.mesh&&(t.targets.aggregate=!0),!s||o.isNone(h)&&!t.source&&!t.storage.filters?[2]:((n.hasDiff(h,"params.fields")||!this._tree||t.source)&&(this._tree=new u.GeohashTree(s.params.fields,this._statisticFields),this._rebuildTree(),i("esri-2d-update-debug")&&console.debug("Aggregate mesh needs update due to tree changing")),i("esri-2d-update-debug")&&console.debug("Applying Update - ClusterStore:",h),t.mesh=!0,t.targets[s.name]=!0,this._aggregateValueRanges={},[2])}}))}))},t.prototype.sweepFeatures=function(e,t){var r=this;this._bitsets.inserted.forEachSet((function(s){if(!e.has(s)){var a=t.lookupByDisplayIdUnsafe(s);r._remove(a)}}))},t.prototype.sweepClusters=function(e,t){var r=this;this._clusters.forEach((function(s,a){s&&s.tileLevel!==t&&(e.releaseDisplayId(s.displayId),r._clusters.delete(a))}))},t.prototype.onTileData=function(e,t,r,s,a,i){if(!this._schema||o.isNone(t.addOrUpdate))return t;for(var n=this._tree,u=this._getTransforms(e,this._spatialReference),h=t.addOrUpdate.getCursor();h.next();)this._update(h,a,n);if(!i)return t;var l=new Array,c=this._schema.params.clusterRadius;this._getClustersForTile(l,e,c,r,n,u),t.type="replace"===t.type?"replace":"update",t.addOrUpdate=v.FeatureSetReaderJSON.fromOptimizedFeatures(l,"esriGeometryPoint"),t.addOrUpdate._storage=r;for(h=t.addOrUpdate.getCursor();h.next();){var g=h.getDisplayId();this._bitsets.computed.unset(g),this.setComputedAttributes(r,h,g,e.scale)}return this._aggregateValueRangesChanged&&t.end&&(this.events.emit("valueRangesChanged",{valueRanges:this._aggregateValueRanges}),this._aggregateValueRangesChanged=!1),t},t.prototype.onTileUpdate=function(e){var t=this,r=e.added,s=e.removed;if(r.length){var a=r[0].level;this._setGeohashLevel(a)}if(this._schema){var i=this._schema.params.clusterRadius;s.forEach((function(e){t._tiles.delete(e.key.id),t._markTileClustersForDeletion(e,i)}))}},t.prototype.getAggregate=function(e){var t=null;return this._clusters.forEach((function(r){r&&r.displayId===e&&(t=r.toJSON())})),t},t.prototype.getDisplayId=function(e){var t=this._clusters.get(e);return t?t.displayId:null},t.prototype.getDisplayIdForReferenceId=function(e){var t;return this._clusters.forEach((function(r){r&&r.referenceId===e&&(t=r.displayId)})),t},t.prototype.getAggregateValueRanges=function(){return this._aggregateValueRanges},t.prototype._rebuildTree=function(){this._bitsets.computed.clear(),this._bitsets.inserted.clear(),this._tree&&this._tree.clear()},t.prototype._remove=function(e){var t=e.getDisplayId(),r=e.getXHydrate(),s=e.getYHydrate(),a=this._geohashBuf[2*t],i=this._geohashBuf[2*t+1];this._bitsets.inserted.has(t)&&(this._bitsets.inserted.unset(t),this._tree.removeCursor(e,r,s,a,i,this._geohashLevel))},t.prototype._update=function(e,t,r){var s=e.getDisplayId(),a=this._bitsets.inserted,i=t.isVisible(s);if(i!==a.has(s))if(i){var o=e.getXHydrate(),n=e.getYHydrate();if(this._setGeohash(s,o,n)){var u=this._geohashBuf[2*s],h=this._geohashBuf[2*s+1];r.insertCursor(e,s,o,n,u,h,this._geohashLevel),a.set(s)}}else this._remove(e)},t.prototype._setGeohash=function(e,t,r){if(this._bitsets.geohash.has(e))return!0;var a=this._geohashBuf;if(this._spatialReference.isWebMercator){var o=I(t/l.earthRadius),n=o-360*Math.floor((o+180)/360),u=I(Math.PI/2-2*Math.atan(Math.exp(-1*r/l.earthRadius)));h.setGeohashBuf(a,e,u,n,12)}else{var c={x:t,y:r},g=f.project(c,this._spatialReference,s.SpatialReference.WGS84);if(!g)return i("esri-2d-debug")&&console.debug("Tried to project feature geometry, but got back `null`"),!1;h.setGeohashBuf(a,e,g.y,g.x,12)}return this._bitsets.geohash.set(e),!0},t.prototype._getClustersForTile=function(e,t,s,a,i,n,u){void 0===u&&(u=!0);for(var h=this._schema.params.clusterPixelBuffer,l=2*s,c=this._getGeohashLevel(t.key.level),p=Math.pow(2,t.key.level)*Math.ceil(_.TILE_SIZE/l),f=Math.ceil(h/l)+0,y=Math.ceil(_.TILE_SIZE/l),v=t.key,m=v.row,I=v.col*_.TILE_SIZE,b=m*_.TILE_SIZE,R=Math.floor(I/l)-f,S=Math.floor(b/l)-f,C=R+y+2*f,L=S+y+2*f,M=t.tileInfoView.getLODInfoAt(t.key.level),T=R;T<=C;T++)for(var E=function(s){var h=T;M.wrap&&(h=T<0?T+p:T%p);var l=M.wrap&&T<0,f=M.wrap&&T%p!==T,_=x._lookupCluster(a,M,t.key.level,h,s,c,i);if(o.isSome(_)){var y=o.andThen(n,(function(e){return l?e.left:f?e.right:e.tile}));if(u&&o.isNone(y))return"continue";if(!_.count)return"continue";if(o.isSome(y)&&u){var v=_.geometry.clone(),m=_.attributes;v.coords[0]=g.quantizeX(y,v.coords[0]),v.coords[1]=g.quantizeY(y,v.coords[1]),1===_.count&&o.isSome(_.referenceId)&&(m=r.__assign(r.__assign({},_.attributes),{referenceId:_.referenceId}));var I=new d.default(v,m);I.displayId=_.displayId,e.push(I)}}},x=this,V=S;V<=L;V++)E(V)},t.prototype._getGeohashLevel=function(e){return Math.min(Math.ceil(e/2+2),12)},t.prototype._setGeohashLevel=function(e){var t=this._getGeohashLevel(e),r=1*(Math.floor(t/1)+1)-1;if(this._geohashLevel!==r)return this._geohashLevel=r,void this._rebuildTree()},t.prototype._getTransforms=function(e,t){var s={originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]},a=c.getInfo(t);if(!a)return{tile:s,left:null,right:null};var i=a.valid,o=i[0],n=i[1];return{tile:s,left:r.__assign(r.__assign({},s),{translate:[n,e.bounds[3]]}),right:r.__assign(r.__assign({},s),{translate:[o-n+e.bounds[0],e.bounds[3]]})}},t.prototype._getClusterId=function(e,t,r){return(15&e)<<28|(16383&t)<<14|16383&r},t.prototype._markForDeletion=function(e,t,r){var s=this._getClusterId(e,t,r);this._clusters.delete(s)},t.prototype._getClusterBounds=function(e,t,r){var s=this._schema.params.clusterRadius,a=2*s,i=r%2?t*a:t*a+s,o=r*a,n=i/_.TILE_SIZE,u=o/_.TILE_SIZE,h=(i+a)/_.TILE_SIZE,l=(o-a)/_.TILE_SIZE;return[e.getXForColumn(n),e.getYForRow(u),e.getXForColumn(h),e.getYForRow(l)]},t.prototype._lookupCluster=function(e,t,a,i,n,u,c){var g=this._getClusterId(a,i,n),d=this._clusters.get(g),p=this._getClusterBounds(t,i,n),_=p[0],y=p[1],v=p[2],b=p[3],R={x:_,y:y},S={x:v,y:b},C=0,L=0,M=0,T=0;if(this._spatialReference.isWebMercator){var E;C=(E=I(R.x/l.earthRadius))-360*Math.floor((E+180)/360),L=I(Math.PI/2-2*Math.atan(Math.exp(-1*R.y/l.earthRadius))),M=(E=I(S.x/l.earthRadius))-360*Math.floor((E+180)/360),T=I(Math.PI/2-2*Math.atan(Math.exp(-1*S.y/l.earthRadius)))}else{var x=f.project(R,this._spatialReference,s.SpatialReference.WGS84),V=f.project(S,this._spatialReference,s.SpatialReference.WGS84);if(!x||!V)return null;C=x.x,L=x.y,M=V.x,T=V.y}C>M&&(M=180);var w={geohashX:0,geohashY:0},k={geohashX:0,geohashY:0};h.setGeohashXY(w,L,C,u),h.setGeohashXY(k,T,M,u);var F=w.geohashX,G=w.geohashY,B=k.geohashX,D=k.geohashY,O={xLL:F,yLL:G,xTR:B,yTR:D,level:u},j=c.getRegionStatistics(F,G,B,D,u),U=j.count,X=j.xTotal,Y=j.yTotal,Z=j.referenceId,A=U?X/U:0,P=U?Y/U:0;if(0===U)return this._clusters.set(g,null),null;var N=r.__assign({cluster_count:U},j.attributes),W=o.isSome(d)?d.update(A,P,a,N,O,Z):m.create(e,g,A,P,a,N,O,Z);return 0===U&&(W.geometry.coords[0]=(_+v)/2,W.geometry.coords[1]=(y+b)/2),this._clusters.set(g,W),this._updateAggregateValueRangeForCluster(W,W.tileLevel),W},t.prototype._updateAggregateValueRangeForCluster=function(e,t){var r=this._aggregateValueRanges[t]||{minValue:1/0,maxValue:0},s=r.minValue,a=r.maxValue;r.minValue=Math.min(s,e.count),r.maxValue=Math.max(a,e.count),this._aggregateValueRanges[t]=r,s===r.minValue&&a===r.maxValue||(this._aggregateValueRangesChanged=!0)},t.prototype._markTileClustersForDeletion=function(e,t){for(var r=2*t,s=Math.ceil(_.TILE_SIZE/r),a=e.key,i=a.row,o=a.col*_.TILE_SIZE,n=i*_.TILE_SIZE,u=Math.floor(o/r),h=Math.floor(n/r),l=u;l<u+s;l++)for(var c=h;c<h+s;c++)this._markForDeletion(e.key.level,l,c)},t}(y.Store2D);t.ClusterStore=b}));