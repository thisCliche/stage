<template>
  <div class="order">
		<Swiper>
			<HeaderTop title="ORDER"/>
			<div class="nothing">
				<div></div>
				You don't have an order yet
			</div>
		</Swiper>
  </div>
</template>

<script>
	import Swiper from "../common/Swiper"
	import HeaderTop from "../common/HeaderTop"
export default {
  name: '',
  data () {
    return {
      
    }
  },
	components: {
		Swiper,
		HeaderTop
	}
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
.order{
	height: 100%;
	.nothing{
		text-align: center;
		font-size: .3rem;
		color: #999;
		margin-top: 2rem;
		div{
			width: 2.75rem;
			height: 2.61rem;
			@include background_img("./images/nothing.png");
			margin: 0 auto;
			margin-bottom: .3rem;
		}
	}
}
</style>
