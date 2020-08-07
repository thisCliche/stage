<template>
  <div class="home">
    <div class="top">
      <img src="./images/header.png" alt />
      <span @click="goLogin" v-if="!isLogin">Login/Registered</span>
      <span v-if="isLogin">{{ phone }}</span>
    </div>
    <div class="wrapper">
      <p class="tit">Category</p>
      <van-tabs type="card" @click="discover">
        <van-tab>
					<template #title><img :src="urlImg[0]"/>Chair</template>
          <Swiper>
            <ul>
              <li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
                <img :src="item.titleImgUrl" alt />
                <div class="right">
                  <span>{{ item.title }}</span>
									<p class="summary">Chairs made from high-quality wood with....</p>
                  <div class="bottom">
                    <p class="price">${{ item.price }}</p>
										<a class="addCart"></a>
                  </div>
                </div>
              </li>
            </ul>
          </Swiper>
        </van-tab>
        <van-tab>
					<template #title><img :src="urlImg[1]"/>Sofa</template>
          <Swiper>
            <ul>
              <li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
                <img :src="item.titleImgUrl" alt />
                <div class="right">
                  <span>{{ item.title }}</span>
									<p class="summary">Chairs made from high-quality wood with....</p>
                  <div class="bottom">
                    <p class="price">${{ item.price }}</p>
										<a class="addCart"></a>
                  </div>
                </div>
              </li>
            </ul>
          </Swiper>
        </van-tab>
        <van-tab title="Bed">
					<template #title><img :src="urlImg[2]"/>Bed</template>
					<Swiper>
          <ul>
            <li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
                <img :src="item.titleImgUrl" alt />
                <div class="right">
                  <span>{{ item.title }}</span>
									<p class="summary">Chairs made from high-quality wood with....</p>
                  <div class="bottom">
                    <p class="price">${{ item.price }}</p>
										<a class="addCart"></a>
                  </div>
                </div>
              </li>
          </ul>
					</Swiper>
        </van-tab>
        <van-tab title="Cupboard">
					<template #title><img :src="urlImg[3]"/>Cupboard</template>
					<Swiper>
          <ul>
            <li v-for="(item,index) in allList" :key="index" @click="goDetail(item.id)">
                <img :src="item.titleImgUrl" alt />
                <div class="right">
                  <span>{{ item.title }}</span>
									<p class="summary">Chairs made from high-quality wood with....</p>
                  <div class="bottom">
                    <p class="price">${{ item.price }}</p>
										<a class="addCart"></a>
                  </div>
                </div>
              </li>
          </ul>
					</Swiper>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Swiper from "../common/Swiper";
export default {
  name: "home-page",
  data() {
    return {
			recommendList: [],
			urlImg:["./images/chair1.png","./images/sofa.png","./images/bed.png","./images/cupboard.png"],
      phone: "",
      isLogin: false,
      show: false,
      allList: [],
      picture: "",
    };
  },
  components: {
    Swiper,
  },
  computed: {},
  watch: {},
  methods: {
    discover(name, titile) {
			let category = name + 1;
			let urlImgTime = this.urlImg;
			for(let i in urlImgTime) {
				if(urlImgTime[i].search("1") != -1){
					urlImgTime[i] = urlImgTime[i].replace("1","")
				}
			}
			urlImgTime[name] = urlImgTime[name].replace(".png","1.png")
			this.urlImg = urlImgTime;
      this.baseJs
        .ajaxReq("/mall/goods", { type: category }, "get", "")
        .then((res) => {
          if (res.code === 20000) {
						// console.log(res)
            this.allList = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goShopCart() {
      this.$router.push("/shopcart");
    },
    goDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
    geTel(tel) {
      return tel.substring(0, 3) + "****" + tel.substr(tel.length - 4);
    },
  },
  created() {
    this.phone = localStorage.getItem("phone");
    if (this.phone != null) {
      this.phone = this.geTel(this.phone);
      this.isLogin = true;
    }

    this.baseJs
      .ajaxReq("/mall/goods", { type: 1 }, "get", "")
      .then((res) => {
        if (res.code === 20000) {
          this.allList = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.home {
  height: 100%;
	background: #f2f2f2;
  .top {
    span {
      color: #fff;
    }
    width: 100%;
    height: 2.57rem;
    background: url(./images/header_bg.png) center no-repeat;
    background-size: 100% 100%;
    border-radius: 0 0 0.7rem 0.7rem;
    font-size: 0.38rem;
    padding: 0.25rem;
    padding-top: 0.6rem;
    img {
      width: 1.16rem;
      height: 1.16rem;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
  }
  .wrapper{padding: 0 .24rem;
		.tit {
    color: #313131;
    font-size: 0.38rem;
    font-weight: 700;
    padding: 0.72rem 0;
  }
  .van-tabs /deep/ .van-tabs__content {
    margin-top: 0.84rem;
    .van-tab__pane {
      position: fixed;
      bottom: 1rem;
      top: 6.54rem;
      padding-right: 0.48rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 100%;
        margin-bottom: 0.4rem;
				display: flex;
				justify-content: space-between;
        img {
          width: 2.54rem;
          height: 2.54rem;
          border-radius: 0.1rem;
        }
        .right {
          display: flex;
					flex-flow: column;
					width: 4.05rem;
          span {
            color: #313131;
            font-size: 0.38rem;
						width: 100%;font-weight: 700;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: .6rem;
          }
					.summary{font-size: .28rem;color: #7e7e7e;width: 4.05rem;margin: .1rem 0 .2rem;}
          .bottom {display: flex;justify-content: space-between;align-items: center;
            .addCart {
              display: block;
              width: 0.35rem;
              height: 0.31rem;
              background: url(./images/cart.png) center no-repeat;
							background-size: 0.35rem 0.31rem;
            }
            .price {
              font-size: 0.4rem;
              color: #d81e06;
              font-weight: 700;
              line-height: 0.5rem;
            }
          }
        }
      }
    }
  }
  .van-tabs /deep/
		.van-tabs__wrap{
			height: 1.6rem;
			.van-tabs__nav--card {
    margin: 0;
    border: 0;
		height: 1.6rem;
		background: none;
    .van-tab {
      border-radius: 0.08rem; background: #fff; margin-right: 0.2rem;	border-right: 0; color: #313131;	width: 1.6rem;height: 1.6rem;padding: 0;
			span{display: flex;flex-flow: column;align-items: center;
				img{width: 0.6rem;height: 0.67rem;margin-top: .34rem;}
			}
    }
    .van-tab.van-tab--active {
      background: url(./images/tiggle_bg.png);
			background-size: 1.6rem 1.6rem;
      color: #fff;
    }
  }
		}
	 
	}
}
</style>