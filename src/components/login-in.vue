<template>
    <div class="welcom">
      <span>欢迎您,{{UseName}}</span>
      <a href="javascript:void(0)">退出</a>
    </div> 
</template>   

<script type="text/javascript">
  import { mapState } from 'vuex'

	export default{
		name:"login-in",
		data(){
			return{
				//UseName:null
			}
		},
		computed:{
			...mapState({UseName:state => state.user.UseName})
		}
	}
</script>

<style>
 .welcom{
    display: inline-block;

  } 
</style>