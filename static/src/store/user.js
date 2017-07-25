import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
    state: Object.assign({},JSON.parse(sessionStorage.getItem('user'))),//在刷新页面和关闭页面后，再次进入页面时的获取id

    //state:{},

    mutations: {
        [USER_SIGNIN](state, userInfo) {
            console.log(userInfo);
            sessionStorage.setItem('user', JSON.stringify(userInfo))
            Object.assign(state, userInfo)

        },
        [USER_SIGNOUT](state) {
            sessionStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [USER_SIGNIN]({commit}, user) {
            commit(USER_SIGNIN, user)
        },
        [USER_SIGNOUT]({commit}) {
            commit(USER_SIGNOUT)
        }
    }
}
