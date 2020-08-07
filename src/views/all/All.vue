<template>
  <div class="all">
			<p class="tit">Discover</p>
			<van-tabs type="card" @click="discover">
				<van-tab title="Living Room">
					<Swiper>
					<ul>
						<li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
							<img :src="item.titleImgUrl" alt="">
							<div class="bottom">
								<span>{{ item.title }}</span>
								<div>
									<a class="addCart"></a>
									<p class="price">${{ item.price }}</p>
								</div>
							</div>
						</li>
					</ul>
					</Swiper>
				</van-tab>
				<van-tab title="Kitchen"><Swiper>
					<ul>
						<li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
							<img :src="item.titleImgUrl" alt="">
							<div class="bottom">
								<span>{{ item.title }}</span>
								<div>
									<a class="addCart"></a>
									<p class="price">${{ item.price }}</p>
								</div>
							</div>
						</li>
					</ul>
					</Swiper></van-tab>
				<van-tab title="Home Office">
					<Swiper>
					<ul>
						<li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
							<img :src="item.titleImgUrl" alt="">
							<div class="bottom">
								<span>{{ item.title }}</span>
								<div>
									<a class="addCart"></a>
									<p class="price">${{ item.price }}</p>
								</div>
							</div>
						</li>
					</ul>
					</Swiper>
				</van-tab>
				<van-tab title="Bed Room">
					<Swiper>
					<ul>
						<li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
							<img :src="item.titleImgUrl" alt="">
							<div class="bottom">
								<span>{{ item.title }}</span>
								<div>
									<a class="addCart"></a>
									<p class="price">${{ item.price }}</p>
								</div>
							</div>
						</li>
					</ul>
					</Swiper>
				</van-tab>
				<van-tab title="Bathrom">
					<Swiper>
					<ul>
						<li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
							<img :src="item.titleImgUrl" alt="">
							<div class="bottom">
								<span>{{ item.title }}</span>
								<div>
									<a class="addCart"></a>
									<p class="price">${{ item.price }}</p>
								</div>
							</div>
						</li>
					</ul>
					</Swiper>
				</van-tab>
			</van-tabs>
  </div>
</template>

<script>
import Swiper from "../common/Swiper"
export default {
  name: 'all-page',
  data () {
    return {
      allList: [],
	 	  picture: ""
    }
  },
	components: {
		Swiper
	},
	methods: {
		discover(name, titile){
			let category = name+1;
			this.baseJs.ajaxReq("/mall/goods",{type:category},"get","")
			.then(res => {
				if(res.code === 20000){
					this.allList = res.data;
				}
			})
			.catch(err => {
				console.log(err);
			})
		},
		goShopCart() {
			this.$router.push("/shopcart");
		},
		goDetail(id) {
			this.$router.push({name:"detail",params:{id:id}});
		}
	},
	created() {
		this.baseJs.ajaxReq("/mall/goods",{type:1},"get","")
		.then(res => {
			if(res.code === 20000){
				this.allList = res.data;
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
.all{
	height: 100%;
	padding:0 .24rem 1rem;
	.tit{color: #313131;font-size: .6rem;font-weight: 700;padding: .72rem 0;}
	.van-tabs /deep/ .van-tabs__content{margin-top: .84rem;
		.van-tab__pane{position: fixed; bottom: 1rem;top: 4rem;padding-right: .48rem;}
			ul{display: flex;flex-wrap: wrap;justify-content: space-between;
				li{width: 3.34rem;position: relative;margin-bottom:.5rem;
					img{width: 3.34rem; height: 3.4rem;border-radius: .1rem;}
					.bottom{display: flex;
						span{color: #7e7e7e;font-size: .22rem;width: 2.2rem;}
						div{position: absolute;right: 0;bottom:0rem;
							.addCart{display: block;width: .51rem;height: .51rem;background: url(./images/cart1.png) center no-repeat;background-size: .51rem .51rem;}
							.price{font-size: .26rem;color: #d81e06;font-weight: 700;line-height: .5rem;}
						}
					}
				}
			}
		}
	.van-tabs /deep/ .van-tabs__nav--card{
		margin: 0;border: 0;
		.van-tab {min-width: auto;padding: 0 .22rem;border-radius: .08rem;background: #f2f2f2;margin-right: .2rem;border-right: 0;color: #313131;}
		.van-tab.van-tab--active{background: url(./images/tiggle_bg.png) center no-repeat;color: #fff;}
	}
}
</style>
