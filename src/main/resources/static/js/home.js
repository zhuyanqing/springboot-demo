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
	//我的采购清单加减
	$(".btn_jian").click(function() {
        var i = parseInt($(this).next(".text_input").val());
        var min = parseInt($(this).next(".text_input").attr("min"));
        if (i > min) {
            i--;
            $(this).next(".text_input").val(i);
        }
    })
    $(".btn_jia").click(function() {
        var i = parseInt($(this).prev(".text_input").val());
        var max = parseInt($(this).prev(".text_input").attr("max"));
        if (i < max) {
            i++;
            $(this).prev(".text_input").val(i);
        }
    })
	//我的采购清单加减里的删除
	$(".end").click(function(){
		$(this).parent(".shoppingListCon").remove();
	});
	
	
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
		
	/*轮播*/
	function banner($bannerPic,Icon){
		var num=0;
		var timer=null;
		$("ul",$bannerPic).append($("ul li",$bannerPic).clone());
		var liNum=$("ul li",$bannerPic).length/2;
		var liW=$("ul li:eq(0)",$bannerPic).width();//一个图片的宽度
		$("ol li",$bannerPic).click(function(){
			$(this).addClass(Icon).siblings().removeClass(Icon);
			var index=$(this).index();
			$(this).parent().siblings("ul").find("li").eq(index).show().fadeTo(700,1.0).siblings().fadeTo(700,0).hide();		
			num=index;	
		})
		function palyBanner(){
			if(num>=liNum){
				$("ul li",$bannerPic).eq(num).show().fadeTo(700,1.0).siblings().fadeTo(700,0).hide();
				$("ol li",$bannerPic).eq(0).addClass(Icon).siblings().removeClass(Icon);	
				num=1;
			}else{
				$("ol li",$bannerPic).eq(num).addClass(Icon).siblings().removeClass(Icon);	
				$("ul li",$bannerPic).eq(num).show().fadeTo(700,1.0).siblings().fadeTo(700,0).hide();
				num++;	
			}
		}
		var timer=setInterval(palyBanner,3000);
		$bannerPic.hover(
			function(){
				clearInterval(timer);
			},
			function(){
				timer=setInterval(palyBanner,3000);
			}
		)			
	}
	
	banner($(".banner"),"on");
	/*小标题滚动*/
	function scrollTop(hClass){
		var setName
		$(hClass).hover(function () {
			  clearInterval(setName)
		 },function () {
				  setName=setInterval(function () {
					$(hClass+" ul").animate({marginTop:"-30px"},1000,function () {
					$(hClass+" ul").css("margin-top","0").find("li:first").appendTo(hClass+" ul")
				  })
		  },3000)
		}).trigger("mouseleave")
	}
	scrollTop(".apple-origin .apple-process-small-title");
	scrollTop(".apple-stock .apple-process-small-title");
	scrollTop(".apple-deal .apple-process-small-title");
	scrollTop(".ind-log .apple-process-small-title");
	scrollTop(".ind-storage .apple-process-small-title");
	scrollTop(".apple-process .apple-process-small-title");
	/*买家入口*/
	$(".vip-login-center-tit ul li").hover(function(){
		var liInd = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");	
		$(".vip-login-center-con div").eq(liInd).show().siblings().hide();
	})
	/*安塞苹果产业带*/
	$(".ansai").hover(function(){
		$(this).find(".ansai-tankuang span").show();
		$(this).find("p").css("color","#e80016");	
	},function(){
		$(".ansai .ansai-tankuang span").hide();
		$(".ansai p").css("color","#000");
	})
	/*走势图表*/
	$(".apple-origin-con-right-conTit ul li").hover(function(){
		var thisInd = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(this).closest(".apple-origin-con-right-con").find(".table-out").eq(thisInd).show().siblings().hide();	
	})
	$(".apple-origin-title-change ul li").hover(function(){
		var liInd = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".apple-origin-con-out").eq(liInd).show().siblings().hide();	
	})	
	/*苹果现货*/
	$(".apple-stock-left-conTop ul li").hover(function(){
		$(this).css("border-color","#e80016")
	},function(){
		$(".apple-stock-left-conTop ul li").css("border-color","#e6e6e6");
		$(".apple-stock-left-conTop ul li").removeClass("on");
	})
	$(".apple-stock-left-conTop-pic").hover(function(){
		$(this).closest("li").addClass("on").siblings().removeClass("on");	
	})
	$(".after-center ul li").unbind("hover");
	
	$(".apple-stock .apple-stock-left-title-change ul li").hover(function(){
		var _$ind = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".apple-stock-left-con-out").eq(_$ind).show().siblings().hide();
		var datePic=$(".apple-stock-left-con-out .apple-stock-left-conTop-pic img").attr("data-echo");	
		$(".apple-stock-left-con-out .apple-stock-left-conTop-pic img").attr("src",datePic);
	})
	
	/*求购*/
	$(".apple-stock-left-conBot .apple-stock-buy ul li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");	
	},function(){
		$(".apple-stock-left-conBot .apple-stock-buy ul li").removeClass("current");	
	})
	
	/*价格走势*/
	$(".apple-stock-right1-tit ul li").hover(function(){
		var _$ind = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".stock-out").eq(_$ind).show().siblings().hide();
	})
	/*苹果品牌*/
	function scrollTop1(hClass){
		var setName
		$(hClass).hover(function () {
			  clearInterval(setName)
		 },function () {
				  setName=setInterval(function () {
					$(hClass+" ul").animate({marginTop:"-60px"},3000,function () {
					$(hClass+" ul").css("margin-top","0").find("li:first").appendTo(hClass+" ul")
				  })
		  },3000)
		}).trigger("mouseleave")
	}
	scrollTop1(".apple-stock-right2-con")
	
	/*苹果农资&商品化处理*/
	
	var main1=$(".apple-deal-con-right-detail").find(".main1 ul").html();
	var main2=$(".apple-deal-con-right-detail").find(".main2 ul").html();
	var main3=$(".apple-deal-con-right-detail").find(".main3 ul").html();
	var main4=$(".apple-deal-con-right-detail").find(".main4 ul").html();
	var main5=$(".apple-deal-con-right-detail").find(".main5 ul").html();
	
	function main(main,m){
		
		$(".apple-deal-con-right-detail").find("."+main+" ul").html('');
		$(".apple-deal-con-right-detail").find("."+main+" ul").html(m);
		$(".apple-deal-con-right-detail").find("."+main+" ul").append($("."+main+" ul li").clone());
		var liNum = $(".apple-deal-con-right-detail").find("."+main+" ul li").length;
		var liW = $(".apple-deal-con-right-detail").find("."+main+" ul li").width()+17;
		$(".apple-deal-con-right-detail").find("."+main+" ul").width(liNum*liW);
	
		var num=1;
		$(".apple-deal-con-right-detail ."+main).find(".apple-deal-con-right-right").click(function(){
			var nLeft = $(".apple-deal-con-right-detail ."+main+" ul").css("left");
			var aa =parseInt(nLeft)
			
			if(aa<=-liNum/2*liW){
				num++;
				$(".apple-deal-con-right-detail ."+main+" ul").stop(true,true).animate({left:-num*liW},300,function(){
					$(".apple-deal-con-right-detail ."+main+" ul").css("left",-liW);	
				})
				num=1;	
			}else{
				num++;
				$(".apple-deal-con-right-detail ."+main+" ul").stop(true,true).animate({left:-num*liW},300)	;
			}
		})
		$(".apple-deal-con-right-detail ."+main).find(".apple-deal-con-right-left").click(function(){
			var nLeft = $(".apple-deal-con-right-detail ."+main+" ul").css("left");
			var bb =parseInt(nLeft);
			if(bb>=-liW){
				num--;	
				$(".apple-deal-con-right-detail ."+main+" ul").stop(true,true).animate({left:0},300,function(){
					$(".apple-deal-con-right-detail ."+main+" ul").css("left",-liNum/2*liW);		
				});
				num=liNum/2;
			}else{
				num--;
				$(".apple-deal-con-right-detail ."+main+" ul").stop(true,true).animate({left:-num*liW},300);	
			}	
		})
		
		$(".apple-deal-con-right-conBottom .apple-stock-buy ul li").hover(function(){
			$(this).addClass("current").siblings().removeClass("current");
			
		},function(){
			$(".apple-deal-con-right-conBottom .apple-stock-buy ul li").removeClass("current");	
		})
	
	}
	main("main1",main1);
	main("main2",main2);
	main("main3",main3);
	main("main4",main4);
	main("main5",main5);
	$(".apple-deal-con-left-change ul li").hover(function(){
		var _thisInd = $(this).index();
		var datePic=$(".apple-stock-left-conTop .apple-stock-left-conTop-pic img").attr("data-echo");	
		$(".apple-stock-left-conTop .apple-stock-left-conTop-pic img").attr("src",datePic);
		$(this).addClass("on").siblings().removeClass("on");
		$(".apple-deal-con-right-detail").eq(_thisInd).show().siblings().hide();
		
			
	})
	
	
	
	/*苹果加工*/
	$(".apple-process-title-change ul li").hover(function(){
		var liInd = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".apple-process-content .outer").eq(liInd).show().siblings().hide();	
	})	
	$(".apple-process-content-leftTop ul li").hover(function(){
		var aliInd = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(this).closest(".outer").find(".apple-process-content-right .main-table").eq(aliInd).show().siblings().hide();
		
	})
	$(".apple-process-content-right table tr td").hover(function(){
		$(this).closest("tr").css("backgroundColor","#fff3e5");	
	},function(){
		$(".apple-process-content-right table tr").css("backgroundColor","#f9f9f9");	
	})
	/*产业带物流*/
	$(".ind-log .apple-process-content-leftTop ul li").unbind("hover");
	$(".ind-log-con .apple-process-content-leftTop ul li.current dd").hover(function(){
		var dInd = $(this).index()-1;
		$(this).addClass("on").siblings().removeClass("on");
		$(this).closest(".ind-log-con").find(".apple-process-content-right .main-table").eq(dInd).show().siblings().hide();	
	})
	
	/*资讯互动*/
	$(".article-main-content1 li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");	
	})
	
	
	function inputTipText(obj,initText) {
		$("."+obj).each(function() {
				var _this = $(this);
			   if($.trim(_this.val()) == '' || $.trim(_this.val()) == initText){
				   _this.css({"color":"#999"});
			   }else{
				   _this.css({"color":"#262626"});
			   }
			_this.focus(function() {
					if ( $.trim(_this.val()) == initText) {
						_this.val('').css({"color":"#262626"});
				 }})
				.blur(function() {
				if (!_this.val() || $.trim(_this.val()) == '' || $.trim(_this.val()) ==initText) {
					_this.val(initText).css({"color":"#999"});
				}
			}).keydown(function() {
				_this.css({"color":"#262626"})
			})
		});
	} 
	 inputTipText("help-find-con textarea","写下您的真实需求，包括规格、材质等，收到后我们会立即给您回电确认，剩下的就交给我们吧。")	
	 inputTipText("search input","请输入产品名 找一手好货源");
	 inputTipText("selectProvince","请选择省市区");
	 inputTipText("selectProvince1","请选择省市区");
	 /*选择省市区*/
	 function ss(selClass){
		var inpNum=Array();
		 $("."+selClass).focus(function(){
			 var inpVal = $("."+selClass).val();
			 $("."+selClass).val('');
			 $(".zhuanghuo-main").hide();
			$(this).parent().find(".zhuanghuo-main").slideDown();
			 $(this).next(".zhuanghuo-main").find(".zhuanghuo-main-tit h4").eq(0).addClass("on").siblings().removeClass("on");
			$(this).next(".zhuanghuo-main").find(".province").show();
			
			$(this).next(".zhuanghuo-main").find(".province a").click(function(){
				var pHtml = $(this).html();
				$("."+selClass).val(pHtml);
				inpVal = pHtml;
				inpNum[0] = pHtml;
				$(this).closest(".zhuanghuo-main").find(".zhuanghuo-main-tit h4").eq(1).addClass("on").siblings().removeClass("on");	
				$(this).closest(".zhuanghuo-main-content").find(".zhuanghuo-main-detail").hide();
				$(".city").show();
			})
			$(this).next(".zhuanghuo-main").find(".city a").click(function(){
				var cHtml = $(this).html();			
				$("."+selClass).val(inpVal+cHtml);
				inpVal = inpVal+cHtml;
				inpNum[1] = cHtml;
				$(this).closest(".zhuanghuo-main").find(".zhuanghuo-main-tit h4").eq(2).addClass("on").siblings().removeClass("on");	
				$(this).closest(".zhuanghuo-main-content").find(".zhuanghuo-main-detail").hide();
				$(".area").show();
			})
			$(this).next(".zhuanghuo-main").find(".area a").click(function(){
				var aHtml = $(this).html();			
				$("."+selClass).val(inpVal+aHtml);
				inpNum[2] = aHtml;
				$(this).closest(".zhuanghuo-main").slideUp("fast");	
			})
				 
		 })
			 
	 }
	 
	 $(".zhuanghuo-main-tit div h4.close a").click(function(){
		$(this).closest(".zhuanghuo-main").slideUp("fast");	 
	 })
	 ss("selectProvince");
	 ss("selectProvince1");
	 
})

$(function () {


    //首屏focus
    $('.flexslider').flexslider({
        prevText: "&lt;",
        nextText: "&gt;",
        start: function (slider) {
            $.flexloader(slider);
        },
        after: function (slider) {
            $.flexloader(slider);
        }
    });

    //rotate
    $('.rotate').flexslider({
        animation: "slide",
        controlNav: false,
        itemWidth: 250,
        minItems: 4,
        maxItems: 4,
        prevText: "",
        nextText: "",
        animationLoop: false,
        move: 4,
        start: function (slider) {
            $.flexloader(slider);
        },
        after: function (slider) {
            $.flexloader(slider);
        }
    });


    //lazyload
    echo.init({
        offset: 100,
        throttle: 250
    });

});
