import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
} from "../api/index"

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
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
}
