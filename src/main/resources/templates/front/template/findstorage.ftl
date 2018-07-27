<!DOCTYPE HTML>
<html>
<head>
    <meta name="renderer" content="webkit">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>仓储列表页</title>
    <link rel="stylesheet" href="../css/home.css" type="text/css"/>
    <link rel="stylesheet" href="../css/storageList.css" type="text/css"/>
    <link rel="stylesheet" href="../css/jquery.datetimepicker.css" type="text/css"/>
    <link rel="stylesheet" href="../css/list.css">
    <script src="../js/jquery.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/list.js"></script>
    <script type="text/javascript" src="../js/storageList.js"></script>
    <script type="text/javascript" src="../common/common.js"></script>
    <script type="text/javascript" src="../js/jquery.datetimepicker.js"></script>

</head>

<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?0f5714ad0ba25ffcb0a9acea336e72c4";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    //得到资讯中心的内容
    function getInfoMations(){
        $.ajax({
            type:"post",
            url:"/warehouse/getInformationInfo",
            data:{

            },
            success:function(data){
                console.log(data)
                var statue = data.statue
                $("#zixunCenter").empty()
                if(data.statue==200){
                    var result = data.result
                    for(var i=0;i<result.length;i++) {
                        $("#zixunCenter").append('<li><a target="_blank" href="'+result[i].url+'" title="'+result[i].title+'"><span>■</span>'+result[i].title+' </a></li>')
                    }
                }
                $("#zixunCenter").parent().parent().show()
            }
        })
    }


    $(function(){
        getInfoMations()
        $(".file-name").hide()
       //导航 需求列表
        if("${type}"=="warehouseDemand"){
            $("#warehouseTab1").addClass("on").siblings().removeClass("on")
            $("#warehouseResult1").show()
            $("#warehouseResult0").hide()
            $(document).scrollTop(1746)
        }else{//导航 我的需求列表
            $("#warehouseTab0").addClass("on").siblings().removeClass("on")
            $("#warehouseResult0").show()
            $("#warehouseResult1").hide()

        }
       if("${type}"=="warehouse"){
           $(document).scrollTop(1746)
       }
<#--//       "${warehouseDemandCode}"=="200" && -->
       if("${warehouseDemandCode}"=="200" && "${warehouseDemandResult?exists?string}"=="true" ){
           $(".fast-release1").fadeIn("fast");
       }
       if("${warehouseDemandResult?exists?string}"=="true" || "${warehouseDemandMsg?string}"!="") {
           //选择 新增的展示tab
           $("#leftTabLi1").addClass("current").siblings().removeClass("current")
           $("#rightResource1").show()
           $("#rightResource0").hide()
           //现在列表的展示tab
           $("#warehouseTab1").addClass("on").siblings().removeClass("on")
           $("#warehouseResult1").show()
           $("#warehouseResult0").hide()


       }

       //日期的选择
       $("#pubWarehouseDemandEndDate").datetimepicker({
           timepicker: true,
           format: 'Y-m-d H:i',
           step:60,
           minDateTime:new Date(),
           minDate:new Date()
       })
   })
    $(function(){

        getProvinces("warehouseArea","warehouse_province","warehouse_city","warehouse_county")
        getProvinces("warehouseDemandArea","warehouseDemand_province","warehouseDemand_city","warehouseDemand_county")
        getProvinces("pubWarehouseArea","pubWarehouse_province","pubWarehouse_city","pubWarehouse_county")
        getProvinces("pubWarehouseDemandArea","pubWarehouseDemand_province","pubWarehouseDemand_city","pubWarehouseDemand_county")
        toSearchWarehouse()
        toSearchWarehouseDemand()
        if("${warehouseCode}"=="200" && "${warehouseResult?exists?string}"=="true"){
            $(".fast-release").fadeIn("fast");
        }

    })
