import request from '@/utils/request'

export function getQuesTagList(currentpage, pagesize){
	return request({
		url: '/questionTag/list',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function queryQuesTagList(currentpage, pagesize, name){
	return request({
		url: '/questionTag/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function delQuesTag(id){
	return request({
		url: '/questionTag/del',
		method: 'get',
		params: {
			id
		}
	})
}

export function addQuesTag(title){
	return request({
		url: '/questionTag/add',
		method: 'post',
		data: {
			title
		}
	})
}