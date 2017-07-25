<template>
    <div class=" modify-info">
    	<h3 class="modify-info-title">修改信息</h3>
		  	<div class=" modify-detail">
		  		<label>姓名</label>
		  		<input class="modify-input" type="text" v-model="userName" placeholder="真实姓名或者常用昵称(字数小于6)">
		  		<span v-if="userNameErr">*请输入有效的姓名</span>
		  	</div>

		  	<div class=" modify-detail">
		  		<label>电话</label>
		  		<input class="modify-input" type="text" v-model="phoneNum" placeholder="11位有效号码">
		  		<span v-if="phoneNumErr">*请输入有效的号码</span>
		  	</div>

		  	<div class=" modify-detail">
		  		<label>e-mail</label>
		  		<input class="modify-input" type="text" v-model="eMail" placeholder="常用邮箱">
		  		<span v-if="eMailErr">*请输入有效的邮箱</span>
		  	</div>

		  	<div class=" modify-detail">
		  		<label>QQ</label>
		  		<input class="modify-input" type="text" v-model="qqNum" placeholder="4-11位有效号码">
		  		<span v-if="qqNumErr">*请输入正确的格式</span>
		  	</div>

	
		  	<button class=" modify-submit" @click="submitInfo">提交</button>
		  	<button class=" modify-reset" @click="resetInfo">重置</button>
    </div>  	
</template>

<script>
import router from "../router/index"
import { mapState } from 'vuex'
  export default {
    name:"modifyInfo",
    data(){
    	return {
    		qqNum:"",
    		eMail:"",
    		phoneNum:"",
    		userName:"",
       		qqNumErr:false,
    		eMailErr:false,
    		phoneNumErr:false,
    		userNameErr:false,
    	}
    },
    computed:mapState({ userId: state => state.user.userId }),
    methods:{
    	submitInfo(){
    		this.checkInfo();
			this.$http.post('http://localhost:8080/graduation/'+this.targetUrl, {name:this.userName,telephone:Number(this.phoneNum),qq:Number(this.qqNum),email:this.eMail}).then(response => {
					if(response.body===false){
						alert("修改失败！")
					}else{
						alert("信息修改成功！")
						router.push("/")
					}
			});    		
    	},
	    checkInfo(){	    	
		    this.qqNumErr=false;
			this.eMailErr=false;
			this.phoneNumErr=false;
			this.userNameErr=false;
	    	//console.log(this.userName.length);
	    	if(!(/^[1-9][0-9]{4,11}$/.test(this.qqNum))){
	    		this.qqNumErr=true;
	    	}
	    	if(!(/^1\d{10}$/g.test(this.phoneNum))){
	    		this.phoneNumErr=true;
	    	}
	    	if(!( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.eMail))){
	    		this.eMailErr=true;
	    	}
	    	if(this.userName===""||this.userName.length>6){
	    		this.userNameErr=true;
	    	}
	    },
	    resetInfo(){
		    this.qqNum="";
			this.eMail="";
			this.phoneNum="";
			this.userName="";
	   		this.qqNumErr=false;
			this.eMailErr=false;
			this.phoneNumErr=false;
			this.userNameErr=false;
		}    
    },
    created(){
    	this.targetUrl=this.userId==1?"changeStuInfo":"changeTeaInfo"; 
    }
  }
</script>

<style scoped>
	.modify-info{
		width: 500px;
		height: auto;
		margin:auto;
	}
	.modify-info-title{
		width: 560px;
		font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
	    font-weight: 700;
	    font-size: 26px;
	    text-align: center;
	    margin-bottom: 20px;
	    color: rgba(0,0,0,.87);	
	}
	.modify-detail{
		width:600px;
		padding-bottom:20px;
	}
	.modify-detail span{
		width:auto;
		color: red;
		font-size: 12px;
		display: inline-block;
	}
	.modify-detail label{
		width:100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		margin-right: 30px;
		display: inline-block;
		border-radius: 20px;
		background-color: rgb(242,242,242);
	}	
	.modify-detail input{
		width: 320px;
		height:30px;
		margin-right: 10px;
		font-size: 12px;			
	}	
	.modify-submit{
		margin-left: 160px;
	}
	.modify-reset{
		margin-left: 40px;
	}
</style>
