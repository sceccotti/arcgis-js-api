// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.

define(["dojo/on","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/array","dojo/number","dojo/dom-geometry","dojo/dom-style","dojo/dom-class","dojo/query","dojo/_base/Color","dojo/colors","dojo/fx/easing","dijit/_WidgetBase","dijit/_OnDijitClickMixin","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/registry","dijit/Dialog","dijit/Toolbar","dijit/ToolbarSeparator","dijit/layout/ContentPane","dijit/form/Button","dijit/form/ToggleButton","../config","../sniff","../request","./Measurement","../toolbars/draw","../tasks/Geoprocessor","../geometry/Polyline","../geometry/normalizeUtils","../symbols/SimpleLineSymbol","../symbols/SimpleMarkerSymbol","../graphic","../tasks/FeatureSet","../tasks/LinearUnit","../geometry/geodesicUtils","../geometry/webMercatorUtils","../units","./ElevationProfile/ProfileChart","dojo/i18n!./ElevationProfile/nls/strings","dojo/text!./ElevationProfile/templates/ElevationProfile.html","xstyle/css!./ElevationProfile/css/ElevationProfile.css"],function(e,t,i,r,s,o,n,a,l,h,c,f,p,u,d,m,_,g,E,v,U,b,y,T,j,M,S,C,P,w,I,D,R,k,O,x,L,A,F,N,z,G,W,B){return i([d,m,_,g],{declaredClass:"esri.dijit.ElevationProfile",baseClass:"esriElevationProfile",templateString:B,_samplingPointCount:199,_profileResults:null,_map:null,_measureTool:null,_drawToolbar:null,_profileService:null,_profileServiceUrl:null,_profileTaskUrl:null,_scalebarUnits:null,_profileChart:null,_chartOptions:null,constructor:function(e){e.hasOwnProperty("map")&&(this._map=e.map),e.hasOwnProperty("profileTaskUrl")&&(this._profileTaskUrl=e.profileTaskUrl),e.hasOwnProperty("scalebarUnits")&&(this._scalebarUnits=e.scalebarUnits),e.hasOwnProperty("chartOptions")&&(this._chartOptions=e.chartOptions),this._profileServiceUrl=r.replace("{_profileTaskUrl}/Profile",this)},postCreate:function(){this.inherited(arguments),null!==E.getEnclosingWidget(this.domNode)&&this.own(t.after(E.getEnclosingWidget(this.domNode),"resize",r.hitch(this,this.resize),!0))},startup:function(){this.inherited(arguments),this._map&&this._profileTaskUrl&&this._scalebarUnits?this._map.loaded?this._initUI():this._map.on("load",r.hitch(this,this._initUI)):(this.emit("error",new Error(W.errors.MissingConstructorParameters)),this.destroy())},_initUI:function(){this._initProfileService().then(r.hitch(this,function(){var e=this._getElevationDistanceUnits(this._scalebarUnits);this._profileChart=new G({map:this._map,elevationUnits:e.elevationUnits,distanceUnits:e.distanceUnits,chartOptions:this._chartOptions},this._chartNode),this._profileChart.startup(),this.emit("load")}),r.hitch(this,function(){this.emit("error",new Error(W.errors.InvalidConfiguration)),this.destroy()}))},_initProfileService:function(){var e=new s;return this._profileServiceUrl?C({url:this._profileServiceUrl,content:{f:"json"},callbackParamName:"callback"}).then(r.hitch(this,function(){this._profileService=new I(this._profileServiceUrl),this._profileService.setNormalization(!1),this._profileService.setOutSpatialReference(this._map.spatialReference),e.resolve()}),r.hitch(this,function(t){e.reject(t)})):e.reject(new Error(W.errors.InvalidConfiguration)),e.promise},_setProfileGeometryAttr:function(e){e?(this._map.setMapCursor("progress"),this._getProfile(e).then(r.hitch(this,function(e){this._map.setMapCursor("default"),this._profileChart.update(e),this.emit("update-profile",e)}),r.hitch(this,function(e){this._map.setMapCursor("default"),this.emit("error",e)}))):this.emit("error",new Error(W.errors.NullGeometry))},_setTitleAttr:function(e){this._profileChart.set("Title",e),this.emit("title-changed")},clearProfile:function(){this._profileChart.clear(),this.emit("clear-profile")},_setMeasureUnitsAttr:function(e){var t=this._getElevationDistanceUnits(e);this._profileChart.set("DisplayUnits",{elevationUnits:t.elevationUnits,distanceUnits:t.distanceUnits}),this._profileChart.refresh()},_getElevationDistanceUnits:function(e){var t,i;switch(e){case z.NAUTICAL_MILES:t=z.FEET,i=z.NAUTICAL_MILES;break;case z.MILES:t=z.FEET,i=z.MILES;break;case z.YARDS:t=z.FEET,i=z.YARDS;break;case z.FEET:t=z.FEET,i=z.FEET;break;case z.KILOMETERS:t=z.METERS,i=z.KILOMETERS;break;case z.METERS:t=z.METERS,i=z.METERS;break;default:t=this._profileChart.elevationUnits,i=this._profileChart.distanceUnits}return{elevationUnits:t,distanceUnits:i}},_hasZsAndMs:function(e){if(e&&"polyline"===e.type){var t=e.paths[0][0];return 4===t.length}return!1},_normalizeGeometry:function(e){var t=new s;return R.normalizeCentralMeridian([e]).then(function(e){t.resolve(e[0])},function(){t.reject(new Error(W.errors.UnableToNormalizeGeometry))}),t.promise},_densifyGeometry:function(e){var t=e.spatialReference.isWebMercator?N.webMercatorToGeographic(e):e;return F.geodesicDensify(t,1e6)},_getProfile:function(e){var t=new s;if(this._hasZsAndMs(e))t.resolve({geometry:e,elevations:[],distances:[],samplingDistance:a});else{var i=e.spatialReference.isWebMercator()?N.webMercatorToGeographic(e):e,n=F.geodesicLengths([i],z.METERS)[0],a=n/this._samplingPointCount,l=new x(e,null,{OID:1}),h=new L;h.features=[l],h.fields=[{name:"OID",type:"esriFieldTypeObjectID",alias:"OID"}],this._profileService.execute({InputLineFeatures:h,ProfileIDField:"OID",DEMResolution:"FINEST",MaximumSampleDistance:a,MaximumSampleDistanceUnits:"Meters",returnZ:!0,returnM:!0}).then(r.hitch(this,function(e){if(e.length>0){var i=e[0].value;if(i.features.length>0){var s=i.features[0];this._sourceNode.innerHTML=r.replace("{0}: {1}",[W.chart.demResolution,s.attributes.DEMResolution]);var n=s.geometry,l=[],h=[];n.paths.length>0?(o.forEach(n.paths,function(e,t){o.forEach(e,function(e,i){var r={x:e.length>3?e[3]:i*a,y:e.length>2?e[2]:0,pathIdx:t,pointIdx:i};l.push(r),h.push(r.x)},this)},this),t.resolve({geometry:n,elevations:l,distances:h,samplingDistance:a})):t.reject(new Error(this.strings.errors.UnableToProcessResults))}else t.reject(new Error(this.strings.errors.UnableToProcessResults))}else t.reject(new Error(this.strings.errors.UnableToProcessResults))}),t.reject)}return t.promise},resize:function(){this.inherited(arguments),this._profileChart&&this._profileChart.resize()},destroy:function(){this.inherited(arguments),this._profileChart&&this._profileChart.destroy()}})});