//上传图片 转化成base64
    window.onload = function(){
        var input = document.getElementById("file");
         result= $("#fileBase64");
         img_area = document.getElementById("img_area");
        if ( typeof(FileReader) === 'undefined' ){
            warehouseErroTip("抱歉，你的浏览器不支持 FileReader导致图片上传失败，请使用现代浏览器操作！");
            input.setAttribute( 'disabled','disabled' );
        } else {
            input.addEventListener( 'change',readFile,false );}
    }
    function readFile(){
        var file = this.files[0];
//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
        if(!/image\/\w+/.test(file.type)){
            alert("请确保文件为图像类型");
            result.val("")
            $(".file-name").hide()
            return false;
        }
        var fileSize = 0;

        fileSize = file.size;
        var size = fileSize / 1024;
        if(size>10000){
//            alert("图片不能大于10M");
            $("#warehouseSize").show()
            return false;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            result.val(this.result)
//            img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>';
        }
    }

    //保存仓储需求============================
    var clickWarehouseDemandSaveNum = 0
    var setTimeFlagDemand = false
    function pubWarehouseDemand(obj){

        console.log("clickWarehouseDemandSaveNum"+clickWarehouseDemandSaveNum)
        if(clickWarehouseDemandSaveNum!=0){
            clickWarehouseDemandSaveNum+=1;
            if(!setTimeFlagDemand){
                setTimeout(function () { clickWarehouseDemandSaveNum=0,setTimeFlagDemand=false }, 2000);
            }
            setTimeFlagDemand = true

            return false
        }
        clickWarehouseDemandSaveNum+=1;
        var pubWarehouseDemand_province=$("input[name='pubWarehouseDemand_province']").val()
        var pubWarehouseDemand_city=$("input[name='pubWarehouseDemand_city']").val()
        var pubWarehouseDemand_county=$("input[name='pubWarehouseDemand_county']").val()

        var pubWarehouseDemandTitle = $("#pubWarehouseDemandTitle").val()
        var pubWarehouseDemandStoreNumber = $("#pubWarehouseDemandStoreNumber").val()
        var pubWarehouseDemandStoreUnit = $("#pubWarehouseDemandStoreUnit").text()
        var pubWarehouseDemandStoreGoods = $("#pubWarehouseDemandStoreGoods").val()
        var pubWarehouseDemandBudget = $("#pubWarehouseDemandBudget").val()
        var pubWarehouseDemandEndDate = $("#pubWarehouseDemandEndDate").val()

        var pubWarehouseDemandType = $("#pubWarehouseDemandType").attr("data-value")
        var pubWarehouseDemandSpec = $("#pubWarehouseDemandSpec").attr("data-value")
        var pubWarehouseDemandUser = $("#pubWarehouseDemandUser").val()
        var pubWarehouseDemandTel = $("#pubWarehouseDemandTel").val()

        if(!pubWarehouseDemandTitle || pubWarehouseDemandTitle=="可填写仓库所需面积"){
            warehouseDemandErroTip("标题不允许为空！")
            return;
        }
        if(!pubWarehouseDemand_county){
            warehouseDemandErroTip("仓库地区不允许为空！")
            return;
        }
        if(!pubWarehouseDemandType){
            warehouseDemandErroTip("仓库类型不允许为空！")
            return;
        }

        if(!pubWarehouseDemandSpec){
            warehouseDemandErroTip("仓库规格不允许为空！")
            return;
        }
        if(!pubWarehouseDemandStoreNumber){
            warehouseDemandErroTip("存放时间不允许为空！")
            return;
        }else{
            if(isNaN(pubWarehouseDemandStoreNumber)){
                warehouseDemandErroTip("存放时间必须为数字！")
                return
            }else if(parseInt(pubWarehouseDemandStoreNumber)<0){
                warehouseDemandErroTip("存放时间必须为正数！")
                return
            }else if(pubWarehouseDemandStoreNumber.length>10){
                warehouseDemandErroTip("存放时间不能超过10位！")
                return
            }
        }
        pubWarehouseDemandStoreNumber = parseInt(pubWarehouseDemandStoreNumber)



        if(!pubWarehouseDemandStoreGoods || pubWarehouseDemandStoreGoods=="可填写仓库所需面积、存放时间等信息"){
            warehouseDemandErroTip("存放的货物信息不允许为空！")
            return;
        }

        if(!pubWarehouseDemandBudget || pubWarehouseDemandBudget=="面议"){
            warehouseDemandErroTip("预算费用不允许为空！")
            return;
        }else{

            if(isNaN(pubWarehouseDemandBudget)){
                warehouseDemandErroTip("预算费用必须为数字！")
                return
            }else if(parseInt(pubWarehouseDemandBudget)<0){
                warehouseDemandErroTip("预算费用必须为正数！")
                return
            }else if(pubWarehouseDemandBudget.length>20){
                warehouseDemandErroTip("预算费用不能超过20位！")
                return
            }
        }



        if(!pubWarehouseDemandEndDate){
            warehouseDemandErroTip("截止时间不能为空！")
            return;
        }else{
            pubWarehouseDemandEndDate = new Date($("#pubWarehouseDemandEndDate").val().replace(/-/g,"/"))
        }


        if(!pubWarehouseDemandUser || pubWarehouseDemandUser=="请填写联系人"){
            warehouseDemandErroTip("联系人不允许为空！")
            return;
        }else{
            if(containSpecial(pubWarehouseDemandUser) || pubWarehouseDemandUser.match(/\d+/g)){
                warehouseDemandErroTip("联系人名字不能包含除了英文和汉字之外的字符！")
                return;
            }
            if(pubWarehouseDemandUser.length>40){
                warehouseDemandErroTip("联系人名字长度不能超过40字符！")
                return;
            }
        }
        if(!pubWarehouseDemandTel || pubWarehouseDemandTel=="请输入联系电话"){
            warehouseDemandErroTip("联系电话不允许为空！")
            return;
        }else{
            if(!checkTel(pubWarehouseDemandTel)){
                warehouseDemandErroTip("联系电话格式不正确！")
                return;
            }
        }

        $.ajax({
            type:"post",
            url:"/warehouseDemand/saveWarehouseDemand",
            data:{
                demandEndDate:pubWarehouseDemandEndDate,
                title:pubWarehouseDemandTitle,
                storeNumber:pubWarehouseDemandStoreNumber,
                storeUnit:pubWarehouseDemandStoreUnit,
                storeGoods:pubWarehouseDemandStoreGoods,
                budget:pubWarehouseDemandBudget,
                "address.province.id":pubWarehouseDemand_province,
                "address.city.id":pubWarehouseDemand_city,
                "address.county.id":pubWarehouseDemand_county,
                type:pubWarehouseDemandType,
                "spec.id":pubWarehouseDemandSpec,
                user:pubWarehouseDemandUser,
                tel:pubWarehouseDemandTel
            },
            success:function(data){
                var isLoginned = data.isLoginned
                var result = data.result
                if(isLoginned==1){//已经登录
                    location.href=result
                }else{//未登录
                    location.href="/warehouseDemand/interceptWarehouseDemandAddress?source=warehouseDemand&code="+data.code+"&msg="+data.msg
                }
            }
        })
    }
    //保存仓储================================
    var clickWarehouseSaveNum = 0
    var setTimeFlag = false
    function pubWarehouse(obj){
        console.log("clickWarehouseSaveNum"+clickWarehouseSaveNum)
        if(clickWarehouseSaveNum!=0){
            clickWarehouseSaveNum+=1;
            if(!setTimeFlag){
                setTimeout(function () { clickWarehouseSaveNum=0,setTimeFlag=false }, 2000);
            }
            setTimeFlag = true

            return false
        }
        clickWarehouseSaveNum+=1;
        var pubWarehouse_province=$("input[name='pubWarehouse_province']").val()
        var pubWarehouse_city=$("input[name='pubWarehouse_city']").val()
        var pubWarehouse_county=$("input[name='pubWarehouse_county']").val()

        var pubWarehouseType = $("#pubWarehouseType").attr("data-value")
        var pubWarehouseGoodsType = $("#pubWarehouseGoodsType").attr("data-value")
        var pubWarehousePurpose = $("#pubWarehousePurpose").attr("data-value")
        var pubWarehouseSpec = $("#pubWarehouseSpec").attr("data-value")
        var file = $("#fileBase64").val()
        var pubWarehouseUser = $("#pubWarehouseUser").val()
        var pubWarehouseTel = $("#pubWarehouseTel").val()
        if(!pubWarehouse_county){
            warehouseErroTip("仓库地区不允许为空！")
            return;
        }
        if(!pubWarehouseType){
            warehouseErroTip("仓库类型不允许为空！")
            return;
        }
        if(!pubWarehouseGoodsType){
            warehouseErroTip("仓库货物类型不允许为空！")
            return;
        }
        if(!pubWarehousePurpose){
            warehouseErroTip("仓库用途不允许为空！")
            return;
        }
        if(!pubWarehouseSpec){
            warehouseErroTip("仓库规格不允许为空！")
            return;
        }
        if(!file){
            warehouseErroTip("图片不能为空")
            return;
        }

        if(!pubWarehouseUser || pubWarehouseUser=="请填写联系人"){
            warehouseErroTip("联系人不允许为空！")
            return;
        }else{

            if(containSpecial(pubWarehouseUser) || pubWarehouseUser.match(/\d+/g)){
                warehouseErroTip("联系人名字不能包含除了英文和汉字之外的字符！")
                return;
            }
            if(pubWarehouseUser.length>40){
                warehouseErroTip("联系人名字长度不能超过40字符！")
                return;
            }
        }
        if(!pubWarehouseTel || pubWarehouseTel=="请输入联系电话"){
            warehouseErroTip("联系电话不允许为空！")
            return;
        }else{
            if(!checkTel(pubWarehouseTel)){
                warehouseErroTip("联系电话格式不正确！")
                return;
            }
        }

       $.ajax({
            type:"post",
            url:"/warehouse/saveWarehouse",
            data:{
                "address.province.id":pubWarehouse_province,
                "address.city.id":pubWarehouse_city,
                "address.county.id":pubWarehouse_county,
                type:pubWarehouseType,
                "goodsType.id":pubWarehouseGoodsType,
                "purpose.id":pubWarehousePurpose,
                "spec.id":pubWarehouseSpec,
                image:file,
                user:pubWarehouseUser,
                tel:pubWarehouseTel
            },
            success:function(data){
                var isLoginned = data.isLoginned
                var result = data.result
                if(isLoginned==1){//已经登录
                    location.href=result
                }else{//未登录
                    location.href="/warehouse/interceptWarehouseAddress?code="+data.code+"&msg="+data.msg
                }
            }
        })



    }

    //保存仓储错误提示
    function warehouseErroTip(msg){
        $(".warehouseErroClass p").empty().append(msg).show()
    }
    //保存仓储需求错误提示
    function warehouseDemandErroTip(msg){
        $(".warehouseDemandErroClass p").empty().append(msg).show()
    }



    //===========================================

    var offset = 0
    var demandOffset = 0
    //================找仓储
    //点击 切换tab
    /*function findWarehouse(){
        offset = 0

        toAjaxFindWarehouse()
    }*/
    //查看更多
    function seeMoreWarehouse(){
        searchWarehouse()
    }
    //搜索键
    function toSearchWarehouse(){
        offset = 0
        $("#showWarehouseList").empty()
        searchWarehouse()
    }
    function searchWarehouse(){
        var warehouse_province = $("input[name='warehouse_province']").val()
        var warehouse_city = $("input[name='warehouse_city']").val()
        var warehouse_county = $("input[name='warehouse_county']").val()

        var type = $("#warehouseType").attr("data-value")

        var warehousePurpose = $("#warehousePurpose").attr("data-value")

        var warehouseSpec = $("#warehouseSpec").attr("data-value")

        var warehouseGoodsType = $("#warehouseGoodsType").attr("data-value")

        toAjaxFindWarehouse(warehouse_province,warehouse_city,warehouse_county,type,warehousePurpose,warehouseSpec,warehouseGoodsType)
    }
    function toAjaxFindWarehouse(warehouse_province,warehouse_city,warehouse_county,type,warehousePurpose,warehouseSpec,warehouseGoodsType){
        $("#ajax_warehouse_loader").show()
        $("#more_warehouse_button").hide()
        $.ajax({
            type:"post",
            url:"/warehouse/findAllByWarehouse",
            data:{
                offset:offset,
                "address.province.id":warehouse_province,
                "address.city.id":warehouse_city,
                "address.county.id":warehouse_county,
                type:type,
                "purpose.id":warehousePurpose,
                "spec.id":warehouseSpec,
                "goodsType.id":warehouseGoodsType
            },
            success:function(data){
                $("#ajax_warehouse_loader").hide()
                if(data){
                    $("#showWarehouseList").append(data)

                }

            }
        })
    }
    //================找仓储需求
    //查看更多
    function seeMoreWarehouseDemand(){
        searchWarehouseDemand()
    }
    //搜索键
    function toSearchWarehouseDemand(){
        demandOffset = 0
        $("#showWarehouseDemandList").empty()
        searchWarehouseDemand()
    }
    function searchWarehouseDemand(){
        var warehouseDemand_province = $("input[name='warehouseDemand_province']").val()
        var warehouseDemand_city = $("input[name='warehouseDemand_city']").val()
        var warehouseDemand_county = $("input[name='warehouseDemand_county']").val()

        var type = $("#warehouseDemandType").attr("data-value")
        var warehouseDemandSpec = $("#warehouseDemandSpec").attr("data-value")
        toAjaxFindWarehouseDemand(warehouseDemand_province,warehouseDemand_city,warehouseDemand_county,type,warehouseDemandSpec)
    }
    function toAjaxFindWarehouseDemand(warehouseDemand_province,warehouseDemand_city,warehouseDemand_county,type,warehouseDemandSpec){
        $("#ajax_warehouseDemand_loader").show()
        $("#more_warehouseDemand_button").hide()
        $.ajax({
            type:"post",
            url:"/warehouseDemand/findAllByWarehouseDemand",
            data:{
                demandOffset:demandOffset,
                "address.province.id":warehouseDemand_province,
                "address.city.id":warehouseDemand_city,
                "address.county.id":warehouseDemand_county,
                type:type,
                "spec.id":warehouseDemandSpec,
            },
            success:function(data){
                $("#ajax_warehouseDemand_loader").hide()
                if(data){
                    $("#showWarehouseDemandList").append(data)

                }

            }
        })
    }
    //=============查看仓储需求 联系人电话
    function checkWarehouseDemandTel(warehouseDemandId){
        $.ajax({
            type:"post",
            url:"/warehouseDemand/bookingWarehouseDemand",
            data:{
                "id":warehouseDemandId
            },
            success:function(data){
                if(data){
                    console.log(data)
                }
            }
        })
    }
