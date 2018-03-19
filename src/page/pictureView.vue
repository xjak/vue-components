<template>
<div>
	<topTitle></topTitle>
	<ul>
		<li v-for="(i,index) in imgs" @click="look(index)">
			<img :src="i" style="width:50%">
		</li>
	</ul>
	<pictureView :data="pictureData" v-if="pictureData.display"></pictureView>
</div>
</template>

<script>
import topTitle from '../components/title'
import PhotosView from '../config/photosView.js'
const icon = require('../images/return-right.png')
const img = require('../images/banner.png')
const img1 = require('../images/Tree.png')
const img2 = require('../images/Certificate.png')
const img3 = require('../images/33.jpg')
const img4 = require('../images/44.jpg')
const img5 = require('../images/55.jpg')
const img6 = require('../images/66.jpg')
export default {
	components: {
		topTitle
	},
	data() {
		return {
			bes: icon,
			imgs: [img, img2, img],
			pictureData: {
				// index: 1,
				list: [
					{
						url: img,
						title: '发123票'
					},
					{
						url: img1,
						title: '大图'
					},
					{
						url: img3,
						title: '发票11'
					},
					{
						url: img4,
						title: 'eee票'
					},
					{
						url: img5,
						title: '票3'
					},
					{
						url: img6,
						title: 'zsd票'
					}
				]
			}
		}
	},
	methods: {
		look (index) {
			if (this.photos) {
				this.photos.show(index)
			} else {
				this.photos = new PhotosView(this.pictureData)
				this.photos.show()
			}
		}
	}
}
</script>

<style lang="less">
#photos-view{
	width: 100%;
	height: 100%; 
	background: #000;
	position: fixed;
	overflow: hidden;
	z-index: 9999;
	left: 0;
	top: 0;
	display: none;
	touch-action: manipulation;
	.photos-title{
		height: 40px;
		color: #fff;
		width: 100%;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		position: absolute;
		z-index: 9999;
	}
	.photos-item{
		position: absolute;
		z-index: 999;
		bottom: 30px;
		li{
			height: 10px;
			width: 10px;
			background: #999;
			margin: 5px;
			border-radius: 10px;
			float: left;
		}
		.photos-active{
			background: #fff
		}
	}
	.photos-loading{
		position: absolute;
		z-index: 99999;
		height: 30px;
		height: 30px;
		left: 50%;
		top: 50%;
		margin: -15px;
	}
	.photos-list{
		transition: all 0s;
		li{
			float: left;
			overflow: hidden;
			img{
				width: 100%;
				transition: transform 0s;
			}
		}
	}
}
</style>