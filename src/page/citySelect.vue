<template>
<div>
	<topTitle></topTitle>
	<citySelect :title="'城市选择'"></citySelect>
</div>
</template>

<script>
import topTitle from '../components/title'
import citySelect from '../components/citySelect'
export default {
	components: {
		topTitle,
		citySelect
	}
}
</script>

<style lang="less" scoped>

</style>