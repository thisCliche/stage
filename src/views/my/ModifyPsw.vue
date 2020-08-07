<template>
    <div class="modifyPsw">
        <Swiper>
            <HeaderTop title="CHANGE THE PASSWORD"/>
            <ul>
                <li>
                    <i class="icon_1"></i>
                    <input type="password" placeholder="THE OLD PASSWORD" v-model="oldPsw"/>
                </li>
                 <li>
                     <i class="icon_2"></i>
                    <input type="password" placeholder="THE NEW PASSWORD" v-model="newPsw"/>
                </li>
                <li>
                     <i class="icon_3"></i>
                    <input type="password" placeholder="CONFIRM PASSWORD" v-model="reNewPsw"/>
                </li>
            </ul>
            <div class="btn" @click="sureModify">
                DETERMINE
            </div>
        </Swiper>    
    </div>
</template>

<script>
import Swiper from "../common/Swiper"
import HeaderTop from "../common/HeaderTop"
export default {
 name: "",
  data () {
    return {
        oldPsw: "",
        newPsw: "",
        reNewPsw: ""
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
      sureModify() {
          if(this.oldPsw === ""){
              this.$toast({
                  message: "Please enter the original password!",
                  duration: 1000
              });
          }else if(this.newPsw === ""){
              this.$toast({
                  message: "Please enter the new password!",
                  duration: 1000
              });
          }else if(this.reNewPsw !== this.newPsw){
              this.$toast({
                  message: "The two passwords do not match!",
                  duration: 1000
              });
          }else{
              let token = localStorage.getItem("token");
              this.baseJs.ajaxReq("/mall/user/updatePassword",{password:this.oldPsw,newPassword:this.newPsw},"put",token)
              .then(res => {
                //   console.log(res);
                  if(res.code === 20000){
                    this.$toast({
                        message: "Password modified successfully！",
                        duration: 1000
                    });
                    localStorage.removeItem("token");
                    localStorage.removeItem("phone");
                    this.$router.push("/my");
                  }else{
                    this.$toast({
                        message: res.msg,
                        duration: 1000
                    });
                  }
              })
              .catch(err => {
                  console.log(err);
              })
          }
      }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.modifyPsw{
    height: 100%;
    ul{
        margin: 0 .4rem;
        margin-top: .6rem;
        li{
            font-size: .3rem;
            padding-bottom: .2rem;
            margin-bottom: .3rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                font-size: .3rem;
            }
            i{
				display: inline-block;
				margin-bottom: -.06rem;
				margin-right: .24rem;
				&.icon_1{
					width: .28rem;
					height: .33rem;
					@include background_img("./images/oldPwd.png");
				}
				&.icon_2{
					width: .29rem;
					height: .33rem;
					@include background_img("./images/newPwd.png");
				}
				&.icon_3{
					width: .29rem;
					height: .31rem;
					@include background_img("./images/confiremPwd.png");
				}
			}
        }
    }
    .btn{
        width: 5.67rem;
        height: .83rem;
        border-radius: .1rem;
        color: #fdfdfd;
        font-size: .3rem;
        background: url(./images/detail_bg.png) center no-repeat;
        margin: 0 auto;
        text-align: center;
        line-height: .83rem;
        margin-top: .8rem;
    }
}
</style>