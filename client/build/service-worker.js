"use strict";var precacheConfig=[["/index.html","8e5996d65177587272047fb6c189c831"],["/static/css/main.a5dd6a62.css","a0e7eff407a2c194899a7b4517b177da"],["/static/js/main.ab45f71a.js","7fce64d12814baa1c8c52f7c25be1cc0"],["/static/media/27484484_10210656234910058_887463295_o.4c7dec19.jpg","4c7dec19e2d54c280c56b83dc5c2976a"],["/static/media/Bag_of_Coins.92fd7e37.png","92fd7e3786e7a83916988d4668781591"],["/static/media/coin.45524edd.png","45524eddf035dfdd779d69e3969683f9"],["/static/media/correct.facd6e84.mp3","facd6e8493eb4a3defc44a177437f13f"],["/static/media/dolores.6e5e925d.jpg","6e5e925d9f505691aecaabaa62b9bcca"],["/static/media/garfield.b336d9ca.png","b336d9ca48b52bedc8b5e7d3bf602edc"],["/static/media/harrypotter.4ba9e144.jpg","4ba9e144ba2bf79ad7a524be4b2d5136"],["/static/media/hermione.69699270.jpg","6969927016da50ade334406c84e601ec"],["/static/media/mickey.2e3e715f.jpeg","2e3e715f54f9e2117e0d1757d25543cf"],["/static/media/raja.9e5b203a.jpg","9e5b203a56bffa22ea762780b1b131a8"],["/static/media/ron.bd53ed6d.jpg","bd53ed6d97f9361bd0d2f9912ac811cf"],["/static/media/snape.7296459e.jpg","7296459ee2013e9b334524af3f40997f"],["/static/media/wrong.77574997.mp3","77574997de70211f8cfecd3989b935e9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));var r="/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});