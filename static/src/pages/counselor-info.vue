<template>
  <div class="c-info">
	  	<h3 class="c-info-title">辅导员信息</h3>
	  	<ul>
	  		<li>
	  			<div class="info">
	  				<span class="info-name">姓名</span>
	  				<span class="info-detail">{{counselorInfo.t_name}}</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="info">
	  				<span class="info-name">性别</span>
	  				<span class="info-detail">{{counselorInfo.sex}}</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="info">
	  				<span class="info-name">电话</span>
	  				<span class="info-detail">{{counselorInfo.telephone}}</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="info">
	  				<span class="info-name">QQ</span>
	  				<span class="info-detail">{{counselorInfo.QQ}}</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="info">
	  				<span class="info-name">邮箱</span>
	  				<span class="info-detail">{{counselorInfo.email}}</span>
	  			</div>
	  		</li>
	  	</ul>

  </div>
	
</template>


<script>
export default {
	data(){
		return{
			counselorInfo:{}
		}
	},
	methods:{
		getTeaInfo(){
			this.$http.post("http://localhost:8080/graduation/getTeaInfo").then(
				res=>{
					if(res.body){
						this.counselorInfo=res.body;

					}
				})
		}
	},
	created(){
		this.getTeaInfo();
	}
  
}
</script>

<style>
	.c-info{
		width:406px;
		height:auto;		
		margin:auto;
	}
	.c-info-title{
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	    font-weight: 700;
	    font-size: 26px;
	    text-align: center;
	    margin-bottom: 20px;
	    color: rgba(0,0,0,.87);
	}
	.info{
		font-size:16px; 
		line-height: 50px;
	}
	.info span{
		display: inline-block;
	}
	.info-name{
		width:100px;
		height: 50px;
		margin-right: 30px;
		text-align: center;
		background-color: rgb(242,242,242);
	}
	.info-detail{
		width:200px;
		height: 50px;
		padding-left: 60px;
		margin-bottom: 20px;
		background-color: rgb(215,215,215);
	}
</style>
