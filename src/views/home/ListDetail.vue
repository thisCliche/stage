<template>
  <div class="listDetail">
		<Swiper>
			<HeaderTop :title="name"/>
			<List :arrList="arrList"/>
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
      name: "",
			arrList: []
    }
  },
	components: {
		Swiper,
		HeaderTop,
		List
	},
	created() {
		this.name = this.$route.query.name;
		this.baseJs.ajaxReq("/mall/goods/recommend",{},"get","")
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
.listDetail{
	height: 100%;
}
</style>
