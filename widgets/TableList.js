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

define(["require","exports","tslib","../core/Collection","../core/events","../core/Handles","../core/watchUtils","../core/accessorSupport/decorators","../libs/sortablejs/Sortable","./Widget","./support/widget","./TableList/ListItem","./TableList/TableListViewModel","./TableList/support/tableListUtils"],(function(e,t,i,r,o,n,s,a,l,c,d,u,p,_){"use strict";function h(e,t,i){e.splice(i,0,e.splice(t,1)[0])}var m=r.ofType(u),b="esri-table-list",g="esri-widget",y="esri-widget--panel",f="esri-table-list__no-items",v="esri-table-list__list",A="esri-table-list__list--root",I="esri-table-list__item",w="esri-table-list__item--chosen",S="esri-table-list__item--error",x="esri-table-list__item--selectable",T="esri-table-list__item-container",C="esri-table-list__item-actions-menu",O="esri-table-list__item-actions-menu-item",k="esri-table-list__item-actions-menu-item--active",E="esri-table-list__item-actions",L="esri-table-list__item-actions-list",M="esri-table-list__item-action",U="esri-table-list__item-action-icon",N="esri-table-list__item-action-image",R="esri-table-list__item-action-title",V="esri-table-list__action-toggle",B="esri-table-list__action-toggle--on",K="esri-table-list__item-error-message",H="esri-table-list__item-title",P="esri-disabled",D="esri-disabled-element",F="esri-hidden",z="esri-rotating",j="esri-icon-handle-horizontal",q="esri-icon-notice-triangle",W="esri-icon-loading-indicator",G="esri-icon-default-action",J="esri-icon-table",Q="actions",X="action-section",Y="items";return function(e){function t(t,i){var r=e.call(this,t,i)||this;return r._handles=new n,r._sortable=null,r._sortableNode=null,r._focusSortUid=null,r.visibleItems=null,r.iconClass=J,r.label=void 0,r.listItemCreatedFunction=null,r.map=null,r.messages=null,r.messagesCommon=null,r.multipleSelectionEnabled=!1,r.selectionEnabled=!1,r.selectedItems=new m,r.tableItems=null,r.viewModel=new p,r}return i.__extends(t,e),t.prototype.initialize=function(){var e=this;this._setVisibleItems(this.tableItems),this.own(s.on(this.viewModel,"tableItems","change",(function(){return e._itemsChanged()})),s.init(this,"selectionEnabled",(function(){return e._toggleSorting()})))},t.prototype.destroy=function(){this._destroySortable(),this._handles.destroy(),this._handles=null},t.prototype.triggerAction=function(e,t){this.viewModel.triggerAction(e,t)},t.prototype.render=function(){var e,t,i=this.visibleItems,r=null===(t=this.viewModel)||void 0===t?void 0:t.state,o=((e={})[F]="loading"===r,e[P]="disabled"===r,e);return d.tsx("div",{class:this.classes(b,g,y,o)},(null==i?void 0:i.length)?this.renderList():this.renderNoItems())},t.prototype.renderNoItems=function(){return d.tsx("div",{class:f},this.messages.noItemsToDisplay)},t.prototype.renderList=function(){var e=this,t=this.visibleItems,i=this.messages,r=this.selectionEnabled;return d.tsx("ul",{"aria-label":i.widgetLabel,role:r?"listbox":void 0,afterCreate:this._sortNodeCreated,afterRemoved:this._destroySortable,"data-node-ref":"_sortableNode",bind:this,class:this.classes(v,A)},t.map((function(t){return e.renderItem(t)})).toArray())},t.prototype.renderItem=function(e){var t,r,o,n=this.id,s=this.selectionEnabled,a=this.selectedItems,l=n+"_"+e.uid+"__title",c=!!e.error,u=((t={})[S]=!!c,t[x]=s,t);if(s){var p=((r={})["data-layer-uid"]=null===(o=e.layer)||void 0===o?void 0:o.uid,r);return d.tsx("li",i.__assign({key:"item-with-selection-"+e.uid,bind:this,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(I,u),"aria-labelledby":l,onclick:this._toggleSelection,onkeydown:this._selectionKeydown,"data-item":e,tabIndex:0,"aria-selected":_.findSelectedItem(e,a)?"true":"false",role:"option"},p),this.renderItemContent(e,l))}return d.tsx("li",{key:"item-no-selection-"+e.uid,bind:this,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(I,u),"aria-labelledby":l},this.renderItemContent(e,l))},t.prototype.renderActionsMenuIcon=function(e,t){var i,r=this.messagesCommon,o=((i={})[k]=e.actionsOpen,i),n=e.actionsOpen?r.close:r.open;return d.tsx("div",{key:"actions-menu-toggle","data-item":e,bind:this,onclick:this._toggleActionsOpen,onkeydown:this._toggleActionsOpen,class:this.classes(O,o),tabindex:"0",role:"button","aria-controls":t,"aria-label":n,title:n},d.tsx("span",{"aria-hidden":"true",class:j}))},t.prototype.renderActionsMenu=function(e,t,i,r){var o=1===i&&this._getSingleActionButton(t),n=o?this.renderAction({item:e,action:o,singleAction:!0}):null,s=!o&&i?this.renderActionsMenuIcon(e,r):null;return s||o?d.tsx("div",{key:"actions-menu",class:C},n,s):null},t.prototype.renderError=function(e){return e.error?d.tsx("div",{key:"error",class:K,role:"alert"},d.tsx("span",null,this.messages.tableError)):null},t.prototype.renderItemContent=function(e,t){var i=this.id+"_"+e.uid+"_actions",r=this._filterActions(e.actionsSections),o=this._countActions(r);return[d.tsx("div",{key:"list-item-container",class:T},this.renderLabel(e,t),this.renderActionsMenu(e,r,o,i)),this.renderError(e),o?this.renderActionsSections(e,r,i):null]},t.prototype.renderTitle=function(e,t){var i=this.messages,r=e.title||i.untitledTable;return d.tsx("span",{key:"layer-title-container",id:t,class:H},r)},t.prototype.renderItemError=function(e){return e.error?d.tsx("span",{key:"notice-triangle","aria-hidden":"true",class:q}):null},t.prototype.renderLabel=function(e,t){return e.error?[this.renderItemError(e),this.renderTitle(e,t)]:this.renderTitle(e,t)},t.prototype.renderActionsSections=function(e,t,i){var r=this,o=t.toArray().map((function(t){return d.tsx("ul",{key:t,class:L},r.renderActionSection(e,t))}));return d.tsx("div",{role:"group","aria-expanded":e.actionsOpen?"true":"false",key:"actions-section",id:i,class:E,hidden:!e.actionsOpen||null},o)},t.prototype.renderActionSection=function(e,t){var i=this;return(t&&t.toArray()).map((function(t){return i.renderAction({item:e,action:t})}))},t.prototype.renderActionIcon=function(e){var t,i=e.active,r=e.className,o=this._getIconImageStyles(e),n="button"!==e.type||e.image||r?r:G,s=((t={})[N]=!i&&!!o["background-image"],t[W]=i,t[z]=i,t);return n&&!i&&(s[n]=!0),d.tsx("span",{key:"action-icon","aria-hidden":"true",class:this.classes(U,s),styles:o})},t.prototype.renderActionTitle=function(e,t){return t?null:d.tsx("span",{key:"action-title",class:R},e)},t.prototype.renderAction=function(e){var t,i=e.item,r=e.action,o=e.singleAction,n=r.active,s=r.disabled,a=r.title,l=((t={})[O]=o&&"button"===r.type,t[M]=n||!o&&"toggle"!==r.type,t[V]=!n&&"toggle"===r.type,t[B]=!n&&"toggle"===r.type&&r.value,t[D]=s,t),c=[this.renderActionIcon(r),this.renderActionTitle(a,o)];return o?d.tsx("div",{bind:this,"data-item":i,"data-action":r,role:"button",key:r,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:l,tabindex:"0",title:a,"aria-label":a},c):d.tsx("li",{bind:this,"data-item":i,"data-action":r,key:r,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:l,tabindex:"0",role:"button",title:a,"aria-label":a},c)},t.prototype._filterActions=function(e){return e.map((function(e){return e.filter((function(e){return e.visible}))}))},t.prototype._setVisibleItems=function(e){var t=this;this.visibleItems=null==e?void 0:e.filter((function(e){return t.errorsVisible||!e.error}))},t.prototype._destroySortable=function(){var e=this._sortable;e&&e.destroy(),this._sortable=null},t.prototype._toggleSorting=function(){var e=this,t=this._sortable,i=this._sortableNode,r=this.selectionEnabled;if(i)if(t)t.option("disabled",!r);else{var o=l.create(i,{dataIdAttr:"data-layer-uid",group:"root-tables",fallbackTolerance:4,disabled:!r,onSort:function(){return e._sortTablesToItems(o.toArray())},chosenClass:w});this._sortable=o}},t.prototype._sortNodeCreated=function(e){this._sortableNode=e,this._toggleSorting()},t.prototype._sortTablesToItems=function(e){var t,i=null===(t=this.map)||void 0===t?void 0:t.tables;i&&i.sort((function(t,i){var r=e.indexOf(t.uid),o=e.indexOf(i.uid);return r>o?-1:r<o?1:0}))},t.prototype._getSingleActionButton=function(e){return e.reduce((function(e){return e})).filter((function(e){return e&&"button"===e.type})).getItemAt(0)},t.prototype._focusListItem=function(e){var t,i=this._focusSortUid;e&&i&&((null===(t=e["data-item"].layer)||void 0===t?void 0:t.uid)===i&&(e.focus(),this._focusSortUid=null))},t.prototype._watchActionSectionChanges=function(e,t){var i=this,r=X+t;this._handles.add(e.on("change",(function(){return i.scheduleRender()})),r),e.forEach((function(e){return i._renderOnActionChanges(e,t)}))},t.prototype._renderOnActionChanges=function(e,t){var i=this,r=Q+t,o=function(){return i.scheduleRender()};"toggle"!==e.type?"slider"!==e.type?this._handles.add([s.init(e,["className","image","id","title","visible"],o)],r):this._handles.add([s.init(e,["className","id","title","visible","value","displayValueEnabled","max","min","step"],o)],r):this._handles.add([s.init(e,["className","image","id","title","visible","value"],o)],r)},t.prototype._renderOnItemChanges=function(e){var t=this,i=e.uid,r=Y+i,o=function(){return t.scheduleRender()};this._handles.add([s.init(e,["actionsOpen","open","title","error"],o),e.actionsSections.on("change",o)],r),e.actionsSections.forEach((function(e){return t._watchActionSectionChanges(e,i)}))},t.prototype._itemsChanged=function(){var e=this,t=this.viewModel.tableItems;this._setVisibleItems(t),this._handles.removeAll(),t.forEach((function(t){return e._renderOnItemChanges(t)})),this.scheduleRender()},t.prototype._countActions=function(e){return e.reduce((function(e,t){return e+t.length}),0)},t.prototype._getIconImageStyles=function(e){var t="esri.support.Action.ActionButton"===e.declaredClass||"esri.support.Action.ActionToggle"===e.declaredClass?e.image:null;return{"background-image":t?'url("'+t+'")':null}},t.prototype._selectionKeydown=function(e){var t,i,r,n,s=o.eventKey(e);if(-1!==["ArrowDown","ArrowUp"].indexOf(s)){e.stopPropagation();var a=e.currentTarget["data-item"],l=this._sortable,c=this.selectedItems,d=_.findSelectedItem(a,c),u=l.toArray(),p=e.target,m=u.indexOf(p.dataset.layerUid);if(-1!==m){if("ArrowDown"===s){if((b=m+1)>=u.length)return;d?(h(u,m,b),l.sort(u),this._sortTablesToItems(l.toArray()),this._focusSortUid=null===(t=a.layer)||void 0===t?void 0:t.uid):(this._focusSortUid=null===(i=a.layer)||void 0===i?void 0:i.uid,this.scheduleRender())}if("ArrowUp"===s){var b;if((b=m-1)<=-1)return;d?(h(u,m,b),l.sort(u),this._sortTablesToItems(l.toArray()),this._focusSortUid=null===(r=a.layer)||void 0===r?void 0:r.uid):(this._focusSortUid=null===(n=a.layer)||void 0===n?void 0:n.uid,this.scheduleRender())}}}else this._toggleSelection(e)},t.prototype._toggleActionsOpen=function(e){var t=e.currentTarget["data-item"],i=!t.actionsOpen;i&&this.tableItems.forEach((function(e){return function(e){e.actionsOpen&&(e.actionsOpen=!1)}(e)})),t.actionsOpen=i,e.stopPropagation()},t.prototype._triggerAction=function(e){var t=e.currentTarget,i=t["data-action"],r=t["data-item"];"toggle"===i.type&&(i.value=!i.value),this.triggerAction(i,r),e.stopPropagation()},t.prototype._toggleSelection=function(e){e.stopPropagation();var t=this.multipleSelectionEnabled,i=this.selectedItems,r=t&&(e.metaKey||e.ctrlKey),o=e.currentTarget["data-item"],n=_.findSelectedItem(o,i),s=i.length;if(!r)return s&&!(n&&1===s)?(i.removeAll(),void i.add(o)):void(n?i.remove(n):i.add(o));n?i.remove(n):i.add(o)},i.__decorate([a.property()],t.prototype,"visibleItems",void 0),i.__decorate([a.property()],t.prototype,"iconClass",void 0),i.__decorate([a.property(),d.renderable()],t.prototype,"errorsVisible",void 0),i.__decorate([a.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],t.prototype,"label",void 0),i.__decorate([a.aliasOf("viewModel.listItemCreatedFunction"),d.renderable()],t.prototype,"listItemCreatedFunction",void 0),i.__decorate([a.aliasOf("viewModel.map")],t.prototype,"map",void 0),i.__decorate([a.property(),d.renderable(),d.messageBundle("esri/widgets/TableList/t9n/TableList")],t.prototype,"messages",void 0),i.__decorate([a.property(),d.renderable(),d.messageBundle("esri/t9n/common")],t.prototype,"messagesCommon",void 0),i.__decorate([a.property()],t.prototype,"multipleSelectionEnabled",void 0),i.__decorate([a.property(),d.renderable()],t.prototype,"selectionEnabled",void 0),i.__decorate([a.property(),d.renderable()],t.prototype,"selectedItems",void 0),i.__decorate([a.aliasOf("viewModel.tableItems"),d.renderable()],t.prototype,"tableItems",void 0),i.__decorate([d.vmEvent("trigger-action"),a.property({type:p}),d.renderable("viewModel.state")],t.prototype,"viewModel",void 0),i.__decorate([a.aliasOf("viewModel.triggerAction")],t.prototype,"triggerAction",null),i.__decorate([d.accessibleHandler()],t.prototype,"_toggleActionsOpen",null),i.__decorate([d.accessibleHandler()],t.prototype,"_triggerAction",null),i.__decorate([d.accessibleHandler()],t.prototype,"_toggleSelection",null),t=i.__decorate([a.subclass("esri.widgets.TableList")],t)}(c)}));