import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
} from "../api/index"

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
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
  }
}
