;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);(function(e){e.jResize=function(t){e.jResize.defaults={viewPortSizes:["320px","480px","540px","600px","768px","960px","1024px","1280px"],backgroundColor:"444",fontColor:"FFF"};t=e.extend({},e.jResize.defaults,t);var n='<div class="viewports" style="position:fixed;top:0;left:0;right:0;overflow:auto;z-index:9999;background:#'+t.backgroundColor+";color:#"+t.fontColor+';box-shadow:0 0 3px #222;"><ul class="viewlist"></ul><div style="clear:both;"></div></div>';var r=t.viewPortSizes;var i="display:inline-block;cursor:pointer;font-size:12px;line-height:12px;text-align:center;width:6%;border-right:1px solid #555;padding:13px 5px;";var s='<div style="float:right;padding:13px 25px;font-size:12px;line-height:12px;">jResize Plugin by <a href="http://toddmotto.com" style="color:#'+t.fontColor+';text-decoration:underline;">Todd Motto</a></div>';e("body").wrapInner('<div id="resizer" />');e("#resizer").before(n);e.each(r,function(t,n){e(".viewlist").append(e('<li class="'+n+'"'+' style="'+i+'">'+n+"</li>"));e("."+n+"").click(function(){e("#resizer").animate({width:""+n+""},300)})});e(".viewlist").prepend('<li class="reset" style="'+i+'">Reset</li>',s);var o=e(".viewlist").outerHeight();e(".viewports").hide().slideDown("300");e("#resizer").css({margin:"0 auto"}).animate({marginTop:o});e(".reset").click(function(){e("#resizer").css({width:"auto"})})}})(jQuery);
function calculateIframeHeight()
{
	if($('#temisnet-bar').css('display')=='block')
		$('#preview-window').height($(window).height()-$('#temisnet-bar').height());
	else $('#preview-window').height($(window).height());
}
function showItemsList(show)
{
	var selected=getSelectedMarketplace();
	$('.temisnet-bar-items').css('display','none');
	if(show) 
	{
		$('#temisnet-bar-item-label').addClass('selected').html('<span>Please select</span>');
		$('#temisnet-bar-items-'+selected).fadeIn(200);
		var tId=window.location.href.split('/');
		var id=parseInt(tId[tId.length-1]);
		$('#temisnet-bar-items-'+selected).scrollTo('#item-'+id,200);
		$('#item-'+id+'>a').addClass('selected');
	}
	else $('#temisnet-bar-item-label').removeClass('selected');
}
function getSelectedMarketplace()
{
	var temp=$('.temisnet-bar-marketplace-select-list li a.selected').attr('id').split('-');
	return(temp[temp.length-1]);		
}
function isVisibleItemsList()
{
	var visible=false;
	$('.temisnet-bar-items').each(function() 
	{
		if(($(this).css('display')=='block') && (!visible)) visible=true;
	});
	return(visible);
}
function resize(width,height)
{
	if(width!='100%') width=parseInt(width)+(20*verticalScrollbarEnable);
	$('#preview-window-wrapper').animate({width:width},{duration:500,complete:function() 
	{
	}});
}
$(window).load(function() 
{
	calculateIframeHeight();
});    
$(document).ready(function() 
{
	$(window).resize(function() 
	{
		calculateIframeHeight();
	});
	$('.temisnet-bar-responsive-dimension-list li a').bind('click',function(e) 
	{
		e.preventDefault();		
		$('.temisnet-bar-responsive-dimension-list li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		var dimension=['100%','100%'];
		var className=$(this).parent('li').attr('class').split(' ');
		for(var i in className)
		{
			if(className[i].indexOf('temisnet-bar-responsive-dimension-list-item-')>=0)
			{
				var t=className[i].split('-');
				dimension=t[t.length-1].split('x')
				break;
			}
		}
		if(dimension[0]=='desktop') dimension=['100%','100%'];
		resize(dimension[0],dimension[1]);
	});
	$('body').bind('click',function(event)
	{
		if($(event.target).attr('id')=='temisnet-bar') showItemsList(false);
	});
	$('#temisnet-bar-item-label').bind('click',function(event) 
	{
		event.preventDefault();
		showItemsList(!isVisibleItemsList());
	});
	$('.temisnet-bar-marketplace-select-list li a').bind('click',function(event) 
	{
		event.preventDefault();
		$('.temisnet-bar-marketplace-select-list li a').removeClass('selected');
		$(this).addClass('selected');
		showItemsList(true);
	});	
	calculateIframeHeight();
	$('#temisnet-bar-marketplace-select-button-'+itemMarketplace).addClass('selected');
	$('.temisnet-bar-responsive-dimension-list-item-desktop').addClass('selected');
});