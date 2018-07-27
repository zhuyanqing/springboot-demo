package com.wk.demo.rabbitmq.springboot.manyToMany;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "helloQueue")
public class HelloReceiver21 {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("Receiver21  : " + hello);
    }

}