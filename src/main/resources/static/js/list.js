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
		$(".nav-category-con-detail").stop().slideDown();	
	},function(){
		$(".nav-category-con-detail").stop().slideUp();	
	})
	/*发布车源货源*/
	$(".release-resource-left ul li").click(function(){
		 $(".error").css({"opacity":"0.9"});
		var ind = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");	
		$(".release-resource-right-main").eq(ind).show().siblings().hide();	
	 //$(".error").animate({"opacity":"0"},3000);
	})
	
	/*找车找货*/
	$(".list-find-resource-tit ul li").click(function(){
		var ind = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".find-goods").eq(ind).show().siblings().hide();	
		$(".find-goods").eq(ind).find(".looklist p").click(function(){
			$(this).closest(".find-goods").find(".list-find-resource-conB").css("height","auto");	
		})
	})
	
		var titInd = $(".list-find-resource-tit ul li.on").index();
		$(".find-goods").eq(titInd).find(".looklist p").click(function(){
			$(this).closest(".find-goods").find(".list-find-resource-conB").css("height","auto");	
		})
	
	$(".list-find-resource-conB table tbody tr").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(".list-find-resource-conB table tbody tr").removeClass("current");	
	})	
	
	$(".list-find-resource-conB table tr td.driver a").click(function(){
		$(this).closest("tr").next("tr").slideDown();	
		$(this).html("已预订");
	})
	/*查看电话*/
	$(".check").click(function(){
		$(this).parent().children(".bookingBox-out").fadeIn();
	})
	$(".tan_fr-price .submitBtn").click(function(){
		$(this).closest(".tan_fr").find(".submit").hide();
		$(this).closest(".tan_fr").find(".submit-success").show();
	})
	/*登录弹窗点击关闭*/
	$(".register-box-top a").click(function(){
		$(".register").hide();	
	})
	$(".bookingTit span").click(function(){
		$(".bookingBox-out").fadeOut();	
	})
	
	function inputTipText(obj,initText) {
		$("."+obj).each(function() {
				var _this = $(this);
			   if($.trim(_this.val()) == '' || $.trim(_this.val()) == initText){
				   _this.css({"color":"#777"});
			   }else{
				   _this.css({"color":"#777"});
			   }
			_this.focus(function() {
					if ( $.trim(_this.val()) == initText) {
						_this.val('').css({"color":"#262626"});
				 }})
				.blur(function() {
				if (!_this.val() || $.trim(_this.val()) == '' || $.trim(_this.val()) ==initText) {
					_this.val(initText).css({"color":"#777"});
				}
			}).keydown(function() {
				_this.css({"color":"#262626"})
			})
		});
	} 
	 inputTipText("selDecorate","选择装点");	
	 inputTipText("selUnloading","选择卸货点重量");	
	 inputTipText("startInp","请选择省市区");	
	 inputTipText("endInp","请选择省市区");	

	 inputTipText("number input","请输入手机号");	
	 inputTipText("yzm input","请输入图文验证码");	
	 inputTipText("yzm input","请输入手机验证码");	

	 inputTipText("zhuanghuo input.det","可填写货物名称、数量、重量、提及、需求车、价");	
	 inputTipText("zhuanghuo input.fhTel","输入发货人电话");	
	 inputTipText("zhuanghuo input.shTel","输入收货人电话");	
	 
	 inputTipText("weight1 input","请填写重量");	
	 inputTipText("vol input","请填写体积数字");	
	 inputTipText("car-style input.car1","中栏车");	
	 inputTipText("car-style input.car2","10.7米");	
	 inputTipText("car-style input.car3","1辆");	
	 inputTipText("contect input.tel","请填写发车电话");	
	 //inputTipText("contect input.time","20160220 18：00");
	
	 inputTipText("find-start","选择出发地");	
	 inputTipText("find-end","选择目的地");	
	 
	
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
	 
	 ss("selDecorate");
	 ss("selUnloading");
	 ss("startInp");
	 ss("endInp");
	 ss("find-start");
	 ss("find-end");
	 ss("find-start1");
	 ss("find-end1");
	 
	/*点击下拉*/
	$(".weight div label span").click(function(){
		$(".car-style1 div").slideUp("fast");
		$(this).next("div").slideDown();
	})
	
	$(".weight div label div ul li").click(function(){
		var liHtml = $(this).html();	
		$(this).closest("label").find("span").html(liHtml);
		$(this).closest("label").find("div").slideUp("fast");
	})
	
	$(".car1").click(function(){
		$(".car-style1 div").slideUp("fast");
		$(this).next("div").slideDown("fast");
	})	
	$(".car2").click(function(){
		$(".car-style1 div").slideUp("fast");
		$(this).next("div").slideDown();
	})	
	$(".car3").click(function(){
		$(".car-style1 div").slideUp("fast");
		$(this).next("div").slideDown();
	})	
	$(".car-style .car-style1 div ul li").click(function(){
		var liHtml = $(this).html();	
		$(this).closest(".car-style1").find("input").val(liHtml);
		$(this).closest(".car-style1").find("div").slideUp("fast");
	})
	/*点击任何地方关闭层*/
	$(document).click(function(event) {
		if ($(event.target).attr("class") != "dun" && $(event.target).attr("class") != "car1" && $(event.target).attr("class") != "car2" && $(event.target).attr("class") != "car3") {
			$(".car-style1 div").slideUp("fast");
		}
	});
	
	/*发布弹窗*/
	$(".release-resource-right .inquiry-btn a.find-car").click(function(){
		$(".release-box").fadeIn();	
	})
	$(".content a.find-car").click(function(){
		$(".release-box").fadeOut();	
	})
	
	$(".weightVol div.weight label span").click(function(){
		$(".car-style1 div").slideUp("fast");
		$(this).next("div").slideDown();
	})
	
	$(".weightVol div.weight label div ul li").click(function(){
		var liHtml = $(this).html();	
		$(this).closest("label").find("span").html(liHtml);
		$(this).closest("label").find("div").slideUp("fast");
	})
	$(".content .car-style1 div ul li").click(function(){
		var liHtml = $(this).html();	
		$(this).closest(".car-style1").find("input").val(liHtml);
		$(this).closest(".car-style1").find("div").slideUp("fast");
	})
	
	ss("conPro");
	ss("conPro1");
	 inputTipText("goods","请输入货物信息");
	 inputTipText("conPro","请选择省、市、县");	
	 inputTipText("conPro1","请选择省、市、县");	
	 inputTipText("content textarea","请输入");
	 inputTipText("conRe","请输入收货人手机号");	
	 inputTipText("conPri","请输入收货人手机号");	
	 inputTipText("content .car1","选择车型");	
	 inputTipText("content .car2","选择车长");	
	 inputTipText("content .car3","选择数量");	
	 $(".release-box-con-tit a.close").click(function(){
		$(".release-box").fadeOut("fast");	 
	 })
	 
	 /*快速发布*/
	/* $(".release-resource-right .inquiry-btn a.inquiry-price").click(function(){
		$(".fast-release").fadeIn("fast");	 
	 })*/
	 $(".fast-release-con-tit a").click(function(){
		$(".fast-release").fadeOut("fast");	 
	 })



})
















