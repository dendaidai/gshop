<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current:index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click.stop="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import {mapState} from "vuex"
import BScroll from "@better-scroll/core"
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/ShopCart/ShopCart'
export default {
  data(){
    return{
      scrollY: 0,     //食物列表的垂直滑动距离
      tops: [],       //食物列表的每个分类模块的top值
      food: {},       //添加的食物
    }
  },
  computed:{
    ...mapState(["goods"]),

    //计算右侧食品列表滑动时，左侧分类列表所对应的位置
    currentIndex(){
      const {scrollY,tops} = this

      const current_index = tops.findIndex((top,index)=>{
        return (scrollY>=top && scrollY<tops[index+1]) || (scrollY>=top && !tops[index+1])
      })

      return current_index
    }
  },
  mounted(){
    this.$store.dispatch("getGoods",()=>{
      //在视图更新完成调用nextTick中的回调函数
      this.$nextTick(()=>{
        new BScroll(".menu-wrapper",{
          click: true,
        })
        this.foodScroll = new BScroll(".foods-wrapper",{
          probeType:2,      //惯性滑动时不触发
          click: true,
        })
        //刷新滚动条
        /*this.foodScroll.refresh()*/

        /*console.log(this.foodScroll)*/
        //绑定scroll事件的监听，得到scrollY
        this.foodScroll.on('scroll',({x,y})=>{
          this.scrollY = Math.abs(y)
          /*console.log(x,y)*/
        })

        //绑定scrollEnd事件的监听,解决惯性滑动的bug
        this.foodScroll.on('scrollEnd',({x,y})=>{
          this.scrollY = Math.abs(y)
        })

        //得到tops
        const lis = this.$refs.foodsUl.children
        let top = 0
        Array.prototype.slice.call(lis).forEach(li=>{
          this.tops.push(top)
          top = top+li.clientHeight
        })

        /*console.log(this.tops)*/
      })
    })
  },
  methods:{
    clickMenuItem(index){
      const scrollY = -this.tops[index]
      this.scrollY = -scrollY
      this.foodScroll.scrollTo(0,scrollY,300)
    },
    showFood(food){
      //显示食物组件
      this.$refs.food.toggleShow()
      //更新this.food的值
      this.food = food
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart,
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $green
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
