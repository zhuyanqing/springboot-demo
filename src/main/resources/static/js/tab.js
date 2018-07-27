// JavaScript Document
/*2014-11-21首页切换li数量不定*/
function comTab1(tabTit,tabName){
	
	$(tabTit).click(function(){
		$(this).addClass(tabName).siblings().removeClass(tabName);
		var index=$(this).index();
		$(this).parent().parent().siblings().children().eq(index).show().siblings().hide();
	})		
}
function comTab2(tabTit,tabName){
	$(tabTit).hover(function(){
		$(this).addClass(tabName).siblings().removeClass(tabName);
		var index=$(this).index();
		$(this).parent().siblings().children().eq(index).show().siblings().hide();
	})		
}
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
	
	comTab1(".title1 ul li","newHover");//供应切换	
	comTab1(".t1017-ind-tab-tit h2","on");//公告切换
	comTab2(".t1007-ind-buytab-tit h2 ","tabin");//公告切换
		//首页banner	
	
})


