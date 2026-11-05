/* motion engine · vanilla */
(function(){
var d=document,h=d.documentElement,W=window,mq=function(q){return W.matchMedia(q).matches};
var top=d.querySelector('.top');
function setTop(){if(top)h.style.setProperty('--top-h',top.offsetHeight+'px')}
setTop();if(W.ResizeObserver&&top)new ResizeObserver(setTop).observe(top);
var mb=d.querySelector('.burger'),menu=d.getElementById('menu');
function shut(){mb.setAttribute('aria-expanded','false');h.classList.remove('menu-open')}
if(mb&&menu){
 mb.addEventListener('click',function(){var o=mb.getAttribute('aria-expanded')!=='true';mb.setAttribute('aria-expanded',String(o));h.classList.toggle('menu-open',o)});
 menu.addEventListener('click',function(e){if(e.target.closest('a'))shut()});
 d.addEventListener('keydown',function(e){if(e.key==='Escape'&&h.classList.contains('menu-open')){shut();mb.focus()}});
}
[].forEach.call(d.querySelectorAll('[data-map]'),function(b){b.addEventListener('click',function(){
 var box=b.closest('.map'),f=d.createElement('iframe');f.src=b.getAttribute('data-map');f.title=b.getAttribute('data-title')||'Карта';
 f.setAttribute('allowfullscreen','');f.setAttribute('loading','lazy');box.textContent='';box.appendChild(f);box.classList.add('map-on');f.focus()})});
if(!h.classList.contains('m-on'))return;
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
[].forEach.call(d.querySelectorAll('[data-split]'),function(el){
 var t=el.textContent.trim().replace(/\s+/g,' '),st=el.tagName==='H1'?70:60;
 el.innerHTML='<span class="sr">'+esc(t)+'</span><span aria-hidden="true">'+t.split(' ').map(function(w,i){return '<span class="w"><span class="wi" style="--d:'+i*st+'ms">'+esc(w)+'</span></span>'}).join(' ')+'</span>';
 el.setAttribute('data-rv','words')});
[].forEach.call(d.querySelectorAll('[data-stagger]'),function(p){var i=0;[].forEach.call(p.children,function(c){if(c.hasAttribute('data-rv'))c.style.setProperty('--i',i++)})});
var lit=d.querySelector('[data-lit]'),lw=[];
if(lit){var lt=lit.textContent.trim().replace(/\s+/g,' ');lit.innerHTML='<span class="sr">'+esc(lt)+'</span><span aria-hidden="true">'+lt.split(' ').map(function(w){return '<span class="lw">'+esc(w)+'</span>'}).join(' ')+'</span>';lw=lit.querySelectorAll('.lw')}
function done(el){if(!el.classList.contains('done'))el.classList.add('done')}
function show(el){if(el.classList.contains('in'))return;el.classList.add('in');var k=el.getAttribute('data-rv');
 if(k==='cur'||k==='circ'){el.addEventListener('transitionend',function f(e){if(e.target===el||e.target.tagName==='IMG'){setTimeout(function(){done(el)},300);el.removeEventListener('transitionend',f)}});setTimeout(function(){done(el)},1700)}}
var all=[].slice.call(d.querySelectorAll('[data-rv]'));
[].forEach.call(d.querySelectorAll('[data-anim]'),function(el){el.addEventListener('animationend',function(e){if(e.target===el)el.classList.add('done')})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
all.forEach(function(el){io.observe(el)});
function sweep(){var H=W.innerHeight;for(var i=0;i<all.length;i++){var el=all[i];if(el.classList.contains('in'))continue;var r=el.getBoundingClientRect();if(r.top<H&&(r.width||r.height))show(el)}}
var melt=d.querySelector('[data-melt]'),lane=d.querySelector('[data-lane]'),fin=d.querySelector('[data-final]'),pan=d.querySelector('[data-pan]'),tick=0;
function cl(v){return v<0?0:v>1?1:v}
function laneSet(){if(!lane)return;var tr=lane.querySelector('.lane-track');if(!mq('(min-width:900px)')){lane.style.removeProperty('--D');tr.style.translate='';return}
 var travel=Math.max(0,tr.scrollWidth-tr.parentNode.clientWidth),D=Math.min(travel,1.3*W.innerHeight);lane._t=travel;lane._D=D;lane.style.setProperty('--D',D+'px')}
function frame(){tick=0;var H=W.innerHeight;sweep();
 if(melt&&!mq('(prefers-reduced-motion: reduce)')){var p=cl(W.scrollY/(H*.75));melt.style.opacity=String(1-p*.92);melt.style.filter=p>0?'blur('+(14*p).toFixed(1)+'px)':'';melt.style.translate='0 '+(-40*p).toFixed(1)+'px'}
 if(lane&&lane._D){var r=lane.getBoundingClientRect(),q=cl(-(r.top-(parseFloat(getComputedStyle(h).getPropertyValue('--top-h'))||0))/lane._D);lane.querySelector('.lane-track').style.translate=(-q*lane._t).toFixed(1)+'px 0';var pl=lane.querySelector('.lane-prog i');if(pl)pl.style.scale=q.toFixed(3)+' 1'}
 if(fin){var t=fin.getBoundingClientRect().top,f=cl((H-t)/(H*.6));fin.style.setProperty('--fx',(48*(1-f)).toFixed(1)+'px')}
 if(pan&&mq('(min-width:600px)')){var pr=cl(W.scrollY/H);pan.style.backgroundPosition='50% '+(30+40*pr).toFixed(1)+'%'}
 if(lw.length){var lr=lit.getBoundingClientRect(),lp=cl((H*.9-lr.top)/(H*.55)),n=Math.round(lp*lw.length);for(var j=0;j<lw.length;j++)lw[j].classList.toggle('on',j<n)}
}
function req(){if(!tick){tick=1;requestAnimationFrame(frame)}}
W.addEventListener('scroll',req,{passive:true});
W.addEventListener('resize',function(){laneSet();req()});
W.addEventListener('hashchange',function(){setTimeout(sweep,60)});
W.addEventListener('load',function(){laneSet();req()});
W.addEventListener('beforeprint',function(){all.forEach(show);all.forEach(done)});
laneSet();frame();
h.classList.add('m-ready');
})();
