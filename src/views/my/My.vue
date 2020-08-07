<template>
  <div class="my">
    <Swiper>
      <div class="top">
				<img src="./images/header.png" alt="">
				<span @click="goLogin" v-if="!isLogin">Login/Registered</span>
				<span v-if="isLogin">{{ phone }}</span>
			</div>
			<ul>
				<li @click="goAddress">
					<van-cell title="Address" icon="location-o" color="#fff" is-link/>
				</li>
				<li @click="goOrder">
					<van-cell title="Order" icon="orders-o" is-link/>
				</li>
				<li @click="goCollection">
					<van-cell title="Service" icon="friends-o" is-link/>
				</li>
				<li @click="goSet">
					<van-cell title="Set Up" icon="setting-o" is-link/>
				</li>
			</ul>
    </Swiper>  
	<van-popup position="bottom" closeable round close-icon-position="top-right" v-model="show">Customer service call: 0551-8338669</van-popup>
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
export default {
 name: "personal-center",
  data () {
    return {
      phone: "",
	  	isLogin: false,
	  	show:false
    }
  },
  components: {
    Swiper
  },
  computed: {},
  watch: {},
  methods: {
	// 我的地址
	goAddress() {
		this.$router.push("/address");  
	},
	// 我的订单
	goOrder() {
		this.$router.push("/order");
	},
	// 我的收藏
	goCollection() {
		this.show = true;
	},
    // 设置
    goSet() {
      this.$router.push("/set");
    },
    // 登录/注册
    goLogin() {
      this.$router.push("/login");
    },
    // 隐藏手机中间四位
		geTel(tel) {
			return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
		}
  },
  created () {
    this.phone = localStorage.getItem("phone");
		if(this.phone != null){
      this.phone = this.geTel(this.phone);
      this.isLogin = true;
		}
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.my{
  height: 100%;
  padding-bottom: 1rem;
	.van-popup{
		padding:1rem .3rem;
	}
	.top{
		span{
			color: #fff;
		}
		width: 100%;
		height: 2.57rem;
		background: url(./images/header_bg.png) center no-repeat;
		background-size: 100% 100%;
		border-radius: 0 0 .7rem .7rem;
		font-size: .38rem;
		padding: .25rem;
		padding-top: 0.6rem;
		img{
			width: 1.16rem;
			height: 1.16rem;
			vertical-align: middle;
			margin-right: .1rem;
		}
	}
	ul{
		margin-top: .6rem;
		li{
			margin-bottom: .2rem;
			.van-cell__title{
				font-size: .3rem;
				line-height: 0.88rem;
    			color: #999999;
			}
			.van-cell__left-icon{
				margin-right: .3rem;
				color: #fff;
				width: 0.88rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				background: url(./images/list_bg.png) center no-repeat;
				background-size: .88rem .88rem;
			}
			.van-icon{
				font-size: .36rem;
				line-height: 0.88rem;
			}
			.van-cell__right-icon{
				color: #999999;
			}
		}
	}
}
</style>