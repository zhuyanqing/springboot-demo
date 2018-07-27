package com.wk.demo.rabbitmq.springboot;

import com.wk.demo.rabbitmq.springboot.callback.CallBackSender;
import com.wk.demo.rabbitmq.springboot.classObject.UserSender;
import com.wk.demo.rabbitmq.springboot.fanout.FanoutSender;
import com.wk.demo.rabbitmq.springboot.manyToMany.HelloSender21;
import com.wk.demo.rabbitmq.springboot.manyToMany.HelloSender22;
import com.wk.demo.rabbitmq.springboot.oneToMany.HelloSender1;
import com.wk.demo.rabbitmq.springboot.oneToOne.HelloSender;
import com.wk.demo.rabbitmq.springboot.topic.TopicSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 文档       https://www.cnblogs.com/boshen-hzb/p/6841982.html
 */
@Controller
@RequestMapping(value="/r")
public class RabbitController {



    @Autowired
    private HelloSender helloSender;
    @Autowired
    private HelloSender1 helloSender1;
    @Autowired
    private HelloSender21 helloSender21;
    @Autowired
    private HelloSender22 helloSender22;


    /**
     * 单生产者-单消费者
     */
    @GetMapping("/oneToOne")
    public void hello() {
        helloSender.send();
    }

    /**
     * 单生产者-多消费者
     */
    @GetMapping("/oneToMany")
    public void oneToMany() {
        for(int i=0;i<10;i++){
            helloSender1.send("hellomsg:"+i);
        }
    }

    /**
     * 多生产者-多消费者
     */
    @GetMapping("/manyToMany")
    public void ManyToMany() {
        for(int i=0;i<10;i++){
            helloSender21.send();
            helloSender22.send();
        }
    }

    @Autowired
    private UserSender userSender;

    /**
     * 实体类传输测试
     */
    @GetMapping("/user")
    public void userTest() {
        userSender.send();
    }

    @Autowired
    private TopicSender topicSender;

    /**
     * topic exchange类型rabbitmq测试
     */
    @GetMapping("/topic")
    public void topicTest() {
        topicSender.send();
    }

    @Autowired
    private FanoutSender fanoutSender;
    /**
     * fanout exchange类型rabbitmq测试
     */
    @GetMapping("/fanout")
    public void fanoutTest() {
        fanoutSender.send();
    }

    @Autowired
    private CallBackSender callBackSender;

    @GetMapping("/callback")
    public void callbak() {
        callBackSender.send();
    }


}
