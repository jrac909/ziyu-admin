import request from '@/utils/request';

export function listQR(currentpage, pagesize){
	return request({
		url: '/questionReplyUser/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function queryQR(currentpage, pagesize, name){
	return request({
		url: '/questionReplyUser/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getQR(id){
	return request({
		url: '/questionReplyUser/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function delQR(id){
	return request({
		url: '/questionReplyUser/del',
		method: 'get',
		params: {
			id
		}
	})
}