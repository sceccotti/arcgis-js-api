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

define(["require","exports","tslib","../core/shaderLibrary/ScreenSpacePass","../core/shaderLibrary/output/ReadLinearDepth.glsl","../core/shaderLibrary/util/CameraSpace.glsl","../core/shaderModules/interfaces","../core/shaderModules/ShaderBuilder"],(function(e,n,t,r,a,o,i,s){"use strict";var l,c,f,d,u,v;Object.defineProperty(n,"__esModule",{value:!0}),n.build=void 0,n.build=function(e){var n=new s.ShaderBuilder;return n.include(r.ScreenSpacePass),1===e.output&&(n.include(a.ReadLinearDepth),n.fragment.code.add(i.glsl(l||(l=t.__makeTemplateObject(["\n      #ifndef RADIUS\n        #define RADIUS "],["\n      #ifndef RADIUS\n        #define RADIUS "])))+e.radius+"\n      #endif\n    "),n.fragment.uniforms.add("normalMap","sampler2D").add("depthMap","sampler2D").add("tex","sampler2D").add("blurSize","vec2").add("g_BlurFalloff","float").add("projScale","float").add("nearFar","vec2").add("zScale","vec2"),n.fragment.code.add(i.glsl(c||(c=t.__makeTemplateObject(["\n      float blurFunction(vec2 uv, float r, float center_d, inout float w_total, float sharpness) {\n        float c = texture2D(tex, uv).r;\n        float d = linearDepthFromTexture(depthMap, uv, nearFar);\n\n        float ddiff = d - center_d;\n\n        float w = exp(-r*r*g_BlurFalloff - ddiff*ddiff*sharpness);\n\n        w_total += w;\n\n        return w*c;\n      }\n\n      void main(void) {\n        float b = 0.0;\n        float w_total = 0.0;\n\n        float center_d = linearDepthFromTexture(depthMap, uv, nearFar);\n\n        float sharpness = -0.05 * projScale/(center_d*zScale.x+zScale.y);\n        for (int r = -RADIUS; r <= RADIUS; ++r) {\n          float rf = float(r);\n          vec2 uvOffset = uv + rf*blurSize;\n          b += blurFunction(uvOffset, rf, center_d, w_total, sharpness);\n        }\n\n        gl_FragColor = vec4(b/w_total);\n      }\n    "],["\n      float blurFunction(vec2 uv, float r, float center_d, inout float w_total, float sharpness) {\n        float c = texture2D(tex, uv).r;\n        float d = linearDepthFromTexture(depthMap, uv, nearFar);\n\n        float ddiff = d - center_d;\n\n        float w = exp(-r*r*g_BlurFalloff - ddiff*ddiff*sharpness);\n\n        w_total += w;\n\n        return w*c;\n      }\n\n      void main(void) {\n        float b = 0.0;\n        float w_total = 0.0;\n\n        float center_d = linearDepthFromTexture(depthMap, uv, nearFar);\n\n        float sharpness = -0.05 * projScale/(center_d*zScale.x+zScale.y);\n        for (int r = -RADIUS; r <= RADIUS; ++r) {\n          float rf = float(r);\n          vec2 uvOffset = uv + rf*blurSize;\n          b += blurFunction(uvOffset, rf, center_d, w_total, sharpness);\n        }\n\n        gl_FragColor = vec4(b/w_total);\n      }\n    "]))))),0===e.output&&(n.include(a.ReadLinearDepth),n.include(o.CameraSpace),n.fragment.uniforms.add("projMatrixInv","mat4").add("normalMap","sampler2D").add("depthMap","sampler2D").add("intensity","float").add("projScale","float").add("radius","float").add("nearFar","vec2").add("screenDimensions","vec2").add("rnmScale","vec2").add("rnm","sampler2D"),n.fragment.code.add(i.glsl(f||(f=t.__makeTemplateObject(["\n      #ifndef SAMPLES\n        #define SAMPLES "],["\n      #ifndef SAMPLES\n        #define SAMPLES "])))+e.samples+"\n      #endif\n      uniform vec3 pSphere[SAMPLES]; //tap position\n    "),n.fragment.code.add(i.glsl(d||(d=t.__makeTemplateObject(["\n      float fallOffFunction(float vv, float vn, float bias) {\n        float radius2 = radius * radius;\n\n        // A: From the HPG12 paper\n        // Note large epsilon to avoid overdarkening within cracks\n        // return float(vv < radius2) * max((vn - bias) / (epsilon + vv), 0.0) * radius2 * 0.6;\n\n        // B: Smoother transition to zero (lowers contrast, smoothing out corners). [Recommended]\n        float f = max(radius2 - vv, 0.0); return f * f * f * max(vn-bias, 0.0);\n\n        // C: Medium contrast (which looks better at high radii), no division.  Note that the\n        // contribution still falls off with radius^2, but we've adjusted the rate in a way that is\n        // more computationally efficient and happens to be aesthetically pleasing.\n        // return 4.0 * max(1.0 - vv * invRadius2, 0.0) * max(vn - bias, 0.0);\n\n        // D: Low contrast, no division operation\n        // return 2.0 * float(vv < radius * radius) * max(vn - bias, 0.0);\n      }\n    "],["\n      float fallOffFunction(float vv, float vn, float bias) {\n        float radius2 = radius * radius;\n\n        // A: From the HPG12 paper\n        // Note large epsilon to avoid overdarkening within cracks\n        // return float(vv < radius2) * max((vn - bias) / (epsilon + vv), 0.0) * radius2 * 0.6;\n\n        // B: Smoother transition to zero (lowers contrast, smoothing out corners). [Recommended]\n        float f = max(radius2 - vv, 0.0); return f * f * f * max(vn-bias, 0.0);\n\n        // C: Medium contrast (which looks better at high radii), no division.  Note that the\n        // contribution still falls off with radius^2, but we've adjusted the rate in a way that is\n        // more computationally efficient and happens to be aesthetically pleasing.\n        // return 4.0 * max(1.0 - vv * invRadius2, 0.0) * max(vn - bias, 0.0);\n\n        // D: Low contrast, no division operation\n        // return 2.0 * float(vv < radius * radius) * max(vn - bias, 0.0);\n      }\n    "])))),n.fragment.code.add(i.glsl(u||(u=t.__makeTemplateObject(["\n      float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {\n        vec3 v = Q - C;\n        float vv = dot(v, v);\n        float vn = dot(normalize(v), n_C);\n        return fallOffFunction(vv, vn, 0.1);\n      }\n    "],["\n      float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {\n        vec3 v = Q - C;\n        float vv = dot(v, v);\n        float vn = dot(normalize(v), n_C);\n        return fallOffFunction(vv, vn, 0.1);\n      }\n    "])))),n.fragment.code.add(i.glsl(v||(v=t.__makeTemplateObject(["\n      void main(void) {\n        //Hash function used in the HPG12 AlchemyAO paper\n        //Not supported in WebGL -> using texture lookup as in old SSAO shader instead\n        //ivec2 ssC = ivec2(gl_FragCoord.xy);\n        //float randomPatternRotationAngle = float((3 * ssC.x ^ ssC.y + ssC.x * ssC.y) * 10);\n        vec3 fres = normalize((texture2D(rnm, uv * rnmScale).xyz * 2.0) - vec3(1.0));\n\n        float currentPixelDepth = linearDepthFromTexture(depthMap, uv, nearFar);\n\n        if (-currentPixelDepth>nearFar.y || -currentPixelDepth<nearFar.x) {\n          gl_FragColor = vec4(0.0);\n          return;\n        }\n\n        vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy,currentPixelDepth);\n\n        // get the normal of current fragment\n        vec4 norm4 = texture2D(normalMap, uv);\n        vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;\n        bool isTerrain = norm4.w<0.5;\n\n        float sum = .0;\n\n        vec4 occluderFragment;\n        vec3 ray;\n\n        vec3 tapPixelPos;\n\n        // note: the factor 2.0 should not be necessary, but makes ssao much nicer.\n        // bug or deviation from CE somewhere else?\n        float ps = projScale/(2.0*currentPixelPos.z*zScale.x+zScale.y);\n\n        for(int i = 0; i < SAMPLES; ++i) {\n          // get a vector (randomized inside of a sphere with radius 1.0) from a texture and reflect it\n          //float ssR;\n          //vec2 unitOffset = tapLocation(i, randomPatternRotationAngle, ssR);\n          // get the depth of the occluder fragment\n          //vec2 offset = vec2(-unitOffset*radius*ssR*ps);\n\n          vec2 unitOffset = reflect(pSphere[i], fres).xy;\n          vec2 offset = vec2(-unitOffset*radius*ps);\n\n          //don't use current or very nearby samples\n          if ( abs(offset.x)<2.0 || abs(offset.y)<2.0) continue;\n\n          vec2 tc = vec2(gl_FragCoord.xy + offset);\n          if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenDimensions.x || tc.y > screenDimensions.y) continue;\n          vec2 tcTap = tc/screenDimensions;\n          float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap, nearFar);\n\n          if (isTerrain) {\n            bool isTerrainTap = texture2D(normalMap, tcTap).w<0.5;\n            if (isTerrainTap) {\n              continue;\n            }\n          }\n\n          tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);\n\n          sum+= aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);\n        }\n\n        // output the result\n\n        float A = max(1.0-sum*intensity/float(SAMPLES),0.0);\n\n        // Anti-tone map to reduce contrast and drag dark region farther\n        // (x^0.2 + 1.2 * x^4)/2.2\n        A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;\n\n        //gl_FragColor = vec4(norm/2.0+0.5, 1.0);\n        //gl_FragColor = vec4(-currentPixelDepth/1000.0);\n        //gl_FragColor = vec4(tapPixelPos.x/100.0);\n        gl_FragColor = vec4(A);\n      }\n    "],["\n      void main(void) {\n        //Hash function used in the HPG12 AlchemyAO paper\n        //Not supported in WebGL -> using texture lookup as in old SSAO shader instead\n        //ivec2 ssC = ivec2(gl_FragCoord.xy);\n        //float randomPatternRotationAngle = float((3 * ssC.x ^ ssC.y + ssC.x * ssC.y) * 10);\n        vec3 fres = normalize((texture2D(rnm, uv * rnmScale).xyz * 2.0) - vec3(1.0));\n\n        float currentPixelDepth = linearDepthFromTexture(depthMap, uv, nearFar);\n\n        if (-currentPixelDepth>nearFar.y || -currentPixelDepth<nearFar.x) {\n          gl_FragColor = vec4(0.0);\n          return;\n        }\n\n        vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy,currentPixelDepth);\n\n        // get the normal of current fragment\n        vec4 norm4 = texture2D(normalMap, uv);\n        vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;\n        bool isTerrain = norm4.w<0.5;\n\n        float sum = .0;\n\n        vec4 occluderFragment;\n        vec3 ray;\n\n        vec3 tapPixelPos;\n\n        // note: the factor 2.0 should not be necessary, but makes ssao much nicer.\n        // bug or deviation from CE somewhere else?\n        float ps = projScale/(2.0*currentPixelPos.z*zScale.x+zScale.y);\n\n        for(int i = 0; i < SAMPLES; ++i) {\n          // get a vector (randomized inside of a sphere with radius 1.0) from a texture and reflect it\n          //float ssR;\n          //vec2 unitOffset = tapLocation(i, randomPatternRotationAngle, ssR);\n          // get the depth of the occluder fragment\n          //vec2 offset = vec2(-unitOffset*radius*ssR*ps);\n\n          vec2 unitOffset = reflect(pSphere[i], fres).xy;\n          vec2 offset = vec2(-unitOffset*radius*ps);\n\n          //don't use current or very nearby samples\n          if ( abs(offset.x)<2.0 || abs(offset.y)<2.0) continue;\n\n          vec2 tc = vec2(gl_FragCoord.xy + offset);\n          if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenDimensions.x || tc.y > screenDimensions.y) continue;\n          vec2 tcTap = tc/screenDimensions;\n          float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap, nearFar);\n\n          if (isTerrain) {\n            bool isTerrainTap = texture2D(normalMap, tcTap).w<0.5;\n            if (isTerrainTap) {\n              continue;\n            }\n          }\n\n          tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);\n\n          sum+= aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);\n        }\n\n        // output the result\n\n        float A = max(1.0-sum*intensity/float(SAMPLES),0.0);\n\n        // Anti-tone map to reduce contrast and drag dark region farther\n        // (x^0.2 + 1.2 * x^4)/2.2\n        A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;\n\n        //gl_FragColor = vec4(norm/2.0+0.5, 1.0);\n        //gl_FragColor = vec4(-currentPixelDepth/1000.0);\n        //gl_FragColor = vec4(tapPixelPos.x/100.0);\n        gl_FragColor = vec4(A);\n      }\n    "]))))),n}}));