<template>
  	<div class="material-list">
  		<div v-if="userId===2" class="handle-material">
  			<button @click="removeMaterial" :disabled="noMetrial">删除资料</button>
  			<button><router-link to="/release-material" >上传资料</router-link></button>
  		</div>  	
  		<ul>
  			<li v-for="item in materialTitle">
  				<input v-if="userId===2" type="checkbox" v-model="item.checked">

				<a :href="item.fileURL" download>{{item.title}}</a>  				


  			</li>
			<p class="no-news" v-if="noMetrial">暂时还没有上传资料</p>    			
  		</ul>
  	<page v-bind:page="page" v-bind:page-size="pageSize" v-bind:total="total" v-bind:max-page="maxPage" v-on:pagehandler="pageHandler"></page>
  	</div>
</template>

<script>

import { mapState } from 'vuex'
  import Page from "../../components/paging";
  export default {
    name:"material",
    data(){
	    	return{	
	    		noMetrial:false,
	    		materialTitle:[],
	            page:1,
	            pageSize:10,
	            total:null,
	            maxPage:9,
	            removedId:[],
	            targetUrl:""	
	    	}
        },
    computed:mapState({ userId: state => state.user.userId }),

    methods: {
        pageHandler (page) {
            this.page = page;
            console.log(this.materialTitle);
            this.getMeterialList(page);
        },       
		getMeterialList(page){
			var resource = this.$resource("http://localhost:8080/graduation/"+this.targetUrl);

			  resource.save({nowPage:page,rows:10}).then(response => {
			  	this.materialTitle=[];
			  	let data=response.body.getTeaFile;
			  	if(data&&data.length>0){
	    			data.forEach((d,i)=>{
	    				this.materialTitle[i]={};
	    				this.materialTitle[i]["fileId"]=d["fileId"];
	    				this.materialTitle[i]["checked"]=false;
	    				this.materialTitle[i]["title"]=d["fileName"];
	    				this.materialTitle[i]["fileURL"]="http://localhost:8080/graduation/"+d["fileURL"]+d["fileName"];
	    			})
			  	}else{
			  		this.noMetrial=true;
			  	}

			  }, response => {
			  	this.noMetrial=true;
			    // error callback
			  });			
           			
		},        
        firstPage(){
        	this.getMeterialList(1);
		},
		removeMaterial(){
			this.getRemovedId(this.materialTitle,this.removedId);

			//this.$http.get('http://localhost:8080/graduation/deleteMaterial',{list:this.removedId})
			this.$http.get('http://localhost:8080/graduation/deleteTeaFile?list='+JSON.stringify(this.removedId))			
				.then(res=>{
					this.removedId=[];
					
				})
				.then(()=>{
					this.firstPage()
				})
		},
		getRemovedId(data,removed){
			if(data&&Object.prototype.toString.call(data)=="[object Array]"
				   &&Object.prototype.toString.call(removed)=="[object Array]"){
				for(var i=0,len=data.length;i<len;i++){
					console.log(data[i])

					for(var k in data[i]){
						if(k=="checked"&&data[i][k]==true){
							removed.push(data[i]["fileId"]);
						}
					}
				}
			}
		}
    },
    components:{
		Page
    },
    created(){
	   	this.targetUrl=this.userId==1?"getFileView":"getTeaFile"; 
    	this.firstPage();
    }
  }
</script>

<style scoped>
	.material-list{
		width:600px;
		height: auto;
		min-height: 426px;
	    margin: auto;
	}
	.handle-material a{
		color: #fff;
	}
	.material-list ul{
		width:600px;
	}
	.material-list ul li{
		width:100%;
		height: 20px;
		padding-top: 30px;
		border-bottom:gray dashed 1px;
		text-indent: 16px;
	}
	.material-list ul li a{
		color: gray;
	}
	.material-content{
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
	.no-news{
		height: 80px;
		line-height:80px;
		width:100%;
		text-align: center;
		color:gray;
	}
</style>
