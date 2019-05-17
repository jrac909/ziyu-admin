import router from './router'
import store from './store'
import NProgress from 'nprogress' /* 轻量级 web 进度条 */
import 'nprogress/nprogress.css' /* 进度条样式 */
import { Message } from 'element-ui' /* 只引入用到的小组件 */
import { getToken } from '@/utils/auth' /* auth 写了对 token 的操作，这里引入读取 token 操作 */

/**
  首先，这个文件在 main.js 中引入了，项目启动会解析 main.js，就会加载这个 js 文件，文件中的 router.beforeEach
  在路由请求时会自动执行
**/

NProgress.configure({ showSpinner: false }) /* 禁用进度环，就是圆圈的进度表示 */

/* whiteList 是自己的一种处理方案，后面有写代码判断，所以也可以取其他名称 */
const whiteList = ['/login'] // 不重定向白名单
/* 请求router前先进入这个函数 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    /* getToken() ！== null 表示已经登录 */
    if (to.path === '/login') {
      /* 已经登录了还要跳转到登录页面，直接跳转到 '/' */
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next();
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
