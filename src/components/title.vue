<template>
	<header>
		<div class="title clearfix">
			<p>{{title}}</p>
			<img @click="$router.go(-1)" class="left" src="../images/return-left.png">
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			title: this.$route.path.replace('/', '')
		}
	}
}
</script>

<style lang="less">
	header{
		display: block;
		height: 40px;
		width: 100%;
	}
	.title{
		position: fixed;
		top: 0;
		height: 40px;
		width: 100%;
		background: #404a53;
		>img{
			height: 40px;
			padding: 7px 20px 7px 10px;
			position: relative;
			z-index: 1;
		}
		p{
			position: absolute;
			width: 100%;
			line-height: 40px;
			text-align: center;
			font-size: 18px;
			color: #fff;
		}
	}
</style>