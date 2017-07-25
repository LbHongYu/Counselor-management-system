<template>
  <div class="navbar">
    <ul class="menu-level1">
      <li><router-link to="/">首页</router-link></li>
      <li class="relative-li" @click="showStuService" v-if="userId===1"><span>学生服务</span>
          <ul class="menu-level2"  v-show="stuService" @mouseleave="hideStuUl">
            <li><router-link :to="{ name: 'password-modification', params: { userId: 1 }}">修改密码</router-link></li>
            <li><router-link :to="{ name: 'modify-info', params: { userId: 1 }}">信息修改</router-link></li>
            <li><router-link to="/apply-affair">事务申请</router-link></li>
            <li><router-link :to="{ name: 'affair-list', params: { userId: 1 }}">事务查询</router-link></li>
            <li><router-link to="/counselor-info">辅导员信息</router-link></li>
          </ul>
      </li>
      <li class="relative-li" @click="showTeaService" v-if="userId===2"><span >辅导员服务</span>
        <ul class="menu-level2" v-show="teaService" @mouseleave="hideTeaUl" >
            <li><router-link :to="{ name: 'password-modification', params: { userId: 2 }}">修改密码</router-link></li>
            <li><router-link :to="{ name: 'modify-info', params: { userId: 2 }}">信息修改</router-link></li>
            <li><router-link to="/student-info">学生查询</router-link></li>
            <li><router-link :to="{ name: 'affair-list', params: { userId: 2 }}">事务查询</router-link></li>
        </ul>
      </li>
      <li><router-link to="/news-list">最新消息</router-link></li>
      <li><router-link to="/material-list">资料发布</router-link></li>
    </ul>
    <div class="acount"  v-if="!userId">
      <div class="register"><router-link to="/user-register">登录</router-link></div>
      <span>|</span>
      <div class="sign"><router-link to="/sign-in">注册</router-link></div>
    </div>    
    <div class="welcom" v-if="userId">
      <span>欢迎您</span> |
      <a href="javascript:void(0)" @click="signOut">退出</a>
    </div>    
  </div>
</template>

<script>
  import { USER_SIGNOUT } from '../store/user'
  import { mapState,mapActions } from 'vuex'
  export default {
    name:"navbar",
    data(){
      return{
        stuService:false,
        teaService:false,
        id:null,
        logined:false
        
      }
    },
    computed:mapState({ 
        userId: function(state){
          return state.user.userId;
        }
      }),
    methods:{
      showStuService(){
        this.stuService=!this.stuService;
      },
      showTeaService(){
        this.teaService=!this.teaService;
      },
      fetchData(){
        this.stuService=false;
        this.teaService=false;
      },
      ...mapActions([USER_SIGNOUT]),
      signOut() {
          this.USER_SIGNOUT()
          this.$router.replace({ path: '/' })
      },
      hideTeaUl(){
        this.teaService=false;        
      },
      hideStuUl(){
        this.stuService=false;        
      }
    },
    watch: {
      '$route': 'fetchData',
      userId(newV,oldV){
        console.log(newV);
        this.id=newV;
      }
    },
    mounted(){

      //console.log(this.id);
    }  
  }
</script>

<style scoped>
  .navbar{
    width:1000px;
    height: 40px;
    margin:auto;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
  }
  .menu-level1{
    display: inline-block;
    margin-right: 360px;
  }
  .menu-level1 li{
    width:100px;
    height: 40px;
    display: inline-block;
    text-align: center;
  }
  .menu-level1 .relative-li{
    position: relative;
  }
  .menu-level2 {
    position: absolute;
    top:42px;
    left: 0;
    z-index: 999;
    background-color: rgb(75,160,232);    
  }
  .relative-li span{
    cursor:pointer;
  }

  .acount{
    float:right;
  }
  .acount,.register,.sign,.welcom{
    display: inline-block;

  }
  .welcom a{
    margin-left: 10px;
  }  
  .welcom a:hover{
    text-decoration: underline;
  }
</style>
