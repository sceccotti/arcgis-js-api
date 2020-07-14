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

define(["require","exports","tslib","../../request","../../core/Error","../../core/maybe","../../core/object","../../core/urlUtils","../../core/accessorSupport/decorators","../Task"],(function(e,r,t,s,o,i,n,a,u,l){Object.defineProperty(r,"__esModule",{value:!0}),r.NAServiceDescriptionMixin=function(e){return function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t.__extends(r,e),r.prototype.getServiceDescription=function(){return t.__awaiter(this,void 0,void 0,(function(){return t.__generator(this,(function(e){return this._serviceDescriptionPromise||(this._serviceDescriptionPromise=this._fetchServiceDescription()),[2,this._serviceDescriptionPromise]}))}))},r.prototype._fetchServiceDescription=function(){return t.__awaiter(this,void 0,void 0,(function(){var e,r,i,u,l,c;return t.__generator(this,(function(d){switch(d.label){case 0:if(!this.url||!this.parsedUrl)throw new o("network-service:missing-url","Url to Network service is missing");return e=this.url,[4,s(e,{query:{f:"json"}})];case 1:for((r=d.sent().data).supportedTravelModes||(r.supportedTravelModes=[]),i=0;i<r.supportedTravelModes.length;i++)r.supportedTravelModes[i].id||(r.supportedTravelModes[i].id=r.supportedTravelModes[i].itemId);return[4,r.currentVersion>=10.4?function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,i,n,a;return t.__generator(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,s(e+("/"===e[e.length-1]?"":"/")+"retrieveTravelModes",{query:{f:"json"}})];case 1:return r=t.sent().data,i=r.supportedTravelModes,n=r.defaultTravelMode,[2,{supportedTravelModes:i,defaultTravelMode:n}];case 2:throw a=t.sent(),new o("network-service:retrieveTravelModes","Could not get to the NAServer's retrieveTravelModes.",{error:a});case 3:return[2]}}))}))}(e):function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,o,i,u,l,c,d,v,p,f,h,_,g,M,T,y;return t.__generator(this,(function(t){switch(t.label){case 0:return[4,s(e.substring(0,e.indexOf("/rest/")+6)+"info",{query:{f:"json"}})];case 1:return(r=t.sent().data)&&r.owningSystemUrl?(e=r.owningSystemUrl,[4,s(e+("/"===e[e.length-1]?"":"/")+"sharing/rest/portals/self",{query:{f:"json"}})]):[2,{supportedTravelModes:[],defaultTravelMode:null}];case 2:return o=t.sent().data,(i=n.getDeepValue("helperServices.routingUtilities.url",o))?(u=a.urlToObject(e),l=/\/solveClosestFacility$/.test(u.path)?"Route":/\/solveClosestFacility$/.test(u.path)?"ClosestFacility":"ServiceAreas",[4,s(i+("/"===i[i.length-1]?"":"/")+"GetTravelModes/execute",{query:{f:"json",serviceName:l}})]):[2,{supportedTravelModes:[],defaultTravelMode:null}];case 3:if(c=t.sent(),d=[],v=null,c&&c.data&&c.data.results&&c.data.results.length)for(p=c.data.results,f=0,h=p;f<h.length;f++)if("supportedTravelModes"===(_=h[f]).paramName){if(_.value&&_.value.features)for(g=0,M=_.value.features;g<M.length;g++)(T=M[g].attributes)&&(y=JSON.parse(T.TravelMode),d.push(y))}else"defaultTravelMode"===_.paramName&&(v=_.value);return[2,{supportedTravelModes:d,defaultTravelMode:v}]}}))}))}(e)];case 2:return u=d.sent(),l=u.defaultTravelMode,c=u.supportedTravelModes,r.defaultTravelMode=l,r.supportedTravelModes=c,[2,r]}}))}))},r.prototype._isInputGeometryZAware=function(e,r){for(var t=0;t<r.length;t++){var s=e[r[t]];if(s&&s.length)for(var o=0,n=s;o<n.length;o++){var a=n[o];if(i.isSome(a)&&a.hasZ)return!0}}return!1},r.prototype._dropZValuesOffInputGeometry=function(e,r){for(var t=0;t<r.length;t++){var s=e[r[t]];if(s&&s.length)for(var o=0,i=s;o<i.length;o++){i[o].z=void 0}}console.log("The remote Network Analysis service is powered by a network dataset which is not Z-aware.\nZ-coordinates of the input geometry are ignored.")},r=t.__decorate([u.subclass("esri.tasks.mixins.NAServiceDescription")],r)}(e)};var c=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t.__extends(r,e),r=t.__decorate([u.subclass("esri.tasks.mixins.NAServiceDescription")],r)}(r.NAServiceDescriptionMixin(l));r.NAServiceDescription=c}));