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

define(["require","exports","tslib","../core/JSONSupport","../core/accessorSupport/decorators"],(function(t,e,o,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NavigationConstraint=void 0;var i=function(t){function e(e){var o=t.call(this,e)||this;return o.type="none",o}var n;return o.__extends(e,t),n=e,e.prototype.clone=function(){return new n({type:this.type})},o.__decorate([r.enumeration({none:"none",stayAbove:"stay-above"})],e.prototype,"type",void 0),e=n=o.__decorate([r.subclass("esri.ground.NavigationConstraint")],e)}(n.JSONSupport);e.NavigationConstraint=i}));