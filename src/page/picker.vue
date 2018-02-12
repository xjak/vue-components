<template>
<div>
	<topTitle></topTitle>
	<picker :list="list" @callback="callback" :title="'请选择'" :tip="'选择'"></picker>
</div>
</template>

<script>
import topTitle from '../components/title'
import picker from '../components/picker'
export default {
	components: {
		topTitle,
		picker
	},
	data() {
		return {
			list: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
		}
	},
	methods: {
		callback(val) {
			console.log(val)
		}
	}
}
</script>

<style lang="less" scoped>

</style>