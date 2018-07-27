<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>我的仓储</title>
    <link rel="stylesheet" href="../css/home.css" type="text/css"/>
    <link rel="stylesheet" href="../css/list.css">
    <link rel="stylesheet" type="text/css" href="../css/vip.css">
    <link rel="stylesheet" type="text/css" href="../css/myStorage.css">

    <script src="../js/jquery-1.8.0.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/list.js"></script>
    <script type="text/javascript" src="../js/storageList.js"></script>


    <script>

        $(function(){
            $(".file-name").hide()
            if("${user?exists?string}"=="false"){
                alert("用户登录异常")
            }
            //导航 需求列表
            if("${type}"=="warehouse"){
                $("#myWarehouseLi").addClass("on").siblings().removeClass("on")
                $("#myWarehouseClick").show().siblings().hide()
                toSerchMyWarehouse()
            }else if("${type}"=="warehouseDemand"){//导航 我的需求列表
                $("#myWarehouseDemandLi").addClass("on").siblings().removeClass("on")
                $("#myWarehouseDemandClick").show().siblings().hide()
                toSerchMyWarehouseDemand()
            }
        })

        var my_warehouse_offset = 0
        var my_warehouseDemand_offset = 0


        function seeMyWarehouseDetail(obj){
            var node = $(obj).closest("tr").next("tr")
            if(node.is(':hidden')){　　//如果node是隐藏的则显示node元素，否则隐藏

                node.show();

            }else{

                node.hide();

            }
        }

        /**
         * 刷新 仓储信息
         * @param obj
         */
        function refreshMyWarehouse(id,obj){
            $.ajax({
                type:"post",
                url:"/warehouse/refreshUpdateDate",
                data:{
                    id:id
                },
                success:function(data){
                    if(data){
                        alert(data)
                    }else{
                        $(obj).next("div").show();
                        $(obj).next("div").delay(2000).fadeOut();
                    }
                }
            })
        }

        /**
         * 刷新 仓储信息
         * @param obj
         */
        function refreshMyWarehouseDemand(id,obj){
            $.ajax({
                type:"post",
                url:"/warehouseDemand/refreshUpdateDate",
                data:{
                    id:id
                },
                success:function(data){
                    if(data){
                        alert(data)
                    }else{
                        $(obj).next("div").show();
                        $(obj).next("div").delay(2000).fadeOut();
                    }
                }
            })
        }

        /**
         * 个人中心
         * @param obj
         */
        function myWarehousePersonalCenter(obj){
            $(obj).parent().addClass("on").siblings().removeClass("on")
            $("#myWarehousePersonalCenter").show().siblings().hide()
        }
        /**
         * 我的仓储
         * @param obj
         */
        function myWarehouseClick(obj){
            $(obj).parent().addClass("on").siblings().removeClass("on")
            $("#myWarehouseClick").show().siblings().hide()
            if(my_warehouse_offset==0){
                toSerchMyWarehouse()
            }

        }
        //我的仓储查看更多
        function seeMoreMyWarehouse(){
            toSerchMyWarehouse()
        }
        /**
         * 去查询我的仓储列表
         * @param obj
         */
        function toSerchMyWarehouse(){
            $("#ajax_my_warehouse_loader").show()
            $("#more_my_warehouse_button").hide()
            $.ajax({
                type:"post",
                url:"/warehouse/findAllByMyWarehouse",
                data:{
                    myWarehouseOffset:my_warehouse_offset
                },
                success:function(data){
                    $("#ajax_my_warehouse_loader").hide()
                    if(data){
                        $("#myWarehouseBody").append(data)

                    }

                }
            })
        }
        /**
         * 我的仓储需求
         * @param obj
         */
        function myWarehouseDemandClick(obj){
            $(obj).parent().addClass("on").siblings().removeClass("on")
            $("#myWarehouseDemandClick").show().siblings().hide()
            if(my_warehouseDemand_offset==0){
                toSerchMyWarehouseDemand()
            }
        }
        //我的仓储查看更多
        function seeMoreMyWarehouseDemand(){
            toSerchMyWarehouseDemand()
        }
        /**
         * 去查询我的仓储列表
         * @param obj
         */
        function toSerchMyWarehouseDemand(){
            $("#ajax_my_warehouseDemand_loader").show()
            $("#more_my_warehouseDemand_button").hide()
            $.ajax({
                type:"post",
                url:"/warehouseDemand/findAllByMyWarehouseDemand",
                data:{
                    myWarehouseDemandOffset:my_warehouseDemand_offset
                },
                success:function(data){
                    $("#ajax_my_warehouseDemand_loader").hide()
                    if(data){
                        $("#myWarehouseDemandBody").append(data)

                    }

                }
            })
        }

        function saveWarehouseUser(){
            var warehouseUserName = $("#warehouseUserName").val()
            if(!warehouseUserName){
                $("#warehouseUserNameErro").empty().append("名字不能为空").show()
                return;
            }else{

                if(containSpecial(warehouseUserName) || warehouseUserName.match(/\d+/g)){
                    $("#warehouseUserNameErro").empty().append("名字不能包含除了英文和汉字之外的字符").show()
                    return;
                }
                if(warehouseUserName.length>40){
                    $("#warehouseUserNameErro").empty().append("名字长度不能超过40字符").show()
                    return;
                }


                    $("#warehouseUserNameErro").hide()
            }
            var sex = $("input[name='sex']:checked").val()
            var warehouseFile = $("#fileBase64MyWarehouse").val()
            var userId = $("#userId").val()
            if(!userId){
                alert("请先进行登录")
                return;
            }
            $.ajax({
                type:"post",
                url:"/user/saveUserInfo",
                data:{
                    name:warehouseUserName,
                    sex:sex,
                    image:warehouseFile,
                    id:userId
                },
                success:function(data){

                    if(data){
                        alert(data)
                    }else{
                        location.reload(true)
                    }

                }
            })

        }


        //上传图片 转化成base64
        window.onload = function(){
            var input = document.getElementById("warehouseFile");
            myWarehouseFile= $("#fileBase64MyWarehouse");
            if ( typeof(FileReader) === 'undefined' ){
                alert("抱歉，你的浏览器不支持 FileReader导致图片上传失败，请使用现代浏览器操作！");
                input.setAttribute( 'disabled','disabled' );
            } else {
                input.addEventListener( 'change',readFile,false );}
        }
        function readFile(){
            var file = this.files[0];
//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if(!/image\/\w+/.test(file.type)){
                alert("请确保文件为图像类型");
                return false;
            }
            if(file.type!="image/bmp" && file.type!="image/jpg" && file.type!="image/png" && file.type!="image/jpeg" && file.type!="image/gif"){
                alert("上传的图片格式不正确")
                return false;
            }
            var fileSize = 0;

            fileSize = file.size;
            var size = fileSize / 1024;
            if(size>2000){
            alert("图片不能大于2M");
                return false;
            }

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                myWarehouseFile.val(this.result)
//            img_area.innerHTML = '<div class="sitetip">图片img标签展示：</div><img src="'+this.result+'" alt=""/>';
                $("#showPersonalImage").attr("src",this.result)
            }
        }

    </script>

