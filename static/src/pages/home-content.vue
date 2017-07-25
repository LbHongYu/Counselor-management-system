<template>
  	<div class="home-content">
  		<div class="home-pictures">
			<img src="../assets/hp1.png" width="1000px" height="300px">
  		</div>
  		<div class="news-list">
				<h3 class="skills-title">
					<span class="title-name">最新新闻</span>
					<span class="title-icon"><router-link to="/news-list">>>更多</router-link></span>
				</h3>
				<ul class="skill-article">
					<li v-for="item in newsTitle">
		  				<router-link :to="{ name: 'news-content', params: { newsId: item.newsId}}">
		  					{{item.title}}
		  				</router-link>						
					</li>
					<p class="no-news" v-if="newsTitle.length===0">暂时还没有新闻信息</p>
				</ul>
  		</div>
  	</div>
</template>

<script>
import { mapState } from 'vuex'
 export default {
    name:"navbar",
    components:{

    },
    data(){
    	return {
    		newsTitle:[],
    		targetUrl:"",
    		rows:4
    	}
    },
    computed:mapState({ userId: state => state.user.userId }),

    methods:{
		getNewsTitle(page,url){
			if(this.userId&&this.userId!==undefined){
	            this.$http.post("http://localhost:8080/graduation/"+url,{nowPage:page,rows:this.rows})
	        		.then(function(res){
	        			this.newsTitle=[];
	        			let data=res.body;
	        			for(var i=0,len=data.length-1;i<len;i++){
	        				this.newsTitle.push({});
	        				let dataItem=JSON.parse(data[i])
	        				this.newsTitle[i]["title"]=dataItem["title"];
	        				this.newsTitle[i]["newsId"]=dataItem["newsId"];
	        				this.newsTitle[i]["checked"]=false;
	        			}
	        		},function(err){
	        			console.log(err)
	        		}) 
			}else{
				return;
			}   		
		}
    },
	created(){
		console.log(this.userId)
    	this.targetUrl=this.userId==1?"getNews":"teaNews"; 
    	this.getNewsTitle(1,this.targetUrl);
    }    
  }
</script>

<style scoped>
.home-pictures{
	width: 100%;
	height: 300px;
}
.skills-title{
	display: inline-block;
	width: 100%;
	height: 40px;
	line-height:40px;
	text-indent: 20px;
	color: #fff;
	background: rgb(75,160,232);
}
.title-icon{
   	font-size: 14px;
	display: inline-block;
	float: right;
   	line-height: 40px;
	margin-right:80px;
}
.skills-title .title-icon a{
	color: #fff;
}
.title-name{
	font-size: 18px;
}
.news-list{
	margin-top: 20px;
}
.news-list ul{
	width:100%;
}
.news-list ul li{
	width:100%;
	height: 30px;
	padding-top: 10px;
	border-bottom:gray dashed 1px;
	text-indent: 16px;
}
.news-list a{
	color: gray;
}

.no-news{
	height: 80px;
	line-height:80px;
	width:100%;
	text-align: center;
	color:gray;
}
</style>
