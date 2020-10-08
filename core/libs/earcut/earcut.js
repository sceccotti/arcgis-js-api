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

define(["require","exports"],(function(e,n){"use strict";function r(e,n,r,t,x){var i;if(x===l(e,n,r,t)>0)for(var v=n;v<r;v+=t)i=u(v,e[v],e[v+1],i);else for(v=r-t;v>=n;v-=t)i=u(v,e[v],e[v+1],i);return i&&s(i,i.next)&&(f(i),i=i.next),i}function t(e,n){if(void 0===n&&(n=e),!e)return e;var r,t=e;do{if(r=!1,t.steiner||!s(t,t.next)&&0!==a(t.prev,t,t.next))t=t.next;else{if(f(t),(t=n=t.prev)===t.next)break;r=!0}}while(r||t!==n);return n}function x(e,n,r,u,y,o,a){if(void 0===a&&(a=0),e){!a&&o&&(e=function e(n,r,t,x){for(var i=void 0;i!==n;i=i.next){if(null===(i=i||n).z&&(i.z=c(i.x,i.y,r,t,x)),i.prev.next!==i||i.next.prev!==i)return i.prev.next=i,i.next.prev=i,e(n,r,t,x);i.prevZ=i.prev,i.nextZ=i.next}return n.prevZ.nextZ=null,n.prevZ=null,function(e){var n,r=1;for(;;){var t=e,x=void 0;e=null,n=null;for(var i=0;t;){i++,x=t;for(var v=0;v<r&&x;v++)x=x.nextZ;for(var u=r;v>0||u>0&&x;){var f=void 0;0===v?(f=x,x=x.nextZ,u--):0!==u&&x?t.z<=x.z?(f=t,t=t.nextZ,v--):(f=x,x=x.nextZ,u--):(f=t,t=t.nextZ,v--),n?n.nextZ=f:e=f,f.prevZ=n,n=f}t=x}if(n.nextZ=null,r*=2,i<2)return e}}(n)}(e,u,y,o));for(var p=e;e.prev!==e.next;){var l=e.prev,h=e.next;if(o?v(e,u,y,o):i(e))n.push(l.index/r),n.push(e.index/r),n.push(h.index/r),f(e),e=h.next,p=h.next;else if((e=h)===p){a?1===a?x(e=w(e,n,r),n,r,u,y,o,2):2===a&&g(e,n,r,u,y,o):x(t(e),n,r,u,y,o,1);break}}}}function i(e){var n=e.prev,r=e,t=e.next;if(a(n,r,t)>=0)return!1;for(var x=e.next.next,i=x,v=0;x!==e.prev&&(0===v||x!==i);){if(v++,h(n.x,n.y,r.x,r.y,t.x,t.y,x.x,x.y)&&a(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function v(e,n,r,t){var x=e.prev,i=e,v=e.next;if(a(x,i,v)>=0)return!1;for(var u=x.x<i.x?x.x<v.x?x.x:v.x:i.x<v.x?i.x:v.x,f=x.y<i.y?x.y<v.y?x.y:v.y:i.y<v.y?i.y:v.y,y=x.x>i.x?x.x>v.x?x.x:v.x:i.x>v.x?i.x:v.x,o=x.y>i.y?x.y>v.y?x.y:v.y:i.y>v.y?i.y:v.y,p=c(u,f,n,r,t),l=c(y,o,n,r,t),d=e.prevZ,s=e.nextZ;d&&d.z>=p&&s&&s.z<=l;){if(d!==e.prev&&d!==e.next&&h(x.x,x.y,i.x,i.y,v.x,v.y,d.x,d.y)&&a(d.prev,d,d.next)>=0)return!1;if(d=d.prevZ,s!==e.prev&&s!==e.next&&h(x.x,x.y,i.x,i.y,v.x,v.y,s.x,s.y)&&a(s.prev,s,s.next)>=0)return!1;s=s.nextZ}for(;d&&d.z>=p;){if(d!==e.prev&&d!==e.next&&h(x.x,x.y,i.x,i.y,v.x,v.y,d.x,d.y)&&a(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;s&&s.z<=l;){if(s!==e.prev&&s!==e.next&&h(x.x,x.y,i.x,i.y,v.x,v.y,s.x,s.y)&&a(s.prev,s,s.next)>=0)return!1;s=s.nextZ}return!0}function u(e,n,r,t){var x=new b(e,n,r);return t?(x.next=t.next,x.prev=t,t.next.prev=x,t.next=x):(x.prev=x,x.next=x),x}function f(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function y(e){var n=e,r=e;do{(n.x<r.x||n.x===r.x&&n.y<r.y)&&(r=n),n=n.next}while(n!==e);return r}function o(e,n){if(n=function(e,n){var r,t=n,x=e.x,i=e.y,v=-1/0;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){var u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=x&&u>v){if(v=u,u===x){if(i===t.y)return t;if(i===t.next.y)return t.next}r=t.x<t.next.x?t:t.next}}t=t.next}while(t!==n);if(!r)return null;if(x===v)return r.prev;var f,y=r,o=r.x,a=r.y,p=1/0;t=r.next;for(;t!==y;)x>=t.x&&t.x>=o&&x!==t.x&&h(i<a?x:v,i,o,a,i<a?v:x,i,t.x,t.y)&&((f=Math.abs(i-t.y)/(x-t.x))<p||f===p&&t.x>r.x)&&d(t,e)&&(r=t,p=f),t=t.next;return r}(e,n)){var r=z(n,e);t(r,r.next)}}function a(e,n,r){return(n.y-e.y)*(r.x-n.x)-(n.x-e.x)*(r.y-n.y)}function p(e,n,r,t){return!!(s(e,n)&&s(r,t)||s(e,t)&&s(r,n))||a(e,n,r)>0!=a(e,n,t)>0&&a(r,t,e)>0!=a(r,t,n)>0}function l(e,n,r,t){for(var x=0,i=n,v=r-t;i<r;i+=t)x+=(e[v]-e[i])*(e[i+1]+e[v+1]),v=i;return x}function h(e,n,r,t,x,i,v,u){return(x-v)*(n-u)-(e-v)*(i-u)>=0&&(e-v)*(t-u)-(r-v)*(n-u)>=0&&(r-v)*(i-u)-(x-v)*(t-u)>=0}function d(e,n){return a(e.prev,e,e.next)<0?a(e,n,e.next)>=0&&a(e,e.prev,n)>=0:a(e,n,e.prev)<0||a(e,e.next,n)<0}function c(e,n,r,t,x){return(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-r)*x)|e<<8))|e<<4))|e<<2))|e<<1))|(n=1431655765&((n=858993459&((n=252645135&((n=16711935&((n=32767*(n-t)*x)|n<<8))|n<<4))|n<<2))|n<<1))<<1}function s(e,n){return e.x===n.x&&e.y===n.y}function Z(e,n){return e.x-n.x}function w(e,n,r){var t=e;do{var x=t.prev,i=t.next.next;!s(x,i)&&p(x,t,t.next,i)&&d(x,i)&&d(i,x)&&(n.push(x.index/r),n.push(t.index/r),n.push(i.index/r),f(t),f(t.next),t=e=i),t=t.next}while(t!==e);return t}function g(e,n,r,i,v,u){var f=e;do{for(var y=f.next.next;y!==f.prev;){if(f.index!==y.index&&M(f,y)){var o=z(f,y);return f=t(f,f.next),o=t(o,o.next),x(f,n,r,i,v,u),void x(o,n,r,i,v,u)}y=y.next}f=f.next}while(f!==e)}function M(e,n){return e.next.index!==n.index&&e.prev.index!==n.index&&!function(e,n){var r=e;do{if(r.index!==e.index&&r.next.index!==e.index&&r.index!==n.index&&r.next.index!==n.index&&p(r,r.next,e,n))return!0;r=r.next}while(r!==e);return!1}(e,n)&&d(e,n)&&d(n,e)&&function(e,n){var r=e,t=!1,x=(e.x+n.x)/2,i=(e.y+n.y)/2;do{r.y>i!=r.next.y>i&&r.next.y!==r.y&&x<(r.next.x-r.x)*(i-r.y)/(r.next.y-r.y)+r.x&&(t=!t),r=r.next}while(r!==e);return t}(e,n)}function z(e,n){var r=new b(e.index,e.x,e.y),t=new b(n.index,n.x,n.y),x=e.next,i=n.prev;return e.next=n,n.prev=e,r.next=x,x.prev=r,t.next=r,r.prev=t,i.next=t,t.prev=i,t}Object.defineProperty(n,"__esModule",{value:!0}),n.deviation=n.earcut=void 0,n.earcut=function(e,n,i){var v,u,f,a,p,l=n&&n.length,h=l?n[0]*i:e.length,d=r(e,0,h,i,!0),c=new Array;if(!d||d.next===d.prev)return c;if(l&&(d=function(e,n,x,i){for(var v=new Array,u=0,f=n.length;u<f;u++){var a=n[u]*i,p=u<f-1?n[u+1]*i:e.length,l=r(e,a,p,i,!1);l===l.next&&(l.steiner=!0),v.push(y(l))}v.sort(Z);for(var h=0,d=v;h<d.length;h++){o(d[h],x),x=t(x,x.next)}return x}(e,n,d,i)),e.length>80*i){v=f=e[0],u=a=e[1];for(var s=i;s<h;s+=i){var w=e[s],g=e[s+1];v=Math.min(v,w),u=Math.min(u,g),f=Math.max(f,w),a=Math.max(a,g)}p=0!==(p=Math.max(f-v,a-u))?1/p:0}return x(d,c,i,v,u,p),c},n.deviation=function(e,n,r,t){var x=n&&n.length,i=x?n[0]*r:e.length,v=Math.abs(l(e,0,i,r));if(x)for(var u=0,f=n.length;u<f;u++){var y=n[u]*r,o=u<f-1?n[u+1]*r:e.length;v-=Math.abs(l(e,y,o,r))}var a=0;for(u=0;u<t.length;u+=3){var p=t[u]*r,h=t[u+1]*r,d=t[u+2]*r;a+=Math.abs((e[p]-e[d])*(e[h+1]-e[p+1])-(e[p]-e[h])*(e[d+1]-e[p+1]))}return 0===v&&0===a?0:Math.abs((a-v)/v)};var b=function(e,n,r){this.index=e,this.x=n,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}}));