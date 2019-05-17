<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入用户昵称/id/账号">
					</el-input>
				</el-form-item>
				<el-form-item>
					<span>用户类型</span>
					<el-select v-model="searchForm.type" placeholder="请选择">
						<el-option v-for="(item, index) in typeops" :key="index" :value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<span>是否禁用</span>
					<el-select v-model="searchForm.forbid" placeholder="请选择">
						<el-option v-for="(item, index) in forbidops" :key="index" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="userlist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.userId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户账号" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.userAccount}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户昵称">
				<template slot-scope="scope">
					<span>{{scope.row.userNickname}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户类型" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.userRole == 0 || scope.row.userRole == 2? '普通用户':'专家'}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="注册时间" width="160">
				<template slot-scope="scope">
					<span>{{ scope.row.userCreateDate.split("T")[0] }}&nbsp;&nbsp;{{ scope.row.userCreateDate.split("T")[1].split(".")[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button size="small" type="info" plain>查看</el-button>
					<el-button v-if="scope.row.userStatus == 0" size="small" type="danger" plain>禁用</el-button>
					<el-button v-if="scope.row.userStatus == 1" size="small" type="success" plain>启用</el-button>
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
import { listuser } from '@/api/user';

export default{
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: '',
				type: '专家',
				forbid: '是'
			},
			typeops: [
				{
					id: 1,
					name: '专家'
				},
				{
					id: 2,
					name: '普通用户'
				}
			],
			forbidops: ['是', '否'],
			userlist: [
			]
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listuser(this.currentpage, this.pagesize).then(response => {
				this.userlist = response.data;
				this.total = response.total;
			}).catch(error => {

			})
		},
		pagechange(){
			alert("切换页码");
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