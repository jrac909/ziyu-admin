import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/a/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function checkUsername(username){
  return request({
    url: '/admin/checkAccount',
    method: 'get',
    params: {
      username
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
