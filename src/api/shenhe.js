import request from '@/utils/request'

export function getlist(currentpage, pagesize){
	return request({
		url: '/shenhe/list',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function queryList(currentpage, pagesize, name){
	return request({
		url: '/shenhe/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getById(id){
	return request({
		url: '/shenhe/getById',
		method: 'get',
		params: {
			id
		}
	})
}

export function agree(id){
	return request({
		url: '/shenhe/agree',
		method: 'get',
		params: {
			id
		}
	})
}

export function jujue(id){
	return request({
		url: '/shenhe/jujue',
		method: 'get',
		params: {
			id
		}
	})
}