<template>
  <div class="record">
    <tab>
      <tab-item v-for="(videoType, index) in typeList" :key="index" :selected="select === index" @on-item-click="changeSelectedLiveVideoType(index)">
        {{videoType.VideoName}}
      </tab-item>
    </tab>
    <div class="video-list">
      <div v-for="(videoInfo, index) in videoList.list" :key="index" @click="playVideo(videoInfo)" class="video-item">
        <div class="video-info">
          <p class="video-title line-limit-length">{{videoInfo.VideoTheme}}</p>
          <p class="video-introduce line-limit-length_p">{{videoInfo.Introduce}}</p>
        </div>
        <div class="video-img">
          <img :src="videoInfo.Cover"></img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Group, Tab, TabItem, CellBox } from "vux";

export default {
  name: "Record",
  components: {
    Group,
    Tab,
    TabItem,
    CellBox
  },
  data() {
    return {
      msg: "Record!",
      select: 0
    };
  },
  computed: {
    ...mapGetters({
      typeList: "LiveVideoTypeList",
      videoList: "LiveVideo"
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapActions([
      "getLiveVideoType",
      "getLiveVideo",
      "initSelectedLiveVideoType"
    ]),
    ...mapMutations(["setPlayLive", "setVideoShow"]),
    async init() {
      await this.getLiveVideoType();
      await this.getLiveVideo({
        type: this.videoList.typeId,
        pageindex: this.videoList.page,
        pagesize: this.videoList.size
      });
    },
    changeSelectedLiveVideoType(index) {
      this.select = index;
      this.initSelectedLiveVideoType(this.typeList[index]);
      this.getLiveVideo({
        type: this.videoList.typeId,
        pageindex: this.videoList.page,
        pagesize: this.videoList.size
      });
    },
    playVideo(videoInfo) {
      this.setPlayLive([
        {
          Title: videoInfo.VideoTheme,
          Description: videoInfo.Introduce,
          HLSUrl: videoInfo.VideoPath,
          type: "record"
        }
      ]);
      this.setVideoShow(true);
    }
  }
};
</script>
<style lang="less">
.record {
  width: 100%;
  height: 100%;
  //overflow-y: auto;
  overflow: hidden;
}

.vux-tab .vux-tab-item.vux-tab-selected {
  color: rgb(243, 190, 6);
  clear: both;
  z-index: 11;
}
// .record .vux-tab .vux-tab-item{
//   width: 90px;
//   height: 27px;
//   padding: 7px 9px;
//   line-height: 27px;
//   border: 1px solid rgb(243,190,6);
//   border-radius: 6px;
// }
.video-list {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  //height: 300px;
  color: #fff;
  height: 80%;
  .video-item {
    height: 74px;
    width: 100%;
    align-items: center;
    padding: 0 10px;
    display: flex;
    margin: 10px auto;
    .video-img {
      flex: 0 0 120px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .video-info {
      margin: 0 10px;
      flex: auto;
      .video-title {
        font-size: 14px;
      }
      .video-introduce {
        font-size: 12px;
        font-weight: 200;
      }
    }
  }
}
.line-limit-length {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
  max-width: 200px;
}
.line-limit-length_p {
  overflow: hidden;
  height: 42px;
  line-height: 21px;
  text-overflow: ellipsis;
}
// .record>div.vux-tab{
//   position: absolute;
//     width: 100%;
// }
</style>
