/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["require","exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/has","../../../../core/maybe","../../../../core/Logger","../../../../core/accessorSupport/ensureType","../../../../core/accessorSupport/decorators/property","../../../../core/accessorSupport/decorators/subclass","../../../../core/urlUtils","../../../../core/uuid","../../../../portal/support/resourceExtension","../../../../core/arrayUtils","../../../../core/Accessor","../../../../geometry/SpatialReference","../../../../geometry/support/webMercatorUtils","../../../../geometry","../../../../chunks/vec3","../../../../core/watchUtils","../../../../core/unitUtils","../../../../geometry/support/aaBoundingRect","../../../../geometry/projection","../../../../core/sql/WhereClause","../../../../geometry/support/aaBoundingBox","../../../layers/support/FeatureFilter","./I3SUtil"],(function(e,t,r,n,i,o,s,a,c,l,p,d,u,f,h,y,g,S,m,b,w,_,j,F,I,M,R){"use strict";const V=s.getLogger("esri.views.3d.layers.i3s.I3SMeshViewFilter");let k;t.I3SMeshViewFilter=function(t){function n(e){var r;return(r=t.call(this,e)||this)._projectionEngineLoaded=!1,r}r._inheritsLoose(n,t);var i=n.prototype;return i.initialize=function(){b.whenOnce(this,"filter.geometry").then((()=>this.loadAsyncModule(async function(){if(k)return k;return k=await new Promise((function(t,r){e(["../../../../geometry/geometryEngine"],t,r)})),k}().then((e=>{this.destroyed||(this._geometryEngine=e,this.applyFilters())})))))},i.addFilters=function(e,t,r,n){const i=this.sortedObjectIds;o.isSome(i)&&e.push((e=>R.objectIdFilter(i,!0,e))),this.addSqlFilter(e,this.parsedWhereClause);const s=this.parsedGeometry;if(o.isSome(s)){const i=this.spatialRelationship;e.push(((e,o)=>function(e,t,r,n,i,o,s){const a=o[0].spatialReference||n.spatialReference;if(!j.projectBoundingSphere(t.node.mbs,i,E,a))return void V.warnOnce("SceneLayerView.filter.geometry is using unsupported SpatialReference, skipping geometry filter");const c=function(e,t,r,n,i){const o=t.renderSpatialReference,s=new Map,a={rings:[[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]],hasZ:!1,hasM:!1,type:"polygon",spatialReference:r};a.rings[0][3]=a.rings[0][0];const c={indices:null,data:null,stride:0,startIndex:0,endIndex:0};let l,p;switch(e){case"intersects":l=(e,t)=>k.intersects(e,t)?0:2,p=W;break;case"contains":l=(e,t)=>k.contains(e,t)?2:1,p=W;break;case"disjoint":default:l=(e,t)=>k.disjoint(e,t)?2:1,p=T}return{collection:n,object:i,type:e,maskSR:r,renderSR:o,aabbCache:s,triangle:a,positions:c,triangleTest:l,geometryTest:p}}(s,n,a,r,t.objectHandle),l=function(e,t){const r={x:e[0],y:e[1],hasZ:!1,hasM:!1,type:"point",spatialReference:t.maskSR},n=t.maskSR.isWGS84||t.maskSR.isWebMercator?k.geodesicBuffer(r,e[3],1):k.buffer(r,e[3],1);return n.type="polygon",n}(E,c);for(const r of o){if(0===e.length)return;switch(O(r,l,s)){case 1:return void(e.length=0);case 0:continue}R.filterInPlace(e,t.featureIds,(e=>C(r,e,c)))}}(e,o,n,t,r,s,i)))}},n.checkSupport=function(e){return e.timeExtent?(V.warn("Filters with a timeExtent are not supported for mesh scene layers"),!1):null!=(t=e.spatialRelationship)&&x.indexOf(t)>=0||(V.warn(`Filters with spatialRelationship other than ${x.join(", ")} are not supported for mesh scene layers`),!1);var t},r._createClass(n,[{key:"sortedObjectIds",get:function(){if(o.isNone(this.filter.objectIds))return null;const e=new Float64Array(this.filter.objectIds);return e.sort(),e}},{key:"parsedWhereClause",get:function(){const e=o.isSome(this.filter)?this.filter.where:null;if(o.isNone(e)||!e)return null;try{return F.WhereClause.create(e,this.layerFieldsIndex)}catch(e){V.error(`Failed to parse filter where clause: ${e}`)}return null}},{key:"parsedGeometry",get:function(){if(o.isNone(this.filter))return null;if(!this._geometryEngine)return null;const{geometry:e}=this.filter;if(o.isNone(e))return null;const{distance:t,units:r}=this.filter,n=this.spatialRelationship,i="mesh"===e.type?e.extent:e;if(o.isNone(t)||0===t)return v(i,n);const s=r||w.getUnitString(i.spatialReference);if(i.spatialReference.isWGS84){return v(this._geometryEngine.geodesicBuffer(i,t,s),n)}if(g.canProject(i,y.WGS84)){return v(g.project(this._geometryEngine.geodesicBuffer(g.project(i,y.WGS84),t,s),i.spatialReference),n)}if(!this._projectionEngineLoaded&&(this.loadAsyncModule(j.load().then((()=>this._projectionEngineLoaded=!0))),!this._projectionEngineLoaded))return null;let a=null;try{a=j.project(i,y.WGS84)}catch(e){}if(a)try{a=j.project(this._geometryEngine.geodesicBuffer(a,t,s),i.spatialReference)}catch(e){a=null}return a||V.error(`Filter by geodesic buffer (distance) unsupported, failed to project input geometry (${i.spatialReference.wkid}) to WGS84.`),v(a,n)}},{key:"spatialRelationship",get:function(){return o.isSome(this.filter)?this.filter.spatialRelationship:"intersects"}}]),n}(h),n.__decorate([c.property({type:M})],t.I3SMeshViewFilter.prototype,"filter",void 0),n.__decorate([c.property()],t.I3SMeshViewFilter.prototype,"layerFieldsIndex",void 0),n.__decorate([c.property()],t.I3SMeshViewFilter.prototype,"loadAsyncModule",void 0),n.__decorate([c.property()],t.I3SMeshViewFilter.prototype,"applyFilters",void 0),n.__decorate([c.property()],t.I3SMeshViewFilter.prototype,"addSqlFilter",void 0),n.__decorate([c.property({readOnly:!0})],t.I3SMeshViewFilter.prototype,"sortedObjectIds",null),n.__decorate([c.property({readOnly:!0})],t.I3SMeshViewFilter.prototype,"parsedWhereClause",null),n.__decorate([c.property({readOnly:!0})],t.I3SMeshViewFilter.prototype,"parsedGeometry",null),n.__decorate([c.property({readOnly:!0})],t.I3SMeshViewFilter.prototype,"spatialRelationship",null),n.__decorate([c.property({})],t.I3SMeshViewFilter.prototype,"_projectionEngineLoaded",void 0),n.__decorate([c.property({})],t.I3SMeshViewFilter.prototype,"_geometryEngine",void 0),t.I3SMeshViewFilter=n.__decorate([l.subclass("esri.views.3d.layers.i3s.I3SMeshViewFilter")],t.I3SMeshViewFilter);const x=["contains","intersects","disjoint"];function v(e,t){if(!e)return null;if("disjoint"===t&&"polygon"===e.type){const t=new Array(e.rings.length);for(let r=0;r<e.rings.length;++r){const n=_.fromValues(1/0,1/0,-1/0,-1/0);_.expandWithNestedArray(n,e.rings[r]),t[r]={type:"polygon",rings:[e.rings[r]],spatialReference:e.spatialReference,aabr:n}}t.sort(((e,t)=>e.aabr[0]-t.aabr[0]));const r=new Set,n=new f.PositionHint;for(let e=0;e<t.length;++e){const i=t[e];for(let n=e+1;n<t.length;++n){const e=t[n];if(e.aabr[0]>=i.aabr[2])break;r.add(e)}r.forEach((e=>{if(i!==e)if(e.aabr[2]<=i.aabr[0])r.delete(e);else if(k.intersects(i,e)){i.rings=i.rings.concat(e.rings),_.expand(i.aabr,e.aabr),delete i._geVersion,r.delete(e);const o=f.indexOf(t,e,t.length,n);t.splice(o,1)}})),r.add(i)}for(const e of t)delete e.aabr;return t}return[e]}const E=[0,0,0,0];function O(e,t,r){switch(r){case"intersects":case"contains":return W(e,t);case"disjoint":return T(e,t)}}function W(e,t){return k.intersects(e,t)?k.contains(e,t)?0:2:1}function T(e,t){return k.intersects(e,t)?k.contains(e,t)?1:2:0}function C(e,t,r){const{collection:n,object:i,renderSR:o,maskSR:s,geometryTest:a,aabbCache:c}=r;let l=c.get(t);if(!l){const e=n.getObjectTransform(i);n.getComponentAabb(i,t,B);const r=[[B[0],B[1],0],[B[0],B[4],0],[B[3],B[4],0],[B[3],B[1],0]];for(let t=0;t<4;++t)m.transformMat3(r[t],r[t],e.rotationScale),m.add(r[t],r[t],e.position),j.projectVectorToVector(r[t],o,r[t],s);l={rings:[r],hasZ:!1,hasM:!1,type:"polygon",spatialReference:s},l.rings[0][4]=l.rings[0][0],c.set(t,l)}switch(a(e,l)){case 1:return!1;case 0:return!0}const{triangle:p,triangleTest:d,positions:u}=r,f=p.rings[0][0],h=p.rings[0][1],y=p.rings[0][2],g=n.getObjectTransform(i);n.getComponentPositions(i,t,u);const{indices:S,data:b,stride:w,startIndex:_,endIndex:F}=u;for(let t=_;t<F;t+=3){const r=w*S[t+0],n=w*S[t+1],i=w*S[t+2];m.set(f,b[r+0],b[r+1],b[r+2]),m.set(h,b[n+0],b[n+1],b[n+2]),m.set(y,b[i+0],b[i+1],b[i+2]),m.transformMat3(f,f,g.rotationScale),m.transformMat3(h,h,g.rotationScale),m.transformMat3(y,y,g.rotationScale),m.add(f,f,g.position),m.add(h,h,g.position),m.add(y,y,g.position),j.projectVectorToVector(f,o,f,s),j.projectVectorToVector(h,o,h,s),j.projectVectorToVector(y,o,y,s);const a=h[0]-f[0],c=h[1]-f[1],l=y[0]-f[0],u=y[1]-f[1];if(!(Math.abs(a*u-c*l)<2.3283064365386963e-10))switch(delete p._geVersion,d(e,p)){case 1:return!1;case 0:return!0}}switch(r.type){case"intersects":return!1;case"contains":case"disjoint":default:return!0}}const B=I.create();Object.defineProperty(t,"__esModule",{value:!0})}));