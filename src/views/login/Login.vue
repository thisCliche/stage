<template>
    <div class="login">
		<div class="top">
			<van-icon name="arrow-left" @click="goBack"/>
			<span @click="goRegister">REGISTERED</span>
		</div>
		<p class="title">LOGIN</p>
		<ul>
			<li>
				<i class="phone_icon"></i><input type="tel" placeholder="Enter your mobile phone number" v-model="phone"/>
			</li>
			<li>
				<i class="psw_icon"></i><input type="password" placeholder="Please enter your password" v-model="psw"/>
			</li>
		</ul>
		<div class="btn" @click="login">
			LOGIN
		</div>
		<div class="notice">
			<span @click="goForgetPsw">FORGET PASSWORD</span>
		</div>
	</div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
        phone: "",
        psw: ""
    }
  },
  components: {
      
  },
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.go(-1);
      },
      goRegister() {
          this.$router.push("/register");
      },
      goForgetPsw() {
          this.$router.push("/forgetpsw");
      },
      login() {
        if(this.phone == ""){
            this.$toast({
                message: 'Mobile phone number cannot be empty',
                duration: 1000
            });
        }else if(this.psw == ""){
            this.$toast({
                message: 'Password cannot be empty',
                duration: 1000
            });
        }else{
            this.baseJs.ajaxReq("/mall/user/signIn",{phone:this.phone,password:this.psw},'post',"")
            .then(res => {
            // console.log(res);
            if(res.code != 20000){
                this.$toast({
                    message: res.msg,
                    duration: 1000
                });
            }else{
                    // 缓存token
                    localStorage.setItem("token",res.data);
                    // 缓存手机号
                    localStorage.setItem("phone",this.phone);
                    this.$toast({
                        message: res.msg,
                        duration: 1000
                    });
                    // let routeName = localStorage.getItem("fromRoute")
                    this.$router.push("/home");
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
  },
//   beforeRouteEnter(to, from, next) {
//      console.log(from.name);
//      localStorage.setItem("fromRoute",from.name);
//      next();
//   },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.login{
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
		margin: 0 1rem;
		li{
			font-size: .28rem;
			padding-bottom: .2rem;
			margin-bottom: .6rem;
			border-bottom: 1px solid #dedede;
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
				&.psw_icon{
					width: .26rem;
					height: .30rem;
					@include background_img("./images/psw_icon.png");
				}
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
	.notice{
		margin-top: .36rem;
		text-align: center;
		font-size: .24rem;
		color: #666666;
		// span:first-child{
		// 	padding-right: .3rem;
		// 	border-right: 1px solid #333;
		// }
		// span:last-child{
		// 	padding-left: .3rem;
		// }
	}
 }
</style>