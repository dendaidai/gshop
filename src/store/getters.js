export default {
  //食品分页
  getPageArrs(state){
    //二维数组
    const allArr = []
    //临时数组
    let temp = []
    //食品列表
    const categorys = state.categorys

    categorys.forEach(food =>{
      if(temp.length===0){
        allArr.push(temp)
      }

      temp.push(food)

      if(temp.length===8){
        temp = []
      }
    })

    //清除temp的引用
    temp = []

    return allArr
  },

  //计算购物车中食物的数量
  totalCount(state){
    const count = state.cartFoods.reduce((totalCount,food)=>{
      return totalCount+food.count
    },0)
    return count
  },

  //计算购物车中的总价格
  totalPrice(state){
    const price = state.cartFoods.reduce((totalPrice,food)=>{
      return totalPrice+food.count*food.price
    },0)
    return price
  },
}
