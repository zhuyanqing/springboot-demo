<#if (itemList?size>0)>

    <#list itemList as item>

        <tr class="blank"></tr>
        <tr>
            <td class="l1">
                <p>需要在【
                    <#if item.address?exists>
                        <#if item.address.province?exists>
                        ${item.address.province.name!""}
                        </#if>
                        <#if item.address.city?exists>
                            /${item.address.city.name!""}
                        </#if>
                        <#if item.address.county?exists>
                            /${item.address.county.name!""}
                        </#if>
                    </#if>

                    】
                    <#if item.type==0>
                        租赁
                    <#elseif item.type==1>
                        买
                    <#elseif item.type==2>
                        托管
                    </#if>
                    <label title='${item.title!""}'>
                    【
                    <#if item.title?length<18>
                        ${item.title!""}
                    <#else>
                        ${item.title?substring(0,18)}...
                    </#if>
                    】
                    </label>
                </p>
                <p>
                    <span title="">存放地点：
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
                    </span>
                    <span title="">存放时间：
                        ${item.storeNumber!""}
                        ${item.storeUnit!""}
                    </span>
                    <span title="">仓库规格：
                        ${item.spec.label!""}
                    </span>
                    <span title="">存放货品：
                        ${item.storeGoods!""}
                    </span>
                    <span title="">预算费用：
                        <#if item.budget?exists>
                            ${item.budget!""}元
                        <#else>
                            面议
                        </#if>
                    </span>
                </p>
            </td>
            <td class="l2">需求截止时间：${item.demandEndDate!""}</td>
            <td><a href="javascript:;" class="check" onclick="checkWarehouseDemandTel(${item.id})">查看联系方式</a></td>
        </tr>
        <tr class="contact-way">
            <td colspan="3">联系人：${item.user!""}&nbsp;&nbsp;&nbsp;&nbsp;   联系电话：${item.tel!""}</td>
        </tr>
    </#list>
<script>
    demandOffset = ${demandOffset}
    $("#more_warehouseDemand_button").show()
</script>

<#else>
<script>
    $("#ajax_warehouseDemand_button").hide()
</script>
</#if>