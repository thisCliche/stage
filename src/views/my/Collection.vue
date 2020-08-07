<template>
  <div class="collection">
	   <Swiper>
			 <HeaderTop title="我的收藏"/>
			 <List :arrList="arrList" v-if="arrList.length !=0"/>
			 <div class="nothing" v-else>
				<div></div>
				暂无收藏，快去收藏吧~
			 </div>
	   </Swiper>
  </div>
</template>

<script>
	import Swiper from "../common/Swiper"
	import HeaderTop from "../common/HeaderTop"
	import List from "../common/List"
export default {
  name: '',
  data () {
    return {
      arrList: []
    }
  },
	components: {
		Swiper,
		HeaderTop,
		List
	},
	created() {
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/mall/user/goods/collection",{},"get",token)
		.then(res => {
			// console.log(res);
			if(res.code === 20000){
				this.arrList = res.data;
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
.collection{
	height: 100%;
	.nothing{
		font-size: .3rem;
		color: #666;
		text-align: center;
		margin-top: 2rem;
		div{
			width: 2.8rem;
			height: 2.8rem;
			@include background_img("./images/no.png");
			margin: 0 auto;
		}
	}
}
</style>
