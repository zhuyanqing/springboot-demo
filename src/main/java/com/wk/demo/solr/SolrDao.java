package com.wk.demo.solr;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/7/25 0025.
 */
public class SolrDao {
    private static String url = "http://localhost:8983/solr/jcg";
    private static String url2 = "http://localhost:8080/solr/jcg";


    // 添加默认索引属性
    public void addDefaultField() throws SolrServerException, IOException {
        // 声明要连接solr服务器的地址
        SolrClient solr = new HttpSolrClient(url);
        SolrInputDocument doc = new SolrInputDocument();
        doc.addField("id", "10805080481");
        doc.addField("cat", "book2");
        doc.addField("name", "三国演义");
        doc.addField("price", "100.1");
        doc.addField("author", "luoguanzhong");

        solr.add(doc);
        solr.commit();
    }

    // 添加动态索引属性
    public void addDynamicField() throws SolrServerException, IOException {
        // 声明要连接solr服务器的地址
        SolrClient solr = new HttpSolrClient(url);
        SolrInputDocument doc = new SolrInputDocument();
        doc.addField("id", "10805080481");
        doc.addField("series_t", "动态字段的StringField类型格式为*_s");
        solr.add(doc);
        solr.commit();
    }

    // 添加索引
    public void addIndex(Book product) throws SolrServerException, IOException {
        // 声明要连接solr服务器的地址
        SolrClient solr = new HttpSolrClient(url);
        solr.addBean(product);
        solr.commit();
    }

    // 更新索引
    public void updateIndex(Book product) throws IOException, SolrServerException {
        // 声明要连接solr服务器的地址
        SolrClient solr = new HttpSolrClient(url);
        solr.addBean(product);
        solr.commit();
    }

    // 删除索引
    public void delIndex(String id) throws SolrServerException, IOException {
        // 声明要连接solr服务器的地址
        SolrClient solr = new HttpSolrClient(url);
        solr.deleteById(id);
        // solr.deleteByQuery("id:*");
        solr.commit();
    }

    // 查找索引
    public void findIndex() throws Exception {
        // 声明要连接solr服务器的地址
        SolrClient solr = new HttpSolrClient(url);

        // 查询条件
        SolrQuery solrParams = new SolrQuery();
        solrParams.setStart(0);
        solrParams.setRows(10);
//        solrParams.setQuery("name:*三 +author:施耐庵");
        solrParams.setQuery("name:*三");
//        solrParams.setQuery("name:\"*of\"");
//        solrParams.setQuery("name:\"A\"");
 //       solrParams.setQuery("*&fq=price:[0 TO 6]");
        // 开启高亮
        solrParams.setHighlight(true);
        solrParams.setHighlightSimplePre("<font color='red'>");
        solrParams.setHighlightSimplePost("</font>");

        // 设置高亮的字段
        solrParams.setParam("hl.fl", "name,author");
        // SolrParams是SolrQuery的子类
        QueryResponse queryResponse = solr.query(solrParams);

        // (一)获取查询的结果集合
        SolrDocumentList solrDocumentList = queryResponse.getResults();

        // (二)获取高亮的结果集
        // 第一个Map的键是文档的ID，第二个Map的键是高亮显示的字段名
        Map<String, Map<String, List<String>>> highlighting = queryResponse.getHighlighting();

        for (SolrDocument solrDocument : solrDocumentList) {
            System.out.println("=====" + solrDocument.toString());
            Map<String, List<String>> fieldsMap = highlighting.get(solrDocument.get("id"));
            List<String> highname = fieldsMap.get("name");
            List<String> highdesc = fieldsMap.get("author");
            System.out.println("highname======" + highname);
            System.out.println("highdesc=====" + highdesc);
        }

        // (三) 将响应结果封装到Bean
        List<Book> products = queryResponse.getBeans(Book.class);

        System.out.println(products + "+++++++++++");
        for (Book product : products) {
            System.out.println(product);
        }
    }
}
