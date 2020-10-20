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
  }
}
