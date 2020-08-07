<template>
  <div class="Vcode">
		<button class="getmodBtn" @click="getCode()" :disabled="!login.canGet">
			 <span v-show="!login.canGet">{{login.waitTime+"s recapture"}}</span>
			 <span v-show="login.canGet">VERIFICATION CODE</span>
		</button>
  </div>
</template>

<script>
	function timeCountdown(obj) { //obj包括timer、waitTime 、canGet 
    const TIME_COUNT = 60; //默认倒计时秒数
    if (!obj.timer) {
        obj.waitTime = TIME_COUNT;
        obj.canGet = false;
        obj.timer = setInterval(() => {
            if (obj.waitTime>0 && obj.waitTime<=TIME_COUNT) {
                obj.waitTime--;
            }else{
                obj.canGet = true;
                clearInterval(obj.timer); //清空定时器
                obj.timer = null;
            }
        }, 1000)
    }
    return {
        timer: obj.timer,
        canGet: obj.canGet,
        waitTime: obj.waitTime
    }
}
	
	
export default {
  name: '',
  data (){
  return{            
    tempLogin:{ //定义一个临时对象
      canGet: true,
      timer: null,
      waitTime: 60
      },
    }
},
props: [
	"phone"
],
computed: {
	login(){ //最终对象
  if(!this.tempLogin.canGet){
    return timeCountdown(this.tempLogin);
  }else{
    return this.tempLogin;
  }
}
},
methods:{
    getCode(){
        //在点击获取验证码的时候 判断手机是否正确 是否为空
    	 if(this.phone == ""){
			 this.$toast({
			 	message: 'Mobile phone number cannot be empty',
			 	duration: 1000
			 });
    		return false
    	}else if(!/^1[3-9]\d{9}$/.test(this.phone)){
			 this.$toast({
				message: 'Please enter the correct mobile phone number',
				duration: 1000
			});
    		return false;
    	}else{
    		//倒计时开始
    		timeCountdown(this.login);  //参数为最终对象
    		this.baseJs.ajaxReq("/mall/user/sms/send",{phone:this.phone})
    		.then(res => {
    			// console.log(res);
    			if(res.code === 20000){
					this.$toast({
						message: res.msg,
						duration: 1000
					});
    			}
    		})
    		.catch(err => {
    			console.log(err);
    		})
    		return true
    	}
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
	.Vcode .getmodBtn{
		width: auto;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    border-radius: .3rem;
    color: #000;
    font-size: .18rem;
    background: none;
    border: 1px solid #000;
    padding: 0 .1rem;
	}
</style>
