<template>
    <div class="forgetPsw">
        <Swiper>
			<HeaderTop title="FORGET PASSWORD"/>
			<ul>
				<li>
					<i class="phone_icon"></i><input type="tel" placeholder="Enter your mobile phone number" v-model="phone"/>
				</li>
				<li class="code_input">
					<div>
						<i class="code_icon"></i><input type="tel" placeholder="Verification code" v-model="code"/>
					</div>
					<div>
						<Vcode :phone="phone"/>
					</div>
				</li>
				<li>
					<i class="psw_icon"></i><input type="password" placeholder="Please enter your password" v-model="psw"/>
				</li>
			</ul>
            <div class="btn" @click="sureBtn">
                CHANGE THE PASSWORD
            </div>
        </Swiper>    
    </div>
</template>

<script>
import Swiper from "../common/Swiper"
import Vcode from "./Vcode"
import HeaderTop from "../common/HeaderTop"
export default {
 name: "",
  data () {
    return {
        phone: "",
        psw: "",
        code: ""
    }
  },
  components: {
      Swiper,
      Vcode,
	  HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
        this.$router.go(-1);
    },
    sureBtn() {
        if(this.phone === ""){
            this.$toast({
                message: "Please enter your mobile phone number!",
                duration: 1000
            });
        }else if(this.code === ""){
            this.$toast({
                message: "Please enter your verification code!",
                duration: 1000
            });
        }else if(this.psw === ""){
            this.$toast({
                message: "Please enter your password!",
                duration: 1000
            });
        }else{
            this.baseJs.ajaxReq("/mall/user/resetPassword",{phone:this.phone,password:this.psw,smsCode:this.code},"put","")
            .then(res => {
                // console.log(res);
                if(res.code === 20000){
                    this.$toast({
                        message: "Modification succeeded",
                        duration: 1000
                    });
                    this.$router.push("/login");
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
.forgetPsw{
    height: 100%;
    width: 100%;
    ul{
    	margin: 0 0.24rem;
		margin-top: 1.2rem;
    	li{
    		font-size: .28rem;
    		padding-bottom: .2rem;
    		margin-bottom: .6rem;
    		border-bottom: 1px solid #dedede;
            position: relative;
            .Vcode{position: absolute;right: 0;top: -0.08rem;}
            input{width: 4.5rem;}
    		i{
    			display: inline-block;
    			margin-right: .3rem;
    			margin-bottom: -.02rem;
    			&.phone_icon{
    				width: .22rem;
    				height: .30rem;
    				@include background_img("./images/phone_icon.png");
    			}
    			&.code_icon{
    				width: .26rem;
    				height: .30rem;
    				@include background_img("./images/code_icon.png");
    			}
    			&.psw_icon{
    				width: .26rem;
    				height: .30rem;
    				@include background_img("./images/psw_icon.png");
    			}
    		}
    		&.code_input{
    			display: flex;
    		}
    	}
    }
    .btn{
        width: 5.67rem;
        height: .83rem;
        border-radius: .4rem;
        color: #fdfdfd;
        font-size: .3rem;
        background: url(./images/login_bg.png) center no-repeat;
        margin: 0 auto;
        text-align: center;
        line-height: .83rem;
        margin-top: .8rem;
    }
}
</style>