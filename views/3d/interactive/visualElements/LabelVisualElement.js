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

define(["require","exports","tslib","../../../../core/Handles","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec3f64","../measurementTools/support/viewUtils","./VisualElement","../../../overlay/LineOverlayItem","../../../overlay/TextOverlayItem"],(function(e,t,i,o,r,s,n,a,c,l,h,u){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LabelVisualElement=void 0;var m=function(e){function t(t){var i=e.call(this,t.view)||this;return i._handles=new o,i._textItem=null,i._calloutItem=null,i._geometry=null,i._text="",i._fontSize=14,i._distance=25,i._anchor="right",i.applyProps(t),i}return i.__extends(t,e),Object.defineProperty(t.prototype,"geometry",{get:function(){return this._geometry},set:function(e){this._geometry=e,this._updateLabelPosition()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"text",{get:function(){return this._text},set:function(e){this._text=e,this.attached&&(this._textItem.text=this._text)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"fontSize",{get:function(){return this._fontSize},set:function(e){this._fontSize=e,this.attached&&(this._textItem.fontSize=this._fontSize)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"distance",{get:function(){return this._distance},set:function(e){this._distance!==e&&(this._distance=e,this._updateLabelPosition())},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"anchor",{get:function(){return this._anchor},set:function(e){this._anchor!==e&&(this._anchor=e,this._updateLabelPosition())},enumerable:!1,configurable:!0}),t.prototype._updateLabelPosition=function(){if(this.attached&&r.isSome(this.geometry))switch(this.geometry.type){case"point":this._computeLabelPositionFromPoint(this.geometry,f)?(this._textItem.position=[f[0],f[1]],this._textItem.anchor="center"):this._textItem.visible=!1,this._calloutItem.visible=!1;break;case"euclidean":case"geodesic":if(this._computeLabelPositionFromSegment(this.geometry,this._distance,this._anchor,f,v)){var e=v[0]-f[0],t=v[1]-f[1];this._textItem.position=[v[0],v[1]],this._textItem.anchor=Math.abs(e)>Math.abs(t)?e>0?"left":"right":t>0?"top":"bottom",this._textItem.visible=!0,this._calloutItem.startPosition=[f[0],f[1]],this._calloutItem.endPosition=[v[0],v[1]],this._calloutItem.visible=!0}else this._textItem.visible=!1,this._calloutItem.visible=!1}},t.prototype._computeLabelPositionFromPoint=function(e,t){this.view.renderCoordsHelper.toRenderCoords(e,d);var i=this.view._stage.getCamera();return i.projectPoint(d,b),!(b[2]<0||b[2]>1)&&(i.renderToScreen(b,t),!0)},t.prototype._computeLabelPositionFromSegment=function(e,t,i,o,r){if(!e)return!1;var s=this.view._stage.getCamera();c.screenSpaceTangent(e.startRenderSpace,e.endRenderSpace,_,s),n.vec2.set(p,-_[1],_[0]);var a=!1;switch(i){case"top":a=p[1]<0;break;case"bottom":a=p[1]>0;break;case"left":a=p[0]>0;break;case"right":a=p[0]<0}if(a&&n.vec2.negate(p,p),0===n.vec2.length(p))switch(i){case"top":p[1]=1;break;case"bottom":p[1]=-1;break;case"left":p[0]=-1;break;case"right":p[0]=1}return e.eval(.5,d),s.projectPoint(d,b),!(b[2]<0||b[2]>1)&&(s.renderToScreen(b,o),n.vec2.scale(p,p,t*s.pixelRatio),n.vec2.add(p,p,b),s.renderToScreen(p,r),!0)},t.prototype.createResources=function(){var e=this;this._textItem=new u({visible:!0}),this._textItem.text=r.unwrap(this._text),this._textItem.fontSize=this._fontSize,this._calloutItem=new h({visible:!0,width:2}),this._updateLabelPosition(),this.view.overlay.items.addMany([this._textItem,this._calloutItem]),this._handles.add(this.view.state.watch("camera",(function(){e._updateLabelPosition()})))},t.prototype.destroyResources=function(){this.view.overlay&&!this.view.overlay.destroyed&&this.view.overlay.items.removeMany([this._textItem,this._calloutItem]),this._handles.removeAll()},t.prototype.updateVisibility=function(e){this._textItem.visible=e,this._calloutItem.visible=e},t}(l.VisualElement);t.LabelVisualElement=m;var _=s.createRenderScreenPointArray(),p=s.createRenderScreenPointArray(),d=a.vec3f64.create(),b=s.createRenderScreenPointArray3(),f=s.createScreenPointArray(),v=s.createScreenPointArray()}));