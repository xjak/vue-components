<template>
	<div class="alert" @touchmove.prevent v-if="status">
		<div>
			<p v-html="text"></p>
			<div class="clearfix">
				<a @click="lFn" 
					v-if="left!='0'" 
					class="left" 
					href="javascript:;">
					{{left}}
				</a>
				<a @click="rFn" 
					:class="{width:left=='0'}" 
					:style="{color:rColor}"
					class="right" 
					href="javascript:;">
					{{right}}
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			status: this.data.status,
			rFn: this.data.rFn,
			lFn: this.data.lFn,
			text: this.data.text,
			left: this.data.left ? this.data.left : '取消',
			right: this.data.right ? this.data.right : '确定',
			rColor: this.data.rColor ? this.data.rColor : ''
		}
	},
	props: ['data'],
	watch: {
		'data.status' () {
			this.status = this.data.status
		},
		'data.text' () {
			this.text = this.data.text
		},
		'data.rFn' () {
			this.rFn = this.data.rFn
		},
		'data.lFn' () {
			this.lFn = this.data.lFn
		},
		'data.left' () {
			this.left = this.data.left
		},
		'data.right' () {
			this.right = this.data.right
		}
    }
}
</script>

<style scoped lang="less">
.alert{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 999999;
	>div{
		position: absolute;
		top: 50%;
		left: 50%;
		background: #fff;
		width: 270px;
		transform:translate(0,-50%);
		margin-left: -135px;
		border-radius: 5px;
		p{
			text-align: center;
			padding: 25px;
			font-size: 16px;
		}
		img{
			display: block;
    		height: 37px;
    		margin: 18px auto 15px auto;
		}
		>div{
			text-align: center;
			border-top: 1px solid #dcdcdc;
			height: 40px;
			a{
				width: 49.5%;
				font-size: 16px;
				height: 20px;
				margin-top: 9px;
				color: #2a707c;
			}
			a.left{
				border-right: 1px solid #dcdcdc;
				color: #666;
			}
			.width{
				width: 100%;
			}
		}
	}
}
</style>