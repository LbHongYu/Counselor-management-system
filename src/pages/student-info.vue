<template>
  <div class=" student-info">
      <p class="select-class">班级：
          <select v-model="classNumber">
            <option v-for="(item,index) in classList">{{item}}</option>
          </select>
      </p>
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
    			<tr v-for='(item,index) in studentInfo'>
            <td>{{item.s_id}}</td>
    				<td>{{item.name}}</td>
    				<td>{{item.sex}}</td>
    				<td>{{item.class}}</td>
    				<td :title="item.telephone">{{item.telephone}}</td>
    				<td :title="item.address">{{item.address}}</td>
    				<td :title="item.QQ">{{item.QQ}}</td>
    				<td :title="item.Email">{{item.Email}}</td>
    			</tr>
          <tr v-if="noChoose"><td  colspan="8" align="center" valign="middle">请选择班级</td></tr>
          <tr v-if="noData"><td  colspan="2" align="center" valign="middle">暂无数据</td></tr>
    		</tbody>
    	</table>
  </div>    
</template>

<script>
  export default {
    name:"navbar",
    data(){
      return {
        noChoose:true,
        noData:false,
        classNumber:null,
        classList:[],
        studentInfo:[]
      }
    },
    methods:{
      getClassList(){
        this.$http.post("http://localhost:8080/graduation/classView").then(
          response=>{
            console.log(response.body.classNumber)
              this.classList=response.body.classNumber;
          })
      },
      getStudentInfo(number){
         this.$http.get("http://localhost:8080/graduation/studentView",{classes:number,nowPage:1,rows:10}).then(
          response=>{
            let data=response.body.stuInfo;
            this.studentInfo=[];
            if(data&&data.length>0){
              this.noData=false;
              this.noChoose=false;
              data.forEach((d,i)=>{
                this.studentInfo.push({});
                this.studentInfo[i]['name']=d['s_name']
                this.studentInfo[i]['sex']=d['sex']
                this.studentInfo[i]['class']=d['classes']
                this.studentInfo[i]['telephone']=d['telephone']
                this.studentInfo[i]['address']=d['address']
                this.studentInfo[i]['QQ']=d['QQ']
                this.studentInfo[i]['Email']=d['email']
                this.studentInfo[i]['s_id']=d['s_id']
              })
            }else{
              this.noData=true
            }

        },(err)=>{
              this.noData=true
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
  }
  .select-class select{
    width: 80px;
    height: 26px;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
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

</style>
