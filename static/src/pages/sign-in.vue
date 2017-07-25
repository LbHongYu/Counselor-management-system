<template>
    <div class="sign-in">
		<h3 class="modify-affair-title">注册</h3>

	  	<div class="sign-detail">
	  		<label>用户名</label>
	  		<input class="sign-input" type="text" placeholder="真实姓名或者常用昵称(字数小于6)" v-model="userName">
	  		<span v-if="userNameErr">*请输入有效的姓名</span>

	  	</div>

	  	<div class="sign-detail">
	  		<label>密码</label>
	  		<input class="sign-input" type="password" placeholder="请输入6位数字密码" v-model.number="userPw">
			<span v-if="userPwErr">*请输入6位数字密码</span>		  		
	  	</div>  	
	  	<div class="sign-detail">
	  		<label>学号</label>
	  		<input class="sign-input" type="text" placeholder="请输入有效的学号" v-model.number="userId">
	  		<span v-if="userIdErr">*请输入有效的号码</span>
	  	</div>  	
	  	<div class="sign-detail">
	  		<label>身份</label>
	  		<select class="identity-select" v-model="identify">
	  			<option :value="2" selected>辅导员</option>
	  			<option :value="1">学生</option>
	  		</select>
	  		<span v-if="identifyErr">*请选择一种身份</span>
	  	</div>  	

	  	<button class="sign-submit" @click="submitSignIn">提交</button>
	  	<button class="sign-reset" @click="resetSignIn">重置</button>
    </div>
	
</template>

<script>
import router from "../router/index"
export default {
    data() {
            return {
                userNameErr: false,
                userPwErr: false,
                userIdErr: false,
                identifyErr:false,
                userName: "",
                userPw: null,
                userId:null,
                identify:null,
                selected:true
            }
        },
        methods: {
            submitSignIn() {
                this.verifyInfo();
                console.log("sign in")
                if(!this.userNameErr&&!this.userPwErr&&!this.userIdErr&&!this.identifyErr){
                	this.$http.post("http://localhost:8080/graduation/registLogin",{username:this.userName,id:this.userId,identify:this.identify,password:this.userPw}).then(response=>{
                		if(response.body){
                			alert("注册成功！")
                			router.push("/user-register");                			
                		}else{
                			alert("用户名或者学号（工号）已存在！")
                		}

                	})
                }
            },
            verifyInfo() {

                if (this.userName === "" || this.userName.length > 6) {
                    this.userNameErr = true;
                }
                if (!(/^\d{6}$/.test(this.userPw))) {
                    this.userPwErr = true
                }
                if (!(/^\d{4,11}$/.test(this.userId))) {
                    this.userIdErr = true
                }
                if(this.identify===null){
                	this.identifyErr=true;
                }
            },
            resetSignIn() {
                this.userNameErr = false;
                this.userPwErr = false;
                this.userIdErr = false;
                this.identifyErr=false;
                this.userName = "";
                this.userPw = null;
                this.userId=null;
                this.identify = null;
            }
        }
}

</script>

<style>
	.sign-in{
		width: 400px;
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