</script>

<body id="body">
<#include "/common/head1.ftl"/>
<div class="storageList">
    <div class="list-banner">
        <div class="release-resource">
            <div class="release-resource-bg"></div>
            <div class="release-resource-left">
                <ul >
                    <li id="leftTabLi0" class="current"><a href="javascript:;" >发布仓库</a></li>
                    <li id="leftTabLi1"><a href="javascript:;">发布仓库需求</a></li>
                </ul>
                <div class="ewm"><img src="../fodder/erweima.jpg"/></div>
            </div>
            <div class="release-resource-right">
                <div id="rightResource0" class="release-resource-right-main"  style="display:block;">
                    <div class="inquiry-car floatL" style="">
                        <div class="zhuanghuo">
                            <span><b>*</b>仓库地区</span>

                            <input type="hidden" name="pubWarehouse_province" <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.address.province.id?c}"</#if>>
                            <input type="hidden" name="pubWarehouse_city" <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.address.city.id?c}"</#if>>
                            <input type="hidden" name="pubWarehouse_county" <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.address.county.id?c}"</#if>>
                            <#if "-1"==warehouseCode && warehouseResult?exists>
                                <input readonly value="${warehouseResult.address.province.name}${warehouseResult.address.city.name}${warehouseResult.address.county.name}" class="storing-area pubWarehouseArea" type="text"/>
                            <#else>
                                <input readonly value="请选择省市区" class="storing-area pubWarehouseArea" type="text"/>
                            </#if>
                            <div class="zhuanghuo-main listPro">
                                <div class="zhuanghuo-main-tit">
                                    <div>
                                        <h4 class="on">省份</h4>
                                        <h4>城市</h4>
                                        <h4>县区</h4>
                                        <h4 class="close"><a href="javascript:;"></a></h4>
                                    </div>
                                </div>

                                <div class="zhuanghuo-main-content">
                                    <div class="zhuanghuo-main-detail province" style="display:block;">
                                        <div id="pubWarehouse_province">

                                        </div>
                                    </div>
                                    <div class="zhuanghuo-main-detail city">
                                        <div id="pubWarehouse_city">

                                        </div>
                                    </div>
                                    <div class="zhuanghuo-main-detail area">
                                        <div id="pubWarehouse_county">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="zhuanghuo contect purpose con">
                            <span class="phone storing-apply"><b>*</b>仓库类型</span>
                            <input readonly  class="storing-style" id="pubWarehouseType" type="text" <#if "-1"==warehouseCode && warehouseResult?exists>value="<#if warehouseResult.type==0>出租<#elseif warehouseResult.type==1>出售<#elseif warehouseResult.type==2>托管</#if>" data-value="${warehouseResult.type}"<#else>value="选择类型"</#if>/>
                            <div class="store-style-con downMenu">
                                <ul>
                                    <li value="0">出租</li>
                                    <li value="1">出售</li>
                                    <li value="2">托管</li>
                                </ul>
                            </div>

                            <span class="receive"><b>*</b>货物类型</span>
                            <input readonly <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.goodsType.label}" data-value="${warehouseResult.goodsType.id?c}"<#else>value="选择货物类型"</#if> class="storing-type" id="pubWarehouseGoodsType" type="text"/>
                            <div class="store-style-con downMenu size">
                                <ul>
                                    <#list warehouseGoodsType as goodsType>
                                        <li value="${goodsType.id}">
                                        ${goodsType.label?trim}
                                        </li>
                                    </#list>
                                </ul>
                            </div>
                        </div>
                        <div class="zhuanghuo contect purpose con">
                            <span class="phone storing-apply"><b>*</b>仓库用途</span>
                            <input  readonly <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.purpose.label}" data-value="${warehouseResult.purpose.id?c}"<#else>value="选择仓库用途"</#if> class="storing-purpose" id="pubWarehousePurpose" type="text"/>
                            <div class="store-style-con downMenu">
                                <ul>
                                <#list warehousePurpose as purpose>
                                    <li value="${purpose.id}">
                                    ${purpose.label?trim}
                                    </li>
                                </#list>
                                </ul>
                            </div>
                            <span class="receive"><b>*</b>规格</span>
                            <input readonly  <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.spec.label}" data-value="${warehouseResult.spec.id?c}"<#else>value="请选择仓储规格"</#if> class="storing-size" id="pubWarehouseSpec" type="text"/>
                            <div class="store-style-con downMenu size">
                                <ul>
                                    <#list warehouseSpec as spec>
                                        <li value="${spec.id}">
                                            ${spec.label?trim}
                                        </li>
                                    </#list>
                                </ul>
                            </div>
                        </div>
                        <div class="zhuanghuo picture">
                            <span><b>*</b>上传图片</span>
                            <input type="hidden" name="fileBase64" id="fileBase64">

                            <input value="" class="fileInp" id="file" name="file" type="file" onchange="closeBtn()"/>
                            <div class="file">+ 选择文件</div>

                            <strong id="warehouseSize" style="display:none">文件大小不能超过10M</strong>
                            <div class="file-name"><p></p><a href="javascript:;" class="file-close"></a></div>
                            <p id="img_area" style="display:none"></p>
                            <#--<input type="file" value="sdgsdg" id="demo_input" />
                            <textarea id="result" rows=30 cols=300></textarea>
                            <p id="img_area"></p>-->
                        </div>
                    </div>
                    <div class="linkman floatL">
                        <div class="zhuanghuo contect">
                            <span class=""><b>*</b>联系人</span>
                            <input  <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.user}" <#else>value="请填写联系人"</#if> class="listPeople" id="pubWarehouseUser" type="text"/>
                        </div>
                        <div class="zhuanghuo contect">
                            <span class=""><b>*</b>联系电话</span>
                            <input <#if "-1"==warehouseCode && warehouseResult?exists>value="${warehouseResult.tel}" <#else>value="请输入联系电话"</#if> class="listTel" type="text" id="pubWarehouseTel"/>
                        </div>
                        <div class="error warehouseErroClass"><div class="error-bg"></div><p><#if "-1"==warehouseCode && warehouseMsg?exists>${warehouseMsg}</#if></p></div>
                        <div class="inquiry-btn"><a href="javascript:;" class="inquiry-price" onclick="pubWarehouse(this)">立即发布</a></div>
                    </div>
                </div>
                <div id="rightResource1" class="release-resource-right-main release-car">
                    <div class="inquiry-car floatL" style="">
                        <div class="zhuanghuo contect carTel storing-title">
                            <span class=""><b>*</b>仓库需求标题</span>
                            <input class="storing-titleInp" id="pubWarehouseDemandTitle" type="text" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.title}" <#else>value="可填写仓库所需面积"</#if>/>
                            <span class="storing-title-style"><b>*</b>仓库类型</span>
                            <input readonly class="storing-style1" type="text" id="pubWarehouseDemandType" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="<#if warehouseDemandResult.type==0>出租<#elseif warehouseDemandResult.type==1>出售<#elseif warehouseDemandResult.type==2>托管</#if>" data-value="${warehouseDemandResult.type}"<#else>value="选择类型"</#if>/>
                            <div class="store-style-con downMenu">
                                <ul>
                                    <li value="0">出租</li>
                                    <li value="1">出售</li>
                                    <li value="2">托管</li>
                                </ul>
                            </div>
                        </div>
                        <div class="zhuanghuo">
                            <span><b>*</b>存放地点</span>
                            <input type="hidden" name="pubWarehouseDemand_province" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.address.province.id?c}"</#if>>
                            <input type="hidden" name="pubWarehouseDemand_city" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.address.city.id?c}"</#if>>
                            <input type="hidden" name="pubWarehouseDemand_county" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.address.county.id?c}"</#if>>
                            <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>
                                <input readonly value="${warehouseDemandResult.address.province.name}${warehouseDemandResult.address.city.name}${warehouseDemandResult.address.county.name}" class="storing-area pubWarehouseDemandArea" type="text"/>
                            <#else>
                                <input readonly value="请选择省市区" class="storing-location pubWarehouseDemandArea" type="text"/>
                            </#if>
                            <div class="zhuanghuo-main listPro">
                                <div class="zhuanghuo-main-tit">
                                    <div>
                                        <h4 class="on">省份</h4>
                                        <h4>城市</h4>
                                        <h4>县区</h4>
                                        <h4 class="close"><a href="javascript:;"></a></h4>
                                    </div>
                                </div>

                                <div class="zhuanghuo-main-content">
                                    <div class="zhuanghuo-main-detail province" style="display:block;">
                                        <div id="pubWarehouseDemand_province">

                                        </div>
                                    </div>
                                    <div class="zhuanghuo-main-detail city">
                                        <div id="pubWarehouseDemand_city">

                                        </div>
                                    </div>
                                    <div class="zhuanghuo-main-detail area">
                                        <div id="pubWarehouseDemand_county">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="zhuanghuo warehouse">
                            <span class="receive storing-stand"><b>*</b>仓库规格</span>
                            <input readonly id="pubWarehouseDemandSpec" class="storing-spec" type="text" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.spec.id?c}"<#else>value="请选择仓储规格" </#if>/>
                            <div class="store-style-con downMenu storing-spec-con">
                                <ul>
                                    <#list warehouseSpec as spec>
                                        <li value="${spec.id}">
                                        ${spec.label?trim}
                                        </li>
                                    </#list>
                                </ul>
                            </div>
                            <span class="storing-time"><b>*</b>存放时间</span>
                            <div class="time floatL">
                                <input  class="" type="text" id="pubWarehouseDemandStoreNumber" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.storeNumber?c}"</#if> />
                                <label>
                                    <span class="date" id="pubWarehouseDemandStoreUnit"><#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.storeUnit}"<#else>天</#if></span>
                                    <div>
                                        <ul>
                                            <li>天</li>
                                            <li>月</li>
                                            <li>年</li>
                                        </ul>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="zhuanghuo">
                            <span class="storing-cargo"><b>*</b>存放货物</span>
                            <input id="pubWarehouseDemandStoreGoods" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.storeGoods}" <#else>  value="可填写仓库所需面积、存放时间等信息"</#if> class="storing-goods" type="text"/>
                        </div>
                        <div class="zhuanghuo contect carTel">
                            <span class="phone storing-price"><b>*</b>预算费用</span>
                            <input id="pubWarehouseDemandBudget" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.budget}" <#else> value="面议"</#if> class="cost" type="text"/>元
                            <span class="receive"><b>*</b>截止时间</span>
                            <input readonly <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.demandEndDate}" <#else> value=""</#if> id="pubWarehouseDemandEndDate" class="time" type="text"/>
                        </div>
                    </div>
                    <div class="linkman floatL">
                        <div class="zhuanghuo contect">
                            <span class=""><b>*</b>联系人</span>
                            <input id="pubWarehouseDemandUser" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.user}" <#else>value="请填写联系人"</#if> class="listPeople" type="text"/>
                        </div>
                        <div class="zhuanghuo contect">
                            <span class=""><b>*</b>联系电话</span>
                            <input id="pubWarehouseDemandTel" <#if "-1"==warehouseDemandCode && warehouseDemandResult?exists>value="${warehouseDemandResult.tel}" <#else>value="请输入联系电话"</#if>  class="listTel" type="text"/>
                        </div>
                        <div class="error warehouseDemandErroClass"><div class="error-bg"></div><p><#if "-1"==warehouseDemandCode && warehouseDemandMsg?exists>${warehouseDemandMsg}</#if></p></div>
                        <div class="inquiry-btn"><a href="javascript:;" class="inquiry-price" onclick="pubWarehouseDemand(this)">立即发布</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="storageList-article" style="display:none">
		<div class="list-find-resource-tit storageList-article-title">
        	<ul>
            	<li class="on"><a target="_blank" href="http://zixun.99114.com/listing/%E4%BB%93%E5%82%A8">资讯中心</a></li>
            </ul>
        </div>
        <div class="storageList-article-con" >
        	<ul type="square" id="zixunCenter">
            	<#--<li><a target="_blank" href="http://hj.99114.com/Article1/90843687_2.html" title="仓储仓库的流程"><span>■</span>仓储仓库的流程 </a></li>
                <li><a target="_blank" href="http://hj.99114.com/Article1/90843676_2.html" title="仓储仓库建立的意义"><span>■</span>仓储仓库建立的意义 </a></li>
                <li><a target="_blank" href="http://hj.99114.com/Article1/90839650_2.html" title="山东货架在仓库管理中的价值"><span>■</span>山东货架在仓库管理中的价值 </a></li>
                <li><a target="_blank" href="http://hj.99114.com/Article1/90837647_2.html" title="三个原则让你明白食品冷链企业仓储仓库规划方案"><span>■</span>三个原则让你明白食品冷链企业仓储仓库规划方案 </a></li>
                <li><a target="_blank" href="http://mtp.99114.com/Article1/90834669_2.html" title="怎样在自动化立体化仓库中使用新乡塑料托盘"><span>■</span>怎样在自动化立体化仓库中使用新乡塑料托盘 </a></li>
                <li><a target="_blank" href="http://mtp.99114.com/Article1/90834509_2.html" title="河南仓库塑料托盘成本计算"><span>■</span>河南仓库塑料托盘成本计算 </a></li>
                <li><a target="_blank" href="http://www.zglbzj.com/Article1/90823513_2.html" title="新疆首家氧化铝交割仓库落户铁路物流基地"><span>■</span>新疆首家氧化铝交割仓库落户铁路物流基地 </a></li>
                <li><a target="_blank" href="http://www.zglbzj.com/Article1/90821940_2.html" title="阿拉丁氧化铝交易中心新疆交割仓库签约仪式成功举行"><span>■</span>阿拉丁氧化铝交易中心新疆交割仓库签约仪式成功举行 </a></li>
                <li><a target="_blank" href="http://www.saltcc.com/Article1/90820872_2.html" title="工业盐仓库暗藏食用盐 坪地查扣非法私盐近百吨"><span>■</span>工业盐仓库暗藏食用盐 坪地查扣非法私盐近百吨 </a></li>
                <li><a target="_blank" href="http://www.zglbzj.com/Article1/90814314_2.html" title="阿拉丁氧化铝交易中心新疆交割仓库签约成功"><span>■</span>阿拉丁氧化铝交易中心新疆交割仓库签约成功</a></li>-->
            </ul>
            <ol>
            	<li>
                    <a target="_blank" href="http://zt.99114.com/yw/2016zb/ggxtbj/index.html">
                        <img width="120" height="120" title="" src="/images/guanggao1.jpg">
                    </a>
                </li>
                <li>
                    <a target="_blank" href="http://zt.99114.com/dptapp/">
                        <img width="120" height="120" title="" src="/images/guanggao2.jpg">
                    </a>
                </li>
                <li>
                    <a target="_blank" href="http://shop.99114.com/43075694">
                        <img width="120" height="120" title="" src="/images/guanggao3.jpg">
                    </a>
                </li>
            </ol>
        </div>
    </div>
    <div class="storageList-rentStore comMt25">
        <div class="storageList-rentStore-content">
            <div class="storageList-rentStore-box on">
                <div class="storageList-rentStore-box-tit">
                    <div class="store floatR">仓库</div>
                    <div class="rent floatL">出租</div>
                </div>
                <div class="storageList-rentStore-main">
                    <ul>

                        <#list rentWarehouses as item>
                            <li>
                                <span><a href="javascript:;">
                                    <#if item.image?exists>
                                        <img src="${item.image}"/>
                                    <#else>
                                        <img src="../fodder/storeSup.jpg"/>
                                    </#if>
                                </a></span>
                                <div class="storageList-supply-conText">
                                    <p><a href="javascript:;">
                                        ${item.spec.label}
                                        <#--0:出租、1：出售、2：托管-->
                                        <#if item.type==0>
                                            出租
                                        <#elseif item.type==1>
                                            出售
                                        <#elseif item.type==2>
                                            托管
                                        </#if>
                                    </a></p>
                                    <span id="warehouseAreaSpan${item.id}" title="">地区：
                                        <#compress>
                                            <#if item.address?exists>
                                                <#if item.address.province?exists>
                                                ${item.address.province.name!""?trim}
                                                </#if>
                                                <#if item.address.city?exists>
                                                    -${item.address.city.name!""?trim}
                                                </#if>
                                                <#if item.address.county?exists>
                                                    -${item.address.county.name!""?trim}
                                                </#if>
                                            </#if>
                                        </#compress>
                                     </span>

                                    <script>
                                        var areaSpanText = $("#warehouseAreaSpan${item.id}").text().trim().replace("-","").replace("-","")
                                        $("#warehouseAreaSpan${item.id}").attr("title",areaSpanText)
                                        if(areaSpanText.length>18){
                                            areaSpanText = areaSpanText.substring(0,18)+"..."
                                        }
                                        $("#warehouseAreaSpan${item.id}").text(areaSpanText)
                                    </script>
                                    <span title="">联系人：${item.user!""}</span>
                                    <label title="">电话： ${item.tel!""}</label>
                                </div>
                            </li>

                        </#list>

                    </ul>
                </div>
            </div>
            <div class="storageList-rentStore-box">
                <div class="storageList-rentStore-box-tit">
                    <div class="store floatR">仓库</div>
                    <div class="rent floatL">出售</div>
                </div>
                <div class="storageList-rentStore-main">
                    <ul>
                        <#list sellWarehouses as item>
                            <li>
                                <span><a href="javascript:;">
                                    <#if item.image?exists>
                                        <img src="${item.image}"/>
                                    <#else>
                                        <img src="../fodder/storeSup.jpg"/>
                                    </#if>
                                </a></span>
                                <div class="storageList-supply-conText">
                                    <p><a href="javascript:;">
                                    ${item.spec.label}
                                    <#--0:出租、1：出售、2：托管-->
                                        <#if item.type==0>
                                            出租
                                        <#elseif item.type==1>
                                            出售
                                        <#elseif item.type==2>
                                            托管
                                        </#if>
                                    </a></p>
                                    <span id="warehouseAreaSpan${item.id}" title="">地区：
                                        <#compress>
                                            <#if item.address?exists>
                                                <#if item.address.province?exists>
                                                ${item.address.province.name!""?trim}
                                                </#if>
                                                <#if item.address.city?exists>
                                                    -${item.address.city.name!""?trim}
                                                </#if>
                                                <#if item.address.county?exists>
                                                    -${item.address.county.name!""?trim}
                                                </#if>
                                            </#if>
                                        </#compress>
                                    </span>

                                    <script>
                                        var areaSpanText = $("#warehouseAreaSpan${item.id}").text().trim().replace("-","").replace("-","")
                                        $("#warehouseAreaSpan${item.id}").attr("title",areaSpanText)
                                        if(areaSpanText.length>18){
                                            areaSpanText = areaSpanText.substring(0,18)+"..."
                                        }
                                        $("#warehouseAreaSpan${item.id}").text(areaSpanText)
                                    </script>
                                    <span title="">联系人：${item.user!""}</span>
                                    <label title="">电话： ${item.tel!""}</label>
                                </div>
                            </li>

                        </#list>
                    </ul>
                </div>
            </div>
            <div class="storageList-rentStore-box">
                <div class="storageList-rentStore-box-tit">
                    <div class="store floatR">仓库</div>
                    <div class="rent floatL">托管</div>
                </div>
                <div class="storageList-rentStore-main">
                    <ul>
                        <#list depositWarehouses as item>
                            <li>
                                <span><a href="javascript:;">
                                    <#if item.image?exists>
                                        <img src="${item.image}"/>
                                    <#else>
                                        <img src="../fodder/storeSup.jpg"/>
                                    </#if>
                                </a></span>
                                <div class="storageList-supply-conText">
                                    <p><a href="javascript:;">
                                    ${item.spec.label}
                                    <#--0:出租、1：出售、2：托管-->
                                        <#if item.type==0>
                                            出租
                                        <#elseif item.type==1>
                                            出售
                                        <#elseif item.type==2>
                                            托管
                                        </#if>
                                    </a></p>
                                    <span id="warehouseAreaSpan${item.id}" title="">地区：
                                        <#compress>
                                            <#if item.address?exists>
                                                <#if item.address.province?exists>
                                                ${item.address.province.name!""?trim}
                                                </#if>
                                                <#if item.address.city?exists>
                                                    -${item.address.city.name!""?trim}
                                                </#if>
                                                <#if item.address.county?exists>
                                                    -${item.address.county.name!""?trim}
                                                </#if>
                                            </#if>
                                        </#compress>
                                     </span>

                                    <script>
                                        var areaSpanText = $("#warehouseAreaSpan${item.id}").text().trim().replace("-","").replace("-","")
                                        $("#warehouseAreaSpan${item.id}").attr("title",areaSpanText)
                                        if(areaSpanText.length>18){
                                            areaSpanText = areaSpanText.substring(0,18)+"..."
                                        }
                                        $("#warehouseAreaSpan${item.id}").text(areaSpanText)
                                    </script>
                                    <span title="">联系人：${item.user!""}</span>
                                    <label title="">电话： ${item.tel!""}</label>
                                </div>
                            </li>

                        </#list>
                    </ul>
                </div>
            </div>
        </div>
        <div class="storageList-rentStore-slide">
            <ol>
                <li class="on">1</li><li>2</li><li>3</li>
            </ol>
        </div>
    </div>
    <div class="storageList-supply comMt25" id="scrollPosition">
        <div class="list-find-resource-tit">
            <ul>
                <li id="warehouseTab0" class="on"><a href="javascript:;">仓储供应</a></li>
                <li id="warehouseTab1"><a href="javascript:;">仓储需求</a></li>
            </ul>
            <div class="floatR"><a href="/warehouse/myWarehouseCenterFilter">个人中心</a></div>
        </div>
        <div class="storageList-supply-con">
            <div id="warehouseResult0" class="storing-supply" style="display:block">
                <div class="storageList-supply-con-top">
                    <div class="storageList-filter con">筛选条件</div>
                    <div class="con conShort">
                        <span>地区</span>
                        <input type="hidden" name="warehouse_province">
                        <input type="hidden" name="warehouse_city">
                        <input type="hidden" name="warehouse_county">
                        <input type="text" value="请选择" class="area warehouseArea"/>
                        <div class="zhuanghuo-main">
                            <div class="zhuanghuo-main-tit">
                                <div>
                                    <h4 class="on">省份</h4>
                                    <h4>城市</h4>
                                    <h4>县区</h4>
                                    <h4 class="close"><a href="javascript:;"></a></h4>
                                </div>
                            </div>

                            <div class="zhuanghuo-main-content">
                                <div class="zhuanghuo-main-detail province" style="display:block;">
                                    <div id="warehouse_province">

                                    </div>
                                </div>
                                <div class="zhuanghuo-main-detail city">
                                    <div id="warehouse_city">

                                    </div>
                                </div>
                                <div class="zhuanghuo-main-detail area">
                                    <div id="warehouse_county">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="con">
                        <span>仓储类型</span>
                        <input type="text" value="请选择" id="warehouseType" class="store-style"/>
                        <div class="store-style-con downMenu">
                            <ul>
                                <li value="-1">全部</li>
                                <li value="0">出租</li>
                                <li value="1">出售</li>
                                <li value="2">托管</li>
                            </ul>
                        </div>
                    </div>
                    <div class="con conShort">
                        <span>用途</span>
                        <input type="text" value="请选择" id="warehousePurpose" class="use"/>
                        <div class="use-con downMenu">
                            <ul>
                                <#list warehousePurpose as purpose>
                                    <#if purpose_index==0>
                                        <li value="-1">全部</li>
                                    </#if>
                                    <li value="${purpose.id}">
                                    ${purpose.label?trim}
                                    </li>
                                </#list>
                            </ul>
                        </div>
                    </div>
                    <div class="con conShort">
                        <span>规格</span>
                        <input type="text" value="请选择" id="warehouseSpec" class="standard"/>
                        <div class="standard-con downMenu">
                            <ul>
                                <#list warehouseSpec as spec>
                                    <#if spec_index==0>
                                        <li value="-1">全部</li>
                                    </#if>
                                    <li value="${spec.id}">
                                    ${spec.label?trim}
                                    </li>
                                </#list>
                            </ul>
                        </div>
                    </div>
                    <div class="con">
                        <span>货物类型</span>
                        <input type="text" value="请选择" id="warehouseGoodsType" class="goods-style"/>
                        <div class="goods-style-con downMenu">
                            <ul>
                                <#list warehouseGoodsType as goodsType>
                                    <#if goodsType_index==0>
                                        <li value="-1">全部</li>
                                    </#if>
                                    <li value="${goodsType.id}">
                                    ${goodsType.label?trim}
                                    </li>
                                </#list>
                            </ul>
                        </div>
                    </div>
                    <div class="list-btn floatL">
                        <a href="javascript:;" onclick="toSearchWarehouse()">搜索</a>
                    </div>
                </div>
                <div class="storageList-supply-con-main">
                    <ul class="clearfix" id="showWarehouseList">

                    </ul>
                </div>
                <div class="looklist clearfix"><a href="javascript:;" id="more_warehouse_button" onclick="seeMoreWarehouse()">查看更多</a>
                    <img src="../images/ajax-loader.gif" width="100" id="ajax_warehouse_loader" style="display:none">
                </div>
                <div class="cls"></div>
            </div>
            <div id="warehouseResult1" class="storing-supply">
                <div class="storageList-supply-con-top">
                    <div class="storageList-filter con">筛选条件</div>
                    <div class="con conShort">
                        <span>地区</span>
                        <input type="hidden" name="warehouseDemand_province">
                        <input type="hidden" name="warehouseDemand_city">
                        <input type="hidden" name="warehouseDemand_county">
                        <input type="text" value="请选择" class="area warehouseDemandArea"/>
                        <div class="zhuanghuo-main">
                            <div class="zhuanghuo-main-tit">
                                <div>
                                    <h4 class="on">省份</h4>
                                    <h4>城市</h4>
                                    <h4>县区</h4>
                                    <h4 class="close"><a href="javascript:;"></a></h4>
                                </div>
                            </div>

                            <div class="zhuanghuo-main-content">
                                <div class="zhuanghuo-main-detail province" style="display:block;">
                                    <div id="warehouseDemand_province">

                                    </div>
                                </div>
                                <div class="zhuanghuo-main-detail city">
                                    <div id="warehouseDemand_city">

                                    </div>
                                </div>
                                <div class="zhuanghuo-main-detail area">
                                    <div id="warehouseDemand_county">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="con">
                        <span>仓储类型</span>
                        <input type="text" value="请选择" id="warehouseDemandType" class="store-style"/>
                        <div class="store-style-con downMenu">
                            <ul>
                                <li value="-1">全部</li>
                                <li value="0">出租</li>
                                <li value="1">出售</li>
                                <li value="2">托管</li>
                            </ul>
                        </div>
                    </div>
                    <div class="con conShort">
                        <span>规格</span>
                        <input type="text" value="请选择" id="warehouseDemandSpec" class="standard"/>
                        <div class="standard-con downMenu">
                            <ul>
                                <#list warehouseSpec as spec>
                                    <#if spec_index==0>
                                        <li value="-1">全部</li>
                                    </#if>
                                    <li value="${spec.id}">
                                    ${spec.label?trim}
                                    </li>
                                </#list>
                            </ul>
                        </div>
                    </div>
                    <div class="list-btn floatL">
                        <a href="javascript:;" onclick="toSearchWarehouseDemand()">搜索</a>
                    </div>
                </div>
                <div class="storageList-supply-con-main">
                    <table id="showWarehouseDemandList">

                    </table>
                </div>
                <div class="looklist clearfix"><a href="javascript:;" id="more_warehouseDemand_button" onclick="seeMoreWarehouseDemand()">查看更多</a>
                    <img src="../images/ajax-loader.gif" width="100" id="ajax_warehouseDemand_loader" style="display:none">
                </div>
            </div>
        </div>
    </div>
