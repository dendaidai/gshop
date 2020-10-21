import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
} from "./mutations-types"


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
}
