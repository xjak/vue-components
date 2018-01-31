<template>
	<div class="refresh" :style="{height:top+'px'}">
		<img src="../images/refresh.gif">
		<p>{{text}}</p>
	</div>
</template>

<script>
export default {
 	data() {
 		return {
 			top: 0,
 			text: '下拉刷新',
 			initY: 0,
 			flag: 0
 		}
 	},
 	props: ['obj'],
 	created() {
		document.body.addEventListener('touchstart', this.start, false)
 	},
	methods: {
		start(e) {
			this.text = '下拉刷新'
			this.initY = e.targetTouches[0].pageY
			if (document.body.scrollTop <= 0) {
				document.body.addEventListener('touchmove', this.move, false)
				document.body.addEventListener('touchend', this.end, false)
			} else {
				document.body.removeEventListener('touchmove', this.move)
			}
		},
		move(e) {
			if (e.targetTouches[0].pageY > this.initY && document.body.scrollTop <= 0) {
				e.preventDefault()
				let y = (e.targetTouches[0].pageY - this.initY) / 3
				this.top = y
				if (y > 65) {
					this.flag = 1
					this.text = '释放刷新'
					// this.$router.go(0)
				} else {
					this.flag = 0
					this.text = '下拉刷新'
				}
			}
		},
		end(e) {
			if (this.flag) {
				this.text = '正在刷新...'
				this.obj()
				setTimeout(() => {
					this.top = 0
				}, 600)
				console.log('刷新成功')
				this.$store.commit('setScrollTop', 1)
			} else {
				this.top = 0
			}
			this.flag = 0
		}
	},
	beforeDestroy() {
		document.body.removeEventListener('touchstart', this.start)
		document.body.removeEventListener('touchmove', this.move)
		document.body.removeEventListener('touchend', this.end)
	}
}
</script>

<style lang="less">
	.refresh{
		max-height: 70px;
		color: #999;
		overflow: hidden;
		text-align: center;
		font-size: 11px;
		img{
			display: block;
			margin: 8px auto 0px auto;
			height: 40px;
		}
	}
</style>