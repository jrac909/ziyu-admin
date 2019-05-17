<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入公告标题">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<!-- 发布公告弹出框 -->
		<el-button class="add-btn" type="text" @click="dialogFormVisible = true">+发布公告</el-button>
		<el-dialog title="发布公告" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
  			<el-form :model="addnotice">
    			<el-form-item label="公告标题" :label-width="formLabelWidth">
      				<el-input maxlength="30" v-model="addnotice.noticeTitle" auto-complete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="公告内容" :label-width="formLabelWidth">
      				<textarea style="height: 300px; width: 100%; border: 1px solid #DCDFE6; background-color: #FFF; padding: 20px;" v-model="addnotice.noticeContent"></textarea>
    			</el-form-item>
  			</el-form>
  			<div slot="footer" class="dialog-footer">
    			<el-button @click="dialogFormVisible = false">取 消</el-button>
    			<el-button @click="addn" class="comfirm-btn" type="primary">确 定</el-button>
  			</div>
		</el-dialog>
		<!-- 查看公告弹出框 -->
		<el-dialog title="查看公告" :visible.sync="lookDialogVisible" :modal-append-to-body="false">
  			<el-form>
    			<el-form-item label="公告标题" :label-width="formLabelWidth">
      				<el-input v-model="curnotice.noticeTitle" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="公告内容" :label-width="formLabelWidth">
      				<textarea style="height: auto; width: 100%; border: 1px solid #DCDFE6; background-color: #FFF; padding: 20px;" :disabled="true" v-model="curnotice.noticeContent"></textarea>
    			</el-form-item>
    			<el-form-item label="发布时间" :label-width="formLabelWidth">
      				<el-input v-model="curnotice.noticeCreateDate" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
  			</el-form>
  			<div slot="footer" class="dialog-footer">
    			<el-button @click="lookDialogVisible = false">取 消</el-button>
    			<el-button @click="lookDialogVisible = false" class="comfirm-btn" type="primary">确 定</el-button>
  			</div>
		</el-dialog>
		<el-table :data="noticelist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					<span>{{scope.row.noticeId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="公告标题" width="200">
				<template slot-scope="scope">
					<span style="display:inline-block; height: 60px; overflow: hidden;">{{scope.row.noticeTitle}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="公告内容">
				<template slot-scope="scope">
					<span style="display:inline-block; height: 60px; overflow: hidden;">{{scope.row.noticeContent}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="发布时间" width="160">
				<template slot-scope="scope">
					<span>{{ scope.row.noticeCreateDate.split("T")[0] }}&nbsp;&nbsp;{{ scope.row.noticeCreateDate.split("T")[1].split(".")[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="looknotice(scope.row.noticeId)" size="small" type="warning" plain>查看</el-button>
					<el-button @click="delnotice(scope.row.noticeId)" size="small" type="danger" plain>删除</el-button>
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
import { getlist, queryList, getnotice, delnotice, addnotice } from '@/api/notice';

export default{
	data(){
	return {
		formLabelWidth: '120px',
		dialogFormVisible: false,
		lookDialogVisible: false,
		total: 1000,
		pagesize: 10,
		currentpage: 1,
		searchForm: {
			name: ''
		},
		noticelist: [],
		curnotice: {},
		addnotice: {}
	}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getlist(this.currentpage, this.pagesize).then(response => {
				this.noticelist = response.data;
				this.total = response.total;
			})
		},
		queryData(){
			queryList(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
				this.pagetype = 1;
				this.noticelist = response.data;
				this.total = response.total;
			})
		},
		pagechange(){
			this.queryData();
		},
		looknotice(id){
			this.lookDialogVisible = true;
			getnotice(id).then(response => {
				this.curnotice = response.data;
				this.curnotice.noticeCreateDate = this.curnotice.noticeCreateDate.split('T')[0]+"   "+this.curnotice.noticeCreateDate.split('T')[1].split('.')[0];
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据获取失败!'
            	});
			})
		},
		delnotice(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delnotice(id).then(response => {
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
		},
		addn(){
			this.dialogFormVisible = false;
			addnotice(this.addnotice.noticeTitle, this.addnotice.noticeContent).then(response => {
			});
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
.add-btn{
	display: block;
	float: left;
	margin-right: 40px;
	margin-left: 420px;
	margin-bottom: 30px;
	color: #FFF;
	background-color: $blue;
	height: 35px;
	width: 144px;
	border-radius: 0;
}
.el-pagination{
	width: 300px;
	margin: 0 auto;
	margin-top: 40px;
}
</style>