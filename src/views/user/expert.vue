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
					<span>{{scope.row.index}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="专家账号" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.account}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="专家名字">
				<template slot-scope="scope">
					<span>{{scope.row.name}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户类型" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.type}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="审核状态" width="140">
				<template slot-scope="scope">
					<span>{{scope.row.status}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="审核时间" width="160">
				<template slot-scope="scope">
					<span>{{scope.row.date}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
					<el-button size="small" type="info" plain>审核</el-button>
					<el-button size="small" type="warning" plain>查看</el-button>
					<el-button v-if="scope.row.forbid == 0" size="small" type="danger" plain>禁用</el-button>
					<el-button v-if="scope.row.forbid == 1" size="small" type="danger" plain>启用</el-button>
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
			expertlist: [
				{
					index: 1,
					account: '13330754958',
					name: '专家名字',
					status: '审核中',
					date: '2019-3-18',
					forbid: 0
				},
				{
					index: 2,
					account: '13330754958',
					name: '专家名字',
					status: '审核通过',
					date: '2019-3-18',
					forbid: 1
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
}
</style>