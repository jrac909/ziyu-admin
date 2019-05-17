import request from '@/utils/request'

export function listuser(currentpage, pagesize){
	return request({
		url: '/user/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function getuser(id){
	return request({
		url: '/user/get',
		method: 'get',
		params: { id }
	})
}