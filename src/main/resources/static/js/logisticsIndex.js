
function submitGoods(val){
    $.post("/user/ifLogin", {}, function (result){
        if(result=="0"){
            openLoginWind2({loginCallback:function(type){

                fastSubmitGoods(type)
            },url:null,param:val})
        }else{
            fastSubmitGoods(val)
        }
    })
}

function fastSubmitGoods(val) {
    $("#publistGoodsForm input").val("")
    $("#goodsStatue").val(getAjaxDictByValue("goodsSourceStatue","waiting"))
    $("#source").val(getUrl())
    if (val == 0) {
        $("#needSend").val(false)
        $("#needTake").val(false)
        $("#goodsDetail").val($("#fastGoodDetail").val())
        $("#fromTel").val($("#fastGoodFromTel").val())
        $("#toTel").val($("#fastGoodToTel").val())
        $("#publistGoodsForm input[name='from.province.id']").val($("input[name='quickPub_goods_from_province']").val());
        $("#publistGoodsForm input[name='from.provinceName']").val($("input[name='quickPub_goods_from_province_name']").val());
        $("#publistGoodsForm input[name='from.city.id']").val($("input[name='quickPub_goods_from_city']").val());
        $("#publistGoodsForm input[name='from.cityName']").val($("input[name='quickPub_goods_from_city_name']").val());
        $("#publistGoodsForm input[name='from.county.id']").val($("input[name='quickPub_goods_from_county']").val());
        $("#publistGoodsForm input[name='from.countyName']").val($("input[name='quickPub_goods_from_county_name']").val());
        $("#publistGoodsForm input[name='to.province.id']").val($("input[name='quickPub_goods_to_province']").val());
        $("#publistGoodsForm input[name='to.provinceName']").val($("input[name='quickPub_goods_to_province_name']").val());
        $("#publistGoodsForm input[name='to.city.id']").val($("input[name='quickPub_goods_to_city']").val());
        $("#publistGoodsForm input[name='to.cityName']").val($("input[name='quickPub_goods_to_city_name']").val());
        $("#publistGoodsForm input[name='to.county.id']").val($("input[name='quickPub_goods_to_county']").val());
        $("#publistGoodsForm input[name='to.countyName']").val($("input[name='quickPub_goods_to_county_name']").val());
    } else if (val == 1) {
        $("#publistGoodsForm input[name='from.province.id']").val($("input[name='detailPub_goods_from_province']").val());
        $("#publistGoodsForm input[name='from.provinceName']").val($("input[name='detailPub_goods_from_province_name']").val());
        $("#publistGoodsForm input[name='from.city.id']").val($("input[name='detailPub_goods_from_city']").val());
        $("#publistGoodsForm input[name='from.cityName']").val($("input[name='detailPub_goods_from_city_name']").val());
        $("#publistGoodsForm input[name='from.county.id']").val($("input[name='detailPub_goods_from_county']").val());
        $("#publistGoodsForm input[name='from.countyName']").val($("input[name='detailPub_goods_from_county_name']").val());
        $("#publistGoodsForm input[name='to.province.id']").val($("input[name='detailPub_goods_to_province']").val());
        $("#publistGoodsForm input[name='to.provinceName']").val($("input[name='detailPub_goods_to_province_name']").val());
        $("#publistGoodsForm input[name='to.city.id']").val($("input[name='detailPub_goods_to_city']").val());
        $("#publistGoodsForm input[name='to.cityName']").val($("input[name='detailPub_goods_to_city_name']").val());
        $("#publistGoodsForm input[name='to.county.id']").val($("input[name='detailPub_goods_to_county']").val());
        $("#publistGoodsForm input[name='to.countyName']").val($("input[name='detailPub_goods_to_county_name']").val());

        $("#goodsDetail").val($("#detailGoodsDetail").val())
        if ($("#ifNeedSend").prop("checked")) {
            $("#needSend").val(true)
        } else {
            $("#needSend").val(false)
        }
        if ($("#ifNeedTake").prop("checked")) {
            $("#needTake").val(true)
        } else {
            $("#needTake").val(false)
        }
        $("#goodsLoad").val($("#goodsWeight").val())
        $("#goodsLoadUnit").val(getAjaxDictByLabel("goodsWeightUnit",$("#goodsWeightUnit2").html().trim()))
        $("#goodsAmount").val($("#detailgoodsAmount").val())
        $("#carType").val($("#detailcarType2").val())
        $("#carLength").val($("#detailcarLength").val())
        if($("#detailcarCount").val()==""){
            $("#carCount").val(1)
        }else{
            $("#carCount").val($("#detailcarCount").val().replace("辆",""));
        }
        var price = $("#detailprice").val()
        if(isNaN(price)){
            error("意向价格必须为数字")
            return
        }
        if(isNaN($("#goodsWeight").val())){
            error("货物重量必须为数字")
            return
        }
        $("#price").val(price)
        $("#toTel").val($("#detailtoTel").val())
        $("#mark").val($("#detailremark").val())
    }

    setTimeout(function () {
        if($("#publistGoodsForm input[name='from.province.id']").val()==""||$("#publistGoodsForm input[name='from.city.id']").val()==""||$("#publistGoodsForm input[name='from.county.id']").val()==""
        ||$("#publistGoodsForm input[name='to.province.id']").val()==""||$("#publistGoodsForm input[name='to.city.id']").val()==""||$("#publistGoodsForm input[name='to.county.id']").val()==""
        ){
            error("装卸货地点省市县都需要选择")
        }else if($("#goodsDetail").val().trim()==""){
            error("货物详情不能为空")
        }else if(val==0&&($("#fromTel").val()==""||$("#toTel").val()=="")){
            error("联系电话不能为空")
        }else if(val==0&&(!testPhone($("#fromTel").val(),$("#toTel").val()))){
            error("电话号码格式不正确")
        }else if(val!=0&&($("#toTel").val()) && (!testPhone($("#fromTel").val(),$("#toTel").val()))){
            error("电话号码格式不正确")
        }else{
            $.post("saveGoodsSource", $("#publistGoodsForm").serializeArray(), function (result) {
                if (result.code > 0) {
                    if(val==0){
                        //$("#fastPublishGoodsForm input").val("")
                        $("#userNameSpan").empty()
                        $("#userNameSpan").append(result.user.loginName)
                        $("#pubTitle").empty().append("快速发布资源")
                        $(".fast-release").fadeIn("fast");
                    }else{
                        $(".release-box").fadeOut("fast");
                        $("#pubTitle").empty().append("详细发布资源")
                        $("#userNameSpan").empty()
                        $("#userNameSpan").append(result.user.loginName)
                        $(".fast-release").fadeIn("fast");
                    }
                } else {
                    alert("很抱歉，发布失败，请重试")
                }
            })
        }
    }, 10);

}

