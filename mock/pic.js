import Mock from 'mockjs'

export default{
	list: () => {
		const items = Mock.mock({
			'items|30': [{
        	index: '@id',
        	name: '@sentence(5, 10)',
        	type: '首页轮播图',
        	show: '是',
        	date: '@datetime'
      }]
		})

		return {
			code: 20000,
			data: items
		}
	},
	query: (picname, pictype, picshow) => {
		const items = Mock.mock({
			'items|10': [{
        	index: '@id',
        	name: '@sentence(5, 10)',
        	type: '查询图片',
        	show: '是',
        	date: '@datetime'
        }]
		})

		return {
			code: 20000,
			data: items
		}
	}
}