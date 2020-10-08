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

define(["require","exports","tslib","../intl","../core/Collection","../core/SetUtils","../core/accessorSupport/decorators","./Widget","./Sketch/SketchViewModel","./support/widget"],(function(e,t,o,i,r,a,n,s,l,c){"use strict";var d="esri-sketch",p="esri-sketch--vertical",u="esri-sketch__panel",h="esri-sketch__info-panel",v="esri-sketch__section",y="esri-sketch__tool-section",f="esri-sketch__info-section",_="esri-sketch__info-count-section",b="esri-sketch__feature-count-badge",g="esri-sketch__feature-count-number",w="esri-sketch__button",T="esri-sketch__button--selected",C="esri-icon-map-pin",m="esri-icon-polygon",M="esri-icon-polyline",k="esri-icon-radio-unchecked",O="esri-icon-checkbox-unchecked",B="esri-icon-pan",x="esri-icon-cursor",P="esri-icon-trash",U="esri-icon-undo",R="esri-icon-redo",G="esri-widget",S="esri-icon-edit",D="esri-disabled";return function(e){function t(t,o){var i=e.call(this,t,o)||this;return i._activeCreateOptions=null,i.activeTool=null,i.availableCreateTools=["point","polyline","polygon","rectangle","circle"],i.createGraphic=null,i.creationMode="continuous",i.defaultCreateOptions=null,i.defaultUpdateOptions=null,i.iconClass=S,i.label=void 0,i.layer=null,i.messages=null,i.state=null,i.updateGraphics=new r,i.view=null,i.viewModel=new l,i}return o.__extends(t,e),t.prototype.initialize=function(){var e=this;this.own([this.viewModel.on("create",(function(){return e.scheduleRender()})),this.viewModel.on("update",(function(){return e.scheduleRender()})),this.viewModel.on("create",(function(t){return e._onOperationCreate(t)})),this.viewModel.on("delete",(function(t){return e.emit("delete",t)})),this.viewModel.on("undo",(function(){return e.scheduleRender()})),this.viewModel.on("redo",(function(){return e.scheduleRender()}))])},Object.defineProperty(t.prototype,"layout",{set:function(e){"vertical"!==e&&(e="horizontal"),this._set("layout",e)},enumerable:!1,configurable:!0}),t.prototype.create=function(e,t){this._activeCreateOptions=t||null,this.viewModel.create(e,t)},t.prototype.update=function(e,t){return this.viewModel.update(e,t)},t.prototype.complete=function(){},t.prototype.cancel=function(){},t.prototype.undo=function(){},t.prototype.redo=function(){},t.prototype.delete=function(){},t.prototype.render=function(){var e=this.viewModel.state,t=this.label,o=this.classes(d,G,"disabled"===e?D:null,"vertical"===this.layout?p:null);return c.tsx("div",{"aria-label":t,class:o},c.tsx("div",{class:u},this.renderTopPanelContents()),c.tsx("div",{class:this.classes(u,h)},this.renderInfoPanelContents()))},t.prototype.renderTopPanelContents=function(){var e=this.classes(v,y),t=this.availableCreateTools;return[c.tsx("div",{key:"navigation-button-container",class:e},this.renderNavigationButtons()),t&&t.length?c.tsx("div",{class:e},this.renderDrawButtons()):null,c.tsx("div",{key:"menu-button-container",class:e},this.renderMenuButtons())]},t.prototype.renderInfoPanelContents=function(){if(this.updateGraphics.length)return[c.tsx("div",{class:this.classes(v,f,_),key:"feature-count-container"},this.renderFeatureCount()),c.tsx("div",{class:this.classes(v,f),key:"delete-button-container"},this.renderDeleteButton())]},t.prototype.renderFeatureCount=function(){var e=this.layout,t=this.messages,o=this.updateGraphics.length,r=i.substitute(1===o?t.featureCount:t.featuresCount,{count:o});return c.tsx("div",{class:b,"aria-label":r},c.tsx("span",{class:g},"vertical"===e?o:r))},t.prototype.renderDeleteButton=function(){var e=this.messages.deleteFeature;return c.tsx("button",{"aria-label":e,bind:this,class:this.classes(w,P),onclick:this.delete,title:e,type:"button"})},t.prototype.renderNavigationButtons=function(){return[this.renderTransformButton(),this.renderReshapeButton()]},t.prototype.renderTransformButton=function(){var e=this.messages.transform,t=[w,B],o=this.viewModel.defaultUpdateOptions.tool,i=!("transform"!==this.activeTool&&"move"!==this.activeTool);return("ready"===this.state&&"transform"===o||i)&&t.push(T),c.tsx("button",{"aria-label":e,bind:this,class:this.classes(t),onclick:this._activateTransformTool,title:e,type:"button"})},t.prototype.renderReshapeButton=function(){var e=this.messages.reshape,t=[w,x],o=this.viewModel.defaultUpdateOptions.tool,i=this.updateGraphics.length>1;return("ready"===this.state&&"reshape"===o||"reshape"===this.activeTool)&&t.push(T),c.tsx("button",{"aria-label":e,bind:this,class:this.classes(t),onclick:this._activateReshapeTool,disabled:i,title:e})},t.prototype.renderDrawButtons=function(){var e=this;return this.availableCreateTools.map((function(t){return"point"===t?e.renderPointButton():"polyline"===t?e.renderPolylineButton():"polygon"===t?e.renderPolygonButton():"rectangle"===t?e.renderRectangleButton():"circle"===t?e.renderCircleButton():void 0}))},t.prototype.renderPointButton=function(){var e=this.messages.drawPoint,t=[w,C];return"point"===this.activeTool&&t.push(T),c.tsx("button",{"aria-label":e,bind:this,class:this.classes(t),onclick:this._activateCreatePoint,title:e,type:"button"})},t.prototype.renderPolygonButton=function(){var e=this.messages.drawPolygon,t=[w,m];return"polygon"===this.activeTool&&t.push(T),c.tsx("button",{"aria-label":e,bind:this,class:this.classes(t),onclick:this._activateCreatePolygon,title:e,type:"button"})},t.prototype.renderPolylineButton=function(){var e=this.messages.drawPolyline,t=[w,M];return"polyline"===this.activeTool&&t.push(T),c.tsx("button",{"aria-label":e,bind:this,class:this.classes(t),onclick:this._activateCreatePolyline,title:e,type:"button"})},t.prototype.renderCircleButton=function(){var e=this.messages.drawCircle,t=[w,k];return"circle"===this.activeTool&&t.push(T),c.tsx("button",{"aria-label":e,bind:this,class:this.classes(t),onclick:this._activateCreateCircle,title:e,type:"button"})},t.prototype.renderRectangleButton=function(){var e=this.messages.drawRectangle,t=[w,O];return"rectangle"===this.activeTool&&t.push(T),c.tsx("button",{"aria-label":e,bind:this,class:this.classes(t),onclick:this._activateCreateRectangle,title:e,type:"button"})},t.prototype.renderMenuButtons=function(){return[this.renderUndoButton(),this.renderRedoButton()]},t.prototype.renderUndoButton=function(){var e=this.messages.undo,t=!this.viewModel.canUndo(),o=c.isRTL()?R:U;return c.tsx("button",{"aria-label":e,bind:this,class:this.classes(w,o),disabled:t,onclick:this.undo,title:e,type:"button"})},t.prototype.renderRedoButton=function(){var e=this.messages.redo,t=!this.viewModel.canRedo(),o=c.isRTL()?U:R;return c.tsx("button",{"aria-label":e,bind:this,class:this.classes(w,o),disabled:t,onclick:this.redo,title:e,type:"button"})},t.prototype._isUpdateToolActive=function(){return!("transform"!==this.activeTool&&"reshape"!==this.activeTool&&"move"!==this.activeTool)},t.prototype._onOperationCreate=function(e){if("complete"===e.state){var t=this.creationMode;if("create"===e.type){var o=e,i=o.tool,r=o.graphic,a=this._activeCreateOptions;this._activeCreateOptions=null,"continuous"===t?this.create(i,a):"update"===t&&this.update([r])}}},t.prototype._modifyDefaultUpdateTool=function(e){this.viewModel.defaultUpdateOptions&&(this.viewModel.defaultUpdateOptions.tool=e)},t.prototype._activateTransformTool=function(){"active"!==this.state||this._isUpdateToolActive()?"reshape"===this.activeTool&&this.viewModel.toggleUpdateTool():this.viewModel.cancel(),this._modifyDefaultUpdateTool("transform")},t.prototype._activateReshapeTool=function(){"active"!==this.state||this._isUpdateToolActive()||this.viewModel.cancel(),"transform"===this.activeTool&&1===this.updateGraphics.length&&this.viewModel.toggleUpdateTool(),this._modifyDefaultUpdateTool("reshape")},t.prototype._activateCreatePoint=function(){this._activateCreateTool("point")},t.prototype._activateCreatePolygon=function(){this._activateCreateTool("polygon")},t.prototype._activateCreatePolyline=function(){this._activateCreateTool("polyline")},t.prototype._activateCreateCircle=function(){this._activateCreateTool("circle")},t.prototype._activateCreateRectangle=function(){this._activateCreateTool("rectangle")},t.prototype._activateCreateTool=function(e){this.activeTool===e?this.cancel():this.create(e)},o.__decorate([n.aliasOf("viewModel.activeTool"),c.renderable()],t.prototype,"activeTool",void 0),o.__decorate([n.property({cast:function(e){if(!e||!e.length)return null;var t=a.SetFromValues(["point","polyline","polygon","rectangle","circle"]);return e.filter((function(e){return t.has(e)}))}}),c.renderable()],t.prototype,"availableCreateTools",void 0),o.__decorate([n.aliasOf("viewModel.createGraphic"),c.renderable()],t.prototype,"createGraphic",void 0),o.__decorate([n.property()],t.prototype,"creationMode",void 0),o.__decorate([n.aliasOf("viewModel.defaultCreateOptions"),c.renderable()],t.prototype,"defaultCreateOptions",void 0),o.__decorate([n.aliasOf("viewModel.defaultUpdateOptions"),c.renderable()],t.prototype,"defaultUpdateOptions",void 0),o.__decorate([n.property()],t.prototype,"iconClass",void 0),o.__decorate([n.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],t.prototype,"label",void 0),o.__decorate([n.aliasOf("viewModel.layer"),c.renderable()],t.prototype,"layer",void 0),o.__decorate([n.property({value:"horizontal"}),c.renderable()],t.prototype,"layout",null),o.__decorate([n.property(),c.renderable(),c.messageBundle("esri/widgets/Sketch/t9n/Sketch")],t.prototype,"messages",void 0),o.__decorate([n.aliasOf("viewModel.state"),c.renderable()],t.prototype,"state",void 0),o.__decorate([n.aliasOf("viewModel.updateGraphics"),c.renderable(["updateGraphics","updateGraphics.length"])],t.prototype,"updateGraphics",void 0),o.__decorate([n.aliasOf("viewModel.view"),c.renderable()],t.prototype,"view",void 0),o.__decorate([n.property(),c.renderable("viewModel.state"),c.vmEvent(["create","update","undo","redo"])],t.prototype,"viewModel",void 0),o.__decorate([n.aliasOf("viewModel.complete")],t.prototype,"complete",null),o.__decorate([n.aliasOf("viewModel.cancel")],t.prototype,"cancel",null),o.__decorate([n.aliasOf("viewModel.undo")],t.prototype,"undo",null),o.__decorate([n.aliasOf("viewModel.redo")],t.prototype,"redo",null),o.__decorate([n.aliasOf("viewModel.delete")],t.prototype,"delete",null),t=o.__decorate([n.subclass("esri.widgets.Sketch")],t)}(s)}));