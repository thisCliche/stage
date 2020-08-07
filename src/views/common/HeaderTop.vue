<template>
  <div class="headerTop">
      <i @click="goBack"></i>{{ title }}<slot></slot>
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
    }
  },
  props: [
      "title"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
    goBack() {
      if(this.$route.name === "lend" || this.$route.name === "borrow" || this.$route.name == "address"){
        this.$router.push("/my");
      }else{
        this.$router.go(-1);
      }
    }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/_mixins.scss";
.headerTop{
  width: 100%;
  height: .88rem;
  background: url(./images/detail_bg.png) center no-repeat;
  background-size: 100% .88rem;
  font-size: .34rem;
  text-align: center;
  position: relative;
  color: #fff;
  line-height: 0.88rem;
  i{
    width: .2rem;
    height: .36rem;
    position: absolute;
    top: 0.3rem;
    left: .4rem;
    @include background_img("./images/back.png");
  }
  span{
    position: absolute;
    top: 0rem;
    right: .4rem;
		font-size: .3rem;
  }
}
</style>