</head>

<body>


<#include "/common/head1.ftl"/>
<div class="myStorage">
    <div class="vip">
        <dl>
            <#if user?exists && user.image?exists>
                <img src="${user.image}" width="60" height="60">
            <#else>
                <img src="../fodder/vip3.jpg" width="60" height="60">
            </#if>

            <dt>
                <#if user?exists>
                    ${user.name!""}  ${user.loginName!""}
                </#if>
            </dt>
        </dl>
        <div class="cls"></div>
    </div>

    <div class="vip-grzx">
        <div class="vip-grzx-nav">
            <ul>
                <li class="on"><a href="javascript:;" onclick="myWarehousePersonalCenter(this)">个人中心</a></li>
                <li id="myWarehouseLi"><a href="javascript:;" onclick="myWarehouseClick(this)">我的仓储</a></li>
                <li id="myWarehouseDemandLi"><a href="javascript:;" onclick="myWarehouseDemandClick(this)">仓储需求</a></li>
            </ul>
        </div>
        <div class="vip-xyrz storage-need" >
            <div id="myWarehousePersonalCenter" class="storage-need-content" style="display:block">
                <div class="vip-grzx">
                    <div class="vip-grzl-com">
                        <dl>
                            <dt>
                            <#if user?exists && user.image?exists>
                                <img id="showPersonalImage" src="${user.image!""}" width="120" height="120">
                            <#else>
                                <img id="showPersonalImage" src="../fodder/vip3.jpg" width="120" height="120">
                            </#if>
                            <p>请上传图片格式为：bmp、jpg、png、jpeg、gif格式，大小不超过2M的图片</p></dt>
                            <dd><span>
                                <input type="hidden" id="userId" name="userId"  <#if user?exists>value="${user.id!""}"</#if>>
                                <input type="hidden" name="fileBase64MyWarehouse" id="fileBase64MyWarehouse">
                                <input type="file" name="aa" multiple="multiple" id="warehouseFile" />
                            </span>
                                <em style="display:none"> <div class="progress"><span class="red" style="width: 80%;"><span>80%</span></span></div></em></dd>
                            <dd><label>名字：</label>
                            <input class="text" type="text" id="warehouseUserName" name="usr_name" <#if user?exists && user.name?exists>value="${user.name!""}"<#else>value="请填写姓名"</#if> onFocus="if(this.value==this.defaultValue){this.value='';this.style.color='#adadad';};"  onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#adadad';}" />
                                <span style="display:none" id="warehouseUserNameErro">*名字不能为空</span>
                            </dd>

                        </dl>
                        <div class="cls"></div>
                    </div>
                    <div class="vip-grzl-com-nan">
                        <label>性别：</label>
                        <span> <input type="radio" name="sex" value="nan" id="RadioGroup1_0" <#if !user?exists || !user.sex?exists || user.sex=='nan'>checked</#if>><i> 男</i></span>
                        <span><input type="radio" name="sex" value="nv" id="RadioGroup1_1" <#if user?exists && user.sex?exists && user.sex=='nv'>checked</#if>><i>女</i></span>
                    </div>
                    <div class="vip-grzx-qrtj"><a class="qrtj-h qrtj-h2" href="#" onclick="saveWarehouseUser()">确认提交</a></div>
                </div>
            </div>
            <div id="myWarehouseClick" class="storage-need-content">
                <div class="list-find-resource-conTop-news">
                    <div class="time-news floatL">我的仓储</div>
                </div>
                <div class="list-find-resource-conB">
                    <table>
                        <thead>
                        <tr>
                            <th class="r1">单号</th>
                            <th class="r1">联系方式</th>
                            <th class="r2">地区</th>
                            <th class="r1">仓储类型</th>
                            <th class="r1">刷新时间</th>
                            <th style="width:90px">操作</th>
                        </tr>
                        </thead>
                        <tbody id="myWarehouseBody">


                        </tbody>
                    </table>
                </div>
                <div class="looklist cls"><a href="javascript:;" id="more_my_warehouse_button" onclick="seeMoreMyWarehouse()">查看更多</a>
                    <img src="../images/ajax-loader.gif" width="100" id="ajax_my_warehouse_loader" style="display:none">
                </div>
            </div>
            <div id="myWarehouseDemandClick" class="storage-need-content">
                <div class="list-find-resource-conTop-news">
                    <div class="time-news floatL storageNeed">仓储需求</div>
                </div>
                <div class="list-find-resource-conB">
                    <table>
                        <thead>
                        <tr>
                            <th class="r1">单号</th>
                            <th class="r1">联系方式</th>
                            <th class="r2">地区</th>
                            <th class="r1">仓储类型</th>
                            <th class="r1">截止时间</th>
                            <th style="width:90px">操作</th>
                        </tr>
                        </thead>
                        <tbody id="myWarehouseDemandBody">

                        </tbody>
                    </table>
                </div>
                <div class="looklist cls"><a href="javascript:;" id="more_my_warehouseDemand_button" onclick="seeMoreMyWarehouseDemand()">查看更多</a>
                    <img src="../images/ajax-loader.gif" width="100" id="ajax_my_warehouseDemand_loader" style="display:none">
                </div>
            </div>
        </div>
    </div>
</div>
<#include "/common/foot.ftl"/>

</body>
</html>
