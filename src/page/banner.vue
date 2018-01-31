<template>
<div>
	<topTitle></topTitle>
	<banner :imgs="list"></banner>
</div>
</template>

<script>
import topTitle from '../components/title'
import banner from '../components/banner'
export default {
	components: {
		topTitle,
		banner
	},
	data() {
		return {
			list: [
				{
					url: require('../images/banner.png')
				},
				{
					url: require('../images/Certificate.png')
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>

</style>