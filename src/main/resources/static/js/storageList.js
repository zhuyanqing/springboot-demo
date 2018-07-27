
// JavaScript Document////

//    判断字符中是否包含有特殊字符：

function containSpecial( s )
{
	var containSpecial = RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	return ( containSpecial.test(s) );
}

function check(c)
{
	var r= /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
	return r.test(c);
}
$(function(){
	$(".l-down").hover(function(){
		$(".l-down div").stop().slideUp("fast");
		$(this).find("div").stop().slideDown("fast");
	},function(){
		$(".l-down div").stop().slideUp("fast");
	})
	function inputTex(obj,initText){
		$("."+obj).focus(function(){
			var _this = $(this);
			_this.val('');
			_this.css("color","#262626");		
		}).blur(function(){
			if($.trim(_this.val())==initText || $.trim(_this.val())==''){
				_this.css("color","#777");
				_this.val(initText)
			}else{
				_this.css("color","#262626");
			}
		})	
	}
	inputTex("time input",'');
	inputTex("search input","请输入产品名 找一手好货源");
	inputTex("area","请选择");
	inputTex("store-style","请选择");
	inputTex("use","请选择");
	inputTex("goods-style","请选择");
	inputTex("standard","请选择");
	inputTex("storing-purpose","选择仓储类型");
	inputTex("storing-size","选择仓储规格");
	inputTex("listPeople","请填写联系人");
	inputTex("listTel","请输入联系电话");
	inputTex("storing-area","请选择省市区");
	inputTex("storing-location","请选择省市区");
	inputTex("storing-spec","请选择仓储规格");
	inputTex("storing-goods","可填写仓库所需面积、存放时间等信息");
	inputTex("cost","面议");
	inputTex("storing-titleInp","可填写仓库所需面积");
	inputTex("storing-style","出租")
	inputTex("storing-style1","出租")
	inputTex("storing-type","请选择货物类型")
	inputTex("storing-goods","可填写存放获取等信息")
	//inputTipText("storing-goods","可填写存放获取等信息")
	
	/*点击任何地方关闭层*/
	$(document).click(function(event) {
		if ($(event.target).attr("class") != "storing-purpose" && $(event.target).attr("class") != "storing-size" && $(event.target).attr("class") != "store-style" && $(event.target).attr("class") != "use" && $(event.target).attr("class") != "standard" && $(event.target).attr("class") != "goods-style" && $(event.target).attr("class") != "storing-style" && $(event.target).attr("class") != "storing-style1" && $(event.target).attr("class") != "storing-type" && $(event.target).attr("class") != "storing-spec") {
			$(".downMenu").slideUp("fast");
		}
	});
	
	$(".storageList-supply-con-main ul li").hover(function(){
		$(this).addClass("on").siblings().removeClass("on");
	},function(){
		$(".storageList-supply-con-main ul li").removeClass("on")
	})
	
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
	 
	 ss("area");
	 ss("storing-area")
	 ss("storing-location")
	 function clickInp(inpClass){
		 $("."+inpClass).click(function(){
			 $(".downMenu").slideUp("fast");
			$(this).next("div").slideDown("fast");	 
		 })
		 
	 }
	 $(".downMenu ul li").click(function(){
		var liHtml = $(this).html().trim();
		$(this).closest(".downMenu").prev().val(liHtml);
		 //console.log(liHtml)
		 //console.log("----------")
		 //console.log($(this).attr("value"))
		 if($(this).attr("value")=="-1"){
			 $(this).closest(".downMenu").prev().removeAttr("data-value")
		 }else{
			 $(this).closest(".downMenu").prev().attr("data-value",$(this).attr("value"))
		 }
		$(this).closest(".downMenu").slideUp("fast");
	 })
	 clickInp("storing-purpose");
	 clickInp("storing-size");
	 clickInp("store-style");
	 clickInp("use");
	 clickInp("standard");
	 clickInp("goods-style");
	 clickInp("storing-spec");
	 clickInp("storing-style");
	 clickInp("storing-style1");
	 clickInp("storing-type");
	 
	/*轮播*/
	function banner($bannerPic,Icon){
		var num=0;
		var timer=null;
		$(".storageList-rentStore-content",$bannerPic).append($(".storageList-rentStore-box",$bannerPic).clone());
		var liNum=$(".storageList-rentStore-box",$bannerPic).length;
		var liW=$(".storageList-rentStore-box:eq(0)",$bannerPic).width();//一个图片的宽度
		$(".storageList-rentStore-content").width(liNum*(liW+60));
		$(".storageList-rentStore-slide ol li").click(function(){
			$(this).addClass(Icon).siblings().removeClass(Icon);
			var index=$(this).index();
			$(this).closest(".storageList-rentStore").find(".storageList-rentStore-content").animate({"left":-(liW-20)*index},300);		
			num=index;	
		})
		function palyBanner(){
			if(num>=liNum){
				$(".storageList-rentStore-content").animate({"left":0},300);
				$(".storageList-rentStore-slide ol li").eq(0).addClass(Icon).siblings().removeClass(Icon);	
				num=1;
			}else{
				$(".storageList-rentStore-slide ol li").eq(num).addClass(Icon).siblings().removeClass(Icon);	
				$(".storageList-rentStore-content").animate({"left":-(liW+12)*num},300);
				num++;	
			}
		}
		var timer=setInterval(palyBanner,5000);
		$bannerPic.hover(
			function(){
				clearInterval(timer);
			},
			function(){
				timer=setInterval(palyBanner,5000);
			}
		)			
	}
	
	banner($(".storageList-rentStore-content"),"on");
	 
	/*仓储需求*/
	$(".list-find-resource-tit ul li").click(function(){
		var ind = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".storing-supply").eq(ind).show().siblings().hide();	
		$(".storing-supply").eq(ind).find(".looklist p").click(function(){
			$(this).closest(".storing-supply").find(".list-find-resource-conB").css("height","auto");	
		})
	})
	 
	 /*点击查看方式*/
	 $(".check").live("click",function(){
		$(this).closest("tr").addClass("current").siblings().removeClass("current");
		$(this).closest("tr").next("tr").show();	 
	 })
	 
	 /*发布成功*/
	 //$(".storageList .inquiry-btn a.inquiry-price").click(function(){
		//$(".fast-release").fadeIn("fast");
	 //})
	 $(".fast-release-con-tit a").click(function(){
		$(".fast-release").fadeOut("fast");	 
	 })
	 $(".storageList .inquiry-btn a.inquiry-price1").click(function(){
		$(".fast-release1").fadeIn("fast");	 
	 })
	 $(".fast-release-con-tit a").click(function(){
		$(".fast-release1").fadeOut("fast");	 
	 })
	 
	 /*date*/
	 $(".time label").click(function(){
		$(this).children("div").stop().slideDown("fast");
	 })
	/*点击任何地方关闭层*/
	$(document).click(function(event) {
		if ($(event.target).attr("class") != "date" ) {
			$(".time label div").slideUp("fast");
		}
	});
	$(".time label div li").click(function(){
		var liHtml = $(this).html();	
		$(this).closest("label").find("span").html(liHtml);
	})
	
	
	
	$(".file-close").click(function(){
		$(".file-name p").html('');
		$(".file-name").hide();
		//$(".file-close").hide();	
	})
	
	closeBtn();
})
	function closeBtn(){
		if($(".fileInp").val()==''){
				$(".file-name").hide();
			$("#fileBase64").val("")
		}else{
			$(".file-name").show();
				$(".file-close").show();
		}
	}


$(function(){
 $("#file").change(function(){  // 当 id 为 file 的对象发生变化时
		 $(".file-name p").html($("#file").val());
 })
})

function closeThisTip(){
	$(".fast-release").fadeOut("fast");
}

function closeThisTip1(){
	$(".fast-release1").fadeOut("fast");
}


/*$(function(){
	$(".vip-grzx-nav ul li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var vip = $(this).index();
		$(".vip-xyrz .storage-need-content").eq(vip).show().siblings().hide();
	});

	/!*点击详情*!/
	$(".vip-detail").click(function(){
		$(this).closest("tr").next("tr").show();
	})
	/!*点击刷新*!/
	$(".vip-refresh").click(function(){
		$(this).next("div").show();
		$(this).next("div").delay(2000).fadeOut();
	})
})*/


