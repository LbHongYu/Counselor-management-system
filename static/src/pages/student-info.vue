<template>
  <div class=" student-info">
      <p class="select-class">班级：
          <select v-model="classNumber">
            <option v-for="(item,index) in classList">{{item}}</option>
          </select>
      </p>
      <p class="class-tip"  v-if="studentInfo.length===0">*请选择班级</p>
    	<table class="info-table">
    		<thead>
    			<tr>
            <th>学号</th>
  	  			<th>姓名</th>
  	  			<th>性别</th>
  	  			<th>班级</th>
  	  			<th>电话</th>
  	  			<th>生源地</th>
  	  			<th>QQ</th>
  	  			<th>邮箱</th>
  	  		</tr>
    		</thead>
    		<tbody>
    			<tr v-if="studentInfo.length>0" v-for='(item,index) in studentInfo'>
            <td>{{item.s_id}}</td>
    				<td>{{item.name}}</td>
    				<td>{{item.sex}}</td>
    				<td>{{item.class}}</td>
    				<td :title="item.telephone">{{item.telephone}}</td>
    				<td :title="item.address">{{item.address}}</td>
    				<td :title="item.QQ">{{item.QQ}}</td>
    				<td :title="item.Email">{{item.Email}}</td>
    			</tr>
        </tbody>
      </table>
          <p v-if="studentInfo.length===0" class="info-none">暂无学生信息</p>
  </div>    
</template>

<script>
  export default {
    name:"navbar",
    data(){
      return {
        classNumber:null,
        classList:[],
        studentInfo:[]
      }
    },
    methods:{
      getClassList(){
        this.$http.post("http://localhost:8080/graduation/classView").then(
          response=>{
              this.classList=response.body;
          })
      },
      getStudentInfo(number){
        console.log(number)
        this.$http.post("http://localhost:8080/graduation/studentView",{classes:number,nowPage:1,rows:10}).then(
          response=>{
            let data=response.body;
            for(var i = 0,len=data.length;i<len-1;i++){
              var dataItem=JSON.parse(data[i]);
              this.studentInfo.push({});
              this.studentInfo[i]['name']=dataItem['s_name']
              this.studentInfo[i]['sex']=dataItem['sex']
              this.studentInfo[i]['class']=dataItem['classes']
              this.studentInfo[i]['telephone']=dataItem['telephone']
              this.studentInfo[i]['address']=dataItem['address']
              this.studentInfo[i]['QQ']=dataItem['QQ']
              this.studentInfo[i]['Email']=dataItem['email']
              this.studentInfo[i]['s_id']=dataItem['s_id']
            }
        })
      }
    },
    watch:{
      classNumber:function(newVal,oldValue){
        if(newVal!=oldValue){
          console.log(newVal);
          this.getStudentInfo(newVal)
        }
      }
    },
    mounted(){
      this.getClassList();
    }
  }
</script>

<style scoped>
	.info-table{
		width: 1000px;
		height: auto;
		margin: -20px 5px 0;
	}
  .select-class{
    height:60px;
    display: inline-block;
  }
	.info-table th{
		background-color: rgb(242,242,242);
	}
	.info-table th,.info-table td{
		font-weight: bold;
		border:1px solid gray;
		width:12.2%;
    word-break: break-all;
		height: 40px;
		font-size: 14px;
		font-family: "宋体, SimSun";
		text-align:center;
		line-height: 40px;
		display: inline-block;	
    overflow: hidden;
	}
  .class-tip{
    width:auto;
    color: red;
    font-size: 12px;
    display: inline-block;
  }
  .info-none{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
</style>
