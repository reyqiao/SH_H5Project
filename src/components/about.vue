<template>
  <div id="about">
    <div class="about_top">
         <i  @click="toggle()"></i>
        <span>关于汇交易</span>
    </div>
    <div class="about_con">
        <h2>汇交易简介</h2>
        <p>汇交易学院是一家致力于为外汇交易者打造实战能力的教育平台从实战出发开发出一套完善的新手教学体系以及互动式进阶指导体系，旨在丰富外汇投资者的外汇知识、提高他们的交易水平。下设汇交易金融研究所，专注于黄金外汇投资领域的深度研究，致力成为国内领先、国际知名的民间第三方金融研究与服务机构</p>
    </div>
    <div class="about_con about_con2">
        <h2>汇交易优势与目标</h2>
        <p>本公司地处中国经济繁华的沿海城市—上海，在地理位置上有着得天独厚的优势和资源。目标：帮助交易者在实战中学习，在学习中打造专属自己的交易系统，实现稳定盈利。</p>
    </div>
    <div class="about_con">
        <h2>我们的服务</h2>
        <p>免费直播在线讲解，多层次交易教学体系，互动式VIP会员服务体系以及基于交易系统的策略喊单订阅服务；同时基于大数据在交易领域的技术应用，配套量化智能指标，让普通交易者掌握市场动向，把握入场时机。目前汇交易提供黄金外汇常规服务：《交易日刊》《大数据特刊》、《关键波段布局》、《多空通道线》（智能量化指标）以及投资者外汇知识学习培训等。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'I am about'
    }
  },
  methods: {
       toggle:function () {
           //window.history.go(-1)
          this.$router.push('/home')
           
       }
   }
}
</script>
<style>
div#about{
    width: 100%;
    max-width: 750px;
    height: 100%;
    overflow: auto;
    background: #fff;
    position: absolute;
}
.about_top{
    width: 100%;
    height: 44px;
    text-align: center;
    color:#fff;
    font-size: 16px;
    line-height: 44px;
    background: rgb(107,172,252);
}
 .about_top i{
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
    .about_con {
        width: 100%;
        padding:0 15px;
        height: auto;

    }
    .about_con2 h2{
        width: 127.5px !important;
    }
    .about_con h2{
        width: 82px;
        height: 21px;
        margin-top:25px;
        margin-bottom: 19px;
        color:rgb(255,255,255);
        font-size: 12px;
        background: url(../assets/img/scroll@2x.png) center;
        background-repeat: no-repeat;
        background-size:cover;
        line-height: 21px;
        text-indent: 6px;
    }
    .about_con p{
        font-size: 14px;
        color: rgb(0,0,0);
    }
    div.about_con:last-child{
        margin-bottom: 26px;
    }
</style>
