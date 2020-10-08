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

define(["require","exports","./GeometryUtils","./TextShaping","./decluttering/config","../webgl/Geometry"],(function(e,t,i,n,o,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PlacementEngine=t.Placement=t.PlacedSymbol=t.Anchor=t.TILE_PIXEL_RATIO=t.TILE_PIXEL_SIZE=t.TILE_COORD_SIZE=void 0,t.TILE_COORD_SIZE=4096,t.TILE_PIXEL_SIZE=512,t.TILE_PIXEL_RATIO=8;var h=function(e,t,i,n,o){void 0===i&&(i=0),void 0===n&&(n=-1),void 0===o&&(o=.5),this.x=e,this.y=t,this.angle=i,this.segment=n,this.minzoom=o};t.Anchor=h;var l=function(e,t,n,o,a,h,l){void 0===h&&(h=.5),void 0===l&&(l=i.C_INFINITY),this.anchor=e,this.labelAngle=t,this.glyphAngle=n,this.page=o,this.alternateVerticalGlyph=a,this.minzoom=h,this.maxzoom=l},r=function(e,t,i,n,o,a,h,l,r,s,d,g){this.tl=e,this.tr=t,this.bl=i,this.br=n,this.mosaicRect=o,this.labelAngle=a,this.minAngle=h,this.maxAngle=l,this.anchor=r,this.minzoom=s,this.maxzoom=d,this.page=g};t.PlacedSymbol=r;var s=function(e){this.shapes=e};t.Placement=s;var d=function(){function e(){}return e.prototype.getIconPlacement=function(e,t,n){var h=t.width/t.pixelRatio,l=t.height/t.pixelRatio,d=n.offset[0]-h/2,g=n.offset[1]-l/2,I=t.rect,x=2/t.pixelRatio,c=d-x,v=g-x,p=c+I.width/t.pixelRatio,P=v+I.height/t.pixelRatio,m=new a.Point(c,v),w=new a.Point(p,P),y=new a.Point(c,P),_=new a.Point(p,v),f=n.rotate*i.C_DEG_TO_RAD,T=1===n.rotationAlignment;if(e.segment>=0&&!T&&(f+=e.angle),0!==f){var u=Math.cos(f),E=Math.sin(f);m.rotate(u,E),w.rotate(u,E),y.rotate(u,E),_.rotate(u,E)}var L=new a.Point(e.x,e.y),N=new r(m,_,y,w,I,0,0,256,L,.5,i.C_INFINITY,0),b=new s([N]);if((!n.allowOverlap||!n.ignorePlacement)&&o.DECLUTTER_TILES){var S=n.size,A=n.padding,C={xTile:e.x,yTile:e.y,dxPixels:d*S-A,dyPixels:g*S-A,hard:!n.optional,partIndex:0,width:h*S+2*A,height:l*S+2*A,angle:f,minLod:.5,maxLod:i.C_INFINITY};b.iconColliders=[C]}return b},e.prototype.getTextPlacement=function(e,o,h,d){for(var g=new a.Point(e.x,e.y),I=d.rotate*i.C_DEG_TO_RAD,x=0===d.rotationAlignment,c=d.keepUpright,v=d.padding,p=.5,P=!x?0:e.angle,m=e.segment>=0&&x,w=d.allowOverlap&&d.ignorePlacement?null:[],y=[],_=!m,f=Number.POSITIVE_INFINITY,T=Number.NEGATIVE_INFINITY,u=f,E=T,L=m?c:x&&c,N=d.size/n.SDF_GLYPH_SIZE,b=!1,S=0,A=o;S<A.length;S++){if((z=A[S]).vertical){b=!0;break}}var C,G=0,F=0;if(!m&&b){var Y=n.TextShaping.getTextBox(o,d.lineHeight*n.SDF_GLYPH_SIZE);switch(d.anchor){case 1:G=Y.height/2,F=-Y.width/2;break;case 2:G=-Y.height/2,F=Y.width/2;break;case 3:G=Y.height/2,F=Y.width/2;break;case 4:G=-Y.height/2,F=-Y.width/2;break;case 5:G=Y.height;break;case 7:F=-Y.width;break;case 6:F=Y.width;break;case 8:G=-Y.height}}G+=d.offset[0]*n.SDF_GLYPH_SIZE,F+=d.offset[1]*n.SDF_GLYPH_SIZE;for(var O=0,R=o;O<R.length;O++){var z,D=(z=R[O]).glyphMosaicItem;if(D&&!D.rect.isEmpty){var M=D.rect,k=D.metrics,Z=D.page;if(w&&_){if(void 0!==C&&C!==z.y){var V=void 0,H=void 0,X=void 0,q=void 0;b?(V=-E+G,H=f+F,X=E-u,q=T-f):(V=f+G,H=u+F,X=T-f,q=E-u);var B={xTile:e.x,yTile:e.y,dxPixels:V*N-v,dyPixels:H*N-v,hard:!d.optional,partIndex:1,width:X*N+2*v,height:q*N+2*v,angle:I,minLod:.5,maxLod:i.C_INFINITY};w.push(B),u=f=Number.POSITIVE_INFINITY,E=T=Number.NEGATIVE_INFINITY}C=z.y}var U=[];if(m){var j=.5*D.metrics.width,J=(z.x+k.left-4+j)*N*t.TILE_PIXEL_RATIO;if(p=this._placeGlyph(e,p,J,h,e.segment,1,z.vertical,Z,U),c&&(p=this._placeGlyph(e,p,J,h,e.segment,-1,z.vertical,Z,U)),p>=2)break}else U.push(new l(g,P,P,Z,!1)),x&&c&&U.push(new l(g,P+i.C_PI,P+i.C_PI,Z,!1));var K=z.x+k.left,Q=z.y-n.SDF_GLYPH_BASELINE-k.top,W=K+k.width,$=Q+k.height,ee=void 0,te=void 0,ie=void 0,ne=void 0;if(!m&&b)if(z.vertical){var oe=(K+W)/2-k.height/2,ae=(Q+$)/2+k.width/2;ee=new a.Point(-ae-4+G,oe-4+F),te=new a.Point(ee.x+M.width,ee.y+M.height),ie=new a.Point(ee.x,te.y),ne=new a.Point(te.x,ee.y)}else ee=new a.Point(4-Q+G,K-4+F),te=new a.Point(ee.x-M.height,ee.y+M.width),ie=new a.Point(te.x,ee.y),ne=new a.Point(ee.x,te.y);else ee=new a.Point(K-4+G,Q-4+F),te=new a.Point(ee.x+M.width,ee.y+M.height),ie=new a.Point(ee.x,te.y),ne=new a.Point(te.x,ee.y);for(var he=void 0,le=void 0,re=void 0,se=void 0,de=0,ge=U;de<ge.length;de++){var Ie=ge[de],xe=void 0,ce=void 0,ve=void 0,pe=void 0;if(Ie.alternateVerticalGlyph){if(!he){oe=(K+W)/2+G,ae=(Q+$)/2+F;he=new a.Point(oe-k.height/2-4,ae+k.width/2+4),le=new a.Point(he.x+M.height,he.y-M.width),re=new a.Point(le.x,he.y),se=new a.Point(he.x,le.y)}xe=he,ce=re,ve=se,pe=le}else xe=ee,ce=ie,ve=ne,pe=te;var Pe=Q,me=$,we=Ie.glyphAngle+I;if(0!==we){var ye=Math.cos(we),_e=Math.sin(we);xe=xe.clone(),ce=ce.clone(),ve=ve.clone(),pe=pe.clone(),xe.rotate(ye,_e),pe.rotate(ye,_e),ce.rotate(ye,_e),ve.rotate(ye,_e)}var fe=0,Te=256;if(m&&b?z.vertical?Ie.alternateVerticalGlyph?(fe=32,Te=96):(fe=224,Te=32):(fe=224,Te=96):(fe=192,Te=64),y.push(new r(xe,ve,ce,pe,M,Ie.labelAngle,fe,Te,Ie.anchor,Ie.minzoom,Ie.maxzoom,Ie.page)),w&&(!L||this._legible(Ie.labelAngle)))if(_)K<f&&(f=K),Pe<u&&(u=Pe),W>T&&(T=W),me>E&&(E=me);else if(Ie.minzoom<2){B={xTile:e.x,yTile:e.y,dxPixels:(K+G)*N-v,dyPixels:(Pe+G)*N-v,hard:!d.optional,partIndex:1,width:(W-K)*N+2*v,height:(me-Pe)*N+2*v,angle:we,minLod:Ie.minzoom,maxLod:Ie.maxzoom};w.push(B)}}}}if(p>=2)return null;if(w&&_){var ue;V=void 0,X=void 0,q=void 0;b?(V=-E+G,ue=f+F,X=E-u,q=T-f):(V=f+G,ue=u+F,X=T-f,q=E-u);B={xTile:e.x,yTile:e.y,dxPixels:V*N-v,dyPixels:ue*N-v,hard:!d.optional,partIndex:1,width:X*N+2*v,height:q*N+2*v,angle:I,minLod:.5,maxLod:i.C_INFINITY};w.push(B)}var Ee=new s(y);return w&&w.length>0&&(Ee.textColliders=w),Ee},e.prototype._legible=function(e){var t=i.radToByte(e);return t<65||t>=193},e.prototype._placeGlyph=function(e,t,n,o,h,r,s,d,g){var I=r,x=I<0?i.positiveMod(e.angle+i.C_PI,i.C_2PI):e.angle,c=0;n<0&&(I*=-1,n*=-1,c=i.C_PI),I>0&&++h;var v=new a.Point(e.x,e.y),p=o[h],P=i.C_INFINITY;if(o.length<=h)return P;for(;;){var m=p.x-v.x,w=p.y-v.y,y=Math.sqrt(m*m+w*w),_=Math.max(n/y,t),f=m/y,T=w/y,u=i.positiveMod(Math.atan2(T,f)+c,i.C_2PI);if(g.push(new l(v,x,u,d,!1,_,P)),s&&g.push(new l(v,x,u,d,!0,_,P)),_<=t)return _;v=p.clone();do{if(h+=I,o.length<=h||h<0)return _;p=o[h]}while(v.isEqual(p));var E=p.x-v.x,L=p.y-v.y,N=Math.sqrt(E*E+L*L);E*=y/N,L*=y/N,v.x-=E,v.y-=L,P=_}},e}();t.PlacementEngine=d}));