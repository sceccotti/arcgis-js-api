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

define(["require","exports","tslib","../../../core/Collection","../../../core/events","../../../core/HandleOwner","../../../core/maybe","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../Widget","./GridViewModel","../../support/widget","@dojo/framework/shim/Promise","./../../../libs/vaadin-grid/webcomponents"],(function(e,t,o,i,r,n,s,d,l,a,c,u){"use strict";new Promise((function(t,o){e(["./../../../libs/vaadin-grid/index"],t,o)}));var p={selectionColumn:!0},h="esri-grid",v="esri-grid__content",_="esri-grid__grid",m="esri-widget";return function(e){function t(t,r){var n=e.call(this,t,r)||this;return n._grid=null,n._headerStyles="display: flex; font-weight: 400;",n._hostStyles='font-family: "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 1em;',n._rowHoverStyles="background: #e2f1fb;",n.cellClassNameGenerator=null,n.columnReorderingEnabled=!0,n.dataProvider=null,n.itemIdPath=null,n.label=void 0,n.messages=null,n.pageSize=50,n.selectedItems=new i,n.size=null,n.rowDetailsRenderer=null,n.store=null,n.viewModel=new c,n.visibleElements=o.__assign({},p),n}return o.__extends(t,e),t.prototype.initialize=function(){var e=this;this.handles.add([d.watch(this,"viewModel.size",(function(){return e._updateGridSize()})),d.watch(this,"store.state",(function(t,o){"ready"===t&&"loaded"===o&&e.refreshCache()}))])},t.prototype.castVisibleElements=function(e){return o.__assign(o.__assign({},p),e)},t.prototype.render=function(){return u.tsx("div",{bind:this,class:this.classes(h,m)},u.tsx("div",{bind:this,class:v},this.renderGrid()))},t.prototype.renderGrid=function(){return u.tsx("vaadin-grid",o.__assign({},this.getGridProps()),this.renderAllColumns())},t.prototype.renderAllColumns=function(){if("disabled"!==this.viewModel.state&&this.columns&&this.columns.length)return[this.renderSelectionColumn(),this.renderColumns()]},t.prototype.renderSelectionColumn=function(){return u.tsx("vaadin-grid-selection-column",{_selectAllHidden:!0,selectAll:!1,bind:this,hidden:!this.visibleElements.selectionColumn,sortable:!1,frozen:!u.isRTL()})},t.prototype.renderColumns=function(){var e=this;return this.columns.items.map((function(t,i){return u.tsx("vaadin-grid-column",o.__assign({},e.getColumnProps(t,i)))}))},t.prototype.getGridProps=function(){var e=this.columnReorderingEnabled,t=this.id,o=this.pageSize,i=this.size;return{_safari:!1,class:_,id:t+"_grid",theme:"compact column-borders",ref:"grid",bind:this,afterCreate:this._afterGridCreate,afterUpdate:this._afterGridUpdate,columnReorderingAllowed:e,pageSize:o,size:i}},t.prototype.getColumnProps=function(e,t){var o=this.id,i=e.autoWidth,r=e.direction,n=e.flexGrow,d=e.frozen,l=e.header,a=e.hidden,c=e.path,u=e.resizable,p=e.textAlign,h=e.width;return{autoWidth:i,direction:r,flexGrow:n,frozen:d,header:l,hidden:a,key:o+"_"+name+"_"+(s.isSome(t)?t:c),path:c,resizable:u,"text-align":p,width:"number"==typeof h?h+"px":h,bind:this,afterCreate:this._afterColumnCreateOrUpdate,afterUpdate:this._afterColumnCreateOrUpdate}},t.prototype.clearSelection=function(){this._clearSelection(),this.scheduleRender()},t.prototype.clearSort=function(){this.columns.forEach((function(e){return e.direction=null})),this._grid&&(this._grid._sorters=[]),this.scheduleRender()},t.prototype.deselectItem=function(e){this._deselectRowByItem(e)},t.prototype.deselectRow=function(e){var t=this.viewModel.getRowItemAt(e);t&&this._deselectRowByItem(t)},t.prototype.findColumn=function(){},t.prototype.generateCellClassNames=function(){var e;null===(e=this._grid)||void 0===e||e.generateCellClassNames()},t.prototype.getSlotElementByName=function(e){var t,o;return null===(o=null===(t=this._grid)||void 0===t?void 0:t.shadowRoot)||void 0===o?void 0:o.querySelector("slot[name='"+e+"']")},t.prototype.hideColumn=function(e){var t;null===(t=this.viewModel)||void 0===t||t.hideColumn(e),this.scheduleRender()},t.prototype.notifyResize=function(){var e;null===(e=this._grid)||void 0===e||e.notifyResize()},t.prototype.recalculateColumnWidths=function(){var e;null===(e=this._grid)||void 0===e||e.recalculateColumnWidths()},t.prototype.refresh=function(){var e,t;return o.__awaiter(this,void 0,void 0,(function(){return o.__generator(this,(function(o){switch(o.label){case 0:return this._clearSelection(),null===(e=this.store)||void 0===e||e.reset(),[4,null===(t=this.store)||void 0===t?void 0:t.load()];case 1:return o.sent(),this.refreshCache(),[2]}}))}))},t.prototype.refreshCache=function(){var e;null===(e=this._grid)||void 0===e||e.clearCache()},t.prototype.selectItem=function(e){this._selectRowByItem(e)},t.prototype.selectRow=function(e){var t=this.viewModel.getRowItemAt(e);t&&this._selectRowByItem(t)},t.prototype.showColumn=function(e){var t;null===(t=this.viewModel)||void 0===t||t.showColumn(e),this.scheduleRender()},t.prototype.sort=function(e){var t,o=e.path,i=e.direction;null===(t=this.viewModel)||void 0===t||t.sortColumn(o,i)},t.prototype._afterGridCreate=function(e){var t=this,o=this.cellClassNameGenerator,i=this.dataProvider,r=this.itemIdPath,n=this.rowDetailsRenderer;e.cellClassNameGenerator=o,e.dataProvider=i,e.rowDetailsRenderer=n,e.itemIdPath=r,this._grid=e,customElements.whenDefined("vaadin-grid").then((function(){t._appendStyles(),t._addGridEventListeners()}))},t.prototype._afterGridUpdate=function(e){this._grid||(this._grid=e)},t.prototype._afterColumnCreateOrUpdate=function(e){this._syncColumnRenderers(e)},t.prototype._appendStyles=function(){var e,t=null===(e=this._grid)||void 0===e?void 0:e.shadowRoot,o=document.createElement("style");o.textContent="\n      :host { "+this._hostStyles+' }\n      [part~="header-cell"] ::slotted(vaadin-grid-cell-content) { '+this._headerStyles+' }\n      [part~="row"]:hover [part~="body-cell"] { '+this._rowHoverStyles+" }\n    ",null==t||t.appendChild(o)},t.prototype._updateGridSize=function(){this._grid&&(this._grid.size=this.size||0,this.scheduleRender())},t.prototype._addGridEventListeners=function(){var e=this,t=this._grid;this.handles.add([r.on(t,"click",(function(t){return e._onRowClick(t)})),r.on(t,"selected-items-changed",(function(t){return e._onSelectionChange(t)}))])},t.prototype._onRowClick=function(e){var t=this._grid.getEventContext(event),o=t.item,i=t.section;o&&i&&"details"!==i&&"header"!==i&&this.emit("row-click",{context:t,native:e})},t.prototype._selectRowByItem=function(e){var t;null===(t=this._grid)||void 0===t||t.selectItem(e)},t.prototype._deselectRowByItem=function(e){var t;null===(t=this._grid)||void 0===t||t.deselectItem(e)},t.prototype._clearSelection=function(){var e,t=this;(null===(e=this._grid)||void 0===e?void 0:e.selectedItems)&&(this._grid.selectedItems.slice().forEach((function(e){return t._deselectRowByItem(e)})),this._updateSelectionProps())},t.prototype._onSelectionChange=function(e){var t=e;if(this._updateSelectionProps(),"selectedItems.splices"===t.detail.path){var o=t.detail.value.indexSplices[0],i=o.removed,r=o.index,n=o.object;this.emit("selection-change",{index:r,added:n,removed:i})}},t.prototype._updateSelectionProps=function(){this.selectedItems.length&&this.selectedItems.removeAll(),this._grid&&this.selectedItems.addMany(this._grid.selectedItems)},t.prototype._syncColumnRenderers=function(e){var t=e.getAttribute("path"),o=this.viewModel.findColumn(t);if(o)try{o.renderFunction&&(e.renderer=function(e,t,i){return o.renderFunction({root:e,column:t,rowData:i})}),o.footerRenderFunction&&(e.footerRenderer=function(e,t){return o.footerRenderFunction({root:e,column:t})}),o.headerRenderFunction&&(e.headerRenderer=function(e,t){return o.headerRenderFunction({root:e,column:t})})}catch(e){}},o.__decorate([l.property()],t.prototype,"_grid",void 0),o.__decorate([l.aliasOf("viewModel.cellClassNameGenerator")],t.prototype,"cellClassNameGenerator",void 0),o.__decorate([l.aliasOf("viewModel.columns")],t.prototype,"columns",void 0),o.__decorate([l.aliasOf("viewModel.columnReorderingEnabled")],t.prototype,"columnReorderingEnabled",void 0),o.__decorate([l.aliasOf("viewModel.dataProvider")],t.prototype,"dataProvider",void 0),o.__decorate([l.property()],t.prototype,"itemIdPath",void 0),o.__decorate([l.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],t.prototype,"label",void 0),o.__decorate([l.property(),u.renderable(),u.messageBundle("esri/widgets/FeatureTable/t9n/FeatureTable")],t.prototype,"messages",void 0),o.__decorate([l.aliasOf("viewModel.pageSize")],t.prototype,"pageSize",void 0),o.__decorate([l.property({readOnly:!0}),u.renderable()],t.prototype,"selectedItems",void 0),o.__decorate([l.aliasOf("viewModel.size")],t.prototype,"size",void 0),o.__decorate([l.aliasOf("viewModel.rowDetailsRenderer")],t.prototype,"rowDetailsRenderer",void 0),o.__decorate([l.aliasOf("viewModel.store")],t.prototype,"store",void 0),o.__decorate([l.property(),u.renderable(["viewModel.cellClassNameGenerator","viewModel.columnReorderingEnabled","viewModel.columns","viewModel.dataProvider","viewModel.pageSize","viewModel.rowDetailsRenderer","viewModel.size","viewModel.state","viewModel.store"])],t.prototype,"viewModel",void 0),o.__decorate([l.property(),u.renderable()],t.prototype,"visibleElements",void 0),o.__decorate([l.cast("visibleElements")],t.prototype,"castVisibleElements",null),o.__decorate([l.aliasOf("viewModel.findColumn")],t.prototype,"findColumn",null),t=o.__decorate([l.subclass("esri.widgets.FeatureTable.Grid.Grid")],t)}(n.HandleOwnerMixin(a))}));