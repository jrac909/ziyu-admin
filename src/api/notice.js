import request from '@/utils/request'

export function getlist(currentpage, pagesize){
	return request({
		url: '/notice/list',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function queryList(currentpage, pagesize, name){
	return request({
		url: '/notice/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function getnotice(id){
	return request({
		url: '/notice/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function delnotice(id){
	return request({
		url: '/notice/del',
		method: 'get',
		params: {
			id
		}
	})
}

export function addnotice(title, content){
	return request({
		url: '/notice/add',
		method: 'post',
		data: {
			title, content
		}
	})
}