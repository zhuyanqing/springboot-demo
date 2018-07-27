<#if (itemList?size>0)>

    <#list itemList as item>
    <tr class="blank"></tr>
    <tr class="">
        <td class="r1">${item.id!""}</td>
        <td class="r1">${item.user!""}<br/>${item.tel!""}</td>
        <td class="r2 area">
            <#if item.address?exists>
                <#if item.address.province?exists>
                ${item.address.province.name!""}
                </#if>
                <#if item.address.city?exists>
                    -${item.address.city.name!""}
                </#if>
                <#if item.address.county?exists>
                    -${item.address.county.name!""}
                </#if>
            </#if>
        </td>
        <td class="r1">
            <#if item.type==0>
                出租
            <#elseif item.type==1>
                出售
            <#elseif item.type==2>
                托管
            </#if>
        </td>
        <td class="r1">${item.demandEndDate!""}</td>
        <td class="btn">
            <a href="javascript:;" class="vip-detail" onclick="seeMyWarehouseDetail(this)">详情</a><br/><a href="javascript:;" class="vip-refresh" onclick="refreshMyWarehouseDemand('${item.id}',this)">刷新</a>
            <div class="vip-refresh-main">刷新成功！</div>
        </td>
    </tr>
    <tr class="d">
        <td colspan="6">
            <div class="floatL">
                <span>预算费用：
                    <#if item.budget?exists>
                    ${item.budget}元
                    <#else>
                        面议
                    </#if>
                </span><span>标题：${item.title!""}</span>
            </div>
            <div class="floatL">
                <span>存放物品：${item.storeGoods!""}</span>
                <span>刷新时间：
                    ${item.updateDate!""}
                </span>
            </div>
            <div class="floatL">
                <span>存放时间：${item.storeNumber!""}${item.storeUnit!""}</span>
            </div>
            <div class="floatL">
                <span>发布时间：${item.createDate!""}</span>
            </div>
        </td>
    </tr>
</#list>
<script>
    my_warehouseDemand_offset = ${myWarehouseDemandOffset}
            $("#more_my_warehouseDemand_button").show()
</script>

<#else>
<script>
    $("#ajax_my_warehouseDemand_button").hide()
</script>
</#if>