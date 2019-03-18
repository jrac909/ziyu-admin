<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入用户昵称/id">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="mymsglist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					<span>{{scope.row.index}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户序号" width="60">
				<template slot-scope="scope">
					<span>{{scope.row.userindex}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="消息内容">
				<template slot-scope="scope">
					<span>{{scope.row.content}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户昵称" width="120">
				<template slot-scope="scope">
					<span>{{scope.row.username}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button size="small" type="info" plain>回复</el-button>
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
			mymsglist: [
				{
					index: 1,
					content: '内容',
					userindex: 1,
					username: '用户昵称'
				},
				{
					index: 2,
					content: '内容',
					userindex: 2,
					username: '用户昵称'
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