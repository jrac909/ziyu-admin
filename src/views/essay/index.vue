<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" class="searchForm" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholde="请输入文章标题/作者名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="essaylist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					<span>{{scope.row.index}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="文章标题" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.name}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="文章内容">
				<template slot-scope="scope">
					<span>{{scope.row.content}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="作者昵称" width="160">
				<template slot-scope="scope">
					<span>{{scope.row.username}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="点赞数" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.agree}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="修改时间" width="120">
				<template slot-scope="scope">
					<span>{{scope.row.date}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" type="warning" plain>查看</el-button>
					<el-button size="small" type="danger" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>	
</template>
<script>
export default{
	data(){
		return {
			searchForm: {
				name: ''
			},
			essaylist: [
				{
					index: 1,
					name: '文章标题文章标题文章标题文章标题文章标题文章标题',
					content: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
					username: '作者的昵称啊',
					agree: 16,
					date: '2019-3-17'
				},
				{
					index: 2,
					name: '文章标题文章标题文章标题文章标题文章标题文章标题',
					content: '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
					username: '作者的昵称啊',
					agree: 23,
					date: '2019-3-17'
				}
			]
		}
	}	
}
</script>
<style rel="stylesheet/scss" lang="scss">
	
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$blue: #5293B1;
.app-container{
	height: auto;
	width: 100%;
	header{
		.el-input{
			display: inline-block;
			width: 300px;
		}
		.el-form-item{
			float: left;
			margin-right: 50px;
		}
		.el-button{
			width: 96px;
			background-color: $blue;
			color: #FFF;
			border-radius: 0;
		}
		.el-button:hover{
			opacity: 0.9;
		}
	}
}	
</style>