function error(val){
    $("#errorText").html(val)
    $("#errorTextDetail").html(val)
    $(".error").css({"opacity":"0.9"});
    //$(".error").animate({"opacity":"0"},3000);
}
function error2(val){
    $("#errorText2").html(val)
    $(".error").css({"opacity":"0.9"});
    //$(".error").animate({"opacity":"0"},3000);
}

function testPhone(val,val2){
    var flag1=true
    var flag2=true
    var flag=true
    if(!/^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/.test(val)){
        flag1= false
    }
    if(val2!=null&&!/^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/.test(val2)){
        flag2= false
    }
    if(flag1&&flag2){
        flag=true
    }else{
        flag=false
    }
    return flag
}


function getAjaxDictByValue(type, val) {
    $.ajaxSetup({
        async: false
    });
    var dictVal = "";
    $.get("/dict/getOne", {type:type, value:val}, function (result) {
        if (result.code > 0) {
            dictVal = result.dict.id
        } else {
            dictVal = "1"
        }
    })
    return dictVal;
}
function getAjaxDictByLabel(type, label) {
    $.ajaxSetup({
        async: false
    });
    var dictVal = "";
    $.get("/dict/getOne", {type:type, label:label}, function (result) {
        if (result.code > 0) {
            dictVal = result.dict.id
        } else {
            dictVal = "1"
        }
    })
    return dictVal;
}


