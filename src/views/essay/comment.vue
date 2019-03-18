<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入文章标题/用户昵称">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="commentlist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.index}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="文章序号" width="120">
				<template slot-scope="scope">
					<span>{{scope.row.essayindex}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论内容" width="320">
				<template slot-scope="scope">
					<span>{{scope.row.content}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户昵称" width="180">
				<template slot-scope="scope">
					<span>	{{scope.row.username}}
					</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论时间" width="180">
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
			commentlist: [
				{
					index: 1,
					essayindex: 1,
					content: '评论内容评论内容',
					username: '普普通通用户',
					date: '2019-3-17'
				},
				{
					index: 2,
					essayindex: 2,
					content: '评论内容评论内容',
					username: '普普通通用户',
					date: '2019-3-17'
				}
			]
		}
	}	
}	
</script>
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
			width: 95px;
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