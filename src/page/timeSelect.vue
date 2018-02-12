<template>
<div>
	<topTitle></topTitle>
	<timeSelect @callback="callback" :title="'请选择日期'"></timeSelect>
</div>
</template>

<script>
import topTitle from '../components/title'
import timeSelect from '../components/timeSelect'
export default {
	components: {
		topTitle,
		timeSelect
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