// JavaScript Document
$(function(){
	/*资深经纪人*/
	function scrollTop2(hClass){
		var setName1
		$(hClass).hover(function () {
			  clearInterval(setName1)
		 },function () {
				  setName1=setInterval(function () {
					$(hClass+" ul").stop().animate({marginTop:"-215px"},3000,function () {
					$(hClass+" ul").css("margin-top","0").find("li:first").appendTo(hClass+" ul");
				  })
		  },3000)
		}).trigger("mouseleave")
	}
	scrollTop2(".apple-stock-right3-con")
})