<template>
  <div class="address">
		<Swiper>
			<HeaderTop title="ADDRESS">
				<span @click="goAddAddress">ADD</span>
			</HeaderTop>
			<ul v-if="!isShow">
				<li class="van-hairline--bottom" v-for="(item,index) in addressList" :key="index" @click="isChoose ? backtoGoods(item) : ''">
					<div class="info">
						<span>CONSIGNEE: {{ item.name }}</span><span>{{ item.phone }}</span>
					</div>
					<div class="address_intro">
						{{ item.address }}
					</div>
					<div class="wrap">
						<div class="left">
							<van-radio-group v-model="radio">
								<van-radio :name="index">Default Address
									<template #icon="props">
										<img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
									</template>
								</van-radio>
							</van-radio-group>
						</div>
						<div class="right">
							<span class="edit" @click.stop="goEdit(item.id)"><i></i>Editor</span><span class="delete" @click.stop="goDelete(item.id)"><i></i>Delete</span>
						</div>
					</div>
				</li>
			</ul>
			<div class="nothing" v-if="isShow">
				<div></div>
				No receiving address~
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
      radio: 0,
			isShow: true,
			isChoose: false,
			addressList: [],
			activeIcon: '/images/active.png',
			inactiveIcon: '/images/current.png'
    }
  },
	components: {
		Swiper,
		HeaderTop
	},
	methods: {
		backtoGoods(item) {
      sessionStorage.setItem('huabei2Address', JSON.stringify(item))
      this.$router.go(-1)
    },
		// 添加
		goAddAddress() {
			this.$router.push("/addaddress");
		},
		// 获取地址
		getAddress() {
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/mall/user/address",{},"get",token)
			.then(res => {
				// console.log(res);
				if(res.code === 20000){
					if(res.data.length === 0){
						this.isShow = true;
					}else{
						this.isShow = false;
						this.addressList = res.data;
					}
				}
			})
			.catch(err => {
				console.log(err);
			})
		},
		// 编辑
		goEdit(id) {
			this.$router.push({name:"addaddress",query:{id:id}});
		},
		// 删除
		goDelete(id) {
			let token = localStorage.getItem("token");
			this.baseJs.httpReq("/mall/user/address",id,{},"delete",token)
			.then(res => {
				// console.log(res);
				if(res.code === 20000){
					this.$toast({
						message: "Deletion succeeded!",
						duration: 1000
					});
					this.getAddress();
				}
			})
			.catch(err => {
				console.log(err);
			})
		}
	},
	created() {
		this.getAddress();
		if (this.$route.query.type) {
        this.isChoose = true
      }
	}
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.address{
	height: 100%;
	ul{
		margin-top: .6rem;
		margin-bottom: .3rem;
		li{
			margin: 0 .3rem;
			margin-bottom: .6rem;
			padding-bottom: .24rem;
			font-size: .24rem;
			.info{
				font-size: .32rem;
				span:first-child{
					margin-right: .5rem;
				}
			}
			.address_intro{
				font-size: .28rem;
    		color: #919191;;
				margin: .2rem 0;
			}
			.wrap{
				@include flex;
				.left{
					.img-icon{width: .31rem;height: .31rem;}
					.van-radio{
					/deep/	.van-radio__label{color: #b4b2b2;}
					}
				}
				.right{
					span{
						color: #b4b2b2;
						&.edit{
							margin-right: .5rem;
							i{
								display: inline-block;
								margin-right: .2rem;
								margin-bottom: -.05rem;
								width: .27rem;
								height: .27rem;
								@include background_img("./images/edit.png");
							}
						}
						&.delete{
							i{
								display: inline-block;
								margin-right: .2rem;
								margin-bottom: -.04rem;
								width: .23rem;
								height: .28rem;
								@include background_img("./images/delete.png");
							}
						}
					}
				}
			}
		}
	}
	.nothing{
		font-size: .3rem;
		text-align: center;
		margin-top: 2rem;
		div{
			width: 2.8rem;
			height: 2.8rem;
			@include background_img("./images/noaddress.png");
			margin: 0 auto;
		}
	}
}
</style>
