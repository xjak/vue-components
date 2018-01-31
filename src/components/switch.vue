<template>
	<div :class="{item:key}"
		:style="{background:key?bgColor:''}" 
		class="switch">
		<i></i>
	</div>
</template>

<script>
export default {
  	data () {
  		return {
  			key: this.status,
  			bgColor: this.bg
  		}
  	},
  	props: ['status', 'bg'],
  	watch: {
  		status () {
  			this.key = this.status
  		}
 	}
}
</script>

<style scoped lang="less">
.switch{
	height: 26px;
	width: 42px;
	background: #fff;
	border: 1px solid #ccc;
	position: relative;
	border-radius: 26px; 
	display: inline-block;
	i{
		height: 24px;
		width: 24px;
		background: #fff;
		position: absolute;
		border-radius: 24px; 
		right: 16px;
		top: 0;
		transition: right .2s;
		box-shadow: 1px 2px 3px #ccc;
	}
}
.item{
	background: #03a9f4;
	i{
		right: 0;
	}		
}
</style>

