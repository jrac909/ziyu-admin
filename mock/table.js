/* 引入 Mock */
import Mock from 'mockjs'

export default {
  list: () => {
    /* Mock.mock( template )：根据数据模板生成模拟数据 */
    /* 属性名|生成规则：属性值   生成规则共 7 种，看教程很详细：https://github.com/nuysoft/Mock/wiki/Syntax-Specification */
    /* 'name|rule':value */
    const items = Mock.mock({
      /* 生成一个数组，共 30 个元素 */
      /* @:占位符，有模板，mockjs的random @datetime在date.js @id在misc.js*/
      'items|30': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: '@name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
