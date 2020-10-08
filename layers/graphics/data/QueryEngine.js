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

define(["require","exports","tslib","../../../core/Error","../../../core/lang","../../../core/maybe","../../../core/MemCache","../../../core/promiseUtils","../../../core/SetUtils","../../../core/unitUtils","../../../geometry/support/aaBoundingBox","../../../geometry/support/aaBoundingRect","../../../geometry/support/boundsUtils","../../../geometry/support/jsonUtils","../../../geometry/support/spatialReferenceUtils","./attributeSupport","./projectionSupport","./QueryEngineCapabilities","./QueryEngineResult","./spatialQuerySupport","./timeSupport","./utils","../../support/FieldsIndex","../../support/PromiseQueue"],(function(e,t,r,n,i,s,u,o,a,c,h,l,f,d,p,y,_,m,g,x,v,Q,S,w){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Feature=void 0;var b=function(e,t,r,n,i){void 0===t&&(t=null),this.attributes=e,this.geometry=r,this.centroid=n,this.filterFlags=i,this.groupId=-1,this.displayId=t};t.Feature=b;var E=new Set,R=new u.MemCacheStorage(2e6),I=0,F=function(){function e(e){var t=this;this.capabilities={query:m.queryCapabilities},this.geometryType=e.geometryType,this.hasM=e.hasM,this.hasZ=e.hasZ,this.objectIdField=e.objectIdField,this.spatialReference=e.spatialReference,this.definitionExpression=e.definitionExpression,this.featureStore=e.featureStore,this._changeHandle=this.featureStore.events.on("changed",(function(){return t.clearCache()})),this.timeInfo=e.timeInfo,e.cacheSpatialQueries&&(this._geometryQueryCache=new u.MemCache(I+++"$$",R)),this.fieldsIndex=new S(e.fields),e.scheduler&&e.task&&(this._frameQueue=new w.default,this._frameTask=e.scheduler.registerTask(e.task,(function(e){return t._update(e)}),(function(){return t._frameQueue.length>0})))}return e.prototype.destroy=function(){this._frameTask&&(this._frameTask.remove(),this._frameTask=null,this._frameQueue.cancelAll(),this._frameQueue=null),this.clearCache(),this._geometryQueryCache&&this._geometryQueryCache.destroy(),this._changeHandle&&(this._changeHandle.remove(),this._changeHandle=null),this.fieldsIndex.destroy()},Object.defineProperty(e.prototype,"featureAdapter",{get:function(){return this.featureStore.featureAdapter},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullExtent",{get:function(){var e=this.featureStore.fullBounds;return e?{xmin:e[0],ymin:e[1],xmax:e[2],ymax:e[3],spatialReference:Q.cleanFromGeometryEngine(this.spatialReference)}:null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"timeExtent",{get:function(){return this.timeInfo?this._timeExtent?this._timeExtent:(this._timeExtent=v.getTimeExtent(this.timeInfo,this.featureStore),this._timeExtent):null},enumerable:!1,configurable:!0}),e.prototype.clearCache=function(){this._geometryQueryCache&&this._geometryQueryCache.clear(),this._allItems=null,this._timeExtent=null},e.prototype.executeQuery=function(e,t){return void 0===e&&(e={}),r.__awaiter(this,void 0,void 0,(function(){var t,n,s,u=this;return r.__generator(this,(function(r){switch(r.label){case 0:t=i.clone(e),r.label=1;case 1:return r.trys.push([1,8,,9]),[4,this._schedule((function(){return Q.normalizeQuery(t,u.definitionExpression,u.spatialReference)}))];case 2:return t=r.sent(),[4,this._reschedule((function(){return u._checkQuerySupport(t)}))];case 3:return t=r.sent(),[4,this._reschedule((function(){return u._executeGeometryQuery(t)}))];case 4:return n=r.sent(),[4,this._reschedule((function(){return n.executeObjectIdsQuery(t)}))];case 5:return n=r.sent(),[4,this._reschedule((function(){return n.executeTimeQuery(t)}))];case 6:return n=r.sent(),[4,this._reschedule((function(){return n.executeAttributesQuery(t)}))];case 7:return n=r.sent(),[3,9];case 8:if((s=r.sent())!==Q.QUERY_ENGINE_EMPTY_RESULT)throw s;return n=new g.default([],null,this),[3,9];case 9:return[2,n.createQueryResponse(t)]}}))}))},e.prototype.executeQueryForCount=function(e,t){return void 0===e&&(e={}),r.__awaiter(this,void 0,void 0,(function(){var t,n,s,u=this;return r.__generator(this,(function(r){switch(r.label){case 0:(t=i.clone(e)).returnGeometry=!1,t.returnCentroid=!1,t.outSR=null,r.label=1;case 1:return r.trys.push([1,8,,9]),[4,this._schedule((function(){return Q.normalizeQuery(t,u.definitionExpression,u.spatialReference)}))];case 2:return t=r.sent(),[4,this._reschedule((function(){return u._checkQuerySupport(t)}))];case 3:return t=r.sent(),[4,this._reschedule((function(){return u._executeGeometryQuery(t)}))];case 4:return n=r.sent(),[4,this._reschedule((function(){return n.executeObjectIdsQuery(t)}))];case 5:return n=r.sent(),[4,this._reschedule((function(){return n.executeTimeQuery(t)}))];case 6:return n=r.sent(),[4,this._reschedule((function(){return n.executeAttributesQuery(t)}))];case 7:return n=r.sent(),[3,9];case 8:if((s=r.sent())!==Q.QUERY_ENGINE_EMPTY_RESULT)throw s;return[2,0];case 9:return[2,n.createQueryResponseForCount(t)]}}))}))},e.prototype.executeQueryForExtent=function(e,t){return void 0===e&&(e={}),r.__awaiter(this,void 0,void 0,(function(){var t,n,s,u,o,a,l,f,d=this;return r.__generator(this,(function(r){switch(r.label){case 0:t=i.clone(e),s=t.outSR,r.label=1;case 1:return r.trys.push([1,8,,9]),[4,this._schedule((function(){return Q.normalizeQuery(t,d.definitionExpression,d.spatialReference)}))];case 2:return t=r.sent(),[4,this._reschedule((function(){return d._checkQuerySupport(t)}))];case 3:return(t=r.sent()).returnGeometry=!0,t.returnCentroid=!1,t.outSR=null,[4,this._reschedule((function(){return d._executeGeometryQuery(t)}))];case 4:return n=r.sent(),[4,this._reschedule((function(){return n.executeObjectIdsQuery(t)}))];case 5:return n=r.sent(),[4,this._reschedule((function(){return n.executeTimeQuery(t)}))];case 6:return n=r.sent(),[4,this._reschedule((function(){return n.executeAttributesQuery(t)}))];case 7:return n=r.sent(),(u=n.size)?(h.set(C,h.NEGATIVE_INFINITY),this.featureStore.forEachBounds(n.items,(function(e){return h.expand(C,e)}),T),o={xmin:C[0],ymin:C[1],xmax:C[3],ymax:C[4],spatialReference:Q.cleanFromGeometryEngine(this.spatialReference)},this.hasZ&&isFinite(C[2])&&isFinite(C[5])&&(o.zmin=C[2],o.zmax=C[5]),(a=_.project(o,n.spatialReference,s)).spatialReference=Q.cleanFromGeometryEngine(s||this.spatialReference),a.xmax-a.xmin==0&&(l=c.getMetersPerUnitForSR(a.spatialReference),a.xmin-=l,a.xmax+=l),a.ymax-a.ymin==0&&(l=c.getMetersPerUnitForSR(a.spatialReference),a.ymin-=l,a.ymax+=l),this.hasZ&&null!=a.zmin&&null!=a.zmax&&a.zmax-a.zmin==0&&(l=c.getMetersPerUnitForSR(a.spatialReference),a.zmin-=l,a.zmax+=l),[2,{count:u,extent:a}]):[2,{count:u,extent:null}];case 8:if((f=r.sent())===Q.QUERY_ENGINE_EMPTY_RESULT)return[2,{count:0,extent:null}];throw f;case 9:return[2]}}))}))},e.prototype.executeQueryForIds=function(e,t){return void 0===e&&(e={}),r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return[2,this.executeQueryForIdSet(e,t).then((function(e){return a.valuesOfSet(e)}))]}))}))},e.prototype.executeQueryForIdSet=function(e,t){return void 0===e&&(e={}),r.__awaiter(this,void 0,void 0,(function(){var t,n,s,u,o,a=this;return r.__generator(this,(function(r){switch(r.label){case 0:(t=i.clone(e)).returnGeometry=!1,t.returnCentroid=!1,t.outSR=null,r.label=1;case 1:return r.trys.push([1,9,,10]),[4,this._schedule((function(){return Q.normalizeQuery(t,a.definitionExpression,a.spatialReference)}))];case 2:return t=r.sent(),[4,this._reschedule((function(){return a._checkQuerySupport(t)}))];case 3:return t=r.sent(),[4,this._reschedule((function(){return a._executeGeometryQuery(t)}))];case 4:return n=r.sent(),[4,this._reschedule((function(){return n.executeObjectIdsQuery(t)}))];case 5:return n=r.sent(),[4,this._reschedule((function(){return n.executeTimeQuery(t)}))];case 6:return n=r.sent(),[4,this._reschedule((function(){return n.executeAttributesQuery(t)}))];case 7:return n=r.sent(),s=n.items,u=new Set,[4,this._reschedule((function(){for(var e=0,t=s;e<t.length;e++){var r=t[e];u.add(n.featureAdapter.getObjectId(r))}}))];case 8:return r.sent(),[2,u];case 9:if((o=r.sent())===Q.QUERY_ENGINE_EMPTY_RESULT)return[2,new Set];throw o;case 10:return[2]}}))}))},e.prototype.executeQueryForLatestObservations=function(e,t){return void 0===e&&(e={}),r.__awaiter(this,void 0,void 0,(function(){var t,s,u,o=this;return r.__generator(this,(function(r){switch(r.label){case 0:if(!this.timeInfo||!this.timeInfo.trackIdField)throw new n("feature-store:unsupported-query","Missing timeInfo or timeInfo.trackIdField",{query:e,timeInfo:this.timeInfo});t=i.clone(e),r.label=1;case 1:return r.trys.push([1,9,,10]),[4,this._schedule((function(){return Q.normalizeQuery(t,o.definitionExpression,o.spatialReference)}))];case 2:return t=r.sent(),[4,this._reschedule((function(){return o._checkQuerySupport(t)}))];case 3:return t=r.sent(),[4,this._reschedule((function(){return o._executeGeometryQuery(t)}))];case 4:return s=r.sent(),[4,this._reschedule((function(){return s.executeObjectIdsQuery(t)}))];case 5:return s=r.sent(),[4,this._reschedule((function(){return s.executeTimeQuery(t)}))];case 6:return s=r.sent(),[4,this._reschedule((function(){return s.executeAttributesQuery(t)}))];case 7:return s=r.sent(),[4,this._reschedule((function(){return s.filterLatest()}))];case 8:return s=r.sent(),[3,10];case 9:if((u=r.sent())!==Q.QUERY_ENGINE_EMPTY_RESULT)throw u;return s=new g.default([],null,this),[3,10];case 10:return[2,s.createQueryResponse(t)]}}))}))},e.prototype._schedule=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){return this._frameQueue?[2,this._frameQueue.push(e)]:[2,e()]}))}))},e.prototype._reschedule=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){return this._frameQueue?[2,this._frameQueue.unshift(e)]:[2,e()]}))}))},e.prototype._update=function(e){for(this._budget=e;!e.done&&this._frameQueue&&this._frameQueue.process();)e.madeProgress();this._budget=null},e.prototype._getAll=function(){if(!this._allItems){var e=[];this.featureStore.forEach((function(t){return e.push(t)})),this._allItems=new g.default(e,null,this)}return this._allItems},e.prototype._executeGeometryQuery=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,n,i,u,o,a,c,h,l,f,d,y,_,m,v,Q,S,w,b,E=this;return r.__generator(this,(function(R){switch(R.label){case 0:if(t=e.geometry,n=e.outSR,i=e.spatialRel,u=p.isValid(n)&&!p.equals(this.spatialReference,n),(o=this._geometryQueryCache?u?JSON.stringify({geometry:t,spatialRelationship:i,outSpatialReference:n}):JSON.stringify({geometry:t,spatialRelationship:i}):null)&&(a=this._geometryQueryCache.get(o),!s.isUndefined(a)))return[2,a];if(c=function(t){return r.__awaiter(E,void 0,void 0,(function(){var i;return r.__generator(this,(function(r){switch(r.label){case 0:return u&&(e.returnGeometry||e.returnCentroid)?[4,t.project(n)]:[3,2];case 1:return i=r.sent(),o&&this._geometryQueryCache.put(o,i,i.size||1),[2,i];case 2:return o&&this._geometryQueryCache.put(o,t,t.size||1),[2,t]}}))}))},!t)return[2,c(this._getAll())];if(h=this.featureAdapter,"esriSpatialRelDisjoint"!==i)return[3,3];if(!(l=this._searchFeatures(this._getQueryBBoxes(t))).length)return[2,c(this._getAll())];for(y=new Set,_=0,m=l;_<m.length;_++)v=m[_],y.add(h.getObjectId(v));return[4,this._reschedule((function(){var e=0;f=new Array(y.size),E.featureStore.forEach((function(t){return f[e++]=t})),d=y}))];case 1:return R.sent(),[4,this._reschedule((function(){return r.__awaiter(E,void 0,void 0,(function(){var e,n,s;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,x.getSpatialQueryOperator(i,t,this.geometryType,this.hasZ,this.hasM)];case 1:return e=r.sent(),n=function(t){return!d.has(h.getObjectId(t))||e(h.getGeometry(t))},s=g.default.bind,[4,this._runSpatialFilter(f,n)];case 2:return[2,new(s.apply(g.default,[void 0,r.sent(),t,this]))]}}))}))}))];case 2:return S=R.sent(),[2,c(S)];case 3:return(Q=this._searchFeatures(this._getQueryBBoxes(t))).length?this._canExecuteSoloPass(t,e)?[2,c(new g.default(Q,t,this))]:[4,x.getSpatialQueryOperator(i,t,this.geometryType,this.hasZ,this.hasM)]:(S=new g.default([],t,this),o&&this._geometryQueryCache.put(o,S,S.size||1),[2,S]);case 4:return w=R.sent(),[4,this._runSpatialFilter(Q,(function(e){return w(h.getGeometry(e))}))];case 5:return b=R.sent(),[2,c(new g.default(b,t,this))]}}))}))},e.prototype._runSpatialFilter=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,i,s,u=this;return r.__generator(this,(function(o){return t?this._budget?(n=0,i=new Array,s=function(){return r.__awaiter(u,void 0,void 0,(function(){var u;return r.__generator(this,(function(r){switch(r.label){case 0:return n<e.length?(u=e[n],t(u)&&i.push(u),this._budget.done?[4,this._reschedule((function(){return s()}))]:[3,2]):[3,3];case 1:r.sent(),r.label=2;case 2:return++n,[3,0];case 3:return[2]}}))}))},[2,this._reschedule((function(){return s()})).then((function(){return i}))]):[2,e.filter((function(e){return t(e)}))]:[2,e]}))}))},e.prototype._canExecuteSoloPass=function(e,t){var r=this.geometryType,n=t.spatialRel;return x.canQueryWithRBush(e)&&("esriSpatialRelEnvelopeIntersects"===n||"esriGeometryPoint"===r&&("esriSpatialRelIntersects"===n||"esriSpatialRelContains"===n||"esriSpatialRelWithin"===n))},e.prototype._getQueryBBoxes=function(e){if(x.canQueryWithRBush(e)){if(d.isExtent(e))return[l.fromValues(e.xmin,e.ymin,e.xmax,e.ymax)];if(d.isPolygon(e))return e.rings.map((function(e){return l.fromValues(Math.min(e[0][0],e[2][0]),Math.min(e[0][1],e[2][1]),Math.max(e[0][0],e[2][0]),Math.max(e[0][1],e[2][1]))}))}return[f.getBoundsXY(l.create(),e)]},e.prototype._searchFeatures=function(e){for(var t=0,r=e;t<r.length;t++){var n=r[t];this.featureStore.forEachInBounds(n,(function(e){E.add(e)}))}var i=new Array(E.size),s=0;return E.forEach((function(e){return i[s++]=e})),E.clear(),i},e.prototype._checkQuerySupport=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){if(e.distance<0||null!=e.geometryPrecision||e.multipatchOption||e.pixelSize||e.relationParam||e.text)throw new n("feature-store:unsupported-query","Unsupported query options",{query:e});return[2,o.all([this._checkAttributesQuerySupport(e),this._checkStatisticsQuerySupport(e),x.checkSpatialQuerySupport(e,this.geometryType,this.spatialReference),_.checkProjectionSupport(this.spatialReference,e.outSR)]).then((function(){return e}))]}))}))},e.prototype._checkAttributesQuerySupport=function(e){var t=e.outFields,r=e.orderByFields,i=e.returnDistinctValues,s=e.outStatistics,u=s?s.map((function(e){return e.outStatisticFieldName&&e.outStatisticFieldName.toLowerCase()})):[];if(r&&r.length>0){var o=r.map((function(e){var t=e.toLowerCase();return t.indexOf(" asc")>-1?t.split(" asc")[0]:t.indexOf(" desc")>-1?t.split(" desc")[0]:e})).filter((function(e){return-1===u.indexOf(e)}));y.validateFields(this.fieldsIndex,o,"orderByFields contains missing fields")}if(t&&t.length>0)y.validateFields(this.fieldsIndex,t,"outFields contains missing fields");else if(i)throw new n("feature-store:unsupported-query","outFields should be specified for returnDistinctValues",{query:e});y.validateWhere(this.fieldsIndex,e.where)},e.prototype._checkStatisticsQuerySupport=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,s,u,o,a,c,h,l,f,d;return r.__generator(this,(function(r){if(t=e.outStatistics,i=e.groupByFieldsForStatistics,s=e.having,u=i&&i.length,o=t&&t.length,s){if(!u||!o)throw new n("feature-store:unsupported-query","outStatistics and groupByFieldsForStatistics should be specified with having",{query:e});y.validateHaving(this.fieldsIndex,s,t)}if(o){if(!function(e){return e.every((function(e){return"exceedslimit"!==e.statisticType}))}(t))return[2];for(a=t.map((function(e){return e.onStatisticField})),y.validateFields(this.fieldsIndex,a,"onStatisticFields contains missing fields"),u&&y.validateFields(this.fieldsIndex,i,"groupByFieldsForStatistics contains missing fields"),c=0,h=t;c<h.length;c++)if(l=h[c],f=l.onStatisticField,d=l.statisticType,("percentile_disc"===d||"percentile_cont"===d)&&"statisticParameters"in l){if(!l.statisticParameters)throw new n("feature-store:unsupported-query","statisticParamters should be set for percentile type",{definition:l,query:e})}else if("count"!==d&&f&&y.hasInvalidFieldType(f,this.fieldsIndex))throw new n("feature-store:unsupported-query","outStatistics contains non-numeric fields",{definition:l,query:e})}return[2]}))}))},e}();t.default=F;var T=h.create(),C=h.create()}));