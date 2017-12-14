<template>
<div class="advance">
  <div class="advance_titbox">
    <div class="advance_tit advance_tit_l" @click="news()" :class="{advance_tit_activ:istrue}">今日观点</div>
    <div class="advance_tit advance_tit_l"  @click="oldNews()" :class="{advance_tit_activ1:istrue1}" >历史观点</div>
    <div id="advance_tit">
      <select  v-model="selected" class="advance_tit advance_tit_r advance_tit_radius" >
        <option class="advance_text"  value="0">全部老师</option>
        <option  v-for="(teacher,index) in teacherlist" :value="teacher.userid" :key="index" >
          {{teacher.nickName}}
        </option>
      </select>
    </div>
  </div>
  <div id="app_n" >
			<div class="container" v-show="isok">
				<simple-grid :data-list="gridData" :columns="gridColumns"></simple-grid>
			</div>
      <p class="ok" v-show="ok">白银以上级别会员可查看</p>
	</div>
  <!-- 翻页的实现 -->
  <div class="advance_page">
     <div class="advance_page_l" >当前所在页面：{{page}}</div>
      <!-- <page></page> -->
      <div class="pager-wrapper">
        <div class="pager-pages">
            <a  @click="propage()">上一页</a>
            <a  @click="nextpage()">下一页</a>
        </div>
    </div>
  </div>
  
  <p >观点仅供参考，不作入市依据，您的下单靠且仅靠您的自主决策！</p>
</div>
</template>

<script>
import Vue from "vue";
import { menu } from '../router'
import VueResource from "vue-resource";
import { Group, CellBox, Divider } from "vuex";
import { mapGetters, mapActions } from "vuex";
//import page from "./page.vue";
import simpleGrid from "./timeevent.vue";
export default {
  name: "advance",
  data() {
    return {
      gridColumns: [
       "入场时间",
        "讲师",
        "品种",
        "方向",
        "建仓价",
        "止损",
        "止盈",
        "平仓价",
        "平仓时间",
        "止盈点数"
      ],
      gridData: [],
      page:'',
      teacherlist:[],
      selected:'0',
      type:'0',
      tid:'0',
      page:'1',
      sumpage:'',
      istrue:'true',
      istrue1:'',
      ok:'',
      isok:'ture',
      size:5,
    };
  },
  computed: {
    ...mapGetters(["UserInfo"]),
  },
  // ready: function() {
  //   this.getCustomers();
  // },
  mounted() {
    this.getAdvance();
    this.getteachers();
  },
  methods: {
    ...mapActions(["advance",'teachers']),
    getAdvance() {
      this.advance({
        usertoken: this.UserInfo.userToken,
        tid: 0, // 0 全部
        type: 1,
        page: 1,
        pagesize:5,
      }).then(res => {
        if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              //alert(this.UserInfo.roleId);
          }else{
            //console.log(res);
            this.gridData = res.data;
            this.page = res.page;   //当前页面
            this.tid = res.tid;   //教师id
            this.type = res.type;   //观点 1 最新观点 0 历史观点
            this.sumpage = Math.ceil(res.totalCount/this.size);
            //alert(this.sumpage)
            //console.log(res.page);
            
          }
        
      });
    },//下面获取老师列表
    news(){
      this.istrue1 ="";
      this.istrue ="true";
      this.page=1;
        this.advance({
          usertoken: this.UserInfo.userToken,
          tid: this.selected, // 0 全部
          type: 1,
          page: 1,
          pagesize:5,
        }).then(res => {
          if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              
              //alert(this.UserInfo.roleId);
          }else{
            this.gridData = res.data;
            this.type = 1;
            this.page = 1;
            this.sumpage = Math.ceil(res.totalCount/this.size);
          }
          //alert(this.sumpage)
        });
    },
    oldNews(){
      this.istrue ="";
      this.istrue1 ="true";
      this.page=1;
      pagesize:5,
      //console.log(this.selected),
      this.advance({
          usertoken: this.UserInfo.userToken,
          tid: this.selected, // 0 全部
          type: 0,
          page: 1,
          pagesize:5,
        }).then(res => {
          if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              this.page=1;
              //alert(this.UserInfo.roleId);
          }else{
             this.gridData = res.data;
            this.type = 0;
            this.sumpage = Math.ceil(res.totalCount/this.size);
            //alert(this.sumpage)
          }
         
        });
    },
    propage(){
      if(this.page <= 1){
        alert('已经是第一页了')
      }else{
        //alert(this.page);
        //alert(this.type);
        this.istrue ="";
        this.istrue1 ="true";
        this.advance({
          usertoken: this.UserInfo.userToken,
          tid: this.selected, // 0 全部
          type: 0,
          page: this.page,
          pagesize:5,
        }).then(res => {

          this.gridData = res.data;
          this.page -- ;
          res.page = this.page;
          
        })
      }
    },
    nextpage(){
      //alert(this.sumpage)
      //console.log(this.type)
        this.istrue ="";
        this.istrue1 ="true";
        this.advance({
          usertoken: this.UserInfo.userToken,
          tid: this.selected, // 0 全部
          type: 0,
          page: this.page,
          pagesize:5,
        }).then(res => {
          this.sumpage = Math.ceil(res.totalCount/this.size);
          if(this.page >= this.sumpage){
            alert('已经是最后一页了')
          }else{
            this.gridData = res.data;
            this.page ++ ;
          }
          //res.page = this.page;
          //alert(res.type)
        })
    },
    // choose(){
    //   this.advance({tid})
    // },
    getteachers(){
      this.teachers().then(res => {
        //console.log(res);
        this.teacherlist = res.data;
      });
    } 
   },
  components: { simpleGrid, simpleGrid },
  watch:{
   
    selected() {
      console.log(this.selected),
      
      //console.log(this.type),
      this.page=1,
      this.advance({
        userToken:this.UserInfo.userToken,
        tid: this.selected,
        type: 0,
        page: 1,
        pagesize:5,
      }).then(res => {
        //console.log(res.tid)
            if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              this.page=1;
              this.sumpage =1;
              //alert(this.UserInfo.roleId);
              
          }else{
            this.istrue ="";
            this.istrue1 ="true";
            this.sumpage = Math.ceil(res.totalCount/this.size);
            this.gridData = res.data;
            console.log(res);
           // alert(this.UserInfo.roleId);
          }
       // alert(tid)
      })
    }
  }
}

