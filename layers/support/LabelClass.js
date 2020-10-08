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

define(["require","exports","tslib","../../symbols","../../core/jsonMap","../../core/JSONSupport","../../core/lang","../../core/accessorSupport/decorators","./LabelExpressionInfo","./labelUtils","../../symbols/support/defaults","../../symbols/support/jsonUtils"],(function(e,r,t,n,o,l,i,a,s,p,c,b){"use strict";var u=new o.default({esriServerPointLabelPlacementAboveCenter:"above-center",esriServerPointLabelPlacementAboveLeft:"above-left",esriServerPointLabelPlacementAboveRight:"above-right",esriServerPointLabelPlacementBelowCenter:"below-center",esriServerPointLabelPlacementBelowLeft:"below-left",esriServerPointLabelPlacementBelowRight:"below-right",esriServerPointLabelPlacementCenterCenter:"center-center",esriServerPointLabelPlacementCenterLeft:"center-left",esriServerPointLabelPlacementCenterRight:"center-right",esriServerLinePlacementAboveAfter:"above-after",esriServerLinePlacementAboveAlong:"above-along",esriServerLinePlacementAboveBefore:"above-before",esriServerLinePlacementAboveStart:"above-start",esriServerLinePlacementAboveEnd:"above-end",esriServerLinePlacementBelowAfter:"below-after",esriServerLinePlacementBelowAlong:"below-along",esriServerLinePlacementBelowBefore:"below-before",esriServerLinePlacementBelowStart:"below-start",esriServerLinePlacementBelowEnd:"below-end",esriServerLinePlacementCenterAfter:"center-after",esriServerLinePlacementCenterAlong:"center-along",esriServerLinePlacementCenterBefore:"center-before",esriServerLinePlacementCenterStart:"center-start",esriServerLinePlacementCenterEnd:"center-end",esriServerPolygonPlacementAlwaysHorizontal:"always-horizontal"},{ignoreUnknown:!0});function y(e){return!e||"service"!==e.origin&&!(e.layer&&"map-image"===e.layer.type)}return function(e){function r(r){var t=e.call(this,r)||this;return t.type="label",t.name=null,t.deconflictionStrategy="static",t.labelExpression=null,t.labelExpressionInfo=null,t.labelPlacement=null,t.maxScale=0,t.minScale=0,t.symbol=c.defaultTextSymbol2D,t.useCodedValues=void 0,t.where=null,t}var o;return t.__extends(r,e),o=r,r.evaluateWhere=function(e,r){var t=function(e,r,t){switch(r){case"=":return e==t;case"<>":return e!=t;case">":return e>t;case">=":return e>=t;case"<":return e<t;case"<=":return e<=t}return!1};try{if(null==e)return!0;var n=e.split(" ");if(3===n.length)return t(r[n[0]],n[1],n[2]);if(7===n.length){var o=t(r[n[0]],n[1],n[2]),l=n[3],i=t(r[n[4]],n[5],n[6]);switch(l){case"AND":return o&&i;case"OR":return o||i}}return!1}catch(r){console.log("Error.: can't parse = "+e)}},r.prototype.readLabelExpression=function(e,r){var t=r.labelExpressionInfo;if(!t||!t.value&&!t.expression)return e},r.prototype.writeLabelExpression=function(e,r,t,n){if(this.labelExpressionInfo&&(y(n)||n&&"service"===n.origin))if(null!=this.labelExpressionInfo.value)e=p.templateStringToSql(this.labelExpressionInfo.value);else if(null!=this.labelExpressionInfo.expression){var o=p.getSingleFieldArcadeExpression(this.labelExpressionInfo.expression);o&&(e="["+o+"]")}null!=e&&(r[t]=e)},r.prototype.writeLabelExpressionInfo=function(e,r,t,n){if(null==e&&null!=this.labelExpression&&y(n))e=new s({expression:this.getLabelExpressionArcade()});else if(!e)return;var o=e.toJSON(n);o.expression&&(r[t]=o)},r.prototype.writeMaxScale=function(e,r){(e||this.minScale)&&(r.maxScale=e)},r.prototype.writeMinScale=function(e,r){(e||this.maxScale)&&(r.minScale=e)},r.prototype.getLabelExpression=function(){return p.getLabelExpression(this)},r.prototype.getLabelExpressionArcade=function(){return p.getLabelExpressionArcade(this)},r.prototype.getLabelExpressionSingleField=function(){return p.getLabelExpressionSingleField(this)},r.prototype.hash=function(){return JSON.stringify(this)},r.prototype.clone=function(){return new o({deconflictionStrategy:this.deconflictionStrategy,labelExpression:this.labelExpression,labelExpressionInfo:i.clone(this.labelExpressionInfo),labelPlacement:this.labelPlacement,maxScale:this.maxScale,minScale:this.minScale,name:this.name,symbol:i.clone(this.symbol),where:this.where,useCodedValues:this.useCodedValues})},t.__decorate([a.property({type:String,json:{write:!0}})],r.prototype,"name",void 0),t.__decorate([a.property({type:String,json:{write:!0,default:"static",origins:{"web-scene":{write:!1}}}})],r.prototype,"deconflictionStrategy",void 0),t.__decorate([a.property({type:String,json:{write:{allowNull:!0}}})],r.prototype,"labelExpression",void 0),t.__decorate([a.reader("labelExpression")],r.prototype,"readLabelExpression",null),t.__decorate([a.writer("labelExpression")],r.prototype,"writeLabelExpression",null),t.__decorate([a.property({type:s,json:{write:{overridePolicy:function(e,r,t){return y(t)?{allowNull:!0}:{enabled:!1}}}}})],r.prototype,"labelExpressionInfo",void 0),t.__decorate([a.writer("labelExpressionInfo")],r.prototype,"writeLabelExpressionInfo",null),t.__decorate([a.property({type:u.apiValues,json:{type:u.jsonValues,read:u.read,write:u.write}})],r.prototype,"labelPlacement",void 0),t.__decorate([a.property({type:Number})],r.prototype,"maxScale",void 0),t.__decorate([a.writer("maxScale")],r.prototype,"writeMaxScale",null),t.__decorate([a.property({type:Number})],r.prototype,"minScale",void 0),t.__decorate([a.writer("minScale")],r.prototype,"writeMinScale",null),t.__decorate([a.property({types:n.symbolTypesLabel,json:{origins:{"web-scene":{types:n.symbolTypesLabel3D,write:b.write,default:null}},write:b.write,default:null}})],r.prototype,"symbol",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"useCodedValues",void 0),t.__decorate([a.property({type:String,json:{write:!0}})],r.prototype,"where",void 0),r=o=t.__decorate([a.subclass("esri.layers.support.LabelClass")],r)}(l.JSONSupport)}));