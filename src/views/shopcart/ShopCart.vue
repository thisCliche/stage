<template>
  <div class="shopCart">
		<Swiper>
		 <div class="top">
				<span>Shopping Cart</span>
			</div>
		 <div class="shop_list" v-if="products.length != 0">
		     <ul>
		         <van-checkbox-group v-model="result" ref="checkboxGroup">
		             <van-checkbox :name="item.id" v-for="(item,index) in products" :key="index" checked-color="#fc5761">
		                 <li>
		                     <div class="wrap">
		                         <img :src="item.titleImgUrl" alt=""/>
		                         <div>
		                             <p class="tit">{{ item.title }}</p>
		                             <p class="money">${{ item.price }}</p>
		                         </div>
		                     </div>
		                 </li>
		                 <van-stepper v-model="item.count" integer disable-input @plus="handelChange1(item.id)" @minus="handelChange2(item.id)"/>
		             </van-checkbox>
		         </van-checkbox-group>
		     </ul>
		 </div>
		 <div class="no" v-else>
		     <div></div>
		     No goods~
		 </div>
		</Swiper>
		<div class="bottom">
			<div class="left">
				<van-checkbox checked-color="#fc5761" v-model="allSelect">Select All</van-checkbox>
			</div>
			<div class="left">
				<span style="color:#7e7e7e">Total:</span> ${{ allPrice }}
			</div>
			<div class="right" @click="goPay">
				BUY({{result.length}})
			</div>
		</div>
  </div>
</template>

<script>
import Swiper from "../common/Swiper"
import { Dialog } from 'vant';
export default {
  name: 'shop-cart',
  data () {
    return {
      result: [],
			value: 1,
			allSelect:false,
	  	products: []
    }
  },
	components: {
		Swiper
	},
	watch:{
		allSelect(val){
			if(val){
				this.$refs.checkboxGroup.toggleAll(true)
			}
			else{this.$refs.checkboxGroup.toggleAll()}
		}
	},
	computed: {
	  allPrice() {
	      if(this.result.length === 0) {
	          return 0;
	      }else{
	          let sum = 0;
	          for(let i=0;i<this.result.length;i++){
	              for(let j=0;j<this.products.length;j++){
	                  if(this.result[i] === this.products[j].id){
	                      sum += this.products[j].price*this.products[j].count;
	                  }
	              }
	          }
	          return sum;
	      }
	  }
	},
	methods: {
		goPay() {
			Dialog.alert({
			  title: 'tips',
			  message: 'network error！'
			}).then(() => {
			  // on close
			});
		},
		// 点击加号
		handelChange1(id) {
		    window.event.stopPropagation();
		    for(let i=0;i<this.products.length;i++){
		        if(this.products[i].id == id){
		            this.products[i].count++;
		        }
		    }
		    localStorage.setItem("shopCart",JSON.stringify(this.products));
		},
		// 点击减号
		handelChange2(id) {
		    window.event.stopPropagation();
		    for(let i=0;i<this.products.length;i++){
		        if(this.products[i].id == id){
		            this.products[i].count--;
		        }
		    }
		    localStorage.setItem("shopCart",JSON.stringify(this.products));
		},
	},
	activated() {
		this.products = JSON.parse(localStorage.getItem("shopCart"));
		if(this.products == null){
		    this.products = [];
		}
	}
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
.shopCart{
	height: 100%;
	padding-bottom: 2rem;
	background: #f2f2f2;
	.top{
		span{
			color: #fff;
		}
		width: 100%;
		height: 1.46rem;
		background: url(../my/images/header_bg.png) bottom center no-repeat;
		background-size: 100% 2.46rem;
		border-radius: 0 0 .7rem .7rem;
		font-size: .38rem;
		padding-top: 0.3rem;
		text-align: center;
	}
	.shop_list{
	    padding-bottom: .4rem;
	    ul{
	        margin: 0 .25rem;
					.van-checkbox{
						background: #fff;
						border-radius: .2rem;
						margin-top: .2rem;
						padding: .44rem .25rem;
						/deep/ .van-checkbox__label{height: 1.6rem;
							.van-stepper__input[disabled]{color: #313131;}
						}
					}
	        li{

	            .wrap{
	                font-size: .36rem;
	                display: flex;
	                img{
	                    width: 1.8rem;
	                    height: 1.8rem;
	                    border-radius: .1rem;
	                    margin-right: .3rem;
	                    min-width: 1.8rem;
	                    min-height: 1.8rem;
	                }
	                div{
	                    .tit{
	                        width: 3.8rem;
													font-size: .32rem;
													color: #313131;
	                        text-overflow: ellipsis;
	                        white-space: nowrap;
	                        overflow: hidden;
													font-weight: 700;
													margin-top: .2rem;
	                    }
	                    .intro{
	                        font-size: .24rem;
	                        display: inline-block;
	                        margin-top: .1rem;
	                        margin-bottom: .4rem;
	                    }
	                    .money{
	                        color: #d81e06;
													font-size: .34rem;
													font-weight: 700;
													margin-top: .4rem;
	                    }
	                }
	            }
	        }
	    }
		.van-stepper{
		    text-align: right;
		    margin-top: -.9rem;
				/deep/ .van-stepper__plus{
					border-radius: 100%;
					background: url(../my/images/stepper_plus.png) center no-repeat;
					background-size:.4rem .4rem;
					color: #fff;
				}
				/deep/ .van-stepper__minus{border-radius: 100%;}
		}
	}
	.no{
	    font-size: .3rem;
	    color: #666;
	    text-align: center;
	    margin-top: 2rem;
	    div{
	        width: 2.8rem;
	        height: 2.8rem;
	        @include background_img("../my/images/no.png");
	        margin: 0 auto;
	        margin-bottom: .2rem;
	    }
	}
	.bottom{
		position: fixed;
		bottom: 1rem;
		left: 0;
		width: 100%;
		height: 1rem;
		font-size: .3rem;
		@include flex;
		padding: 0 .3rem;
		background: #fff;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
		div{
			&.left{
				color: #fc3d42;
				/deep/ .van-checkbox__label{color: #7e7e7e;font-size: .27rem;}
			}
			&.right{
				width: 1.89rem;
				height: .6rem;
				line-height: .6rem;
				border-radius: .3rem;
				text-align: center;
				background: #fd6862;
				color: #fff;
			}
		}
	}
}
</style>
