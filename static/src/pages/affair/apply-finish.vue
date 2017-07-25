<template>
	<div class="apply-finish">
		<h3>申请成功</h3>
		<a href="javascript:void(0)" @click="toHome">返回首页</a>
	</div>
</template>

<script>
import router from "../../router/index"

	export default{
		methods:{
			toHome(){
				router.replace({path:'/'});
			}
		}
	}
</script>

<style>
	.apply-finish{
		padding-left: 40px;
	}
	.apply-finish h3{
		padding-bottom: 20px;
	}
	.apply-finish a{

	}
</style>