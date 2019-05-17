import request from '@/utils/request';

export function listexpert(currentpage, pagesize){
	return request({
		url: '/expert/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}