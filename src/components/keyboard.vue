<template>
<div>
	<div class="keyboard-input" ref="input">
		<span class="tip-text" :style="{color:tipColor}">{{tipText}}</span>{{value}}<span class="keyboard-cursor" ref="cursor">|</span>
	</div>
	<div class="keyboard" ref="keyboard">
		<div class="keyboard-content" ref="keyboardContent">
			<span class="keyboard-tip" ref="tip">{{tipValue}}</span>
			<ul class="clearfix">
				<li class="left">1</li>
				<li class="left">2</li>
				<li class="left">3</li>
				<li class="left">4</li>
				<li class="left">5</li>
				<li class="left">6</li>
				<li class="left">7</li>
				<li class="left">8</li>
				<li class="left">9</li>
				<li class="left">0</li>
				<li class="left">Q</li>
				<li class="left">W</li>
				<li class="left">E</li>
				<li class="left">R</li>
				<li class="left">T</li>
				<li class="left">Y</li>
				<li class="left">U</li>
				<li class="left">I</li>
				<li class="left">O</li>
				<li class="left">P</li>
			</ul>
			<ul class="clearfix keyboard-list-3">
				<li class="left">A</li>
				<li class="left">S</li>
				<li class="left">D</li>
				<li class="left">F</li>
				<li class="left">G</li>
				<li class="left">H</li>
				<li class="left">J</li>
				<li class="left">K</li>
				<li class="left">L</li>
				<li class="left delete">×</li>
			</ul>
			<ul class="clearfix keyboard-list-4">
				<li class="left">Z</li>
				<li class="left">X</li>
				<li class="left">C</li>
				<li class="left">V</li>
				<li class="left">B</li>
				<li class="left">N</li>
				<li class="left">M</li>
				<li class="left done">Done</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			tipText: this.title,
			tipColor: '#ccc',
			value: '',
			tipValue: ''
		}
	},
	props: ['title'],
	mounted() {
		let _this = this
		let input = this.$refs.input
		let cursor = this.$refs.cursor
		let keyboard = this.$refs.keyboard
		let content = this.$refs.keyboardContent
		let btnList = this.$refs.keyboard.querySelectorAll('li')
		let tip = this.$refs.tip
		let tipTime = null
		let cursorTime = null
		let closeKeyboard = () => {
			content.style.transform = 'translateY(200px)'
			clearInterval(cursorTime)
			setTimeout(() => {
				keyboard.style.display = 'none'
			}, 300)
			cursor.style.opacity = 0
			this.tipText = this.value === '' ? this.title : ''
			this.$emit('change', this.value)
		}
		keyboard.addEventListener('click', closeKeyboard, false)
		content.addEventListener('touchend', (e) => {
			e.preventDefault()
		}, false)
		input.addEventListener('click', () => {
			keyboard.style.display = 'block'
			setTimeout(() => {
				content.style.transform = 'translateY(0)'
			}, 10)
			clearInterval(cursorTime)
			cursorTime = setInterval(() => {
				if (window.getComputedStyle(cursor, null).opacity === '1') {
					cursor.style.opacity = 0
				} else {
					cursor.style.opacity = 1
				}
			}, 500)
			if (cursorTime) _this.tipText = ''
		}, false)
		for (let i = 0; i < btnList.length; i++) {
			btnList[i].addEventListener('touchstart', function (e) {
				e.preventDefault()
				if (this.innerText === 'Done') return
				let x = this.offsetLeft
				let y = this.offsetTop - 45
				_this.tipValue = this.innerText
				tip.style.transform = 'translate(' + x + 'px,' + y + 'px)'
				tip.style.display = 'block'
				if (this.innerText !== '×') {
					this.style.color = '#fff'
					this.style.backgroundColor = '#aaa'
				}
			}, false)
			btnList[i].addEventListener('touchend', function (e) {
				e.preventDefault()
				clearTimeout(tipTime)
				tipTime = setTimeout(() => {
					tip.style.display = 'none'
				}, 300)
				switch (this.innerText) {
					case '×':
						_this.value = _this.value.slice(0, -1)
					break
					case 'Done':
						closeKeyboard()
					break
					default:
						_this.value += this.innerText
						this.style.color = '#333'
						this.style.backgroundColor = '#fff'
				}
			}, false)
		}
	}
}
</script>

<style lang="less" scoped>
.keyboard-input{
	height: 22px;
	width: 100%;
	background: #fff;
	font-size: 14px;
	line-height: 22px;
	padding-left: 3px;
	color: #333;
	.keyboard-cursor{
		opacity: 0;
		position: relative;
		top: -1px;
		color: #007aff;
		font-weight: bold;
	}
}
.keyboard{
	position: absolute;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	display: none;
	.keyboard-content{
		position: absolute;
		height: 200px;
		width: 100%;
		bottom: 0;
		left: 0;
		background: #e9eaed;
		font-size: 16px;
		font-family: 'PingFang SC', 'Arial', 'Verdana';
		padding:2px 1%;
		transition: all .3s;
		transform: translateY(200px);
		ul{
			li{
				height: 40px;
				width: 9%;
				border-bottom: 1px solid #a9b3bf;
				line-height: 39px;
				text-align: center;
				border-radius: 4px;
				margin: 4px 0.5%;
				background: #fff;
			}
		}
		.keyboard-list-3{
			padding-left: 3px;
			li{
				width: 8.5%;
			}
			.delete{
				background: #a9b3bf url('../images/delete-bg.png') no-repeat 6px 13px;
				background-size: 25px;
				width: 42px;
			}
		}
		.keyboard-list-4{
			padding-left: 10px;
			.done{
				background: #007aff;
				color: #fff;
				width: 87px;
				border-color: #007aff;
			}
		}
		.keyboard-tip{
			display: none;
			transition: all .2s;
			position: absolute;
			left: 0;
			top: 0;
			width: 30px;
			height: 40px;
			border-radius: 4px;
			background: #007aff;
			color: #fff;
			line-height: 45px;
			font-size: 18px;
			text-align: center;
		}
		.keyboard-tip:after{
			content: "";
			display: block;
			position: relative;
			left: 10px;
			top: -5px;
			width: 0px;
			border: 5px solid transparent;
    		border-top: 8px solid #007aff;
		}
	}
}
</style>