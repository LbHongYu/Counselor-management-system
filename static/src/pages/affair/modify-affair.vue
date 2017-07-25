<template>
    <div class="modify-affair">
    	<h3 class="modify-affair-title">事务详情</h3>
    	<form enctype="multipart/form-data" method="post">
		  	<div class="apply-detail">
		  		<label>标题</label>
		  		<input class="apply-input" type="text" name="title" v-model="affairTitle" placeholder="必填">
		  	</div>

		  	<div class="apply-detail">
		  		<label>事务种类</label>
		  		<input class="apply-input" type="text" name="kind"  v-model="affairVarity" placeholder="必填">
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
				<progress id='progressBar' value='0' max='100' v-show="showProgress"></progress><span id='percentage'></span>
				<span v-show="errorMessage" class="error-message">*请完善事务信息</span>
			</div>

			<div class="modify-detail modify-content">
		  		<p>状态</p>
		  		<span class="modify-status">已处理</span>
		  		<!-- <span class="modify-status">未处理</span> -->
		  	</div>

		  	<button class="modify-submit" @click="submitModify">修改</button>
		  	<button class="modify-reset"  @click="resetModify">重置</button>
		</form>

    </div>
	
</template>

<script>
import router from "../../router/index"
var affairId=null;
export default {
	data(){
		return{
			affairTitle:null,
			affairContent:null,
			affairVarity:null,
			reply:""
		}
	},
	methods:{
		submitModify(){
		  // var oData = new FormData(document.forms.namedItem("applyAffair"));

		  // console.log(oData);
			//router.push({path: 'apply-finish'});
	      	/*this.$http.post('localhost:8080/graduation/addAffair',{title:this.affairTitle,text:this.affairContent,kind:this.affairVarity,file:"a"})
	      			  .then((response) => {
								router.push({ path: 'apply-finish' })
	      					},res=>{
								
	      					});*/

			  // var oReq = new XMLHttpRequest();
			  // oReq.open("POST", "localhost:8080/graduation/addAffair", true);
			  // oReq.onload = function(oEvent) {
			  //   if (oReq.status == 200) {
			  //     oOutput.innerHTML = "Uploaded!";
			  //   } else {
			  //     oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
			  //   }
			  // };

			  // oReq.send(oData);
			  if(this.affairTitle==null||this.affairVarity==null){
			  	this.errorMessage=true;
			  }else{
			  	this.showProgress=true;
			    var fileObj = document.getElementById('file').files[0]; // js 获取文件对象
			    var fileUrl = 'localhost:8080/graduation/addAffair'; // 接收上传文件的后台地址
			    // FormData 对象
			    var form = new FormData();
			    form.append("title",this.affairTitle); // 可以增加表单数据
			    form.append("text",this.affairContent); 
			    form.append("kind",this.affairVarity); 
			    form.append('file', fileObj); // 文件对象

			    // XMLHttpRequest 对象
			    var xhr = new XMLHttpRequest();
			    xhr.open('post', fileUrl, true);
			    xhr.onload = function() {
			        // alert('上传完成!');
			    };
			    xhr.upload.addEventListener('progress', this.progressFunction, false);
			    xhr.send(form);

				function progressFunction(evt) {
				    var progressBar = document.getElementById('progressBar');
				    var percentageDiv = document.getElementById('percentage');
				    if (evt.lengthComputable) {
				        progessBar.max = evt.total;
				        progressBar.value = evt.loaded;
				        percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + '%';
				    }
				}	

			  }      					
		},
		resetModify(){
			this.affairTitle=null;
			this.affairContent=null;
			this.affairVarity=null;			
		} 
	},
	created(){
      	/*this.$http.get('localhost:8080/graduation/affairView'+this.affairId)
      			  .then((response) => {
							//得到事务中的值
      					},res=>{
							
      					});*/	
		this.affairTitle="我是事务的标题";
		this.affairContent="我是事务的内容";
		this.affairVarity="我是事务的种类";
		this.reply="已处理";
	},
	beforeRouteEnter(to,from,next){
 		affairId=to.params.affairId;	 		
 		next();
 	}
}
</script>

<style>
	.modify-affair{
		width: 600px;
		height: auto;
		margin:auto;
	}
	.modify-affair-title{
		width: 540px;
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
	.modify-status{
		width: auto;
		height: auto;
		padding:6px;
		color: #fff;
		font-size: 14px;
		background-color: rgb(75,160,232);
		border-radius: 10px;

	}
	.modify-detail input{
		width: 360px;
		height:30px;
		font-size: 16px;			
	}
	.modify-content{
		position: relative;
	}
	.modify-content textarea{
		width: 460px;
		height: 120px;
		overflow:auto;
		font-size: 16px;
		font-family: "宋体, SimSun";
		position: absolute;
		top:0;
		left:134px;
	}	
	.modify-file{
		margin-top: 110px;
		margin-bottom: 20px;
	}
	.modify-upload{
		display: inline-block;
		height: auto;
		width: auto;
	}
	.modify-upload a{
		display: inline-block;
		margin-left: 10px;
		color:rgb(75,160,232);
	}
	.modify-submit{
		margin-left: 130px;
	}
	.modify-reset{
		margin-left: 40px;
	}
</style>
