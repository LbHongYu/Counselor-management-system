<template>
    <div class="sign-in">
		<h3 class="modify-affair-title">登录</h3>
	  	<div class="sign-detail">
	  		<label>用户名</label>
	  		<input class="sign-input" type="text" placeholder="真实姓名或者常用昵称(字数小于6)" v-model="user.userName">
	  		<span v-if="userNameErr">*请输入有效的姓名</span>

	  	</div>

	  	<div class="sign-detail">
	  		<label>密码</label>
	  		<input class="sign-input" type="password" placeholder="请输入6位数字密码" v-model="user.userPw">
			<span v-if="userPwErr">*请输入6位数字密码</span>		  		
	  	</div>  		
	  	<div class="sign-detail">
	  		<label>身份</label>
	  		<select class="identity-select" v-model="user.identify">
	  			<option :value="2" selected>辅导员</option>
	  			<option :value="1">学生</option>
	  		</select>
	  		<span v-if="identifyErr">*请选择一种身份</span>
	  		<span v-if="signInErr">*密码或者用户名错误</span>
	  	</div>  	

	  	<button class="sign-submit" @click="submitSignIn">提交</button>
	  	<button class="sign-reset" @click="resetSignIn">重置</button>
    </div>
	
</template>

<script>
import router from "../router/index"

import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../store/user'
export default {
    data() {
            return {
                userNameErr: false,
                userPwErr: false,
                userIdErr: false,
                user:{
	                userName: "",
	                userPw: null,
	                identify:null                	
                },
                identifyErr:false,
                selected:true,
                signInErr:false
            }
        },
    methods: {
        ...mapActions([USER_SIGNIN]),      	
        submitSignIn() {
            this.verifyInfo();
			if(!this.user.userPw || !this.user.userName) return
			
            if(!this.userNameErr&&!this.userPwErr&&!this.identifyErr){
				this.USER_SIGNIN({userId:this.user.identify,UserName:this.user.userName})
				router.push({ path: '/' })
				router.go(0)
				/*this.$http.post("http://localhost:8080/graduation/login",{username:this.user.userName,password:this.user.userPw,identify:this.user.identify}).then((res)=>{
						console.log( res.headers);
						if(res.body){
	            			console.log("登录成功！")
							router.push({ path: '/' })
							router.go(0)
							
						}else{
            				this.signInErr=true;
						
						}
            	}) */           	
            }
        },
        verifyInfo() {
            this.userNameErr = false;
            this.userPwErr = false;
            this.identifyErr=false;
            if (this.user.userName === "" || this.user.userName.length > 6) {
                this.userNameErr = true;
            }
            if (!(/^\d{6}$/.test(this.user.userPw))) {
                this.userPwErr = true
            }

            if(this.user.identify===null){
            	this.identifyErr=true;
            }
        },
        resetSignIn() {
            this.userNameErr = false;
            this.userPwErr = false;
            this.identifyErr=false;
            this.user.userName = "";
            this.user.userPw = null;
            this.user.identify = null;
        }
    }
}

</script>

<style>
	.sign-in{
		width: 600px;
		height: auto;
		margin:auto;
	}
	.sign-detail{
		width: 560px;
		margin-bottom:20px;
	}
	.sign-detail label{
		width:100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		margin-right: 30px;
		display: inline-block;
		border-radius: 20px;
		background-color: rgb(242,242,242);
	}
	.sign-detail input{
		width: 260px;
		height:30px;
	}
	.sign-detail span{
		width:auto;
		color: red;
		font-size: 12px;
		display: inline-block;
	}	
	.identity-select,.identity-select option{
		width: 100px;
		height: 30px;
	}
	.sign-submit{
		margin-left: 130px;
	}
	.sign-reset{
		margin-left: 40px;
	}
</style>
