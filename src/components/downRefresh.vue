<template>
	<div class="downRefresh">
		<img v-if="display" src="../images/load.gif">
	</div>
</template>

<script>
export default {
	data() {
		return {
			display: 0,
			timer: null,
			th: 0
		}
	},
	props: ['obj'],
	watch: {
		'obj.status'() {
			if (this.obj.status === 0) {
				document.removeEventListener('scroll', this.move)
			}
		}
	},
	mounted() {
		setTimeout(t => {
			this.refresh()
		}, 500)
	},
	methods: {
		refresh() {
			document.addEventListener('touchstart', e => {
				this.th = document.body.offsetHeight - window.innerHeight
			}, false)
			this.th = document.body.offsetHeight - window.innerHeight
			document.addEventListener('scroll', this.move, false)
			let ua = window.navigator.userAgent.toLowerCase()
			if (!/micromessenger/i.test(ua)) {
				window.addEventListener('resize', this.resize, false)
			}
		},
		move() {
			if ((this.th - document.body.scrollTop) < 3) {
				this.display = 1
				clearTimeout(this.timer)
				this.timer = setTimeout(t => {
					if (this.obj.fn) this.obj.fn()
					this.display = 0
					this.th = document.body.offsetHeight
				}, 500)
			}
		},
		resize() {
			this.th = document.body.offsetHeight - window.innerHeight
		}
	},
	beforeDestroy() {
		document.removeEventListener('scroll', this.move)
		window.removeEventListener('resize', this.resize)
	}
}
</script>

<style lang="less">
	.downRefresh{
		height: 30px;
		img{
			height: 20px;
			display: block;
			margin: 2px auto;
		}
	}
</style>