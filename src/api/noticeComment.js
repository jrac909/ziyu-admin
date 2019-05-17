import request from '@/utils/request';

export function listNC(currentpage, pagesize){
	return request({
		url: '/noticeComment/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function queryNC(currentpage, pagesize, name){
	return request({
		url: '/noticeComment/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getNC(id){
	return request({
		url: '/noticeComment/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function delNC(id){
	return request({
		url: '/noticeComment/del',
		method: 'get',
		params: {
			id
		}
	})
}