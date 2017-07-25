<template>
	<div class="news-content">
		<h3 class="news-title">{{newsData.title}}</h3>
		<div class="news-detail">{{newsData.text}}</div>
	</div>
</template>

<script>
	var newsId=null;
	export default{
		name:"newsContent",
		data(){
			return {
				newsId:newsId,
				newsData:{}
			}
		},
		methods:{
			getTextContent(){
		 		this.$http.post("http://localhost:8080/graduation/getTeaOneNews",{id:Number(this.newsId)})
		 		    .then(res=>{
		 		    	this.newsData={};
		 		    	this.newsData["title"]=res.body.title;
		 		    	this.newsData["text"]=res.body.text;
		 		    })				
			}
		},
		watch: {
	 	},
	 	created(){
	 		this.getTextContent()
	 	},
	 	beforeRouteEnter(to,from,next){
	 		newsId=to.params.newsId;
	 		next();
	 	}

	}
</script>

<style>
	.news-content{
		width:600px;
		height: auto;
		min-height: 426px;
	    margin: auto;
	}	
	.news-title{
		width:100%;
		height: 40px;
		text-align: center;
		font-size: 20px;
		color:gray;
	}
	.news-detail{
		font-size: 14px;
		line-height: 26px;
		letter-spacing: 1px;
		text-indent: 14px;
		color: #5D4B51;
	}
</style>