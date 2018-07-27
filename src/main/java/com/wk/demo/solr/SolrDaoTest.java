package com.wk.demo.solr;

/**
 * Created by Administrator on 2018/7/25 0025.
 */
public class SolrDaoTest {

    public static void main(String[] args){
        try {
            SolrDao solrDao = new SolrDao();
            solrDao.addDefaultField();
            // solrDao.addDynamicField();
            //solrDao.delIndex("10805080481");
           /* Book book = new Book();
            book.setId("20805080481");
            book.setName("三水浒传");
            book.setAuthor("施耐庵");
            book.setCat("book2");
            book.setPrice(100.2);
            solrDao.addIndex(book);*/

            /*Book book = new Book();
            book.setId("20805080481");
            book.setName("三水浒传后传");
            book.setAuthor("施耐庵儿子");
            book.setCat("book3");
            book.setPrice(100.2);
            solrDao.updateIndex(book);
            */
            solrDao.findIndex();

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
