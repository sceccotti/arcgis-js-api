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

define(["require","exports","tslib","../../../Graphic","../../../core/arrayUtils","../../../core/Error","../../../core/maybe","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../layers/support/fieldUtils","../../statistics/support/utils","../utils","./FeatureLayerAdapter","./LayerAdapter","./support/utils","../../../tasks/support/FeatureSet"],(function(e,t,r,a,i,s,n,o,u,l,c,p,d,m,h,f,y){"use strict";return function(e){function t(t){return e.call(this,t)||this}return r.__extends(t,e),t.prototype._hasCachedStatistics=function(e){return this.layer.hasCachedStatistics(e)},t.prototype._updateQuery=function(e,t,a){var i=this;if(void 0===t&&(t=[]),void 0===a&&(a=[]),!a.length)return e;var s=this.layer.objectIdField,n=e.clone(),o=t.filter((function(e){var t=i.layer.getField(e);return-1===a.indexOf(t.name)})),u=o.some((function(e){return i.layer.getField(e).name===s}));return n.outFields=u?o:r.__spreadArrays(o,[s]),n},t.prototype._fetchFeaturesFromMemory=function(e,t,a){return r.__awaiter(this,void 0,void 0,(function(){var i,n,l,c,p,d,m;return r.__generator(this,(function(r){switch(r.label){case 0:if(!e)throw new s("scene-layer-adapter:insufficient-data","view is required to fetch the features from layerView");return[4,e.whenLayerView(this.layer)];case 1:return i=r.sent(),n=o.createAbortController(),l=u.whenFalseOnce(i,"updating",n.signal),[4,o.timeout(l,5e3,n)];case 2:return r.sent(),[4,f.getMissingFields(this,a,i)];case 3:return c=r.sent(),p=this._updateQuery(t,a,c),[4,i.queryFeatures(p)];case 4:return d=r.sent(),m=d.features,[2,c.length?i.whenGraphicAttributes(m,c):m]}}))}))},t.prototype._fetchFeaturesForStats=function(e){var t=this;return d.getFieldsList({field:e.field,normalizationField:e.normalizationField,valueExpression:e.valueExpression}).then((function(r){return t.getSampleFeatures({sampleSize:-1,view:e.view,returnGeometry:e.returnGeometry,requiredFields:r,signal:e.signal})}))},t.prototype._generateFeatureSetForCachedHistogram=function(e,t,r,i){void 0===t&&(t=e.minimum),void 0===r&&(r=e.maximum);for(var s=[],n=0;n<i;n++)s[n]=0;var o=e.counts.length,u=e.minimum,l=e.maximum;for(n=0;n<o;n++){var c=(n+.5)/o,p=((1-c)*u+c*l-t)/(r-t)*i;p>=0&&p<=i&&(s[p===i?i-1:Math.floor(p)]+=e.counts[n])}var d=[];s.forEach((function(e,t){var r=new a({attributes:{}});r.attributes.EXPR_1=t+1,r.attributes.countOFExpr=e,d.push(r)}));var m=new y;return m.features=d,m},t.prototype._getCachedStatistics=function(e,t){var r=this.layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.minValue||e.maxValue?o.reject(new s("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression', 'sqlWhere', 'minValue' or 'maxValue' is specified")):r.queryCachedStatistics(t&&t.name,{signal:e.signal}).then((function(e){var t=e.stats,r=t.min,a=t.max,i=t.avg,s=t.stddev,n=t.sum,o=t.variance,u=t.count;return 0===r&&0===a||(i=0===i?null:i,n=0===n?null:n,s=0===s?null:s,o=0===o?null:o,u=0===u?null:u),null==u&&null!=n&&null!=i&&(u=Math.round(n/i)),{avg:i,count:u,max:a,min:r,stddev:s,sum:n,variance:o}}))},t.prototype._getSummaryStatisticsFromMemory=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a,i,n,o,u,l,p,d;return r.__generator(this,(function(m){switch(m.label){case 0:return a={field:e.field,valueExpression:e.valueExpression,normalizationField:e.normalizationField,view:e.view,signal:e.signal},e.features?(n=e.features,[3,3]):[3,1];case 1:return[4,this._fetchFeaturesForStats(a)];case 2:n=m.sent(),m.label=3;case 3:if(!((i=n)&&i.length))throw new s("scene-layer-adapter:insufficient-data","No features are available to calculate statistics");return o=c.isDateField(t),"percent-of-total"!==(u=r.__assign({},e)).normalizationType?[3,5]:[4,f.calculateStatsFromMemory({field:u.field},i)];case 4:if(l=m.sent(),null==(p=l.sum))throw new s("scene-layer-adapter:invalid","invalid normalizationTotal");u.normalizationTotal=p,m.label=5;case 5:return[4,f.calculateStatsFromMemory(u,i,o)];case 6:return d=m.sent(),[2,f.processSummaryStatisticsResult(d)]}}))}))},t.prototype._getCachedStatisticsForUniqueValues=function(e,t){var r=this,i=this.layer,n=t&&t.name,u=t&&this.getFieldDomain(e.field);return e.valueExpression||e.sqlExpression||e.sqlWhere?o.reject(new s("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression' or 'sqlWhere' is specified")):i.queryCachedStatistics(n,{signal:e.signal}).then((function(s){var u=s.stats;if(!u.mostFrequentValues)return o.reject();var l=s.labels&&s.labels.labels,p={},d=[],m="countOF"+n;u.mostFrequentValues.forEach((function(e){var r=new a({attributes:{}});r.attributes[n]=t&&t.name!==i.objectIdField&&(c.isNumericField(t)||c.isDateField(t))?Number(e.value):e.value,r.attributes[m]=e.count,d.push(r)})),l&&l.forEach((function(e){p[e.value]=e.label}));var h=new y;return h.features=d,f.getUniqueValuesFromFeatureSet(h,r,e.field,p,e.signal)})).then((function(t){return f.createUVResult(t,u,e.returnAllCodedValues)}))},t.prototype._getUniqueValuesFromMemory=function(e,t){var r=t&&this.getFieldDomain(e.field),a={field:e.field,valueExpression:e.valueExpression,view:e.view,signal:e.signal};return(e.features?o.resolve(e.features):this._fetchFeaturesForStats(a)).then((function(t){return f.calculateUniqueValuesFromMemory(e,t,r)}))},t.prototype._getCachedStatisticsForHistogram=function(e,t){var r=this,a=this.layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.normalizationType?o.reject(new s("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression' or 'sqlExpression' or 'sqlWhere' or 'normalizationType' is specified")):a.queryCachedStatistics(t&&t.name,{signal:e.signal}).then((function(t){var a=t.stats,i=e.minValue,s=e.maxValue,n=null!=i?i:a.min,o=null!=s?s:a.max,u=e.numBins||10,l=r._generateFeatureSetForCachedHistogram(a.histogram,n,o,u);return f.getHistogramFromFeatureSet(l,n,o,u)}))},t.prototype._getClassBreaksFromMemory=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,i,n,o,u;return r.__generator(this,(function(l){switch(l.label){case 0:return t={field:e.field,valueExpression:e.valueExpression,normalizationField:e.normalizationField,view:e.view,signal:e.signal},e.features?(i=e.features,[3,3]):[3,1];case 1:return[4,this._fetchFeaturesForStats(t)];case 2:i=l.sent(),l.label=3;case 3:if(!((a=i)&&a.length))throw new s("scene-layer-adapter:insufficient-data","No features are available to calculate statistics");return"percent-of-total"!==(n=r.__assign({},e)).normalizationType?[3,5]:[4,f.calculateStatsFromMemory({field:n.field},a)];case 4:if(o=l.sent(),null==(u=o.sum))throw new s("scene-layer-adapter:invalid","invalid normalizationTotal");n.normalizationTotal=u,l.label=5;case 5:return[2,f.calculateClassBreaksFromMemory(n,a)]}}))}))},t.prototype._getHistogramFromMemory=function(e){var t=this,a={field:e.field,valueExpression:e.valueExpression,normalizationField:e.normalizationField,view:e.view,signal:e.signal};return(e.features?o.resolve(e.features):this._fetchFeaturesForStats(a)).then((function(a){if(!(a&&a.length))throw new s("scene-layer-adapter:insufficient-data","No features are available to calculate histogram");var i=e.field,n=e.normalizationType,u=e.valueExpression,l=e.classificationMethod,c=e.minValue,p=e.maxValue,d=e.view,m=null;if((!l||"equal-interval"===l)&&!n)m=null!=c&&null!=p?o.resolve({min:c,max:p}):t.summaryStatistics({field:i,valueExpression:u,features:a,view:d,signal:e.signal}).then((function(e){return e.count?{min:e.min,max:e.max}:o.reject(new s("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"))}));else{var h=r.__assign({},e);h.features=a,m=t._getBinParamsFromMemory(h)}return m.then((function(t){return f.calculateHistogramFromMemory(e,t,a)}))}))},t.prototype._getBinParamsFromMemory=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,i,s,n,o,u,l,c,d,m=this;return r.__generator(this,(function(r){return t=e.field,a=e.valueExpression,i=e.classificationMethod,s=e.standardDeviationInterval,n=e.normalizationType,o=e.normalizationField,u=e.minValue,l=e.maxValue,c=e.features,d=e.view,[2,this._getClassBreaksFromMemory({field:t,valueExpression:a,normalizationType:n,normalizationField:o,classificationMethod:i,standardDeviationInterval:s,minValue:u,maxValue:l,numClasses:e.numBins,features:c,view:d}).then((function(e){var r=e.normalizationTotal,a=e.classBreakInfos,i=p.getSQLFilterForNormalization({field:t,normalizationType:n,normalizationField:o});return f.generateBinParams({field:t,normalizationType:n,normalizationField:o,normalizationTotal:r,classBreaks:a,where:i,layer:m})}))]}))}))},t.prototype.getField=function(e){return void 0===e&&(e=""),this.layer.getField(e)},t.prototype.getFieldUsageInfo=function(e){var t=this.getField(e);if(!t)return null;var r=this.layer.getFieldUsageInfo(t.name);return{supportsLabelingInfo:r.supportsLabelingInfo,supportsPopupTemplate:r.supportsPopupTemplate,supportsRenderer:r.supportsRenderer,supportsLayerQuery:r.supportsLayerQuery,supportsStatistics:!0}},t.prototype.getFieldDomain=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.getFieldDomain(e,t):null},t.prototype.summaryStatistics=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.summaryStatistics(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatistics(e,r).catch((function(){return o.throwIfAborted(e.signal),t._getSummaryStatisticsFromMemory(e,r)})):this._getSummaryStatisticsFromMemory(e,r)},t.prototype.uniqueValues=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.uniqueValues(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatisticsForUniqueValues(e,r).catch((function(){return o.throwIfAborted(e.signal),t._getUniqueValuesFromMemory(e,r)})):this._getUniqueValuesFromMemory(e,r)},t.prototype.histogram=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.histogram(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatisticsForHistogram(e,r).catch((function(){return o.throwIfAborted(e.signal),t._getHistogramFromMemory(e)})):this._getHistogramFromMemory(e)},t.prototype.classBreaks=function(e){var t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.classBreaks(e):this._hasCachedStatistics(t&&t.name)?o.reject(new s("scene-layer-adapter:not-supported","Cached stats not supported")):this._getClassBreaksFromMemory(e)},t.prototype.queryFeatureCount=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.queryFeatureCount(e,t):o.reject(new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support count query"))},t.prototype.generateRenderer=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.generateRenderer(e,t):o.reject(new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support generateRenderer operation"))},t.prototype.heatmapStatistics=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.heatmapStatistics(e):o.reject(new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support heatmapStatistics operation"))},t.prototype.predominantCategories=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){if(this._featureLayerAdapter)return[2,this._featureLayerAdapter.predominantCategories(e)];throw new s("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support predominantCategories")}))}))},t.prototype.getSampleFeatures=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,s,n,u,l,c,p,d,m;return r.__generator(this,(function(h){switch(h.label){case 0:t=e.view,a=e.sampleSize,s=e.requiredFields,n=e.returnGeometry,u=e.signal,l=1,(c=this.layer.createQuery()).outFields=s,c.returnGeometry=!!n,c.where=null,c.num=a,p=[],h.label=1;case 1:return h.trys.push([1,3,,4]),[4,this._fetchFeaturesFromMemory(t,c,s)];case 2:return(p=h.sent()).length&&a>0&&a<=p.length?[2,i.pickRandom(p,a,l)]:[3,4];case 3:return h.sent(),o.throwIfAborted(u),[3,4];case 4:return d=null,this._featureLayerAdapter?(delete(m=r.__assign({},e)).view,[4,this._featureLayerAdapter.getSampleFeatures(m)]):[3,6];case 5:d=h.sent(),h.label=6;case 6:return d&&d.length?[2,d]:[2,i.pickRandom(p,p.length,l)]}}))}))},t.prototype.load=function(e){var t=this,r=this.layer.load(e).then((function(r){var a=r.associatedLayer;if(t.geometryType=r.geometryType,n.isSome(a))return t._featureLayerAdapter=new m({layer:a}),t._featureLayerAdapter.load(e).then((function(){t.objectIdField=t._featureLayerAdapter.objectIdField,t.supportsSQLExpression=t._featureLayerAdapter.supportsSQLExpression,t.minScale=t._featureLayerAdapter.minScale,t.maxScale=t._featureLayerAdapter.maxScale,t.fullExtent=t._featureLayerAdapter.fullExtent}));t.objectIdField=r.objectIdField,t.supportsSQLExpression=!1,t.hasQueryEngine=!1,t.fullExtent=r.fullExtent}));return this.addResolvingPromise(r),o.resolve(this)},r.__decorate([l.property({constructOnly:!0})],t.prototype,"layer",void 0),t=r.__decorate([l.subclass("esri.smartMapping.support.adapters.SceneLayerAdapter")],t)}(h)}));