</div>
<#include "/common/foot.ftl"/>
<!--发布仓库成功-->
<div class="fast-release">
    <div class="fast-release-bg"></div>
    <div class="fast-release-con">
        <div class="fast-release-con-tit"><h3>发布提示</h3><a href="javascript:;" class="close"></a></div>
        <div class="fast-release-main">
            <div class="fast-release-content">
                <div class="fast-release-content-top">
                    <p>尊敬的<#if currentUser?exists>${currentUser.loginName!""}</#if> 用户</p>
                    <p class="success-release">您的仓储信息已成功发布！</p>
                </div>
                <div class="fast-release-content-center">
                    <div class="warning">谨防诈骗须知</div>
                    <div class="warning-con">
                        <p>1、请优先选择平台推荐的仓储供应方和需求方<br/>
                            2、不在平台完成款项交易时请核对仓储方证件</p>
                    </div>
                </div>
                <div class="fast-release-content-bottom clearfix">
                    <div class="fast-release-content-bottomBtn floatL">
                        <a href="/warehouse/myWarehouseCenterFilter?type=warehouse">查看我发的仓储信息</a>
                        <a href="javascript:;" class="continue-send" onclick="closeThisTip()">继续发布仓储信息</a>
                    </div>
                    <div class="fast-release-content-bottomEwm floatR">
                        <div>
                            <span><img src="../fodder/erweima.jpg"/></span>
                            <p>微信一键发送需求</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--发布仓库需求成功-->
