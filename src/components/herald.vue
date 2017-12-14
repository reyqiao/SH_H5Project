<template>
  <div id="herald">
    <div class="herald_top">
         <i @click="toggle()"></i>
        <span>直播预告</span>
    </div>
    <div class="herald_con">
       <img class="notice-img" :src="LiveNoticePic" />
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'herald',
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
div#heraldt{
    width: 100%;
    max-width: 750px;
    height: 100%;
    overflow: auto;
    background: #fff;
    position: absolute;
}
.herald_top{
    width: 100%;
    height: 44px;
    text-align: center;
    color:#fff;
    font-size: 16px;
    line-height: 44px;
    background: rgb(107,172,252);
}
 .herald_top i{
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
.herald_con{
  width: 100%;
  height: auto;
  padding: 0 4px;
  padding-top: 15px;
} 
.herald_con img{
  width: 100%;
  height: auto;
}     
</style>
