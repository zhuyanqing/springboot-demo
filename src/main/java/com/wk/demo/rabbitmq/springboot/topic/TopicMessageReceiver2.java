package com.wk.demo.rabbitmq.springboot.topic;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2018/7/26 0026.
 */
@Component
@RabbitListener(queues = "topic.messages")
public class TopicMessageReceiver2 {
    @RabbitHandler
    public void process(String msg) throws Exception{
        Thread.sleep(2000);
        System.out.println("topicMessageReceiver2  : " +msg);
    }
}
