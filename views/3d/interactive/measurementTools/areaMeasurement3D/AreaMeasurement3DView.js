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

define(["require","exports","../../../../../core/Handles","../../../../../core/maybe","../../../../../core/screenUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../manipulatorUtils","../../editingTools/dragEventPipeline3D","../support/Label","../support/LabelSegment","../support/labelUtils","../support/PathSegmentInterpolator","../support/viewUtils","../../../support/LaserLineRenderer","../../../support/projectionUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryData","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Intersector","../../../webgl-engine/lib/Layer","../../../webgl-engine/lib/Object3D","../../../webgl-engine/materials/CheckerBoardMaterial","../../../webgl-engine/materials/lineStippleUtils","../../../webgl-engine/materials/RibbonLineMaterial","../../../../interactive/ManipulatorCollection"],(function(e,t,i,r,n,a,s,o,l,h,p,d,c,_,m,u,g,L,b,v,f,w,y,S,P,M,j,O,C){"use strict";var V={laserLineGlowColor:[1,.5,0],laserLineGlowWidth:8,laserLineGlowFalloff:8,laserLineInnerColor:[1,1,1],laserLineInnerWidth:1,laserLineGlobalAlpha:.75,laserLineEnabled:!0,handleColor:[1,.5,0],handleOpacity:.5,handleRadius:5,handleRadiusHovered:10,handleRadiusMouse:10,handleRadiusTouch:25,pathLineColor:[1,.5,0,1],pathLineWidth:3,intersectingLineColor:[1,.2,0,1],perimeterLineColor:[1,.5,0,1],perimeterLineWidth:2,projectionLineColor:[1,.5,0,1],projectionLineWidth:2,projectionLineStippleSize:5,areaColor1:[1,.5,0,.5],areaColor2:[1,1,1,.5],fillColor:[1,.5,0,.5],lineSubdivisions:64,labelDistance:25},D=function(){function e(e,t,i){void 0===t&&(t=new C.ManipulatorCollection),void 0===i&&(i={}),this._model=e,this._manipulators=t,this.vertexManipulators=[],this._visible=!1,this._laserLineRenderer=null,this._cursorManipulator=null,this._pathSegmentObjects=[],this._perimeterSegmentObjects=[],this._projectionLineObjects=[],this._areaLabel=new d(16),this._pathLengthLabel=new d(12),this._cursorSegmentLengthLabel=new d(12),this._perimeterLengthLabel=new d(12),this._pathLabelSegments=[],this._perimeterLabelSegments=[],this._cursorSegmentLengthLabelSegment=new c,this._listenerHandles=null,this._origin=l.vec3f64.create(),this._originTransform=s.mat4f64.create(),this._tempStartPosition=l.vec3f64.create(),this._tempEndPosition=l.vec3f64.create(),this._tempHandlePosition=l.vec3f64.create(),this._sceneView=this._model.sceneView,this._params=u.copyParameter(V,i),this._layer=new S("path-measurement-tool",{isPickable:!1}),this._createMaterials(),this._createObjects(),this._intersector=new y.Intersector(this._sceneView.state.mode),this._intersector.options.store=0;var r=h.createSphereManipulator(this._sceneView,this._params.handleColor,this._params.handleOpacity);r.available=!1,r.radius=this._params.handleRadius,r.interactive=!1,this._manipulators.add(r),this._cursorManipulator=r}return e.prototype.destroy=function(){this.hide()},Object.defineProperty(e.prototype,"requiresCursorPoint",{get:function(){return("initial"===this._model.state||"drawing"===this._model.state)&&this._model.active},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){e?this.show():this.hide()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"testData",{get:function(){return{labels:{area:this._areaLabel,pathLength:this._pathLengthLabel,cursorSegmentLength:this._cursorSegmentLengthLabel,perimeterLength:this._perimeterLengthLabel},laserLineRenderer:this._laserLineRenderer}},enumerable:!1,configurable:!0}),e.prototype.show=function(){if(!this._visible){this._visible=!0;var e=this._sceneView._stage,t={glowColor:this._params.laserLineGlowColor,glowWidth:this._params.laserLineGlowWidth,glowFalloff:this._params.laserLineGlowFalloff,innerColor:this._params.laserLineInnerColor,innerWidth:this._params.laserLineInnerWidth,globalAlpha:this._params.laserLineGlobalAlpha};this._laserLineRenderer=new g.LaserLineRenderer(this._sceneView.renderCoordsHelper,t),e.addRenderPlugin(this._laserLineRenderer.renderSlots,this._laserLineRenderer),this._addToStage(e),this._areaLabel.addToView(this._sceneView),this._pathLengthLabel.addToView(this._sceneView),this._cursorSegmentLengthLabel.addToView(this._sceneView),this._perimeterLengthLabel.addToView(this._sceneView),this._initializeListeners(),this._updateAll(this._model.viewData)}},e.prototype.hide=function(){if(this._visible){this._visible=!1;var e=this._sceneView._stage;e.removeRenderPlugin(this._laserLineRenderer),this._laserLineRenderer=null,this._destroyListeners(),this._updatePathLength(0),this._removeFromStage(e),this._areaLabel.removeFromView(this._sceneView),this._pathLengthLabel.removeFromView(this._sceneView),this._cursorSegmentLengthLabel.removeFromView(this._sceneView),this._perimeterLengthLabel.removeFromView(this._sceneView),this._sceneView.cursor=null}},e.prototype.vertexHandleAt=function(e,t){var i=this._manipulators.intersect(e,t);return r.isSome(i)?this.manipulatorIdToVertexId(i):null},e.prototype.manipulatorIdToVertexId=function(e){for(var t=0;t<this.vertexManipulators.length;t++){if(e===this.vertexManipulators[t].id)return t}return null},e.prototype.pick=function(t){var i=this._sceneView.spatialReference,r=n.screenPointObjectToArray(t.screenPoint);this._sceneView.sceneIntersectionHelper.intersectToolIntersectorScreen(r,this._intersector);var a=this._intersector.results.min,s=l.vec3f64.create();if(!a.getIntersectionPoint(s))return new e.PickResult;var o=this._sceneView.renderCoordsHelper.fromRenderCoords(s,i),h="TerrainRenderer"===a.intersector?"surface":"feature";return new e.PickResult(h,s,o)},e.prototype.overlappingHandles=function(e,t){return u.pointToPointScreenDistance(e,t,this._sceneView)<=this._params.handleRadius},e.prototype.screenToMap3D=function(){return p.screenToMap3D(this._sceneView)},e.prototype._createMaterials=function(){this._pathLineMaterial=new O({width:this._params.pathLineWidth,color:this._params.pathLineColor,polygonOffset:!0},"path-line"),this._pathLineMaterial.renderOccluded=4,this._intersectingPathLineMaterial=new O({width:this._params.pathLineWidth,color:this._params.intersectingLineColor,polygonOffset:!0},"intersecting-path-line"),this._intersectingPathLineMaterial.renderOccluded=4,this._perimeterLineMaterial=new O({width:this._params.perimeterLineWidth,color:this._params.perimeterLineColor,polygonOffset:!0},"perimeter-line"),this._perimeterLineMaterial.renderOccluded=4,this._intersectingPerimeterLineMaterial=new O({width:this._params.perimeterLineWidth,color:this._params.intersectingLineColor,polygonOffset:!0},"intersecting-perimeter-line"),this._intersectingPerimeterLineMaterial.renderOccluded=4,this._projectionLineMaterial=new O({width:this._params.projectionLineWidth,color:this._params.projectionLineColor,polygonOffset:!0,stipplePattern:j.createStipplePatternSimple(this._params.projectionLineStippleSize),stippleIntegerRepeats:!1},"projection-line"),this._projectionLineMaterial.renderOccluded=4,this._checkerBoardMaterial=new M({color1:this._params.areaColor1,color2:this._params.areaColor2,transparent:!0,writeDepth:!1,polygonOffset:!0},"checker-board"),this._checkerBoardMaterial.renderOccluded=4},e.prototype._createObjects=function(){this._cursorSegmentObject=new P,this._areaObject=new P},e.prototype._addToStage=function(e){e.add(0,this._layer),e.add(3,this._pathLineMaterial),e.add(3,this._intersectingPathLineMaterial),e.add(3,this._perimeterLineMaterial),e.add(3,this._intersectingPerimeterLineMaterial),e.add(3,this._projectionLineMaterial),e.add(3,this._checkerBoardMaterial),e.addToViewContent([this._layer.id])},e.prototype._removeFromStage=function(e){e.removeFromViewContent([this._layer.id]),e.remove(0,this._layer.id),e.remove(3,this._pathLineMaterial.id),e.remove(3,this._intersectingPathLineMaterial.id),e.remove(3,this._perimeterLineMaterial.id),e.remove(3,this._intersectingPerimeterLineMaterial.id),e.remove(3,this._projectionLineMaterial.id),e.remove(3,this._checkerBoardMaterial.id)},e.prototype._syncViewData=function(e){var t=this;if(!this._visible)return"none";var i=e.pathChanges;"full"===i.change?this._updateAll(e):"incremental"===i.change&&(i.updatedVertices.forEach((function(i){var r=(i-1+t._model.path.length)%t._model.path.length;t._updatePathSegment(e,i),t._updatePathSegment(e,r),t._updateVertexHandle(e,i),t._updateArea(e),t._updatePerimeterSegments(e),t._updateProjectionLines(e),t._updateLaserLine(),t._updateLabels(e)})),i.updatedVertices.has(this._model.path.length-1)&&this._updateCursorSegment());var r=i.change;return i.clear(),r},e.prototype._updateAfterSyncViewData=function(e){var t=this._model.viewData;!("full"===this._syncViewData(t))&&e&&e(t)},e.prototype._updateOrigin=function(e){u.midpoint(e.positionsRenderCoords,this._origin),a.mat4.identity(this._originTransform),a.mat4.translate(this._originTransform,this._originTransform,this._origin)},e.prototype._updateAll=function(e){this._updateOrigin(e),this._updatePathLength(e.path.length),this._updatePathSegments(e),this._updatePerimeterSegments(e),this._updateHandles(e),this._updateArea(e),this._updateProjectionLines(e),this._updateLabels(e),this._updateLaserLine()},e.prototype._updateCameraDependent=function(e){this._updateHandles(e),this._updateProjectionLines(e),this._updateLabels(e)},e.prototype._updatePathLength=function(e){this._resizeObject3DArray(this._pathSegmentObjects,e),this._resizeObject3DArray(this._perimeterSegmentObjects,e),this._resizeManipulatorArray(this.vertexManipulators,e),u.resizeArray(this._pathLabelSegments,e,(function(){return new c})),u.resizeArray(this._perimeterLabelSegments,e,(function(){return new c}))},e.prototype._updatePathSegments=function(e){for(var t=0;t<this._pathSegmentObjects.length;++t)this._updatePathSegment(e,t);this._updateCursorSegment()},e.prototype._updatePathSegment=function(e,t){var i=e.path,r=this._pathSegmentObjects[t];e.validMeasurement||t<i.length-1?(this._createInterpolatedLineGeometry(r,e.intersectingSegments.has(t)?this._intersectingPathLineMaterial:this._pathLineMaterial,"path-segment",e.positionsRenderCoords[t],e.positionsRenderCoords[(t+1)%i.length],this._origin,this._originTransform,this._model.measurementMode,this._pathLabelSegments[t],e.validMeasurement?"center":"end"),this._addObject3D(r)):(r.removeAllGeometries(),this._removeObject3D(r))},e.prototype._updateCursorSegment=function(){var e=this._sceneView.renderCoordsHelper,t=this._model.path,i=this._cursorSegmentObject;t.length>0&&"drawing"===this._model.state&&this._model.cursorPoint?(e.toRenderCoords(t.back,this._tempStartPosition),e.toRenderCoords(this._model.cursorPoint,this._tempEndPosition),this._createInterpolatedLineGeometry(i,this._pathLineMaterial,"path-segment",this._tempStartPosition,this._tempEndPosition,this._origin,this._originTransform,this._model.measurementMode,this._cursorSegmentLengthLabelSegment,"end"),this._addObject3D(i)):(i.removeAllGeometries(),this._removeObject3D(i))},e.prototype._updatePerimeterSegments=function(e){for(var t=0;t<this._perimeterSegmentObjects.length;++t)this._updatePerimeterSegment(e,t)},e.prototype._updatePerimeterSegment=function(e,t){var i=e.path,r=this._perimeterSegmentObjects[t];e.validMeasurement&&"geodesic"!==this._model.measurementMode?(this._updatePerimeterSegmentObject(r,e.positionsFittedRenderCoords[t],e.positionsFittedRenderCoords[(t+1)%i.length],this._origin,this._originTransform,e.intersectingSegments.has(t),this._perimeterLabelSegments[t]),this._addObject3D(r)):(r.removeAllGeometries(),this._removeObject3D(r))},e.prototype._updatePerimeterSegmentObject=function(e,t,i,r,n,a,s){this._createInterpolatedLineGeometry(e,a?this._intersectingPerimeterLineMaterial:this._perimeterLineMaterial,"perimeter-segment",t,i,r,n,this._model.measurementMode,s)},e.prototype._updateHandles=function(e){for(var t=0;t<this.vertexManipulators.length;++t)this._updateVertexHandle(e,t);this._updateCursorHandle()},e.prototype._updateVertexHandle=function(e,t){this.vertexManipulators[t].manipulator.renderLocation=e.positionsRenderCoords[t]},e.prototype._updateCursorHandle=function(){var e=this._cursorManipulator;"drawing"===this._model.state&&this._model.cursorPoint?(e.available=!0,e.location=this._model.cursorPoint):e.available=!1},e.prototype._updateArea=function(e){switch(this._model.measurementMode){case"euclidean":this._updateAreaEuclidean(e);break;case"geodesic":this._updateAreaGeodesic()}},e.prototype._updateAreaEuclidean=function(e){var t=this,i=this._areaObject;if(e.validMeasurement&&0===e.intersectingSegments.size&&e.triangleIndices){var r=[],n=l.vec3f64.create();e.positionsFittedRenderCoords.forEach((function(e){o.vec3.subtract(n,e,t._origin),r.push(n[0],n[1],n[2])}));var a=[];e.positionsProjected.forEach((function(e){a.push(e[0],e[1])}));var s=new f.GeometryData({position:{size:3,data:r},uv0:{size:2,data:a}},{position:e.triangleIndices,uv0:e.triangleIndices}),h=new v(s,"area");i.removeAllGeometries(),i.addGeometry(h,this._checkerBoardMaterial,this._originTransform),this._addObject3D(i),this._checkerBoardMaterial.setParameterValues({size:[e.checkerSize,e.checkerSize]})}else i.removeAllGeometries(),this._removeObject3D(i)},e.prototype._updateAreaGeodesic=function(){var e=this._areaObject;e.removeAllGeometries(),this._removeObject3D(e)},e.prototype._updateProjectionLines=function(e){var t=e.path;this._resizeObject3DArray(this._projectionLineObjects,t.length);for(var i=0;i<t.length;++i)this._updateProjectionLine(e,i)},e.prototype._updateProjectionLine=function(e,t){var i=this._projectionLineObjects[t];if(i.removeAllGeometries(),e.validMeasurement&&"euclidean"===this._model.measurementMode){var r=l.vec3f64.create();o.vec3.subtract(r,this._model.viewData.positionsRenderCoords[t],this._origin);var n=l.vec3f64.create();o.vec3.subtract(n,this._model.viewData.positionsFittedRenderCoords[t],this._origin);var a=new v(w.createPolylineGeometry([r,n]),"projected-line");i.addGeometry(a,this._projectionLineMaterial,this._originTransform),this._addObject3D(i)}else this._removeObject3D(i)},e.prototype._updateLabels=function(e){var t=this,i=this._sceneView._stage.getCamera(),r=this._params.labelDistance,n=this._model,a="geodesic"===n.measurementMode,s="drawing"===n.state,o=function(e,i){return e.visible&&i.visible&&t._sceneView.overlay.overlaps(e.textItem,i.textItem)},l=this._areaLabel,h=_.positionLabelOnPoint(l,e.areaCentroid,i);l.text=n.areaLabel,l.visible=h&&e.validMeasurement&&0===e.intersectingSegments.size&&null!=n.areaLabel;l=this._pathLengthLabel;var p=this._pathLabelSegments[e.pathLengthLabelSegmentIndex],d=this._cursorSegmentLengthLabelSegment;h=_.positionLabelOnCorner(l,p,d,r,i);l.text=n.pathLengthLabel,l.visible=h&&s&&n.path.length>0;l=this._cursorSegmentLengthLabel;var c=this._cursorSegmentLengthLabelSegment;h=_.positionLabelOnSegment(l,c,r,"bottom",i);l.text=n.cursorSegmentLengthLabel,l.visible=h&&s&&n.cursorSegmentLength&&0!==n.cursorSegmentLength.value,o(this._cursorSegmentLengthLabel,this._pathLengthLabel)&&(this._cursorSegmentLengthLabel.visible=!1),o(this._pathLengthLabel,this._areaLabel)&&(this._pathLengthLabel.visible=!1);l=this._perimeterLengthLabel;if(n.validMeasurement&&0===e.intersectingSegments.size)for(var m=0;m<e.path.length;++m){var u=(e.perimeterLengthLabelSegmentIndex+m)%e.path.length;c=a?this._pathLabelSegments[u]:this._perimeterLabelSegments[u],h=_.positionLabelOnSegment(l,c,r,"top",i);if(l.text=n.perimeterLengthLabel,l.visible=h,!o(l,this._areaLabel))break;l.visible=!1}else l.visible=!1},e.prototype._getFocusPoint=function(){var e=this._model,t=this._model.lastDraggedVertex;switch(e.state){case"drawing":return e.cursorPoint?e.cursorPoint:e.path.vertex(r.isSome(t)?t:e.path.length-1);case"editing":return r.isSome(t)?e.path.vertex(t):null;default:return e.cursorPoint}},e.prototype._updateLaserLine=function(){var e=this._model,t=this._params.laserLineEnabled&&"measured"!==e.state&&e.active;this._laserLineRenderer.pointDistanceEnabled=!1,this._laserLineRenderer.lineVerticalPlaneEnabled=!1;var i=this._getFocusPoint();if(t&&i){var r=this._tempHandlePosition;this._sceneView.renderCoordsHelper.toRenderCoords(i,r),this._laserLineRenderer.heightManifoldTarget=r,this._laserLineRenderer.heightManifoldEnabled=!0}else this._laserLineRenderer.heightManifoldEnabled=!1},e.prototype._addObject3D=function(e){e.parentLayer||(this._layer.addObject(e),this._sceneView._stage.add(1,e))},e.prototype._removeObject3D=function(e){e.parentLayer&&(this._layer.removeObject(e),this._sceneView._stage.remove(1,e.id))},e.prototype._resizeObject3DArray=function(e,t){var i=this;u.resizeArray(e,t,(function(){return new P}),(function(e){i._removeObject3D(e)}))},e.prototype._resizeManipulatorArray=function(e,t){var i=this;u.resizeArray(e,t,(function(){var e=h.createSphereManipulator(i._sceneView,i._params.handleColor,i._params.handleOpacity);return e.radius=i._params.handleRadius,{id:i._manipulators.add(e),manipulator:e}}),(function(e){var t=e.manipulator;i._manipulators.remove(t)}))},e.prototype._createInterpolatedLineGeometry=function(e,t,i,r,n,a,s,l,h,p){var d=this._sceneView.renderCoordsHelper,c=[],_=[],m=function(e,t){var i=b.sv3d.get();o.vec3.subtract(i,e,a),c.push(i),_.push(t)};if("euclidean"===l){var g=b.sv3d.get();u.midpoint([r,n],g);var L=b.sv3d.get();d.worldUpAtPosition(g,L),m(r,L),m(n,L),h&&h.update(r,n,p)}else{var f=this._getSegmentInterpolator(r,n),y=this._params.lineSubdivisions+1&-2,S=null,P=null,M=y/2-1,j=y/2;"start"===p?(M=0,j=1):"end"===p&&(M=y-2,j=y-1);for(var O=0;O<y;++O){var C=O/(y-1),V=b.sv3d.get();L=b.sv3d.get();f.eval(C,V),d.worldUpAtPosition(V,L),O===M&&(S=V),O===j&&(P=V),m(V,L)}h&&h.update(S,P,p)}var D=new v(w.createPolylineGeometry(c,_),i);e.removeAllGeometries(),e.addGeometry(D,t,s)},e.prototype._getSegmentInterpolator=function(e,t){var i=this._sceneView.spatialReference;if(L.canProject(i,L.SphericalECEFSpatialReference)){var r=this._sceneView.renderCoordsHelper.spatialReference;return new m.Spherical(e,t,r,r)}return new m.Linear(e,t)},e.prototype._initializeListeners=function(){var e=this;this._listenerHandles=new i,this._listenerHandles.add([this._model.watch(["state","lastDraggedVertex"],(function(){return e._updateLaserLine()})),this._model.watch("cursorPoint",(function(){return e._updateAfterSyncViewData((function(t){e._updateCursorSegment(),e._updateCursorHandle(),"drawing"===e._model.state&&e._updateLabels(t),e._updateLaserLine()}))})),this._sceneView.state.watch("camera",(function(){return e._updateAfterSyncViewData((function(){return e._updateCameraDependent(e._model.viewData)}))})),this._model.watch(["unit","measurementMode"],(function(){return e._updateAll(e._model.viewData)})),this._model.watch(["areaLabel","cursorSegmentLengthLabel","pathLengthLabel","perimeterLengthLabel"],(function(){e._updateLabels(e._model.viewData)})),this._model.watch(["active"],(function(){e._updateLaserLine(),e._syncViewData(e._model.viewData)})),this._model.watch("viewData",(function(t){return e._syncViewData(t)}))])},e.prototype._destroyListeners=function(){this._listenerHandles.destroy(),this._listenerHandles=null},e._handleGeometry=new v(w.createSphereGeometry(1,32,32),"handle"),e}();return function(e){var t=function(){};e.PickRequest=t;var i=function(e,t,i){void 0===e&&(e=null),void 0===t&&(t=null),void 0===i&&(i=null),this.type=e,this.scenePoint=t,this.mapPoint=i};e.PickResult=i}(D||(D={})),D}));