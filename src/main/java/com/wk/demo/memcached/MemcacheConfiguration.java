package com.wk.demo.memcached;

import com.danga.MemCached.MemCachedClient;
import com.danga.MemCached.SockIOPool;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author zh
 * @Description Memcache配置
 */
@Configuration
public class MemcacheConfiguration {

    @Value("${memcached.servers}")
    private String[] servers;
    @Value("${memcached.failover}")
    private boolean failover;
    @Value("${memcached.initConn}")
    private int initConn;
    @Value("${memcached.minConn}")
    private int minConn;
    @Value("${memcached.maxConn}")
    private int maxConn;
    @Value("${memcached.maintSleep}")
    private int maintSleep;
    @Value("${memcached.nagel}")
    private boolean nagel;
    @Value("${memcached.socketTO}")
    private int socketTO;
    @Value("${memcached.aliveCheck}")
    private boolean aliveCheck;

    @Bean
    public SockIOPool sockIOPool () {
        SockIOPool pool = SockIOPool.getInstance();
        pool.setServers(servers);
        pool.setFailover(failover);
        pool.setInitConn(initConn);
        pool.setMinConn(minConn);
        pool.setMaxConn(maxConn);
        pool.setMaintSleep(maintSleep);
        pool.setNagle(nagel);
        pool.setSocketTO(socketTO);
        pool.setAliveCheck(aliveCheck);
        pool.initialize();
        return pool;
    }

    @Bean
    public MemCachedClient memCachedClient(){
        return new MemCachedClient();
    }

}