import request from '@/utils/request';

export function listEB(currentpage, pagesize){
	return request({
		url: '/essayBoard/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function queryEB(currentpage, pagesize, name){
	return request({
		url: '/essayBoard/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getEB(id){
	return request({
		url: '/essayBoard/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function delEB(id){
	return request({
		url: '/essayBoard/del',
		method: 'get',
		params: {
			id
		}
	})
}