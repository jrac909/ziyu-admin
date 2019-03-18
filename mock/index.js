/* 引入 Mock */
import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import picAPI from './pic'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
/* Mock.mock( rurl, rtype, template ):记录数据模板。当拦截到匹配 rurl 的 Ajax 的 rtype 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回 */
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
Mock.mock(/\/user\/checkUsername/, 'get', userAPI.checkUsername)

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)

// Pic
Mock.mock(/\/pic\/list/, 'get', picAPI.list)
Mock.mock(/\/pic\/query/, 'post', picAPI.query)

export default Mock
