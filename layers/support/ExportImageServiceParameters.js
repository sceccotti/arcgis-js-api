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

define(["require","exports","tslib","../../core/jsonMap","../../core/JSONSupport","../../core/accessorSupport/decorators","./imageryRendererUtils","./MosaicRule","./RasterFunction"],(function(e,r,t,o,i,n,a,p,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ExportImageServiceParameters=void 0;var s=new o.default({RSP_NearestNeighbor:"nearest",RSP_BilinearInterpolation:"bilinear",RSP_CubicConvolution:"cubic",RSP_Majority:"majority"}),d=new o.default({esriNoDataMatchAny:"any",esriNoDataMatchAll:"all"}),y=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.layer=null,r.adjustAspectRatio=void 0,r.bandIds=void 0,r.compression=void 0,r.compressionQuality=void 0,r.compressionTolerance=.01,r.format=null,r.interpolation=null,r.noData=null,r.noDataInterpretation=void 0,r.pixelType=void 0,r.lercVersion=2,r}return t.__extends(r,e),r.prototype.writeAdjustAspectRatio=function(e,r,t){this.layer.version<10.3||(r[t]=e)},r.prototype.writeCompressionQuality=function(e,r,t){this.format&&this.format.toLowerCase().indexOf("jpg")>-1&&null!=e&&(r[t]=e)},r.prototype.writeCompressionTolerance=function(e,r,t){"lerc"===this.format&&null!=e&&(r[t]=e)},r.prototype.writeLercVersion=function(e,r,t){"lerc"===this.format&&this.layer.version>=10.5&&(r[t]=e)},Object.defineProperty(r.prototype,"version",{get:function(){var e=this.layer;return e.bandIds,e.format,e.compressionQuality,e.compressionTolerance,e.interpolation,e.noData,e.noDataInterpretation,e.mosaicRule,e.renderingRule,e.adjustAspectRatio,e.pixelFilter,e.renderer,e.definitionExpression,(this._get("version")||0)+1},set:function(e){this._set("version",e)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"mosaicRule",{get:function(){var e=this.layer,r=e.mosaicRule,t=e.definitionExpression;return r?t&&t!==r.where&&((r=r.clone()).where=t):t&&(r=new p({where:t})),r},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"renderingRule",{get:function(){var e=this.layer,r=e.renderingRule,t=e.pixelFilter,o=!e.format||e.format.indexOf("jpg")>-1||e.format.indexOf("png")>-1;return r=this._addResampleRasterFunction(r),o&&!t&&(r=this.combineRendererWithRenderingRule()),r},enumerable:!1,configurable:!0}),r.prototype.combineRendererWithRenderingRule=function(){var e,r=this.layer,t=r.rasterInfo,o=r.renderingRule,i=r.renderer;return i&&a.isSupportedRendererType(i)?a.combineRenderingRules(a.convertRendererToRenderingRule(i,{rasterAttributeTable:t.attributeTable,pixelType:t.pixelType,dataType:t.dataType,bandProperties:null===(e=t.keyProperties)||void 0===e?void 0:e.BandProperties,convertColorRampToColormap:r.version<10.6}),o):o},r.prototype._addResampleRasterFunction=function(e){var r,t=null;if("vector-field"===(null===(r=this.layer.renderer)||void 0===r?void 0:r.type)){var o={},i=this.layer.renderingRule;if(!i||"Resample"!==i.functionName){var n="esriImageServiceDataTypeVector-UV"===this.layer.serviceDataType?7:10;o.rasterFunction="Resample",o.rasterFunctionArguments={ResamplingType:n,InputCellSize:{x:this.layer.pixelSizeX,y:this.layer.pixelSizeY}}}t=l.fromJSON(o)}return a.combineRenderingRules(t,e)},t.__decorate([n.property()],r.prototype,"layer",void 0),t.__decorate([n.property({json:{write:!0}})],r.prototype,"adjustAspectRatio",void 0),t.__decorate([n.writer("adjustAspectRatio")],r.prototype,"writeAdjustAspectRatio",null),t.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.bandIds")],r.prototype,"bandIds",void 0),t.__decorate([n.property({json:{write:!0}})],r.prototype,"compression",void 0),t.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.compressionQuality")],r.prototype,"compressionQuality",void 0),t.__decorate([n.writer("compressionQuality")],r.prototype,"writeCompressionQuality",null),t.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.compressionTolerance")],r.prototype,"compressionTolerance",void 0),t.__decorate([n.writer("compressionTolerance")],r.prototype,"writeCompressionTolerance",null),t.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.format")],r.prototype,"format",void 0),t.__decorate([n.property({type:String,json:{read:{reader:s.read},write:{writer:s.write}}}),n.aliasOf("layer.interpolation")],r.prototype,"interpolation",void 0),t.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.noData")],r.prototype,"noData",void 0),t.__decorate([n.property({type:String,json:{read:{reader:d.read},write:{writer:d.write}}}),n.aliasOf("layer.noDataInterpretation")],r.prototype,"noDataInterpretation",void 0),t.__decorate([n.property({json:{write:!0}})],r.prototype,"pixelType",void 0),t.__decorate([n.property({json:{write:!0}})],r.prototype,"lercVersion",void 0),t.__decorate([n.writer("lercVersion")],r.prototype,"writeLercVersion",null),t.__decorate([n.property({type:Number,dependsOn:["layer.adjustAspectRatio","layer.bandIds","layer.format","layer.compressionQuality","layer.compressionTolerance","layer.definitionExpression","layer.interpolation","layer.noData","layer.noDataInterpretation","layer.mosaicRule","layer.renderingRule","layer.pixelFilter","layer.renderer","lercVersion","pixelType"]})],r.prototype,"version",null),t.__decorate([n.property({dependsOn:["layer.mosaicRule","layer.definitionExpression"],json:{write:!0}})],r.prototype,"mosaicRule",null),t.__decorate([n.property({dependsOn:["layer.renderingRule","layer.renderer","layer.rasterInfo","layer.format"],json:{write:!0}})],r.prototype,"renderingRule",null),r=t.__decorate([n.subclass("esri.layers.mixins.ExportImageServiceParameters")],r)}(i.JSONSupport);r.ExportImageServiceParameters=y}));