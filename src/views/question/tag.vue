<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入标签名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-button class="addtag-btn" type="text" @click="dialogFormVisible = true">+添加标签</el-button>
		<el-dialog title="添加标签" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
			<el-form :model="addtag">
				<el-form-item label="标签名称" :label-width="formLabelWidth">
					<el-input v-model="addtag.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
    			<el-button @click="dialogFormVisible = false">取 消</el-button>
    			<el-button @click="" class="comfirm-btn" type="primary" @click="addTag">添 加</el-button>
  			</div>
		</el-dialog>
		<el-table :data="taglist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.qtId}}</span>
				</template>
			</el-table-column>	
			<el-table-column align="center" label="标签名称">
				<template slot-scope="scope">
					<span>{{scope.row.qtName}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="创建时间" width="200">
				<template slot-scope="scope">
					<span>{{ scope.row.qtCreateDate.split("T")[0] }}&nbsp;&nbsp;{{ scope.row.qtCreateDate.split("T")[1].split(".")[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button @click="delTag(scope.row.qtId)" size="small" type="danger" plain>删除</el-button>
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
import { getQuesTagList, queryQuesTagList, delQuesTag, addQuesTag } from '@/api/questionTag';
 
export default{
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: ''
			},
			dialogFormVisible: false,
			addtag: {
				name: ''
			},
			formLabelWidth: '120px',
			taglist: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getQuesTagList(this.currentpage, this.pagesize).then(response => {
				this.taglist = response.data;
				this.total = response.total;
			})
		},
		queryData(){
			queryQuesTagList(this.currentpage, this.pagesize, this.searchForm.name).then(response => {
				this.taglist = response.data;
				this.total = response.total;
			})
		},
		pagechange(){
			this.queryData();
		},
		addTag(){
			this.dialogFormVisible = false;
			addQuesTag(this.addtag.name).then(response => {

			});
			this.queryData();
		},
		delTag(id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delQuesTag(id).then(response => {
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
	.addtag-btn{
		display: block;
		float: left;
		margin-right: 600px;
		margin-bottom: 30px;
		color: #FFF;
		background-color: $blue;
		height: 35px;
		width: 144px;
		border-radius: 0;
	}
}
.dialog-footer{
	.comfirm-btn{
		background-color: $blue;
	}
}	
.el-pagination{
	width: 300px;
	margin: 0 auto;
	margin-top: 40px;
}
</style>