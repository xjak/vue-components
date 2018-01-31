<template>
<div>
	<topTitle></topTitle>
	<ul>
		<li v-for="i in imgs" @click="look()">
			<img :src="i">
		</li>
	</ul>
	<pictureView :data="pictureData" v-if="pictureData.display"></pictureView>
</div>
</template>

<script>
import topTitle from '../components/title'
import pictureView from '../components/pictureView'
const icon = require('../images/return-right.png')
const img = require('../images/banner.png')
const img2 = require('../images/Certificate.png')
const img3 = require('../images/33.jpg')
const img4 = require('../images/44.jpg')
const img5 = require('../images/55.jpg')
const img6 = require('../images/66.jpg')
export default {
	components: {
		topTitle,
		pictureView
	},
	data() {
		return {
			bes: icon,
			imgs: [img, img2, img],
			pictureData: {
				index: 1,
				display: 0,
				close: () => { this.pictureData.display = 0 },
				list: [
					{
						url: img,
						title: '发票'
					},
					{
						url: img3,
						title: '发票'
					},
					{
						url: img4,
						title: '票'
					},
					{
						url: img5,
						title: '票'
					},
					{
						url: img6,
						title: '票'
					}
				]
			}
		}
	},
	methods: {
		look () {
			this.pictureData.display = 1
		}
	}
}
</script>

<style lang="less">
ul{
	li{
		img{
			width: 200px;
		}
	}
}
</style>