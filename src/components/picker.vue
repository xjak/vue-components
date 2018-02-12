<template>
<div >
    <input type="text" :placeholder="placeholder" ref="input" v-model="text" onfocus="this.blur()">
    <div class="picker" ref="picker">
    	<div class="picker-panel">
    		<div class="picker-content">
    			<div class="choose-hook">
    				<span class="picker-cancel left">取消</span>
    				<h2>{{title}}</h2>
    				<span class="picker-confirm right">确定</span>
    			</div>
    			<div class="wheel-hook">
    				<i></i>
    				<ul class="picker-scroll">
    					<li v-for="i in lists">{{i}}</li>
    				</ul>
    			</div>
    		</div>
    	</div>
    </div> 
</div>
</template>

<script>
import Picker from '../config/scroll'
export default {
    data () {
        return {
        	lists: this.list,
        	text: '',
        	placeholder: this.tip || '请选择'
        }
    },
    props: ['title', 'list', 'tip'],
    watch: {
    	list() {
    		this.lists = this.list
    	}
    },
    mounted() {
    	let picker = new Picker({
    		el: this.$refs.picker,
    		index: [new Date().getDay() - 1],
    		color: '#23948e',
    		select: (val) => {
    			this.text = val
    			this.$emit('callback', val)
    		}
    	})
    	this.$refs.input.addEventListener('click', () => {
    		picker.show()
    	})
    }
}
</script>

<style lang="less" scoped>
input{
	margin: 20px;
	border: 1px solid #aaa;
}
.picker{
	display: none;
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: 0;
	transition: all .4s;
	.picker-panel{
		position: absolute;
		opacity: 1;
		z-index: 90;
		transform: translateY(200px);
		transition: all .4s;
		width: 100%;
		height: 220px;
		bottom: 0;
		left: 0;
		background: #fff;
		text-size-adjust: none;
		user-select: none;
		.picker-content{
			position: relative;
			.choose-hook{
				position: absolute;
				z-index: 100;
				top: 0;
				width: 100%;
				height: 40px;
				background: #fff;
				>h2{
					color: #2196f3;
					text-align: center;
					font-size: 14px;
					line-height: 40px;
				}
				span{
					position: absolute;
					padding: 4px 10px;
					border: 1px solid #999;
					top: 10px;
				}
				span.left{
					left: 10px;
				}
				span.right{
					right: 10px;
				}
			}
			.wheel-hook{
				position: absolute;
				z-index: 999;
				top: 40px;
				width: 100%;
				height: 170px;
				overflow: hidden;
				text-align: center;
				font-size: 18px;
				>i{
					position: absolute;
					z-index: 10;
					display: block;
					top: 70px;
					height: 36px;
					width: 100%;
					border-top: 1px solid #ddd;
					border-bottom: 1px solid #ddd;
					pointer-events: none;
				}
				>ul{
					margin-top: 70px;
					li{
						line-height: 36px;
						height: 36px;
						color: #333;
					}
				}
			}
		}
	}
}
</style>