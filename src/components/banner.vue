<template>
<div class="box"  ref="box">
	<ul class="imgs clearfix" ref="content">
		<li @click.stop="toDetails(i.advertName,i.href)" :style="{width:width+'px'}" class="left" v-for="i in list">
			<a href="javascript:;">
				<img :src="i.url" alt="logo">
			</a>
		</li>
	</ul>
	<ul class="items" id="items">
		<li v-for="(i,x) in length" v-if="length!=1" :class="{item:x+1===index}"></li>
	</ul>
</div>
</template>

<script>
export default {
	props: ['imgs'],
	data () {
		return {
			list: this.imgs,
			timer: null,
			index: 1,
			length: 0,
			width: document.body.clientWidth,
			autoTime: 4000,
			move: 0,
			flag: 3
		}
	},
	methods: {
		getBanner() {
			if (this.list.length > 1) {
				this.length = this.list.length
				this.list.unshift(this.list[this.list.length - 1])
				this.list.push(this.list[1])
				this.$refs.content.style.width = this.list.length * this.width + 'px'
				this.addEvent()
			}
		},
		toDetails(a, b) {
			this.$router.push({
				path: 'container/advertisingPage',
				query: {
					title: a,
					src: b
				}
			})
		},
		addEvent () {
			let first
			let prev = 0
			let last
			let time
			let flag
			this.autoPlay()
			this.$refs.content.style.transform = 'translate3d(' + -this.width + 'px,0,0)'
			this.$refs.box.addEventListener('touchstart', e => {
				this.$refs.content.style.transitionDuration = '0ms'
				clearInterval(this.timer)
				flag = 1
				time = new Date().getTime()
				first = e.targetTouches[0].pageX
				prev = first - prev
			})
			this.$refs.box.addEventListener('touchmove', e => {
				e.preventDefault()
				flag = 0
				last = e.targetTouches[0].pageX
				let move = first - last + (this.index * this.width)
				this.$refs.content.style.transform = 'translate3d(' + -move + 'px, 0, 0)'
			})
			this.$refs.box.addEventListener('touchend', e => {
				if (flag) return
				this.autoPlay()
				let over = new Date().getTime() - time
				if (over < 200) {
					(last - first) > 0 ? this.index -= 1 : this.index += 1
				} else {
					if (Math.abs(first - last) > this.width / 2) {
						(last - first) > 0 ? this.index -= 1 : this.index += 1
					}
				}
				this.play()
			})
			let event = (() => {
				let el = document.createElement('surface')
				let transitions = {
					'transition': 'transitionend',
					'WebkitTransition': 'webkitTransitionEnd'
				}
				for (let t in transitions) {
					if (el.style[t] !== undefined) {
						return transitions[t]
					}
				}
			})()
			event && this.$refs.content.addEventListener(event, (e) => {
				if (this.index <= 1) {
					this.$refs.content.style.transitionDuration = '0ms'
					this.$refs.content.style.transform = 'translate3d(' + this.move + 'px,0,0)'
				}
			})
		},
		play() {
			this.$refs.content.style.transitionDuration = '500ms'
			this.$refs.content.style.transform = 'translate3d(' + -this.index * this.width + 'px, 0, 0)'
			if (this.index < 1) {
				this.move = -this.width * this.length
				this.index = this.length
			}
			if (this.index > this.length) {
				this.move = -this.width
				this.index = 1
			}
		},
		autoPlay() {
			this.timer = setInterval(() => {
				this.index++
					this.play()
			}, this.autoTime)
		}
	},
	mounted() {
		this.getBanner()
	},
	beforeDestroy () {
		clearInterval(this.timer)
	}
}
</script>

<style scoped lang="less">
.box{
	height: auto;
	width: 100%;	
	position: relative;
	overflow: hidden;
	z-index: 9;
	.imgs{
		height: 100%;
		min-height: 50px;
		li{
			img{
				width: 100%;
				display: block;
			}
		}
	}
	.items{
		position: absolute;
		bottom: 50px;
		width: 100%;
		text-align: center;
		li{
			width: 8px;
			height: 8px;
			background: #000;
			border-radius: 100%;
			margin: 0 3px;
			opacity: .2;
			display: inline-block;
		}
		.item{
			background: #fff;
			opacity: 1;
		}
	}
}
</style>