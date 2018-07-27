// JavaScript Document
$(function(){
	//head滑过出现下拉框
		$(".topMuneList").hover(function(){
			$(this).addClass("snMenuHover")
			$(this).children(".show2").show()
		},function(){
			$(this).removeClass("snMenuHover")
			$(this).children(".show2").hide()
		})		
	/*导航*/
	$(".nav-content ul li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".nav-content ul li div").hide();
		$(this).find("div").show();	
	},function(){
		$(".nav-content ul li").removeClass("current");	
		$(".nav-content ul li div").hide();
		$(".nav-content ul li.on div").show();	
	})
	$(".nav-content ul li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	})
	/*分类*/
	$(".nav-category").hover(function(){
		$(".nav-category-con-detail").slideDown();	
	},function(){
		$(".nav-category-con-detail").slideUp();	
	})

	$(".table1  table tr td.driver a").click(function(){
		$(this).closest("tr").next("tr").slideToggle();	
	})
})
