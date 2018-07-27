var clock;//定时器变量
var num=60;//时钟编号
var callbackFn;
var url;
var arrArgument;
//初始化方法
function openLoginWind(callbackFn,url,arrArgument){
	this.callbackFn=callbackFn;
	this.url=url;
	this.arrArgument=arrArgument;
	$(".register").show();	
}
var items
function openLoginWind2(options){
	var defaults ={
		loginCallback:null,
		url:null,
		param:null
	};
	items = $.extend(defaults,options);
	$(".release-box").fadeOut();
	$(".register").show();
}
function succssFn2(){
	$(".register").hide();
	if($.isFunction(items.loginCallback)){
			items.loginCallback(items.param)
	}else if(items.url!=null){
		window.location=items.url;
	}
}
//登录成功调用
function succssFn(){
	$(".register").hide();	
	if(callbackFn){
		//loginCallback
		var  func=eval(callbackFn);
	       //创建函数对象，并调用
	      new func(arrArgument);
	}else if(url){
		window.location=url;
	}
}
/*登录弹窗点击关闭*/
$(document).ready(function(){
$(".register-box-top a").click(function(){
	$(".register").hide();	
}) 
$(".bookingTit span").click(function(){
	$(".bookingBox-out").fadeOut();	
})
});

/*手机号验证*/
 function vailPhone(phoneNum){
      var flag = false;
      var message = "";
      //var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[7|0])|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;       
      //var myreg=/^(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
      var myreg = /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[0-9])\d{8}$/;
      if(phoneNum ==''){
        message = "手机号码不能为空！";
      }else if(phoneNum.length !=11){
        message = "请输入有效的手机号码！";
        }else if(!myreg.test(phoneNum)){
		  console.log(!myreg.test(phoneNum))
        message = "请输入有效的手机号码！";
      }else{
          flag = true;
      }
      if(!flag){
     //提示错误效果
     alert(message);
     $("#sendMsgBt").attr("href", "javascript:sendPhoneMess();");
        }else{
         }
      return flag;
    }
    /*验证码验证*/
  function isValicode(valicode){
	  if(!valicode){
		  $(".wrong").show();
		  return false;
	  }else if(valicode.length!=6){
		  $(".wrong").show();
		  return false;
	  }
	  return true;
  }
/*发送验证码*/
 function sendPhoneMess(){
	 $("#sendMsgBt").attr("href", "javascript:");
	var phoneNum=$("#phone-loginName").val();
	if(vailPhone(phoneNum)){
		var url='/user/valicode';
		 $.ajax({
			  url: url,
			  dataType: 'json',
			  data: {loginName:phoneNum},
			  success: function(obj){
				  if(obj&&obj.status=='200'){
					  alert("已发送，请查收");
					  $("#phone-loginName").attr("disabled", "true");
					  oneMinuteClock();
				  }else{
					  if(obj.message){
						  alert(obj.message);  
					  }
					  $("#phone-loginName").removeAttr("disabled");
					  $("#sendMsgBt").attr("href", "javascript:sendPhoneMess();");
				  }
			  },
			  error:function(){
				  alert("发送失败");
				  $("#phone-loginName").removeAttr("disabled");
				  $("#sendMsgBt").attr("href", "javascript:sendPhoneMess();");
			  }
			});
	}
	
	
}
function login(){
	var phoneNum=$("#phone-loginName").val();
	var valicode=$("#valicode").val();
	var backUrl=$("#backUrl").val();
	if(!backUrl){
		backUrl='';
	}
	if(!isValicode(valicode)){return}
	if(vailPhone(phoneNum)){
		var url='/user/login';
		 $.ajax({
			  url: url,
			  dataType: 'json',
			  data: {"loginName":phoneNum,"valicode":valicode,"backUrl":backUrl},
			  success: function(obj){
				  if(obj&&obj.status=='200'){
					  alert("登录成功");
					  clearInterval(clock);
					  succssFn2();
				  }else{
					  alert("登录失败");
					  $("#sendMsgBt").attr("href", "javascript:sendPhoneMess();");
				  }
			  },
			  error:function(){
				  alert("登录失败");
				  $("#sendMsgBt").attr("href", "javascript:sendPhoneMess();");
			  }
			});
	}
	
}
//控制数字变化
function oneMinuteClock(){
	num=60;
	$("#sendMsgBt").html(num);
	var clock=setInterval(function(){
			if(num>0){
				$("#sendMsgBt").html(num--);
			}else{
				clearInterval(clock);
				$("#sendMsgBt").html("点击获取");
				$("#sendMsgBt").attr("href", "javascript:sendPhoneMess();");
				$("#phone-loginName").removeAttr("disabled");
			}
			
	},1000);//1000为1秒钟
}