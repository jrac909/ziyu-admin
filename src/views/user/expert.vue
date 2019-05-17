<template>
	<div class="app-container">
		<header>
			<el-form :model="searchForm" auto-complete="on" label-position="left">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入专家名字/id/账号">
					</el-input>
				</el-form-item>
				<el-form-item>
					<span>审核状态</span>
					<el-select v-model="searchForm.type" placeholder="请选择">
						<el-option v-for="(item, index) in statusops" :key="index" :value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
			</el-form>
		</header>
		<el-table :data="expertlist" element-loading-text="Loading" fit border highlight-current-row>
			<el-table-column align="center" label="序号" width="100">
				<template slot-scope="scope">
					<span>{{scope.row.userId}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="专家账号" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.userAccount}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="专家名字">
				<template slot-scope="scope">
					<span>{{scope.row.expertTrueName}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="审核状态" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.expertShenhe == 0? '审核中':'已通过'}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="审核时间" width="160">
				<template slot-scope="scope">
					<span>{{ scope.row.expertCreateDate.split("T")[0] }}&nbsp;&nbsp;{{ scope.row.expertCreateDate.split("T")[1].split(".")[0] }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button v-if="scope.row.expertShenhe == 0" size="small" type="info" plain>审核</el-button>
					<el-button v-if="scope.row.expertShenhe == 1" size="small" type="info" plain>查看详情</el-button>
					<el-button v-if="scope.row.expertDel == 0" size="small" type="danger" plain>禁用</el-button>
					<el-button v-if="scope.row.expertDel == 1" size="small" type="danger" plain>启用</el-button>
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
import { listexpert} from '@/api/expert';

export default{
	data(){
		return {
			total: 0,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				type: '审核通过'
			},
			statusops: [
				{
					index: 1,
					name: '审核通过'
				},
				{
					index: 1,
					name: '审核中'
				},
				{
					index: 1,
					name: '审核未通过'
				}
			],
			expertlist: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listexpert(this.currentpage, this.pagesize).then(response => {
				this.expertlist = response.data;
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