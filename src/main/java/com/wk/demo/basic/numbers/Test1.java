package com.wk.demo.basic.numbers;

import org.junit.Test;

/**
 * Created by Administrator on 2018/8/4.
 */
public class Test1 {
    public static void main(String[] args) {
        System.out.println(1*0.1);
        System.out.println(2*0.1);
        System.out.println(3*0.1);
        System.out.println(6*0.1);
        System.out.println(3*0.2);
        System.out.println(3*0.4);
        System.out.println(2*0.3);
        System.out.println(3*0.3);

        System.out.println(3*0.1==0.3);
        System.out.println(2*0.1==0.2);
        System.out.println(2*0.1+2*0.1==0.4);
        System.out.println(2*0.1+2*0.1+2*0.1==0.4+2*0.1);
        System.out.println(2*0.1+2*0.1+2*0.1==0.6);
        System.out.println(2*0.1+2*0.1+2*0.1+2*0.1+2*0.1==1.2);

        System.out.println("----------------------------");
        System.out.println(2*0.1+2*0.1+2*0.1);
        System.out.println(0.4+2*0.1);
        System.out.println(2*0.1+2*0.1+2*0.1+2*0.1+2*0.1==1.2);


        float a =1.32344435f;
        System.out.println(a);


        int a2 = 358;
        double b2 = 0.1;
        System.out.println(a2*b2);

        double a3 = 358.0d;
        double b3 = 0.1d;
        System.out.println(a3*b3);
    }

    @Test
    public void test(){
        double i=0.3;
        StringBuffer stringBuffer=new StringBuffer("0.");
        while (stringBuffer.length()<50){
            double x = (i-(int)i)*2;
            if((int)x>0){
                stringBuffer.append(String.valueOf((int)x));
                i = x - (int)x;
            }else {
                stringBuffer.append("0");
                i = x;
            }
        }
        System.out.println(stringBuffer.toString());
//        return stringBuffer.toString();
    }


}

