<template>
  <div class="handle-affair">
	  	<ul>
	  		<li>
	  			<div class="affair">
	  				<span class="column-title">标题</span>
	  				<span class="handle-detail">你好你好你好</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="affair">
	  				<span class="column-title">事务种类</span>
	  				<span class="handle-detail">请假</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="relative-affair affair">
	  				<span class="column-title column-title-ab">补充内容</span>
	  				<span class="handle-detail handle-detail-ab over-scroll">请假请假请假请假请假请假请假请请假请假请假</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="affair handle-file">
	  				<span class="column-title">附件</span>
	  				<span class="affair-downtown">
	  					<a href="#">查看</a>
	  				</span>
	  			</div>
	  		</li>
	  		<li>
	  			<div class="relative-affair affair">
	  				<span class="column-title-ab column-title">留言</span>
	  				<textarea class="handle-detail-ab over-scroll handle-detail"></textarea>
	  			</div>
	  		</li>
	  	</ul>
	  	<div class="execute-handle">
	  		<button class="handle-submit" >提交</button>
	  		<button class="handle-reset">重置</button>
	  	</div>

  </div>
	
</template>

<script>
export default {
  
}
</script>

<style>
	.handle-affair{
		width:600px;
		height:auto;		
		margin:auto;
	}
	.relative-affair{
		position: relative;
	}
	.column-title{
		width: 100px;
		height: 40px;
	    font-size: 16px;
	    font-weight: bold;
	    margin-bottom: 20px;
	    margin-right:30px;
	    text-align: center;
	    line-height: 40px;
	    display: inline-block;
		border-radius: 20px;			    
		background-color: rgb(242,242,242);
	}
	.handle-detail{
		width:400px;
		height: 46px;
	    font-size: 14px;
		min-height: 46px;
		padding-left: 16px;
	    line-height: 46px;	
	    border-radius: 5px;			    
		background-color: rgb(242,242,242);
	    display: inline-block;
	}
	.handle-file{
		margin-top:140px;
	}
	.over-scroll{
		height: 120px;
		overflow:auto;
	}
	.column-title-ab{
		position: absolute;
		top:0;
		left: 0;
	}
	.handle-detail-ab{
		position: absolute;
		top: 0;
		left:130px;
	}
	.handle-detail-ab.over-scroll{
		background-color: #fff;
		border: 1px solid gray;
	}
	.execute-handle{
		margin-top:140px;
	}
	/* .handle-affair button{
		width:96px;
		height: 40px;
		font-size: 16px;
		color: #fff;
		text-align: center;
		line-height: 40px;
		border-radius: 10px;
		margin-top: 10px;		
	    	background-color: rgb(75,160,232);		
	} */
	.handle-submit{
		margin-left: 130px;
	}
	.handle-reset{
		margin-left: 40px;
	}
</style>
