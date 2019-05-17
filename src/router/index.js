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
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
/**
  {path:'create', component: PostCreate, name: '发表文章'}
  {path:'edit/:id(\\d+)', component: PostCreate, name: '编辑文章'}
  上面这种情况，创建和修改使用的是同一个 component，默认情况下这两个页面切换时是不会触发 created 和 mounted 钩子的
  处理方法：通过 watch $route(比较麻烦)
  第二种：
  <router-view :key="key">这里加一个key值</router-view>
  computed{
    key(){
      return this.$route.name!==undefined?this.$route.name+new Date().....只要保证唯一性就好了
    }
  }
**/
export const constantRouterMap = [
  /* hidden 设置为 true 的时候不会在侧边栏出现，默认为 false */
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  /* redirect:'noredirect' 该路由在面包屑导航中不可被点击 */
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/picture',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Picture',
        component: () => import('@/views/picture/index'),
        meta: {title: '图片管理', icon: 'image'}
      }
    ]
  },
  {
    path: '/essay',
    component: Layout,
    redirect: '/essay/index',
    name: 'Essay',
    meta: {title: '文章管理', icon: 'essay'},
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/essay/index'),
        meta: {title: '文章管理'}
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/essay/comment'),
        meta: {title: '评论管理'}
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    name: 'Notice',
    meta: {title: '公告管理', icon: 'notice'},
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/notice/index'),
        meta: {title: '公告管理'}
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/notice/comment'),
        meta: {title: '评论管理'}
      }
    ]
  },
  {
    path: '/question',
    component: Layout,
    redirect: '/question/index',
    name: 'Question',
    meta: {title: '问答管理', icon: 'question'},
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/question/index'),
        meta: {title: '问答管理'}
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/question/comment'),
        meta: {title: '评论管理'}
      },
      {
        path: 'reply',
        name: 'Reply',
        component: () => import('@/views/question/reply'),
        meta: {title: '回复管理'}
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/question/tag'),
        meta: {title: '标签管理'}
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    name: 'Message',
    meta: {title: '消息管理', icon: "message"},
    children: [
  
      {
        path: 'mymsg',
        name: 'Mymsg',
        component: () => import('@/views/message/mymsg'),
        meta: {title: '我的消息'}
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: Layout,
    redirect: '/user/index',
    meta: {title: '资格审核', icon: 'user'},
    children: [
      {
        path: 'shenhe',
        name: 'Shenhe',
        component: () => import('@/views/user/shenhe'),
        meta: {title: '审核申请'}
      },
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/user/index'),
        meta: {title: '用户管理'}
      },
      {
        path: 'expert',
        name: 'Expert',
        component: () => import('@/views/user/expert'),
        meta: {title: '专家管理'}
      },
      {
        path: 'detail',
        name: 'Detail',
        hidden: true,
        component: () => import('@/views/user/detail'),
        meta: {title: '审核详情'}
      }
    ]
  },
  {
    path: '/zixun',
    name: 'Zizun',
    component: Layout,
    redirect: '/zixun/index',
    meta: {title: '咨询管理', icon: 'video'},
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/zixun/index'),
        meta: {title: '咨询管理'}
      }
    ]
  },
  {
    path: '/example',
    component: Layout, /* 可以在这里选择不同的 Layout 组件，这里的 Layout 布局就是我们看到的左边一个
    侧边栏，上边一个 nav，中间一块 appMain 主要展示区 */
    redirect: '/example/table', /* 是在面包屑中点击会重定向到的页面 */
    name: 'Example',
    meta: { title: 'Example', icon: 'example'},/* meta:{roles:['admin','editor'] // 设置该路由进入的权限}
        title: 设置侧边栏和面包屑名字 icon：设置该路由的图标
        noCache：true 如果为 true，则不会被<keep-alive>缓存，默认 false
        breadcrumb： false 如果设置为 false，则不会在面包屑中展示
     */
    /* 这里开始所有的路由都会展示在 appMain 那快主要展示区 */
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
