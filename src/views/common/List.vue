<template>
  <div class="list">
		<ul>
			<li v-for="(item,index) in arrList" :key="index" @click="goDetail(item.id)">
				<div class="left">
					<img :src="item.titleImgUrl" alt=""/>
				</div>
				<div class="right">
					<p>{{ item.title }}</p>
					<span>￥{{ item.price }}</span>
				</div>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  props: [
	  "arrList"
  ],
  methods: {
	  goDetail(id) {
		  this.$router.push({name: "detail",params:{id:id}});
	  }
  }
}
</script>


<style lang="scss" scoped>
.list{
	ul{
		margin: .5rem .4rem;
		li{
			display: flex;
			margin-bottom: .3rem;
			.left{
				width: 2.23rem;
				height: 2.23rem;
				background: #ececec;
				border-radius: .1rem;
				margin-right: .32rem;
				img{
					width: 2.23rem;
					height: 2.23rem;
				}
			}
			.right{
				font-size: .28rem;
				p{
					margin-bottom: .3rem;
				}
				span{
					color: #fe6444;
					font-size: .3rem;
				}
			}
		}
	}
}
</style>
