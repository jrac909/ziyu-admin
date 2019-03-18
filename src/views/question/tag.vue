<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入标签名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
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
    			<el-button class="comfirm-btn" type="primary" @click="dialogFormVisible = false">添 加</el-button>
  			</div>
		</el-dialog>
		<el-table :data="taglist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.index}}</span>
				</template>
			</el-table-column>	
			<el-table-column align="center" label="标签名称">
				<template slot-scope="scope">
					<span>{{scope.row.name}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="创建时间" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.date}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button size="small" type="info" plain>编辑</el-button>
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
			dialogFormVisible: false,
			addtag: {
				name: ''
			},
			formLabelWidth: '120px',
			taglist: [
				{
					index: 1,
					name: '标签名称',
					date: '2019-6-23'
				},
				{
					index: 2,
					name: '标签名称',
					date: '2019-6-23'
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
</style>