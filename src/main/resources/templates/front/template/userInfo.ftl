<dl>
<#if user?exists> <#if user.image??>
    <img src="${user.image!}" width="120" height="120"> <#else>
    <img src="../../fodder/vip3.jpg" width="120" height="120">
</#if>
    <dt>${user.name!}&nbsp;&nbsp;&nbsp;${user.loginName!}</dt>
<#else>
    <img src="../../fodder/vip3.jpg" width="120" height="120">
    姓名&nbsp; &nbsp; &nbsp;12345678912
</#if>

    <dd class="lf-con">
        <ol>
        <#if user?exists>
            <#if profileList?exists>
             <#if profileList?size gt 0>
                <#list profileList as profile>
                    <li>
									<span class="lf">
										<#if profile.type=="CarOwner">车主
                                        <#elseif profile.type=="GoodsOwner">货主
                                        <#elseif profile.type=="Driver">司机
                                        <#elseif profile.type=="GoodsProxy">货代
                                        </#if>：
									</span>
									 <span class="rf">
									 <#if profile.stars gt 0>
									    <#list profile.stars..0 as n>
                                            <img src="../images/icn-hs2.png" />
                                        </#list>
									 </#if>
                                         <#list ((5-profile.stars)..1) as n>
                                             <img src="../images/icn-hs1.png" />
                                         </#list>
									</span>
                    </li>
                </#list>
                </#if>
            </#if>
        </#if>
        </ol>

    </dd>
    <dd>
        <ul>
        <#if (goodsOwnerAuth?exists)>
            <#list goodsOwnerAuth as gAuther>
                <li>
                    <span>${gAuther.label}</span>
                    <#if itemList?exists>
                        <#if itemList?size gt 0>
                            <#assign flag=false/>
                            <#list itemList as item>
                                <#if item.name?contains(gAuther.value)>
	                                <#if item.checkStatus=='1'>
	                                 <a class="vip_img2"></a>
	                                <#else>
	                                <a class="vip_img1"></a>
	                                </#if>
                                   <#assign flag=true/>
                                    <#break>
                                </#if>
                            </#list>
                            <#if !flag>
                                <a class="vip_img1"></a>
                            </#if>
                        <#else>
                            <a class="vip_img1"></a>
                        </#if>
                    <#else>
                        <a class="vip_img1"></a>
                    </#if>
                </li>
            </#list>
        </#if>


        <#if carOwnerAuth?exists>
            <#list carOwnerAuth as cAuther>
                <li>
                    <span>${cAuther.label}</span>
                    <#assign flag=false/>
                    <#if itemList?exists>
                        <#if itemList?size gt 0>
                            <#list itemList as item>
                                <#if item.name?contains(cAuther.value)>
                                    <#if item.checkStatus=='1'>
	                                 <a class="vip_img2"></a>
	                                <#else>
	                                <a class="vip_img1"></a>
	                                </#if>
                                    <#assign flag=true/>
                                    <#break>
                                </#if>
                            </#list>
                            <#if !flag>
                                <a class="vip_img1"></a>
                            </#if>
                        <#else>
                            <a class="vip_img1"></a>
                        </#if>
                    <#else>
                        <a class="vip_img1"></a>
                    </#if>
                </li>
            </#list>
        </#if>
        </ul>
    </dd>
</dl>
<div class="cls"></div>