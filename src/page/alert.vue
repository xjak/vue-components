<template>
<div>
	<topTitle></topTitle>
	<ul>
		<li>
			<button @click="alert()">alert</button>
		</li>
		<li>
			<button @click="alert1()">alert1</button>
		</li>
		<li>
			<button @click="alert2()">alert2</button>
		</li>
	</ul>
	<alert :data="alertData"></alert>
</div>
</template>

<script>
import topTitle from '../components/title'
import alert from '../components/alert'
export default {
	components: {
		topTitle,
		alert
	},
	data() {
		return {
			alertData: {
				status: 0,
				text: 'alert',
				left: '',
				lFn: () => { this.alertData.status = !this.alertData.status },
				rFn: () => { this.alertData.status = !this.alertData.status }
			}
		}
	},
	methods: {
		alert() {
			this.alertData.left = '取消'
			this.alertData.status = 1
			this.alertData.text = 'alert'
		},
		alert1() {
			this.alertData.left = 'false'
			this.alertData.status = 1
			this.alertData.text = 'alert1'
		},
		alert2() {
			this.alertData.left = '0'
			this.alertData.status = 1
			this.alertData.text = 'alert2'
		}
	}
}
</script>

<style lang="less" scoped>
ul li{
	margin: 20px;
	button{
		font-size: 15px;
		width: 60px;
		height: 30px;
	}
}
</style>