import Vue from 'vue'
import Router from 'vue-router'

import homepage from 'src/pages/home-page'
import navBar from "src/components/navbar";
import homeContent from "src/pages/home-content";

//common part
import passwordModification from "src/pages/modify-password";
import modifyInfo from "src/pages/modify-info";
import signIn from "src/pages/sign-in";
import userRegister from "src/pages/user-register";
import newsList from "src/pages/news/news-list";
import newsContent from "src/pages/news/news-content";
import affairList from "src/pages/affair/affair-list";
import materialList from "src/pages/material/material-list";
import materialDowntown from "src/pages/material/material-downtown";
import affairContent from "src/pages/affair/affair-content";

//student part
import applyAffair from "src/pages/affair/apply-affair";
import counselorInfo from "src/pages/counselor-info";
import applyFinish from "src/pages/affair/apply-finish";
import modifyAffair from "src/pages/affair/modify-affair";

//teacher part
import releaseNews from "src/pages/news/release-news";
import studentInfo from "src/pages/student-info";
import handleaffair from "src/pages/affair/handle-affair";
import releaseMaterial from "src/pages/material/release-material";

import store from '../store/'

Vue.use(Router);

const router = new Router({
    //mode: "history",
    linkActiveClass: "",
    routes: [{
        path: '/',
        component: homepage,
        children: [{
            path: '',
            name: 'home-content',
            component: homeContent,
            meta: {
                title: '主页',
                auth: false
            }
        }, {
            path: 'password-modification/:userId',
            name: 'password-modification',
            component: passwordModification,
            meta: {
                title: '修改密码',
            }
        }, {
            path: 'modify-info/:userId',
            name: 'modify-info',
            component: modifyInfo,
            meta: {
                title: '信息修改',
            }
        }, {
            path: 'apply-affair',
            name: 'apply-affair',
            component: applyAffair,
            meta: {
                title: '事务申请',
                auth: false
            }
        }, {
            path: 'modify-affair',
            name: 'modify-affair',
            component: modifyAffair,
            meta: {
                title: '事务修改-学生',
            }
        }, {
            path: 'affair-content/:affairId',
            name: 'affair-content',
            component: affairContent,
            meta: {
                title: '事务详情-学生',
            }
        }, {
            path: 'apply-finish',
            name: 'apply-finish',
            component: applyFinish,
            meta: {
                title: '事务申请成功',
                auth: false
            }
        }, {
            path: 'counselor-info',
            name: 'counselor-info',
            component: counselorInfo,
            meta: {
                title: '辅导员信息查询',
            }
        }, {
            path: 'student-info',
            name: 'student-info',
            component: studentInfo,
            meta: {
                title: '学生查询',
            }
        }, {
            path: 'release-news',
            name: 'release-news',
            component: releaseNews,
            meta: {
                title: '发布消息'
            }
        }, {
            path: 'release-material',
            name: 'release-material',
            component: releaseMaterial,
            meta: {
                title: '上传资料'
            }
        }, {
            path: 'material-downtown',
            name: 'material-downtown',
            component: materialDowntown,
            meta: {
                title: '下载成功',
            }
        }, {
            path: 'material-list',
            name: 'material-list',
            component: materialList,
            meta: {
                title: '文件列表'
            }
        }, {
            path: 'sign-in',
            name: 'sign-in',
            component: signIn,
            meta: {
                title: '注册',
                auth: false
            }
        },{
            path: 'user-register',
            name: 'user-register',
            component: userRegister,
            meta: {
                title: '登录',
                auth: false
            }
        },{
            path:"news-list",
            name:"news-list",
            component:newsList,
            meta:{
                title:"最新消息"/*,
                auth: false*/
            }
        },
        {
            path:"news-content/:newsId",
            name:"news-content",
            component:newsContent,
            meta:{
                title:"消息内容"
            }
        },{
            path:"affair-list",
            name:"affair-list",
            component:affairList,
            meta:{
                title:"事务列表"
            }
        }]
    }]
})
router.afterEach((route) => {
    document.title = `${route.meta.title}`;
});
router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta;
    var isLogin = Boolean(store.state.user.userId) //true用户已登录， false用户未登录
    if (auth && !isLogin && path !== '/user-register') {
        return next({ path: '/user-register' })
    }
    next()
})

export default router;



