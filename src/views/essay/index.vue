<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" class="searchForm" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholde="请输入文章标题/作者名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<!-- 查看文章弹出框 -->
		<el-dialog title="查看文章" :visible.sync="lookDialogVisible">
  			<el-form :model="curessay">
    			<el-form-item label="文章标题" :label-width="formLabelWidth">
      				<el-input v-model="curessay.essayTitle" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="作者名" :label-width="formLabelWidth">
      				<el-input v-model="this.curuser.userNickname" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="文章内容" :label-width="formLabelWidth">
      				<textarea style="height: 500px; width: 100%; border: 1px solid #DCDFE6; background-color: #FFF; padding: 20px;" :disabled="true" v-model="curessay.essayContent"></textarea>
    			</el-form-item>
    			<el-form-item label="修改时间" :label-width="formLabelWidth">
      				<el-input v-model="curessay.essayCreateDate" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
  			</el-form>
  			<div slot="footer" class="dialog-footer">
    			<el-button @click="lookDialogVisible = false">取 消</el-button>
    			<el-button @click="lookDialogVisible = false" class="up-btn">确 定</el-button>
  			</div>
		</el-dialog>
		<el-table :data="essaylist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					<span>{{scope.row.essayId}}</span>
				</template>
			</el-table-column>
			<el-table-column style="display:inline-block; height: 60px; overflow: hidden;" align="center" label="文章标题" width="180">
				<template slot-scope="scope">
					<span>{{scope.row.essayTitle}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="文章内容">
				<template slot-scope="scope">
					<span style="display:inline-block; height: 60px; overflow: hidden;">{{scope.row.essayContent}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="作者 ID" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.essayUserId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="点赞数" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.essayAgreeCount}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="发布时间" width="180">
				<template slot-scope="scope">
					<span>{{ scope.row.essayCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ scope.row.essayCreateDate.split('T')[1].split('.')[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="lookessay(scope.row.essayId)" size="small" type="warning" plain>查看</el-button>
					<el-button @click="delessay(scope.row.essayId)" size="small" type="danger" plain>删除</el-button>
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
import { getList, queryList, getessay, delessay } from '@/api/essay';
import { getuser } from '@/api/user';
import { Message, MessageBox } from 'element-ui';

export default{
	data(){
		return {
			formLabelWidth: '120px',
			searchForm: {
				name: ''
			},
			essaylist: [],
			total: 0,
			pagesize: 10,
			currentpage: 1,
			lookDialogVisible: false, /* 查看的弹出框 */
			curessay: {}, /* 当前文章 */
			curuser: {}, /* 当前用户 */
		}
	},
	created(){
		this.fetchDate();
	},
	methods: {
		fetchDate: function(){
			getList(this.currentpage, this.pagesize).then(response => {
				this.essaylist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据拉取失败!'
            	});
			})

		},
		queryData: function(){
			queryList(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
				this.essaylist = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据查询失败!'
            	});
			})
		},
		pagechange: function(){
			this.queryData();
		},
		lookessay: function(id){
			this.lookDialogVisible = true;
			getessay(id).then(response => {
				this.curessay = response.data;
				this.curessay.essayCreateDate = this.curessay.essayCreateDate.split('T')[0]+"   "+this.curessay.essayCreateDate.split('T')[1].split('.')[0];
				getuser(this.curessay.essayUserId).then(response => {
					this.curuser = response.data;
				}).catch(error => {
					this.$message({
            			type: 'error',
            			message: '数据查询失败!'
            		});
				})
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据获取失败!'
            	});
			})
		},
		delessay: function(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delessay(id).then(response => {
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
<style rel="stylesheet/scss" lang="scss">	
</style>
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
.up-btn{
	background-color: $blue;
	color: #FFF;
	&:hover{
		opacity: 0.9;
	}
}
</style>