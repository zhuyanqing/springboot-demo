package com.wk.demo.memcached;

import com.danga.MemCached.MemCachedClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

/**
 * Created by Administrator on 2018/7/26 0026.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringbootMemcacheApplicationTests {

    @Autowired
    private MemCachedClient memCachedClient;

    @Test
    public void contextLoads() throws InterruptedException {
        // 放入缓存
        boolean flag = memCachedClient.set("a", 1);
        // 取出缓存
        Object a = memCachedClient.get("a");
        System.out.println(a);

        // 3s后过期
        memCachedClient.set("b", "2", new Date(3000));
        Object b = memCachedClient.get("b");
        System.out.println(b);

        Thread.sleep(3000);
        b = memCachedClient.get("b");
        System.out.println(b);

    }
}
