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

define(["require","exports","tslib","../../../../../../core/has","../../../../../../core/maybe","../../../../../../core/promiseUtils","../../definitions","../../enums","../MeshData","../VertexVector","../templates/WGLLabelTemplate","../templates/WGLMarkerTemplate","../templates/WGLTemplateStore"],(function(e,t,r,i,a,o,s,n,l,p,y,m,u){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WGLMeshFactory=void 0;var c=function(){function e(e,t,r){this._isDD=!1,this._geometryType=e,this._idField=t,this._templateStore=r}return e.prototype.update=function(e,t){this._isDD="simple"===e.mesh.matcher.type&&e.mesh.matcher.isDotDensity,a.isSome(e.mesh.labels)&&this._setLabelTemplates(e.mesh.labels,t)},e.prototype._setLabelTemplates=function(e,t){this._labelTemplates=e.map((function(e){return y.default.fromLabelClass(e,t)}))},Object.defineProperty(e.prototype,"templates",{get:function(){return this._templateStore},enumerable:!1,configurable:!0}),e.prototype.createMeshData=function(e){var t=new Array(5),r=this._labelTemplates&&this._labelTemplates.length>0,i="esriGeometryPolyline"===this._geometryType?s.HEURISTIC_GLYPHS_PER_LINE:s.HEURISTIC_GLYPHS_PER_FEATURE;return t[n.WGLGeometryType.MARKER]=new p.VertexVectors(n.WGLGeometryType.MARKER,4*e),t[n.WGLGeometryType.FILL]=new p.VertexVectors(n.WGLGeometryType.FILL,e,this._isDD),t[n.WGLGeometryType.LINE]=new p.VertexVectors(n.WGLGeometryType.LINE,e),t[n.WGLGeometryType.TEXT]=new p.VertexVectors(n.WGLGeometryType.TEXT,4*e),t[n.WGLGeometryType.LABEL]=new p.VertexVectors(n.WGLGeometryType.LABEL,r?4*i:0),new l.MeshData(t,{features:e,records:e,metrics:0})},e.prototype.analyze=function(e,t,i,a,s){return r.__awaiter(this,void 0,void 0,(function(){var n,l,p,y,m,c,h;return r.__generator(this,(function(r){switch(r.label){case 0:return o.isAborted(s)?[2]:"dictionary"!==t.type?[3,2]:[4,t.analyze(this._idField,e.copy(),i,a,s)];case 1:n=r.sent(),r.label=2;case 2:for(l=0;e.next();)if(p=void 0,p=n?n[l++]:t.match(this._idField,e,this._geometryType,i,a),e.setGroupId(p),u.isDynamicId(p))for(y=this._templateStore.getDynamicTemplateGroup(p),m=0,c=y;m<c.length;m++)(h=c[m])&&h.analyze&&h.analyze(this._templateStore,e,i,a);return[2,this._templateStore.finalize(s)]}}))}))},e.prototype.analyzeGraphics=function(e,t,i,a,s){return r.__awaiter(this,void 0,void 0,(function(){var n,l,p,y,m,c;return r.__generator(this,(function(r){switch(r.label){case 0:return o.isAborted(s)?[2]:(n=e.getCursor(),t?[4,t.analyze(this._idField,n.copy(),i,a,s)]:[3,2]);case 1:r.sent(),r.label=2;case 2:for(;n.next();){if(null!=(l=n.getGroupId())&&-1!==l||(l=t.match(this._idField,n,n.geometryType,i,a),n.setGroupId(l)),u.isDynamicId(l))for(p=this._templateStore.getDynamicTemplateGroup(l),y=0,m=p;y<m.length;y++)(c=m[y])&&c.analyze&&c.analyze(this._templateStore,n,i,a);n.setGroupId(l)}return[2,this._templateStore.finalize(s)]}}))}))},e.prototype.writeGraphic=function(e,t){var r=t.getGroupId(),a=t.getDisplayId(),o=this._templateStore.getTemplateGroup(r),s=t.geometryType;if(null!=a){if(u.isDynamicId(r))for(var n=0,l=o;n<l.length;n++){(m=l[n]).bindFeature(t,null,null)}if(o){e.writeDisplayObject(a,t.readGraphic().insertAfter);for(var p=0,y=o;p<y.length;p++){var m;if(m=y[p]){var c=e.get(m.geometryType);m.writeMesh(e,c,t,s,a)}}}}else i("esri-2d-debug")&&console.debug("Got null id for feature")},e.prototype.writeCursor=function(e,t,r,o,s,n){var l=t.getGroupId(),p=t.getDisplayId(),y=this._templateStore.getTemplateGroup(l);if(null!=p){if(y){if(e.writeDisplayObject(p,0),u.isDynamicId(l))for(var m=0,c=y;m<c.length;m++){(d=c[m]).bindFeature(t,r,o)}for(var h=0,f=y;h<f.length;h++){var d=f[h],_=e.get(d.geometryType);!d.needsPixelBuffer&&t.hasFilter()||d.writeMesh(e,_,t,this._geometryType,p)}var G=e.hasDisplayRecords();if(a.isSome(n)&&G){var T=n&&this._findLabelRef(y);this._writeLabels(e,t,p,n,T,s)}e.endDisplayObject()}}else i("esri-2d-debug")&&console.debug("Got null id for feature")},e.prototype._findLabelRef=function(e){for(var t=0,r=e;t<r.length;t++){var i=r[t];if(i instanceof m.default)return i}return null},e.prototype._writeLabels=function(e,t,r,i,o,s){for(var n=0,l=i;n<l.length;n++){var p=l[n];if(a.isSome(p)&&p){var y=p.glyphs,m=p.rtl,u=p.index,c=this._labelTemplates[u],h=e.get(c.geometryType);c.bindReferenceTemplate(o),c.bindTextInfo(y,m),c.writeMesh(e,h,t,this._geometryType,r,s)}}},e}();t.WGLMeshFactory=c}));