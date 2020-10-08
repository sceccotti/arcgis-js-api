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

define(["require","exports","tslib","../../../request","../../../core/Error","../../../core/has","../../../core/lang","../../../core/Loadable","../../../core/maybe","../../../core/promiseUtils","../../../core/SetUtils","../../../core/urlUtils","../../../core/accessorSupport/decorators","../../../tasks/QueryTask","../../../tasks/operations/queryAttachments","../../../tasks/operations/zscale"],(function(e,t,r,a,n,s,u,o,i,l,c,d,p,h,y,f){"use strict";function m(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){return"string"==typeof e?[2,d.dataComponents(e)||{data:e}]:[2,l.create((function(t,r){var a=new FileReader;a.readAsDataURL(e),a.onload=function(){return t(d.dataComponents(a.result))},a.onerror=function(e){return r(e)}}))]}))}))}Object.defineProperty(t,"__esModule",{value:!0});var _=c.SetFromValues(["Feature Layer","Table"]),b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="feature-layer",t}return r.__extends(t,e),t.prototype.load=function(e){var t=i.isSome(e)?e.signal:null;return this.addResolvingPromise(this._fetchService(t)),l.resolve(this)},Object.defineProperty(t.prototype,"queryTask",{get:function(){var e=this.layer,t=e.capabilities.query.supportsFormatPBF,r=e.parsedUrl,a=e.dynamicDataSource,n=e.gdbVersion,u=e.spatialReference,o=s("featurelayer-pbf")&&t?"pbf":"json";return new h({url:r.path,format:o,dynamicDataSource:a,gdbVersion:n,sourceSpatialReference:u})},enumerable:!1,configurable:!0}),t.prototype.addAttachment=function(e,t){var r=this;return this.load().then((function(){var n=e.attributes[r.layer.objectIdField],s=r.layer.parsedUrl.path+"/"+n+"/addAttachment",u=r._getLayerRequestOptions(),o=r._getFormDataForAttachment(t,u);return a(s,{body:o}).then((function(e){return r._createFeatureEditResult(e.data.addAttachmentResult)})).catch((function(e){throw r._createAttachmentErrorResult(n,e)}))}))},t.prototype.updateAttachment=function(e,t,r){var n=this;return this.load().then((function(){var s=e.attributes[n.layer.objectIdField],u=n.layer.parsedUrl.path+"/"+s+"/updateAttachment",o=n._getLayerRequestOptions({query:{attachmentId:t}}),i=n._getFormDataForAttachment(r,o);return a(u,{body:i}).then((function(e){return n._createFeatureEditResult(e.data.updateAttachmentResult)})).catch((function(e){throw n._createAttachmentErrorResult(s,e)}))}))},t.prototype.applyEdits=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,s,u,o,i,l,c,d,p,h,y,m,_,b,g,v,F,R;return r.__generator(this,(function(I){switch(I.label){case 0:return[4,this.load()];case 1:I.sent(),n=e.addFeatures.map(this._serializeFeature,this),s=e.updateFeatures.map(this._serializeFeature,this),u=this._getFeatureIds(e.deleteFeatures),f.unapplyEditsZUnitScaling(n,s,this.layer.spatialReference),o=[],i=[],l=r.__spreadArrays(e.deleteAttachments),c=0,d=e.addAttachments,I.label=2;case 2:return c<d.length?(_=d[c],h=(p=o).push,[4,this._serializeAttachment(_)]):[3,5];case 3:h.apply(p,[I.sent()]),I.label=4;case 4:return c++,[3,2];case 5:y=0,m=e.updateAttachments,I.label=6;case 6:return y<m.length?(_=m[y],g=(b=i).push,[4,this._serializeAttachment(_)]):[3,9];case 7:g.apply(b,[I.sent()]),I.label=8;case 8:return y++,[3,6];case 9:return v=o.length||i.length||l.length?{adds:o,updates:i,deletes:l}:null,F=this._getLayerRequestOptions({method:"post",query:{adds:n.length?JSON.stringify(n):null,updates:s.length?JSON.stringify(s):null,deletes:u.length?u.join(","):null,gdbVersion:null==t?void 0:t.gdbVersion,rollbackOnFailure:null==t?void 0:t.rollbackOnFailureEnabled,useGlobalIds:null==t?void 0:t.globalIdUsed,attachments:v&&JSON.stringify(v)}}),[4,a(this.layer.parsedUrl.path+"/applyEdits",F)];case 10:return R=I.sent(),[2,this._createEditsResult(R)]}}))}))},t.prototype.deleteAttachments=function(e,t){var r=this;return this.load().then((function(){var n=e.attributes[r.layer.objectIdField],s=r.layer.parsedUrl.path+"/"+n+"/deleteAttachments";return a(s,r._getLayerRequestOptions({query:{attachmentIds:t.join(",")},method:"post"})).then((function(e){return e.data.deleteAttachmentResults.map(r._createFeatureEditResult)})).catch((function(e){throw r._createAttachmentErrorResult(n,e)}))}))},t.prototype.queryAttachments=function(e,t){var r=this;void 0===t&&(t={});var n=this.layer.parsedUrl.path;return this.load().then((function(){var s=r._getLayerRequestOptions(t);if(!r.layer.get("capabilities.operations.supportsQueryAttachments")){for(var u=e.objectIds,o=[],i=0,c=u;i<c.length;i++){var d=c[i],p=n+"/"+d+"/attachments";o.push(a(p,s))}return l.all(o).then((function(e){return u.map((function(t,r){return{parentObjectId:t,attachmentInfos:e[r].data.attachmentInfos}}))})).then((function(e){return y.processAttachmentQueryResult(e,n)}))}return r.queryTask.executeAttachmentQuery(e,s)}))},t.prototype.queryFeatures=function(e,t){var r=this;return this.load().then((function(){return r.queryTask.execute(e,t)}))},t.prototype.queryFeaturesJSON=function(e,t){var r=this;return this.load().then((function(){return r.queryTask.executeJSON(e,t)}))},t.prototype.queryObjectIds=function(e,t){var r=this;return this.load().then((function(){return r.queryTask.executeForIds(e,t)}))},t.prototype.queryFeatureCount=function(e,t){var r=this;return this.load().then((function(){return r.queryTask.executeForCount(e,t)}))},t.prototype.queryExtent=function(e,t){var r=this;return this.load().then((function(){return r.queryTask.executeForExtent(e,t)}))},t.prototype.queryRelatedFeatures=function(e,t){var r=this;return this.load().then((function(){return r.queryTask.executeRelationshipQuery(e,t)}))},t.prototype.queryRelatedFeaturesCount=function(e,t){var r=this;return this.load().then((function(){return r.queryTask.executeRelationshipQueryForCount(e,t)}))},t.prototype._fetchService=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,u,o;return r.__generator(this,(function(r){switch(r.label){case 0:return(t=this.layer.sourceJSON)?(this.sourceJSON=t,[3,3]):[3,1];case 1:return[4,a(this.layer.parsedUrl.path,this._getLayerRequestOptions({query:s("featurelayer-advanced-symbols")?{returnAdvancedSymbols:!0}:{},signal:e}))];case 2:u=r.sent().data,this.sourceJSON=u,r.label=3;case 3:if(o=this.sourceJSON.type,!_.has(o))throw new n("feature-layer-source:unsupported-type",'Source type "'+o+'" is not supported');return[2]}}))}))},t.prototype._serializeFeature=function(e){var t=e.geometry,r=e.attributes;return i.isNone(t)?{attributes:r}:"mesh"===t.type||"extent"===t.type?null:{geometry:t.toJSON(),attributes:r}},t.prototype._serializeAttachment=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,a,n,s,u,o,i,l,c;return r.__generator(this,(function(r){switch(r.label){case 0:return t=e.feature,a=e.attachment,n=a.globalId,s=a.name,u=a.contentType,o=a.data,i=a.uploadId,l={globalId:n,parentGlobalId:null,contentType:null,name:null,uploadId:null,data:null},t&&(l.parentGlobalId="attributes"in t?t.attributes&&t.attributes[this.layer.globalIdField]:t.globalId),i?(l.uploadId=i,[3,3]):[3,1];case 1:return o?[4,m(o)]:[3,3];case 2:c=r.sent(),l.contentType=c.mediaType,l.data=c.data,o instanceof File&&(l.name=o.name),r.label=3;case 3:return s&&(l.name=s),u&&(l.contentType=u),[2,l]}}))}))},t.prototype._getFeatureIds=function(e){var t=e[0];return t?"objectId"in t?this._getIdsFromFeatureIdentifier(e):this._getIdsFromFeatures(e):[]},t.prototype._getIdsFromFeatures=function(e){var t=this.layer.objectIdField;return e.map((function(e){return e.attributes&&e.attributes[t]}))},t.prototype._getIdsFromFeatureIdentifier=function(e){return e.map((function(e){return e.objectId}))},t.prototype._createEditsResult=function(e){var t=e.data,r=e.data&&e.data.attachments;return{addFeatureResults:t.addResults?t.addResults.map(this._createFeatureEditResult,this):[],updateFeatureResults:t.updateResults?t.updateResults.map(this._createFeatureEditResult,this):[],deleteFeatureResults:t.deleteResults?t.deleteResults.map(this._createFeatureEditResult,this):[],addAttachmentResults:r&&r.addResults?r.addResults.map(this._createFeatureEditResult,this):[],updateAttachmentResults:r&&r.updateResults?r.updateResults.map(this._createFeatureEditResult,this):[],deleteAttachmentResults:r&&r.deleteResults?r.deleteResults.map(this._createFeatureEditResult,this):[]}},t.prototype._createFeatureEditResult=function(e){var t=!0===e.success?null:e.error||{code:void 0,description:void 0};return{objectId:e.objectId,globalId:e.globalId,error:t?new n("feature-layer-source:edit-failure",t.description,{code:t.code}):null}},t.prototype._createAttachmentErrorResult=function(e,t){var r=t.details.messages&&t.details.messages[0]||t.message,a=t.details.httpStatus||t.details.messageCode;return{objectId:e,globalId:null,error:new n("feature-layer-source:attachment-failure",r,{code:a})}},t.prototype._getFormDataForAttachment=function(e,t){var r=e instanceof FormData?e:e&&e.elements?new FormData(e):null;if(r)for(var a in t){var n=t[a];null!=n&&(r.set?r.set(a,n):r.append(a,n))}return r},t.prototype._getLayerRequestOptions=function(e){void 0===e&&(e={});var t=this.layer,a=t.parsedUrl,n=t.gdbVersion,s=t.dynamicDataSource;return r.__assign(r.__assign({},e),{query:u.fixJson(r.__assign(r.__assign(r.__assign({gdbVersion:n,layer:s?JSON.stringify({source:s}):void 0},a.query),{f:"json"}),null==e?void 0:e.query)),responseType:"json"})},r.__decorate([p.property()],t.prototype,"type",void 0),r.__decorate([p.property({constructOnly:!0})],t.prototype,"layer",void 0),r.__decorate([p.property({readOnly:!0,dependsOn:["layer.parsedUrl","layer.gdbVersion","layer.dynamicDataSource"]})],t.prototype,"queryTask",null),t=r.__decorate([p.subclass("esri.layers.graphics.sources.FeatureLayerSource")],t)}(o);t.default=b}));