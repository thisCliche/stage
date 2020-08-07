<template>
  <div class="tabbar">
      <ul>
          <li @click="goHome">
              <span class="home" :class="{active:this.$route.name==='home'}"></span>
              <p :class="{active:this.$route.name==='home'}">HOME</p>
          </li>
          <li @click="goAll">
              <span class="all" :class="{active:this.$route.name==='all'}"></span>
              <p :class="{active:this.$route.name==='all'}">DISCOVER</p>
          </li>
		  <li @click="goShopCart">
		      <span class="shopcart" :class="{active:this.$route.name==='shopcart'}"></span>
		      <p :class="{active:this.$route.name==='shopcart'}">SHOPPING</p>
		  </li>
		  <li @click="goMy">
		      <span class="my" :class="{active:this.$route.name==='my'}"></span>
		      <p :class="{active:this.$route.name==='my'}">PERSONAL</p>
		  </li>
      </ul>
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
      goHome() {
          this.$router.push("/home");
      },
	  goAll() {
		  this.$router.push("/all");
	  },
	  goShopCart() {
		  this.$router.push("/shopcart");
	  },
	  goMy() {
	      this.$router.push("/my");
	  },
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.tabbar{
    width: 100%;
    height: 1rem;
    padding-top: .1rem;
    background: #fff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    ul{
        display: flex;
        li{
            width: 25%;
            text-align: center;
            font-size: .24rem;
			color: #d6d3d8;
			span{
				display: inline-block;
				width: .40rem;
				height: .44rem;
				&.home{
					@include background_img("./images/home.png");
					&.active{
					    @include background_img("./images/home_active.png");
					}
				}
				&.all{
					height: .46rem;
				    @include background_img("./images/all.png");
				    &.active{
				        @include background_img("./images/all_active.png");
				    }
				}
				&.shopcart{
				    @include background_img("./images/shopcart.png");
				    &.active{
				        @include background_img("./images/shopcart_active.png");
				    }
				}
				&.my{
				    @include background_img("./images/my.png");
				    &.active{
				        @include background_img("./images/my_active.png");
				    }
				}
			}
            p.active{
                color: #d81e06;
            }
        }
    }
}
</style>