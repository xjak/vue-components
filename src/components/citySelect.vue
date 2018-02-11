<template>
<div >
    <input type="text" placeholder="请选择" ref="input" v-model="x" onfocus="this.blur()">
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
    				<ul class="picker-scroll left">
    					<li v-for="i in province">{{i.name}}</li>
    				</ul>
    				<ul class="picker-scroll left">
    					<li v-for="x in city">{{x}}</li>
    				</ul>
    				<ul class="picker-scroll left">
    					<li v-for="y in area">{{y}}</li>
    				</ul>
    			</div>
    		</div>
    	</div>
    </div> 
</div>
</template>

<script>
import Picker from '../config/scroll'
import city from '../config/cityList'
export default {
    data () {
        return {
        	province: city,
        	city: [],
        	area: [],
        	x: ''
        }
    },
    props: ['title'],
    created() {
    	this.city = this.getCity(2)
    	this.area = this.getArea(2, 0)
    	console.log(this.area)
    },
    methods: {
    	getCity(s) {
			let arr = []
			for (let j = 0; j < city[s].sub.length; j++) {
				arr.push(city[s].sub[j].name)
			}
			return arr
		},
		getArea(s, i) {
			let arr = []
			if (city[s].sub[i].sub) {
				for (let x = 0; x < city[s].sub[i].sub.length; x++) {
					arr.push(city[s].sub[i].sub[x].name)
				}
			}
			return arr
		}
    },
    mounted() {
    	let picker = new Picker({
    		el: this.$refs.picker,
    		index: [2, 0, 0],
    		color: '#23948e',
    		select: (val) => {
    			console.log(val)
    			this.x = val[0] + '-' + val[1] + (val[2] ? '-' + val[2] : '')
    		},
    		change: (index, list) => {
    			if (index === 0) {
    				this.city = this.getCity(list[0].index)
    				picker.refresh(1)
    				this.area = this.getArea(list[0].index, 0)
    				picker.refresh(2)
    			}
    			if (index === 1) {
    				this.area = this.getArea(list[0].index, list[1].index)
    				picker.refresh(2)
    			}
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
					color: #23948e;
					text-align: center;
					font-size: 14px;
					line-height: 50px;
				}
				span{
					position: absolute;
					height: 30px;
					width: 80px;
					text-align: center;
					line-height: 30px;
					border: 1px solid #999;
					top: 10px;
					border-radius: 3px;
					font-size: 14px;
				}
				span.left{
					left: 10px;
				}
				span.right{
					right: 10px;
					color: #23948e;
    				border: 1px solid #23948e;
				}
			}
			.wheel-hook{
				position: absolute;
				z-index: 999;
				top: 45px;
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
				.picker-scroll{
					margin-top: 70px;
					width: 33%;
					li{
						text-overflow:ellipsis;
						overflow: hidden;
						white-space: nowrap;
						width: 100%;
						line-height: 36px;
						height: 36px;
						color: #999;
					}
				}
			}
		}
	}
}
</style>