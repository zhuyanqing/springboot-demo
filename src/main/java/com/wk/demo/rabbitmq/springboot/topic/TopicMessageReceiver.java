package com.wk.demo.rabbitmq.springboot.topic;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
/**
 * Created by Administrator on 2018/7/26 0026.
 */
@Component
@RabbitListener(queues = "topic.message")
public class TopicMessageReceiver {
    @RabbitHandler
    public void process(String msg) {
        System.out.println("topicMessageReceiver  : " +msg);
    }
}
