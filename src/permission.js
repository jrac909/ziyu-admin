import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

/* whiteList 是自己的一种处理方案，后面有写代码判断，所以也可以取其他名称 */
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    /* getToken() ！== null 表示已经登录 */
    if (to.path === '/login') {
      /* 已经登录了还要跳转到登录页面，直接跳转到 '/' */
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      /* 已经登录并且不是跳转到登录页 */
      /* stores 里面存储的 roles 还是 null, 说明是第一次请求还没有拉取用户信息 */
      if (store.getters.roles.length === 0) {
        /* 拉取用户信息 */
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          /* 按照本来的路径跳转 */
          next()
        }).catch((err) => {
          /* 拉取信息失败的话，前端登出，移除 token */
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        /* roles 不为 null，则表示不是第一次请求，直接跳转 */
        next()
      }
    }
  } else {
    /* token 为 null，也就是还没有登录 */
    if (whiteList.indexOf(to.path) !== -1) {
      /* 判断：如果是白名单的内容，直接跳转 */
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
