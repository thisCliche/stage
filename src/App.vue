<template>
  <div id="app">
    <transition name="van-fade">
      <keep-alive include="shop-cart,all-page,home-page">
      <router-view/>
      </keep-alive>
    </transition>
    <Tabbar v-if="show"/>
  </div>
</template>

<script>
import Tabbar from './views/common/Tabbar'
export default {
  name: "App",
  data() {
    return {
      show: true
    }
  },
  watch: {
    $route(to,from){
      if(to.name === "home" || to.name === "all" || to.name === "shopcart" || to.name === "my"){
        this.show = true;
      }else{
        this.show = false;
      }
    }
  },
  components: {
    Tabbar
  },
  created() {
    if(this.$route.to === "home" || this.$route.to === "all" || this.$route.to === "shopcart" || this.$route.to === "my"){
      this.show = true;
    }else{
      this.show = false;
    }
  }
}
</script>
<style lang="scss" scoped>
  #app{font-size: 0.32rem;}
</style>
