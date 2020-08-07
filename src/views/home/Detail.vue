<template>
  <div class="detail">
    <i @click="goBack"></i>
    <Swiper v-if="imgLength">
      <div class="top">
        <van-swipe class="my-swipe" indicator-color="#4681fc">
          <van-swipe-item v-for="(item,index) in bannerImgs" :key="index">
            <img :src="item" alt />
          </van-swipe-item>
        </van-swipe>

        <div class="right">
          <span class="cart" @click="goShopCart"></span>
          <!-- <span class="collect" :class="{active:collected}" @click="collect"></span> -->
        </div>
      </div>
      <div class="info">
        <p class="title">{{ details.title }}</p>
        <p class="money">$ {{ details.price }}</p>
        <ul class="tip">
          <li>Freight:${{details.v2ExpressPrice}}</li>
          <li>Delivery:{{details.v2ExpressTime}}</li>
          <li>Place:{{details.v2ExpressAddress}}</li>
        </ul>
        <ul class="list">
          <!-- <li>
						<span>选择</span><p>优惠券</p>
          </li>-->
          <li>
            <span>Parameter</span>
            <p>{{details.v2Type}}</p>
          </li>
          <li @click="jump">
            <span>Address</span>
            <p>{{ address }}</p>
          </li>
        </ul>
      </div>
      <div class="intro">
        <ul>
          <li>
            <p>【Product overview】</p>
            <span>{{details.subTitle}}</span>
          </li>
          <li>
            <p>【Product type】</p>
            <span>{{details.v2Param}}</span>
          </li>
          <li>
            <p>【Product introduction】</p>
            <span>{{details.v2Description}}</span>
          </li>
        </ul>
      </div>
      <div class="imagesWrapper" v-if="imgLength">
        <div class="detailImageList" v-for="(item, idx) in details.detailImageList" :key="idx">
          <img :src="item" alt />
        </div>
      </div>
    </Swiper>
    <div class="bottom">
      <ul>
        <li @click="addCart">Add to cart</li>
        <li @click="goPay">Buy now</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper from "../common/Swiper";
