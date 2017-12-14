<template>
  <div id="server">
    <div class="server_top">
         <i  @click="toggle()"></i>
        <span>汇交易学院服务套餐</span>
    </div>
    <div class="sever_con">
     <img class="notice-img" src="../assets/img/server_system_detail.ce883329.png" alt="汇交易学院服务套餐"/>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'server',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'LiveNoticePic'
    ])
  },
  mounted () {
    this.getLiveNoticePic()
  },
  methods: {
    ...mapActions([
      'getLiveNoticePic'
    ]),
    toggle:function () {
            window.history.go(-1)
    }
  }
}
</script>
<style>
div#server{
    width: 100%;
    max-width: 750px;
    height: 100%;
    overflow: auto;
    background: #fff;
    position: absolute;
}
.server_top{
    width: 100%;
    height: 44px;
    text-align: center;
    color:#fff;
    font-size: 16px;
    line-height: 44px;
    background: rgb(107,172,252);
    overflow: hidden;
}
 .server_top i{
      width: 19px;
      height: 32px;
      display: block;
      position: absolute;
      left: 0;
      top: 6px;
      margin-left:15px; 
      background-image: url(../assets/img/banner_pro.png);
      background-repeat: no-repeat;
      background-size:contain;
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); /* IE 9 */
      -moz-transform:rotate(180deg); /* Firefox */
      -webkit-transform:rotate(180deg); /* Safari and Chrome */
      -o-transform:rotate(180deg); /* Opera */
    }
.sever_con{
  width: 100%;
  height: auto;
  padding: 0 4px;
  padding-top: 15px;
} 
.sever_con img{
  width: 100%;
  height: auto;
}  

</style>
