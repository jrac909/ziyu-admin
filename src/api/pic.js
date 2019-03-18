import request from '@/utils/request'

export function getList(){
	return request({
		url: '/pic/list',
		method: 'get'
	})
}

export function queryList(picname, pictype, picshow){
	return request({
		url: '/pic/query',
		method: 'post',
		data: {
			picname,
			pictype,
			picshow
		}
	})
}