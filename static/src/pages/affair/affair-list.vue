<template>
  	<div class="affair-list">
  		<div class="handle-affair" v-if="userId===2">
  			<button @click="removeAffair">删除事务</button>
  		</div>
  		<ul>
  			<li v-for="item in affairTitle">
  				<input type="checkbox" v-model="item.checked" v-if="userId===2">
  				<router-link :to="{name:'affair-content',params:{affairId:item.affairId}}">
  					{{item.title}}
  				</router-link>
				<p v-if="item.status===2" class="status">已处理</p>
  				<p v-if="item.status===1" class="status-not">未处理</p>

  			</li>
  		</ul>
  	<page :page="page" :page-size="pageSize" :total="total" :max-page="maxPage" v-on:pagehandler="pageHandler" v-if="affairTitle.length!==0"></page>
  	</div>
</template>

<script>
import { mapState } from 'vuex'
import router from "../../router/index"
import Page from "../../components/paging";
// var userId=null;
  export default {
    name:"affair",
    data(){
	    return{
	    		affairTitle:[],
	            page:1,
	            pageSize:10,
	            total:null,
	            maxPage:9,
	            removedId:[],
	            itemIndex:[]		
	    	}
        },
    methods: {
        pageHandler (page) {
            this.page = page;
			this.getAffairList(page,this.targetUrl);
        },
        firstPage(url){
        	this.getAffairList(1,url);
		},
		removeAffair(){
			this.getRemovedId(this.affairTitle,this.removedId,this.itemIndex);
			
			if(this.removedId.length===0){
				return
			}else{
				console.log(this.removedId);
				console.log(this.itemIndex);
				this.$http.post('http://localhost:8080/graduation/deleteTeaAffair?list='+JSON.stringify(this.removedId))
					.then(res=>{
						if(res.body){
							this.firstPage()
						}else{
							
						}
					})
				this.removedId=[];
				this.itemIndex=[];
				
			}
		},
		getAffairList(page,url){
            this.$http.post("http://localhost:8080/graduation/"+this.targetUrl,{nowPage:page,rows:10})
        		.then(res=>{
        			if(res.body){
        				this.affairTitle=[];

					  	let data=res.body;

					  	console.log(data[data.length-1]);
		    			let dataLast=JSON.parse(data[data.length-1]);

		    			this.total=dataLast["pageNumber"];
	        			for(var i=0,len=data.length;i<len-1;i++){
	        				var dataParsed=JSON.parse(data[i]);
	        				this.affairTitle[i]={};
	        				this.affairTitle[i]["title"]=dataParsed["title"];
	        				this.affairTitle[i]["affairId"]=dataParsed["mes_id"];;
	        				this.affairTitle[i]["status"]=dataParsed["status"];;
	        			}
        				console.log(this.affairTitle);
        			}
        		}) 		
		},
		getRemovedId(data,removed,itemIndex){
			if(data&&Object.prototype.toString.call(data)=="[object Array]"
				   &&Object.prototype.toString.call(removed)=="[object Array]"){
				for(var i=0,len=data.length;i<len;i++){
					if(data[i].checked==true){
						removed.push(data[i].affairId);
						itemIndex.push(i);
					}
				}

			}
		}
    },
    components:{
		Page
    },
    computed:mapState({ userId: state => state.user.userId }),
    created(){
	   	this.targetUrl=this.userId==1?"getStuAllAffair":"getTeaAllAffair"; 

    	//this.firstPage(this.targetUrl);
    	this.firstPage("getStuAllAffair");
    },
 	beforeRouteEnter(to,from,next){
		// userId=to.params.userId;	 		
		next();
 	}
  }
</script>

<style scoped>
.affair-list{
	width:600px;
	height: auto;
	min-height: 426px;
    margin: auto;
}
.affair-list ul{
	width:600px;
}
.affair-list ul li{
	width:100%;
	height: 20px;
	padding-top: 30px;
	border-bottom:gray dashed 1px;
	text-indent: 16px;
}
.affair-list ul li a{
	color: gray;
}
.affair-content{
	height: auto;
	min-height: 500px;
	margin-left: 236px;
	padding: 20px 30px 20px 0;	
	font-size: 14px;
	color: gray;
	font-family: "微软雅黑";
	border:1px solid rgb(136, 136, 136);
	box-shadow: 2px 2px 6px 2px #888;
	border-bottom-left-radius: 16px;
	border-top-right-radius: 16px;
	border-bottom-right-radius: 16px;
}
.status{
		width: 58px;
		height: 26px;
		line-height: 26px;
		color: #fff;
		font-size: 14px;
		background-color: rgb(75,160,232);
		border-radius: 10px;
		display: inline-block;
		float: right;
		padding-right: 10px;
		padding-left: 0px;
	}
	.status-not{
		width: 58px;
		height: 26px;
		line-height: 26px;
		color: #fff;
		font-size: 14px;
		background-color: gray;
		border-radius: 10px;
		display: inline-block;
		float: right;
		padding-right: 10px;
		padding-left: 0px;
	}
</style>
