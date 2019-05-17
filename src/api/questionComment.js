import request from '@/utils/request';

export function listQC(currentpage, pagesize){
	return request({
		url: '/quesAnsUser/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function queryQC(currentpage, pagesize, name){
	return request({
		url: '/quesAnsUser/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getQC(id){
	return request({
		url: '/quesAnsUser/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function delQC(id){
	return request({
		url: '/quesAnsUser/del',
		method: 'get',
		params: {
			id
		}
	})
}