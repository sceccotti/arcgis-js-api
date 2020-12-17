/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","./_rollupPluginBabelHelpers","../Color","../views/2d/engine/vectorTiles/expression/data","../views/2d/unitBezier","../views/2d/engine/vectorTiles/GeometryUtils"],(function(t,e,n,r,o,a){"use strict";let i=function(){function t(t){this.args=t}return t.parse=function(e){if(4!==e.length)throw new Error('"rgb" expects 3 arguments.');return new t(e.slice(1).map((t=>Et(t))))},t.prototype.evaluate=function(t,e){const n=this.args[1].evaluate(t,e),r=this.args[2].evaluate(t,e),o=this.args[3].evaluate(t,e);return`rgb(${Math.round(n)},${Math.round(r)},${Math.round(o)})`},t}(),u=function(){function t(t){this.args=t}return t.parse=function(t){if(5!==t.length)throw new Error('"rgba" expects 4 arguments.');const e=t.slice(1).map((t=>Et(t)));return new i(e)},t.prototype.evaluate=function(t,e){const n=this.args[1].evaluate(t,e),r=this.args[2].evaluate(t,e),o=this.args[3].evaluate(t,e),a=this.args[4].evaluate(t,e);return`rgb(${Math.round(n)},${Math.round(r)},${Math.round(o)},${a})`},t}(),s=function(){function t(t){this.color=t}return t.parse=function(e){if(2!==e.length)throw new Error('"to-rgba" expects 1 argument.');return new t(Et(e[1]))},t.prototype.evaluate=function(t,e){return new n(this.color.evaluate(t,e)).toRgba()},t}(),l=function(){function t(t,e,n){this.lhs=t,this.rhs=e,this.compare=n}return t.parse=function(e,n){if(3!==e.length&&4!==e.length)throw new Error(`"${e[0]}" expects 2 or 3 arguments`);if(4===e.length)throw new Error(`"${e[0]}" collator not supported`);return new t(Et(e[1]),Et(e[2]),n)},t.prototype.evaluate=function(t,e){return this.compare(this.lhs.evaluate(t,e),this.rhs.evaluate(t,e))},t}(),c=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return l.parse(t,((t,e)=>t===e))},n}(l),h=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return l.parse(t,((t,e)=>t!==e))},n}(l),f=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return l.parse(t,((t,e)=>t<e))},n}(l),p=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return l.parse(t,((t,e)=>t<=e))},n}(l),g=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return l.parse(t,((t,e)=>t>e))},n}(l),w=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return l.parse(t,((t,e)=>t>=e))},n}(l),y=function(){function t(t){this.arg=t}return t.parse=function(e){if(2!==e.length)throw new Error('"!" expects 1 argument');return new t(Et(e[1]))},t.prototype.evaluate=function(t,e){return!this.arg.evaluate(t,e)},t}(),m=function(){function t(t){this.args=t}return t.parse=function(e){const n=[];for(let t=1;t<e.length;t++)n.push(Et(e[t]));return new t(n)},t.prototype.evaluate=function(t,e){for(const n of this.args)if(!n.evaluate(t,e))return!1;return!0},t}(),b=function(){function t(t){this.args=t}return t.parse=function(e){const n=[];for(let t=1;t<e.length;t++)n.push(Et(e[t]));return new t(n)},t.prototype.evaluate=function(t,e){for(const n of this.args)if(n.evaluate(t,e))return!0;return!1},t}(),v=function(){function t(t){this.args=t}return t.parse=function(e){const n=[];for(let t=1;t<e.length;t++)n.push(Et(e[t]));return new t(n)},t.prototype.evaluate=function(t,e){for(const n of this.args)if(n.evaluate(t,e))return!1;return!0},t}(),d=function(){function t(t,e){this.args=t,this.fallback=e}return t.parse=function(e){if(e.length<4)throw new Error('"case" expects at least 3 arguments');if(e.length%2==1)throw new Error('"case" expects an odd number of arguments');const n=[];for(let t=1;t<e.length-1;t+=2)n.push({condition:Et(e[t]),output:Et(e[t+1])});return new t(n,Et(e[e.length-1]))},t.prototype.evaluate=function(t,e){for(const n of this.args)if(n.condition.evaluate(t,e))return n.output.evaluate(t,e);return this.fallback.evaluate(t,e)},t}(),x=function(){function t(t){this.args=t}return t.parse=function(e){if(e.length<2)throw new Error('"coalesce" expects at least 1 argument');const n=[];for(let t=1;t<e.length;t++)n.push(Et(e[t]));return new t(n)},t.prototype.evaluate=function(t,e){for(const n of this.args){const r=n.evaluate(t,e);if(null!==r)return r}return null},t}(),E=function(){function t(t,e,n,r){this.input=t,this.labels=e,this.outputs=n,this.fallback=r}return t.parse=function(e){if(e.length<3)throw new Error('"match" expects at least 3 arguments');if(e.length%2==0)throw new Error('"case" expects an even number of arguments');const n=Et(e[1]),r=[],o={};let a;for(let t=2;t<e.length-1;t+=2){let n=e[t];Array.isArray(n)||(n=[n]);for(const t of n){const e=typeof t;if("string"!==e&&"number"!==e)throw new Error('"match" requires string or number literal as labels');if(a){if(e!==a)throw new Error('"match" requires labels to have the same type')}else a=e;o[t]=r.length}r.push(Et(e[t+1]))}return new t(n,o,r,Et(e[e.length-1]))},t.prototype.evaluate=function(t,e){const n=this.input.evaluate(t,e);return(this.outputs[this.labels[n]]||this.fallback).evaluate(t,e)},t}();const M=.95047,k=1.08883,$=4/29,T=6/29,L=3*T*T,A=Math.PI/180,N=180/Math.PI;function I(t){return t>.008856451679035631?Math.pow(t,1/3):t/L+$}function _(t){return t>T?t*t*t:L*(t-$)}function q(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function j(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function C(t){const e=j(t.r),n=j(t.g),r=j(t.b),o=I((.4124564*e+.3575761*n+.1804375*r)/M),a=I((.2126729*e+.7151522*n+.072175*r)/1);return{l:116*a-16,a:500*(o-a),b:200*(a-I((.0193339*e+.119192*n+.9503041*r)/k)),alpha:t.a}}function S(t){let e=(t.l+16)/116,r=isNaN(t.a)?e:e+t.a/500,o=isNaN(t.b)?e:e-t.b/200;return e=1*_(e),r=M*_(r),o=k*_(o),new n([q(3.2404542*r-1.5371385*e-.4985314*o),q(-.969266*r+1.8760108*e+.041556*o),q(.0556434*r-.2040259*e+1.0572252*o),t.alpha])}function R(t){const{l:e,a:n,b:r}=C(t),o=Math.atan2(r,n)*N;return{h:o<0?o+360:o,c:Math.sqrt(n*n+r*r),l:e,alpha:t.a}}function O(t,e,n){const r=e-t;return t+n*(r>180||r<-180?r-360*Math.round(r/360):r)}let z=function(){function t(t,e,n,r){this.operator=t,this.input=e,this.stops=n,this.interpolation=r}return t.parse=function(e){if(e.length<5)throw new Error(`"${e[0]}" expects at least 4 arguments.`);const n=e[1];if(!Array.isArray(n)||0===n.length)throw new Error(`"${e[0]}" expects an interpolation type expression.`);switch(n[0]){case"linear":break;case"exponential":if("number"!=typeof n[1])throw new Error(`"${e[0]}" expects a numeric base for exponential interpolation.`);break;case"cubic-bezier":if(5!==n.length)throw new Error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.");for(let t=1;t<5;t++){const e=n[t];if("number"!=typeof e||e<0||e>1)throw new Error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.")}break;default:throw new Error(`"${e[0]}" unknown interpolation type "${n[0]}".`)}if(e.length%2!=1)throw new Error(`"${e[0]}" expects an even number of arguments.`);const r=Et(e[2]),o=[];for(let t=3;t<e.length;t+=2){const n=e[t];if("number"!=typeof n)throw new Error(`"${e[0]}" requires stop inputs as literal numbers.`);if(o.length&&o[o.length-1][0]>=n)throw new Error(`"${e[0]}" requires strictly ascending stop inputs.`);o.push([n,Et(e[t+1])])}return new t(e[0],r,o,n)},t.prototype.evaluate=function(e,n){const r=this.stops;if(1===r.length)return r[0][1].evaluate(e,n);const o=this.input.evaluate(e,n);if(o<=r[0][0])return r[0][1].evaluate(e,n);if(o>=r[r.length-1][0])return r[r.length-1][1].evaluate(e,n);let i=0;for(;++i<r.length&&!(o<r[i][0]););const u=r[i-1][0],s=r[i][0],l=t.interpolationRatio(this.interpolation,o,u,s),c=r[i-1][1].evaluate(e,n),h=r[i][1].evaluate(e,n);return"interpolate"===this.operator?Array.isArray(c)?c.map(((t,e)=>a.interpolate(t,h[e],l))):a.interpolate(c,h,l):"interpolate-hcl"===this.operator?function(t){const e=t.h*A,n=t.c;return S({l:t.l,a:Math.cos(e)*n,b:Math.sin(e)*n,alpha:t.alpha})}(function(t,e,n){return{h:O(t.h,e.h,n),c:a.interpolate(t.c,e.c,n),l:a.interpolate(t.l,e.l,n),alpha:a.interpolate(t.alpha,e.alpha,n)}}(R(c),R(h),l)):S(function(t,e,n){return{l:a.interpolate(t.l,e.l,n),a:a.interpolate(t.a,e.a,n),b:a.interpolate(t.b,e.b,n),alpha:a.interpolate(t.alpha,e.alpha,n)}}(C(c),C(h),l))},t.interpolationRatio=function(e,n,r,a){let i=0;if("exponential"===e[0])i=t.exponentialInterpolationRatio(n,e[1],r,a);else if("linear"===e[0])i=t.exponentialInterpolationRatio(n,1,r,a);else if("cubic-bezier"===e[0]){i=o.unitBezier(e[1],e[2],e[3],e[4])(t.exponentialInterpolationRatio(n,1,r,a),1e-5)}return i},t.exponentialInterpolationRatio=function(t,e,n,r){const o=r-n;if(0===o)return 0;const a=t-n;return 1===e?a/o:(Math.pow(e,a)-1)/(Math.pow(e,o)-1)},t}(),P=function(){function t(t,e){this.input=t,this.stops=e}return t.parse=function(e){if(e.length<5)throw new Error('"step" expects at least 4 arguments.');if(e.length%2!=1)throw new Error('"step" expects an even number of arguments.');const n=Et(e[1]),r=[];r.push([-1/0,Et(e[2])]);for(let t=3;t<e.length;t+=2){const n=e[t];if("number"!=typeof n)throw new Error('"step" requires stop inputs as literal numbers.');if(r.length&&r[r.length-1][0]>=n)throw new Error('"step" requires strictly ascending stop inputs.');r.push([n,Et(e[t+1])])}return new t(n,r)},t.prototype.evaluate=function(t,e){const n=this.stops;if(1===n.length)return n[0][1].evaluate(t,e);const r=this.input.evaluate(t,e);let o=0;for(;++o<n.length&&!(r<n[o][0]););return this.stops[o-1][1].evaluate(t,e)},t}(),B=function(){function t(t,e){this.index=t,this.array=e}return t.parse=function(e){if(3!==e.length)throw new Error('"at" expects 2 arguments.');return new t(Et(e[1]),Et(e[2]))},t.prototype.evaluate=function(t,e){const n=this.index.evaluate(t,e),r=this.array.evaluate(t,e);if(n<0||n>=r.length)throw new Error('"at" index out of bounds.');if(n!==Math.floor(n))throw new Error('"at" index must be an integer.');return r[n]},t}(),G=function(){function t(t,e){this.key=t,this.obj=e}return t.parse=function(e){let n,r;switch(e.length){case 2:return n=Et(e[1]),new t(n);case 3:return n=Et(e[1]),r=Et(e[2]),new t(n,r);default:throw new Error('"get" expects 1 or 2 arguments')}},t.prototype.evaluate=function(t,e){const n=this.key.evaluate(t,e);if(this.obj){return this.obj.evaluate(t,e)[n]}return t.values[n]},t}(),D=function(){function t(t,e){this.key=t,this.obj=e}return t.parse=function(e){let n,r;switch(e.length){case 2:return n=Et(e[1]),new t(n);case 3:return n=Et(e[1]),r=Et(e[2]),new t(n,r);default:throw new Error('"has" expects 1 or 2 arguments')}},t.prototype.evaluate=function(t,e){const n=this.key.evaluate(t,e);if(this.obj){return n in this.obj.evaluate(t,e)}return void 0!==t.values[n]},t}(),H=function(){function t(t,e){this.key=t,this.vals=e}return t.parse=function(e){if(3!==e.length)throw new Error('"in" expects 2 arguments');return new t(Et(e[1]),Et(e[2]))},t.prototype.evaluate=function(t,e){const n=this.key.evaluate(t,e);return-1!==this.vals.evaluate(t,e).indexOf(n)},t}(),U=function(){function t(t,e,n){this.item=t,this.array=e,this.from=n}return t.parse=function(e){if(e.length<3||e.length>4)throw new Error('"index-of" expects 3 or 4 arguments.');const n=Et(e[1]),r=Et(e[2]);if(4===e.length){return new t(n,r,Et(e[3]))}return new t(n,r)},t.prototype.evaluate=function(t,e){const n=this.item.evaluate(t,e),r=this.array.evaluate(t,e);if(this.from){const o=this.from.evaluate(t,e);if(o!==Math.floor(o))throw new Error('"index-of" index must be an integer.');return r.indexOf(n,o)}return r.indexOf(n)},t}(),F=function(){function t(t){this.arg=t}return t.parse=function(e){if(2!==e.length)throw new Error('"length" expects 2 arguments.');return new t(Et(e[1]))},t.prototype.evaluate=function(t,e){const n=this.arg.evaluate(t,e);if("string"==typeof n)return n.length;if(Array.isArray(n))return n.length;throw new Error('"length" expects string or array.')},t}(),J=function(){function t(t,e,n){this.array=t,this.from=e,this.to=n}return t.parse=function(e){if(e.length<3||e.length>4)throw new Error('"slice" expects 2 or 3 arguments.');const n=Et(e[1]),r=Et(e[2]);if(4===e.length){return new t(n,r,Et(e[3]))}return new t(n,r)},t.prototype.evaluate=function(t,e){const n=this.array.evaluate(t,e),r=this.from.evaluate(t,e);if(r<0||r>=n.length)throw new Error('"slice" index out of bounds.');if(r!==Math.floor(r))throw new Error('"slice" index must be an integer.');if(this.to){const o=this.to.evaluate(t,e);if(o<0||o>=n.length)throw new Error('"slice" index out of bounds.');if(o!==Math.floor(o))throw new Error('"slice" index must be an integer.');return n.slice(r,o)}return n.slice(r)},t}(),Q=function(){function t(){}return t.parse=function(e){if(1!==e.length)throw new Error('"has-id" expects no arguments');return new t},t.prototype.evaluate=function(t,e){return void 0!==t.id},t}(),V=function(){function t(t,e){this.args=t,this.calculate=e}return t.parse=function(e,n){return new t(e.slice(1).map((t=>Et(t))),n)},t.prototype.evaluate=function(t,e){let n;return this.args&&(n=this.args.map((n=>n.evaluate(t,e)))),this.calculate(n)},t}(),Y=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){switch(t.length){case 2:return V.parse(t,(t=>-t[0]));case 3:return V.parse(t,(t=>t[0]-t[1]));default:throw new Error('"-" expects 1 or 2 arguments')}},n}(V),Z=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return V.parse(t,(t=>{let e=1;for(const n of t)e*=n;return e}))},n}(V),K=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){if(3===t.length)return V.parse(t,(t=>t[0]/t[1]));throw new Error('"/" expects 2 arguments')},n}(V),W=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){if(3===t.length)return V.parse(t,(t=>t[0]%t[1]));throw new Error('"%" expects 2 arguments')},n}(V),X=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){if(3===t.length)return V.parse(t,(t=>Math.pow(t[0],t[1])));throw new Error('"^" expects 1 or 2 arguments')},n}(V),tt=function(t){function n(){return t.apply(this,arguments)||this}return e._inheritsLoose(n,t),n.parse=function(t){return V.parse(t,(t=>{let e=0;for(const n of t)e+=n;return e}))},n}(V),et=function(){function t(t,e){this.args=t,this.calculate=e}return t.parse=function(e){return new t(e.slice(1).map((t=>Et(t))),t.ops[e[0]])},t.prototype.evaluate=function(t,e){let n;return this.args&&(n=this.args.map((n=>n.evaluate(t,e)))),this.calculate(n)},t}();et.ops={abs:t=>Math.abs(t[0]),acos:t=>Math.acos(t[0]),asin:t=>Math.asin(t[0]),atan:t=>Math.atan(t[0]),ceil:t=>Math.ceil(t[0]),cos:t=>Math.cos(t[0]),e:()=>Math.E,floor:t=>Math.floor(t[0]),ln:t=>Math.log(t[0]),ln2:()=>Math.LN2,log10:t=>Math.log(t[0])/Math.LN10,log2:t=>Math.log(t[0])/Math.LN2,max:t=>Math.max(...t),min:t=>Math.min(...t),pi:()=>Math.PI,round:t=>Math.round(t[0]),sin:t=>Math.sin(t[0]),sqrt:t=>Math.sqrt(t[0]),tan:t=>Math.tan(t[0])};let nt=function(){function t(t){this.args=t}return t.parse=function(e){return new t(e.slice(1).map((t=>Et(t))))},t.prototype.evaluate=function(t,e){return this.args.map((n=>n.evaluate(t,e))).join("")},t}(),rt=function(){function t(t,e){this.arg=t,this.calculate=e}return t.parse=function(e){if(2!==e.length)throw new Error(`${e[0]} expects 1 argument.`);return new t(Et(e[1]),t.ops[e[0]])},t.prototype.evaluate=function(t,e){return this.calculate(this.arg.evaluate(t,e))},t}();rt.ops={downcase:t=>t.toLowerCase(),upcase:t=>t.toUpperCase()};const ot={kind:"null"},at={kind:"number"},it={kind:"string"},ut={kind:"boolean"},st={kind:"color"},lt={kind:"object"},ct={kind:"value"};function ht(t,e){return{kind:"array",itemType:t,n:e}}const ft=[ot,at,it,ut,st,lt,ht(ct)];function pt(t){if("array"===t.kind){const e=pt(t.itemType);return"number"==typeof t.n?`array<${e}, ${t.n}>`:"value"===t.itemType.kind?"array":`array<${e}>`}return t.kind}function gt(t){if(null===t)return ot;if("string"==typeof t)return it;if("boolean"==typeof t)return ut;if("number"==typeof t)return at;if(t instanceof n)return st;if(Array.isArray(t)){let e;for(const n of t){const t=gt(n);if(e){if(e===t)continue;e=ct;break}e=t}return ht(e||ct,t.length)}return lt}function wt(t,e){if("error"===t.kind)return null;if("array"===e.kind){if("array"===t.kind&&(0===t.n&&"value"===t.itemType.kind||!wt(t.itemType,e.itemType))&&("number"!=typeof e.n||e.n===t.n))return null}else{if(e.kind===t.kind)return null;if("value"===e.kind)for(const e of ft)if(!wt(e,t))return null}return`Expected ${pt(e)} but found ${pt(t)} instead.`}function yt(t){const e=typeof t;return null===t?"":"string"===e||"number"===e||"boolean"===e?String(t):t instanceof n?t.toString():JSON.stringify(t)}let mt=function(){function t(t,e){this.type=t,this.args=e}return t.parse=function(e){const n=e[0];if(e.length<2)throw new Error(`${n} expects at least one argument.`);let r,o=1;if("array"===n){if(e.length>2){switch(e[1]){case"string":r=it;break;case"number":r=at;break;case"boolean":r=ut;break;default:throw new Error('"array" type argument must be string, number or boolean')}o++}else r=ct;let t;if(e.length>3){if(t=e[2],null!==t&&("number"!=typeof t||t<0||t!==Math.floor(t)))throw new Error('"array" length argument must be a positive integer literal');o++}r=ht(r,t)}else switch(n){case"string":r=it;break;case"number":r=at;break;case"boolean":r=ut;break;case"object":r=lt}const a=[];for(;o<e.length;o++){const t=Et(e[o]);a.push(t)}return new t(r,a)},t.prototype.evaluate=function(t,e){for(const n of this.args){const r=n.evaluate(t,e);if(!wt(gt(r),this.type))return r}return null},t}(),bt=function(){function t(t,e){this.type=t,this.args=e}return t.parse=function(e){const n=e[0];if("to-boolean"===n||"to-string"===n){if(2!==e.length)throw new Error(`${n} expects one argument.`)}else if(e.length<2)throw new Error(`${n} expects at least one argument.`);const r=t.types[n],o=[];for(let t=1;t<e.length;t++){const n=Et(e[t]);o.push(n)}return new t(r,o)},t.prototype.evaluate=function(t,e){if(this.type===ut)return Boolean(this.args[0].evaluate(t,e));if(this.type===it)return yt(this.args[0].evaluate(t,e));if(this.type===at){for(const n of this.args){const r=n.evaluate(t,e);if(null===r)return 0;const o=Number(r);if(!isNaN(o))return o}return null}if(this.type===st){for(const r of this.args){const o=r.evaluate(t,e);if(o instanceof n)return o;if("string"==typeof o)return n.fromString(o);if(Array.isArray(o)&&(3===o.length||4===o.length))return n.fromArray(o)}return null}},t}();bt.types={"to-boolean":ut,"to-color":st,"to-number":at,"to-string":it};let vt=function(){function t(t){this.val=t}return t.parse=function(e){if(2!==e.length)throw new Error('"literal" expects 1 argument');return new t(e[1])},t.prototype.evaluate=function(t,e){return this.val},t}(),dt=function(){function t(t){this.arg=t}return t.parse=function(e){if(2!==e.length)throw new Error('"typeof" expects 1 argument');return new t(Et(e[1]))},t.prototype.evaluate=function(t,e){return pt(gt(this.arg.evaluate(t,e)))},t}();const xt={array:mt,boolean:mt,collator:null,format:null,literal:vt,image:null,number:mt,"number-format":null,object:mt,string:mt,"to-boolean":bt,"to-color":bt,"to-number":bt,"to-string":bt,typeof:dt,accumulated:null,"feature-state":null,"geometry-type":r.GeomType,id:r.ID,"line-progress":null,properties:r.Properties,at:B,get:G,has:D,in:H,"index-of":U,length:F,slice:J,"!":y,"!=":h,"<":f,"<=":p,"==":c,">":g,">=":w,all:m,any:b,case:d,coalesce:x,match:E,within:null,interpolate:z,"interpolate-hcl":z,"interpolate-lab":z,step:P,let:null,var:null,concat:nt,downcase:rt,"is-supported-script":null,"resolved-locale":null,upcase:rt,rgb:i,rgba:u,"to-rgba":s,"-":Y,"*":Z,"/":K,"%":W,"^":X,"+":tt,abs:et,acos:et,asin:et,atan:et,ceil:et,cos:et,e:et,floor:et,ln:et,ln2:et,log10:et,log2:et,max:et,min:et,pi:et,round:et,sin:et,sqrt:et,tan:et,zoom:r.Zoom,"heatmap-density":null,"has-id":Q,none:v};function Et(t){if(null!==t&&"string"!=typeof t&&"boolean"!=typeof t&&"number"!=typeof t||(t=["literal",t]),!Array.isArray(t)||0===t.length)throw new Error("Expression must be a non empty array");const e=t[0];if("string"!=typeof e)throw new Error("First element of expression must be a string");const n=xt[e];if(void 0===n)throw new Error(`Invalid expression operator "${e}"`);if(!n)throw new Error(`Unimplemented expression operator "${e}"`);return n.parse(t)}t.ALL=m,t.ANY=b,t.Add=tt,t.Assert=mt,t.At=B,t.BooleanType=ut,t.Calculate=et,t.Case=d,t.Coalesce=x,t.Coerce=bt,t.ColorType=st,t.Concat=nt,t.Div=K,t.EQ=c,t.ErrorType={kind:"error"},t.GE=w,t.GT=g,t.Get=G,t.Has=D,t.HasID=Q,t.In=H,t.IndexOf=U,t.Interpolate=z,t.LE=p,t.LT=f,t.Length=F,t.Literal=vt,t.Match=E,t.Mod=W,t.Mul=Z,t.NE=h,t.NONE=v,t.NOT=y,t.NullType=ot,t.NumberType=at,t.ObjectType=lt,t.Pow=X,t.Rgb=i,t.Rgba=u,t.Slice=J,t.Step=P,t.String=rt,t.StringType=it,t.Sub=Y,t.ToRgba=s,t.TypeOf=dt,t.ValueType=ct,t.array=ht,t.createExpression=Et,t.ops=xt,t.typeToString=pt,t.valueToString=yt}));