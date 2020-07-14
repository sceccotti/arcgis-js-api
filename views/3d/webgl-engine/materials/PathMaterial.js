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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../../../../core/mathUtils","../../../../geometry/support/aaBoundingBox","../../support/buffer/BufferView","../../support/buffer/InterleavedLayout","../lib/geometryDataUtils","../lib/GLMaterial","../lib/Material","../lib/Util","./PathTechnique","./VisualVariableMaterialParameters","./internal/bufferWriterUtils","./internal/MaterialUtil","./internal/MaterialUtil","./renderers/MergedRenderer"],(function(t,e,a,r,i,n,s,o,u,h,c,p,f,l,d,m,v){var b=c.assert,g=function(t){function e(a,r){var i=t.call(this,r)||this;return i.supportsEdges=!0,i.techniqueConfig=new p.PathTechniqueConfiguration,i.params=m.copyParameters(a,y),i.vertexBufferLayout=e.getVertexBufferLayout(i.params),i}return a.__extends(e,t),e.prototype.getTechniqueConfig=function(t){return this.techniqueConfig.output=t,this.techniqueConfig.vvSize=this.params.vvSizeEnabled,this.techniqueConfig.vvColor=this.params.vvColorEnabled,this.techniqueConfig.vvOpacity=this.params.vvOpacityEnabled,this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.transparent=this.params.transparent,this.techniqueConfig.sceneHasOcludees=this.params.sceneHasOcludees,0===t&&(this.techniqueConfig.doubleSidedMode=this.params.doubleSided&&"normal"===this.params.doubleSidedType?1:this.params.doubleSided&&"winding-order"===this.params.doubleSidedType?2:0,this.techniqueConfig.receiveShadows=this.params.receiveShadows,this.techniqueConfig.receiveSSAO=this.params.receiveSSAO),this.techniqueConfig},e.prototype.getPassParameters=function(){return this.params},e.prototype.isVisibleInPass=function(t){return 3!==t||this.params.castShadows},e.prototype.isVisible=function(){var e=this.params;return!!t.prototype.isVisible.call(this)&&e.opacity>0},e.prototype.setParameterValues=function(t){d.updateParameters(this.params,t)&&this.parametersChanged()},e.prototype.getParameters=function(){return this.params},e.prototype.intersect=function(t,e,a,n,s,o,u){var h=t;if(h.metadata){var c=h.metadata.pathGeometry,p=[this.params.size[0],this.params.size[1]];if(this.params.vvSizeEnabled){var f=this.params.vvSizeOffset,l=this.params.vvSizeFactor,d=this.params.vvSizeMinSize,v=this.params.vvSizeMaxSize,b=c.sizeAttributeValue;p[0]*=r.clamp(f[0]+b*l[0],d[0],v[0]),p[1]*=r.clamp(f[2]+b*l[2],d[2],v[2])}var g=Math.max(p[0],p[1]),P=i.fromValues(t.boundingInfo.bbMin[0]-g,t.boundingInfo.bbMin[1]-g,t.boundingInfo.bbMin[2]-g,t.boundingInfo.bbMax[0]+g,t.boundingInfo.bbMax[1]+g,t.boundingInfo.bbMax[2]+g),y=[o[0]-s[0],o[1]-s[1],o[2]-s[2]],S=Math.sqrt(y[0]*y[0]+y[1]*y[1]+y[2]*y[2]),A=[S/y[0],S/y[1],S/y[2]];m.intersectAabbInvDir(P,s,A,n.tolerance)&&(c.baked.size&&c.baked.size[0]===p[0]&&c.baked.size[1]===p[1]||c.baked.bake(p),c.baked.intersect(s,o,u))}},e.prototype.computeAttachmentOrigin=function(t,e){var a=t.data,r="getVertexAttr"in a?a.getVertexAttr():"vertexAttr"in a?a.vertexAttr:null;if(!r)return null;var i=r[p.PathVertexAttrConstants.POSITION];return o.computeAttachmentOriginLines(i,null,!1,e)},e.prototype.createBufferWriter=function(){return new S(this.vertexBufferLayout)},e.prototype.createRenderer=function(t,e){return new v(t,e,this,p.pathVertexAttributeLocations)},e.prototype.getGLMaterial=function(t){if(0===t.output||1===t.output||2===t.output||4===t.output||3===t.output&&this.params.castShadows)return new P(t)},e.getVertexBufferLayout=function(t){var e=s.newLayout().vec3f(p.PathVertexAttrConstants.POSITION).vec4f(p.PathVertexAttrConstants.PROFILERIGHT).vec4f(p.PathVertexAttrConstants.PROFILEUP).vec4f(p.PathVertexAttrConstants.PROFILEVERTEXANDNORMAL);return(t.vvColorEnabled||t.vvSizeEnabled||t.vvOpacityEnabled)&&(e=e.vec4f(p.PathVertexAttrConstants.FEATUREVALUE)),e},e}(h.Material),P=function(t){function e(e){var a=t.call(this,e)||this;return a.updateParameters(),a}return a.__extends(e,t),e.prototype.updateParameters=function(){this.technique=this.techniqueRep.acquireAndReleaseExisting(p.PathTechnique,this.material.getTechniqueConfig(this.output),this.technique)},e.prototype.beginSlot=function(t){return t===(this.technique.configuration.transparent?5:3)},e.prototype._updateOccludeeState=function(t){t.hasOccludees!==this.material.getParameters().sceneHasOcludees&&(this.material.setParameterValues({sceneHasOcludees:t.hasOccludees}),this.updateParameters())},e.prototype._updateShadowState=function(t){t.shadowMappingEnabled!==this.technique.configuration.receiveShadows&&(this.material.setParameterValues({receiveShadows:t.shadowMappingEnabled}),this.updateParameters())},e.prototype.ensureParameters=function(t){0===this.output&&(this._updateShadowState(t),this._updateOccludeeState(t))},e.prototype.bind=function(t,e){t.bindProgram(this.technique.program),this.technique.bindPass(t,this.material.getPassParameters(),e)},e}(u.GLMaterial),y=a.__assign({size:[1,1,1],ambient:[.2,.2,.2],diffuse:[.8,.8,.8],specular:[0,0,0],opacity:1,doubleSided:!1,doubleSidedType:"normal",receiveSSAO:!0,receiveShadows:!1,castShadows:!0,slicePlaneEnabled:!1,transparent:!1,sceneHasOcludees:!1},f.Default),S=function(){function t(t){this.vertexBufferLayout=t}return t.prototype.allocate=function(t){return this.vertexBufferLayout.createBuffer(t)},t.prototype.elementCount=function(t){return t.indices[p.PathVertexAttrConstants.POSITION].length},t.prototype.write=function(t,e,a,r){var i=function(t){if(t in e.vertexAttr){var i=e.vertexAttr[t],s=e.indices[t];b(4===i.size);var o=a.getField(t,n.BufferViewVec4f);if(!o)throw new Error("unable to acquire view for "+t);l.writeBufferVec4(s,i.data,o,r)}};i(p.PathVertexAttrConstants.PROFILERIGHT),i(p.PathVertexAttrConstants.PROFILEUP),i(p.PathVertexAttrConstants.PROFILEVERTEXANDNORMAL),this.vertexBufferLayout.hasField(p.PathVertexAttrConstants.FEATUREVALUE)&&i(p.PathVertexAttrConstants.FEATUREVALUE),l.writeDefaultAttributes(e,this.vertexBufferLayout,t.transformation,t.invTranspTransformation,a,r)},t}();return g}));