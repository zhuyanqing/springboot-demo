package com.wk.demo.solr;

import org.apache.solr.client.solrj.beans.Field;

/**
 * Created by Administrator on 2018/7/25 0025.
 */
public class Book {
    @Field("id")
    private String id;
    @Field("cat")
    private String cat;
    @Field("name")
    private String name;
    //@Field("subName")
    private String subName;
    @Field("price")
    private Double price;
    @Field("inStock")
    private String inStock;
    @Field("author")
    private String author;

    public String getSubName() {
        return subName;
    }

    public void setSubName(String subName) {
        this.subName = subName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCat() {
        return cat;
    }

    public void setCat(String cat) {
        this.cat = cat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getInStock() {
        return inStock;
    }

    public void setInStock(String inStock) {
        this.inStock = inStock;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
