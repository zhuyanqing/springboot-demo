package com.wk.demo.utils;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by zhuyanqing on 2016/3/9.
 */
public class SysUtil {

    public static JSONObject responseSuccess(JSONObject jsonObject, String msg) {
        jsonObject.put("code", 200);
        jsonObject.put("msg", msg);
        return jsonObject;
    }

    public static JSONObject responseFail(JSONObject jsonObject, String msg, int code) {
        jsonObject.put("code", code);
        jsonObject.put("msg", msg);
        return jsonObject;
    }



}
