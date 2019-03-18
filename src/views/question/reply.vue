<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入文章标题/用户昵称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="replylist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="80">
				<template slot-scope="scope">
					<span>{{ scope.row.index }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="问题序号" width="120">
				<template slot-scope="scope">
					<span>{{ scope.row.questionindex}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论序号" width="120">
				<template slot-scope="scope">
					<span>{{ scope.row.commentindex}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="回复用户" width="120">
				<template slot-scope="scope">
					<span>{{scope.row.firstuserindex}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="被回复用户" width="120">
				<template slot-scope="scope">
					<span>{{scope.row.secuserindex}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="回复内容">
				<template slot-scope="scope">
					<span>{{scope.row.content}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="回复时间" width="120">
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
			replylist: [
				{
					index: 1,
					questionindex: 1,
					commentindex: 1,
					firstuserindex: 1,
					secuserindex: 1,
					content: '回复内容',
					date: '56'
				},
				{
					index: 2,
					questionindex: 2,
					commentindex: 2,
					firstuserindex: 2,
					secuserindex: 2,
					content: '回复内容',
					date: '56'
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