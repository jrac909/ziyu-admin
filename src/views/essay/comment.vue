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
		<!-- 查看文章评论弹出框 -->
		<el-dialog title="查看文章评论" :visible.sync="lookDialogVisible">
  			<el-form :model="curessaycomment">
    			<el-form-item label="文章标题" :label-width="formLabelWidth">
      				<el-input v-model="this.curessay.essayTitle" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="作者名" :label-width="formLabelWidth">
      				<el-input v-model="this.curuser.userNickname" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="评论内容" :label-width="formLabelWidth">
      				<textarea v-model="curessaycomment.ebComment" style="height: auto; width: 100%; border: 1px solid #DCDFE6; background-color: #FFF; padding: 20px;" :disabled="true"></textarea>
    			</el-form-item>
    			<el-form-item label="评论时间" :label-width="formLabelWidth">
      				<el-input v-model="curessaycomment.ebCreateDate" :disabled="true" autocomplete="off"></el-input>
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
					<span>{{scope.row.ebId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="文章序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.ebEssayId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论内容">
				<template slot-scope="scope">
					<span>{{scope.row.ebComment}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户id" width="100">
				<template slot-scope="scope">
					<span>	{{scope.row.ebUserId}}
					</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论时间" width="200">
				<template slot-scope="scope">
					<span>{{ scope.row.ebCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ scope.row.ebCreateDate.split('T')[1].split('.')[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="lookEB(scope.row.ebId)" size="small" type="warning" plain>查看</el-button>
					<el-button @click="delEB(scope.row.ebId)" size="small" type="danger" plain>删除</el-button>
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
import { listEB, queryEB, getEB, delEB } from '@/api/essayComment';
import { getessay } from '@/api/essay';
import { getuser } from '@/api/user';

export default{
	data(){
		return {
			formLabelWidth: '120px',
			searchForm: {
				name: ''
			},
			commentlist: [],
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			lookDialogVisible: false,
			curessay: [],
			curessaycomment: [],
			curuser: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listEB(this.currentpage, this.pagesize).then(response => {
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
			queryEB(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
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
		lookEB(id){
			this.lookDialogVisible = true;
			getEB(id).then(response => {
				this.curessaycomment = response.data;
				this.curessaycomment.ebCreateDate = this.curessaycomment.ebCreateDate.split('T')[0]+"   "+this.curessaycomment.ebCreateDate.split('T')[1].split('.')[0];
				getessay(this.curessaycomment.ebEssayId).then(response => {
					this.curessay = response.data;
				})
				getuser(this.curessaycomment.ebUserId).then(response => {
					this.curuser = response.data;
				})
			}).catch(error => {
				alert("错了");
			})
		},
		delEB(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delEB(id).then(response => {
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
.up-btn{
	background-color: $blue;
	color: #FFF;
	&:hover{
		opacity: 0.9;
	}
}
</style>