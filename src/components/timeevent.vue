<template id="grid-template">
  <table cellpadding="0" cellspacing="0">
    <thead>
      <tr>
        <th v-for="(col,index) in columns" :key="index">
          {{ col }}
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr v-for="(index,entry) in dataList"  :key="entry">
        <td v-for="(col,index) in columns" :key="index">
          {{entry[col]}}
        </td>
      </tr> -->
      <tr  v-for="(item,index) in dataList"  :key="index">
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
</template>
<script>
export default {
  name: "simpleGrid",
  props: ['dataList', 'columns']
};
</script>
<style>
.green{
  color: green;
}
.red{
  color:red;
}
</style>

