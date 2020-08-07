<template>
    <div class="register">
		<div class="top">
			<van-icon name="arrow-left" @click="goBack"/>
			<span @click="goLogin">LOGIN</span>
		</div>
		<p class="title">REGISTERED</p>
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
			<li>
				<i class="rePsw_icon"></i><input type="password" placeholder="Please enter your password" v-model="rePsw"/>
			</li>
		</ul>
		<div class="btn" @click="register">
			REGISTER
		</div>
		<div class="tip">
			I have read and agree to <span @click="goPrivacy">the User Agreement</span>
		</div>
    </div>
</template>

<script>
import Vcode from "./Vcode"
export default {
 name: "",
  data () {
    return {
        phone: "",
        psw: "",
				code: "",
				rePsw: ""
    }
  },
  components: {
      Vcode
  },
  computed: {},
  watch: {},
  methods: {
		goLogin(){
			this.$router.push('/login')
		},
    goBack() {
        this.$router.go(-1);
    },
    register() {
        if(this.phone == ""){
            this.$toast({
                message: 'Mobile phone number cannot be empty',
                duration: 1000
            });
        }else if(this.code == ""){
            this.$toast({
                message: 'Verification code cannot be empty',
                duration: 1000
            });
        }else if(this.psw == ""){
            this.$toast({
                message: 'Password cannot be empty',
                duration: 1000
            });
        }else if(!/^[0-9]{6,18}$/.test(this.psw)){
            this.$toast({
                message: 'Please input 6 to 18 digits!',
                duration: 1000
            });
				}else if(this.psw != this.rePsw){
					this.$toast({
                message: 'The two passwords do not match',
                duration: 1000
            });
				}else{
            this.baseJs.ajaxReq("/mall/user/signUp",{phone:this.phone,smsCode:this.code,password:this.psw},'post',"")
            .then(res => {
                // console.log(res);
                if(res.code != 20000){
                    this.$toast({
                        message: res.msg,
                        duration: 1000
                    });
                }else{
                    this.$toast({
                        message: res.msg,
                        duration: 1000
                    });
                    this.$router.push("/login");
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    goPrivacy() {
        this.$router.push("/privacy");
    }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.register{
    height: 100%;
    width: 100%;
		background: url(./images/bg.png) top center no-repeat;
		background-size: 100% 5.84rem;
	.top{
		width: 100%;
		height: 1.6rem;
		padding-top: .4rem;
		border-radius: 0 0 .2rem .2rem;
		font-size: .6rem;
		span{
			font-size: .26rem;
			font-weight: 700;
			float: right;
			margin-right: .3rem;
			line-height: 0.7rem;
		}
		.van-icon{
			margin-left: .3rem;
		}
	}
	.title{
		font-size: .38rem;
		color: #171717;
		margin: 1.8rem 1rem;
	}
	ul{
		margin: 0 0.8rem;
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
				margin-bottom: -.05rem;
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
				&.rePsw_icon{
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
	.tip{
		margin-top: .36rem;
		text-align: center;
		font-size: .24rem;
		color: #dddddd;
		span{
			color: #000;

		}
	}
}
</style>