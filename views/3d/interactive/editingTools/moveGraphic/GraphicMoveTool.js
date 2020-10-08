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

define(["require","exports","tslib","../../../../../core/Collection","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/handleUtils","../../../../../core/maybe","../../../../../core/accessorSupport/decorators","../../../../../layers/graphics/dehydratedFeatures","../../../../../support/elevationInfoUtils","../../manipulatorUtils","../manipulatorUtils","../visualElementUtils","../manipulations/config","../manipulations/MoveManipulation","../manipulations/moveUtils","../manipulations/MoveXYGraphicManipulation","./isSupportedGraphic","../../visualElements/OutlineVisualElement","../../../layers/graphics/GraphicState","../../../../interactive/dragEventPipeline","../../../../interactive/InteractiveToolBase"],(function(e,t,a,i,n,o,r,l,s,p,u,c,h,v,d,g,f,m,M,y,_,w,E){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GraphicMoveTool=t.GraphicMoveStopEvent=t.GraphicMoveEvent=t.GraphicMoveStartEvent=void 0;var b=function(e){this.allGraphics=e,this.type="graphic-move-start"};t.GraphicMoveStartEvent=b;var G=function(e,t,a){this.dx=e,this.dy=t,this.allGraphics=a,this.type="graphic-move"};t.GraphicMoveEvent=G;var x=function(e){this.allGraphics=e,this.type="graphic-move-stop"};t.GraphicMoveStopEvent=x;var S=function(e){function t(t){var a=e.call(this,t)||this;return a.graphics=new i,a.enableZ=!0,a.type="move-3d",a._toolHandles=new o,a._handles=new o,a}return a.__extends(t,e),t.prototype.initialize=function(){var e=this;this._toolHandles.add([this.graphics.on("change",(function(){return e._refreshManipulators()}))]),this._refreshManipulators()},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null,this._toolHandles.destroy(),this._toolHandles=null,this.graphics.removeAll(),this._set("view",null)},t.prototype.reset=function(){},t.prototype._refreshManipulators=function(){var e=this;this._handles.removeAll(),this._moveManipulation&&this._moveManipulation.destroy(),this.manipulators.removeAll();var t=this.graphics.toArray().filter((function(e){return 0===M.isSupportedGraphic(e)})).map((function(e){return new A(e)}));t.length&&(this.createManipulators(t),this.createVisualElements(t),this._handles.add(t.map((function(t){return e.view.trackGraphicState(t.state)}))),this.updateMoveManipulation(t))},t.prototype.createManipulators=function(e){for(var t=this,i=function(i){var o=i.state;i.manipulationXY=new m.MoveXYGraphicManipulation({tool:n,view:n.view,graphicState:o}),i.manipulationXY.forEachManipulator((function(e){return t._handles.add(e.events.on("immediate-click",(function(e){t.emit("immediate-click",a.__assign(a.__assign({},e),{graphic:o.graphic})),e.stopPropagation()})))})),n._handles.add(i.manipulationXY.createDragPipeline((function(a,i,n){return t.buildDragEventPipeline(a,i,n,e)})))},n=this,o=0,r=e;o<r.length;o++){i(r[o])}this.createMoveManipulation(e)},t.prototype.createMoveManipulation=function(e){var t=this,i=new g.MoveManipulation({tool:this,view:this.view,snapToScene:!1,xyAvailable:!0,xyAxisAvailable:!0,zAvailable:!0,radius:1===e.length?g.MoveManipulation.radiusForSymbol(e[0].graphic.symbol):d.DISC_RADIUS});this._moveManipulation=i,i.elevationInfo={mode:"absolute-height",offset:0},i.forEachManipulator((function(e){t._handles.add(e.events.on("immediate-click",(function(n){i.zManipulation.hasManipulator(e)||1!==t.graphics.length||t.emit("immediate-click",a.__assign(a.__assign({},n),{graphic:t.graphics.getItemAt(0)})),n.stopPropagation()})))}));for(var n=function(){return t.updateMoveManipulation(e)},o=0,r=e;o<r.length;o++){var s=r[o];this._handles.add([s.state.on("changed",n),s.state.watch("displaying",n)])}var p=e[e.length-1];this._handles.add(p.state.on("changed",(function(){return t.updateMoveManipulationAngle(p)}))),this._handles.add(i.createDragPipeline((function(a,i,n){t.buildDragEventPipeline(a,i,n,e)}),u.getGraphicEffectiveElevationInfo(p.graphic),l.unwrap(p.graphic.geometry).spatialReference)),this.updateMoveManipulationAngle(p)},t.prototype.createVisualElements=function(e){for(var t=this,a=function(a){var n=a.graphic,o=v.createVisualElements({view:i.view,graphic:n,forEachManipulator:function(e){a.manipulationXY.forEachManipulator(e),t._moveManipulation.forEachManipulator(e)},onManipulatorsChanged:function(){return r.makeHandle()}});a.geometryRepresentation=o.visualElement,a.geometryRepresentation instanceof y.OutlineVisualElement&&i._handles.add([a.geometryRepresentation.events.on("attachment-origin-changed",(function(){a.state.isDraped||t.updateMoveManipulation(e)})),a.state.watch("isDraped",(function(){return t.updateMoveManipulation(e)}))]),i._handles.add(o)},i=this,n=0,o=e;n<o.length;n++){a(o[n])}},t.prototype.updateMoveManipulationAngle=function(e){this._moveManipulation.angleDeferred=function(){return f.primaryShapeOrientation(e.graphic.geometry)}},t.prototype.updateMoveManipulation=function(e){for(var t=p.makeDehydratedPoint(0,0,0,this.view.spatialReference),a=0,i=!1,n=this._moveManipulation,o=0,r=e;o<r.length;o++){var s=r[o];if(s.state.displaying){var u=s.state.graphic;this.enableZ&&h.canMoveZ(u)&&(i=!0);var v=s.geometryRepresentation instanceof y.OutlineVisualElement&&!s.state.isDraped?s.geometryRepresentation.attachmentOrigin:c.getGraphicAttachmentOrigin(this.view,u);l.isSome(v)&&(t.x+=v.x,t.y+=v.y,t.z+=v.z,a++)}}a>0?(t.x/=a,t.y/=a,t.z/=a,n.location=t,n.xyManipulation.available=!0,n.xyAxisManipulation.available=!0,n.zManipulation.available=i):n.available=!1},t.prototype.buildDragEventPipeline=function(e,t,a,i){var n=this,o=[],r=[],l=null,s=null,p=function(){for(var e=0,t=o;e<t.length;e++){t[e].dragging=!1}o.length=0,r.length=0,l=null,s=null,n._moveManipulation.interactive=!0};t.next((function(t){if("start"===t.action){o.length=0,r.length=0;for(var a=0,p=i;a<p.length;a++){var u=p[a];u.dragging||!u.manipulationXY.hasManipulator(e)&&u.manipulationXY.grabbing||(o.push(u),r.push(u.graphic),u.dragging=!0)}if(0!==r.length&&(n._moveManipulation.interactive=!1,l=w.dragGraphicMany(r),s=w.resetGraphicMany(r),n.emit("graphic-move-start",new b(r)),n.destroyed))return null}return 0!==r.length?t:null})).next((function(e){return l(e)})).next((function(e){switch(e.action){case"start":case"update":if(e.translationX||e.translationY||e.translationZ){var t=n.view.toScreen(e.mapStart),a=n.view.toScreen(e.mapEnd),i=a.x-t.x,o=a.y-t.y;if(n.emit("graphic-move",new G(i,o,r)),n.destroyed)return null}break;case"end":if(n.emit("graphic-move-stop",new x(r)),n.destroyed)return null;p()}})),a.next((function(e){return s(e)})).next((function(){if(n.emit("graphic-move-stop",new x(r)),n.destroyed)return null;p()}))},a.__decorate([s.property({constructOnly:!0,nonNullable:!0})],t.prototype,"view",void 0),a.__decorate([s.property({readOnly:!0})],t.prototype,"graphics",void 0),a.__decorate([s.property({constructOnly:!0,nonNullable:!0})],t.prototype,"enableZ",void 0),a.__decorate([s.property({readOnly:!0})],t.prototype,"type",void 0),t=a.__decorate([s.subclass("esri.views.3d.interactive.editingTools.graphicMove3D.GraphicMoveTool")],t)}(n.EventedMixin(E.InteractiveToolBase));t.GraphicMoveTool=S;var A=function(){function e(e){this.state=null,this.geometryRepresentation=null,this.manipulationXY=null,this.dragging=!1,this.state=new _.GraphicState({graphic:e})}return Object.defineProperty(e.prototype,"graphic",{get:function(){return this.state.graphic},enumerable:!1,configurable:!0}),e}()}));