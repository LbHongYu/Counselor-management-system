<template>
  <div class="release-file">
  	  <h3 class="release-file-title">上传资料</h3>
	  <form class="file-upload">
	  	<div class="file-input">
	  		<input type="file" name="uploadFile" id="fileUpload">
	  	</div>

	  </form>
	  	<button class="file-submit" @click="submitApply">上传</button>
  </div>
</template>

<script>
import router from "../../router/index"
  export default {
  	methods:{
		submitApply(){

			  var fileObj = document.getElementById('fileUpload').files[0]; // js 获取文件对象
			  if(fileObj==null){
			  	alert("请选择文件");
			  }else{
			  	this.showProgress=true;
			    var fileUrl = 'http://localhost:8080/graduation/uploadTeaFile'; // 接收上传文件的后台地址
			    // FormData 对象
			    var form = new FormData();

			    form.append('file', fileObj); // 文件对象
			    this.$http.post(fileUrl,form).then(res=>{
			    	if(res.body){
			    		alert("上传成功！")
			    		router.push("/material-list");
			    	}else{
			    		alert("上传失败！");
			    	}
			    })


			  }	        					
		}
  	}
  }
</script>

<style scoped>
	.release-file-title{
		width: auto;
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	    font-weight: 700;
	    font-size: 26px;
	    text-align: center;
	    margin-bottom: 80px;
	    color: rgba(0,0,0,.87);
	}
.file-upload{
	width:400px;
	height: auto;
	margin:auto;
}
.file-input{
	margin-bottom: 30px;
	margin-left: 120px;
}

.file-submit{
	margin-left: 460px;

}
</style>
