import request from '@/utils/request'

export function getList(currentpage, pagesize){
	return request({
		url: '/pic/list',
		method: 'get',
		params: {
			pageNum: currentpage,
			pageSize: pagesize
		}
	})
}

export function queryList(currentpage, pagesize, picname, pictype, picshow){
	return request({
		url: '/pic/query',
		method: 'post',
		data: {
			pageNum: currentpage,
			pageSize: pagesize,
			picname: picname,
			pictype: pictype,
			picshow: picshow
		}
	})
}

export function add(name, type, show, link){
	return request({
		url: '/pic/addpic',
		method: 'post',
		data: {
			name,
			type,
			show,
			link
		}
	})
}

export function del(id){
	return request({
		url: '/pic/del',
		method: 'get',
		params: {
			id
		}
	})
}

export function getpic(id){
	return request({
		url: '/pic/getById',
		method: 'get',
		params: {
			id
		}
	})
}

export function upPic(picId, picName, picType, picIsShow, picLink){
	return request({
		url: '/pic/update',
		method: 'post',
		data: {
			picId,
			picName,
			picType,
			picIsShow,
			picLink
		}
	})
}