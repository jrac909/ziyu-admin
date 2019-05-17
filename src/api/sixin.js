import request from '@/utils/request';

export function listSX(currentpage, pagesize){
	return request({
		url: '/sixin/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function querySX(currentpage, pagesize, name){
	return request({
		url: '/sixin/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getSX(id){
	return request({
		url: '/sixin/get',
		method: 'get',
		params: {
			id
		}
	})
}
