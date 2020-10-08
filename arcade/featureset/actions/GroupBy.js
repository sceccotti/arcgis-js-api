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

define(["require","exports","tslib","../../../Graphic","../../languageUtils","./Adapted","./AttributeFilter","./OrderBy","../support/FeatureSet","../support/IdSet","../support/OrderbyClause","../support/shared","../support/sqlUtils","../support/sqlUtils","../support/stats","../support/StatsField","../../../core/MD5","../../../core/promiseUtils","../../../core/sql/WhereClause","../../../geometry/SpatialReference","../../../layers/support/Field","../../../layers/support/FieldsIndex"],(function(e,t,i,r,n,a,s,l,o,d,u,f,p,c,g,h,_,y,m,b,v,F){"use strict";function w(e){if(!e)return"COUNT";switch(e.toLowerCase()){case"max":return"MAX";case"var":case"variance":return"VAR";case"avg":case"average":case"mean":return"AVG";case"min":return"MIN";case"sum":return"SUM";case"stdev":case"stddev":return"STDDEV";case"count":return"COUNT"}return"COUNT"}return function(e){function t(t){var i=e.call(this,t)||this;return i._decodedStatsfield=[],i._decodedGroupbyfield=[],i._candosimplegroupby=!0,i.phsyicalgroupbyfields=[],i.objectIdField="ROW__ID",i._internalObjectIdField="ROW__ID",i._adaptedFields=[],i.declaredClass="esri.arcade.featureset.actions.Aggregate",i._uniqueIds=1,i._maxQuery=10,i._maxProcessing=10,i._parent=t.parentfeatureset,i._config=t,i}return i.__extends(t,e),t.prototype.isTable=function(){return!0},t.prototype._getSet=function(e){var t=this;return null===this._wset?this._getFilteredSet("",null,null,null,e).then((function(e){return t._wset=e,t._wset})):y.resolve(this._wset)},t.prototype._isInFeatureSet=function(){return f.IdState.InFeatureSet},t.prototype.nextUniqueName=function(e){for(;1===e["T"+this._uniqueIds.toString()];)this._uniqueIds++;var t="T"+this._uniqueIds.toString();return e[t]=1,t},t.prototype.convertToEsriFieldType=function(e){return e},t.prototype._initialiseFeatureSet=function(){var e={},t=!1,i=1,r=this._parent?this._parent.getFieldsIndex():new F([]);for(this.objectIdField="ROW__ID";!1===t;){for(var n=!1,s=0;s<this._config.groupbyfields.length;s++)if(this._config.groupbyfields[s].name.toLowerCase()===this.objectIdField.toLowerCase()){n=!0;break}if(!1===n)for(s=0;s<this._config.statsfields.length;s++)if(this._config.statsfields[s].name.toLowerCase()===this.objectIdField.toLowerCase()){n=!0;break}!1===n?t=!0:(this.objectIdField="ROW__ID"+i.toString(),i++)}for(var l=0,o=this._config.statsfields;l<o.length;l++){var d=o[l],u=new h;u.field=d.name,u.tofieldname=d.name,u.workingexpr=d.expression instanceof m.WhereClause?d.expression:m.WhereClause.create(d.expression,r),u.typeofstat=w(d.statistic),this._decodedStatsfield.push(u)}this._decodedGroupbyfield=[];for(var g=0,_=this._config.groupbyfields;g<_.length;g++){var y={name:(d=_[g]).name,singlefield:null,tofieldname:d.name,expression:d.expression instanceof m.WhereClause?d.expression:m.WhereClause.create(d.expression,r)};this._decodedGroupbyfield.push(y)}if(null!==this._parent){this.geometryType=this._parent.geometryType,this.spatialReference=this._parent.spatialReference,this.hasM=this._parent.hasM,this.hasZ=this._parent.hasZ,this.typeIdField="";for(var S=0,I=this._parent.fields;S<I.length;S++){e[(d=I[S]).name.toUpperCase()]=1}this.types=null}else this.geometryType=f.layerGeometryEsriConstants.point,this.typeIdField="",this.types=null,this.spatialReference=new b({wkid:4326});this.fields=[];var x=new h;x.field=this.nextUniqueName(e),x.tofieldname=this.objectIdField,x.workingexpr=m.WhereClause.create(this._parent.objectIdField,this._parent.getFieldsIndex()),x.typeofstat="MIN",this._decodedStatsfield.push(x);for(var D=0,k=this._decodedGroupbyfield;D<k.length;D++){var C=k[D],A=new v;if(C.name=this.nextUniqueName(e),A.name=C.tofieldname,A.alias=A.name,p.isSingleField(C.expression)){if(!(O=this._parent.getField(c.toWhereClause(C.expression,f.FeatureServiceDatabaseType.Standardised))))throw new Error("Field is not present for Aggregation");C.name=O.name,C.singlefield=O.name,this.phsyicalgroupbyfields.push(O.name),A.type=O.type}else{A.type=this.convertToEsriFieldType(c.predictType(C.expression,this._parent.fields));var T=new v;T.name=C.name,T.alias=T.name,this.phsyicalgroupbyfields.push(C.name),this._adaptedFields.push(new a.SqlExpressionAdapted(T,C.expression)),this._candosimplegroupby=!1}this.fields.push(A)}if(this._adaptedFields.length>0)for(var G=0,W=this._parent.fields;G<W.length;G++){d=W[G];this._adaptedFields.push(new a.OriginalField(d))}for(s=0;s<this._decodedStatsfield.length;s++){A=new v;var O=null;(C=this._decodedStatsfield[s]).field=this.nextUniqueName(e),C.tofieldname===this.objectIdField&&(this._internalObjectIdField=C.field),A.name=C.tofieldname,A.alias=A.name;var j=null!==C.workingexpr&&p.isSingleField(C.workingexpr)?c.toWhereClause(C.workingexpr,f.FeatureServiceDatabaseType.Standardised):"";switch(this._decodedStatsfield[s].typeofstat){case"SUM":if(""!==j){if(!(O=this._parent.getField(j)))throw new Error("Field is not present for Aggregation");A.type=O.type}else A.type="double";break;case"MIN":case"MAX":if(""!==j){if(!(O=this._parent.getField(j)))throw new Error("Field is not present for Aggregation");A.type=O.type}else A.type="double";break;case"COUNT":A.type="integer";break;case"STDDEV":case"VAR":case"AVG":if(""!==j&&!(O=this._parent.getField(j)))throw new Error("Field is not present for Aggregation");A.type="double"}this.fields.push(A)}},t.prototype._canDoAggregates=function(){return y.resolve(!1)},t.prototype._getFeatures=function(e,t,i,r){var n=this;-1!==t&&void 0===this._featureCache[t]&&[].push(t);var a=this._maxQuery;return!0===this._checkIfNeedToExpandKnownPage(e,a)?this._expandPagedSet(e,a,0,0,r).then((function(){return n._getFeatures(e,t,i,r)})):y.resolve("success")},t.prototype._getFilteredSet=function(e,t,i,r,n){var o=this;if(""!==e)return y.resolve(new d([],[],!0,null));var f=null,c={ordered:!1,nowhereclause:!1};return this._ensureLoaded().then((function(){if(null!==i)for(var e=0;e<o._decodedStatsfield.length;e++)if(!0===p.scanForField(i,o._decodedStatsfield[e].tofieldname)){c.nowhereclause=!0,i=null;break}if(null!==r){c.ordered=!0;for(e=0;e<o._decodedStatsfield.length;e++)if(!0===r.scanForField(o._decodedStatsfield[e].tofieldname)){r=null,c.ordered=!1;break}if(null!==r)for(var t=0,n=o._decodedGroupbyfield;t<n.length;t++){var a=n[t];if(null===a.singlefield&&!0===r.scanForField(a.tofieldname)){r=null,c.ordered=!1;break}}}return!1===o._candosimplegroupby?y.resolve(!1):o._parent._canDoAggregates(o.phsyicalgroupbyfields,o._decodedStatsfield,"",null,null)})).then((function(e){if(e){var t=null;i&&(t=o._reformulateWhereClauseWithoutGroupByFields(i));var p=null;return r&&(p=o._reformulateOrderClauseWithoutGroupByFields(r)),o._parent._getAggregatePagesDataSourceDefinition(o.phsyicalgroupbyfields,o._decodedStatsfield,"",null,t,p,o._internalObjectIdField).then((function(e){return o._checkCancelled(n),f=!0===c.nowhereclause?new d(e._candidates.slice(0).concat(e._known.slice(0)),[],!0===c.ordered&&e._ordered,o._clonePageDefinition(e.pagesDefinition)):new d(e._candidates.slice(0),e._known.slice(0),!0===c.ordered&&e._ordered,o._clonePageDefinition(e.pagesDefinition))}))}var g=o._parent;if(o._adaptedFields.length>0&&(g=new a.AdaptedFeatureSet({parentfeatureset:o._parent,adaptedFields:o._adaptedFields,extraFilter:null})),!0===c.nowhereclause)f=new d(["GETPAGES"],[],!1,{aggregatefeaturesetpagedefinition:!0,resultOffset:0,resultRecordCount:o._maxQuery,internal:{fullyResolved:!1,workingItem:null,type:"manual",iterator:null,set:[],subfeatureset:new l({parentfeatureset:g,orderbyclause:new u(o.phsyicalgroupbyfields.join(",")+","+o._parent.objectIdField+" ASC")})}});else{var h=g;if(null!==i){var _=null;i&&(_=o._reformulateWhereClauseWithoutGroupByFields(i)),h=new s({parentfeatureset:h,whereclause:_})}f=new d(["GETPAGES"],[],!1,{aggregatefeaturesetpagedefinition:!0,resultOffset:0,resultRecordCount:o._maxQuery,internal:{fullyResolved:!1,workingItem:null,type:"manual",iterator:null,set:[],subfeatureset:new l({parentfeatureset:h,orderbyclause:new u(o.phsyicalgroupbyfields.join(",")+","+o._parent.objectIdField+" ASC")})}})}return f}))},t.prototype._reformulateWhereClauseWithoutStatsFields=function(e){for(var t=0,i=this._decodedStatsfield;t<i.length;t++){var r=i[t];e=c.reformulateWithoutField(e,r.tofieldname,c.toWhereClause(r.workingexpr,f.FeatureServiceDatabaseType.Standardised),this._parent.getFieldsIndex())}return e},t.prototype._reformulateWhereClauseWithoutGroupByFields=function(e){for(var t=0,i=this._decodedGroupbyfield;t<i.length;t++){var r=i[t];r.tofieldname!==r.name&&(e=c.reformulateWithoutField(e,r.tofieldname,c.toWhereClause(r.expression,f.FeatureServiceDatabaseType.Standardised),this._parent.getFieldsIndex()))}return e},t.prototype._reformulateOrderClauseWithoutGroupByFields=function(e){for(var t=[],i=0,r=this._decodedGroupbyfield;i<r.length;i++){var n=r[i];n.tofieldname!==n.name&&t.push({field:n.tofieldname,newfield:n.name})}return t.length>0?e.replaceFields(t):e},t.prototype._clonePageDefinition=function(e){return null===e?null:!0===e.aggregatefeaturesetpagedefinition?{aggregatefeaturesetpagedefinition:!0,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,internal:e.internal}:this._parent._clonePageDefinition(e)},t.prototype._refineSetBlock=function(e,t,i){var r=this;try{if(!0===this._checkIfNeedToExpandCandidatePage(e,this._maxQuery))return this._expandPagedSet(e,this._maxQuery,0,0,i).then((function(){return r._refineSetBlock(e,t,i)}));this._checkCancelled(i);var n=e._candidates.length;this._refineKnowns(e,t);e._candidates.length;return e._candidates.length,y.resolve(e)}catch(e){return y.reject(e)}},t.prototype._expandPagedSet=function(e,t,i,r,n){return this._expandPagedSetFeatureSet(e,t,i,r,n)},t.prototype._getPhysicalPage=function(e,t,i){var n=this;return!0===e.pagesDefinition.aggregatefeaturesetpagedefinition?y.create((function(t,r){n._sequentialGetPhysicalItem(e,e.pagesDefinition.resultRecordCount,i,[]).then((function(e){t(e)}),r)})):this._getAgregagtePhysicalPage(e,t,i).then((function(e){for(var t=0,i=e;t<i.length;t++){for(var a=i[t],s={geometry:a.geometry,attributes:{}},l=0,o=n._decodedGroupbyfield;l<o.length;l++){var d=o[l];s.attributes[d.tofieldname]=a.attributes[d.name]}for(var u=0,f=n._decodedStatsfield;u<f.length;u++){d=f[u];s.attributes[d.tofieldname]=a.attributes[d.field]}n._featureCache[s.attributes[n.objectIdField]]=new r(s)}return e.length}))},t.prototype._sequentialGetPhysicalItem=function(e,t,i,r){var n=this;return y.create((function(a,s){null===e.pagesDefinition.internal.iterator&&(e.pagesDefinition.internal.iterator=e.pagesDefinition.internal.subfeatureset.iterator(i)),!0===e.pagesDefinition.internal.fullyResolved?a(r.length):0===t?a(r.length):n._nextAggregateItem(e,t,i,r,(function(s){null===s?a(r.length):(t-=1,a(n._sequentialGetPhysicalItem(e,t,i,r)))}),s)}))},t.prototype._nextAggregateItem=function(e,t,i,r,a,s){var l=this;try{n.tick(e.pagesDefinition.internal.iterator.next()).then((function(n){if(null===n)if(null!==e.pagesDefinition.internal.workingItem){var o=l._calculateAndAppendAggregateItem(e.pagesDefinition.internal.workingItem);r.push(o),e.pagesDefinition.internal.workingItem=null,e.pagesDefinition.internal.set.push(o.attributes[l.objectIdField]),e.pagesDefinition.internal.fullyResolved=!0,a(null)}else e.pagesDefinition.internal.fullyResolved=!0,a(null);else{var d=l._generateAggregateHash(n);if(null===e.pagesDefinition.internal.workingItem)e.pagesDefinition.internal.workingItem={features:[n],id:d};else{if(d!==e.pagesDefinition.internal.workingItem.id){o=l._calculateAndAppendAggregateItem(e.pagesDefinition.internal.workingItem);return r.push(o),e.pagesDefinition.internal.workingItem=null,e.pagesDefinition.internal.set.push(o.attributes[l.objectIdField]),t-=1,e.pagesDefinition.internal.workingItem={features:[n],id:d},void a(o)}e.pagesDefinition.internal.workingItem.features.push(n)}l._nextAggregateItem(e,t,i,r,a,s)}}),s)}catch(e){s(e)}},t.prototype._calculateFieldStat=function(e,t,i){for(var r=[],n=0;n<e.features.length;n++)if(null!==t.workingexpr){var a=t.workingexpr.calculateValue(e.features[n]);null!==a&&r.push(a)}else r.push(null);switch(t.typeofstat){case"MIN":i.attributes[t.tofieldname]=g.calculateStat("min",r,-1);break;case"MAX":i.attributes[t.tofieldname]=g.calculateStat("max",r,-1);break;case"SUM":i.attributes[t.tofieldname]=g.calculateStat("sum",r,-1);break;case"COUNT":i.attributes[t.tofieldname]=r.length;break;case"VAR":i.attributes[t.tofieldname]=g.calculateStat("var",r,-1);break;case"STDDEV":i.attributes[t.tofieldname]=g.calculateStat("stddev",r,-1);break;case"AVG":i.attributes[t.tofieldname]=g.calculateStat("avg",r,-1)}return!0},t.prototype._calculateAndAppendAggregateItem=function(e){for(var t={attributes:{},geometry:null},i=0,n=this._decodedGroupbyfield;i<n.length;i++){var a=n[i],s=a.singlefield?e.features[0].attributes[a.singlefield]:a.expression.calculateValue(e.features[0]);t.attributes[a.tofieldname]=s}for(var l=0,o=this._decodedStatsfield;l<o.length;l++){var d=o[l];this._calculateFieldStat(e,d,t)}for(var u=[],f=0;f<this._decodedStatsfield.length;f++)u.push(this._calculateFieldStat(e,this._decodedStatsfield[f],t));return this._featureCache[t.attributes[this.objectIdField]]=new r({attributes:t.attributes,geometry:t.geometry}),t},t.prototype._generateAggregateHash=function(e){for(var t="",i=0,r=this._decodedGroupbyfield;i<r.length;i++){var n=r[i],a=n.singlefield?e.attributes[n.singlefield]:n.expression.calculateValue(e);t+=null==a?":":":"+a.toString()}return _.createMD5Hash(t,_.outputTypes.String)},t.prototype._stat=function(){return y.resolve({calculated:!1})},t.prototype.getFeatureByObjectId=function(){return y.resolve(null)},t.registerAction=function(){o._featuresetFunctions.groupby=function(e,i){return new t({parentfeatureset:this,groupbyfields:e,statsfields:i})}},t}(o)}));