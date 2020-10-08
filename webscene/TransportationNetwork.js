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

define(["require","exports","tslib","../core/JSONSupport","../core/accessorSupport/decorators"],(function(t,e,r,o,n){"use strict";return function(t){function e(e){return t.call(this,e)||this}var o;return r.__extends(e,t),o=e,e.prototype.clone=function(){return new o({name:this.name,path:this.path,title:this.title})},r.__decorate([n.property({type:String,json:{write:!0}})],e.prototype,"name",void 0),r.__decorate([n.property({type:String,json:{write:!0}})],e.prototype,"path",void 0),r.__decorate([n.property({type:String,json:{write:!0}})],e.prototype,"title",void 0),e=o=r.__decorate([n.subclass("esri.webscene.TransportationNetwork")],e)}(o.JSONSupport)}));