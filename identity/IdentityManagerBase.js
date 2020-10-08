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

define(["require","exports","tslib","../config","../kernel","../request","../core/cookie","../core/Error","../core/Evented","../core/global","../core/lang","../core/object","../core/promiseUtils","../core/string","../core/urlUtils","../core/urlUtils","../core/accessorSupport/decorators","./IdentityForm","./IdentityModal","./OAuthCredential","./OAuthInfo","./ServerInfo"],(function(e,r,t,n,i,s,o,a,l,u,c,h,d,p,f,v,_,g,m,S,w,y){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Credential=r.IdentityManagerBase=void 0;var I={},k=function(e){var r=new v.Url(e.owningSystemUrl).host,t=new v.Url(e.server).host,n=/.+\.arcgis\.com$/i;return n.test(r)&&n.test(t)},A=function(e,r){return!!(k(e)&&r&&r.some((function(r){return r.test(e.server)})))},U=function(e){function r(){var r=e.call(this)||this;return r._portalConfig=u.esriGeowConfig,r.serverInfos=[],r.oAuthInfos=[],r.credentials=[],r._soReqs=[],r._xoReqs=[],r._portals=[],r.defaultOAuthInfo=null,r.defaultTokenValidity=60,r.dialog=null,r.formConstructor=g,r.tokenValidity=null,r.signInPage=null,r.useSignInPage=!0,r.normalizeWebTierAuth=!1,r._busy=null,r._rejectOnPersistedPageShow=!1,r._oAuthHash=null,r._gwTokenUrl="/sharing/rest/generateToken",r._agsRest="/rest/services",r._agsPortal=/\/sharing(\/|$)/i,r._agsAdmin=/(https?:\/\/[^\/]+\/[^\/]+)\/admin\/?(\/.*)?$/i,r._adminSvcs=/\/rest\/admin\/services(\/|$)/i,r._gwDomains=[{regex:/^https?:\/\/www\.arcgis\.com/i,customBaseUrl:"maps.arcgis.com",tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:dev|[a-z\d-]+\.mapsdev)\.arcgis\.com/i,customBaseUrl:"mapsdev.arcgis.com",tokenServiceUrl:"https://dev.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:devext|[a-z\d-]+\.mapsdevext)\.arcgis\.com/i,customBaseUrl:"mapsdevext.arcgis.com",tokenServiceUrl:"https://devext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:qaext|[a-z\d-]+\.mapsqa)\.arcgis\.com/i,customBaseUrl:"mapsqa.arcgis.com",tokenServiceUrl:"https://qaext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/[a-z\d-]+\.maps\.arcgis\.com/i,customBaseUrl:"maps.arcgis.com",tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"}],r._legacyFed=[],r._regexSDirUrl=/http.+\/rest\/services\/?/gi,r._regexServerType=/(\/(FeatureServer|GPServer|GeoDataServer|GeocodeServer|GeoenrichmentServer|GeometryServer|GlobeServer|ImageServer|MapServer|MobileServer|NAServer|NetworkDiagramServer|ParcelFabricServer|RelationalCatalogServer|SceneServer|StreamServer|UtilityNetworkServer|ValidationServer|VectorTileServer|VersionManagementServer)).*/gi,r._gwUser=/http.+\/users\/([^\/]+)\/?.*/i,r._gwItem=/http.+\/items\/([^\/]+)\/?.*/i,r._gwGroup=/http.+\/groups\/([^\/]+)\/?.*/i,r._rePortalTokenSvc=/\/sharing(\/rest)?\/generatetoken/i,r._createDefaultOAuthInfo=!0,r._hasTestedIfAppIsOnPortal=!1,r._getOAuthHash(),window.addEventListener("pageshow",(function(e){r._pageShowHandler(e)})),r}return t.__extends(r,e),r.prototype.registerServers=function(e){var r=this,t=this.serverInfos;t?(e=e.filter((function(e){return!r.findServerInfo(e.server)})),this.serverInfos=t.concat(e)):this.serverInfos=e,e.forEach((function(e){e.owningSystemUrl&&r._portals.push(e.owningSystemUrl),e.hasPortal&&r._portals.push(e.server)}))},r.prototype.registerOAuthInfos=function(e){var r=this,t=this.oAuthInfos;t?(e=e.filter((function(e){return!r.findOAuthInfo(e.portalUrl)})),this.oAuthInfos=t.concat(e)):this.oAuthInfos=e},r.prototype.registerToken=function(e){e=t.__assign({},e);var r,n=this._sanitizeUrl(e.server),i=this._isServerRsrc(n),s=this.findServerInfo(n),o=!0;s||((s=new y).server=this._getServerInstanceRoot(n),i?s.hasServer=!0:(s.tokenServiceUrl=this._getTokenSvcUrl(n),s.hasPortal=!0),this.registerServers([s])),(r=this._findCredential(n))?(delete e.server,c.mixin(r,e),o=!1):((r=new x({userId:e.userId,server:s.server,token:e.token,expires:e.expires,ssl:e.ssl,scope:i?"server":"portal"})).resources=[n],this.credentials.push(r)),r.emitTokenChange(!1),o||r.refreshServerTokens()},r.prototype.toJSON=function(){return c.fixJson({serverInfos:this.serverInfos.map((function(e){return e.toJSON()})),oAuthInfos:this.oAuthInfos.map((function(e){return e.toJSON()})),credentials:this.credentials.map((function(e){return e.toJSON()}))})},r.prototype.initialize=function(e){var r=this;if(e){"string"==typeof e&&(e=JSON.parse(e));var t=e.serverInfos,n=e.oAuthInfos,i=e.credentials;if(t){var s=[];t.forEach((function(e){e.server&&e.tokenServiceUrl&&s.push(e.declaredClass?e:new y(e))})),s.length&&this.registerServers(s)}if(n){var o=[];n.forEach((function(e){e.appId&&o.push(e.declaredClass?e:new w(e))})),o.length&&this.registerOAuthInfos(o)}i&&i.forEach((function(e){e.server&&e.token&&e.expires&&e.expires>Date.now()&&((e=e.declaredClass?e:new x(e)).emitTokenChange(),r.credentials.push(e))}))}},r.prototype.findServerInfo=function(e){var r;e=this._sanitizeUrl(e);for(var t=0,n=this.serverInfos;t<n.length;t++){var i=n[t];if(this._hasSameServerInstance(i.server,e)){r=i;break}}return r},r.prototype.findOAuthInfo=function(e){var r;e=this._sanitizeUrl(e);for(var t=0,n=this.oAuthInfos;t<n.length;t++){var i=n[t];if(this._hasSameServerInstance(i.portalUrl,e)){r=i;break}}return r},r.prototype.findCredential=function(e,r){var t,n;if(e=this._sanitizeUrl(e),n=this._isServerRsrc(e)?"server":"portal",r)for(var i=0,s=this.credentials;i<s.length;i++){var o=s[i];if(this._hasSameServerInstance(o.server,e)&&r===o.userId&&o.scope===n){t=o;break}}else for(var a=0,l=this.credentials;a<l.length;a++){o=l[a];if(this._hasSameServerInstance(o.server,e)&&-1!==this._getIdenticalSvcIdx(e,o)&&o.scope===n){t=o;break}}return t},r.prototype.getCredential=function(e,r){var n,i,s=!0;r&&(n=!!r.token,i=r.error,s=!1!==r.prompt),r=t.__assign({},r),e=this._sanitizeUrl(e);var l=d.createAbortController(),u=d.createResolver();if(r.signal&&d.onAbort(r.signal,(function(){l.abort()})),d.onAbort(l,(function(){u.reject(new a("identity-manager:user-aborted","ABORTED"))})),d.isAborted(l))return u.promise;r.signal=l.signal;var c,h=this._isAdminResource(e),f=n&&this._doPortalSignIn(e)?this._getEsriAuthCookie():null,v=n?this.findCredential(e):null;if(v&&i&&i.details&&498===i.details.httpStatus)v.destroy(),f&&f.token===r.token&&(o.writeCookie("esri_auth",null,{expires:-1,path:"/",domain:document.domain}),p.endsWith(window.location.hostname,".arcgis.com")&&o.writeCookie("esri_auth",null,{expires:-1,path:"/",domain:"arcgis.com"}));else if(f||v){var _=f&&f.email||v&&v.userId;return c=new a("identity-manager:not-authorized","You are currently signed in as: '"+_+"'. You do not have access to this resource: "+e,{error:i}),u.reject(c),u.promise}var g=this._findCredential(e,r);if(g)return u.resolve(g),u.promise;var m=this.findServerInfo(e);if(m)!m.hasServer&&this._isServerRsrc(e)&&(m._restInfoPms=this._getTokenSvcUrl(e),m.hasServer=!0);else{var S=this._getTokenSvcUrl(e);if(!S)return c=new a("identity-manager:unknown-resource","Unknown resource - could not find token service endpoint."),u.reject(c),u.promise;(m=new y).server=this._getServerInstanceRoot(e),"string"==typeof S?(m.tokenServiceUrl=S,m.hasPortal=!0):(m._restInfoPms=S,m.hasServer=!0),this.registerServers([m])}return s&&m.hasPortal&&void 0===m._selfReq&&!this._findOAuthInfo(e)&&(m._selfReq={owningTenant:r&&r.owningTenant,selfDfd:this._getPortalSelf(m.tokenServiceUrl.replace(this._rePortalTokenSvc,"/sharing/rest/portals/self"),e)}),this._enqueue(e,m,r,u,h)},r.prototype.getResourceName=function(e){return this._isRESTService(e)?e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"")||"":this._gwUser.test(e)&&e.replace(this._gwUser,"$1")||this._gwItem.test(e)&&e.replace(this._gwItem,"$1")||this._gwGroup.test(e)&&e.replace(this._gwGroup,"$1")||""},r.prototype.generateToken=function(e,r,t){var n,i,o,l,u,h,d,p,_,g,m=this._rePortalTokenSvc.test(e.tokenServiceUrl),S=new v.Url(window.location.href.toLowerCase()),w=this._getEsriAuthCookie(),y=e.shortLivedTokenValidity;return r&&(g=this.tokenValidity||y||this.defaultTokenValidity)>y&&y>0&&(g=y),t&&(i=t.isAdmin,o=t.serverUrl,l=t.token,d=t.signal,p=t.ssl,e.customParameters=t.customParameters),i?u=e.adminTokenServiceUrl:(u=e.tokenServiceUrl,h=new v.Url(u.toLowerCase()),w&&(n=(n=w.auth_tier)&&n.toLowerCase()),("web"===n||e.webTierAuth)&&t&&t.serverUrl&&!p&&"http"===S.scheme&&(f.hasSameOrigin(S.uri,u,!0)||"https"===h.scheme&&S.host===h.host&&"7080"===S.port&&"7443"===h.port)&&(u=u.replace(/^https:/i,"http:").replace(/:7443/i,":7080"))),_=c.mixin({query:c.mixin({request:"getToken",username:r&&r.username,password:r&&r.password,serverUrl:o,token:l,expiration:g,referer:i||m?window.location.host:null,client:i?"referer":null,f:"json"},e.customParameters),method:"post",authMode:"anonymous",useProxy:this._useProxy(e,t),signal:d},t&&t.ioArgs),m||(_.withCredentials=!1),s(u,_).then((function(t){var n=t.data;if(!n||!n.token)return new a("identity-manager:authentication-failed","Unable to generate token");var i=e.server;return I[i]||(I[i]={}),r&&(I[i][r.username]=r.password),n.validity=g,n}))},r.prototype.isBusy=function(){return!!this._busy},r.prototype.checkSignInStatus=function(e){return this.checkAppAccess(e,"").then((function(e){return e.credential}))},r.prototype.checkAppAccess=function(e,r,t){var n=this,i=!1;return this.getCredential(e,{prompt:!1}).then((function(o){var l,u={f:"json"};if("portal"===o.scope)if(r&&(n._doPortalSignIn(e,!0)||t&&t.force))l=o.server+"/sharing/rest/oauth2/validateAppAccess",u.client_id=r;else{if(!o.token)return{credential:o};l=o.server+"/sharing/rest"}else{if(!o.token)return{credential:o};l=o.server+"/rest/services"}return o.token&&(u.token=o.token),s(l,{query:u,authMode:"anonymous"}).then((function(e){if(!1===e.data.valid)throw new a("identity-manager:not-authorized","You are currently signed in as: '"+o.userId+"'.");return i=!!e.data.viewOnlyUserTypeApp,{credential:o}})).catch((function(e){if("identity-manager:not-authorized"===e.name)throw e;var r=e.details&&e.details.httpStatus;if(498===r)throw o.destroy(),new a("identity-manager:not-authenticated","User is not signed in.");if(400===r)throw new a("identity-manager:invalid-request");return{credential:o}}))})).then((function(e){return{credential:e.credential,viewOnly:i}}))},r.prototype.setOAuthResponseHash=function(e){var r=this._oAuthDfd;if(this._oAuthDfd=null,r&&e){clearInterval(this._oAuthIntervalId),"#"===e.charAt(0)&&(e=e.substring(1));var t=f.queryToObject(e);if(t.error){var n="access_denied"===t.error,i=new a(n?"identity-manager:user-aborted":"identity-manager:authentication-failed",n?"ABORTED":"OAuth: "+t.error+" - "+t.error_description);r.reject(i)}else{var s=r.sinfo_,o=r.oinfo_._oAuthCred,l=new x({userId:t.username,server:s.server,token:t.access_token,expires:Date.now()+1e3*Number(t.expires_in),ssl:"true"===t.ssl,_oAuthCred:o});o.storage=t.persist?window.localStorage:window.sessionStorage,o.token=l.token,o.expires=l.expires,o.userId=l.userId,o.ssl=l.ssl,o.save(),r.resolve(l)}}},r.prototype.setRedirectionHandler=function(e){this._redirectFunc=e},r.prototype.setOAuthRedirectionHandler=function(e){this._oAuthRedirectFunc=e},r.prototype.setProtocolErrorHandler=function(e){this._protocolFunc=e},r.prototype.signIn=function(e,r,t){var n=this;void 0===t&&(t={});var i=d.createResolver(),s=function(){var e;null==u||u.remove(),null==c||c.remove(),null==h||h.remove(),null==l||l.destroy(),null===(e=n.dialog)||void 0===e||e.destroy(),n.dialog=l=u=c=h=null},o=function(){s(),n._oAuthDfd=null,i.reject(new a("identity-manager:user-aborted","ABORTED"))};t.signal&&d.onAbort(t.signal,(function(){o()}));var l=new this.formConstructor;l.resource=this.getResourceName(e),l.server=r.server,this.dialog=new m,this.dialog.content=l,this.dialog.open=!0,this.emit("dialog-create");var u=l.on("cancel",o),c=this.dialog.watch("open",o),h=l.on("submit",(function(e){n.generateToken(r,e,{isAdmin:t.isAdmin,signal:t.signal}).then((function(n){s();var o=new x({userId:e.username,server:r.server,token:n.token,expires:null!=n.expires?Number(n.expires):null,ssl:!!n.ssl,isAdmin:t.isAdmin,validity:n.validity});i.resolve(o)})).catch((function(e){l.error=e,l.signingIn=!1}))}));return i.promise},r.prototype.oAuthSignIn=function(e,r,t,n){var i=this;this._oAuthDfd=d.createResolver();var s=this._oAuthDfd;(null==n?void 0:n.signal)&&d.onAbort(n.signal,(function(){var e=i._oAuthDfd&&i._oAuthDfd.oAuthWin_;e&&!e.closed?e.close():i.dialog&&u()})),s.resUrl_=e,s.sinfo_=r,s.oinfo_=t;var o=!n||!1!==n.oAuthPopupConfirmation;if(!t.popup||!o)return this._doOAuthSignIn(e,r,t),s.promise;var l=new this.formConstructor;l.oAuthPrompt=!0,l.server=r.server,this.dialog=new m,this.dialog.content=l,this.dialog.open=!0,this.emit("dialog-create");var u=function(){f(),i._oAuthDfd=null,s.reject(new a("identity-manager:user-aborted","ABORTED"))},c=l.on("cancel",u),h=this.dialog.watch("open",u),p=l.on("submit",(function(){f(),i._doOAuthSignIn(e,r,t)})),f=function(){c.remove(),h.remove(),p.remove(),l.destroy(),i.dialog.destroy(),i.dialog=null};return s.promise},r.prototype.destroyCredentials=function(){this.credentials&&this.credentials.slice().forEach((function(e){e.destroy()}));this.emit("credentials-destroy")},r.prototype._getOAuthHash=function(){var e=window.location.hash;if(e){"#"===e.charAt(0)&&(e=e.substring(1));var r=f.queryToObject(e),t=!1;r.access_token&&r.expires_in&&r.state&&r.hasOwnProperty("username")?(r.state=JSON.parse(r.state),this._oAuthHash=r,t=!0):r.error&&r.error_description&&(console.log("IdentityManager OAuth Error: ",r.error," - ",r.error_description),"access_denied"===r.error&&(t=!0)),t&&(window.location.hash="object"==typeof r.state&&r.state.hash||"")}},r.prototype._pageShowHandler=function(e){if(e.persisted&&this.isBusy()&&this._rejectOnPersistedPageShow){var r=new a("identity-manager:user-aborted","ABORTED");this._errbackFunc(r)}},r.prototype._findCredential=function(e,r){var t,n,i,s,o=this,a=-1,l=r&&r.token,u=r&&r.resource,c=this._isServerRsrc(e)?"server":"portal",h=this.credentials.filter((function(r){return o._hasSameServerInstance(r.server,e)&&r.scope===c}));if(e=u||e,h.length)if(1===h.length){if(t=h[0],s=this.findServerInfo(t.server),n=s&&s.owningSystemUrl,i=n&&this.findCredential(n,t.userId),a=this._getIdenticalSvcIdx(e,t),!l)return-1===a&&t.resources.push(e),this._addResource(e,i),t;-1!==a&&(t.resources.splice(a,1),this._removeResource(e,i))}else{var d,p;if(h.some((function(r){return-1!==(p=o._getIdenticalSvcIdx(e,r))&&(d=r,s=o.findServerInfo(d.server),n=s&&s.owningSystemUrl,i=n&&o.findCredential(n,d.userId),a=p,!0)})),l)d&&(d.resources.splice(a,1),this._removeResource(e,i));else if(d)return this._addResource(e,i),d}},r.prototype._findOAuthInfo=function(e){var r=this.findOAuthInfo(e);if(!r)for(var t=0,n=this.oAuthInfos;t<n.length;t++){var i=n[t];if(this._isIdProvider(i.portalUrl,e)){r=i;break}}return r},r.prototype._addResource=function(e,r){r&&-1===this._getIdenticalSvcIdx(e,r)&&r.resources.push(e)},r.prototype._removeResource=function(e,r){var t=-1;r&&(t=this._getIdenticalSvcIdx(e,r))>-1&&r.resources.splice(t,1)},r.prototype._useProxy=function(e,r){return r&&r.isAdmin&&!f.hasSameOrigin(e.adminTokenServiceUrl,window.location.href)||!this._isPortalDomain(e.tokenServiceUrl)&&"10.1"===String(e.currentVersion)&&!f.hasSameOrigin(e.tokenServiceUrl,window.location.href)},r.prototype._getOrigin=function(e){var r=new v.Url(e);return r.scheme+"://"+r.host+(null!=r.port?":"+r.port:"")},r.prototype._getServerInstanceRoot=function(e){var r=e.toLowerCase(),t=r.indexOf(this._agsRest);return-1===t&&this._isAdminResource(e)&&(t=this._agsAdmin.test(e)?e.replace(this._agsAdmin,"$1").length:e.search(this._adminSvcs)),-1===t&&(t=r.indexOf("/sharing")),-1===t&&"/"===r.substr(-1)&&(t=r.length-1),t>-1?e.substring(0,t):e},r.prototype._hasSameServerInstance=function(e,r){return"/"===e.substr(-1)&&(e=e.slice(0,-1)),e=e.toLowerCase(),r=this._getServerInstanceRoot(r).toLowerCase(),e=this._normalizeAGOLorgDomain(e),r=this._normalizeAGOLorgDomain(r),(e=e.substr(e.indexOf(":")))===(r=r.substr(r.indexOf(":")))},r.prototype._normalizeAGOLorgDomain=function(e){var r=/^https?:\/\/(?:cdn|[a-z\d-]+\.maps)\.arcgis\.com/i,t=/^https?:\/\/(?:cdndev|[a-z\d-]+\.mapsdevext)\.arcgis\.com/i,n=/^https?:\/\/(?:cdnqa|[a-z\d-]+\.mapsqa)\.arcgis\.com/i;return r.test(e)?e=e.replace(r,"https://www.arcgis.com"):t.test(e)?e=e.replace(t,"https://devext.arcgis.com"):n.test(e)&&(e=e.replace(n,"https://qaext.arcgis.com")),e},r.prototype._sanitizeUrl=function(e){var r=(n.request.proxyUrl||"").toLowerCase(),t=r?e.toLowerCase().indexOf(r+"?"):-1;return-1!==t&&(e=e.substring(t+r.length+1)),e=f.normalize(e),f.urlToObject(e).path},r.prototype._isRESTService=function(e){return e.indexOf(this._agsRest)>-1},r.prototype._isAdminResource=function(e){return this._agsAdmin.test(e)||this._adminSvcs.test(e)},r.prototype._isServerRsrc=function(e){return this._isRESTService(e)||this._isAdminResource(e)},r.prototype._isIdenticalService=function(e,r){var t;if(this._isRESTService(e)&&this._isRESTService(r)){var n=this._getSuffix(e).toLowerCase(),i=this._getSuffix(r).toLowerCase();if(!(t=n===i)){var s=/(.*)\/(MapServer|FeatureServer).*/gi;t=n.replace(s,"$1")===i.replace(s,"$1")}}else this._isAdminResource(e)&&this._isAdminResource(r)?t=!0:this._isServerRsrc(e)||this._isServerRsrc(r)||!this._isPortalDomain(e)||(t=!0);return t},r.prototype._isPortalDomain=function(e){var r=this,t=new v.Url(e.toLowerCase()),i=this._portalConfig,s=this._gwDomains.some((function(e){return e.regex.test(t.uri)}));return!s&&i&&(s=this._hasSameServerInstance(this._getServerInstanceRoot(i.restBaseUrl),t.uri)),s||n.portalUrl&&(s=f.hasSameOrigin(t,n.portalUrl,!0)),s||(s=this._portals.some((function(e){return r._hasSameServerInstance(e,t.uri)}))),s=s||this._agsPortal.test(t.path)},r.prototype._isIdProvider=function(e,r){var t=-1,n=-1;this._gwDomains.forEach((function(i,s){-1===t&&i.regex.test(e)&&(t=s),-1===n&&i.regex.test(r)&&(n=s)}));var i=!1;if(t>-1&&n>-1&&(0===t||4===t?0!==n&&4!==n||(i=!0):1===t?1!==n&&2!==n||(i=!0):2===t?2===n&&(i=!0):3===t&&3===n&&(i=!0)),!i){var s=this.findServerInfo(r),o=s&&s.owningSystemUrl;o&&k(s)&&this._isPortalDomain(o)&&this._isIdProvider(e,o)&&(i=!0)}return i},r.prototype._getIdenticalSvcIdx=function(e,r){for(var t=-1,n=0;n<r.resources.length;n++){var i=r.resources[n];if(this._isIdenticalService(e,i)){t=n;break}}return t},r.prototype._getSuffix=function(e){return e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"$1")},r.prototype._getTokenSvcUrl=function(e){var r,t=this;if(this._isRESTService(e)||this._isAdminResource(e)){var n=this._getServerInstanceRoot(e);return{adminUrl:n+"/admin/generateToken",promise:s(e=n+"/rest/info",{query:{f:"json"}}).then((function(e){return e.data}))}}if(this._isPortalDomain(e)){var i="";if(this._gwDomains.some((function(r){return r.regex.test(e)&&(i=r.tokenServiceUrl),!!i})),i||this._portals.some((function(r){return t._hasSameServerInstance(r,e)&&(i=r+t._gwTokenUrl),!!i})),i||-1!==(r=e.toLowerCase().indexOf("/sharing"))&&(i=e.substring(0,r)+this._gwTokenUrl),i||(i=this._getOrigin(e)+this._gwTokenUrl),i){var o=new v.Url(e).port;/^http:\/\//i.test(e)&&"7080"===o&&(i=i.replace(/:7080/i,":7443")),i=i.replace(/http:/i,"https:")}return i}if(-1!==e.toLowerCase().indexOf("premium.arcgisonline.com"))return"https://premium.arcgisonline.com/server/tokens"},r.prototype._exchangeToken=function(e,r,t){return s(e+"/sharing/rest/oauth2/exchangeToken",{authMode:"anonymous",method:"post",query:{f:"json",client_id:r,token:t}}).then((function(e){return e.data.token}))},r.prototype._getPortalSelf=function(e,r){var t;if(this._gwDomains.some((function(r){return r.regex.test(e)&&(t=r.customBaseUrl),!!t})),t)return d.resolve({allSSL:!0,currentVersion:"4.4",customBaseUrl:t,portalMode:"multitenant",supportsOAuth:!0});"https:"===window.location.protocol?e=e.replace(/^http:/i,"https:").replace(/:7080/i,":7443"):/^http:/i.test(r)&&(e=e.replace(/^https:/i,"http:").replace(/:7443/i,":7080"));return s(e,{query:{f:"json"},authMode:"anonymous",withCredentials:!0}).then((function(e){return e.data}))},r.prototype._hasPortalSession=function(){return!!this._getEsriAuthCookie()},r.prototype._getEsriAuthCookie=function(){var e=null;if(navigator.cookieEnabled){for(var r=this._getAllCookies("esri_auth"),t=void 0,n=0;n<r.length;n++){if((o=JSON.parse(r[n])).portalApp){e=o;break}t?t.push(o):t=[o]}if(!e&&t)for(var i=0,s=t;i<s.length;i++){var o;if((o=s[i]).urlKey&&window.location.hostname===o.urlKey.toLowerCase()+"."+o.customBaseUrl){e=o;break}}}if(e){var a=null;e.expires&&("number"==typeof e.expires?a=e.expires:"string"==typeof e.expires&&(a=Date.parse(e.expires)),isNaN(a)&&(a=null),e.expires=a),a&&a<Date.now()&&(e=null)}return e},r.prototype._getAllCookies=function(e){var r=[],t=document.cookie.match(new RegExp("(?:^|; )"+p.escapeRegExpString(e)+"=([^;]*)","g"));if(t)for(var n=0;n<t.length;n++){var i=t[n],s=i.indexOf("=");s>-1&&(i=i.substring(s+1),r.push(decodeURIComponent(i)))}return r},r.prototype._doPortalSignIn=function(e,r){if(navigator.cookieEnabled){var t=this._getEsriAuthCookie(),n=this._portalConfig,i=window.location.href,s=this.findServerInfo(e);if((r||this.useSignInPage)&&(n||this._isPortalDomain(i)||t)&&(s?s.hasPortal||s.owningSystemUrl&&this._isPortalDomain(s.owningSystemUrl):this._isPortalDomain(e))&&(this._isIdProvider(i,e)||n&&(this._hasSameServerInstance(this._getServerInstanceRoot(n.restBaseUrl),e)||this._isIdProvider(n.restBaseUrl,e))||f.hasSameOrigin(i,e,!0)))return!0}return!1},r.prototype._canUsePortalSignInWorkflow=function(e){return this._doPortalSignIn(e)&&(window===window.top||this._hasPortalSession())},r.prototype._checkProtocol=function(e,r,t,n){var i=!0,s=n?r.adminTokenServiceUrl:r.tokenServiceUrl;0===s.trim().toLowerCase().indexOf("https:")&&0!==window.location.href.toLowerCase().indexOf("https:")&&f.getProxyRule(s)&&((i=!!this._protocolFunc&&!!this._protocolFunc({resourceUrl:e,serverInfo:r}))||t(new a("identity-manager:aborted","Aborted the Sign-In process to avoid sending password over insecure connection.")));return i},r.prototype._enqueue=function(e,r,t,n,i,s){return n||(n=d.createResolver()),n.resUrl_=e,n.sinfo_=r,n.options_=t,n.admin_=i,n.refresh_=s,this._busy?this._hasSameServerInstance(this._getServerInstanceRoot(e),this._busy.resUrl_)?(this._oAuthDfd&&this._oAuthDfd.oAuthWin_&&this._oAuthDfd.oAuthWin_.focus(),this._soReqs.push(n)):this._xoReqs.push(n):this._doSignIn(n),n.promise},r.prototype._doSignIn=function(e){var r=this;this._busy=e,this._rejectOnPersistedPageShow=!1;var t=function(t){var n=e.options_&&e.options_.resource,i=e.resUrl_,s=e.refresh_,o=!1;-1===r.credentials.indexOf(t)&&(s&&-1!==r.credentials.indexOf(s)?(s.userId=t.userId,s.token=t.token,s.expires=t.expires,s.validity=t.validity,s.ssl=t.ssl,s.creationTime=t.creationTime,o=!0,t=s):r.credentials.push(t)),t.resources||(t.resources=[]),t.resources.push(n||i),t.scope=r._isServerRsrc(i)?"server":"portal",t.emitTokenChange();var a=r._soReqs,l={};r._soReqs=[],a.forEach((function(e){if(!r._isIdenticalService(i,e.resUrl_)){var n=r._getSuffix(e.resUrl_);l[n]||(l[n]=!0,t.resources.push(e.resUrl_))}})),e.resolve(t),a.forEach((function(e){r._hasSameServerInstance(r._getServerInstanceRoot(i),e.resUrl_)?e.resolve(t):r._soReqs.push(e)})),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,o||r.emit("credential-create",{credential:t}),r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},n=function(t){e.reject(t),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},i=function(i,s,o,l){var u,c,h=e.sinfo_,d=!e.options_||!1!==e.options_.prompt,p=h.hasPortal&&r._findOAuthInfo(e.resUrl_);if(r._canUsePortalSignInWorkflow(e.resUrl_)){var f=r._getEsriAuthCookie(),v=r._portalConfig;if(f){if(!h.webTierAuth)"web"===(f.auth_tier&&f.auth_tier.toLowerCase())&&(h.webTierAuth=!0);return void((u=new x({userId:f.email,server:h.server,token:h.webTierAuth?null:f.token,expires:f.expires})).token?e._pendingDfd=r._exchangeToken(u.server,p?p.appId:"arcgisonline",u.token).then((function(e){u.token=e,t(u)})).catch((function(){t(u)})):t(u))}if(d){var _="",g=window.location.href;return _=(_=r.signInPage?r.signInPage:v?v.baseUrl+v.signin:r._isIdProvider(g,e.resUrl_)?r._getOrigin(g)+"/home/signin.html":h.tokenServiceUrl.replace(r._rePortalTokenSvc,"")+"/home/signin.html").replace(/http:/i,"https:"),v&&!1===v.useSSL&&(_=_.replace(/https:/i,"http:")),void(0===g.toLowerCase().replace("https","http").indexOf(_.toLowerCase().replace("https","http"))?(c=new a("identity-manager:unexpected-error","Cannot redirect to Sign-In page from within Sign-In page. URL of the resource that triggered this workflow: "+e.resUrl_),n(c)):(r._rejectOnPersistedPageShow=!0,r._redirectFunc?r._redirectFunc({signInPage:_,returnUrlParamName:"returnUrl",returnUrl:g,resourceUrl:e.resUrl_,serverInfo:h}):window.location.href=_+"?returnUrl="+encodeURIComponent(g)))}c=new a("identity-manager:not-authenticated","User is not signed in."),n(c)}else if(i)t(new x({userId:i,server:h.server,token:o,expires:null!=l?Number(l):null,ssl:!!s}));else if(p){var m=p._oAuthCred;if(!m){var w=new S(p,window.localStorage),y=new S(p,window.sessionStorage);w.isValid()&&y.isValid()?w.expires>y.expires?(m=w,y.destroy()):(m=y,w.destroy()):m=w.isValid()?w:y,p._oAuthCred=m}if(m.isValid())u=new x({userId:m.userId,server:h.server,token:m.token,expires:m.expires,ssl:m.ssl,_oAuthCred:m}),p.appId!==m.appId&&r._doPortalSignIn(e.resUrl_,!0)?e._pendingDfd=r._exchangeToken(u.server,p.appId,u.token).then((function(e){u.token=e,m.token=e,m.save(),t(u)})).catch((function(){t(u)})):t(u);else if(r._oAuthHash&&r._oAuthHash.state.portalUrl===p.portalUrl){var I=r._oAuthHash;u=new x({userId:I.username,server:h.server,token:I.access_token,expires:Date.now()+1e3*Number(I.expires_in),ssl:"true"===I.ssl,oAuthState:I.state,_oAuthCred:m}),m.storage=I.persist?window.localStorage:window.sessionStorage,m.token=u.token,m.expires=u.expires,m.userId=u.userId,m.ssl=u.ssl,m.save(),r._oAuthHash=null,t(u)}else d?e._pendingDfd=r.oAuthSignIn(e.resUrl_,h,p,e.options_).then(t,n):(c=new a("identity-manager:not-authenticated","User is not signed in."),n(c))}else if(d){if(r._checkProtocol(e.resUrl_,h,n,e.admin_)){var k=e.options_;e.admin_&&((k=k||{}).isAdmin=!0),e._pendingDfd=r.signIn(e.resUrl_,h,k).then(t,n)}}else c=new a("identity-manager:not-authenticated","User is not signed in."),n(c)},s=function(){var i,s,o,a,l=e.sinfo_,u=l.owningSystemUrl,c=e.options_;if(c&&(i=c.token,s=c.error,o=c.prompt),!(a=r._findCredential(u,{token:i,resource:e.resUrl_})))for(var h=0,d=r.credentials;h<d.length;h++){var p=d[h];if(r._isIdProvider(u,p.server)){a=p;break}}if(a){var f=r.findCredential(e.resUrl_,a.userId);if(f)t(f);else if(A(l,r._legacyFed)){(p=a.toJSON()).server=l.server,p.resources=null,t(new x(p))}else{(e._pendingDfd=r.generateToken(r.findServerInfo(a.server),null,{serverUrl:e.resUrl_,token:a.token,signal:e.options_.signal,ssl:a.ssl})).then((function(r){t(new x({userId:a.userId,server:l.server,token:r.token,expires:null!=r.expires?Number(r.expires):null,ssl:!!r.ssl,isAdmin:e.admin_,validity:r.validity}))}),n)}}else{r._busy=null,i&&(e.options_.token=null),(e._pendingDfd=r.getCredential(u.replace(/\/?$/,"/sharing"),{resource:e.resUrl_,owningTenant:l.owningTenant,signal:e.options_.signal,token:i,error:s,prompt:o})).then((function(){r._enqueue(e.resUrl_,e.sinfo_,e.options_,e,e.admin_)}),(function(e){n(e)}))}};this._errbackFunc=n;var o=e.sinfo_.owningSystemUrl,l=this._isServerRsrc(e.resUrl_),u=e.sinfo_._restInfoPms;u?u.promise.then((function(t){var n=e.sinfo_;if(n._restInfoPms){n.adminTokenServiceUrl=n._restInfoPms.adminUrl,n._restInfoPms=null,n.tokenServiceUrl=h.getDeepValue("authInfo.tokenServicesUrl",t)||h.getDeepValue("authInfo.tokenServiceUrl",t)||h.getDeepValue("tokenServiceUrl",t),n.shortLivedTokenValidity=h.getDeepValue("authInfo.shortLivedTokenValidity",t),n.currentVersion=t.currentVersion,n.owningTenant=t.owningTenant;var o=n.owningSystemUrl=t.owningSystemUrl;o&&r._portals.push(o)}l&&n.owningSystemUrl?s():i()}),(function(){e.sinfo_._restInfoPms=null;var r=new a("identity-manager:server-identification-failed","Unknown resource - could not find token service endpoint.");n(r)})):l&&o?s():e.sinfo_._selfReq?e.sinfo_._selfReq.selfDfd.then((function(t){var n,i,s,o,a={};return t&&(n=t.user&&t.user.username,a.username=n,a.allSSL=t.allSSL,i=t.supportsOAuth,s=t.currentVersion,"multitenant"===t.portalMode&&(o=t.customBaseUrl)),e.sinfo_.webTierAuth=!!n,n&&r.normalizeWebTierAuth?r.generateToken(e.sinfo_,null,{ssl:a.allSSL}).catch((function(){return null})).then((function(e){return a.portalToken=e&&e.token,a.tokenExpiration=e&&e.expires,a})):!n&&i&&parseFloat(s)>=4.4&&!r._canUsePortalSignInWorkflow(e.resUrl_)?r._generateOAuthInfo({portalUrl:e.sinfo_.server,customBaseUrl:o,owningTenant:e.sinfo_._selfReq.owningTenant}).catch((function(){return null})).then((function(){return a})):a})).catch((function(){return null})).then((function(r){e.sinfo_._selfReq=null,r?i(r.username,r.allSSL,r.portalToken,r.tokenExpiration):i()})):i()},r.prototype._generateOAuthInfo=function(e){var r,t,n=this,i=e.portalUrl,o=e.customBaseUrl,a=e.owningTenant,l=!this.defaultOAuthInfo&&this._createDefaultOAuthInfo&&!this._hasTestedIfAppIsOnPortal;if(l){var u=(t=window.location.href).indexOf("?");u>-1&&(t=t.slice(0,u)),u=t.search(/\/(apps|home)\//),t=u>-1?t.slice(0,u):null}return l&&t?(this._hasTestedIfAppIsOnPortal=!0,r=s(t+"/sharing/rest",{query:{f:"json"}}).then((function(){n.defaultOAuthInfo=new w({appId:"arcgisonline",popup:!0,popupCallbackUrl:t+"/home/oauth-callback.html"})}))):r=d.resolve(),r.then((function(){if(n.defaultOAuthInfo)return i=i.replace(/^http:/i,"https:"),s(i+"/sharing/rest/oauth2/validateRedirectUri",{query:{accountId:a,client_id:n.defaultOAuthInfo.appId,redirect_uri:f.makeAbsolute(n.defaultOAuthInfo.popupCallbackUrl),f:"json"}}).then((function(e){if(e.data.valid){var r=n.defaultOAuthInfo.clone();e.data.urlKey&&o?r.portalUrl="https://"+e.data.urlKey.toLowerCase()+"."+o:r.portalUrl=i,n.oAuthInfos.push(r)}}))}))},r.prototype._doOAuthSignIn=function(e,r,t){var n=this,i={portalUrl:t.portalUrl};!t.popup&&t.preserveUrlHash&&window.location.hash&&(i.hash=window.location.hash);var s={client_id:t.appId,response_type:"token",state:JSON.stringify(i),expiration:t.expiration,locale:t.locale,redirect_uri:t.popup?f.makeAbsolute(t.popupCallbackUrl):window.location.href.replace(/#.*$/,"")};t.forceLogin&&(s.force_login=!0);var o=t.portalUrl.replace(/^http:/i,"https:")+"/sharing/oauth2/authorize",l=o+"?"+f.objectToQuery(s);if(t.popup){var u=window.open(l,"esriJSAPIOAuth",t.popupWindowFeatures);if(u)u.focus(),this._oAuthDfd.oAuthWin_=u,this._oAuthIntervalId=setInterval((function(){if(u.closed){clearInterval(n._oAuthIntervalId);var e=n._oAuthDfd;if(e){var r=new a("identity-manager:user-aborted","ABORTED");e.reject(r)}}}),500);else{var c=new a("identity-manager:popup-blocked","ABORTED");this._oAuthDfd.reject(c)}}else this._rejectOnPersistedPageShow=!0,this._oAuthRedirectFunc?this._oAuthRedirectFunc({authorizeParams:s,authorizeUrl:o,resourceUrl:e,serverInfo:r,oAuthInfo:t}):window.location.href=l},r=t.__decorate([_.subclass("esri.identity.IdentityManagerBase")],r)}(l);r.IdentityManagerBase=U;var x=function(e){function r(r){var t=e.call(this,r)||this;return t._oAuthCred=null,t.tokenRefreshBuffer=2,r&&r._oAuthCred&&(t._oAuthCred=r._oAuthCred),t}return t.__extends(r,e),r.prototype.initialize=function(){this.resources=this.resources||[],null==this.creationTime&&(this.creationTime=Date.now())},r.prototype.refreshToken=function(){var e,r,t=this,n=i.id.findServerInfo(this.server),s=n&&n.owningSystemUrl,o=!!s&&"server"===this.scope,a=o&&A(n,i.id._legacyFed),l=n.webTierAuth,u=l&&i.id.normalizeWebTierAuth,c=I[this.server],h=c&&c[this.userId],d=this.resources&&this.resources[0],p=o&&i.id.findServerInfo(s),f={username:this.userId,password:h};if((!l||u)&&(o&&!p&&i.id.serverInfos.some((function(e){return i.id._isIdProvider(s,e.server)&&(p=e),!!p})),e=p&&i.id.findCredential(p.server,this.userId),!o||e)){if(!a){if(o)r={serverUrl:d,token:e&&e.token,ssl:e&&e.ssl};else if(u)f=null,r={ssl:this.ssl};else{if(!h){var v=void 0;return d&&(d=i.id._sanitizeUrl(d),this._enqueued=1,(v=i.id._enqueue(d,n,null,null,this.isAdmin,this)).then((function(){t._enqueued=0,t.refreshServerTokens()})).catch((function(){t._enqueued=0}))),v}this.isAdmin&&(r={isAdmin:!0})}return i.id.generateToken(o?p:n,o?null:f,r).then((function(e){t.token=e.token,t.expires=null!=e.expires?Number(e.expires):null,t.creationTime=Date.now(),t.validity=e.validity,t.emitTokenChange(),t.refreshServerTokens()})).catch((function(){}))}e.refreshToken()}},r.prototype.refreshServerTokens=function(){var e=this;"portal"===this.scope&&i.id.credentials.forEach((function(r){var t=i.id.findServerInfo(r.server),n=t&&t.owningSystemUrl;r!==e&&r.userId===e.userId&&n&&"server"===r.scope&&(i.id._hasSameServerInstance(e.server,n)||i.id._isIdProvider(n,e.server))&&(A(t,i.id._legacyFed)?(r.token=e.token,r.expires=e.expires,r.creationTime=e.creationTime,r.validity=e.validity,r.emitTokenChange()):r.refreshToken())}))},r.prototype.emitTokenChange=function(e){clearTimeout(this._refreshTimer);var r=this.server&&i.id.findServerInfo(this.server),t=r&&r.owningSystemUrl,n=t&&i.id.findServerInfo(t);!1===e||t&&"portal"!==this.scope&&(!n||!n.webTierAuth||i.id.normalizeWebTierAuth)||null==this.expires&&null==this.validity||this._startRefreshTimer(),this.emit("token-change")},r.prototype.destroy=function(){this.userId=this.server=this.token=this.expires=this.validity=this.resources=this.creationTime=null,this._oAuthCred&&(this._oAuthCred.destroy(),this._oAuthCred=null);var e=i.id.credentials.indexOf(this);e>-1&&i.id.credentials.splice(e,1),this.emitTokenChange(),this.emit("destroy")},r.prototype.toJSON=function(){var e=c.fixJson({userId:this.userId,server:this.server,token:this.token,expires:this.expires,validity:this.validity,ssl:this.ssl,isAdmin:this.isAdmin,creationTime:this.creationTime,scope:this.scope}),r=this.resources;return r&&r.length>0&&(e.resources=r.slice()),e},r.prototype._startRefreshTimer=function(){clearTimeout(this._refreshTimer);var e=6e4*this.tokenRefreshBuffer,r=(this.validity?this.creationTime+6e4*this.validity:this.expires)-Date.now();r<0&&(r=0),this._refreshTimer=setTimeout(this.refreshToken.bind(this),r>e?r-e:r)},t.__decorate([_.property()],r.prototype,"creationTime",void 0),t.__decorate([_.property()],r.prototype,"expires",void 0),t.__decorate([_.property()],r.prototype,"isAdmin",void 0),t.__decorate([_.property()],r.prototype,"oAuthState",void 0),t.__decorate([_.property()],r.prototype,"resources",void 0),t.__decorate([_.property()],r.prototype,"scope",void 0),t.__decorate([_.property()],r.prototype,"server",void 0),t.__decorate([_.property()],r.prototype,"ssl",void 0),t.__decorate([_.property()],r.prototype,"token",void 0),t.__decorate([_.property()],r.prototype,"tokenRefreshBuffer",void 0),t.__decorate([_.property()],r.prototype,"userId",void 0),t.__decorate([_.property()],r.prototype,"validity",void 0),r=t.__decorate([_.subclass("esri.identity.Credential")],r)}(l.EventedAccessor);r.Credential=x}));