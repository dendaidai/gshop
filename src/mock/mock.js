/*
* 使用mock模拟数据
* */

import Mock from "mockjs"
import data from "./data.json"

Mock.mock("/shop_goods",{code: 0,data: data.goods})    //商品接口
Mock.mock("/shop_ratings",{code: 0,data: data.ratings})     //评论接口
Mock.mock("/shop_info",{code: 0,data: data.info})      //商家信息
