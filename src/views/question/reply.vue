<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入文章标题/用户昵称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="replylist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="80">
				<template slot-scope="scope">
					<span>{{ scope.row.qruId }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="问题序号" width="100">
				<template slot-scope="scope">
					<span>{{ scope.row.qruQuesId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论序号" width="100">
				<template slot-scope="scope">
					<span>{{ scope.row.qruCommentId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="回复用户" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.qruUserId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="被回复用户" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.qruUseredId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="回复内容">
				<template slot-scope="scope">
					<span>{{scope.row.qruContent}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="回复时间" width="160">
				<template slot-scope="scope">
					<span>{{ scope.row.qruCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ scope.row.qruCreateDate.split('T')[1].split('.')[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" type="warning" plain>查看</el-button>
					<el-button @click="delQR(scope.row.qruId)" size="small" type="danger" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
  			background
  			layout="prev, pager, next"
  			:total="total" :page-size.sync="pagesize" :current-page.sync="currentpage" 
  			@current-change="pagechange">
		</el-pagination>
	</div>
</template>
<script>
import { listQR, getQR, queryQR, delQR } from '@/api/questionReply';

export default{
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: ''
			},
			replylist: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listQR(this.currentpage, this.pagesize).then(response => {
				this.replylist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据拉取失败!'
            	});
			})
		},
		queryData(){
			queryQR(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
				this.replylist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据查询失败!'
            	});
			})
		},
		pagechange(){
			this.queryQR();
		},
		delQR(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delQR(id).then(response => {
					this.$message({
            			type: 'success',
            			message: '删除成功!'
            		});
				}).catch(error => {
					this.$message({
            			type: 'error',
            			message: '删除失败!'
            		});
				})
				this.queryData();
			}).catch(() => {
				this.$message({
            		type: 'info',
            		message: '已取消删除'
          		});
			})
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
.el-pagination{
	width: 300px;
	margin: 0 auto;
	margin-top: 40px;
}
</style>