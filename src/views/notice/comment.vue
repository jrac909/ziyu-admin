<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入文章标题/用户昵称">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<!-- 查看公告评论弹出框 -->
		<el-dialog title="查看公告评论" :visible.sync="lookDialogVisible">
  			<el-form :model="curnoticecomment">
    			<el-form-item label="公告标题" :label-width="formLabelWidth">
      				<el-input v-model="this.curnotice.noticeTitle" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="用户昵称" :label-width="formLabelWidth">
      				<el-input v-model="this.curuser.userNickname" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="评论内容" :label-width="formLabelWidth">
      				<textarea v-model="curnoticecomment.ncContent" style="height: auto; width: 100%; border: 1px solid #DCDFE6; background-color: #FFF; padding: 20px;" :disabled="true"></textarea>
    			</el-form-item>
    			<el-form-item label="评论时间" :label-width="formLabelWidth">
      				<el-input v-model="curnoticecomment.ncCreateDate" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
  			</el-form>
  			<div slot="footer" class="dialog-footer">
    			<el-button @click="lookDialogVisible = false">取 消</el-button>
    			<el-button @click="lookDialogVisible = false" class="up-btn">确 定</el-button>
  			</div>
		</el-dialog>
		<el-table :data="commentlist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.ncId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="公告序号" width="120">
				<template slot-scope="scope">
					<span>{{scope.row.ncNoticeId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论内容">
				<template slot-scope="scope">
					<span>{{scope.row.ncContent}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户ID" width="180">
				<template slot-scope="scope">
					<span>{{scope.row.ncUserId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论时间" width="180">
				<template slot-scope="scope">
					<span>{{ scope.row.ncCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ scope.row.ncCreateDate.split('T')[1].split('.')[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="lookNC(scope.row.ncId)" size="small" type="warning" plain>查看</el-button>
					<el-button @click="delNC(scope.row.ncId)" size="small" type="danger" plain>删除</el-button>
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
import { listNC, queryNC, getNC, delNC } from '@/api/noticeComment';
import { getnotice } from '@/api/notice';
import { getuser } from '@/api/user';

export default{
	data(){
		return {
			lookDialogVisible: false,
			formLabelWidth: '120px',
			total: 0,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: ''
			},
			commentlist: [],
			curnoticecomment: [],
			curnotice: [],
			curuser: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listNC(this.currentpage, this.pagesize).then(response => {
				this.commentlist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据拉取失败!'
            	});
			})
		},
		queryData(){
			queryNC(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
				this.commentlist = response.data;
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
		},
		lookNC(id){
			getNC(id).then(response => {
				this.curnoticecomment = response.data;
				this.curnoticecomment.ncCreateDate = this.curnoticecomment.ncCreateDate.split('T')[0]+"   "+this.curnoticecomment.ncCreateDate.split('T')[1].split('.')[0];
				getnotice(this.curnoticecomment.ncNoticeId).then(response => {
					this.curnotice = response.data;
				})
				getuser(this.curnoticecomment.ncUserId).then(response => {
					this.curuser = response.data;
				})

				this.lookDialogVisible = true;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '失败!'
            	});
			})
		},
		delNC(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delNC(id).then(response => {
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