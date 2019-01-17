import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  //   mode: 'history',
  routes: [
    // {
    //   path: '/board',
    //   name: 'Board',
    //   meta: 'board',
    //   component: () => import('@/views/board/board')
    //     props: router => ({
    //       id: router.query.id
    //     })
    // },
    {
      path: '/',
      name: 'Index',
      meta: 'index',
      component: () => import('@/views/index/index')
    },
    {
      path: '/leaf',
      name: 'Leaf',
      meta: 'leaf',
      component: () => import('@/views/leaf/leaf')
    },
    {
      path: '/board/:id',
      name: 'Board',
      meta: 'board2',
      component: () => import('@/views/board/board2')
    },
    {
      path: '/tables',
      name: 'tables',
      meta: 'tables',
      component: () => import('@/views/board/tables')
    },
    {
      path: '/details',
      name: 'Details',
      meta: 'board',
      component: () => import('@/views/details/details')
      //   props: router => ({
      //     metricId: router.query.metricId
      //   })
    },
    // {
    //   path: '/',
    //   name: 'Confirm',
    //   component: () => import('@/views/confirm/confirm'),
    //   props: router => ({
    //     id: router.query.id
    //   })
    // },
    {
      path: '/f2',
      name: 'F2',
      component: () => import('@/views/F2Chart/index')
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/errorPage/404')
    }

  ]
  //   scrollBehavior(to, from, savedPosition) {
  //     console.log(savedPosition)
  //     if (savedPosition) {
  //       return savedPosition
  //     } else {
  //       console.log('回到00')
  //       return { x: 0, y: 0 }
  //     }
  //   }
})

router.beforeEach((to, from, next) => {
  if (to.meta === 'board') {
    // localStorage.setItem('boardTitle', store.state.board.board.boardName)
  } else {
    // localStorage.setItem('boardTitle', 'databoard')
  }
  next()
})
export default router
