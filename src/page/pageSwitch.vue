<template>
<div>
	<topTitle></topTitle>
	<div id="page">
		<ul>
			<li class="page-1">
				<p class="animat1">1</p>
			</li>
			<li class="page-2">
				<p>22</p>
			</li>
			<li class="page-3">
				<p>333</p>
			</li>
			<li class="page-4">
				<p>4444</p>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import topTitle from '../components/title'
import PageSwitch from '../config/pageSwitch.js'
export default {
	components: {
		topTitle
	},
	data() {
		return {}
	},
	mounted() {
		let page = new PageSwitch({
			el: document.querySelector('#page'),
			indicator: true,
			// beforeChange: function(index) {
			// 	console.log('beforeChange', index)
			// },
			afterChange: function(index) {
				switch (index) {
					case 1:
						document.querySelector('.page-1').children[0].classList.add('animat1')
					break
					case 2:
						document.querySelector('.page-2').children[0].classList.add('animat2')
					break
					case 3:
						document.querySelector('.page-3').children[0].classList.add('animat3')
					break
					case 4:
						document.querySelectorAll('.page-4')[1].children[0].classList.add('animat4')
					break
				}
			}
		})
		console.log(page)
	}
}
</script>

<style lang="less" scoped>
#page{
	text-align: center;
	font-size: 30px;
	color: #fff;
	background: #999;
	z-index: 1;
	line-height: 300px;
	.page-1{
		background: #5e9;
	}
	.page-2{
		background: pink;
	}
	.page-3{
		background: #78f;
	}
	.page-4{
		background: #f97;
	}
}

.animat1{
	position: relative;
	animation: page1 1s;
}
.animat2{
	position: relative;
	animation: page2 1s;
}
.animat3{
	position: relative;
	animation: page3 1s;
}
.animat4{
	position: relative;
	animation: page4 1s;
}
@keyframes page1{
	0%{
		left: -500px
	}
	100%{
		left: 0%;
	}
}
@keyframes page2{
	0%{
		left: 500px
	}
	100%{
		left: 0%;
	}
}
@keyframes page3{
	0%{
		top: 500px
	}
	100%{
		top: 0%;
	}
}
@keyframes page4{
	0%{
		top: -300px;
	}
	100%{
		top: 0%;
	}
}
</style>