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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../core/Collection","../core/deprecate","../core/events","../core/HandleOwner","../core/has","../core/Logger","../core/watchUtils","../core/accessorSupport/decorators","../libs/sortablejs/Sortable","./Widget","./BasemapLayerList/BasemapLayerListViewModel","./LayerList/ListItem","./LayerList/support/layerListUtils","./support/widget"],(function(e,t,i,r,s,n,a,o,l,d,c,u,p,h,m,y,g){var _=r.ofType(m);function b(e,t,i){e.splice(i,0,e.splice(t,1)[0])}var f="esri-basemap-layer-list esri-widget esri-widget--panel",v="esri-basemap-layer-list--new-ui",I="esri-basemap-layer-list__title-container",L="esri-basemap-layer-list__main-heading",w="esri-basemap-layer-list__editing-card",x="esri-basemap-layer-list__editing-input",A="esri-basemap-layer-list__editing-actions",E="esri-basemap-layer-list__edit-button",T="esri-basemap-layer-list__edit-button-icon",C="esri-basemap-layer-list__no-items",S="esri-basemap-layer-list__hr",k="esri-basemap-layer-list__list-heading",B="esri-basemap-layer-list__list",O="esri-basemap-layer-list__list--root",R="esri-basemap-layer-list__list--exclusive",M="esri-basemap-layer-list__list--inherited",U="esri-basemap-layer-list__list--independent",N="esri-basemap-layer-list__item",P="esri-basemap-layer-list__item--only-child",V="esri-basemap-layer-list__item--error",H="esri-basemap-layer-list__item--invisible",F="esri-basemap-layer-list__item--invisible-at-scale",K="esri-basemap-layer-list__item--updating",D="esri-basemap-layer-list__item--has-children",j="esri-basemap-layer-list__item--selectable",z="esri-basemap-layer-list__item-container",q="esri-basemap-layer-list__item-actions-menu",W="esri-basemap-layer-list__item-actions-menu-item",G="esri-basemap-layer-list__item-actions-menu-item--active",J="esri-basemap-layer-list__item-actions",Q="esri-basemap-layer-list__item-actions-list",X="esri-basemap-layer-list__item-action",Y="esri-basemap-layer-list__item-action-icon",Z="esri-basemap-layer-list__item-action-image",$="esri-basemap-layer-list__item-action-title",ee="esri-basemap-layer-list__action-toggle",te="esri-basemap-layer-list__action-toggle--on",ie="esri-basemap-layer-list__item-label",re="esri-basemap-layer-list__item-error-message",se="esri-basemap-layer-list__item-title",ne="esri-basemap-layer-list__item-toggle",ae="esri-basemap-layer-list__item-toggle-icon",oe="esri-basemap-layer-list__item-toggle-icon",le="esri-basemap-layer-list__item-radio-icon",de="esri-basemap-layer-list__child-toggle",ce="esri-basemap-layer-list__child-toggle--open",ue="esri-basemap-layer-list__child-toggle-icon--opened",pe="esri-basemap-layer-list__child-toggle-icon--closed",he="esri-basemap-layer-list__child-toggle-icon--closed-rtl",me="esri-basemap-layer-list--chosen",ye="esri-button",ge="esri-button--tertiary",_e="esri-input",be="esri-disabled",fe="esri-disabled-element",ve="esri-hidden",Ie="esri-rotating",Le="esri-widget__heading",we="esri-icon-edit",xe="esri-icon-handle-horizontal",Ae="esri-icon-visible",Ee="esri-icon-non-visible",Te="esri-icon-radio-checked",Ce="esri-icon-radio-unchecked",Se="esri-icon-notice-triangle",ke="esri-icon-down-arrow",Be="esri-icon-right-triangle-arrow",Oe="esri-icon-left-triangle-arrow",Re="esri-icon-loading-indicator",Me="esri-icon-default-action",Ue="esri-icon-layers",Ne="base-items",Pe="reference-items",Ve="exclusive",He="inherited";function Fe(e){var t=e.actionsOpen,i=e.children;t&&(e.actionsOpen=!1),i.forEach((function(e){return Fe(e)}))}var Ke=l.getLogger("esri.widgets.BasemapLayerList"),De={baseLayers:!0,referenceLayers:!0,statusIndicators:!0};return function(e){function t(t,r){var s=e.call(this,t,r)||this;return s._editingTitle=!1,s._editTitleInput=null,s._editTitleButton=null,s._focusOnElement=null,s._sortableBaseLayers=null,s._sortableReferenceLayers=null,s._sortableBaseLayersNode=null,s._sortableReferenceLayersNode=null,s._focusSortUid=null,s._newUI=o("esri-basemaplayerlist-new-ui"),s.basemapTitle=null,s.baseListItemCreatedFunction=null,s.editingEnabled=!1,s.iconClass=Ue,s.label=void 0,s.messages=null,s.messagesCommon=null,s.multipleSelectionEnabled=!1,s.referenceListItemCreatedFunction=null,s.baseItems=null,s.referenceItems=null,s.selectedItems=new _,s.view=null,s.viewModel=new h,s.visibleElements=i.__assign({},De),s}return i.__extends(t,e),t.prototype.initialize=function(){var e=this,t=this.baseItems,i=this.referenceItems;this.own([d.on(this,"baseItems","change",(function(){e._itemsChanged(t,Ne),e._toggleSortingBaseLayers()})),d.on(this,"referenceItems","change",(function(){return e._itemsChanged(i,Pe)})),d.init(this,"editingEnabled",(function(){return e._toggleSorting()}))])},t.prototype.destroy=function(){this._destroyBaseSortable(),this._destroyReferenceSortable()},Object.defineProperty(t.prototype,"statusIndicatorsVisible",{set:function(e){s.deprecatedProperty(Ke,"statusIndicatorsVisible",{replacement:"visibleElements.statusIndicators",version:"4.15"}),this.visibleElements=i.__assign(i.__assign({},this.visibleElements),{statusIndicators:e})},enumerable:!0,configurable:!0}),t.prototype.castVisibleElements=function(e){return i.__assign(i.__assign({},De),e)},t.prototype.triggerAction=function(e,t){this.viewModel.triggerAction(e,t)},t.prototype.render=function(){var e,t=this.viewModel.state,i=((e={})[v]=this._newUI,e[ve]="loading"===t,e[be]="disabled"===t,e),r=this.renderReferenceSection(),s=this.renderBaseSection(),n=r&&s?g.tsx("hr",{class:S}):null;return g.tsx("div",{class:this.classes(f,i)},this.renderTitleContainer(),r,n,s)},t.prototype.renderEditingInput=function(){var e=this.messages,t=this.viewModel.basemapTitle;return g.tsx("label",{class:x},e.basemapTitle,g.tsx("input",{bind:this,class:_e,title:e.basemapTitle,"aria-label":e.basemapTitle,placeholder:e.basemapTitle,type:"text",role:"textbox",value:t,afterCreate:this._storeEditTitleInput,afterUpdate:this._focusEditElement}))},t.prototype.renderCancelButton=function(){var e=this.messagesCommon;return g.tsx("button",{title:e.cancel,"aria-label":e.cancel,type:"button",bind:this,class:this.classes(ye,ge),onclick:this._toggleEditingTitle},e.cancel)},t.prototype.renderSubmitButton=function(){var e=this.messagesCommon;return g.tsx("button",{title:e.form.submit,"aria-label":e.form.submit,type:"button",bind:this,class:ye,onclick:this._formSubmit},e.form.ok)},t.prototype.renderEditingForm=function(){return g.tsx("div",{class:w},g.tsx("form",{bind:this,onsubmit:this._formSubmit},this.renderEditingInput(),g.tsx("div",{class:A},this.renderCancelButton(),this.renderSubmitButton())))},t.prototype.renderBasemapTitle=function(){var e=this.viewModel.basemapTitle;return g.tsx("h2",{class:this.classes(Le,L)},e)},t.prototype.renderEditTitleButton=function(){var e=this._editingTitle,t=this.editingEnabled,i=this.messagesCommon;return t&&!e?g.tsx("button",{bind:this,class:E,title:i.edit,"aria-label":i.edit,onclick:this._toggleEditingTitle,afterCreate:this._storeEditTitleButton,afterUpdate:this._focusEditElement,"data-node-ref":"_editButtonNode"},g.tsx("span",{"aria-hidden":"true",class:this.classes(we,T)})):null},t.prototype.renderTitleContainer=function(){return g.tsx("div",{class:I},this._editingTitle?this.renderEditingForm():this.renderBasemapTitle(),this.renderEditTitleButton())},t.prototype.renderNoLayersInfo=function(e,t){return g.tsx("div",{key:t,class:C},e)},t.prototype.renderList=function(e,t){var i=this,r=this.messages,s="reference"===t?this._destroyReferenceSortable:this._destroyBaseSortable;return g.tsx("ul",{key:t,"aria-label":r.widgetLabel,role:this.editingEnabled&&e.length?"listbox":void 0,afterCreate:this._sortNodeCreated,afterRemoved:s,"data-node-ref":t,bind:this,class:this.classes(B,O,U)},e.map((function(r){return i.renderItem({item:r,parent:null,itemType:t,isOnlyChild:1===e.length})})))},t.prototype.renderBaseHeader=function(){return g.tsx("h3",{key:"base-heading",class:this.classes(Le,k)},this.messages.baseHeading)},t.prototype.renderBaseSection=function(){var e=this.baseItems,t=this.messages;if(!this.visibleElements.baseLayers)return null;var i=this._getItems(e);return[this.renderBaseHeader(),[0===i.length?this.renderNoLayersInfo(t.noBaseLayers,"base"):null,this.renderList(i,"base")]]},t.prototype.renderReferenceHeader=function(){return g.tsx("h3",{key:"reference-heading",class:this.classes(Le,k)},this.messages.referenceHeading)},t.prototype.renderReferenceSection=function(){var e=this.referenceItems,t=this.messages;if(!this.visibleElements.referenceLayers)return null;var i=this._getItems(e);return[this.renderReferenceHeader(),[0===i.length?this.renderNoLayersInfo(t.noReferenceLayers,"reference"):null,this.renderList(i,"reference")]]},t.prototype.renderChildrenToggle=function(e,t){var i,r=this.messagesCommon,s=e.children,n=!!e.error,a=!!s.length&&!n,o=((i={})[ce]=e.open,i),l=e.open?r.collapse:r.expand;return a?g.tsx("span",{onclick:this._toggleChildrenClick,onkeydown:this._toggleChildrenClick,"data-item":e,key:"toggle-children",class:this.classes(de,o),tabindex:"0",role:"button","aria-controls":t,"aria-label":l,title:l},g.tsx("span",{"aria-hidden":"true",class:this.classes(pe,Be)}),g.tsx("span",{"aria-hidden":"true",class:this.classes(ue,ke)}),g.tsx("span",{"aria-hidden":"true",class:this.classes(he,Oe)})):null},t.prototype.renderError=function(e){return e.error?g.tsx("div",{key:"error",class:re,role:"alert"},g.tsx("span",null,this.messages.layerError)):null},t.prototype.renderActionsMenuIcon=function(e,t){var i,r=this.messagesCommon,s=((i={})[G]=e.actionsOpen,i),n=e.actionsOpen?r.close:r.open;return g.tsx("div",{key:"actions-menu-toggle","data-item":e,bind:this,onclick:this._toggleActionsOpen,onkeydown:this._toggleActionsOpen,class:this.classes(W,s),tabindex:"0",role:"button","aria-controls":t,"aria-label":n,title:n},g.tsx("span",{"aria-hidden":"true",class:xe}))},t.prototype.renderActionsMenu=function(e,t,i,r){var s=e.panel,n=s&&s.visible?this.renderPanelButton(s):null,a=1===i&&this._getSingleActionButton(t),o=a?this.renderAction({item:e,action:a,singleAction:!0}):null,l=!a&&i?this.renderActionsMenuIcon(e,r):null;return l||n||a?g.tsx("div",{key:"actions-menu",class:q},n,o,l):null},t.prototype.renderChildList=function(e,t){var i,r=this,s=this.editingEnabled,n=e.visibilityMode,a=e.children,o=!!e.error,l=!!a.length&&!o,d=Ve,c=He,u=((i={})[R]=n===d,i[M]=n===c,i[U]=n!==c&&n!==d,i);return l?g.tsx("ul",{bind:this,key:"list-items",id:t,"data-group":e.uid,"data-item":e,afterCreate:this._sortNodeCreated,afterUpdate:this._sortNodeCreated,class:this.classes(B,u),"aria-expanded":e.open?"true":"false",role:s?"listbox":n===d?"radiogroup":"group",hidden:!e.open||null},null==a?void 0:a.map((function(t){return r.renderItem({item:t,parent:e})})).toArray()):null},t.prototype.renderItemContent=function(e,t,i){var r=this.id+"_"+e.uid,s=r+"_actions",n=r+"__list",a=e.panel,o=this._filterActions(e.actionsSections),l=this._countActions(o);return[g.tsx("div",{key:"list-item-container",class:z},this.renderChildrenToggle(e,n),this.renderLabel(e,t,i),this.renderActionsMenu(e,o,l,s)),this.renderError(e),l?this.renderActionsSections(e,o,s):null,a&&a.open?a.render():null,this.renderChildList(e,n)]},t.prototype.renderItem=function(e){var t,r,s,n,a=e.item,o=e.parent,l=e.itemType,d=e.isOnlyChild,c=this,u=c._newUI,p=c.id,h=c.editingEnabled,m=c.selectedItems,_=c.visibleElements,b=a.children,f=p+"_"+a.uid+"__title",v=!!a.error,I=!!b.length&&!v,L=((t={})[D]=I,t[V]=!!v,t[K]=a.updating&&!o&&_.statusIndicators,t[H]=u&&!a.visible,t[F]=!a.visibleAtCurrentScale,t[j]=h,t);if(h){var w=((r={})["data-layer-uid"]=null===(n=a.layer)||void 0===n?void 0:n.uid,r);return g.tsx("li",i.__assign({key:"item-with-selection-"+a.uid,bind:this,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(N,L,(s={},s[P]=d,s)),"aria-labelledby":f,onclick:this._toggleSelection,onkeydown:this._selectionKeydown,"data-item-type":l,"data-item":a,tabIndex:0,"aria-selected":y.findSelectedItem(a,m)?"true":"false",role:"option"},w),this.renderItemContent(a,o,f))}return g.tsx("li",{key:"item-no-selection-"+a.uid,bind:this,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(N,L),"aria-labelledby":f},this.renderItemContent(a,o,f))},t.prototype.renderItemTitle=function(e,t){var i=this.messages,r=e.title||i.untitledLayer,s=e.visibleAtCurrentScale?r:r+" ("+i.layerInvisibleAtScale+")";return g.tsx("span",{key:"layer-title-container",id:t,title:s,"aria-label":s,class:se},r)},t.prototype.renderItemToggleIcon=function(e,t){var i,r=this._newUI,s=Ve,n=t&&t.visibilityMode,a=((i={})[ae]=r,i[oe]=r&&n!==s,i[le]=r&&n===s,i[Te]=n===s&&e.visible,i[Ce]=n===s&&!e.visible,i[Ae]=n!==s&&e.visible,i[Ee]=n!==s&&!e.visible,i);return g.tsx("span",{key:"item-toggle-icon",class:this.classes(a),"aria-hidden":"true"})},t.prototype.renderItemToggle=function(e,t,i){var r=this.editingEnabled,s=Ve,n=t&&t.visibilityMode,a=n===s?"radio":"switch";return r?g.tsx("span",{key:"item-toggle-selection-enabled",class:ne,bind:this,onclick:this._toggleVisibility,onkeydown:this._toggleVisibility,"data-item":e,"data-parent-visibility":n,tabIndex:0,"aria-checked":e.visible?"true":"false",role:a,"aria-labelledby":i},this.renderItemToggleIcon(e,t)):g.tsx("span",{key:"item-toggle",class:ne},this.renderItemToggleIcon(e,t))},t.prototype.renderItemError=function(e){return e.error?g.tsx("span",{key:"notice-triangle","aria-hidden":"true",class:Se}):null},t.prototype.renderLabel=function(e,t,i){var r=this.editingEnabled,s=this._newUI,n=He,a=Ve,o=null==t?void 0:t.visibilityMode,l=o===a?"radio":"switch",d=[this.renderItemToggle(e,t,i),this.renderItemTitle(e,i)];s&&d.reverse();var c=r?g.tsx("div",{key:"item-label-no-selection-"+e.uid,class:ie},d):g.tsx("div",{key:"item-label-with-selection-"+e.uid,class:ie,bind:this,onclick:this._toggleVisibility,onkeydown:this._toggleVisibility,"data-item":e,"data-parent-visibility":o,tabIndex:0,"aria-checked":e.visible?"true":"false",role:l,"aria-labelledby":i},d);return o===n||e.error?g.tsx("div",{key:"item-label-container-"+e.uid,class:ie},this.renderItemError(e),this.renderItemTitle(e,i)):c},t.prototype.renderPanelButton=function(e){var t,i,r=e.className,s=e.open,n=e.title,a=e.image||r?r:Me,o=this._getIconImageStyles(e),l=((t={})[G]=s,t),d=((i={})[Z]=!!o["background-image"],i);return a&&(d[a]=!!a),g.tsx("div",{key:e,bind:this,"data-panel":e,onclick:this._triggerPanel,onkeydown:this._triggerPanel,class:this.classes(W,l),role:"button",tabindex:"0",title:n,"aria-label":n},g.tsx("span",{class:this.classes(d),styles:o}))},t.prototype.renderActionsSections=function(e,t,i){var r=this,s=t.toArray().map((function(t){return g.tsx("ul",{key:t,class:Q},r.renderActionSection(e,t))}));return g.tsx("div",{role:"group","aria-expanded":e.actionsOpen?"true":"false",key:"actions-section",id:i,class:J,hidden:!e.actionsOpen||null},s)},t.prototype.renderActionSection=function(e,t){var i=this;return(t&&t.toArray()).map((function(t){return i.renderAction({item:e,action:t})}))},t.prototype.renderActionIcon=function(e){var t,i=e.active,r=e.className,s=this._getIconImageStyles(e),n="button"!==e.type||e.image||r?r:Me,a=((t={})[Z]=!i&&!!s["background-image"],t[Re]=i,t[Ie]=i,t);return n&&!i&&(a[n]=!0),g.tsx("span",{key:"action-icon","aria-hidden":"true",class:this.classes(Y,a),styles:s})},t.prototype.renderActionTitle=function(e,t){return t?null:g.tsx("span",{key:"action-title",class:$},e)},t.prototype.renderAction=function(e){var t,i=e.item,r=e.action,s=e.singleAction,n=r.active,a=r.disabled,o=r.title,l=((t={})[W]=s&&"button"===r.type,t[X]=n||!s&&"toggle"!==r.type,t[ee]=!n&&"toggle"===r.type,t[te]=!n&&"toggle"===r.type&&r.value,t[fe]=a,t),d=[this.renderActionIcon(r),this.renderActionTitle(o,s)];return s?g.tsx("div",{bind:this,"data-item":i,"data-action":r,role:"button",key:r,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:l,tabindex:"0",title:o,"aria-label":o},d):g.tsx("li",{bind:this,"data-item":i,"data-action":r,key:r,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:l,tabindex:"0",role:"button",title:o,"aria-label":o},d)},t.prototype._filterActions=function(e){return e.map((function(e){return e.filter((function(e){return e.visible}))}))},t.prototype._destroyReferenceSortable=function(){var e=this._sortableReferenceLayers;(null==e?void 0:e.el)&&e.destroy(),this._sortableReferenceLayersNode=null},t.prototype._destroyBaseSortable=function(){var e=this._sortableBaseLayers;(null==e?void 0:e.el)&&e.destroy(),this._sortableBaseLayersNode=null},t.prototype._toggleEditingTitle=function(){var e=!this._editingTitle;this._editingTitle=e,this._focusOnElement=e?"edit-input":"edit-button",this.scheduleRender()},t.prototype._storeEditTitleInput=function(e){this._editTitleInput=e,this._focusEditElement()},t.prototype._focusEditElement=function(){this._editTitleInput&&"edit-input"===this._focusOnElement&&(this._focusOnElement=null,this._editTitleInput.focus()),this._editTitleButton&&"edit-button"===this._focusOnElement&&(this._focusOnElement=null,this._editTitleButton.focus())},t.prototype._storeEditTitleButton=function(e){this._editTitleButton=e,this._focusEditElement()},t.prototype._formSubmit=function(e){e.preventDefault();var t=this._editTitleInput;t&&(this.basemapTitle=t.value),this._toggleEditingTitle()},t.prototype._itemMovedList=function(e){var t=e.item["data-item"],i=e.to.dataset.nodeRef,r=e.from.dataset.nodeRef,s=e.newIndex;this.viewModel.transferListItem({listItem:t,from:r,to:i,newIndex:s})},t.prototype._toggleSortingBaseLayers=function(){var e=this,t=this._sortableBaseLayers,i=this._sortableBaseLayersNode,r=this.editingEnabled;if(i){var s=!r;if(t)t.option("disabled",s);else{var n=u.create(i,{dataIdAttr:"data-layer-uid",group:"root-layers",filter:"."+P,fallbackTolerance:4,disabled:s,onSort:function(){return e._sortLayersToItems({type:"base",itemIds:n.toArray()})},onAdd:function(t){return e._itemMovedList(t)},chosenClass:me});this._sortableBaseLayers=n}}},t.prototype._toggleSortingReferenceLayers=function(){var e=this,t=this._sortableReferenceLayers,i=this._sortableReferenceLayersNode,r=this.editingEnabled;if(i){var s=!r;if(t)t.option("disabled",s);else{var n=u.create(i,{dataIdAttr:"data-layer-uid",group:"root-layers",disabled:s,fallbackTolerance:4,onSort:function(){return e._sortLayersToItems({type:"reference",itemIds:n.toArray()})},onAdd:function(t){return e._itemMovedList(t)},chosenClass:me});this._sortableReferenceLayers=n}}},t.prototype._toggleSorting=function(){this._toggleSortingBaseLayers(),this._toggleSortingReferenceLayers()},t.prototype._sortNodeCreated=function(e){var t=e.getAttribute("data-node-ref");"base"===t&&(this._sortableBaseLayersNode=e),"reference"===t&&(this._sortableReferenceLayersNode=e),this._toggleSorting()},t.prototype._getItems=function(e){var t=this;return e.toArray().filter((function(e){return t.errorsVisible||!e.error}))},t.prototype._getSingleActionButton=function(e){return e.reduce((function(e){return e})).filter((function(e){return e&&"button"===e.type})).getItemAt(0)},t.prototype._sortLayersToItems=function(e){var t=e.type,i=e.itemIds,r="base"===t?this.get("view.map.basemap.baseLayers"):"reference"===t?this.get("view.map.basemap.referenceLayers"):null;r&&r.sort((function(e,t){var r=i.indexOf(e.uid),s=i.indexOf(t.uid);return r>s?-1:r<s?1:0}))},t.prototype._focusListItem=function(e){var t,i=this._focusSortUid;e&&i&&((null===(t=e["data-item"].layer)||void 0===t?void 0:t.uid)===i&&(e.focus(),this._focusSortUid=null))},t.prototype._selectionKeydown=function(e){var t,i,r,s,a,o,l=n.eventKey(e);if(-1!==["ArrowDown","ArrowUp"].indexOf(l)){e.stopPropagation();var d=e.currentTarget,c=d["data-item"],u=d.dataset.itemType,p=this._sortableBaseLayers,h=this._sortableReferenceLayers,m=this.selectedItems,g="base"===u?p:"reference"===u?h:null;if(g){var _=y.findSelectedItem(c,m),f=g.toArray(),v=e.target,I=f.indexOf(v.dataset.layerUid),L=this.viewModel,w=L.baseItems,x=L.referenceItems;if(-1!==I){if("ArrowDown"===l){var A=(C=I+1)>=f.length;if(A&&"reference"===u&&_){var E=w.length;return this.viewModel.transferListItem({listItem:c,from:"reference",to:"base",newIndex:E}),this._focusSortUid=null===(t=c.layer)||void 0===t?void 0:t.uid,void this.scheduleRender()}if(A&&"reference"===u){var T=w.getItemAt(0);return this._focusSortUid=null===(i=null==T?void 0:T.layer)||void 0===i?void 0:i.uid,void this.scheduleRender()}if(A)return;return _&&(b(f,I,C),g.sort(f),this._sortLayersToItems({type:u,itemIds:g.toArray()})),this._focusSortUid=null===(r=c.layer)||void 0===r?void 0:r.uid,void this.scheduleRender()}if("ArrowUp"===l){var C,S=(C=I-1)<0;if(S&&"base"===u&&_){if(1===w.length)return;E=0;return this.viewModel.transferListItem({listItem:c,from:"base",to:"reference",newIndex:E}),this._focusSortUid=null===(s=c.layer)||void 0===s?void 0:s.uid,void this.scheduleRender()}if(S&&"base"===u){T=x.getItemAt(x.length-1);return this._focusSortUid=null===(a=null==T?void 0:T.layer)||void 0===a?void 0:a.uid,void this.scheduleRender()}if(S)return;_&&(b(f,I,C),g.sort(f),this._sortLayersToItems({type:u,itemIds:g.toArray()})),this._focusSortUid=null===(o=c.layer)||void 0===o?void 0:o.uid,this.scheduleRender()}}}}else this._toggleSelection(e)},t.prototype._watchActionSectionChanges=function(e,t){var i=this;this.handles.add(e.on("change",(function(){return i.scheduleRender()})),t),e.forEach((function(e){return i._renderOnActionChanges(e,t)}))},t.prototype._renderOnActionChanges=function(e,t){var i=this;"toggle"!==e.type?"slider"!==e.type?this.handles.add([d.init(e,["className","image","id","title","visible"],(function(){return i.scheduleRender()}))],t):this.handles.add([d.init(e,["className","id","title","visible","value","displayValueEnabled","max","min","step"],(function(){return i.scheduleRender()}))],t):this.handles.add([d.init(e,["className","image","id","title","visible","value"],(function(){return i.scheduleRender()}))],t)},t.prototype._renderOnItemChanges=function(e,t){var i=this;this.handles.add([d.init(e,["actionsOpen","visible","open","updating","title","visibleAtCurrentScale","error","visibilityMode","panel","panel.title","panel.content","panel.className"],(function(){return i.scheduleRender()})),e.actionsSections.on("change",(function(){return i.scheduleRender()})),e.children.on("change",(function(){return i.scheduleRender()}))],t),e.children.forEach((function(e){return i._renderOnItemChanges(e,t)})),e.actionsSections.forEach((function(e){return i._watchActionSectionChanges(e,t)}))},t.prototype._itemsChanged=function(e,t){var i=this;this.handles.remove(t),e.forEach((function(e){return i._renderOnItemChanges(e,t)})),this.scheduleRender()},t.prototype._countActions=function(e){return e.reduce((function(e,t){return e+t.length}),0)},t.prototype._getIconImageStyles=function(e){var t="esri.widgets.LayerList.ListItemPanel"===e.declaredClass||"esri.support.Action.ActionButton"===e.declaredClass||"esri.support.Action.ActionToggle"===e.declaredClass?e.image:null;return{"background-image":t?'url("'+t+'")':null}},t.prototype._toggleActionsOpen=function(e){e.stopPropagation();var t=e.currentTarget["data-item"],i=!t.actionsOpen,r=this.baseItems,s=this.referenceItems;i&&(r.forEach((function(e){return Fe(e)})),s.forEach((function(e){return Fe(e)}))),t.actionsOpen=i},t.prototype._triggerPanel=function(e){e.stopPropagation();var t=e.currentTarget["data-panel"];t&&(t.open=!t.open)},t.prototype._triggerAction=function(e){e.stopPropagation();var t=e.currentTarget,i=t["data-action"],r=t["data-item"];"toggle"===i.type&&(i.value=!i.value),this.triggerAction(i,r)},t.prototype._toggleVisibility=function(e){e.stopPropagation();var t=e.currentTarget,i=t.getAttribute("data-parent-visibility"),r=t["data-item"];i===Ve&&r.visible||(r.visible=!r.visible)},t.prototype._toggleChildrenClick=function(e){e.stopPropagation();var t=e.currentTarget["data-item"];t.open=!t.open},t.prototype._toggleSelection=function(e){e.stopPropagation();var t=this.multipleSelectionEnabled,i=this.selectedItems,r=t&&(e.metaKey||e.ctrlKey),s=e.currentTarget["data-item"],n=y.findSelectedItem(s,i),a=i.length;if(!r)return a&&!(n&&1===a)?(i.removeAll(),void i.add(s)):void(n?i.remove(n):i.add(s));n?i.remove(n):i.add(s)},i.__decorate([c.aliasOf("viewModel.basemapTitle")],t.prototype,"basemapTitle",void 0),i.__decorate([c.aliasOf("viewModel.baseListItemCreatedFunction"),g.renderable()],t.prototype,"baseListItemCreatedFunction",void 0),i.__decorate([c.property(),g.renderable()],t.prototype,"editingEnabled",void 0),i.__decorate([c.property(),g.renderable()],t.prototype,"errorsVisible",void 0),i.__decorate([c.property()],t.prototype,"iconClass",void 0),i.__decorate([c.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],t.prototype,"label",void 0),i.__decorate([c.property(),g.renderable(),g.messageBundle("esri/widgets/BasemapLayerList/t9n/BasemapLayerList")],t.prototype,"messages",void 0),i.__decorate([c.property(),g.renderable(),g.messageBundle("esri/t9n/common")],t.prototype,"messagesCommon",void 0),i.__decorate([c.property()],t.prototype,"multipleSelectionEnabled",void 0),i.__decorate([c.aliasOf("viewModel.referenceListItemCreatedFunction"),g.renderable()],t.prototype,"referenceListItemCreatedFunction",void 0),i.__decorate([c.aliasOf("viewModel.baseItems"),g.renderable()],t.prototype,"baseItems",void 0),i.__decorate([c.aliasOf("viewModel.referenceItems"),g.renderable()],t.prototype,"referenceItems",void 0),i.__decorate([c.property(),g.renderable()],t.prototype,"selectedItems",void 0),i.__decorate([c.property(),g.renderable()],t.prototype,"statusIndicatorsVisible",null),i.__decorate([c.aliasOf("viewModel.view"),g.renderable()],t.prototype,"view",void 0),i.__decorate([g.vmEvent("trigger-action"),c.property({type:h}),g.renderable("viewModel.state")],t.prototype,"viewModel",void 0),i.__decorate([c.property(),g.renderable()],t.prototype,"visibleElements",void 0),i.__decorate([c.cast("visibleElements")],t.prototype,"castVisibleElements",null),i.__decorate([g.accessibleHandler()],t.prototype,"_toggleActionsOpen",null),i.__decorate([g.accessibleHandler()],t.prototype,"_triggerPanel",null),i.__decorate([g.accessibleHandler()],t.prototype,"_triggerAction",null),i.__decorate([g.accessibleHandler()],t.prototype,"_toggleVisibility",null),i.__decorate([g.accessibleHandler()],t.prototype,"_toggleChildrenClick",null),i.__decorate([g.accessibleHandler()],t.prototype,"_toggleSelection",null),t=i.__decorate([c.subclass("esri.widgets.BasemapLayerList")],t)}(a.HandleOwnerMixin(p))}));