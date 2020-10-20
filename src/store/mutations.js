import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
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
}
