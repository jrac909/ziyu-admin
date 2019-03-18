<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入问题/提问用户昵称">
					</el-input>
				</el-form-item>
				<el-form-item>
					<span>问题类型</span>
					<el-select v-model="searchForm.type" placeholder="请选择">
						<el-option v-for="(item, index) in typesops" :key="index" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="questionlist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					<span>{{scope.row.index}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="问题标题" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.title}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="问题内容">
				<template slot-scope="scope">
					<span>{{scope.row.content}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户昵称" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.username}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="提问时间" width="200">
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
			name: '',
			type: ''
		},
		typesops: [
			{
				id: 1,
				name: '青少年'
			}
		],
		questionlist: [
			{
				index: 1,
				title: '问题标题',
				content: '问题内容',
				username: '用户昵称',
				date: '2019'
			},
			{
				index: 2,
				title: '问题标题',
				content: '问题内容',
				username: '用户昵称',
				date: '2019'
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