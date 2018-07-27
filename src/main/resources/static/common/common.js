
function checkTel(value){
    var isPhone = /^([0-9]{3,4}-)[0-9]{7,8}$/;
    var isMob=/^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[0-9])\d{8}$/;
    if(isMob.test(value)||isPhone.test(value)){
        return true;
    }
    else{
        return false;
    }
}

/**
 *

 * ==========省 市县 分开展示
 * @param inputTextClass 触发筛选省市县的input框
 * @param province_show_id  省显示的id
 * @param city_show_id
 * @param county_show_id
 */
function getProvinces(inputTextClass,province_show_id,city_show_id,county_show_id){

    inputFocus(inputTextClass,province_show_id,city_show_id,county_show_id)


    $.ajax({
        type:"post",
        url:"/area/findByType",
        data:{
            type:'2'
        },
        success:function(data){
            if(data){

                $("#"+province_show_id).empty()
                for(var i=0;i<data.length;i++) {
                    //if(i==0){
                        //changeProvinceToUpdateCitys(city_show_id,data[i].id,county_show_id)
                    //}
                    $("#"+province_show_id).append('<a href="javascript:;" onclick="changeProvinceToUpdateCitys(\''+inputTextClass+'\',\''+province_show_id+'\',\''+city_show_id+'\',\''+county_show_id+'\',\''+data[i].id+'\',\''+data[i].name+'\')" value="'+data[i].id+'">'+data[i].name+'</a>')
                }
                $("#"+province_show_id).parent().show().siblings().hide()
            }
        }
    })
}
function changeProvinceToUpdateCitys(inputTextClass,province_show_id,city_show_id,county_show_id,provinceId,provinceName){


    $("."+inputTextClass).val(provinceName);
    $("."+inputTextClass).parent().find("input[name='"+province_show_id+"']").val(provinceId)
    $("."+inputTextClass).parent().find("input[name='"+province_show_id+"_name"+"']").val(provinceName)
    $("."+inputTextClass).parent().find(".zhuanghuo-main-tit h4").eq(1).addClass("on").siblings().removeClass("on");


    $.ajax({
        type:"post",
        url:"/area/findByParentId",
        data:{
            parentId:provinceId
        },
        success:function(data){
            if(data){

                $("#"+city_show_id).empty()
                for(var i=0;i<data.length;i++) {
                    //if(i==0){
                        //changeCityToUpdateAreas(county_show_id,data[i].id)
                    //}
                    $("#"+city_show_id).append('<a href="javascript:;" onclick="changeCityToUpdateAreas(\''+inputTextClass+'\',\''+city_show_id+'\',\''+county_show_id+'\',\''+data[i].id+'\',\''+data[i].name+'\')" value="'+data[i].id+'">'+data[i].name+'</a>')
                }
                $("#"+city_show_id).parent().show().siblings().hide()
            }

        }
    })

}
function changeCityToUpdateAreas(inputTextClass,city_show_id,county_show_id,cityId,cityName){

    $("."+inputTextClass).val($("."+inputTextClass).val()+cityName);
    $("."+inputTextClass).parent().find("input[name='"+city_show_id+"']").val(cityId);
    $("."+inputTextClass).parent().find("input[name='"+city_show_id+"_name"+"']").val(cityName);
    $("."+inputTextClass).parent().find(".zhuanghuo-main-tit h4").eq(2).addClass("on").siblings().removeClass("on");
    $.ajax({
        type:"post",
        url:"/area/findByParentId",
        data:{
            parentId:cityId
        },
        success:function(data){
            if(data){

                $("#"+county_show_id).empty()
                for(var i=0;i<data.length;i++) {
                    $("#"+county_show_id).append('<a href="javascript:clickCountyA(\''+inputTextClass+'\',\''+county_show_id+'\',\''+data[i].id+'\',\''+data[i].name+'\');" value="'+data[i].id+'">'+data[i].name+'</a>')
                }
                $("#"+county_show_id).parent().show().siblings().hide()

            }

        }
    })

}
function clickCountyA(inputTextClass,county_show_id,countyId,countyName){
    $("."+inputTextClass).val($("."+inputTextClass).val()+countyName);
    $("."+inputTextClass).parent().find("input[name='"+county_show_id+"']").val(countyId)
    $("."+inputTextClass).parent().find("input[name='"+county_show_id+"_name"+"']").val(countyName)
    $("."+inputTextClass).parent().find(".zhuanghuo-main").slideUp("fast");
}

function inputFocus(selClass,province_show_id,city_show_id,county_show_id){

    $("."+selClass).focus(function(){
        $("."+selClass).parent().find("input[name='"+province_show_id+"']").val("")
        $("."+selClass).parent().find("input[name='"+city_show_id+"']").val("")
        $("."+selClass).parent().find("input[name='"+county_show_id+"']").val("")
        var inpVal = $("."+selClass).val();
        $("."+selClass).val('');
        $(".zhuanghuo-main").hide();
        $(".zhuanghuo-main-detail").hide();
        $(this).parent().find(".zhuanghuo-main").slideDown();
        //console.log($(this))
        //console.log("----")
        //console.log($(this).next(".zhuanghuo-main").find(".zhuanghuo-main-tit h4").eq(0))
        $(this).next(".zhuanghuo-main").find(".zhuanghuo-main-tit h4").eq(0).addClass("on").siblings().removeClass("on");
        $(this).next(".zhuanghuo-main").find(".province").show();
    })


}

$(".zhuanghuo-main-tit div h4.close a").click(function(){
    $(this).closest(".zhuanghuo-main").slideUp("fast");
})

