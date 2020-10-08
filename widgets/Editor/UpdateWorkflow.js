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

define(["require","exports","tslib","../../core/arrayUtils","../../core/maybe","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../views/support/layerViewUtils","./Edits","./UpdateWorkflowData","./Workflow","./workflowUtils"],(function(t,e,i,r,n,a,o,u,d,s,c,f,l){"use strict";return function(t){function e(e){var i=t.call(this,e)||this;return i.type="update",i}var f;return i.__extends(e,t),f=e,e.create=function(t,e,i){var r=new c({edits:new s,viewModel:t}),n=new f({data:r,afterCommit:i});return n._set("steps",this._createWorkflowSteps(n,e)),n},e.prototype.highlight=function(t){var e=this.data.viewModel.view,i=t&&r.find(e.allLayerViews.items,(function(e){return e.layer===t.layer}));d.highlightsSupported(i)&&this.handles.add(i.highlight(t),"candidate-highlight")},e.prototype.unhighlight=function(){this.handles.remove("candidate-highlight")},e._createWorkflowSteps=function(t,e){void 0===e&&(e="awaiting-feature-to-update");var r=t.data,u=t.handles,d={"awaiting-feature-to-update":function(){return{id:"awaiting-feature-to-update",setUp:function(){return i.__awaiter(this,void 0,void 0,(function(){var t,e,n,o,d;return i.__generator(this,(function(s){return t=r.viewModel,e=t.spinnerViewModel,n=t.view,o=null,u.add({remove:function(){o&&(o.abort(),o=null)}},this.id),r.edits.feature=null,d=n.on("immediate-click",(function(t){e.location=t.mapPoint,e.visible=!0,o&&o.abort();var u=r.viewModel.editableItems;o=a.createAbortController(),a.create((function(e,i){a.onAbort(o.signal,(function(){return i(a.createAbortError())})),e(l.fetchCandidates(u,n,t))})).then((function(t){if(r.viewModel.spinnerViewModel.visible=!1,a.throwIfAborted(o),r.candidates=t.reduce((function(t,e){return e.error?t:i.__spreadArrays(t,e.value)}),[]),0!==r.candidates.length)if(1===r.candidates.length){var e=r.candidates[0];r.edits.feature=e,r.viewModel.activeWorkflow.go("editing-existing-feature")}else r.viewModel.activeWorkflow.next()}))})),u.add(d,this.id),[2]}))}))},tearDown:function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(t){return u.remove(this.id),[2]}))}))}}},"awaiting-update-feature-candidate":function(){return{id:"awaiting-update-feature-candidate",setUp:function(){return i.__awaiter(this,void 0,void 0,(function(){var e;return i.__generator(this,(function(i){return(e=r.edits).feature=null,u.add(o.watch(e,"feature",(function(e){t.unhighlight(),t.highlight(e)})),this.id),[2]}))}))},tearDown:function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(e){return t.unhighlight(),u.remove(this.id),[2]}))}))}}},"editing-existing-feature":function(){return{id:"editing-existing-feature",setUp:function(){return i.__awaiter(this,void 0,void 0,(function(){var e,o,d,s=this;return i.__generator(this,(function(c){return e=r.edits.feature,o=r.viewModel,r.editableItem=o.editableItems.find((function(t){return t.layer===e.layer})),d=a.createAbortController(),u.add({remove:function(){return d.abort()}},this.id),[2,l.fetchFullFeature(e,o.view,d).then((function(e){return i.__awaiter(s,void 0,void 0,(function(){var s,c,f,h,g,w,v,_;return i.__generator(this,(function(i){switch(i.label){case 0:return a.isAborted(d)?[2]:(r.edits.updateGeometry(e.geometry),r.edits.updateAttributes(e.attributes),r.edits.trackChanges(),s=e.layer,c=l.findLayerInfo(o.layerInfos,s),f=c&&c.fieldConfig,o.attachmentsViewModel.set({graphic:e,mode:"view"}),o.featureFormViewModel.set({feature:e,fieldConfig:f}),h=[o.featureFormViewModel.on("value-change",(function(){r.edits.updateAttributes(o.featureFormViewModel.getValues()),e.attributes=r.edits.feature.attributes})),o.attachmentsViewModel.watch("mode",(function(t){"add"===t&&r.viewModel.activeWorkflow.go("adding-attachment"),"edit"===t&&r.viewModel.activeWorkflow.go("editing-attachment")}))],s.capabilities.editing.supportsGeometryUpdate?(g=l.getVisualVariableAttributes(e),[4,l.setUpGeometryUpdate(e,g,o.sketchViewModel,o.view,(function(t){var e=t.geometry,i=t.attributes;if(n.isSome(g.rotation)){var a=g.rotation.field;o.featureFormViewModel.setValue(a,i[a])}if(n.isSome(g.size)){a=g.size.field;o.featureFormViewModel.setValue(a,i[a])}r.edits.updateAttributes(i),r.edits.updateGeometry(e)}))]):[3,2]);case 1:return w=i.sent(),v=w.interactive,_=w.visual,h.push(v,_),u.add(v,t._handleKeys.beforeCommit),u.add(_,t._handleKeys.afterCommit),[3,3];case 2:t.highlight(e),i.label=3;case 3:return u.add(h,this.id),[2]}}))}))}))]}))}))},tearDown:function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(e){return r.editableItem=null,r.viewModel.featureFormViewModel.set({feature:null,fieldConfig:null}),u.remove(this.id),t.unhighlight(),[2]}))}))}}},"adding-attachment":function(){return{id:"adding-attachment",parent:"editing-existing-feature",setUp:function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(t){return[2]}))}))},tearDown:function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(t){return[2]}))}))}}},"editing-attachment":function(){return{id:"editing-attachment",parent:"editing-existing-feature",setUp:function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(t){return[2]}))}))},tearDown:function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(t){return[2]}))}))}}}},s=!1;return["awaiting-feature-to-update","awaiting-update-feature-candidate","editing-existing-feature","adding-attachment","editing-attachment"].filter((function(t){return!!s||(s=t===e)})).map((function(t){return d[t]()}))},e=f=i.__decorate([u.subclass("esri.widgets.Editor.UpdateWorkflow")],e)}(f)}));