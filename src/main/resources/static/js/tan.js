// JavaScript Document

$(".list-find-resource-conB table tbody tr").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(".list-find-resource-conB table tbody tr").removeClass("current");	
	})
	
	$(".table1 table tbody tr").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(".table1 table tbody tr").removeClass("current");	
	})	
	
$(function(){
	var eleWidth=$(document).width();
	var eleHeight=$(document).height();
	var winHeight=$(window).height();
	var boxWW=$(".bookingBox").width();
	var boxHH=$(".bookingBox").height();
	var boxLL=(eleWidth-boxWW)/2;
	var boxTT=(winHeight-boxHH)/2;
	//$(".bookingBox").css("left",parseInt(boxLL));
	$(".bookingBox").css("top",parseInt(boxTT));
	$(".bookingCon").click(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBlackBg,.bookingBox").fadeIn();	
		$(".bookingBox").css("top",parseInt(boxTT+boxScroll));
	})
	$(".bookingTit span").click(function(){
		$(".bookingBlackBg,.bookingBox").fadeOut();	
	})
	$(window).scroll(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBox").css("top",parseInt(boxTT+boxScroll));	
	})
	
})



// 完善弹框


$(function(){
	var eleWidth=$(document).width();
	var eleHeight=$(document).height();
	var winHeight=$(window).height();
	var boxWW=$(".bookingBoxWanshan").width();
	var boxHH=$(".bookingBoxWanshan").height();
	var boxLL=(eleWidth-boxWW)/2;
	var boxTT=(winHeight-boxHH)/2;
	$(".bookingBoxWanshan").css("left",parseInt(boxLL));
	$(".bookingBoxWanshan").css("top",parseInt(boxTT));
	$(".bookingConWanshan").click(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBlackBg,.bookingBoxWanshan").fadeIn();	
		$(".bookingBoxWanshan").css("top",parseInt(boxTT+boxScroll));
	})
	$(".bookingTit span,.wanshanbt2").click(function(){
		$(".bookingBoxWanshan").fadeOut();	
	})
	$(window).scroll(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBoxWanshan").css("top",parseInt(boxTT+boxScroll));	
	})
	
})
// 完善下一步
$(function(){
	var eleWidth=$(document).width();
	var eleHeight=$(document).height();
	var winHeight=$(window).height();
	var boxWW=$(".bookingBoxWsnext").width();
	var boxHH=$(".bookingBoxWsnext").height();
	var boxLL=(eleWidth-boxWW)/2;
	var boxTT=(winHeight-boxHH)/2;
	$(".bookingBoxWsnext").css("left",parseInt(boxLL));
	$(".bookingBoxWsnext").css("top",parseInt(boxTT));
	$(".wanshanbt1").click(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBlackBg,.bookingBoxWsnext").fadeIn();	
		$(".bookingBoxWsnext").css("top",parseInt(boxTT+boxScroll));
		$(".bookingBoxWanshan").fadeOut();
		$(".bookingBox").fadeOut();
	})
	
	$(".wsnextbt1").click(function(){
		$(".bookingBoxWsnext").fadeOut();
		$(".bookingBlackBg").fadeOut("fast");
	})
	$(".bookingTit span,.wsnextbt2").click(function(){
		$(".bookingBoxWsnext").fadeOut();	
	})
	$(window).scroll(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBoxWsnext").css("top",parseInt(boxTT+boxScroll));	
	})
	
})

// 取消订单弹框
$(function(){
	var eleWidth=$(document).width();
	var eleHeight=$(document).height();
	var winHeight=$(window).height();
	var boxWW=$(".bookingBoxQuxiao").width();
	var boxHH=$(".bookingBoxQuxiao").height();
	var boxLL=(eleWidth-boxWW)/2;
	var boxTT=(winHeight-boxHH)/2;
	$(".bookingBoxQuxiao").css("left",parseInt(boxLL));
	$(".bookingBoxQuxiao").css("top",parseInt(boxTT));
	$(".quxiaobut").click(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBlackBg,.bookingBoxQuxiao").fadeIn();	
		$(".bookingBoxQuxiao").css("top",parseInt(boxTT+boxScroll));
	})
	$(".bookingTit span,.qxnextbt2").click(function(){
		$(".bookingBoxQuxiao").fadeOut();	
	})
	$(".qxnextbt1").click(function(){
		$(".bookingBlackBg,.bookingBox,.bookingBoxQuxiao").fadeOut();	
	})
	$(window).scroll(function(){
		var boxScroll=$(document).scrollTop();
		$(".bookingBoxQuxiao").css("top",parseInt(boxTT+boxScroll));	
	})
	
})

