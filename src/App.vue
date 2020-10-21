<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  components:{
    FooterGuide
  },
  mounted () {
    this.$store.dispatch("getAddress")
    this.$store.dispatch("getSessionUserInfo")
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    color : red
</style>
