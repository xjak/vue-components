<template>
<div>
	<div ref="scroll">
		<ul>
			<li v-for="i in 200">-----{{i}}------</li>
		</ul>
	</div>
</div>
</template>

<script>
import topTitle from '../components/title'
import Iscroll from '../config/iscroll'
export default {
	components: {
		topTitle
	},
	mounted() {
		let scroll = new Iscroll(this.$refs.scroll)
		console.log(scroll)
	}
}
</script>

<style>
li{
	font-size: 20px;
	text-align: center;
}
</style>