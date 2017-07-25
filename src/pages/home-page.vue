<template>
  <div class="coun-system">
    <div class="header-wrap">
      <div class="header-bg">
        <div class="system-logo">
          
          <img src="../assets/logo.png">
        </div>
        <div class="web-name">辅导员事务管理系统</div>  
   
      </div>
    </div>
    <div class="nav">
      <navBar></navBar>
    </div>
    <div class="contain">
      <router-view></router-view>
    </div>
    <div class="footer">
      <vfooter></vfooter>
    </div>
  </div>
</template>

<script>
import navBar from "src/components/navbar";
import vfooter from "src/pages/vfooter";
import { mapState } from 'vuex'


export default {
  components:{
    navBar,
    vfooter
  },
  computed: mapState({ userId: state => state.user.userId })


}
</script>

<style>
  .header-wrap{
    width: 100%;
    height: 140px;
    background-color: rgb(234,234,234);
  }
  .header-bg{
    width: 1000px;
    height: 140px;
    margin: auto;
    position: relative;
    background-image: url("../assets/bg2.png");
  }
   .system-logo{
    display: inline-block;
   }
  .system-logo img{
    display: inline-block;
    margin-top: 30px;
  }
  .web-name{
    width: 400px;
    height: 80px;
    font-size: 40px;
    letter-spacing: 4px;
    margin-left: 180px;
    display: inline-block;
  }

  .nav{
    width: 100%;
    height: 40px;
    font-family: "宋体, SimSun";
    background-color: rgb(75,160,232);
  }
  .contain{
    width: 1000px;
    min-height: 390px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin:auto;
    /* border:1px solid gray; */
    border-top: none;
  }
  .footer{

  }
</style>
