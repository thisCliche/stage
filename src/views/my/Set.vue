<template>
    <div class="set">
        <Swiper>
            <HeaderTop title="SET UP"/>
            <ul>
                <li class="van-hairline--bottom" @click="goModifyPsw">
                    <div class="left">
                        CHANGE THE PASSWORD
                    </div>
                    <div class="right">
                        <span></span>
                    </div>
                </li>
                <li class="van-hairline--bottom" @click="signOut">
                    <div class="left">
                        LOG OUT
                    </div>
                    <div class="right">
                        <span></span>
                    </div>
                </li>
            </ul>
        </Swiper>    
    </div>
</template>

<script>
import Swiper from "../common/Swiper"
import HeaderTop from "../common/HeaderTop"
import { Dialog } from 'vant';
export default {
 name: "",
  data () {
    return {
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
    //修改密码
    goModifyPsw() {
        this.$router.push("/modifypsw");
    },
    signOut() {
        Dialog.confirm({
            title: 'Tips',
            message: 'Are you sure you want to log out？'
        }).then(() => {
            localStorage.removeItem("phone");
            localStorage.removeItem("token");
            this.$router.push("/my");
        }).catch(() => {
        // on cancel
        });
    }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.set{
    height: 100%;
    ul{
        margin: 0 .3rem;
        margin-top: .6rem;
        li{
            @include flex;
            font-size: .28rem;
            padding-bottom: .2rem;
            margin-bottom: .3rem;
            color: #999;
            .left{
                i{
                    display: inline-block;
                    &.modify{
                        width: .25rem;
                        height: .33rem;
                        @include background_img("./images/modify.png");
						margin-right: .2rem;
						margin-bottom: -.06rem;
                    }
                    &.out{
                        width: .34rem;
                        height: .34rem;
                        @include background_img("./images/out.png");
						margin-right: .1rem;
						margin-bottom: -.1rem;
                    }
                }
            }
            .right{
                span{
                    display: inline-block;
                    width: .14rem;
                    height: .26rem;
                    @include background_img("./images/arrow.png");
                }
            }
        }
    }
}
</style>