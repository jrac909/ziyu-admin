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
						<el-option v-for="(item, index) in typesops" :key="index" :value="item.qtName">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<!-- 查看文章弹出框 -->
		<el-dialog title="查看问题" :visible.sync="lookDialogVisible">
  			<el-form :model="curques">
   				<el-form-item label="问题标题" :label-width="formLabelWidth">
      				<el-input v-model="curques.quesTitle" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="提问用户" :label-width="formLabelWidth">
      				<el-input v-model="this.curuser.userNickname" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>	
    			<el-form-item label="提问内容" :label-width="formLabelWidth">
      				<textarea style="height: auto; width: 100%; border: 1px solid #DCDFE6; background-color: #FFF; padding: 20px;" :disabled="true" v-model="curques.quesContent"></textarea>
    			</el-form-item>	
    			<el-form-item label="提问时间" :label-width="formLabelWidth">
      				<el-input v-model="curques.quesCreateDate" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>	
  			</el-form>
  			<div slot="footer" class="dialog-footer">
    			<el-button @click="lookDialogVisible = false">取 消</el-button>
    			<el-button @click="lookDialogVisible = false" class="up-btn">确 定</el-button>
  			</div>
		</el-dialog>
		<el-table :data="questionlist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					<span>{{scope.row.quesId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="问题标题" width="200">
				<template slot-scope="scope">
					<span style="display:inline-block; height: 60px; overflow: hidden;">{{scope.row.quesTitle}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="问题内容">
				<template slot-scope="scope">
					<span style="display:inline-block; height: 60px; overflow: hidden;">{{scope.row.quesContent}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户ID" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.quesUserId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="提问时间" width="200">
				<template slot-scope="scope">
					<span>{{ scope.row.quesCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ scope.row.quesCreateDate.split('T')[1].split('.')[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="lookQues(scope.row.quesId)" size="small" type="warning" plain>查看</el-button>
					<el-button @click="delQues(scope.row.quesId)" size="small" type="danger" plain>删除</el-button>
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
import { getQuesList, queryQuesList, getQues, delQues } from '@/api/question';
import { getuser } from '@/api/user';
import { getQuesTagList } from '@/api/questionTag';

export default{
	data(){
		return {
			formLabelWidth: '120px',
			lookDialogVisible: false,
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: '',
				type: '青少年'
			},
			typesops: [],
			questionlist: [],
			curques: {},
			curuser: {}
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getQuesList(this.currentpage, this.pagesize).then(response => {
				this.questionlist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据拉取失败!'
            	});
			})

			getQuesTagList(1, 1000).then(response => {
				this.typesops = response.data
			})
		},
		queryData: function(){
			queryQuesList(this.currentpage, this.pagesize, this.searchForm.name, this.searchForm.type).then(response => {
				this.questionlist = response.data;
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
		lookQues(id){
			this.lookDialogVisible = true;
			getQues(id).then(response => {
				this.curques = response.data;
				this.curques.quesCreateDate = this.curques.quesCreateDate.split('T')[0]+"   "+this.curques.quesCreateDate.split('T')[1].split('.')[0];
				getuser(this.curques.quesUserId).then(response => {
					this.curuser = response.data;
				})
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据获取失败!'
            	});
			})
		},
		delQues: function(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delQues(id).then(response => {
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