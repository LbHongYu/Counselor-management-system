<template>
  <div class="release-news">
  	  <h3 class="release-news-title">发布消息</h3>
	  <form>
	  	<div class="news-Title">
	  		<label>消息标题</label>
	  		<input class="title-input" type="text" v-model="newsTitle">
	  		<span class="errMess" v-if="showTitleErr">*请填写消息的标题</span>

	  	</div>
	  	<div class="news-Content">
	  		<label>消息内容</label>
	  		<textarea class="content-input" type="text" v-model="newsContent"></textarea>
	  		<span class="errMess" v-if="showContentErr">*请填写消息的内容</span>
	  	</div>
	  </form>
	  	<button class="news-submit" @click="submitNews">提交</button>
	  	<button class="news-reset" @click="resetNews">重置</button>
  </div>
</template>

<script>
import router from "../../router/index"

  export default {
  	data(){
  		return {
  			newsTitle:"",
  			newsContent:"",
  			showContentErr:false,
  			showTitleErr:false

  		}
  	},
  	methods:{
  		resetNews(){
  			this.newsTitle="";
  			this.newsContent="";
  		},
	  	submitNews(){
	  		this.showTitleErr=false;
	  		this.showContentErr=false;

	  		if(this.newsContent==""){
	  			this.showContentErr=true;
	  		}
	  		if(this.newsTitle==""){
	  			this.showTitleErr=true;
	  		}
	  		if(this.showTitleErr==false&&this.showContentErr==false){
  				this.$http.post("http://localhost:8080/graduation/addNews",{title:this.newsTitle,text:this.newsContent}).then((data)=>{
					if(data.body){
            			alert("发布成功！")
						router.push({ path: '/news-list' })
						
					}else{
        				console.log(data.body)
        				console.log(data)
        				console.log("登录失败")
					
					}
            	})  
	  			
	  		}
	  	}
  	}
  }
</script>

<style scoped>
	.release-news{
		width:730px;
		height: auto;
		margin: auto;
	}
	.release-news-title{
		width: 620px;
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	    font-weight: 700;
	    font-size: 26px;
	    text-align: center;
	    margin-bottom: 20px;
	    color: rgba(0,0,0,.87);
	}
	.release-news label{
		width:100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		margin-right: 30px;
		display: inline-block;
		background-color: rgb(242,242,242);
	}
	.news-Title{
		margin-bottom: 20px
	}
	.news-Content{
		position: relative;
		margin-bottom: 20px
	}

	.title-input{
		width: 460px;
		height:40px;
		font-size: 16px;		
	}
	.content-input{
		width: 460px;
		height: 260px;
		font-size: 16px;
		font-family: "宋体, SimSun";
	}

	 .release-news button{
		width:86px;
		height: 40px;
		text-align: center;
		line-height: 40px;	
		border-color: #fff;
	    	background-color: rgb(75,160,232);		
	} 
	.news-Content textarea{
		vertical-align:top;
	}
	.news-submit{
		margin-left: 160px;
	}
	.news-reset{
		margin-left: 20px;
	}
	.errMess{
		color:red;
		font-size:14px;
	}

</style>
