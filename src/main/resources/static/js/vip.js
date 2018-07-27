//JavaScript Document

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
	
	$(".vip-grzx-nav ul li.storage").hover(function(){
		$(this).find(".storage-secondList").stop().slideDown("fast");	
	},function(){
		$(".storage-secondList").stop().slideUp("fast");	
	})
	
	$(".storage-secondList a").click(function(){
		var thisInd = $(this).index();
		$(".qh-com .vip-con").stop().hide();
		$(".storage-need").stop().show();
		$(".storage-need .storage-need-content").eq(thisInd).show().siblings().hide();	
	})
	/*点击详情*/
	$(".vip-detail").click(function(){
		$(this).closest("tr").next("tr").show();	
	})
	/*点击刷新*/
	$(".vip-refresh").click(function(){
		$(this).next("div").show();
		$(this).next("div").delay(2000).fadeOut();	
	})
	
	
	
//点击隐藏
$(document).ready(function(){
  $(".yy").click(function(){
  $("#hide").hide();
  });
   $(".xx").click(function(){
  $("#hide").show();
  });
});

<!--切换-->
$(document).ready(function(){
  $(".vip-grzx-nav ul li").click(function(){            //鼠标放上去切换
	  $(this).addClass("on").siblings().removeClass("on"); //它自己增加类，它同辈移除类
	  var vip = $(this).index();                              //获取当前索引值 
	  $(".qh-com .vip-con").eq(vip).show().siblings().hide();//对应的显示，同辈的隐藏
	  });
	  
	  
	  

});


})

