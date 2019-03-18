<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" class="searchForm" label-position="left">
			<el-form-item>
				<el-input v-model="searchForm.picname" placeholder="请输入图片名称"></el-input>
			</el-form-item>
			<el-form-item>
				<span>图片类型</span>
				<el-select v-model="searchForm.pictype" placeholder="请选择">
					<el-option v-for="(item, index) in typeops" :key="index" :value="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<span>前台显示</span>
				<el-select v-model="searchForm.picshow" placeholder="请选择">
					<el-option v-for="(item, index) in showops" :key="index" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="queryData">查询</el-button>
			</el-form-item>
			</el-form>
		</header>
		<!-- 添加图片弹出框 -->
		<el-button class="addpic-btn" type="text" @click="dialogFormVisible = true">+添加图片</el-button>
		<el-dialog title="添加图片" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
  		<el-form :model="addpic">
    		<el-form-item label="图片名称" :label-width="formLabelWidth">
      			<el-input v-model="addpic.name" auto-complete="off"></el-input>
    		</el-form-item>
    		<el-form-item label="图片类型" :label-width="formLabelWidth">
      			<el-select placeholder="请选择">
					<el-option v-for="(item, index) in typeops" :key="index" :value="item.name"></el-option>
				</el-select>
    		</el-form-item>
    		<el-form-item label="上传图片" :label-width="formLabelWidth"></el-form-item>
    		<el-form-item label="添加链接" :label-width="formLabelWidth">
    			<el-input placrholder="请输入图片链接"></el-input>
    		</el-form-item>
    		<el-form-item label="前台显示" :label-width="formLabelWidth">
    			<el-select placeholder="请选择">
					<el-option v-for="(item, index) in showops" :key="index" :value="item"></el-option>
				</el-select>
    		</el-form-item>
  		</el-form>
  		<div slot="footer" class="dialog-footer">
    		<el-button @click="dialogFormVisible = false">取 消</el-button>
    		<el-button class="comfirm-btn" type="primary" @click="dialogFormVisible = false">确 定</el-button>
  		</div>
		</el-dialog>
		<!-- 表格部分 -->
		<el-table :data="picslist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope"><span>{{ scope.row.index }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="图片名称" width="270">
				<template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="图片类型" width="140">
				<template slot-scope="scope"><span>{{ scope.row.type }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="图片显示" width="100">
				<template slot-scope="scope"><span>{{ scope.row.show }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="修改时间" width="240">
				<template slot-scope="scope"><span>{{ scope.row.date }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="270">
				<template slot-scope="scope">
					<el-button class="table-op-btn" size="small" type="info" plain>编辑</el-button>
					<el-button class="table-op-btn" size="small" type="warning" plain>查看</el-button>
					<el-button class="table-op-btn" size="small" type="danger" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import {getList, queryList} from '@/api/pic'

export default{
	data(){
		return {
			searchForm: {
				picname: '',
				pictype: '首页轮播图',
				picshow: '是'

			},
			typeops: [
				{
					id:1,
					name: '首页轮播图'
				}
			],
			showops: ['是', '否'],
			dialogFormVisible: false,
			addpic: {
				name: ''
			},
			formLabelWidth: '120px',
			picslist: [],
			listLoading: true
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getList().then(response => {
				this.picslist = response.data.items
			})
		},
		queryData(){
			alert("picname:"+this.searchForm.picname+"pictype:"+this.searchForm.pictype+"picshow:"+this.searchForm.picshow);
			queryList(this.searchForm.picname, this.searchForm.pictype, this.searchForm.picshow).then(response => {
				this.picslist = response.data.items;
			})
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss">
button{
	cursor: pointer;
}
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
	.addpic-btn{
		display: block;
		float: left;
		margin-right: 300px;
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