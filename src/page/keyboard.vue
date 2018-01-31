<template>
<div>
	<topTitle></topTitle>
	<keyboard class="input" :title="'请输入车牌号码'"></keyboard>
	<keyboard class="input" :title="'请输入号码'"></keyboard>
	<keyboard class="input" @change="getValue"></keyboard>
</div>
</template>

<script>
import topTitle from '../components/title'
import keyboard from '../components/keyboard'
export default {
	components: {
		topTitle,
		keyboard
	},
	data() {
		return {
			getValue: v => {
				console.log(v)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.input{
	border: 1px solid #999;
	margin: 20px;
}
</style>