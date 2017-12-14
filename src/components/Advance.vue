<template>
<div class="advance">
  <div class="advance_titbox">
    <div class="advance_tit advance_tit_l" @click="news()" :class="{advance_tit_activ:istrue}">今日观点</div>
    <div class="advance_tit advance_tit_l"  @click="oldNews()" :class="{advance_tit_activ1:istrue1}" >历史观点</div>
    <div id="advance_tit">
      <select  v-model="selected" class="advance_tit advance_tit_r advance_tit_radius" >
        <option class="advance_text"  value="0">全部老师</option>
        <option  v-for="(teacher,index) in teacherlist" :value="teacher.userid" :key="index" >
          &nbsp;&nbsp;{{teacher.nickName}}
        </option>
      </select>
    </div>
  </div>
  <div id="app_n" >
			<div class="container" v-show="isok">
				<!--<simple-grid :data-list="rongliang" :columns="gridColumns"></simple-grid>-->
				<table class="three_td">
					<thead>
			      <tr>
			        <th v-for="(col,index) in gridColumns" :key="index">
			          {{ col }}
			        </th>
			      </tr>
			    </thead>
				  <tbody>
				    <tr v-for="item in listt2">
				      <td>{{item.createtime}}</td>
				      <td>{{item.nickName}}</td>
				      <td>{{item.ctypeName}}</td>
				      <td>{{item.direction}}</td>
				      <td>{{item.jcPrice}}</td>
				      <td>{{item.zsPrice}}</td>
				      <td>{{item.zyPrice}}</td>
				      <td>{{item.pcPrice}}</td>
				      <td>{{item.pctime}}</td>
				      <td :class="item.zyPoint*1 >= 0? 'red':'green'">{{item.zyPoint}}</td>
				    </tr>
				  </tbody>
				</table>
			</div>
      <p class="ok" v-show="ok">白银以上级别会员可查看</p>
	</div>
  
<div class="advance_page">
	<div class="advance_page_l" >当前页面：{{curPage +1}}<font>&nbsp;&nbsp;(左右拖动查看全部消息)</font></div>
	<div class="pages" v-show="onn">                        
	     <button class="previem" @click="page('last')" v-show='curPage>0'>上一页</button>
	     <button class="next" @click="page('!last')" v-show="curPage<pageCount-1">下一页</button>
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
      //gridData: [],
      teacherlist:[],
      selected:'0',
      type:'0',
      tid:'0',
      istrue:'true',
      istrue1:'',
      ok:'',
      isok:'ture',
      listt2:[],//页面要展示的数据
      pageSize:5,//翻页每页显示数据
      curPage:0,//当前页面
      pageCount:'',//总共页面数
      onn:true,//默认显示分页
      rongliang:[]
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
        type: 0,
        page: 1,
        pagesize:999999,
      }).then(res => {
        if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              //alert(this.UserInfo.roleId);
         }else{
            this.rongliang = res.data;
						this.fanye();
            
          }
        
      });
    },//下面获取老师列表
    news(){
      this.istrue1 ="";
      this.istrue ="true";
        
        this.advance({
          usertoken: this.UserInfo.userToken,
          tid: this.selected, // 0 全部
          type: 1,
          page: 1,
          pagesize:999999,
        }).then(res => {
          if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              
              //alert(this.UserInfo.roleId);
          }else{
          	this.rongliang = res.data;
          	this.curPage=0,
          	this.fanye();
          }
          //alert(this.sumpage)
        });
    },
    oldNews(){
      this.istrue ="";
      this.istrue1 ="true";
      
      this.advance({
          usertoken: this.UserInfo.userToken,
          tid: this.selected, // 0 全部
          type: 0,
          page: 1,
          pagesize:9999999,
        }).then(res => {
          if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              this.page=1;
              //alert(this.UserInfo.roleId);
          }else{
          	this.rongliang = res.data;
          	//alert(this.rongliang)
          	this.curPage=0,
         		this.fanye();
          }
         
        });
    },
    page:function(el){//点击翻页                 
      el=='last'?this.curPage--:this.curPage++;
      var curtotal=this.curPage*this.pageSize;
      var tiaoshu=this.curPage*this.pageSize+this.pageSize;
      this.listt2=this.rongliang.slice(curtotal,tiaoshu);
      document.body.scrollTop = 0;
    },
    fanye:function(){//分页处理
      var that=this;
      that.listt2=[];
      if(that.rongliang){                             
      that.pageCount=Math.ceil(that.rongliang.length/that.pageSize);
	      for(var i=0;i<that.pageSize;i++){
		      if(that.rongliang[i]){                                 
		        that.listt2.push(that.rongliang[i]);
		      };
	      };
      };
    },        

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
      this.curPage=0,
      this.advance({
        userToken:this.UserInfo.userToken,
        tid: this.selected,
        type: 0,
        page: 1,
        pagesize:999999,
      }).then(res => {
        //console.log(res.tid)
            if((this.UserInfo.roleId =="0")||(this.UserInfo.roleId =="1")){
              this.ok ='true';
              this.isok ='';
              this.page=1;
         
              
          }else{
          	this.rongliang = res.data;
            this.istrue ="";
            this.istrue1 ="true";
            this.fanye();
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
  //background: rgb(44, 47, 53);
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
  border-bottom: 1px solid #d2d5dc2e;
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
  //width: 50%;
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
    .pages {
        width: auto;
        float: right;
        height: 25px;
        line-height: 25px;
        margin-top:15px; 
    }
    .pages button,
    .pages strong {
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
    .pages button {
        border: 1px solid #ddd;
        border-radius: 2px;
        background-color: #fff;
        transition: all .2s;
       /* display: block !important; /*一直显示上一页*/
        float: left;
    }
    .pages button:hover {
            color: rgb(33,150,243);
            border-color: rgb(33,150,243);
    }
    .pages .active {
        background-color: rgb(33,150,243);
        color: #fff;
        border-color: rgb(33,150,243);
    }
    .pages .active:hover {
            color: #fff;
    }

.pages>button{
  width:60px;
  height: 25px;
   font-size: 12px;
   border: 0;
   border-radius: 5px;
   line-height: 25px;
}
.pages>button:first-child{background:rgb(248,136,27);margin-right: 7px; }
.pages>button:last-child{background:rgb(243,190,6);}
.green{
  color: green;
}
.red{
  color:red;
}
[v-cloak] {
  display: none;
}
</style>
