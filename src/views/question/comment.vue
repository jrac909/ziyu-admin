<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-postion="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入问题标题">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<!-- 查看回答弹出框 -->
		<el-dialog title="查看回复" :visible.sync="lookDialogVisible">
  			<el-form :model="curcomment">
    			<el-form-item label="问题标题" :label-width="formLabelWidth">
      				<el-input v-model="this.curquestion.quesTitle" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="回答用户" :label-width="formLabelWidth">
      				<el-input v-model="this.curuser.userNickname" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="回答内容" :label-width="formLabelWidth">
      				<textarea v-model="curcomment.qauComment" style="height: auto; width: 100%; border: 1px solid #DCDFE6; background-color: #FFF; padding: 20px;" :disabled="true"></textarea>
    			</el-form-item>
    			<el-form-item label="回答时间" :label-width="formLabelWidth">
      				<el-input v-model="curcomment.qauCreateDate" :disabled="true" autocomplete="off"></el-input>
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
					<span>{{ scope.row.qauId }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="问题序号" width="120">
				<template slot-scope="scope">
					<span>{{ scope.row.qauQuesId }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论内容">
				<template slot-scope="scope">
					<span>{{ scope.row.qauComment }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户ID" width="180">
				<template slot-scope="scope">
					<span>{{ scope.row.qauUserId }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论时间" width="180">
				<template slot-scope="scope">
					<span>{{ scope.row.qauCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ scope.row.qauCreateDate.split('T')[1].split('.')[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="lookQC(scope.row.qauId)" size="small" type="warning" plain>查看</el-button>
					<el-button @click="delQC(scope.row.qauId)" size="small" type="danger" plain>删除</el-button>
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
import { listQC, queryQC, getQC, delQC } from '@/api/questionComment';
import { getQues } from '@/api/question';
import { getuser } from '@/api/user';

export default{
	data(){
	return {
		formLabelWidth: '120px',
		lookDialogVisible: false,
		total: 0,
		pagesize: 10,
		currentpage: 1,
		searchForm: {
			name: ''
		},
		commentlist: [],
		curcomment: {},
		curquestion: {},
		curuser: {}
	}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listQC(this.currentpage, this.pagesize).then(response => {
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
			queryQC(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
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
		lookQC(id){
			this.lookDialogVisible = true;
			getQC(id).then(response => {
				this.curcomment = response.data;
				this.curcomment.qauCreateDate = this.curcomment.qauCreateDate.split('T')[0]+"   "+this.curcomment.qauCreateDate.split('T')[1].split('.')[0];
				getQues(this.curcomment.qauQuesId).then(response => {
					this.curquestion = response.data;
				})
				getuser(this.curcomment.qauUserId).then(response => {
					this.curuser = response.data;
				})
			})
		},
		delQC(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delQC(id).then(response => {
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