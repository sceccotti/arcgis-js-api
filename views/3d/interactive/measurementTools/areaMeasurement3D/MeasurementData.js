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

define(["require","exports","../../../../../core/mathUtils","../../../../../core/Quantity","../../../../../core/libs/earcut/earcut","../../../../../core/libs/gl-matrix-2/vec2","../../../../../core/libs/gl-matrix-2/vec2f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../core/libs/gl-matrix-2/vec4f64","../../../../../geometry/SpatialReference","../../../../../geometry/support/geodesicConstants","../../../../../geometry/support/intersects","../support/measurementUtils","../support/viewUtils","../../../support/mathUtils","../../../support/pointUtils","../../../support/projectionUtils"],(function(e,t,i,s,r,o,n,h,a,c,d,p,l,g,m,u,f,_){"use strict";function v(e,t){for(var i=new Float64Array(e.length*t),s=0;s<e.length;++s)for(var r=e[s],o=0;o<t;++o)i[s*t+o]=r[o];return i}return(function(){function e(){this.positionsWorldCoords=[],this.positionsRenderCoords=[],this.positionsProjectedWorldCoords=[],this.positionsFittedRenderCoords=[],this.positionsGeographic=[],this.positionsSpherical=[],this.positionsStereographic=[],this.pathSegmentLengths=[],this.geodesicPathSegmentLengths=[],this.perimeterSegmentLengths=[],this.intersectingSegments=new Set,this.geodesicIntersectingSegments=new Set,this.areaCentroidWorldCoords=a.vec3f64.create(),this.areaCentroidRenderCoords=a.vec3f64.create(),this.geodesicAreaCentroidRenderCoords=a.vec3f64.create(),this._length=0,this._centroidRenderCoords=a.vec3f64.create(),this._planeWorldCoords=c.vec4f64.create(),this._worldUp=a.vec3f64.create(),this._worldTangent=a.vec3f64.create(),this._frame=[a.vec3f64.create(),a.vec3f64.create(),a.vec3f64.create()],this._tempU=a.vec3f64.create(),this._tempV=a.vec3f64.create(),this._tempVec3=a.vec3f64.create(),this._tempSphere={center:a.vec3f64.create(),radius:0}}return e.prototype.update=function(e,t,i,r,o,n,a,c){t.clear(),this._resize(e.length);for(var d=_.canProject(i.spatialReference,_.SphericalECEFSpatialReference)&&_.canProjectToWGS84ComparableLonLat(i.spatialReference),p=this.positionsGeographic,l=this.positionsWorldCoords,g=this.positionsRenderCoords,m=this.positionsSpherical,u=0;u<e.length;++u){var v=e.vertex(u);f.pointToVector(v,l[u],a),f.pointToVector(v,g[u],n),d&&(f.pointToWGS84ComparableLonLat(v,p[u]),f.pointToVector(v,m[u],_.SphericalECEFSpatialReference),h.vec3.normalize(m[u],m[u]))}var C=this._updatePathLengths(o);if(this.pathLength=this._length>0?new s(r.normalizeDistance(C),"meters"):null,d){var S=this._updateGeodesicPathLengths(o);this.geodesicPathLength=this._length>0?new s(S,"meters"):null}else this.geodesicPathLength=null;if(!o)return this.area=null,this.geodesicArea=null,this.perimeterLength=null,this.triangleIndices=null,this.geodesicTriangleIndices=null,this.intersectingSegments.clear(),void this.geodesicIntersectingSegments.clear();this._updateArea(i,r,n,a,c),d&&this._updateGeodesicArea(i)},e.prototype._resize=function(e){for(e<this._length&&(this.positionsWorldCoords.length=e,this.positionsRenderCoords.length=e,this.positionsProjectedWorldCoords.length=e,this.positionsFittedRenderCoords.length=e,this.positionsGeographic.length=e,this.positionsSpherical.length=e,this.positionsStereographic.length=e,this.pathSegmentLengths.length=e,this.geodesicPathSegmentLengths.length=e,this.perimeterSegmentLengths.length=e,this._length=e);this._length<e;)this.positionsWorldCoords.push(a.vec3f64.create()),this.positionsRenderCoords.push(a.vec3f64.create()),this.positionsProjectedWorldCoords.push(n.vec2f64.create()),this.positionsFittedRenderCoords.push(a.vec3f64.create()),this.positionsGeographic.push(a.vec3f64.create()),this.positionsSpherical.push(a.vec3f64.create()),this.positionsStereographic.push(n.vec2f64.create()),this.pathSegmentLengths.push(0),this.geodesicPathSegmentLengths.push(0),this.perimeterSegmentLengths.push(0),++this._length},e.prototype._updatePathLengths=function(e){for(var t=this.positionsWorldCoords,i=this.pathSegmentLengths,s=0,r=0;r<this._length;++r){var o=i[r]=h.vec3.distance(t[r],t[(r+1)%this._length]);(r<this._length-1||e)&&(s+=o)}return s},e.prototype._updateGeodesicPathLengths=function(e){for(var t=this.positionsGeographic,i=this.geodesicPathSegmentLengths,s=0,r=0;r<this._length;++r){var o=i[r]=g.segmentLengthGeodesicVector(t[r],t[(r+1)%this._length]);(r<this._length-1||e)&&(s+=o)}return s},e.prototype._updateArea=function(e,t,i,r,n){var a=e.renderCoordsHelper,c=this.positionsWorldCoords,d=this.positionsRenderCoords,p=this.positionsProjectedWorldCoords,l=this.positionsFittedRenderCoords,f=this._planeWorldCoords,v=this._centroidRenderCoords;m.midpoint(d,v),a.worldUpAtPosition(v,this._worldUp),a.worldBasisAtPosition(v,0,this._worldTangent),_.transformDirection(v,this._worldUp,i,this._worldUp,r),_.transformDirection(v,this._worldTangent,i,this._worldTangent,r),g.bestFitPlane(c,f),this.fittingMode=this._selectFittingMode(f,c,this._worldUp,n);var C=0;if("horizontal"===this.fittingMode){var S=-1/0;d.forEach((function(e,t){var i=a.getAltitude(d[t]);i>S&&(S=i,C=t)}))}var L=c[C],w=f,R=this._worldTangent;"horizontal"===this.fittingMode?w=this._worldUp:"vertical"===this.fittingMode&&(w=this._tempVec3,R=this._worldUp,u.makeOrthonormal(f,this._worldUp,w)),h.vec3.copy(this._frame[2],w),u.makeOrthonormal(R,w,this._frame[0]),h.vec3.cross(this._frame[1],this._frame[0],this._frame[2]),h.vec3.negate(this._frame[1],this._frame[1]);for(var P=this._tempVec3,A=this._tempU,y=this._tempV,U=0;U<this._length;++U){var W=p[U],G=l[U];h.vec3.subtract(P,c[U],L),o.vec2.set(W,h.vec3.dot(this._frame[0],P),h.vec3.dot(this._frame[1],P)),h.vec3.scale(A,this._frame[0],W[0]),h.vec3.scale(y,this._frame[1],W[1]),h.vec3.add(P,A,y),h.vec3.add(P,P,L),_.vectorToVector(P,r,G,i)}this.perimeterLength=this._length>0?new s(t.normalizeDistance(this._updatePerimeterLengths()),"meters"):null,m.midpoint(l,this.areaCentroidRenderCoords),_.vectorToVector(this.areaCentroidRenderCoords,i,this.areaCentroidWorldCoords,r),this._updateIntersectingSegments(),this.area=0===this.intersectingSegments.size?new s(t.normalizeArea(this._computeArea()),"square-meters"):null},e.prototype._updateGeodesicArea=function(e){var t=e.renderCoordsHelper,i=this.positionsSpherical,r=this.positionsStereographic,n=this._tempVec3,a=g.fitHemisphere(i,n);if(a){var c=this._tempU,d=this._tempV;u.tangentFrame(n,c,d);for(var l=0;l<this._length;++l){var m=h.vec3.dot(i[l],c),f=h.vec3.dot(i[l],d),v=h.vec3.dot(i[l],n);o.vec2.set(r[l],m/v,f/v)}h.vec3.scale(n,n,p.earthRadius),t.toRenderCoords(n,_.SphericalECEFSpatialReference,this.geodesicAreaCentroidRenderCoords),this._updateGeodesicIntersectingSegments(),this.geodesicArea=a&&0===this.geodesicIntersectingSegments.size?new s(this._computeGeodesicArea(),"square-meters"):null}else this.geodesicArea=null},e.prototype._updatePerimeterLengths=function(){for(var e=this.positionsProjectedWorldCoords,t=this.perimeterSegmentLengths,i=0,s=0;s<this._length;++s){i+=t[s]=o.vec2.distance(e[s],e[(s+1)%this._length])}return i},e.prototype._updateIntersectingSegments=function(){var e=this.positionsProjectedWorldCoords,t=this.intersectingSegments;t.clear();for(var i=0;i<this._length;++i)for(var s=i+2;s<this._length;++s)if((s+1)%this._length!==i){var r=e[i],o=e[(i+1)%this._length],n=e[s],h=e[(s+1)%this._length];l.segmentIntersects(r,o,n,h)&&(t.add(i),t.add(s))}},e.prototype._computeArea=function(){for(var e=this.positionsProjectedWorldCoords,t=v(e,2),i=this.triangleIndices=new Uint32Array(r.earcut(t,[],2)),s=0,o=0;o<i.length;o+=3)s+=g.triangleAreaEuclidean(e[i[o]],e[i[o+1]],e[i[o+2]]);return s},e.prototype._updateGeodesicIntersectingSegments=function(){var e=this.positionsStereographic,t=this.geodesicIntersectingSegments;t.clear();for(var i=0;i<this._length;++i)for(var s=i+2;s<this._length;++s)if((s+1)%this._length!==i){var r=e[i],o=e[(i+1)%this._length],n=e[s],h=e[(s+1)%this._length];l.segmentIntersects(r,o,n,h)&&(t.add(i),t.add(s))}},e.prototype._computeGeodesicArea=function(){for(var e=this.positionsGeographic,t=v(this.positionsStereographic,2),i=this.geodesicTriangleIndices=new Uint32Array(r.earcut(t,[],2)),s=0,o=0;o<i.length;o+=3)s+=g.triangleAreaGeodesic(e[i[o]],e[i[o+1]],e[i[o+2]],d.WGS84);return s},e.prototype._selectFittingMode=function(e,t,s,r){var o=t.map((function(t){return Math.abs(g.planePointDistance(e,t))})).reduce((function(e,t){return Math.max(e,t)}),0);g.boundingSphere(t,this._tempSphere);var n=o/(2*this._tempSphere.radius),a=n<r.maxRelativeErrorCoplanar,c=n<r.maxRelativeErrorAlmostCoplanar,d="horizontal";if(a)d="oblique";else if(c){d=Math.abs(h.vec3.dot(s,e))>Math.cos(i.deg2rad(r.verticalAngleThreshold))?"horizontal":"vertical"}return d},e}())}));