package com.wk.demo.rabbitmq.nomal;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.QueueingConsumer;

import java.util.concurrent.TimeoutException;

/**
 * Created by Administrator on 2018/7/26 0026.
 */
public class Consumer {
    private final static String QUEUE_NAME = "hello2";

    public static void main(String[] argv) throws java.io.IOException,
            java.lang.InterruptedException, TimeoutException {
        /* 建立连接 */
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");// MQ的IP
        factory.setPort(5672);// MQ端口
        factory.setUsername("guest");// MQ用户名
        factory.setPassword("guest");// MQ密码
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        /* 声明要连接的队列 */
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println("等待消息产生：");

        /* 创建消费者对象，用于读取消息 */
        QueueingConsumer consumer = new QueueingConsumer(channel);
        channel.basicConsume(QUEUE_NAME, true, consumer);
        int i=1;
        /* 读取队列，并且阻塞，即在读到消息之前在这里阻塞，直到等到消息，完成消息的阅读后，继续阻塞循环 */
        while (true) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());
            System.out.println("第"+i+"个消息！");
            System.out.println("收到消息'" + message + "'");
            i++;
            Thread.sleep(1000);
        }
    }
}
