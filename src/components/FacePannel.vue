<template>
  <div class="face-pannel" @click="handleFaceClick">
    <swiper>
      <swiper-item v-for="num in [0, 1, 2]" :key="num">
        <span :data-code="item" v-for="(item,index) in fillterCode(num)" class="icon" :key="index">
          <img :data-code="item" :src="imgUrl(index, num)" alt="">
        </span>
        <span data-code="delete" class="icon delete">
          <img data-code="delete" src="~static/img/emoji/delete.png" alt="">
        </span>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'vux'
  import { mapGetters, mapMutations } from 'vuex'
  import { faceToImg } from '../util/interaction'
  export default {
    name: 'FacePannel',
    data () {
      return {
        emojiCode: ['1f60a', '1f60c', '1f60f', '1f601', '1f604',
          '1f609', '1f612', '1f614', '1f616', '1f618', '1f621', '1f628',
          '1f630', '1f631', '1f633', '1f637', '1f603', '1f61e', '1f620',
          '1f61c', '1f60d', '1f613', '1f61d', '1f62d', '1f602', '1f622',
          '1f61a', '1f623', '1f632', '1f62a', '263a', '1f4aa', '1f44a',
          '1f44d', '1f44e', '1f44f', '1f64f', '1f446', '1f447', '261d',
          '270c', '1f44c', '270b', '270a', '1f440', '1f444', '1f35a',
          '1f382', '1f37b', '2615', '1f451', '1f494', '1f339', '1f4a3',
          '1f004', '1f437', '1f3b5', '2600', '1f319', '1f525', '1f47b',
          '1f489', '1f4a9', '1f47c', '1f52b', '1f3c6', '26bd', '1f680'
        ]
      }
    },
    computed: {
      ...mapGetters(['MsgContent'])
    },
    methods: {
      ...mapMutations(['editMsgContent']),
      fillterCode (index) {
        const start = index * 23
        return this.emojiCode.slice(start, start + 23)
      },
      imgUrl (index, step = 0) {
        step *= 23
        return `./static/img/emoji/${(index + step) + 1}.png`
      },
      showCode (code) {
        return code
      },
      handleFaceClick (e) {
        e.preventDefault()
        const code = e.target.attributes['data-code'].nodeValue || ''
        if (!code) {
          return
        }
        if (code === 'delete') {
          const result = this.MsgContent.match(/<img[^>]+?>|<[^>]+>|[^<]/g)
          if (result) {
            result.slice(0, result.length - 1)
            this.editMsgContent(result.slice(0, result.length - 1).join(''))
          }
        } else {
          this.editMsgContent(this.MsgContent += faceToImg(`[${code}]`))
        }
      }
    },
    components: { Swiper, SwiperItem }
  }
</script>

<style lang="less">
  .face-pannel {
    position: relative;
    height: 145px;
    background: #fff;
    width: 320px;
    margin: 0 auto;
    &.active,
    &:focus {
      background: #fff;
    }
    .icon {
      display: inline-block;
      padding: 5px 7px;
      img {
        width: 25px;
      }
    }
  }

  .vux-swiper-indicator.is-active {
    background: #000;
    opacity: 0.6;
  }
  .send-box-wrap .item .face{
    background: url(../assets/img/c638127846e4e5bc068269770de457e2.png) center no-repeat;
    background-size: cover;
    width: 0.853333rem;
    height: 0.853333rem;
  }
  .send-box-wrap .item .enter-msg, .send-box-wrap .item input {
    font-size: 0.373333rem;
    display: inline-block;
    width: 85%;
    border: 0.026667rem solid #ddd;
    padding: 0.186667rem 0.4rem;
    margin: 0.133333rem 0;
    border-radius: 0.4rem;
    text-align: left;
}
</style>