function submitCars(){
    $.post("/user/ifLogin", {}, function (result){
        if(result=="0"){
            openLoginWind2({loginCallback:function(){
                pubCarSource()
            },url:null,param:null})
        }else{
            pubCarSource()
        }
    })
}
function pubCarSource(){
    $("#publistCarsForm input").val("")
    $("#carStatue").val(getAjaxDictByValue("carSourceStatue","waiting"))
    $("#source2").val(getUrl())
    $("#publistCarsForm input[name='from.province.id']").val($("input[name='quickPub_car_from_province']").val());
    $("#publistCarsForm input[name='from.provinceName']").val($("input[name='quickPub_car_from_province_name']").val());
    $("#publistCarsForm input[name='from.city.id']").val($("input[name='quickPub_car_from_city']").val());
    $("#publistCarsForm input[name='from.cityName']").val($("input[name='quickPub_car_from_city_name']").val());
    $("#publistCarsForm input[name='from.county.id']").val($("input[name='quickPub_car_from_county']").val());
    $("#publistCarsForm input[name='from.countyName']").val($("input[name='quickPub_car_from_county_name']").val());
    $("#publistCarsForm input[name='to.province.id']").val($("input[name='quickPub_car_to_province']").val());
    $("#publistCarsForm input[name='to.provinceName']").val($("input[name='quickPub_car_to_province_name']").val());
    $("#publistCarsForm input[name='to.city.id']").val($("input[name='quickPub_car_to_city']").val());
    $("#publistCarsForm input[name='to.cityName']").val($("input[name='quickPub_car_to_city_name']").val());
    $("#publistCarsForm input[name='to.county.id']").val($("input[name='quickPub_car_to_county']").val());
    $("#publistCarsForm input[name='to.countyName']").val($("input[name='quickPub_car_to_county_name']").val());
    if(isNaN($("#carLoadWeightNo").val())){
        error2("重量体积必须为数字")
        return
    }
    $("#goodsLoad2").val($("#carLoadWeightNo").val())
    $("#goodsLoadUnit2").val(getAjaxDictByLabel("carLoadUnit",$("#carloadUnitVal").html()))
    if(isNaN($("#carVolume").val())){
        error2("体积必须为数字")
        return
    }
    $("#goodsAmount2").val($("#carVolume").val())
    $("#carType2").val($("#carTypeInput").val())
    $("#carLength2").val($("#carLengthInput").val())
    if($("#carNoInput").val()==""){
        $("#carCount2").val(1)
    }else{
        $("#carCount2").val($("#carNoInput").val().replace("辆",""));
    }
    if($("#carTypeInput").val()==""){
        $("#carType2").val($("#carTypeInput").attr("placeholder"))
    }
    if($("#carLengthInput").val()==""){
        $("#carLength2").val($("#carLengthInput").attr("placeholder"))
    }
    $("#tel").val($("#pubCarStartPhone").val())
    $("#time").val($("#startCarTime").val())
    $("#startCarTime").val().replace(":","/")
    $("#time").val(new Date($("#startCarTime").val().replace(/-/g,"/")))
    setTimeout(function () {
        if($("#publistCarsForm input[name='from.province.id']").val()==""||$("#publistCarsForm input[name='from.city.id']").val()==""||$("#publistCarsForm input[name='from.county.id']").val()==""
            ||$("#publistCarsForm input[name='to.province.id']").val()==""||$("#publistCarsForm input[name='to.city.id']").val()==""||$("#publistCarsForm input[name='to.county.id']").val()==""
        ){
            error2("地点省市县都需要选择")
        }else if($("#carType2").val()==""||$("#carLengthInput").val()==""){
            error2("车类型必须选择")
        }else if( $("#tel").val()==""){
            error2("发车电话不能为空")
        }else if(!testPhone($("#tel").val())){
            error2("电话号码格式不正确")
        }else if($("#time").val()==""){
            error2("发车时间必须选择")
        }else{
            $.post("/car/saveCarSource", $("#publistCarsForm").serializeArray(), function (result) {
                if (result.code > 0) {
                    $("#userNameSpan").empty()
                    $("#userNameSpan").append(result.user.loginName)
                    $("#fastPublishCarForm input").val("")
                    $(".fast-release").fadeIn("fast");
                } else {
                    alert("很抱歉，发布失败，请重试")
                }
            })
        }
    }, 10);



}

