<template>
<div class="introduce">
  <swiper :options="swiperOption">
    <swiper-slide v-for="item in LiveTeacherList" :key="item.Id">
      <img src="../assets/img/bg@2x.png" alt="名师风采">
      <div class="peo_introduce">
        <div class="peo_introduce_l"><img :src="item.TeacherFace" alt="直播老师"></div>
        <div class="peo_introduce_r">
          <h2>{{item.teachername}}</h2>
          <span>月均收益：{{item.Income}}</span>
          <p><button>实战跟盘</button><button>{{item.TeacherTag}}</button></p>
        </div>
      </div>
      <!-- I'm Slide {{ slide }} -->
      <p>{{item.Introduce}}</p>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
</template>

<script>
import { Group, CellBox, Divider } from 'vux'
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'introduce',
    data() {
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        let swiperSlides = this.swiperSlides
        if (swiperSlides.length < 6) swiperSlides.push(swiperSlides.length + 1)
      }, 3000),
      this.getLiveTeacherList()
    },
    computed: {
      ...mapGetters(['CurrentLive', 'LiveTeacherList', 'PlayLive'])
    },
    methods: {
      ...mapActions(['getLiveTeacherList'])
    },
    components: { Group, CellBox, Divider }
  }
</script>
<style lang="less">
body,.content-wrap{ 
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: rgb(44,47,53);
}
.introduce{
  width: 100%;
  padding: 0;
  height: auto;
  margin: 0 7.5px;
  //overflow: hidden;
}
.swiper-slide{
  width: 100%;
  height: 135px;
  //overflow: hidden;
  margin-top: 15px;
  display: inline-table;
  padding-right: 7.5px;
}
.swiper-slide img{
  width: 100%;
  height: 135px !important;
  height: auto;
  padding-right: 7.5px;
  padding-top:23px;
}
.swiper-slide p{
  color: #fff;
  font-size: 12px;
  margin-top: 19px;
  margin-bottom: 10px;
}
.peo_introduce{
  position: absolute;
  width: 100%;
  height: 135px;
  top: 0;
}
.peo_introduce_l img{
  width: auto;
  height: 133px !important;
  padding-top: 0;
  margin-top: 17px;
}

.peo_introduce_l{
  float: left;
  margin-left: 35px;
  height: 133px;
}
.peo_introduce_r{
  float: left;
  color: #fff;
  margin-left:20px; 
}
.peo_introduce_r h2{
  font-size: 16px;
  padding-top: 60.5px;
}
.peo_introduce_r span{
  font-size: 12px;
  padding:3px 0;
}
.peo_introduce_r p{
  padding-top: 8px;
  margin: 0;
}
.peo_introduce_r button{
  padding: 3px 6px;
  margin-right: 5px;
    background: rgba(204, 204, 204, 0);
    border: 2px solid #fff;
    color: #fff;
    border-radius: 6px;
    font-size: 10px;
}
.swiper-pagination-bullets{
  height: 10px;
  text-align: center;
  position: absolute;
  top: 0;
  margin-top: 135px;
  right: 0;
  margin-right: 7.5px;
  z-index: 99;
}
.swiper-pagination-bullet{
  width: 7px;
  height: 7px;
  border-radius: 100%;
  background: #ccc;
  color: #ccc;
  display: inline-block;
  margin: 0 5px;
}
.swiper-pagination-bullet-active{
  background: red;
  color: red;
}
.swiper-button-prev{
  width: 16px;
  height: 46px;
  background: url(../assets/img/previouspage@2x.png);
  position: absolute;
  margin-top: 69px;
  background-size: cover;
  top: 0;
  z-index: 99;
}
.swiper-button-next{
  width: 16px;
  height: 46px;
  background: url(../assets/img/next_page@2x.png);
  position: absolute;
  margin-top: 69px;
  background-size: cover;
  top: 0;
  right: 0;
  margin-right:7.5px;
  z-index: 99;
}
</style>

