<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入用户昵称/id">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="mymsglist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.sxId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.sxUserId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="消息内容">
				<template slot-scope="scope">
					<span>{{scope.row.sxContent}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户昵称" width="120">
				<template slot-scope="scope">
					<span>{{scope.row.sxUserName}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button size="small" type="warning" plain>查看</el-button>
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
import { listSX, querySX, getSX } from '@/api/sixin';

export default{
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: ''
			},
			mymsglist: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listSX(this.currentpage, this.pagesize).then(response => {
				this.mymsglist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据拉取失败!'
            	});
			})
		},
		queryData(){
			querySX(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
				this.mymsglist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据查询失败!'
            	});
			})
		},
		pagechange(){
			this.queryData();
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
.el-pagination{
	width: 300px;
	margin: 0 auto;
	margin-top: 40px;
}
</style>