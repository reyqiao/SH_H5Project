<template>
    <div class="pager-wrapper" v-if="totalPage > 0">
        <div class="pager-pages">
            <a v-show="currentPage > 1 && showPrev" @click="go(currentPage - 1)">上一页</a>
            <a v-show="currentPage < totalPage && showNext" @click="go(currentPage + 1)">下一页</a>
        </div>
        <div v-if="showJump" v-show="totalPage > 1" class="pager-jump">
            <span>共<em class="jump-total">{{totalPage}}</em>页 ，跳至</span>
            <input type="number" min="1" :max="totalPage" v-model="jumpPage" class="jump-input">
            <span>页</span>
            <a @click="go(jumpPage)">确定</a>
        </div>
    </div>
</template>
<script>

    /*
     * component pager 翻页页码组件
     */
    export default {
        name:'page',
        props: {
            totalPage: { // 总页数
                type: Number,
                default: 3,
                required: true
            },
            showItems: { // 显示出来的页数，如: 1 ... 34[5]67 ... 10
                type: Number,
                default: 1
            },
            showPrev: { // 是否显示“上一页”
                type: Boolean,
                default: true
            },
            showNext: { // 是否显示“下一页”
                type: Boolean,
                default: true
            },
            showJump: { // 是否显示“跳转”
                type: Boolean,
                default: false
            },
            initPage: {
                type: Number,
                default: 2
            },
            mode: {
                type: String,
                default: 'event' // 'event' | 'query' | 'params'
            },
            routeName: {
                type: String
            }
        },
        data () {
            return {
                currentPage: 0,
                jumpPage: 0,
            }
        },
        created () {
            this.currentPage = this.initPage
            if(this.mode == 'params' && !this.routeName) {
                throw 'need a route name when choose params mode in pager component'
            }
        },
        computed: {
            pages () {
                let getPages = (start,end) => {
                    if(start <= 1 || start > end || start >= this.totalPage) {
                        start = 2
                    }
                    if(end >= this.totalPage || end < start || end <= 1) {
                        end = this.totalPage - 1
                    }
                    let arr = []
                    for(let i = start; i <= end; i++) {
                        arr.push(i)
                    }
                    return arr
                }
                let counts = this.showItems
                if(this.totalPage < counts + 2) {
                    return getPages(2,this.totalPage)
                } else {
                    if(this.currentPage <= Math.ceil(counts/2)) {
                        return getPages(2,counts)
                    } else if(this.currentPage >= this.totalPage - Math.floor(counts/2)) {
                        return getPages(this.totalPage + 1 - counts,this.totalPage - 1)
                    } else {
                        let half = Math.ceil(counts/2) - 1
                        let end = this.currentPage + half
                        if(counts % 2 === 0) {
                            end++
                        }
                        return getPages(this.currentPage - half,end)
                    }
                }
            }
        },
        methods: {
            go (page) {
                if(page < 1) {
                    page = 1
                }
                if(page > this.totalPage) {
                    page = this.totalPage
                }
                if(page === this.currentPage) {
                    return
                }
                this.currentPage = parseInt(page,10)
                if(this.mode == 'query') {
                    let query = this.$route.query
                    query.page = this.currentPage
                    this.$router.go({query: query})
                } else if(this.mode == 'params') {
                    let params = this.$route.params
                    params.page = this.currentPage
                    this.$router.go({name: this.routeName,params: params})
                } else {
                    this.$emit('go-page',{
                        page: this.currentPage
                    })
                }
            }
        },
        watch: {
            currentPage (newVal) {
                this.jumpPage = newVal
            },
            initPage (newVal) {
                if(this.currentPage !== newVal) {
                    this.currentPage = newVal
                }
            }
        }
    }
</script>
<style>
    .pager-wrapper {
        margin-top: 15px;
        text-align: center;
    }
    .pager-pages {
        width: auto;
        float: right;
        height: 25px;
        line-height: 25px;
        margin-top:15px; 
    }
    .pager-wrapper a,
    .pager-wrapper strong {
        display: inline-block;
        min-width: 32px;
        height: 32px;
        padding: 0 10px;
        margin: 0 2px;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        color: #222;
    }
    .pager-wrapper a {
        border: 1px solid #ddd;
        border-radius: 2px;
        background-color: #fff;
        transition: all .2s;
        display: block !important; /*一直显示上一页*/
        float: left;
    }
    .pager-wrapper a:hover {
            color: rgb(33,150,243);
            border-color: rgb(33,150,243);
    }
    .pager-wrapper .active {
        background-color: rgb(33,150,243);
        color: #fff;
        border-color: rgb(33,150,243);
    }
    .pager-wrapper .active:hover {
            color: #fff;
    }
    .pager-jump {
        display: inline-block;
        height: 32px;
        margin-left: 20px;
    }
    .pager-jump span {
        line-height: 32px;
    }
    .pager-jump em {
        margin: 0 5px;
        font-style: normal;
    }
    .pager-jump .jump-input {
        width: 60px;
        height: 32px;
        padding: 5px;
        outline: none;
        border: 1px solid #ddd;
        font-size: 14px;
        vertical-align: top;
    }
    .pager-jump .jump-input:focus {
        border-color: rgb(33,150,243);
    }
.pager-pages>a{
  width:60px;
  height: 25px;
   font-size: 12px;
   border: 0;
   border-radius: 5px;
   line-height: 25px;
}
.pager-pages>a:first-child{background:rgb(248,136,27);margin-right: 7px; }
.pager-pages>a:last-child{background:rgb(243,190,6);}
</style>