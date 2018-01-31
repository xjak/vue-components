<template>
<div>
	<topTitle></topTitle>
	<ul>
		<li class="clearfix">
			<p class="left">status: {{key}}</p>
			<div @click="key=!key" class="right">
				<slideSwitch :status="key"></slideSwitch>
			</div>
		</li>
		<li class="clearfix">
			<p class="left">status: {{key1}}</p>
			<div @click="key1=!key1"  class="right">
				<slideSwitch :status="key1" :bg="'red'"></slideSwitch>
			</div>
		</li>
		<li class="clearfix">
			<p class="left">status: {{key2}}</p>
			<div @click="key2=!key2" class="right">
				<slideSwitch :status="key2" :bg="'blue'"></slideSwitch>
			</div>
		</li>
		<li class="clearfix">
			<p class="left">status: {{key3}}</p>
			<div @click="key3=!key3" class="right">
				<slideSwitch :status="key3" :bg="'green'"></slideSwitch>
			</div>
		</li>
	</ul>
	
</div>
</template>

<script>
import topTitle from '../components/title'
import slideSwitch from '../components/switch'
export default {
	components: {
		topTitle,
		slideSwitch
	},
	data () {
		return {
			key: 0,
			key1: 0,
			key2: 0,
			key3: 0
		}
	}
}
</script>

<style lang="less" scoped>
ul li {
	p{
		margin-right: 90px;
		line-height: 25px;
		font-size: 16px;
	}
	padding: 10px 20px;
}
</style>