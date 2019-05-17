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
      				<el-input maxlength="30" v-model="addpic.name" auto-complete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="图片类型" :label-width="formLabelWidth">
      				<el-select v-model="addpic.type" placeholder="首页轮播图">
						<el-option v-for="(item, index) in typeops" :key="index" :value="item.name"></el-option>
					</el-select>
    			</el-form-item>
    			<el-form-item label="上传图片" :label-width="formLabelWidth">
    				<el-upload
  						action="/api/pic/add"
  						list-type="picture-card"
  						:on-preview="handlePictureCardPreview"
  						:limit="limit"
 						:on-remove="handleRemove"
 						:before-upload="beforeAvatarUpload">
  						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
  						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>		
    			</el-form-item>
    			<el-form-item label="添加链接" :label-width="formLabelWidth">
    				<el-input v-model="addpic.link" placrholder="请输入图片链接"></el-input>
    			</el-form-item>
    			<el-form-item label="前台显示" :label-width="formLabelWidth">
    				<el-select v-model="addpic.show" placeholder="请选择">
						<el-option v-for="(item, index) in showops" :key="index" :value="item"></el-option>
					</el-select>
    			</el-form-item>
  			</el-form>
  			<div slot="footer" class="dialog-footer">
    			<el-button @click="dialogFormVisible = false">取 消</el-button>
    			<el-button class="comfirm-btn" type="primary" @click="addPic">确 定</el-button>
  			</div>
		</el-dialog>
		<!-- 查看图片弹出框 -->
		<el-dialog title="查看图片" :visible.sync="lookDialogVisible">
  			<el-form :model="curpic">
    			<el-form-item label="图片名称" :label-width="formLabelWidth">
      				<el-input v-model="curpic.picName" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="图片类型" :label-width="formLabelWidth">
      				<el-select v-model="curpic.picType" placeholder="首页轮播图">
						<el-option v-for="(item, index) in typeops" :key="index" :value="item.name"></el-option>
					</el-select>
   				</el-form-item>
   				<el-form-item label="前台显示" :label-width="formLabelWidth">
    				<el-select v-model="curpic.picIsShow" placeholder="请选择">
						<el-option v-for="(item, index) in showops" :key="index" :value="item"></el-option>
					</el-select>
    			</el-form-item>
    			<el-form-item label="图片链接" :label-width="formLabelWidth">
      				<el-input v-model="curpic.picLink" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="图片" :label-width="formLabelWidth">
    				<img :src="curpic.picPath" style="width:400px; height: 200px;" />
    			</el-form-item>
    			<el-form-item label="修改时间" :label-width="formLabelWidth">
      				<el-input v-model="curpic.picUpdateDate" :disabled="true" autocomplete="off"></el-input>
    			</el-form-item>
  			</el-form>
  			<div slot="footer" class="dialog-footer">
    			<el-button @click="lookDialogVisible = false">取 消</el-button>
    			<el-button class="up-btn" @click="uppic">修 改</el-button>
  			</div>
		</el-dialog>
		<!-- 表格部分 -->
		<el-table :data="picslist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope"><span>{{ scope.row.picId }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="图片名称">
				<template slot-scope="scope"><span>{{ scope.row.picName }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="图片类型" width="180">
				<template slot-scope="scope"><span>{{ scope.row.picType }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="图片显示" width="100">
				<template slot-scope="scope"><span>{{ scope.row.picIsShow }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="修改时间" width="240">
				<template slot-scope="scope"><span>{{ scope.row.picUpdateDate.split("T")[0] }}&nbsp;&nbsp;{{ scope.row.picUpdateDate.split("T")[1].split(".")[0] }}</span></template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="lookpic(scope.row.picId)" class="table-op-btn" size="small" type="warning" plain>查看</el-button>
					<el-button @click="delPic(scope.row.picId)" class="table-op-btn" size="small" type="danger" plain>删除</el-button>
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
import {getList, queryList, add, del, getpic, upPic} from '@/api/pic';
import { MyDate } from '@/utils/format';
import { Message, MessageBox } from 'element-ui';

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
				name: '',
				type: '首页轮播图',
				show: '是',
				link: ''
			},
			curpic: {},
			formLabelWidth: '120px',
			picslist: [],
			listLoading: true,
			total: 0,
			pagesize: 10,
			currentpage: 1,
			pagetype: 0  /* 0是查询全部 1是条件查询 */,
			dialogImageUrl: '',
        	dialogVisible: false,
        	limit: 1,
        	delDialogVisible: false, /* 确认删除的弹框默认隐藏 */
        	lookDialogVisible: false
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getList(this.currentpage, this.pagesize).then(response => {
				this.picslist = response.data;
				this.total = response.total;
				this.pagetype = 0;
			});
			this.searchForm.picname = '';
		},
		queryData(){
			queryList(this.currentpage, this.pagesize, this.searchForm.picname, this.searchForm.pictype, this.searchForm.picshow).then(response => {
				this.picslist = response.data;
				this.total = response.total;
				this.pagetype = 1;
			})
		},
		pagechange(){
			if(this.pagetype == 0){
				getList(this.currentpage, this.pagesize).then(response => {
				this.picslist = response.data;
				this.total = response.total;
				})
			} else {
				queryList(this.currentpage, this.pagesize, this.searchForm.picname, this.searchForm.pictype, this.searchForm.picshow).then(response => {
					this.picslist = response.data;
					this.total = response.total;
				})
			}
		},
		handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
      	handlePictureCardPreview(file) {
        	this.dialogImageUrl = file.url;
        	this.dialogVisible = true;
      	},
      	beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
        	console.log(file);
        	const isJPG = file.type === 'image/jpeg';
        	if (!isJPG) {
           		Message({
      				message: '上传头像图片只能是 JPG 格式!',
      				type: 'error',
      				duration: 5 * 1000
    			})
        	}
        	const isLt2M = file.size / 1024 / 1024 < 2;
        	if (!isLt2M) {
          		Message({
      				message: '上传图片大小不能超过 2MB!',
      				type: 'error',
      				duration: 5 * 1000
    			})
        	}
        	return isJPG && isLt2M;
      	},
      	addPic(){
      		add(this.addpic.name, this.addpic.type, this.addpic.show, this.addpic.link).then(response => {
      			this.dialogFormVisible = false;
      		}).catch(error => {
      		})
      		this.fetchData();
      	},
      	delPic(id){
      		 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
          		type: 'warning'
        		}).then(() => {
        			del(id).then(response => {
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
        			this.fetchData();
        		}).catch(() => {
          			this.$message({
            			type: 'info',
            			message: '已取消删除'
          			});          
        		});
      	},
      	lookpic(id){
      		this.lookDialogVisible = true;
      		getpic(id).then(response => {
      			this.curpic = response.data;
      			this.curpic.picUpdateDate = this.curpic.picUpdateDate.split('T')[0]+"   "+this.curpic.picUpdateDate.split('T')[1].split('.')[0];
      		}).catch(error => {
      			alert("失败");
      		})
      	},
      	uppic(){
      		this.lookDialogVisible = false;
      		upPic(this.curpic.picId, this.curpic.picName, this.curpic.picType, this.curpic.picIsShow, this.curpic.picLink).then(response => {
      				this.$message({
            			type: 'success',
            			message: '修改成功!'
            		});
            	this.queryData();
      		}).catch(error => {
      			this.$message({
            		type: 'error',
            		message: '删除失败!'
            	});
      		})
      	}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss">
$main-blue: #5293B1;
button{
	cursor: pointer;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: $main-blue;
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