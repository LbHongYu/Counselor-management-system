<template>
    <div class="apply-affair">
    	<h3 class="apply-affair-title">事务申请</h3>
    	<form enctype="multipart/form-data" method="post">
		  	<div class="apply-detail">
		  		<label>标题</label>
		  		<input class="apply-input" type="text" name="title" v-model="affairTitle" placeholder="必填">
		  	</div>

		  	<div class="apply-detail">
		  		<label>事务种类</label>

				<select v-model="affairVarity" class="varity-select">
		  			<option>请假</option>
		  			<option>节假日表</option>
		  			<option>其他</option>
		  		</select>
		  	</div>

		  	<div class="apply-detail apply-content">
		  		<label>补充内容</label>
		  		<textarea class="apply-input" type="text" name="text" v-model="affairContent" placeholder="选填"></textarea>
		  	</div>

			<div class="apply-file">
				<span class="upload-column">附件上传</span>
				<!-- <span class="apply-upload">
					<input type="file" name="file"  id="choose">
					<span id="oOutput"></span>					
				</span> -->

				<input type='file' id='file' name='myfile' />
				<!-- <input type='button' @onclick='this.UpladFile()' value='上传' />	 -->			
				<!-- <progress id='progressBar' value='0' max='100' v-show="showProgress"></progress><span id='percentage'></span> -->
				<span v-show="errorMessage" class="error-message">*请完善事务信息</span>
			</div>


		  	
		  	<button class="apply-submit" @click.prevent="submitApply">提交</button>
		  	<button class="apply-reset"  @click="resetApply">重置</button>
		</form>
    </div>
	
</template>

<script>
import { mapState } from 'vuex'
import router from "../../router/index"
import FileUpload from '../../components/file-upload/FileUpload'
var oOutput = document.getElementById("output");
export default {

	data(){
		return{
			upload: {},
			affairTitle:null,
			affairContent:null,
			affairVarity:null,
			showProgress:false,
			errorMessage:false,
			oneFile:0
		}
	},	
	components: {
	},
	methods:{
		chooseFile(){
			this.oneFile++;
			var oChoose=document.getElementById("choose");
			oChoose.disabled=true;
			if(this.oneFile>1){
				 oChoose.onclick=function(event){
				 	event=event||window.event;
				 	if(event.preventDefault){
				 		event.preventDefault();	
				 		oOutput.innerHTML=只能上传一个文件;
				 	}else{
				 		window.event.returnValue = false; 
				 		oOutput.innerHTML=只能上传一个文件;
				 	}
				 }
			}
		},
		submitApply(){

			  // oReq.send(oData);
			  if(this.affairTitle==null||this.affairVarity==null){
			  	this.errorMessage=true;
			  }else{
			  	this.showProgress=true;
			    var fileObj = document.getElementById('file').files[0]; // js 获取文件对象
			    var fileUrl = 'http://localhost:8080/graduation/addAffair'; // 接收上传文件的后台地址
			    // FormData 对象
			    var form = new FormData();
			    form.append("title",this.affairTitle); // 可以增加表单数据
			    form.append("text",this.affairContent); 
			    form.append("kind",this.affairVarity); 
			    form.append('file', fileObj); // 文件对象

				this.$http.post(fileUrl,form).then(res=>{
					if(res.body){
						alert("申请成功！")
						router.push("/affair-list")
					}
				})	
			  }	        					
		},
		resetApply(){
			this.affairTitle=null;
			this.affairContent=null;
			this.affairVarity=null;			
		} 
		
	}
}
</script>

<style>
	.varity-select{
		width: 366px;
		height: 30px;
	}
	.apply-affair{
		width: 600px;
		height: auto;
		margin:auto;
	}
	.apply-affair-title{
		width: 540px;
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	    font-weight: 700;
	    font-size: 26px;
	    text-align: center;
	    margin-bottom: 20px;
	    color: rgba(0,0,0,.87);	
	}	
	.apply-detail{
		margin-bottom:20px;
	}
	.upload-column,.apply-detail label{
		width:100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		margin-right: 30px;
		display: inline-block;
		border-radius: 20px;
		background-color: rgb(242,242,242);
	}
	.apply-detail input{
		width: 360px;
		height:30px;
		font-size: 14px;			
	}

	.apply-content textarea{
		width: 420px;
		height: 120px;
		overflow:auto;
		font-size: 16px;
		font-family: "宋体, SimSun";
		vertical-align:top;

	}
	.apply-file input[type="file"]{
		border: 1px solid gray;
		width:180px;
	}

	.apply-upload{
		display: inline-block;
		height: auto;
		width: auto;
	}
	.error-message{
		font-size: 14px;
		color: red;
	}
	.apply-upload a{
		display: inline-block;
		margin-left: 10px;
		color:rgb(75,160,232);
	}
	.apply-submit{
		margin-left: 130px;
	}
	.apply-reset{
		margin-left: 40px;
	}
</style>
