(function(){var f=this;function k(a,c,b){return a.call.apply(a.bind,arguments)}function l(a,c,b){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(b,e);return a.apply(c,b)}}return function(){return a.apply(c,arguments)}}function m(a,c,b){m=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?k:l;return m.apply(null,arguments)};var q=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function r(a,c){return a<c?-1:a>c?1:0}function t(a){var c=Number(a);return 0==c&&/^[\s\xa0]*$/.test(a)?NaN:c};var u;a:{var v=f.navigator;if(v){var w=v.userAgent;if(w){u=w;break a}}u=""};var x=-1!=u.indexOf("Opera")||-1!=u.indexOf("OPR"),y=-1!=u.indexOf("Trident")||-1!=u.indexOf("MSIE"),z=-1!=u.indexOf("Edge"),A=-1!=u.indexOf("Gecko")&&!(-1!=u.toLowerCase().indexOf("webkit")&&-1==u.indexOf("Edge"))&&!(-1!=u.indexOf("Trident")||-1!=u.indexOf("MSIE"))&&-1==u.indexOf("Edge"),B=-1!=u.toLowerCase().indexOf("webkit")&&-1==u.indexOf("Edge");
function C(){var a=u;if(A)return/rv\:([^\);]+)(\)|;)/.exec(a);if(z)return/Edge\/([\d\.]+)/.exec(a);if(y)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(B)return/WebKit\/(\S+)/.exec(a)}function D(){var a=f.document;return a?a.documentMode:void 0}var E=function(){if(x&&f.opera){var a;var c=f.opera.version;try{a=c()}catch(b){a=c}return a}a="";(c=C())&&(a=c?c[1]:"");return y&&(c=D(),null!=c&&c>parseFloat(a))?String(c):a}(),F={};
function G(a){if(!F[a]){for(var c=0,b=q(String(E)).split("."),e=q(String(a)).split("."),d=Math.max(b.length,e.length),g=0;0==c&&g<d;g++){var h=b[g]||"",Q=e[g]||"",R=RegExp("(\\d*)(\\D*)","g"),S=RegExp("(\\d*)(\\D*)","g");do{var n=R.exec(h)||["","",""],p=S.exec(Q)||["","",""];if(0==n[0].length&&0==p[0].length)break;c=r(0==n[1].length?0:parseInt(n[1],10),0==p[1].length?0:parseInt(p[1],10))||r(0==n[2].length,0==p[2].length)||r(n[2],p[2])}while(0==c)}F[a]=0<=c}}
var H=f.document,I=H&&y?D()||("CSS1Compat"==H.compatMode?parseInt(E,10):5):void 0;var J;if(!(J=!A&&!y)){var K;if(K=y)K=9<=Number(I);J=K}J||A&&G("1.9.1");y&&G("9");function L(a){return window.matchMedia("(-webkit-min-device-pixel-ratio: "+a+"),(min--moz-device-pixel-ratio: "+a+"),(min-resolution: "+a+"dppx)").matches?a:0};function M(a,c){this.a=a;this.b=c}function N(a){this.c=a;this.b=0;this.a=[]}function O(){this.a=[]}function P(a,c){var b=new Image;b.onload=function(){a.src=c};b.src=c}
O.prototype.b=function(){var a;a=document.documentElement.clientWidth/window.innerWidth;var c=window;a=(void 0!==c.devicePixelRatio?c.devicePixelRatio:c.matchMedia?L(.75)||L(1.5)||L(2)||L(3)||1:1)*a;for(var c=this.a.length,b=0;b<c;++b){var e=this.a[b],d=a;if(d>e.b)for(var g=e.a.length,h=0;h<g;++h)if(d<=e.a[h].a){e.b=e.a[h].a;P(e.c,e.a[h].b);break}}};function T(a,c){var b=a.search(c);return-1==b?a.length:b}var U=/[ \t\n\f\r]/,V=/[^ \t\n\f\r]/,W=/[ \t\n\f\r,]/,X=/[^ \t\n\f\r,]/;
function Y(a,c,b){a=new N(a);var e=!1,d=T(b,X);for(b=b.slice(d);0<b.length;){var d=T(b,U),g=b.slice(0,d);b=b.slice(d);if(","==g[g.length-1])return null;d=T(b,V);b=b.slice(d);var d=T(b,W),h=b.slice(0,d);b=b.slice(d);if(1<h.length&&"x"==h[h.length-1]){d=t(h.slice(0,-1));if(isNaN(d))return null;a.a.push(new M(d,g));1==d&&(e=!0)}else return null;d=T(b,V);b=b.slice(d);if(0<b.length&&","!=b[0])return null;b=b.slice(1);d=T(b,X);b=b.slice(d)}!e&&c&&a.a.push(new M(1,c));a.a.sort(function(a,b){return a.a-b.a});
return a}(function(){for(var a=new O,c=document.getElementsByTagName("IMG"),b=0,e;e=c[b];++b){var d=e.getAttribute("src"),g=e.getAttribute("srcset");g&&(e=Y(e,d,g),null!=e&&a.a.push(e))}window.addEventListener("resize",m(a.b,a));window.addEventListener("touchmove",m(function(a){1<a.touches.length&&this.b()},a));a.b()})();})();