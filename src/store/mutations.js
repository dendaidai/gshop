import Vue from "vue"
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  RECEIVE_SEARCH_SHOP,
} from './mutations-types'


export default {
  //更新地址
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },

  //更新食品列表
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },

  //更新商铺列表
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },

  //更新用户信息
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },

  //清除用户信息
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },

  //更新商品列表
  [RECEIVE_SHOP_GOODS](state,{goods}){
    state.goods = goods
  },

  //更新评论列表
  [RECEIVE_SHOP_RATINGS](state,{ratings}){
    state.ratings = ratings
  },

  //更新商家信息
  [RECEIVE_SHOP_INFO](state,{info}){
    state.info = info
  },

  //增加食物数量
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){
      //count数量不存在,为了实现数据绑定效果，需要用Vue.set方法
      Vue.set(food,"count",1)

      //将食物添加到购物车中
      state.cartFoods.push(food)
    }else {
      food.count++
    }
  },

  //减少食物数量
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--

      //当食物的数量为0时，把食物从购物车中移除
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },

  //更新搜索的商铺列表
  [RECEIVE_SEARCH_SHOP](state,{searchShops}){
    state.searchShops = searchShops
  },
}
