<template>
<div >
    <topTitle></topTitle>
    <div class="picker">
    	<ul ref="scroll">
    		<li v-for="i in 200">---{{i}}---</li>
    	</ul>
    </div>
</div>
</template>

<script>
import topTitle from './title'
export default {
    data () {
        return {
        }
    },
    components: {
        topTitle
    },
    methods: {
    },
    mounted() {
    	let el = this.$refs.scroll
    	let y = 0
    	let move = 0
    	let x = 0
    	el.addEventListener('touchstart', (e) => {
    		console.log(e)
    		y = e.touches[0].clientY
    	})
    	el.addEventListener('touchmove', (e) => {
    		move = e.touches[0].clientY - y + x
    		el.style.transform = 'translate3d(0,' + move + 'px,0)'
    	})
    	el.addEventListener('touchend', (e) => {
    		x = move
    		console.log(move, x)
    	})
    }
}
</script>

<style lang="less" scoped>
.picker{
	margin: 290px 70px 0;
	border: 1px solid #ccc;
	height: 200px;
	text-align: center;
	overflow: hidden;
}
ul{
	li{
		line-height: 36px;
		height: 36px;
		color: #333;
	}
}
</style>