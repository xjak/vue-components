<template>
<div class="photo-view">
	<ul class="photo-list clearfix" ref="content" :style="{width:data.list.length*100+'%'}">
		<li class="left" v-for="i in data.list" :style="{width:100/data.list.length+'%'}">
			<h2>{{i.title}}</h2>
			<img :src="i.url" @load="imgLoad($event.target)">
		</li>
	</ul>
	<ul class="photo-index clearfix" ref="index">
		<li v-if="data.list.length>1" class="left" :class="{item:index==item}" v-for="(i,item) in data.list"></li>
	</ul>
</div>
</template>

<script>
export default {
	props: ['data'],
	wacth: {
		'data.index'() {
			this.index = this.data.index
		}
	},
	data() {
		return {
			index: this.data.index || 0
		}
	},
	created() {
	},
	methods: {
		imgLoad(el) {
			let eh = parseInt(window.getComputedStyle(el, null).height)
			let wh = window.screen.availHeight
			if (eh > (wh - 200)) {
				el.style.height = wh - 200 + 'px'
			} else {
				el.style.top = (wh - eh) / 2 - 100 + 'px'
			}
		},
		addEvent() {
			let wW = window.innerWidth
			let item = this.$refs.index
			let itemW = parseInt(window.getComputedStyle(item, null).width)
			item.style.left = (wW - itemW) / 2 + 'px'
			let content = this.$refs.content
			let startX = 0
			let time = 0
			let moveX = 0
			let flag = 1
			let moveTo = m => {
				content.style.transform = 'translate3d(' + m + 'px,0,0)'
			}
			moveTo(-this.index * wW)
			content.addEventListener('touchstart', e => {
				time = Date.now()
				flag = 1
				startX = e.touches[0].clientX
				content.style.transitionDuration = '0s'
			}, false)
			content.addEventListener('touchmove', e => {
				e.preventDefault()
				flag = 0
				moveX = e.touches[0].clientX - startX
				moveTo(moveX + -this.index * wW)
			}, false)
			content.addEventListener('touchend', e => {
				e.preventDefault()
				content.style.transitionDuration = '0.4s'
				time = Date.now() - time
				if (time < 200 && flag) {
					this.data.close()
					return
				}
				if (wW / 2 < Math.abs(moveX)) {
					if (moveX > 0) {
						if (this.index > 0) this.index -= 1
					} else {
						if (this.index < this.data.list.length - 1) this.index += 1
					}
				}
				moveTo(-this.index * wW)
			}, false)
		}
	},
	mounted() {
		setTimeout(() => {
			if (this.data.list[0]) this.addEvent()
		}, 30)
	}
}
</script>

<style lang="less">
.photo-view{
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #000;
	overflow: hidden;
	.photo-list{
		transition: all 0s;
		li{
        	text-align: center;
        	height: 100%;
			h2{
				height: 50px;
				line-height: 50px;
				color: #fff;
				font-size: 16px;
			}
			img{
				position: relative;
				width: 100%;
			}
		}	
	}
	.photo-index{
		position: absolute;
		bottom: 20px;
		li{
			margin: 0 5px;
			height: 8px;
			width: 8px;
			border-radius: 8px;
			background: #999;
		}
		.item{
			background: #fff;
		}
	}
}
</style>