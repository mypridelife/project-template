import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/ddlogin', component: () => import('@/views/login/ddlogin'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '/updateSingle', component: () => import('@/views/question/updateQuestion/single'), name: 'updateSingle', hidden: true
    },
    {
        path: '/updateMultiple', component: () => import('@/views/question/updateQuestion/multiple'), name: 'updateMultiple', hidden: true
    },
    {
        path: '/updateJudge', component: () => import('@/views/question/updateQuestion/judge'), name: 'updateJudge', hidden: true
    },
    {
        path: '/updateText', component: () => import('@/views/question/updateQuestion/text'), name: 'updateText', hidden: true
    },
    {
        path: '/paperDetail', component: () => import('@/views/paper/paperDetail/index'), name: 'paperDetail', hidden: true
    },
    // {
    //     path: '/enterPaper', component: () => import('@/views/paper/enterPaper/index'), name: 'enterPaper', hidden: true
    // },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',

        // hidden: true,
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: { title: '首页', icon: 'user' }
        }]
    },

    {
        path: '/question',
        component: Layout,
        redirect: '/question/haveQuestion',
        name: 'question',
        meta: {
            title: '试题库',
            icon: 'nested'
        },
        children: [
            { path: 'haveQuestion', component: () => import('@/views/question/haveQuestion/index'), name: 'haveQuestion', meta: { title: '已有试题' } },
            // { path: 'enterQuestion', component: () => import('@/views/question/enterQuestion/index'), name: 'enterQuestion', meta: { title: '录入试题' } }
        ]
    },

    {
        path: '/paper',
        component: Layout,
        redirect: '/paper/havePaper',
        name: 'paper',
        meta: {
            title: '试卷库',
            icon: 'tree'
        },
        children: [
            // { path: 'havePaper', component: () => import('@/views/paper/havePaper/index'), name: 'list1', meta: { title: '已有试卷' } },
            // { path: '/enterPaper', component: () => import('@/views/paper/enterPaper/index'), name: 'enterPaper',},
            { path: 'task', component: () => import('@/views/paper/task/index'), name: 'task', meta: { title: '任务管理' } },
        ]
    },
    

    {
        path: '/record',
        component: Layout,
        redirect: '/record/recording',
        name: 'record',
        // meta: {
        //     title: '考试记录',
        //     icon: 'example'
        // },
        children: [
            {
                path: 'recording',
                component: () => import('@/views/record/index'),
                name: 'recording',
                meta: { title: '考试记录', icon: 'documentation' }
            }
        ]
    },

    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/job',
        name: 'setting',
        // meta: {
        //     title: '考试记录',
        //     icon: 'example'
        // },
        children: [
            {
                path: 'job',
                component: () => import('@/views/setting/index'),
                name: 'job',
                // meta: { title: '设置', icon: 'example' }
            }
        ]
    },
    {
        path: '',
        component: Layout,
        redirect: '/paper/index',
        name: 'paper',
        // meta: {
        //     title: '试卷库',
        //     icon: 'tree'
        // },
        children: [
            // { path: 'havePaper', component: () => import('@/views/paper/havePaper/index'), name: 'list1', meta: { title: '已有试卷' } },
            { path: '/enterPaper', component: () => import('@/views/paper/enterPaper/index'), name: 'enterPaper',},
            // { path: 'task', component: () => import('@/views/paper/task/index'), name: 'task', meta: { title: '任务管理' } },
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
