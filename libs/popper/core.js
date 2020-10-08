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

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).Popper={})}(this,(function(e){"use strict";function t(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function n(e){if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t?t.defaultView:window}return e}function r(e){var t=n(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function o(e){return e instanceof n(e).Element||e instanceof Element}function i(e){return e instanceof n(e).HTMLElement||e instanceof HTMLElement}function a(e){return e?(e.nodeName||"").toLowerCase():null}function s(e){return(o(e)?e.ownerDocument:e.document).documentElement}function f(e){return t(s(e)).left+r(e).scrollLeft}function c(e){return n(e).getComputedStyle(e)}function p(e){var t=c(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function l(e,o,c){void 0===c&&(c=!1);var l,u,d=s(o),m=t(e),h=i(o),b={scrollLeft:0,scrollTop:0},g={x:0,y:0};return(h||!h&&!c)&&(("body"!==a(o)||p(d))&&(b=(l=o)!==n(l)&&i(l)?{scrollLeft:(u=l).scrollLeft,scrollTop:u.scrollTop}:r(l)),i(o)?((g=t(o)).x+=o.clientLeft,g.y+=o.clientTop):d&&(g.x=f(d))),{x:m.left+b.scrollLeft-g.x,y:m.top+b.scrollTop-g.y,width:m.width,height:m.height}}function u(e){return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}}function d(e){return"html"===a(e)?e:e.assignedSlot||e.parentNode||e.host||s(e)}function m(e,t){void 0===t&&(t=[]);var r=function e(t){return["html","body","#document"].indexOf(a(t))>=0?t.ownerDocument.body:i(t)&&p(t)?t:e(d(t))}(e),o="body"===a(r),s=n(r),f=o?[s].concat(s.visualViewport||[],p(r)?r:[]):r,c=t.concat(f);return o?c:c.concat(m(d(f)))}function h(e){return["table","td","th"].indexOf(a(e))>=0}function b(e){if(!i(e)||"fixed"===c(e).position)return null;var t=e.offsetParent;if(t){var n=s(t);if("body"===a(t)&&"static"===c(t).position&&"static"!==c(n).position)return n}return t}function g(e){for(var t=n(e),r=b(e);r&&h(r)&&"static"===c(r).position;)r=b(r);return r&&"body"===a(r)&&"static"===c(r).position?t:r||function(e){for(var t=d(e);i(t)&&["html","body"].indexOf(a(t))<0;){var n=c(t);if("none"!==n.transform||"none"!==n.perspective||n.willChange&&"auto"!==n.willChange)return t;t=t.parentNode}return null}(e)||t}var v="top",y="bottom",w="right",O="left",x=[v,y,w,O],j=x.reduce((function(e,t){return e.concat([t+"-start",t+"-end"])}),[]),E=[].concat(x,["auto"]).reduce((function(e,t){return e.concat([t,t+"-start",t+"-end"])}),[]),M=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function P(e){var t=new Map,n=new Set,r=[];return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||function e(o){n.add(o.name),[].concat(o.requires||[],o.requiresIfExists||[]).forEach((function(r){if(!n.has(r)){var o=t.get(r);o&&e(o)}})),r.push(o)}(e)})),r}function D(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return[].concat(n).reduce((function(e,t){return e.replace(/%s/,t)}),e)}var S='Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',k=["name","enabled","phase","fn","effect","requires","options"];function q(e){return e.split("-")[0]}function L(e,t){var n=Boolean(t.getRootNode&&t.getRootNode().host);if(e.contains(t))return!0;if(n){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function A(e){return Object.assign(Object.assign({},e),{},{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function T(e,o){return"viewport"===o?A(function(e){var t=n(e),r=s(e),o=t.visualViewport,i=r.clientWidth,a=r.clientHeight,c=0,p=0;return o&&(i=o.width,a=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(c=o.offsetLeft,p=o.offsetTop)),{width:i,height:a,x:c+f(e),y:p}}(e)):i(o)?function(e){var n=t(e);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(o):A(function(e){var t=s(e),n=r(e),o=e.ownerDocument.body,i=Math.max(t.scrollWidth,t.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=Math.max(t.scrollHeight,t.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),p=-n.scrollLeft+f(e),l=-n.scrollTop;return"rtl"===c(o||t).direction&&(p+=Math.max(t.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:p,y:l}}(s(e)))}function B(e,t,n){var r="clippingParents"===t?function(e){var t=m(d(e)),n=["absolute","fixed"].indexOf(c(e).position)>=0&&i(e)?g(e):e;return o(n)?t.filter((function(e){return o(e)&&L(e,n)&&"body"!==a(e)})):[]}(e):[].concat(t),s=[].concat(r,[n]),f=s[0],p=s.reduce((function(t,n){var r=T(e,n);return t.top=Math.max(r.top,t.top),t.right=Math.min(r.right,t.right),t.bottom=Math.min(r.bottom,t.bottom),t.left=Math.max(r.left,t.left),t}),T(e,f));return p.width=p.right-p.left,p.height=p.bottom-p.top,p.x=p.left,p.y=p.top,p}function W(e){return e.split("-")[1]}function H(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function C(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?q(o):null,a=o?W(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case v:t={x:s,y:n.y-r.height};break;case y:t={x:s,y:n.y+n.height};break;case w:t={x:n.x+n.width,y:f};break;case O:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?H(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case"start":t[c]=Math.floor(t[c])-Math.floor(n[p]/2-r[p]/2);break;case"end":t[c]=Math.floor(t[c])+Math.ceil(n[p]/2-r[p]/2)}}return t}function R(e){return Object.assign(Object.assign({},{top:0,right:0,bottom:0,left:0}),e)}function I(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function V(e,n){void 0===n&&(n={});var r=n,i=r.placement,a=void 0===i?e.placement:i,f=r.boundary,c=void 0===f?"clippingParents":f,p=r.rootBoundary,l=void 0===p?"viewport":p,u=r.elementContext,d=void 0===u?"popper":u,m=r.altBoundary,h=void 0!==m&&m,b=r.padding,g=void 0===b?0:b,O=R("number"!=typeof g?g:I(g,x)),j="popper"===d?"reference":"popper",E=e.elements.reference,M=e.rects.popper,P=e.elements[h?j:d],D=B(o(P)?P:P.contextElement||s(e.elements.popper),c,l),S=t(E),k=C({reference:S,element:M,strategy:"absolute",placement:a}),q=A(Object.assign(Object.assign({},M),k)),L="popper"===d?q:S,T={top:D.top-L.top+O.top,bottom:L.bottom-D.bottom+O.bottom,left:D.left-L.left+O.left,right:L.right-D.right+O.right},W=e.modifiersData.offset;if("popper"===d&&W){var H=W[a];Object.keys(T).forEach((function(e){var t=[w,y].indexOf(e)>=0?1:-1,n=[v,y].indexOf(e)>=0?"y":"x";T[e]+=H[n]*t}))}return T}var N="Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",U={placement:"bottom",modifiers:[],strategy:"absolute"};function _(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function F(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,i=t.defaultOptions,a=void 0===i?U:i;return function(e,t,n){void 0===n&&(n=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign(Object.assign({},U),a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},p=[],d=!1,h={state:f,setOptions:function(n){b(),f.options=Object.assign(Object.assign(Object.assign({},a),f.options),n),f.scrollParents={reference:o(e)?m(e):e.contextElement?m(e.contextElement):[],popper:m(t)};var i=function(e){var t=P(e);return M.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign(Object.assign(Object.assign({},n),t),{},{options:Object.assign(Object.assign({},n.options),t.options),data:Object.assign(Object.assign({},n.data),t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,f.options.modifiers)));(f.orderedModifiers=i.filter((function(e){return e.enabled})),function(e){e.forEach((function(t){Object.keys(t).forEach((function(n){switch(n){case"name":"string"!=typeof t.name&&console.error(D(S,String(t.name),'"name"','"string"','"'+String(t.name)+'"'));break;case"enabled":"boolean"!=typeof t.enabled&&console.error(D(S,t.name,'"enabled"','"boolean"','"'+String(t.enabled)+'"'));case"phase":M.indexOf(t.phase)<0&&console.error(D(S,t.name,'"phase"',"either "+M.join(", "),'"'+String(t.phase)+'"'));break;case"fn":"function"!=typeof t.fn&&console.error(D(S,t.name,'"fn"','"function"','"'+String(t.fn)+'"'));break;case"effect":"function"!=typeof t.effect&&console.error(D(S,t.name,'"effect"','"function"','"'+String(t.fn)+'"'));break;case"requires":Array.isArray(t.requires)||console.error(D(S,t.name,'"requires"','"array"','"'+String(t.requires)+'"'));break;case"requiresIfExists":Array.isArray(t.requiresIfExists)||console.error(D(S,t.name,'"requiresIfExists"','"array"','"'+String(t.requiresIfExists)+'"'));break;case"options":case"data":break;default:console.error('PopperJS: an invalid property has been provided to the "'+t.name+'" modifier, valid properties are '+k.map((function(e){return'"'+e+'"'})).join(", ")+'; but "'+n+'" was provided.')}t.requires&&t.requires.forEach((function(n){null==e.find((function(e){return e.name===n}))&&console.error(D('Popper: modifier "%s" requires "%s", but "%s" modifier is not available',String(t.name),n,n))}))}))}))}((s=[].concat(i,f.options.modifiers),l=function(e){return e.name},u=new Set,s.filter((function(e){var t=l(e);if(!u.has(t))return u.add(t),!0})))),"auto"===q(f.options.placement))&&(f.orderedModifiers.find((function(e){return"flip"===e.name}))||console.error(['Popper: "auto" placements require the "flip" modifier be',"present and enabled to work."].join(" ")));var s,l,u,d=c(t);return[d.marginTop,d.marginRight,d.marginBottom,d.marginLeft].some((function(e){return parseFloat(e)}))&&console.warn(['Popper: CSS "margin" styles cannot be used to apply padding',"between the popper and its reference element or boundary.","To replicate margin, use the `offset` modifier, as well as","the `padding` option in the `preventOverflow` and `flip`","modifiers."].join(" ")),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:h,options:r});p.push(i||function(){})}})),h.update()},forceUpdate:function(){if(!d){var e=f.elements,t=e.reference,n=e.popper;if(_(t,n)){f.rects={reference:l(t,g(n),"fixed"===f.options.strategy),popper:u(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0,o=0;o<f.orderedModifiers.length;o++){if((r+=1)>100){console.error("Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.");break}if(!0!==f.reset){var i=f.orderedModifiers[o],a=i.fn,s=i.options,c=void 0===s?{}:s,p=i.name;"function"==typeof a&&(f=a({state:f,options:c,name:p,instance:h})||f)}else f.reset=!1,o=-1}}else console.error(N)}},update:(i=function(){return new Promise((function(e){h.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){b(),d=!0}};if(!_(e,t))return console.error(N),h;function b(){p.forEach((function(e){return e()})),p=[]}return h.setOptions(n).then((function(e){!d&&n.onFirstUpdate&&n.onFirstUpdate(e)})),h}}var z={passive:!0};var G={top:"auto",right:"auto",bottom:"auto",left:"auto"};function X(e){var t,r=e.popper,o=e.popperRect,i=e.placement,a=e.offsets,f=e.position,c=e.gpuAcceleration,p=e.adaptive,l=function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:Math.round(t*r)/r||0,y:Math.round(n*r)/r||0}}(a),u=l.x,d=l.y,m=a.hasOwnProperty("x"),h=a.hasOwnProperty("y"),b=O,x=v,j=window;if(p){var E=g(r);E===n(r)&&(E=s(r)),i===v&&(x=y,d-=E.clientHeight-o.height,d*=c?1:-1),i===O&&(b=w,u-=E.clientWidth-o.width,u*=c?1:-1)}var M,P=Object.assign({position:f},p&&G);return c?Object.assign(Object.assign({},P),{},((M={})[x]=h?"0":"",M[b]=m?"0":"",M.transform=(j.devicePixelRatio||1)<2?"translate("+u+"px, "+d+"px)":"translate3d("+u+"px, "+d+"px, 0)",M)):Object.assign(Object.assign({},P),{},((t={})[x]=h?d+"px":"",t[b]=m?u+"px":"",t.transform="",t))}var Y={left:"right",right:"left",bottom:"top",top:"bottom"};function J(e){return e.replace(/left|right|bottom|top/g,(function(e){return Y[e]}))}var K={start:"end",end:"start"};function Q(e){return e.replace(/start|end/g,(function(e){return K[e]}))}function Z(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?E:f,p=W(r),l=p?s?j:j.filter((function(e){return W(e)===p})):x,u=l.filter((function(e){return c.indexOf(e)>=0}));0===u.length&&(u=l,console.error(["Popper: The `allowedAutoPlacements` option did not allow any","placements. Ensure the `placement` option matches the variation","of the allowed placements.",'For example, "auto" cannot be used to allow "bottom-start".','Use "auto-start" instead.'].join(" ")));var d=u.reduce((function(t,n){return t[n]=V(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[q(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}function $(e,t,n){return Math.max(e,Math.min(t,n))}function ee(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function te(e){return[v,w,y,O].some((function(t){return e[t]>=0}))}var ne=[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=n(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,z)})),f&&c.addEventListener("resize",r.update,z),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,z)})),f&&c.removeEventListener("resize",r.update,z)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=C({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=c(t.elements.popper).transitionProperty||"";a&&["transform","top","right","bottom","left"].some((function(e){return s.indexOf(e)>=0}))&&console.warn(["Popper: Detected CSS transitions on at least one of the following",'CSS properties: "transform", "top", "right", "bottom", "left".',"\n\n",'Disable the "computeStyles" modifier\'s `adaptive` option to allow',"for smooth transitions, or remove these properties from the CSS","transition declaration on the popper element if only transitioning","opacity or background-color for example.","\n\n","We recommend using the popper element as a wrapper around an inner","element that can have any CSS property transitioned for animations."].join(" "));var f={placement:q(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign(Object.assign({},t.styles.popper),X(Object.assign(Object.assign({},f),{},{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign(Object.assign({},t.styles.arrow),X(Object.assign(Object.assign({},f),{},{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1})))),t.attributes.popper=Object.assign(Object.assign({},t.attributes.popper),{},{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];i(o)&&a(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},s=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});i(r)&&a(r)&&(Object.assign(r.style,s),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=E.reduce((function(e,n){return e[n]=function(e,t,n){var r=q(e),o=[O,v].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign(Object.assign({},t),{},{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[O,w].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,l=n.rootBoundary,u=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,b=t.options.placement,g=q(b),x=f||(g===b||!m?[J(b)]:function(e){if("auto"===q(e))return[];var t=J(e);return[Q(e),t,Q(t)]}(b)),j=[b].concat(x).reduce((function(e,n){return e.concat("auto"===q(n)?Z(t,{placement:n,boundary:p,rootBoundary:l,padding:c,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),E=t.rects.reference,M=t.rects.popper,P=new Map,D=!0,S=j[0],k=0;k<j.length;k++){var L=j[k],A=q(L),T="start"===W(L),B=[v,y].indexOf(A)>=0,H=B?"width":"height",C=V(t,{placement:L,boundary:p,rootBoundary:l,altBoundary:u,padding:c}),R=B?T?w:O:T?y:v;E[H]>M[H]&&(R=J(R));var I=J(R),N=[];if(i&&N.push(C[A]<=0),s&&N.push(C[R]<=0,C[I]<=0),N.every((function(e){return e}))){S=L,D=!1;break}P.set(L,N)}if(D)for(var U=function(e){var t=j.find((function(t){var n=P.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return S=t,"break"},_=m?3:1;_>0;_--){if("break"===U(_))break}t.placement!==S&&(t.modifiersData[r]._skip=!0,t.placement=S,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0!==a&&a,f=n.boundary,c=n.rootBoundary,p=n.altBoundary,l=n.padding,d=n.tether,m=void 0===d||d,h=n.tetherOffset,b=void 0===h?0:h,x=V(t,{boundary:f,rootBoundary:c,padding:l,altBoundary:p}),j=q(t.placement),E=W(t.placement),M=!E,P=H(j),D="x"===P?"y":"x",S=t.modifiersData.popperOffsets,k=t.rects.reference,L=t.rects.popper,A="function"==typeof b?b(Object.assign(Object.assign({},t.rects),{},{placement:t.placement})):b,T={x:0,y:0};if(S){if(i){var B="y"===P?v:O,C="y"===P?y:w,R="y"===P?"height":"width",I=S[P],N=S[P]+x[B],U=S[P]-x[C],_=m?-L[R]/2:0,F="start"===E?k[R]:L[R],z="start"===E?-L[R]:-k[R],G=t.elements.arrow,X=m&&G?u(G):{width:0,height:0},Y=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},J=Y[B],K=Y[C],Q=$(0,k[R],X[R]),Z=M?k[R]/2-_-Q-J-A:F-Q-J-A,ee=M?-k[R]/2+_+Q+K+A:z+Q+K+A,te=t.elements.arrow&&g(t.elements.arrow),ne=te?"y"===P?te.clientTop||0:te.clientLeft||0:0,re=t.modifiersData.offset?t.modifiersData.offset[t.placement][P]:0,oe=S[P]+Z-re-ne,ie=S[P]+ee-re,ae=$(m?Math.min(N,oe):N,I,m?Math.max(U,ie):U);S[P]=ae,T[P]=ae-I}if(s){var se="x"===P?v:O,fe="x"===P?y:w,ce=S[D],pe=$(ce+x[se],ce,ce-x[fe]);S[D]=pe,T[D]=pe-ce}t.modifiersData[r]=T}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=n.elements.arrow,i=n.modifiersData.popperOffsets,a=q(n.placement),s=H(a),f=[O,w].indexOf(a)>=0?"height":"width";if(o&&i){var c=n.modifiersData[r+"#persistent"].padding,p=u(o),l="y"===s?v:O,d="y"===s?y:w,m=n.rects.reference[f]+n.rects.reference[s]-i[s]-n.rects.popper[f],h=i[s]-n.rects.reference[s],b=g(o),x=b?"y"===s?b.clientHeight||0:b.clientWidth||0:0,j=m/2-h/2,E=c[l],M=x-p[f]-c[d],P=x/2-p[f]/2+j,D=$(E,P,M),S=s;n.modifiersData[r]=((t={})[S]=D,t.centerOffset=D-P,t)}},effect:function(e){var t=e.state,n=e.options,r=e.name,o=n.element,a=void 0===o?"[data-popper-arrow]":o,s=n.padding,f=void 0===s?0:s;null!=a&&("string"!=typeof a||(a=t.elements.popper.querySelector(a)))&&(i(a)||console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).',"To use an SVG arrow, wrap it in an HTMLElement that will be used as","the arrow."].join(" ")),L(t.elements.popper,a)?(t.elements.arrow=a,t.modifiersData[r+"#persistent"]={padding:R("number"!=typeof f?f:I(f,x))}):console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper',"element."].join(" ")))},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=V(t,{elementContext:"reference"}),s=V(t,{altBoundary:!0}),f=ee(a,r),c=ee(s,o,i),p=te(f),l=te(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:l},t.attributes.popper=Object.assign(Object.assign({},t.attributes.popper),{},{"data-popper-reference-hidden":p,"data-popper-escaped":l})}}],re=F({defaultModifiers:ne});e.createPopper=re,e.defaultModifiers=ne,e.detectOverflow=V,e.popperGenerator=F,Object.defineProperty(e,"__esModule",{value:!0})}));