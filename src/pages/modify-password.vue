<template>
  <div class="modify-password">
	  	<h3 class="password-title">密码修改</h3>
	  	<div class="old-password password">
	  		<p>请输入旧密码</p>
	  		<input type="password" v-model.number="oldPassword" placeholder="请输入6位数字密码">
	  		<span v-if="pwError">*请输入正确的密码</span>
	  	</div>
	  	<div class="new-password password">
	  		<p >请输入新密码</p>	   	
	  		<input type="password" v-model.number="newPassword"  placeholder="请输入6位数字密码">
	  		<span v-if="pwTypeError">*请输入正确格式的密码</span>

	  	</div>
	  	<div class="password">
	  		<p >请再次输入密码</p>	   	
	  		<input type="password" v-model.number="newPassword1" placeholder="请再次输入密码">
	  		<span v-if="pwDiff">*两次输入的新密码不相同</span>
	  	</div>
	  	<button class="password-submit" @click="submitPassword">提交</button>
	  	<button class="password-reset">重置</button>
  </div>
	
</template>

<script>
import {mapState} from "vuex"
	import router from "../router/index"
	export default {
		data(){
		  	return {
		  		pwDiff:false,
		  		pwTypeError:false,
		  		pwError:false,
		  		oldPassword:null,
		  		newPassword:null,
		  		newPassword1:null
		  	}
		},
		methods:{
			modifyPassword(){
				let oldPassword=this.oldPassword;
				let newPassword=this.newPassword;
				console.log(typeof newPassword);
				console.log(typeof oldPassword);
				//if(this.$router.params===1){}
				this.$http.post('http://localhost:8080/graduation/'+this.targetUrl, {"oldPw":oldPassword,"newPw":newPassword}).then(response => {
					if(response.body===false){
						alert("原密码输入错误！")
					}else{
						alert("密码修改成功！")
						router.push("/");//密码修改成功之后跳转到首页						
					}
				});
			},
			submitPassword(){
				this.checkNewPassword();
				this.modifyPassword();
			},
			checkNewPassword(){
				console.log(this.$router);
		  		this.pwDiff=false;
		  		this.pwTypeError=false;
		  		this.pwError=false;				
				if(!(/^\d{6}$/.test(this.newPassword))){
					this.pwTypeError=true
				}
				if(!this.pwTypeError&&this.newPassword!=this.newPassword1){
						this.pwDiff=true;

				}
			}	
		},
		computed:mapState({userId:state=>state.user.userId}),
	    created(){
	    	this.targetUrl=this.userId==1?"changeStuPW":"changeTeaPW"; 
	    }
	}
</script>

<style>
	.modify-password{
		width:316px;
		height:auto;	
		margin:auto;
	}
	.password-title{
		width: 300px;
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	    font-weight: 700;
	    font-size: 26px;
	    text-align: center;
	    margin-bottom: 20px;
	    color: rgba(0,0,0,.87);
	}
	.password span{
		font-size: 12px;
		color: red;
		/* display: none; */
		display: inline-block; 
		margin-bottom: 10px;
	}
	.password {
		width:500px;
		height: 60px;
		margin-bottom: 20px;

	}
	.password input{
		width:300px;
		height: 30px;
		margin-bottom: 20px;

	}
	.password p{
		font-size: 13px;
		margin-bottom: 10px;

	}
	.password-submit{
		margin-left: 50px;
	}
	.password-reset{
		margin-left: 20px;
	}
</style>
