package com.wk.demo.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2018/7/26 0026.
 */
@Service
public class RedisService {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Resource(name = "stringRedisTemplate")
    private ValueOperations<String, String> valOpsStr;

    public boolean set(String key, String value) {
        valOpsStr.set(key, value);
        return true;
    }
    public String get(String key) {
        return valOpsStr.get(key);
    }
    public boolean setMinutes(String key, String value,int mins) {
        valOpsStr.set(key, value, mins, TimeUnit.MINUTES);
        return true;
    }
    public boolean setSeconds(String key, String value,int secs) {
        valOpsStr.set(key, value, secs, TimeUnit.SECONDS);
        return true;
    }
    public void delete(String key){
        stringRedisTemplate.delete(key);
    }
}