function publish(val){
    if(val==0){
        checkType=0
        $(".showWindon1").html("货")
    }else{
        checkType=1
        $(".showWindon1").html("车")
    }
}
function checkMyPublish() {
    if (checkType == 0) {
        location.href = "http://localhost:8080/goods/myGoods"
    } else {
        location.href = "http://localhost:8080/car/index"
    }
}

function continuePublish(){
    $(".fast-release").fadeOut("fast");
}
$(function(){
   /* ajaxDicts("carLoadUnit","carWeightUnitUl")
    ajaxDicts("carType","carTypeUl")
    ajaxDicts("carLength","carLengthUl")*/

})

function ajaxDicts(type,domId){
    $.get("/dict/findByType", {type:type}, function (result) {
        var list = eval(result);
        var listStr="";
        if (list != null) {
            for (var i = 0; i < list.length; i++) {
                listStr+="<li>"+list[i].label+"</li>"
            }
        }
        $("#"+domId).append(listStr)
    })
}

function getUrl(){
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPath = curWwwPath.substring(0, pos);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return localhostPath
}



/*
(function(window){
    var jsPlaceHolder={};
    jsPlaceHolder.addListener = function(e, n, o, u){
        if(e.addEventListener){
            e.addEventListener(n, o, u);
            return true;
        } else if(e.attachEvent){
            e.attachEvent('on' + n, o);
            return true;
        }
        return false;
    };
    jsPlaceHolder.removeListener = function(e, n, o, u){
        if(e.addEventListener){
            e.removeEventListener(n, o, u);
            return true;
        } else if(e.attachEvent){
            e.detachEvent('on' + n, o);
            return true;
        }
        return false;
    };
    jsPlaceHolder.trim = function(str){
        return str.replace(/^\s+|\s+$/,"");
    };
    //oTxtId:文本框id或者Dom元素 ;option: 获得焦点color值 与失去焦点的color值
    jsPlaceHolder.play=function(oTxtId,option){
        var _this=this;
        if(!oTxtId) return false;
        //检测placeHolder支持情况
        if("placeholder" in document.createElement("input")){
            return false;
        };
        var setting={
            focusColor:"#333",
            blurColor:"#999"
        };
        option = option||{};
        for(var key in setting){
            if(!option[key]){
                option[key] = setting[key];
            }
        };
        var oTxt=null;
        if(typeof(oTxtId)!="string" && oTxtId.nodeType==1){
            oTxt = oTxtId;
            oTxtId=oTxt.id;
        }
        if(!oTxt){
            oTxt = document.getElementById(oTxtId);
            if(!oTxt) return false;
        }
        var blurTxt = _this.trim(oTxt.getAttribute("placeHolder"));
        oTxt.value = blurTxt;
        oTxt.style.color=setting.blurColor;
        _this.addListener(oTxt,"focus",function(){
            if(_this.trim(oTxt.value)==blurTxt){
                oTxt.value="";
                oTxt.style.color=setting.focusColor;
            }
        });
        _this.addListener(oTxt,"blur",function(){
            if(_this.trim(oTxt.value)==blurTxt || _this.trim(oTxt.value)==""){
                oTxt.value=blurTxt;
                oTxt.style.color=setting.blurColor;
            }
        })
    }
    window.jsPlaceHolder = jsPlaceHolder;
})(window);*/





