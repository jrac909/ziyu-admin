import request from '@/utils/request'

export function getList(currentpage, pagesize){
	return request({
		url: '/essay/list',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function queryList(currentpage, pagesize, name){
	return request({
		url: '/essay/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getessay(id){
	return request({
		url: '/essay/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function delessay(id){
	return request({
		url: '/essay/del',
		method: 'get',
		params: {
			id
		}
	})
}