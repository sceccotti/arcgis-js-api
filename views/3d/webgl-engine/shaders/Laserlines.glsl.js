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

define(["require","exports","tslib","../../../../core/mathUtils","../core/shaderLibrary/Laserline.glsl","../core/shaderLibrary/ScreenSpacePass","../core/shaderModules/interfaces","../core/shaderModules/ShaderBuilder"],(function(e,n,t,i,a,l,o,s){"use strict";var r,c,d,p,f,h,m,g,u,D;Object.defineProperty(n,"__esModule",{value:!0}),n.build=n.defaultAngleCutoff=void 0,n.defaultAngleCutoff=i.deg2rad(6),n.build=function(e){var n=new s.ShaderBuilder;return n.extensions.add("GL_OES_standard_derivatives"),n.include(l.ScreenSpacePass),n.include(a.Laserline,e),n.fragment.uniforms.add("angleCutoff","vec2"),n.fragment.uniforms.add("globalAlpha","float"),e.heightManifoldEnabled&&n.fragment.uniforms.add("heightPlane","vec4"),e.pointDistanceEnabled&&n.fragment.uniforms.add("pointDistanceSphere","vec4"),e.lineVerticalPlaneEnabled&&n.fragment.uniforms.add("lineVerticalPlane","vec4").add("lineVerticalStart","vec3").add("lineVerticalEnd","vec3"),(e.heightManifoldEnabled||e.pointDistanceEnabled||e.lineVerticalPlaneEnabled)&&n.fragment.uniforms.add("maxPixelDistance","float"),e.intersectsLineEnabled&&n.fragment.uniforms.add("intersectsLineStart","vec3").add("intersectsLineEnd","vec3").add("intersectsLineDirection","vec3").add("intersectsLineRadius","float").add("perScreenPixelRatio","float"),(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)&&n.fragment.code.add(o.glsl(r||(r=t.__makeTemplateObject(["\n      float planeDistancePixels(vec4 plane, vec3 pos) {\n        float dist = dot(plane.xyz, pos) + plane.w;\n        float width = fwidth(dist);\n        dist /= min(width, maxPixelDistance);\n        return abs(dist);\n      }"],["\n      float planeDistancePixels(vec4 plane, vec3 pos) {\n        float dist = dot(plane.xyz, pos) + plane.w;\n        float width = fwidth(dist);\n        dist /= min(width, maxPixelDistance);\n        return abs(dist);\n      }"])))),e.pointDistanceEnabled&&n.fragment.code.add(o.glsl(c||(c=t.__makeTemplateObject(["\n    float sphereDistancePixels(vec4 sphere, vec3 pos) {\n      float dist = distance(sphere.xyz, pos) - sphere.w;\n      float width = fwidth(dist);\n      dist /= min(width, maxPixelDistance);\n      return abs(dist);\n    }\n    "],["\n    float sphereDistancePixels(vec4 sphere, vec3 pos) {\n      float dist = distance(sphere.xyz, pos) - sphere.w;\n      float width = fwidth(dist);\n      dist /= min(width, maxPixelDistance);\n      return abs(dist);\n    }\n    "])))),e.intersectsLineEnabled&&n.fragment.code.add(o.glsl(d||(d=t.__makeTemplateObject(["\n    float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {\n      float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);\n      return abs(dist) - radius;\n    }\n    "],["\n    float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {\n      float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);\n      return abs(dist) - radius;\n    }\n    "])))),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&n.fragment.code.add(o.glsl(p||(p=t.__makeTemplateObject(["\n    bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {\n      vec3 dir = end - start;\n      float t2 = dot(dir, pos - start);\n      float l2 = dot(dir, dir);\n      return t2 >= 0.0 && t2 <= l2;\n    }\n    "],["\n    bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {\n      vec3 dir = end - start;\n      float t2 = dot(dir, pos - start);\n      float l2 = dot(dir, dir);\n      return t2 >= 0.0 && t2 <= l2;\n    }\n    "])))),n.fragment.code.add(o.glsl(f||(f=t.__makeTemplateObject(["\n  void main() {\n    vec3 pos;\n    vec3 normal;\n    float depthDiscontinuityAlpha;\n\n    if (!laserlineReconstructFromDepth(pos, normal, depthDiscontinuityAlpha)) {\n      discard;\n    }\n\n    vec4 color = vec4(0, 0, 0, 0);\n  "],["\n  void main() {\n    vec3 pos;\n    vec3 normal;\n    float depthDiscontinuityAlpha;\n\n    if (!laserlineReconstructFromDepth(pos, normal, depthDiscontinuityAlpha)) {\n      discard;\n    }\n\n    vec4 color = vec4(0, 0, 0, 0);\n  "])))),e.heightManifoldEnabled&&n.fragment.code.add(o.glsl(h||(h=t.__makeTemplateObject(["\n    {\n      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, heightPlane.xyz)));\n      vec4 heightManifoldColor = laserlineProfile(planeDistancePixels(heightPlane, pos));\n      color = max(color, heightManifoldColor * heightManifoldAlpha);\n    }\n    "],["\n    {\n      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, heightPlane.xyz)));\n      vec4 heightManifoldColor = laserlineProfile(planeDistancePixels(heightPlane, pos));\n      color = max(color, heightManifoldColor * heightManifoldAlpha);\n    }\n    "])))),e.pointDistanceEnabled&&n.fragment.code.add(o.glsl(m||(m=t.__makeTemplateObject(["\n    {\n      // distance to sphere\n      float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);\n      vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);\n      float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));\n\n      color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);\n    }\n    "],["\n    {\n      // distance to sphere\n      float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);\n      vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);\n      float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));\n\n      color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);\n    }\n    "])))),e.lineVerticalPlaneEnabled&&n.fragment.code.add(o.glsl(g||(g=t.__makeTemplateObject(["\n    {\n      if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {\n        float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);\n\n        vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);\n        float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));\n\n        color = max(color, lineVerticalColor * lineVerticalAlpha);\n      }\n    }\n    "],["\n    {\n      if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {\n        float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);\n\n        vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);\n        float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));\n\n        color = max(color, lineVerticalColor * lineVerticalAlpha);\n      }\n    }\n    "])))),e.intersectsLineEnabled&&n.fragment.code.add(o.glsl(u||(u=t.__makeTemplateObject(["\n    {\n      if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {\n        float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);\n        vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);\n        float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));\n\n        color = max(color, intersectsLineColor * intersectsLineAlpha);\n      }\n    }\n    "],["\n    {\n      if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {\n        float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);\n        vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);\n        float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));\n\n        color = max(color, intersectsLineColor * intersectsLineAlpha);\n      }\n    }\n    "])))),n.fragment.code.add(o.glsl(D||(D=t.__makeTemplateObject(["\n    gl_FragColor = laserlineOutput(color * depthDiscontinuityAlpha);\n  }\n  "],["\n    gl_FragColor = laserlineOutput(color * depthDiscontinuityAlpha);\n  }\n  "])))),n}}));