
var flag=0;
$(function(){
    $("#pageNo").val(0);
    $("#orderPageNo").val(0);
    ajaxLoadSelfGoods();
    ajaxLoadSelfOrders();
})

function loadMore(){
    if(flag == 0){
        ajaxLoadSelfGoods();
    }else{
        ajaxLoadSelfOrders();
    }
}
function getAjaxDictValue(id) {
    var dictVal = "";
    $.post("dict/getOne", {id:id}, function (result) {
        if (result.code > 0) {
            dictVal = result.dict.id
        } else {
            dictVal = "1"
        }
    })
    return dictVal;
}

function check1(val){
    $.post("getOneTemplate", {id:val}, function (result) {
        $("#detail_panel").empty()
        $("#detail_panel").append(result)
        $("#detail_panel").css("top","200px")
        $("#detail_panel").fadeIn();
    })
}
function check2(val){
    $.post("/booking/getOneTemplate", {id:val}, function (result) {
        $("#detail_panel2").empty()
        $("#detail_panel2").append(result)
        $("#detail_panel2").css("top","200px")
        $("#detail_panel2").fadeIn();
    })
}
//日期转换
function parseTime(nS) {
    return new Date(nS).toLocaleString().replace(/\//g, "-");
}
/*我发的货*/
function ajaxLoadSelfGoods(){
    $.get("/user/getCurrentUser",{},function(data){
        if(data.code>0){
            $("#userId").val(data.userId)
            $.post("goodsSourcePageList",  $("#selfGoods").serializeArray(), function (result) {
                if (result.code > 0) {
                    $("#pageNo").val(result.page.number+1);
                    var list = eval(result.page.content);
                    var listStr="";
                    if (list != null) {
                        for (var i = 0; i < list.length; i++) {
                            listStr+="<tr class='blank'></tr>"+
                                "<tr class='title3'><td class='colorYellor'>"+list[i].id+"</td>"+
                                "<td>"+list[i].from.provinceName+list[i].from.cityName+list[i].from.countyName+ifNull(list[i].from.detail)+"</td>"+
                                "<td>"+list[i].to.provinceName+list[i].to.cityName+list[i].to.countyName+ifNull(list[i].to.detail)+"</td>"+
                                "<td>"+list[i].goodsInfo.goodsDetail+"</td>"+
                                "<td>"+parseTime(list[i].createDate)+"</td>"+
                                "<td id='selfGoods"+list[i].id+"'>"+list[i].statue.label+"(<span style='color: red'>"+getCount(list[i].id)+"</span>)</td>"+/*TODO 状态*/
                                "<td><a class='bookingCon' onclick='check1("+list[i].id+")' href='javascript:void(0)'>查看</a>&nbsp;&nbsp;<a class='bookingCon' onclick='finish("+list[i].id+"&#44&quot;"+list[i].statue.value+"&quot;)' href='javascript:void(0)'>完成</a></td>"+
                                "</tr>"
                        }
                        $("#selfGoodsTable").append(listStr)
                        if(list.length==0){
                            alert("没有更多信息了")
                        }
                    }else{
                        /*todo 没有更多信息*/
                        alert("没有更多信息了")
                    }
                } else {
                    alert("请求失败，请重试")
                }
            })
        }
    })

}
/*我接的单*/
function ajaxLoadSelfOrders(){
    $.get("/user/getCurrentUser",{},function(data) {
        if (data.code > 0) {
            $("#userIdForOrder").val(data.userId)
            $.post("/booking/bookingPageList",  $("#selfOrders").serializeArray(), function (result) {
                if (result.code > 0) {
                    $("#orderPageNo").val(result.page.number+1);
                    var list = eval(result.page.content);
                    var listStr="";
                    if (list != null) {
                        for (var i = 0; i < list.length; i++) {
                            listStr += "<tr class='blank'></tr>" +
                                "<tr>" +
                                "<td class='r1'>" +
                                "<div class='img'>"
                            if(list[i].user.image!=null&&list[i].user.image!=""){
                                listStr+="<img width='60' height='60' src='"+list[i].user.image+"'/>"
                            }else{
                                listStr+="<img width='60' height='60' src='../fodder/people.png'/>"
                            }
                            listStr+=
                                "</div>" +
                                "<div class='name'><span>" + list[i].goodsSource.user.name + "</span><span>" + showStars(list[i].goodsSource.user) + "</span></div>" +
                                "</td>" +
                                "<td class='r1'>" + list[i].goodsSource.from.provinceName + list[i].goodsSource.from.cityName + list[i].goodsSource.from.countyName + ifNull(list[i].goodsSource.from.detail) + "</td>" +
                                "<td class='r1 end'>" + list[i].goodsSource.to.provinceName + list[i].goodsSource.to.cityName + list[i].goodsSource.to.countyName + ifNull(list[i].goodsSource.to.detail) + "</td>" +
                                "<td class='r2'>厢式货车，20米，10吨，30立方</td>" +
                                "<td class='r1'>" + parseTime(list[i].goodsSource.createDate) + "</td>" +
                                "<td>" + list[i].statue.label + "</td>" + /*TODO 状态*/
                                "<td><a class='bookingCon' onclick='check2(" + list[i].id + ")' href='javascript:void(0)'>查看电话</a></td>" +
                                "</tr>"
                        }
                        if(list.length==0){
                            alert("没有更多信息了")
                        }
                        $("#selfOrdersTable").append(listStr)
                    }else{
                        /*todo 没有更多信息*/
                        alert("没有更多信息了")
                    }
                } else {
                    alert("请求失败，请重试")
                }
            })

        }
    })


}

function checkMyGoods(){
    flag=0
}
function checkMyOrders(){
    flag=1
}
function getCount(val){
    $.ajaxSetup({
        async: false
    });
    var dictVal = 0;
    $.post("/booking/getBookingCount", {goodsSource:val}, function (result) {
        if (result.code > 0) {
            dictVal = result.count
        } else {
            dictVal = 1
        }
    })
    return dictVal
}

function getGoodsStatueLabel(){
    $.ajaxSetup({
        async: false
    });
    var dictVal = 0;
    $.post("/booking/getBookingCount", {goodsSource:val}, function (result) {
        if (result.code > 0) {
            dictVal = result.count
        } else {
            dictVal = 1
        }
    })
    return dictVal
}

var finishId="";
function finish(val,val2) {
    if(val2=="successful"){
        alert("该订单已经完成")
    }else if(val2=="cancelled"){
        alert("该订单已取消，不可完成")
    }else{
        $("#bookingBoxQuxiao2").fadeIn();
        finishId = val
    }
}
function realFinish(){
    $.get("/dict/getOne", {type: "goodsSourceStatue", value: "successful"}, function (result) {
        if (result.code > 0) {
            $.post("/goods/updateGoodsSource", {id: finishId, statue: result.dict.id}, function (data) {
                if (data.code > 0) {
                    $("#selfGoods" + finishId).html(result.dict.label)
                    location.reload(true)
                } else {
                    alert("提交失败，请重试")
                }
            })
        }
    })
}
function cancelFinish(){
    $("#bookingBoxQuxiao2").fadeOut();
}
function ifNull(val){
    var str="";
    if(val==null||val==""){
        str= ""
    }
    return str
}

function showStars(obj){
    var num=0
    for(var i =0;i<obj.profiles.length;i++){
        if(obj.profiles[i].type=="GoodsOwner"){
            num=obj.profiles[i].stars
            break
        }
    }
    var stars="";
    for(var i=0;i<num;i++){
        stars+="<img src='../images/start.png'/>";
    }
    var noStars=5-num;
    for(var j=0;j<noStars;j++){
        stars+="<img src='../images/icn-hs1.png'>";
    }
    return stars;
}






