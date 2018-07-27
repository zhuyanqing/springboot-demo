<#if (itemList?size>0)>

    <#list itemList as item>
        <tr class="blank"></tr>
        <tr class="">
            <td class="r1">${item.id}</td>
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
            <#--0:出租、1：出售、2：托管-->
                <#if item.type==0>
                    出租
                <#elseif item.type==1>
                    出售
                <#elseif item.type==2>
                    托管
                </#if>
            </td>
            <td class="r1">${item.updateDate!""}</td>
            <td class="btn">
                <a href="javascript:;" class="vip-detail" onclick="seeMyWarehouseDetail(this)">详情</a><br/><a href="javascript:;" class="vip-refresh" onclick="refreshMyWarehouse('${item.id}',this)">刷新</a>
                <div class="vip-refresh-main">刷新成功！</div>
            </td>
        </tr>
        <tr class="d">
            <td colspan="6">
                <div class="floatL">
                    <span>仓库规格：${item.spec.label}</span><span>仓库用途：${item.purpose.label}</span>
                </div>
            </td>
        </tr>
    </#list>
<script>
    my_warehouse_offset = ${myWarehouseOffset}
    $("#more_my_warehouse_button").show()
</script>

<#else>
<script>
    $("#ajax_my_warehouse_button").hide()
</script>
</#if>