<div class="fast-release1">
    <div class="fast-release-bg"></div>
    <div class="fast-release-con">
        <div class="fast-release-con-tit"><h3>发布提示</h3><a href="javascript:;" class="close"></a></div>
        <div class="fast-release-main">
            <div class="fast-release-content">
                <div class="fast-release-content-top">
                    <p>尊敬的<#if currentUser?exists>${currentUser.loginName!""}</#if> 用户</p>
                    <p class="success-release">您的找仓储需求已成功发布！</p>
                </div>
                <div class="fast-release-content-center">
                    <div class="warning">谨防诈骗须知</div>
                    <div class="warning-con">
                        <p>1、请优先选择平台推荐的仓储供应方和需求方<br/>
                            2、不在平台完成款项交易时请核对仓储方证件</p>
                    </div>
                </div>
                <div class="fast-release-content-bottom clearfix">
                    <div class="fast-release-content-bottomBtn floatL">
                        <a href="/warehouse/myWarehouseCenterFilter?type=warehouseDemand">查看我发的找仓储信息</a>
                        <a href="javascript:;" class="continue-send"  onclick="closeThisTip1()">继续发布找仓储信息</a>
                    </div>
                    <div class="fast-release-content-bottomEwm floatR">
                        <div>
                            <span><img src="../fodder/erweima.jpg"/></span>
                            <p>微信一键发送需求</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
