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

define(["require","exports","tslib","../../core/compilerUtils","../../core/maybe","../../support/arcadeOnDemand","./utils","@dojo/framework/shim/Promise"],(function(e,r,t,i,l,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getDisplayedSymbol=r.renderPreviewHTML=r.renderColorRampPreviewHTML=r.renderDotDensityPreviewHTML=void 0;var o=null;function s(e,r){return Math.floor(Math.random()*(r-e+1)+e)}r.renderDotDensityPreviewHTML=function(e,r,t){var i=e.backgroundColor,l=e.outline,a=e.dotSize,n=t&&t.swatchSize||22,c=Math.round(n*n/Math.pow(a,2)*.8),u=window.devicePixelRatio,d=document.createElement("canvas"),h=n*u;d.width=h,d.height=h,d.style.width=d.width/u+"px",d.style.height=d.height/u+"px";var p=d.getContext("2d");if(i&&(p.fillStyle=i.toCss(!0),p.fillRect(0,0,h,h),p.fill()),p.fillStyle=r.toCss(!0),o&&o.length/2===c)for(var y=0;y<2*c;y+=2){var m=o[y],v=o[y+1];p.fillRect(m,v,a*u,a*u),p.fill()}else{o=[];for(y=0;y<2*c;y+=2){m=s(0,h),v=s(0,h);o.push(m,v),p.fillRect(m,v,a*u,a*u),p.fill()}}l&&(l.color&&(p.strokeStyle=l.color.toCss(!0)),p.lineWidth=l.width,p.strokeRect(0,0,h,h));var b=new Image(n,n);return b.src=d.toDataURL(),b},r.renderColorRampPreviewHTML=function(e,r){void 0===r&&(r={});var t="horizontal"===r.align,i=t?75:24,l=t?24:75,a=r.width,n=void 0===a?i:a,o=r.height,s=void 0===o?l:o,c=r.gradient,u=void 0===c||c,d=window.devicePixelRatio,h=n*d,p=s*d,y=document.createElement("canvas");y.width=h,y.height=p,y.style.width=n+"px",y.style.height=s+"px";var m=y.getContext("2d"),v=t?h:0,b=t?0:p;if(u){var f=m.createLinearGradient(0,0,v,b),w=1/(e.length-1);e.forEach((function(e,r){return f.addColorStop(r*w,e.toString())})),m.fillStyle=f,m.fillRect(0,0,h,p)}else for(var g=t?h/e.length:h,S=t?p:p/e.length,C=0,P=0,R=0,x=e;R<x.length;R++){var M=x[R];m.fillStyle=M.toString(),m.fillRect(C,P,g,S),C=t?C+g:0,P=t?0:P+S}var D=document.createElement("div");return D.style.width=n+"px",D.style.height=s+"px",D.appendChild(y),D},r.renderPreviewHTML=function r(l,a){return t.__awaiter(this,void 0,void 0,(function(){return t.__generator(this,(function(t){switch(t.label){case 0:switch(l.type){case"web-style":return[3,1];case"label-3d":case"line-3d":case"mesh-3d":case"point-3d":case"polygon-3d":return[3,3];case"simple-marker":case"simple-line":case"simple-fill":case"picture-marker":case"picture-fill":case"text":return[3,5];case"cim":return[3,7]}return[3,9];case 1:return[4,new Promise((function(r,t){e(["./previewWebStyleSymbol"],r,t)}))];case 2:return[2,(0,t.sent().previewWebStyleSymbol)(l,r,a)];case 3:return[4,new Promise((function(r,t){e(["./previewSymbol3D"],r,t)}))];case 4:return[2,(0,t.sent().previewSymbol3D)(l,a)];case 5:return[4,new Promise((function(r,t){e(["./previewSymbol2D"],r,t)}))];case 6:return[2,(0,t.sent().previewSymbol2D)(l,a)];case 7:return[4,new Promise((function(r,t){e(["./previewCIMSymbol"],r,t)}))];case 8:return[2,(0,t.sent().previewCIMSymbol)(l,a)];case 9:return i.neverReached(l),[2,void 0]}}))}))},r.getDisplayedSymbol=function(r,i){return t.__awaiter(this,void 0,void 0,(function(){var o,s,c,u,d,h,p,y,m,v,b,f,w,g,S,C,P,R,x,M,D,_,V;return t.__generator(this,(function(L){switch(L.label){case 0:return r?(o=function e(r){return r&&"opacity"in r?r.opacity*e(r.parent):1}(r.layer||r.sourceLayer),!l.isSome(r.symbol)||l.isSome(i)&&!0===i.ignoreGraphicSymbol?[3,4]:"web-style"!==r.symbol.type?[3,2]:[4,r.symbol.fetchSymbol(l.isSome(i)?i.abortOptions:null)]):[2,void 0];case 1:return c=L.sent(),[3,3];case 2:c=r.symbol.clone(),L.label=3;case 3:return s=c,n.applyColorToSymbol(s,null,o),[2,s];case 4:return[4,(u=l.isSome(i)&&i.renderer||r.get("layer.renderer")||r.get("sourceLayer.renderer")).getSymbolAsync(r)];case 5:return(d=L.sent())?"web-style"!==d.type?[3,7]:[4,d.fetchSymbol(l.isSome(i)?i.abortOptions:null)]:[2,void 0];case 6:return d=L.sent(),[3,8];case 7:d=d.clone(),L.label=8;case 8:return!("visualVariables"in u)||"visualVariables"in u&&!u.visualVariables||"visualVariables"in u&&u.visualVariables&&!u.visualVariables.length?[2,d]:u.arcadeRequiredForVisualVariables&&(l.isNone(i)||l.isNone(i.arcade))?(h=t.__assign({},l.unwrap(i)),p=h,[4,a.loadArcade()]):[3,10];case 9:p.arcade=L.sent(),i=h,L.label=10;case 10:return[4,new Promise((function(r,t){e(["../../renderers/visualVariables/support/visualVariableUtils"],r,t)}))];case 11:for(y=L.sent(),m=[],v=[],b=[],f=[],w=0,g=u.visualVariables;w<g.length;w++)switch((S=g[w]).type){case"color":m.push(S);break;case"opacity":v.push(S);break;case"rotation":f.push(S);break;case"size":S.target||b.push(S)}return C=!!m.length&&m[m.length-1],P=C?y.getColor(C,r,i):null,R=!!v.length&&v[v.length-1],x=R?y.getOpacity(R,r,i):null,null!=o&&(x=null!=x?x*o:o),n.applyColorToSymbol(d,P,x),b.length?(M=y.getAllSizes(b,r,i),[4,n.applySizesToSymbol(d,M)]):[3,13];case 12:L.sent(),L.label=13;case 13:for(D=0,_=f;D<_.length;D++)V=_[D],n.applyRotationToSymbol(d,y.getRotationAngle(V,r,i),V.axis);return[2,d]}}))}))}}));