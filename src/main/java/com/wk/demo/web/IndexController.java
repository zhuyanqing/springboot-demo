package com.wk.demo.web;

import com.wk.demo.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value="")
public class IndexController {

    @Autowired
    private RedisService redisService;

    @ResponseBody
    @RequestMapping(value="")
    public String index(){
        System.out.println("this"+this);
        System.out.println(redisService);
        return "hello world!";
    }
}
