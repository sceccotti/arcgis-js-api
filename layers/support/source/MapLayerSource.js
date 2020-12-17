/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/has","../../../core/Logger","../../../core/accessorSupport/ensureType","../../../core/accessorSupport/decorators/property","../../../core/accessorSupport/decorators/enumeration","../../../core/accessorSupport/decorators/subclass","../../../core/urlUtils","../../../core/uuid","../../../portal/support/resourceExtension","../../../core/JSONSupport"],(function(e,r,o,t,p,a,s,c,u,n,i,y,d){"use strict";var l;e.MapLayerSource=l=function(e){function o(r){var o;return(o=e.call(this,r)||this).type="map-layer",o}return r._inheritsLoose(o,e),o.prototype.clone=function(){const{mapLayerId:e,gdbVersion:r}=this;return new l({mapLayerId:e,gdbVersion:r})},o}(d.JSONSupport),o.__decorate([c.enumeration({mapLayer:"map-layer"})],e.MapLayerSource.prototype,"type",void 0),o.__decorate([s.property({type:a.Integer,json:{write:!0}})],e.MapLayerSource.prototype,"mapLayerId",void 0),o.__decorate([s.property({type:String,json:{write:!0}})],e.MapLayerSource.prototype,"gdbVersion",void 0),e.MapLayerSource=l=o.__decorate([u.subclass("esri.layers.support.source.MapLayerSource")],e.MapLayerSource),Object.defineProperty(e,"__esModule",{value:!0})}));