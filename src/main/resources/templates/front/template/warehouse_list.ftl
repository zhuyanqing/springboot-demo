

<#if (itemList?size>0)>

    <#list itemList as item>
    <li>
        <div class="storageList-supply-conImg">
            <span>
                <a href="javascript:;">

                    <#if item.image?exists>
                        <img width="232" height="233" src="${item.image}"/>
                    <#else>
                        <img src="../fodder/storeSup.jpg"/>
                    </#if>
                </a>
            </span>
        </div>
        <div class="storageList-supply-conText">
            <p><a href="javascript:;">
                <#if item.spec?exists>
                    ${item.spec.label!""}
                </#if>
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
            <span title="">联系人：
            ${item.user!""}
            </span>
            <label title="">电话：
            ${item.tel!""}
            </label>
        </div>
    </li>

    </#list>
    <script>
        offset = ${offset}
        $("#more_warehouse_button").show()
    </script>

<#else>
    <script>
        $("#ajax_warehouse_button").hide()
    </script>
</#if>