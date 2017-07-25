<template>
    <div class="affair-content">
    	<h3 class="affair-content-title">事务详情</h3>
		  	<div class="apply-detail">
		  		<label>标题</label>
		  		<p>{{affairContentData.title}}</p>
		  	</div>

		  	<div class="apply-detail">
		  		<label>事务种类</label>
		  		<p>{{affairContentData.text_kind}}</p>
		  	</div>

		  	<div class="apply-detail apply-content">
		  		<label>补充内容</label>
		  		<p class="stu-message">{{affairContentData.text}}</p>
		  	</div>

			<div class="affair-content-file">
				<span class="upload-column">附件</span>
				<a :href="fileURL" class="file-name">{{affairContentData.fileName}}</a>
			</div>

			<div class="student-template" v-if="userId===1">

				<div class="modify-detail modify-content">
			  		<p>状态</p>
			  		<span class="affair-status" v-if="affairContentData.status===2">已处理</span>
			  		<span class="affair-status" v-if="affairContentData.status===1">未处理</span>
			  	</div>

			  	<div class="apply-detail" v-if="affairContentData.status===2">
			  		<label>老师留言</label>
			  		<p class="stu-message">{{affairContentData.teaAnswer}}</p>
			  	</div>	
			</div>
			<div class="teacher-template" v-if="userId===2">
				<div class="modify-detail modify-content">
			  		<p>状态</p>
			  		<span class="affair-status" v-if="affairContentData.status===2">已处理</span>
			  		<span class="affair-status" v-if="affairContentData.status===1">未处理</span>
			  	</div>	
			  				
				<div class="apply-detail" v-if="userId===2&&affairContentData.status===1">
			  		<label class="message-label">留言</label>
			  		<textarea  v-model="teaAnswer"></textarea>
			  	</div>

			  	<button @click="submitAffair" v-if="affairContentData.status===1&&userId===2" class="submit-affair">提交</button>	
				
			</div>			



    </div>
	
</template>

<script>

import { mapState } from 'vuex'
import router from "../../router/index"
var affairId=null;
export default {
	data(){
		return{
			affairTitle:null,
			affairContentData:{},
			affairVarity:null,
			fileName:null,
			affairDone:true,
			getTeaAnswer:"",
			reply:"",
			fileName:"",
			downtownFile:"",
			teaAnswer:null,
			affairId:affairId,
			fileURL:""
		}
	},
    computed:mapState({ userId: state => state.user.userId }),

	methods:{
		submitAffair(){
			console.log(this.teaAnswer,this.affairId);          
	      	/*this.$http.post('http://localhost:8080/graduation/changeTeaAffair',{text:this.teaAnswer,affairID:this.affairId})
	      			  .then((response) => {
	      			  		if(response.body){
	      			  			router.push("/affair-list")	
	      			  		}
								
	      				});   					*/
	      	this.$http.post('http://localhost:8080/graduation/changeTeaAffair',{text:this.teaAnswer,affairID:this.affairId})
	      			  .then((response) => {
	      			  		if(response.body){
	      			  			router.push("/affair-list")	
	      			  		}
								
	      				});   					
	      			  		
		},
		getAffairContent(url){
			/*this.$http.post('http://localhost:8080/graduation/'+url,{id:this.affairId}).then(res=> {
								if(res.body){
									console.log(res.body);
									this.affairContentData=res.body;
									this.fileURL="http://localhost:8080/graduation/"+this.affairContentData.fileURL+this.affairContentData["fileName"]

								}
	      					});*/
			this.$http.post('http://localhost:8080/graduation/'+url,{id:this.affairId}).then(res=> {
								if(res.body){
									console.log(res.body);
									this.affairContentData=res.body;
									this.fileURL="http://localhost:8080/graduation/"+this.affairContentData.fileURL+this.affairContentData["fileName"]

								}
	      					});

		}
	},
	created(){
	   	this.targetUrl=this.userId==1?"affairView":"getTeaOneAffair"; 
	   	this.getAffairContent(this.targetUrl);
      			  
	},
	mounted(){
      	this.downtownFile="localhost:8080/graduation/downloadAffairFile?affairId="+affairId;

	},
	beforeRouteEnter(to,from,next){
 		affairId=to.params.affairId;	 		
 		next();
 	}
}
</script>

<style>
	.affair-content{
		width: 600px;
		height: auto;
		margin:auto;

	}
	.affair-content-title{
		width: 520px;
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	    font-weight: 700;
	    font-size: 26px;
	    text-align: center;
	    margin-bottom: 20px;
	    color: rgba(0,0,0,.87);	
	}	
	.modify-detail{
		margin-bottom:20px;
	}
	.stu-message{
		vertical-align:top;		
	}	
	.apply-detail p{
    width: 300px;
    min-height: 40px;
    line-height: 40px;
    margin-right: 30px;
    padding: 0 10px;
    border-radius: 20px;
    display: inline-block;
    color: #fff;
    background-color: gray;
	}	
	.apply-detail textarea{
		vertical-align:top;
		width:400px;
		height: 100px;
	}
	.upload-column,.modify-detail label,.modify-detail p{
		width:100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		margin-right: 30px;
		display: inline-block;
		border-radius: 20px;
		background-color: rgb(242,242,242);
	}
	.affair-status{
		width: auto;
		height: auto;
		padding:6px;
		color: #fff;
		font-size: 14px;
		background-color: rgb(75,160,232);
		border-radius: 10px;

	}
	.apply-content label{
		display: inline-block;
	}
	.apply-content p{
		width:300px;
		display: inline-block;
	}
	.affair-content-file{
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.file-name{
		color:rgb(75,160,232);
	}
	.submit-affair{
		margin-left: 200px;
	}
</style>
