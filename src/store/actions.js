import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop,
} from "../api/index"

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
} from "./mutations-types"

export default {
  //得到地址信息
  async getAddress({commit,state}){
    const {latitude,longitude} = state
    const localStirng  = `${latitude},${longitude}`
    const rs = await reqAddress(localStirng)

    if(rs.code===0){
      const address = rs.data
      commit(RECEIVE_ADDRESS,{address})
    }

  },

  //得到食品列表
  async getCategorys({commit}){
    const rs = await reqFoodCategorys()

    if(rs.code===0){
      const categorys = rs.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }

  },

  //得到商铺列表
  async getShops({commit,state}){
    const {latitude,longitude} = state
    const rs = await reqShops(longitude,latitude)

    if(rs.code===0){
      const shops = rs.data
      commit(RECEIVE_SHOPS,{shops})
    }

  },

  //得到用户信息
  getUserInfo({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },

  //根据会话获取用户信息
  async getSessionUserInfo({commit}){
    const rs = await reqUserInfo()
    if(rs.code===0){
      const userInfo = rs.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },

  //清除用户信息
  async clearUserInfo({commit}){
    const rs = await reqLogout()
    if(rs.code===0){
      commit(RESET_USER_INFO)
    }
  },

  //更新商品列表
  async getGoods({commit},callback){
    const rs = await reqShopGoods()
    if(rs.code===0){
      const goods = rs.data
      commit(RECEIVE_SHOP_GOODS,{goods})
      callback()
    }
  },

  //更新评论列表
  async getRatings({commit}){
    const rs = await reqShopRatings()
    if(rs.code===0){
      const ratings = rs.data
      commit(RECEIVE_SHOP_RATINGS,{ratings})
    }
  },

  //更新商品信息
  async getInfo({commit}){
    const rs = await reqShopInfo()
    if(rs.code===0){
      const info = rs.data
      commit(RECEIVE_SHOP_INFO,{info})
    }
  },

  //更新食物数量
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  //更新搜索的商品列表
  async getSearchShop({commit,state},keyword){
    const {latitude,longitude} = state
    const localStirng  = `${latitude},${longitude}`
    const rs = await reqSearchShop(localStirng,keyword)
    if(rs.code===0){
      const searchShops = rs.data
      commit(RECEIVE_SEARCH_SHOP,{searchShops})
    }
  },
}
