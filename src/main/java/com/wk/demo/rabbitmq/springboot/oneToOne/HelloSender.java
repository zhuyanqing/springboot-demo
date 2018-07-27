package com.wk.demo.rabbitmq.springboot.oneToOne;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by Administrator on 2018/7/26 0026.
 */
@Component
public class HelloSender {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send() {
        String sendMsg = "hello " + new Date();
        System.out.println("Sender : " + sendMsg);
        this.rabbitTemplate.convertAndSend("helloQueue", sendMsg);
    }
}