import { Dialog } from "vant";
export default {
  name: "",
  data() {
    return {
      id: "",
      details: "",
      bannerImgs: [],
      collected: false,
      address: "Please select the address",
      imgLength: false,
    }
  },
  components: {
    Swiper,
  },
  methods: {
    jump() {
      this.$router.push({ path: "/address", query: { type: 1 } });
    },
    goBack() {
      this.$router.go(-1);
    },
    goShopCart() {
      this.$router.push("/shopcart");
    },
    // 立即购买
    goPay() {
      Dialog.alert({
        title: "tips",
        message: "network error",
      }).then(() => {
        // on close
      });
    },
    // 加入购物车
    addCart() {
      //1.取出购物车已有商品
      let shopCart = localStorage.getItem("shopCart");
      if (shopCart == null) {
        shopCart = [];
      } else {
        shopCart = JSON.parse(shopCart);
      }
      //2.判断当前加入的商品是否已存在，如果存在数量加1，如果没有则添加
      if (shopCart) {
        let flag = true;
        for (let i = 0; i < shopCart.length; i++) {
          if (this.details.id == shopCart[i].id) {
            shopCart[i].count++;
            flag = false;
          }
        }
        if (flag) {
          this.details.count = 1;
          shopCart.push(this.details);
        }
      } else {
        this.details.count = 1;
        shopCart.push(this.details);
      }
      this.sum++;
      //3.写入本地缓存
      shopCart = JSON.stringify(shopCart);
      localStorage.setItem("shopCart", shopCart);
      this.$toast({
        message: "Shopping cart added successfully!",
        duration: 1000,
      });
    },
    // 获取地址
    getAddress() {
      let token = localStorage.getItem("token");
      this.baseJs
        .ajaxReq("/mall/user/address", {}, "get", token)
        .then((res) => {
          // console.log(res);
          if (res.code === 20000) {
            this.address = res.data[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 收藏与取消收藏
    collect() {
      if (this.collected) {
        if (localStorage.getItem("token") === null) {
          this.$toast({
            message: "请先登录！",
            duration: 1000,
          });
          this.$router.push("/login");
        } else {
          // 取消收藏
          this.collected = false;
          let token = localStorage.getItem("token");
          this.baseJs
            .httpReq(
              "/mall/user/goods/collection",
              this.id,
              {},
              "delete",
              token
            )
            .then((res) => {
              // console.log(res);
              if (res.code === 20000) {
                this.$toast({
                  message: "取消成功！",
                  duration: 1000,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        // 收藏
        if (localStorage.getItem("token") === null) {
          this.$toast({
            message: "请先登录！",
            duration: 1000,
          });
          this.$router.push("/login");
        } else {
          this.collected = true;
          let token = localStorage.getItem("token");
          this.baseJs
            .ajaxReq(
              "/mall/user/goods/collection",
              { goodsId: this.id },
              "post",
              token
            )
            .then((res) => {
              // console.log(res);
              if (res.code === 20000) {
                this.$toast({
                  message: "收藏成功！",
                  duration: 1000,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
		let token = localStorage.getItem("token");
		
		if(JSON.parse(sessionStorage.getItem("huabei2Address"))){
			this.address = (JSON.parse(sessionStorage.getItem("huabei2Address"))).address
		}

    // this.baseJs.ajaxReq("/mall/order",{
    // 	"addressId":1,
    // 	"goodsId": 8,
    // 	"installment": 24,
    // 	"color":1,
    // 	"specifications":1
    // },"post",token).then(res => {
    // 			console.log(res)
    // 		}).catch( error => console.log(error))

    this.baseJs
      .httpReq("/mall/goods", this.id, {}, "get", token)
      .then((res) => {
        // console.log(res);
        if (res.code === 20000) {
					console.log(res)
          for (let i in res.data) {
            if (res.data[i] == null) {
              res.data[i] = "Not yet";
            }
          }
          // if (res.data.detailImageList.length > 0) {
          //   this.imgLength = true;
					// }
					this.imgLength = true;
          this.details = res.data;
          this.bannerImgs = res.data.bannerImageList;
          this.collected = res.data.collected;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // this.getAddress();
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
.detail {
  height: 100%;
  padding-bottom: 0.88rem;
  i {
    position: fixed;
    top: 0.4rem;
    left: 0.4rem;
    width: 0.34rem;
    height: 0.34rem;
    @include background_img("./images/backs.png");
    z-index: 99;
  }
  .top {
    width: 100%;
    height: 6.49rem;
    position: relative;
    .my-swipe {
      height: 6.49rem;
      .van-swipe-item {
        img {
          width: 100%;
          height: 6.49rem;
          max-width: 100%;
          max-height: 6.49rem;
        }
      }
    }

    .right {
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      height: 0.41rem;
      line-height: 0.41rem;
      span {
        display: inline-block;
        &.cart {
          width: 0.41rem;
          height: 0.41rem;
          @include background_img("../all/images/cart.png");
        }
        &.collect {
          width: 0.41rem;
          height: 0.4rem;
          @include background_img("./images/uncollect.png");
          margin-left: 0.3rem;
          &.active {
            @include background_img("./images/collect.png");
          }
        }
      }
    }
  }
  .info {
    font-size: 0.28rem;
    color: #0d0d0d;
    margin-top: 0.8rem;
    .title {
      margin-left: 0.4rem;
    }
    .money {
      color: #e03444;
      font-size: 0.34rem;
      margin: 0.3rem 0 0.4rem 0.4rem;
    }
    .tip {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        color: #bcbcbc;
        font-size: 0.22rem;
      }
    }
    .list {
      margin: 0 0.4rem;
      margin-top: 0.7rem;
      font-size: 0.24rem;
      li {
        display: flex;
        padding-bottom: 0.3rem;
        margin-bottom: 0.3rem;
        border-bottom: 1px solid #f1f1f1;
        span {
          color: #bcbcbc;
          margin-right: 0.7rem;
        }
      }
    }
  }
  .intro {
    ul {
      margin: 0 0.4rem;
      li {
        font-size: 0.24rem;
        padding-bottom: 0.3rem;
        margin-bottom: 0.3rem;
        border-bottom: 1px solid #f1f1f1;
        p {
          color: #4980f9;
          margin-bottom: 0.1rem;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .detailImageList {
    img {
      width: 100%;
    }
  }
  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #fefefe;
    font-size: 0.28rem;
    ul {
      display: flex;
      height: 0.88rem;
      li {
        flex: 1;
        line-height: 0.88rem;
        text-align: center;
        @include backgroundImg;
      }
    }
  }
}
</style>
