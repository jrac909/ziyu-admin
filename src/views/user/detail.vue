<template>
<div class="app-container">
	<header>
		<h3>咨询师入驻审核</h3>
	</header>
	<section class="info">

		<h4>基本信息</h4>
		<p>
			<svg-icon icon-class="user"></svg-icon>&nbsp;&nbsp;<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{shenhe.name}}</span>
		</p>
		<p>
			<svg-icon icon-class="eye"></svg-icon>&nbsp;&nbsp;<span>身份证号： {{shenhe.idcard}}</span>
		</p>
		<p v-if="shenhe.status == 1">
			<svg-icon icon-class="shenhe1"></svg-icon>&nbsp;&nbsp;<span>审核状态： 已通过</span>
		</p>
		<p v-if="shenhe.status == 2">
			<svg-icon icon-class="shenhe2"></svg-icon>&nbsp;&nbsp;<span>审核状态： 未通过</span>
		</p>
		<p v-if="shenhe.status == 0">
			<svg-icon icon-class="shenhe0"></svg-icon>&nbsp;&nbsp;<span>审核状态： 审核中</span>
		</p>
		<h4>证书信息</h4>
		<p>
			<svg-icon icon-class="name"></svg-icon>&nbsp;&nbsp;<span>证书名称： {{shenhe.occupation}}</span>
		</p>
		<p>
			<svg-icon icon-class="bianhao"></svg-icon>&nbsp;&nbsp;<span>证书编号： {{shenhe.certificateNo}}</span>
		</p>
		<p>
			<svg-icon icon-class="dengji"></svg-icon>&nbsp;&nbsp;<span>证书等级： {{shenhe.quaLevel}}</span>
		</p>
		<p class="zhengshu-img"><svg-icon icon-class="zheng"></svg-icon>&nbsp;&nbsp;证书图片 <img :src="shenhe.photo">
		</p>
		<el-button style="margin-left: 560px;" v-if="shenhe.status == 0" @click.native="jujue()" type="info">拒绝</el-button>
		<el-button style="margin-left: 20px; background-color: #649eb9;" v-if="shenhe.status == 0" type="primary" @click.native="agree()">同意</el-button>
	</section>
</div>	
</template>
<script>
import * as ShenheService from '@/api/shenhe'

export default{
	data(){
		return {
			shenheId: 0,
			shenhe: {}
		}
	},
	created(){
		this.shenheId = this.$route.query.shenheId;
		this.getById();
	},
	methods: {
		getById(){
			ShenheService.getById(this.shenheId).then(res => {
				this.shenhe = res.data;
				console.log(this.shenhe);
			}).catch(err => {
				console.log(err);
			})
		},
		agree(){
			ShenheService.agree(this.shenheId).then(res => {
				this.$message({
          			message: '操作成功，审核通过！',
          			type: 'success'
        		});
				this.getById();
			}).catch(err => {
				console.log(err);
			})
		},
		jujue(){
			ShenheService.jujue(this.shenheId).then(res => {
				this.$message({
          			message: '操作成功，未通过审核！',
          			type: 'warning'
        		});
				this.getById();
			}).catch(err => {
				console.log(err);
			})
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
	height: auto;
	width: 100%;
	h3{
		color: #2C3E50;
		padding-left: 20px;
		border-left: 4px solid #649eb9;
	}
	.info{
		width: 800px;
		padding: 10px 20px;
		margin: 0 auto;
		margin-top: 40px;
		border: 6px solid #649eb9;
		border-bottom: none;
		box-shadow: 0 0 6px #000;
		p{
			margin-top: 10px;
		}
		h4{
			padding-bottom: 8px;
			width: 700px;
			border-bottom: 1px solid #2C3E50;
		}
		.zhengshu-img{
			img{
				margin-top: 20px;
				padding: 10px;
				border: 1px solid #ccc;
				width: 700px;
				height: 400px;
			}
		}
	}
}
</style>