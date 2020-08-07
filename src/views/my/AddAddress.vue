<template>
  <div class="addAddress">
		<Swiper>
		 <HeaderTop title="ADDRESS MANAGEMENT"/>
		 <ul>
			 <li class="van-hairline--bottom">
				<span>CONSIGNEE</span><input type="text" placeholder="name" v-model="name">
			 </li>
			 <li class="van-hairline--bottom">
			 	<span>MOBILE</span><input type="tel" placeholder="Add phone number" v-model="phone">
			 </li>
			 <li class="van-hairline--bottom">
			 	<span>DETAILED ADDRESS</span><input type="text" placeholder="Please enter the address" v-model="address">
			 </li>
		 </ul>
		 <div class="btn" @click="goSave">
			 SAVE
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
      name: "",
	  phone: "",
	  address: "",
	  id: ""
    }
  },
	components: {
		Swiper,
		HeaderTop
	},
	methods: {
		// 保存
		goSave() {
			if(this.name === ""){
				this.$toast({
					message: "Please enter name!",
					duration: 1000
				});
			}else if(this.phone === ""){
				this.$toast({
					message: "Please enter your mobile phone number！",
					duration: 1000
				});
			}else if(this.address === ""){
				this.$toast({
					message: "Please enter the detailed address!",
					duration: 1000
				});
			}else{
				let token = localStorage.getItem("token");
				if(this.id != undefined){
					let data = {
						name: this.name,
						phone: this.phone,
						address: this.address
					}
					this.baseJs.httpReq("/mall/user/address",this.id,data,"put",token)
					.then(res => {
						// console.log(res);
						if(res.code === 20000){
							this.$toast({
								message: "Edit succeeded!",
								duration: 1000
							});
							this.$router.push("/address");
						}
					})
					.catch(err => {
						console.log(err);
					})
				}else{
					let data = {
						name: this.name,
						phone: this.phone,
						address: this.address
					};
					this.baseJs.ajaxReq("/mall/user/address",data,"post",token)
					.then(res => {
						// console.log(res);
						if(res.code === 20000){
							this.$toast({
								message: "Added successfully!",
								duration: 1000
							});
							this.$router.push("/address");
						}
					})
					.catch(err => {
						console.log(err);
					})
				}
			}
		}
	},
	created() {
		this.id = this.$route.query.id;
		if(this.id != undefined){
			let token = localStorage.getItem("token");
			this.baseJs.httpReq("/mall/user/address",this.id,{},"get",token)
			.then(res => {
				// console.log(res);
				if(res.code === 20000){
					this.name = res.data.name;
					this.phone = res.data.phone;
					this.address = res.data.address;
				}
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
.addAddress{
	height: 100%;
	ul{
		margin: 0 .3rem;
		margin-top: .6rem;
		li{
			font-size: .26rem;
			padding-bottom: .24rem;
			margin-bottom: .36rem;
			span{margin-right: .4rem;}
			i{
				display: inline-block;
				margin-bottom: -.06rem;
				margin-right: .24rem;
				&.icon_1{
					width: .29rem;
					height: .33rem;
					@include background_img("./images/icon_1.png");
				}
				&.icon_2{
					width: .27rem;
					height: .32rem;
					@include background_img("./images/icon_2.png");
				}
				&.icon_3{
					width: .23rem;
					height: .33rem;
					@include background_img("./images/icon_3.png");
				}
			}
		}
	}
	.btn{
		width: 6.55rem;
		height: .83rem;
		border-radius: .1rem;
		color: #fdfdfd;
		font-size: .3rem;
		margin: 0 auto;
		text-align: center;
		line-height: .83rem;
		margin-top: .8rem;
		background: url(./images/detail_bg.png) center no-repeat;
	}
}
</style>
