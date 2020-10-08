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

define(["require","exports","../PixelBlock"],(function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.approximateTransform=e.clip=e.resampleByMajority=e.setValidBoundary=e.mosaic=e.mosaicPixelData=e.getClipBounds=e.remapColor=e.lookupPixels=e.stretch=e.createContrastBrightnessLUT=e.createStretchLUT=e.estimateStatisticsFromHistograms=e.estimateStatisticsHistograms=e.colorize=e.createColormapLUT=e.extractBands=void 0;var i=function(t){return t&&"esri.layers.support.PixelBlock"===t.declaredClass&&t.pixels&&t.pixels.length>0};function a(t,e){var r,i,a=Math.min(Math.max(t,-100),100),n=Math.min(Math.max(e,-100),100),o=new Uint8Array(256);for(r=0;r<256;r++)a>0&&a<100?i=(200*r-25500+510*n)/(2*(100-a))+128:a<=0&&a>-100?i=(200*r-25500+510*n)*(100+a)/2e4+128:100===a?i=(i=200*r-25500+256*(100-a)+510*n)>0?255:0:-100===a&&(i=128),o[r]=i>255?255:i<0?0:i;return o}function n(t,e,r,i,a,n,o,l){return{xmin:a<=r*t?0:a<r*t+t?a-r*t:t,ymin:n<=i*e?0:n<i*e+e?n-i*e:e,xmax:a+o<=r*t?0:a+o<r*t+t?a+o-r*t:t,ymax:n+l<=i*e?0:n+l<i*e+e?n+l-i*e:e}}function o(t,e,a,o){var l=t.filter((function(t){return i(t)}))[0];if(null==l)return null;var f,s,h,u,m,p,x,c,d,g,y,w,v,M=o?o.width:e.width,k=o?o.height:e.height,A=l.width,U=l.height,C=e.width/A,T=e.height/U,B=a?a.x:0,S=a?a.y:0,P=l.pixelType,O=r.getPixelArrayConstructor(P),L=l.pixels.length,b=[];for(p=0;p<L;p++){for(s=new O(M*k),x=0;x<T;x++)for(c=0;c<C;c++)if(h=t[x*C+c])for(f=h.pixels[p],d=(y=n(A,U,c,x,B,S,M,k)).ymin;d<y.ymax;d++)for(u=(x*U+d-S)*M+(c*A-B),m=d*A,g=y.xmin;g<y.xmax;g++)s[u+g]=f[m+g];b.push(s)}if(t.some((function(t){return null==t||t.mask&&t.mask.length>0})))for(w=new Uint8Array(M*k),x=0;x<T;x++)for(c=0;c<C;c++)if(v=(h=t[x*C+c])?h.mask:null,y=n(A,U,c,x,B,S,M,k),v)for(d=y.ymin;d<y.ymax;d++)for(u=(x*U+d-S)*M+(c*A-B),m=d*A,g=y.xmin;g<y.xmax;g++)w[u+g]=v[m+g];else if(h)for(d=y.ymin;d<y.ymax;d++)for(u=(x*U+d-S)*M+(c*A-B),m=d*A,g=y.xmin;g<y.xmax;g++)w[u+g]=1;else for(d=y.ymin;d<y.ymax;d++)for(u=(x*U+d-S)*M+(c*A-B),m=d*A,g=y.xmin;g<y.xmax;g++)w[u+g]=0;var j=new r({width:M,height:k,pixels:b,pixelType:P,mask:w});return j.updateStatistics(),j}function l(t){if(!i(t))return null;for(var e=t.clone(),r=t.width,a=t.height,n=t.pixels,o=t.mask,l=n[0],u=e.pixels[0],m=2;m<a-1;m++){for(var p=new Map,x=m-2;x<m+2;x++)for(var c=0;c<4;c++){h(p,l[g=x*r+c],o?o[g]:1)}u[m*r]=f(p),u[m*r+1]=u[m*r+2]=u[m*r];for(var d=3;d<r-1;d++){var g;h(p,l[g=(m-2)*r+d+1],o?o[g]:1),h(p,l[g=(m-1)*r+d+1],o?o[g]:1),h(p,l[g=m*r+d+1],o?o[g]:1),h(p,l[g=(m+1)*r+d+1],o?o[g]:1),s(p,l[g=(m-2)*r+d-3],o?o[g]:1),s(p,l[g=(m-1)*r+d-3],o?o[g]:1),s(p,l[g=m*r+d-3],o?o[g]:1),s(p,l[g=(m+1)*r+d-3],o?o[g]:1),u[m*r+d]=f(p)}u[m*r+d+1]=u[m*r+d]}for(d=0;d<r;d++)u[d]=u[r+d]=u[2*r+d],u[(a-1)*r+d]=u[(a-2)*r+d];return e.updateStatistics(),e}function f(t){if(0===t.size)return 0;for(var e=0,r=-1,i=0,a=t.keys(),n=a.next();!n.done;)(i=t.get(n.value))>e&&(r=n.value,e=i),n=a.next();return r}function s(t,e,r){if(0!==r){var i=t.get(e);1===i?t.delete(e):t.set(e,i-1)}}function h(t,e,r){0!==r&&t.set(e,t.has(e)?t.get(e)+1:1)}e.extractBands=function(t,e){if(!e||!i(t))return t;var a=t.pixels.length;return e&&e.some((function(t){return t>=a}))?t:1===a&&1===e.length&&0===e[0]?t:a!==e.length||e.some((function(t,e){return t!==e}))?new r({pixelType:t.pixelType,width:t.width,height:t.height,mask:t.mask,validPixelCount:t.validPixelCount,maskIsAlpha:t.maskIsAlpha,pixels:e.map((function(e){return t.pixels[e]})),statistics:t.statistics&&e.map((function(e){return t.statistics[e]}))}):t},e.createColormapLUT=function(t){if(t){var e=t.colormap;if(e&&0!==e.length){var r=e.sort((function(t,e){return t[0]-e[0]})),i=0;r[0][0]<0&&(i=r[0][0]);var a,n=Math.max(256,r[r.length-1][0]-i+1),o=new Uint8Array(4*n),l=[],f=0,s=0,h=5===r[0].length;if(n>65536)return r.forEach((function(t){l[t[0]-i]=h?t.slice(1):t.slice(1).concat([255])})),{indexed2DColormap:l,offset:i,alphaSpecified:h};if(t.fillUnspecified)for(f=(a=r[s])[0]-i;f<n;f++)o[4*f]=a[1],o[4*f+1]=a[2],o[4*f+2]=a[3],o[4*f+3]=h?a[4]:255,f===a[0]-i&&(a=s===r.length-1?a:r[++s]);else for(f=0;f<r.length;f++)o[s=4*((a=r[f])[0]-i)]=a[1],o[s+1]=a[2],o[s+2]=a[3],o[s+3]=h?a[4]:255;return{indexedColormap:o,offset:i,alphaSpecified:h}}}},e.colorize=function(t,e){if(!i(t))return t;if(!e&&(e.indexedColormap||e.indexed2DColormap))return t;var r=t.clone(),a=r.pixels,n=r.mask,o=r.width*r.height;if(1!==a.length)return t;var l,f=e.indexedColormap,s=e.indexed2DColormap,h=e.offset,u=e.alphaSpecified,m=f.length-1,p=0,x=a[0],c=new Uint8Array(x.length),d=new Uint8Array(x.length),g=new Uint8Array(x.length),y=0;if(f)if(n)for(p=0;p<o;p++)n[p]&&((y=4*(x[p]-h))<h||y>m?n[p]=0:(c[p]=f[y],d[p]=f[y+1],g[p]=f[y+2],n[p]=f[y+3]));else{for(n=new Uint8Array(o),p=0;p<o;p++)(y=4*(x[p]-h))<h||y>m?n[p]=0:(c[p]=f[y],d[p]=f[y+1],g[p]=f[y+2],n[p]=f[y+3]);r.mask=n}else if(n)for(p=0;p<o;p++)n[p]&&(l=s[x[p]],c[p]=l[0],d[p]=l[1],g[p]=l[2],n[p]=l[3]);else{for(n=new Uint8Array(o),p=0;p<o;p++)l=s[x[p]],c[p]=l[0],d[p]=l[1],g[p]=l[2],n[p]=l[3];r.mask=n}return r.pixels=[c,d,g],r.statistics=null,r.pixelType="u8",r.maskIsAlpha=u,r},e.estimateStatisticsHistograms=function(t){if(!i(t))return null;t.statistics||t.updateStatistics();var e,r,a,n,o,l,f,s,h,u,m,p,x,c,d=t.pixels,g=t.mask,y=t.pixelType,w=t.statistics,v=t.width*t.height,M=d.length,k=[],A=[];for(n=0;n<M;n++){if(l=new Uint32Array(256),s=d[n],"u8"===y)if(e=-.5,r=255.5,g)for(o=0;o<v;o++)g[o]&&l[s[o]]++;else for(o=0;o<v;o++)l[s[o]]++;else{if(e=w[n].minValue,a=((r=w[n].maxValue)-e)/256,f=new Uint32Array(257),g)for(o=0;o<v;o++)g[o]&&f[Math.floor((s[o]-e)/a)]++;else for(o=0;o<v;o++)f[Math.floor((s[o]-e)/a)]++;for(o=0;o<255;o++)l[o]=f[o];l[255]=f[255]+f[256]}for(k.push({min:e,max:r,size:256,counts:l}),h=0,u=0,x=0,o=0;o<256;o++)h+=l[o],u+=o*l[o];for(c=u/h,o=0;o<256;o++)x+=l[o]*Math.pow(o-c,2);m=(c+.5)*(a=(r-e)/256)+e,p=Math.sqrt(x/(h-1))*a,A.push({min:e,max:r,avg:m,stddev:p})}return{statistics:A,histograms:k}},e.estimateStatisticsFromHistograms=function(t){for(var e=[],r=0;r<t.length;r++){for(var i=t[r],a=i.min,n=i.max,o=i.size,l=i.counts,f=0,s=0,h=0;h<o;h++)f+=l[h],s+=h*l[h];var u=s/f,m=0;for(h=0;h<o;h++)m+=l[h]*Math.pow(h-u,2);var p=(n-a)/o,x=(u+.5)*p+a,c=Math.sqrt(m/(f-1))*p;e.push({min:a,max:n,avg:x,stddev:c})}return e},e.createStretchLUT=function(t){var e=t.minCutOff,r=t.maxCutOff,i=t.gamma,n=t.pixelType,o=t.outMin||0,l=t.outMax||255;if(-1===["u8","u16","s8","s16"].indexOf(n))return null;var f,s,h=e.length,u=0;"s8"===n?u=-127:"s16"===n&&(u=-32767);var m=256;["u16","s16"].indexOf(n)>-1&&(m=65536);var p=[],x=[],c=l-o;for(f=0;f<h;f++)x[f]=r[f]-e[f],p[f]=c/(r[f]-e[f]);var d,g=i&&i.length>=h,y=[];if(g)for(f=0;f<h;f++)i[f]>1?i[f]>2?y[f]=6.5+Math.pow(i[f]-2,2.5):y[f]=6.5+100*Math.pow(2-i[f],4):y[f]=1;var w,v,M,k=[];if(g)for(f=0;f<h;f++){for(M=[],s=0;s<m;s++)d=((w=s+u)-e[f])/x[f],v=1,i[f]>1&&(v-=Math.pow(1/c,d*y[f])),w<r[f]&&w>e[f]?M[s]=Math.floor(v*c*Math.pow(d,1/i[f]))+o:w>=r[f]?M[s]=l:M[s]=o;k[f]=M}else for(f=0;f<h;f++){for(M=[],s=0;s<m;s++)(w=s+u)<=e[f]?M[s]=o:w>=r[f]?M[s]=l:M[s]=Math.floor((w-e[f])/x[f]*c)+o;k[f]=M}if(null!=t.contrastOffset){var A=a(t.contrastOffset,t.brightnessOffset);for(f=0;f<h;f++)for(M=k[f],s=0;s<m;s++)M[s]=A[M[s]]}return{lut:k,offset:u}},e.createContrastBrightnessLUT=a,e.stretch=function(t,e){if(!i(t))return null;var r,a,n,o,l,f=t.clone(),s=f.pixels,h=f.mask,u=e.minCutOff,m=e.maxCutOff,p=e.gamma,x=e.outMin||0,c=e.outMax||255,d=f.width*f.height,g=s.length,y=c-x,w=[],v=[];for(r=0;r<g;r++)v[r]=m[r]-u[r],w[r]=y/(m[r]-u[r]);var M=p&&p.length>=g,k=[];if(M)for(r=0;r<g;r++)p[r]>1?p[r]>2?k[r]=6.5+Math.pow(p[r]-2,2.5):k[r]=6.5+100*Math.pow(2-p[r],4):k[r]=1;if(M)if(null!=h){for(a=0;a<d;a++)if(h[a])for(r=0;r<g;r++)l=((n=s[r][a])-u[r])/v[r],o=1,p[r]>1&&(o-=Math.pow(1/y,l*k[r])),n<m[r]&&n>u[r]?s[r][a]=Math.floor(o*y*Math.pow(l,1/p[r]))+x:n>=m[r]?s[r][a]=c:s[r][a]=x}else for(a=0;a<d;a++)for(r=0;r<g;r++)l=((n=s[r][a])-u[r])/v[r],o=1,p[r]>1&&(o-=Math.pow(1/y,l*k[r])),n<m[r]&&n>u[r]?s[r][a]=Math.floor(o*y*Math.pow(l,1/p[r]))+x:n>=m[r]?s[r][a]=c:s[r][a]=x;else if(null!=h){for(a=0;a<d;a++)if(h[a])for(r=0;r<g;r++)(n=s[r][a])<m[r]&&n>u[r]?s[r][a]=Math.floor((n-u[r])/v[r]*y)+x:n>=m[r]?s[r][a]=c:s[r][a]=x}else for(a=0;a<d;a++)for(r=0;r<g;r++)(n=s[r][a])<m[r]&&n>u[r]?s[r][a]=Math.floor((n-u[r])/v[r]*y)+x:n>=m[r]?s[r][a]=c:s[r][a]=x;return f.pixelType="u8",f.updateStatistics(),f},e.lookupPixels=function(t,e){if(!i(t))return null;var a,n,o=t.pixels,l=t.mask,f=t.width*t.height,s=o.length,h=e.lut,u=e.offset;h&&1===h[0].length&&(h=o.map((function(){return h})));var m,p,x,c=[];if(u)if(null==l)for(a=0;a<s;a++){for(m=o[a],p=h[a],x=new Uint8Array(f),n=0;n<f;n++)x[n]=p[m[n]-u];c.push(x)}else for(a=0;a<s;a++){for(m=o[a],p=h[a],x=new Uint8Array(f),n=0;n<f;n++)l[n]&&(x[n]=p[m[n]-u]);c.push(x)}else if(null==l)for(a=0;a<s;a++){for(m=o[a],p=h[a],x=new Uint8Array(f),n=0;n<f;n++)x[n]=p[m[n]];c.push(x)}else for(a=0;a<s;a++){for(m=o[a],p=h[a],x=new Uint8Array(f),n=0;n<f;n++)l[n]&&(x[n]=p[m[n]]);c.push(x)}var d=new r({width:t.width,height:t.height,pixels:c,mask:l,pixelType:"u8"});return d.updateStatistics(),d},e.remapColor=function(t,e){if(!i(t))return null;var r,a,n,o,l,f,s=t.clone(),h=s.pixels,u=s.width*s.height,m=e.length,p=Math.floor(m/2),x=e[Math.floor(p)],c=h[0],d=!1,g=new Uint8Array(u),y=new Uint8Array(u),w=new Uint8Array(u),v=s.mask,M=4===e[0].mappedColor.length;for(v||((v=new Uint8Array(u)).fill(M?255:1),s.mask=v),l=0;l<u;l++)if(v[l]){for(r=c[l],d=!1,f=p,a=x,n=0,o=m-1;o-n>1;){if(r===a.value){d=!0;break}r>a.value?n=f:o=f,f=Math.floor((n+o)/2),a=e[Math.floor(f)]}d||(r===e[n].value?(a=e[n],d=!0):r===e[o].value?(a=e[o],d=!0):r<e[n].value?(d=!1,a=null):r>e[n].value&&(r<e[o].value?(a=e[n],d=!0):o===m-1?(d=!1,a=null):(a=e[o],d=!0))),d?(g[l]=a.mappedColor[0],y[l]=a.mappedColor[1],w[l]=a.mappedColor[2],v[l]=a.mappedColor[3]):g[l]=y[l]=w[l]=v[l]=0}return s.pixels=[g,y,w],s.mask=v,s.pixelType="u8",s.maskIsAlpha=M,s},e.getClipBounds=n,e.mosaicPixelData=function(t,e){if(!t||0===t.length)return null;var r=t.filter((function(t){return t.pixelBlock}))[0];if(!r)return null;var i=(r.extent.xmax-r.extent.xmin)/r.pixelBlock.width,a=(r.extent.ymax-r.extent.ymin)/r.pixelBlock.height,n=.01*Math.min(i,a),l=t.sort((function(t,e){return Math.abs(t.extent.ymax-e.extent.ymax)>n?e.extent.ymax-t.extent.ymax:Math.abs(t.extent.xmin-e.extent.xmin)>n?t.extent.xmin-e.extent.xmin:0})),f=Math.min.apply(null,l.map((function(t){return t.extent.xmin}))),s=Math.min.apply(null,l.map((function(t){return t.extent.ymin}))),h=Math.max.apply(null,l.map((function(t){return t.extent.xmax}))),u=Math.max.apply(null,l.map((function(t){return t.extent.ymax}))),m={x:Math.round((e.xmin-f)/i),y:Math.round((u-e.ymax)/a)},p={width:Math.round((h-f)/i),height:Math.round((u-s)/a)},x={width:Math.round((e.xmax-e.xmin)/i),height:Math.round((e.ymax-e.ymin)/a)};return Math.round(p.width/r.pixelBlock.width)*Math.round(p.height/r.pixelBlock.height)!==l.length||m.x<0||m.y<0||p.width<x.width||p.height<x.height?null:{extent:e,pixelBlock:o(l.map((function(t){return t.pixelBlock})),p,m,x)}},e.mosaic=o,e.setValidBoundary=function(t,e,r){if(!i(t))return null;var a=t.width,n=t.height,o=e.x,l=e.y,f=r.width+o,s=r.height+l;if(o<0||l<0||f>a||s>n)return t;if(0===o&&0===l&&f===a&&s===n)return t;t.mask||(t.mask=new Uint8Array(a*n));for(var h=t.mask,u=0;u<n;u++)for(var m=u*a,p=0;p<a;p++)h[m+p]=u<l||u>=s||p<o||p>=f?0:1;return t.updateStatistics(),t},e.resampleByMajority=l,e.clip=function(t,e,a){var n=e.x,o=e.y,l=a.width,f=a.height;if(0===n&&0===o&&f===t.height&&l===t.width)return t;var s=t.width,h=t.height,u=Math.max(0,o),m=Math.max(0,n),p=Math.min(n+l,s),x=Math.min(o+f,h);if(p<0||x<0||!i(t))return null;n=Math.max(0,-n),o=Math.max(0,-o);for(var c=t.pixels,d=t.mask,g=l*f,y=c.length,w=[],v=0;v<y;v++){for(var M=c[v],k=r.createEmptyBand(t.pixelType,g),A=u;A<x;A++)for(var U=A*s,C=(A+o)*l+n,T=m;T<p;T++)k[C++]=M[U+T];w.push(k)}var B=new Uint8Array(g);for(A=u;A<x;A++)for(U=A*s,C=(A+o)*l+n,T=m;T<p;T++)B[C++]=d?d[U+T]:1;var S=new r({width:a.width,height:a.height,pixels:w,mask:B});return S.updateStatistics(),S},e.approximateTransform=function(t,e,a,n,o){if(void 0===o&&(o="nearest"),!i(t))return null;"majority"===o&&(t=l(t));for(var f,s,h,u,m,p,x,c=t.pixels,d=t.mask,g=t.pixelType,y=t.width,w=t.height,v=r.getPixelArrayConstructor(g),M=c.length,k=e.width,A=e.height,U=n.cols,C=n.rows,T=Math.ceil(k/U),B=Math.ceil(A/C),S=!1,P=0;P<a.length;P+=3)-1===a[P]&&-1===a[P+1]&&-1===a[P+2]&&(S=!0);var O,L,b=new Float32Array(k*A),j=new Float32Array(k*A),z=0,D="majority"===o?0:.5;for(P=0;P<B;P++)for(var F=0;F<T;F++){s=a[f=12*(P*T+F)],h=a[f+1],u=a[f+2],m=a[f+3],p=a[f+4],x=a[f+5];for(var H=0;H<C;H++){z=(P*C+H)*k+F*U,L=(H+.5)/C;for(var I=0;I<H;I++)O=(I+.5)/U,b[z+I]=Math.round((s*O+h*L+u)*y-D),j[z+I]=Math.round((m*O+p*L+x)*w-D)}s=a[f+=6],h=a[f+1],u=a[f+2],m=a[f+3],p=a[f+4],x=a[f+5];for(H=0;H<C;H++){z=(P*C+H)*k+F*U,L=(H+.5)/C;for(I=H;I<U;I++)O=(I+.5)/U,b[z+I]=Math.round((s*O+h*L+u)*y-D),j[z+I]=Math.round((m*O+p*L+x)*w-D)}}for(var V,q=function(t,e){for(var r=0;r<A;r++){f=r*k;for(var i=0;i<k;i++)b[f]<0||j[f]<0?t[f]=0:t[f]=e[b[f]+j[f]*y],f++}},E=[],_=0;_<M;_++)q(V=new v(k*A),c[_]),E.push(V);var G=new r({width:k,height:A,pixelType:g,pixels:E});if(d)G.mask=new Uint8Array(k*A),q(G.mask,d);else if(S){G.mask=new Uint8Array(k*A);for(P=0;P<k*A;P++)G.mask[P]=b[P]<0||j[P]<0?0:1}return G.updateStatistics(),G}}));