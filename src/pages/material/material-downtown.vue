<template>
	
</template>
<style>
	
</style>

<script>

	var fileId=null;
	export default{
		name:"material-downtown",
		data(){
			return {
				fileId:fileId,
				userId:null			
			}
		},
		methods:{
			downtownMaterial(){
		 		this.$http.post("http://localhost:8080/graduation/"+this.targetUrl,{id:this.fileId})
		 		    .then(res=>{
		 		    	console.log(JSON.stringify(res.body))
		 		    })					
			}
		},
	    created(){
	    	this.targetUrl=this.userId==1?"downloadFile":"downloadTeaFile"; 
		 	console.log(this.targetUrl)
	    	this.downtownMaterial()
	 	},
	 	//在进入组件之前就获取文件的id,这时候不能保存在this的data中
	 	//所以将id保存在全局。
	 	beforeRouteEnter(to,from,next){
	 		console.log(to.params)
	 		fileId=to.params.fileId;	 		
	 		next();
	 	}

	}	
</script>