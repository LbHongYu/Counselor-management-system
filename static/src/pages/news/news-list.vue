<template>
  	<div class="news-list">
  		<div v-if="userId===2" class="handle-news">
  			<button @click="removeNews">删除消息</button>
  			<button><router-link to="/release-news">添加消息</router-link></button>
  		</div>
  		<ul>
  			<li v-for="item in newsTitle" v-if="newsTitle.length!==0">
  				<input v-if="userId===2" type="checkbox" v-model="item.checked">
  				<router-link :to="{ name: 'news-content', params: { newsId: item.newsId}}">
  					{{item.title}}
  				</router-link>

  			</li>
			<p class="no-news" v-if="newsTitle.length===0">暂时还没有新闻信息</p>  			
  		</ul>
  	<page v-bind:page="page" v-bind:page-size="pageSize" v-bind:total="total" v-bind:max-page="maxPage" v-on:pagehandler="pageHandler"></page>
  	</div>
</template>

<script>
import { mapState } from 'vuex'
import Page from "../../components/paging";
  export default {
    name:"news",
    components:{Page},
    data(){
	    	return{
	    		
	    		newsTitle:[],
	            page:1,
	            pageSize:10,
	            rows:10,//行数
	            total:null,//条数
	            maxPage:6,
	            removedId:[],
	            itemIndex:[],
	            targetUrl:null,
	    	}
        },
    computed:mapState({ userId: state => state.user.userId }),
    methods: {
		getNewsTitle(page){
            this.$http.post("http://localhost:8080/graduation/"+this.targetUrl,{nowPage:page,rows:this.rows})
        		.then(function(res){
        			this.newsTitle=[];
        			let data=res.body;
				  	
	    			let dataLast=JSON.parse(data[data.length-1]);
    				this.total=dataLast["pageNumber"];

        			for(var i=0,len=data.length;i<len-1;i++){
        				this.newsTitle.push({});
        				let dataItem=JSON.parse(data[i])
        				this.newsTitle[i]["title"]=dataItem["title"];
        				this.newsTitle[i]["newsId"]=dataItem["newsId"];
        				this.newsTitle[i]["checked"]=false;
        			}
        		},function(err){
        			console.log(err)
        		})     		
		},    	
        pageHandler (page) {
            this.page = page;
        	this.getNewsTitle(page);

        },
        firstPage(){
        	this.getNewsTitle(1);
		},
		removeNews(){
			this.getRemovedId(this.newsTitle,this.removedId,this.itemIndex);
			if(this.removedId.length===0){
				return
			}else{		
				let postID=[];
				for(let i=0;i<this.removedId.length;i++){
					console.log(this.removedId[i])
					if(this.removedId[i]!==undefined){
						postID.push(this.removedId[i]);
					}
				}
				this.$http.get('http://localhost:8080/graduation/deleteNews?list='+JSON.stringify(postID))
					.then(res=>{
						alert("删除成功！")
					})
					.then(()=>{
						this.firstPage()
					})
				this.itemIndex=[];
				this.removedId=[];

			}
		},
		getRemovedId(data,removed,itemIndex){
			if(data&&Object.prototype.toString.call(data)=="[object Array]"
				   &&Object.prototype.toString.call(removed)=="[object Array]"){
				for(var i=0,len=data.length;i<len;i++){
					if(data[i].checked==true){
						removed[i]=data[i].newsId
						
						itemIndex.push(i);
					}
				}

			}
		},
		showPageOrNot(){

		}
    },
    created(){
    	this.targetUrl=this.userId==1?"getNews":"teaNews"; 
    	this.firstPage();
    }
  }
</script>

<style scoped>
.news-list{
	width:600px;
	height: auto;
	min-height: 426px;
    margin: auto;
}

.handle-news a{
	color: #fff;
}
.news-list ul{
	width:600px;
}
.news-list ul li{
	width:100%;
	height: 20px;
	padding-top: 30px;
	border-bottom:gray dashed 1px;
	text-indent: 16px;
}
.news-list ul li a{
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
