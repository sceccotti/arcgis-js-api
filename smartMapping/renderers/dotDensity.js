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

define(["require","exports","tslib","../../renderers","../../core/Error","../../core/maybe","../../core/promiseUtils","../../geometry/support/scaleUtils","../../renderers/support/AuthoringInfo","../heuristics/outline","./support/dotDensityUtils","./support/utils","../statistics/spatialStatistics","../statistics/summaryStatisticsForAttributes","../statistics/support/attributeDensity","../support/utils","../support/adapters/support/layerUtils","../symbology/dotDensity"],(function(e,t,r,i,a,n,s,l,o,u,d,c,p,m,y,b,g,f){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createRenderer=void 0;function v(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,l,o;return r.__generator(this,(function(u){switch(u.label){case 0:if(!(e&&e.layer&&e.view&&e.attributes&&e.attributes.length))throw new a("dot-density-renderer:missing-parameters","'layer', 'view' and 'attributes' parameters are required");if(e.attributes.length>8)throw new a("dot-density-renderer:invalid-parameters","Dot density renderer does not support more than 8 attributes");if(t=r.__assign({},e),i=[2,1],l=g.createLayerAdapter(t.layer,i),t.layer=l,t.dotBlendingEnabled=null==t.dotBlendingEnabled||t.dotBlendingEnabled,t.dotValueOptimizationEnabled=null==t.dotValueOptimizationEnabled||t.dotValueOptimizationEnabled,!l)throw new a("dot-density-renderer:invalid-parameters","'layer' must be one of these types: "+g.getLayerTypeLabels(i).join(", "));return o=n.isSome(t.signal)?{signal:t.signal}:null,[4,s.all([t.view.when(),l.load(o)])];case 1:if(u.sent(),"polygon"!==l.geometryType)throw new a("dot-density-renderer:not-supported","Dot density renderer is supported for polygon layers only");return[2,t]}}))}))}function h(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,a,s,l;return r.__generator(this,(function(r){switch(r.label){case 0:return t=e.dotDensityScheme,i=null,a=null,[4,c.getBasemapInfo(e.basemap,e.view)];case 1:return s=r.sent(),i=n.isSome(s.basemapId)?s.basemapId:null,a=n.isSome(s.basemapTheme)?s.basemapTheme:null,t?[2,{scheme:f.cloneScheme(t),basemapId:i,basemapTheme:a}]:((l=f.getSchemes({basemap:i,numColors:e.attributes.length,basemapTheme:a}))&&(t=l.primaryScheme,i=l.basemapId,a=l.basemapTheme),[2,{scheme:t,basemapId:i,basemapTheme:a}])}}))}))}function w(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,n,o,u,c,y,b,g,f,v,h;return r.__generator(this,(function(r){switch(r.label){case 0:return t=e.view,i=e.layer,n=e.attributes,o=e.signal,[4,i.getSampleFeatures({view:t,sampleSize:500,returnGeometry:!0,signal:o})];case 1:return u=r.sent(),[4,s.all([p({features:u,geometryType:i.geometryType}),m({layer:i,attributes:n,includeZeros:!1,includeNegatives:!1,view:t,signal:o})])];case 2:if(c=r.sent(),y=c[0],b=c[1],g="avgSize"in y&&y.avgSize,f=b.avg,!g)throw new a("dot-density-renderer:insufficient-info","Average polygon size is invalid");if(!f)throw new a("dot-density-renderer:insufficient-info","Average attribute value is invalid");return v=l.getResolutionForScale(t.scale,t.spatialReference),h=g*g/(v*v)*.1,[2,{dotValue:d.roundValue(f/h)||1,referenceScale:t.scale,minSliderValue:1,maxSliderValue:d.roundValue(f)}]}}))}))}function S(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,n,s,o,u,c,p,m,g,f,v,h,w,S,V;return r.__generator(this,(function(r){switch(r.label){case 0:t=e.view,i=e.layer,n=e.attributes,s=e.signal,o=[],u=0,c=n,r.label=1;case 1:return u<c.length?(p=c[u],[4,b.getFieldsList({field:p.field,valueExpression:p.valueExpression})]):[3,4];case 2:m=r.sent(),o.push.apply(o,m),r.label=3;case 3:return u++,[3,1];case 4:return[4,i.getSampleFeatures({view:t,sampleSize:500,requiredFields:o,returnGeometry:!0,signal:s})];case 5:return g=r.sent(),[4,y({features:g,attributes:n,includeZeros:!1,includeNegatives:!1,view:t})];case 6:if(!(f=r.sent()).avgDensity||!f.minDensity||!f.maxDensity)throw new a("dot-density-renderer:insufficient-info","Invalid density values");return v=l.getResolutionForScale(t.scale,t.spatialReference),h=v*v,w=d.roundValue(f.minDensity*h),S=d.roundValue(f.maxDensity*h),10,(V=d.roundValue(f.avgDensity*h*10)||1)>S&&(V=S),[2,{dotValue:V,referenceScale:t.scale,minSliderValue:w,maxSliderValue:S}]}}))}))}t.createRenderer=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,n,l,d,p,m,y,b,g,f,V,_,E,D,T,x,I;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,v(e)];case 1:return t=r.sent(),n=t.layer,l=n.geometryType,[4,h(t)];case 2:if(d=r.sent(),!(p=d&&d.scheme))throw new a("dot-density-renderer:insufficient-info","Unable to find dot-density scheme");return m={layer:n,view:t.view,attributes:t.attributes,signal:t.signal},y={layer:t.layer,view:t.view,signal:t.signal},[4,s.all([t.trueDensity?S(m):w(m),t.outlineOptimizationEnabled?u(y):null])];case 3:return b=r.sent(),g=b[0],f=b[1],V=g.dotValue,_=g.referenceScale,E=g.minSliderValue,D=g.maxSliderValue,T=c.createColors(p.colors,t.attributes.length),x=t.attributes.map((function(e,t){return{field:e.field,valueExpression:e.valueExpression,label:e.label,valueExpressionTitle:e.valueExpressionTitle,color:T[t]}})),I=new i.DotDensityRenderer({attributes:x,dotBlendingEnabled:t.dotBlendingEnabled,outline:f?c.getSymbolOutlineFromScheme(p,l,f.opacity):null,dotValue:V,referenceScale:t.dotValueOptimizationEnabled?_:null,legendOptions:t.legendOptions}),f&&f.visualVariables&&f.visualVariables.length&&(I.visualVariables=f.visualVariables.map((function(e){return e.clone()}))),I.authoringInfo=new o({type:"dot-density",minSliderValue:E,maxSliderValue:D}),[2,{renderer:I,dotDensityScheme:p,basemapId:d.basemapId,basemapTheme:d.basemapTheme}]}}))}))}}));