</script>
<style lang="less">
body,
.content-wrap {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: rgb(44, 47, 53);
}
.advance {
  width: 100%;
  padding: 0;
  height: auto;
  margin: 0 7.5px;
}
.advance_titbox {
  width: 100%;
  height: 57px;
}
.advance_tit {
  width: 66.5px;
  height: 27px;
  font-size: 12px;
  color: rgb(164, 107, 14);
  border: 1px solid rgb(243, 190, 6);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 15px;
  text-align: center;
  line-height: 27px;
}
.advance_tit_l {
  float: left;
  margin-right: 9px;
}
.advance_tit_r {
  width: 90px;
  float: right;
  background: rgba(204, 204, 204, 0);
  margin-right: 15px;
}
.advance_tit_r option {
  width: 85px;
  background: rgba(204, 204, 204, 0);
  border: 0;
}
.advance_tit_radius {
  border-radius: 15px;
  text-indent: 15px;
}
.advance_tit_activ {
  background: rgb(243, 190, 6);
}
.advance_tit_activ1 {
  background: rgb(243, 190, 6);
}
.container table{
  width: 100%;
  //height: 4.35rem;
  display: block;
  overflow-x: auto;
  overflow-y: auto;
  //height: 199px;
}
table,
thead,
tr,
tbody,
th,
td {
  display: block;
}
.container table> thead {
  width: 950px;
  height: 31px;
  background: rgb(35, 38, 42);
  color: rgb(215, 215, 215);
  font-size: 12px;
  line-height: 31px;
  //position: absolute;
  margin-top: -2px;
}
.container table> thead tr th {
  width: 95px;
  text-align: center;
  float: left;
}
.container  table> tbody tr td {
  width: 95px;
  height: 100%;
  text-align: center;
  float: left;
  border: 1px solid #ccc;
  border-collapse: collapse;
}
.container table> tbody tr {
  height: 25px;
  line-height: 25px;
  border-collapse: collapse;
}
// .container table> tbody tr td:last-child {
//   color: green;
// }
.container table> tbody {
  font-size: 10px;
  color: rgb(215, 215, 215);
  background-color: rgb(48, 50, 55);
  text-align: center;
  width: 950px;
  //margin-top: 30px;
}

.advance_page {
  width: 100%;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid rgb(36, 38, 43);
  box-sizing: border-box;
  padding-right: 15px;
  margin-top: -10px;
}
.advance > p {
  font-size: 10px;
  color: #fff;
  height: 31px;
  line-height: 31px;
  text-align: center;
}
.advance_page_l {
  width: 50%;
  float: left;
  height: 25px;
  line-height: 25px;
  color: #fff;
  font-size: 12px;
  margin-top: 15px;
}
.advance_page_r {
  width: auto;
  float: right;
  height: 25px;
  line-height: 25px;
  margin-top: 15px;
}
.advance_page_r > button {
  width: 53px;
  height: 100%;
  font-size: 12px;
  border: 0;
  border-radius: 10px;
}
.advance_page_r > button:first-child {
  background: rgb(248, 136, 27);
  margin-right: 7px;
}
.advance_page_r > button:last-child {
  background: rgb(243, 190, 6);
}
P.ok{
  color: #FFF;
  font-size: 18PX;
  text-align: center;
}
//翻页

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
