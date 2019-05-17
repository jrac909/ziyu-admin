<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<span>审核类型</span>
					<el-select v-model="searchForm.type" placeholder="请选择">
						<el-option v-for="(item, index) in typeops" :key="index" :value="item.name">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="queryData()">查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="shenhelist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.id}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="申请用户" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.userid}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="证书等级">
				<template slot-scope="scope">
					<span>{{scope.row.quaLevel}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="证书名称" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.occupation}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="证书编号" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.certificateNo}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="审核状态" width="140">
				<template slot-scope="scope">
					<span v-if="scope.row.status == 0">审核中</span>
					<span v-if="scope.row.status == 1">已通过</span>
					<span v-if="scope.row.status == 2">未通过</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button @click="godetail(scope.row.id)" v-if="scope.row.status == 1 || scope.row.status == 2" size="small" type="info" plain>查看详情</el-button>
					<el-button @click="godetail(scope.row.id)" v-if="scope.row.status == 0" size="small" type="success" plain>审核</el-button>
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
<script type="text/javascript">
import * as ShenheService from '@/api/shenhe'

export default{
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				type: '请选择',
				status: 0
			},
			typeops: [
				{
					id: 0,
					name: '审核中'
				},
				{
					id: 1,
					name: '已通过'
				},
				{
					id: 2,
					name: '未通过'
				}
			],
			shenhelist: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			ShenheService.getlist(this.currentpage, this.pagesize).then(response => {
				this.shenhelist = response.data;
				this.total = response.total;
			})
		},
		queryData(){
			if (this.searchForm.type == '审核中' || this.searchForm.type == '请选择'){
				this.searchForm.status = 0;
			}
			if (this.searchForm.type == '已通过'){
				this.searchForm.status = 1;
			}
			if (this.searchForm.type == '未通过'){
				this.searchForm.status = 2;
			}
			ShenheService.queryList(this.currentpage, this.pagesize, this.searchForm.status).then(response => {
				this.pagetype = 1;
				this.shenhelist = response.data;
				this.total = response.total;
			})
		},
		pagechange(){
			alert("切换页码");
		},
		godetail(id){
			this.$router.push({
				path: '/user/detail',
				query: {
					shenheId: id
				}
			})
		}
	}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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