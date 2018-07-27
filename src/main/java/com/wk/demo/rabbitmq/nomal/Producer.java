package com.wk.demo.rabbitmq.nomal;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
/**
 * Created by Administrator on 2018/7/26 0026.
 */
public class Producer {
    private final static String QUEUE_NAME = "hello2";// 队列名不能重复 之前已有就会失败

    public static void main(String[] argv) throws java.io.IOException,Exception {
        /* 使用工厂类建立Connection和Channel，并且设置参数 */
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");// MQ的IP
        factory.setPort(5672);// MQ端口
        factory.setUsername("guest");// MQ用户名
        factory.setPassword("guest");// MQ密码
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        /* 创建消息队列，并且发送消息 */
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        for (int i = 0; i < 10; i++) {
            String message = "生成消息"+i;
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println("生产了个'" + message + "'");
        }
        /* 关闭连接 */
        channel.close();
        connection.close();
    }
}
