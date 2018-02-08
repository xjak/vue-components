<template>
<div>
	<div class="keyboard-input" ref="input">
		{{frontValue}}<span class="keyboard-cursor" ref="cursor">|</span>{{backValue}}<span class="tip-text" :style="{color:tipColor}" v-if="!(frontValue||backValue)">{{tipText}}</span>
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
			tipColor: '#dcdcdc',
			frontValue: '',
			backValue: '',
			tipValue: '',
			closeKeyboard: null,
			showKeyboard: null,
			flag: 1
		}
	},
	props: ['title', 'length', 'initValue', 'show', 'hide'],
	watch: {
		initValue() {
			if (this.flag) this.frontValue = this.initValue + ''
		},
		show() {
			if (this.show) this.showKeyboard()
		},
		hide() {
			if (this.hide) this.closeKeyboard()
		}
	},
	methods: {
		getValue() {
			return this.frontValue + this.backValue
		},
		addEvent() {
			if (this.initValue) this.frontValue = this.initValue + ''
			let _this = this
			let input = this.$refs.input
			let cursor = this.$refs.cursor
			let keyboard = this.$refs.keyboard
			let content = this.$refs.keyboardContent
			let btnList = this.$refs.keyboard.querySelectorAll('li')
			let tip = this.$refs.tip
			let tipTime = null
			let cursorTime = null
			let tocuhTime = 0
			this.closeKeyboard = () => {
				content.style.transform = 'translateY(200px)'
				clearInterval(cursorTime)
				cursorTime = null
				setTimeout(() => {
					keyboard.style.display = 'none'
				}, 300)
				this.frontValue = this.getValue()
				this.backValue = ''
				cursor.style.opacity = 0
				this.$emit('blur', this.frontValue)
			}
			this.showKeyboard = () => {
				let inputs = document.querySelectorAll('input')
				for (let i = 0; i < inputs.length; i++) {
					inputs[i].blur()
				}
				// 自动滚动到可视区域
				let top = input.offsetTop
				let obj = input.offsetParent
				while (obj) {
					if (obj) top += obj.offsetTop
						obj = obj.offsetParent
				}
				top = top - document.body.scrollTop
				let wH = window.innerHeight - 260
				if (top > wH) {
					document.body.scrollTop = Math.abs(wH - top)
				}
				keyboard.style.display = 'block'
				setTimeout(() => {
					content.style.transform = 'translateY(0)'
				}, 10)
				cursorTime = setInterval(() => {
					if (window.getComputedStyle(cursor, null).opacity === '1') {
						cursor.style.opacity = 0
					} else {
						cursor.style.opacity = 1
					}
				}, 500)
				_this.$emit('focus', _this.getValue())
			}
			document.getElementById('app').addEventListener('click', this.closeKeyboard, false)
			content.addEventListener('touchend', (e) => {
				e.preventDefault()
			}, false)

			input.addEventListener('touchstart', (e) => {
				tocuhTime = Date.now()
				if (cursorTime) {
					let inputLeft = input.offsetLeft
					let inputObj = input.offsetParent
					while (inputObj) {
						if (inputObj) inputLeft += inputObj.offsetLeft
							inputObj = inputObj.offsetParent
					}
					let focusX = Math.round((e.targetTouches[0].clientX.toFixed(0) - 5 - inputLeft) / 10)
					let text = this.frontValue + this.backValue
					if (text) {
						this.frontValue = text.slice(0, focusX)
						this.backValue = text.slice(focusX)
					}
				}
			})
			input.addEventListener('touchend', (e) => {
				e.preventDefault()
				if ((Date.now() - tocuhTime < 300) && !cursorTime) {
					this.flag = 0
					this.showKeyboard()
				}
			}, false)
			let deleteTimeOut = null
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
					} else {
						// 持续删除
						deleteTimeOut = setTimeout(() => {
							let deleteValue = () => {
								_this.frontValue = _this.frontValue.slice(0, -1)
								if (deleteTimeOut) setTimeout(deleteValue, 70)
							}
							deleteValue()
						}, 300)
					}
				}, false)
				btnList[i].addEventListener('touchend', function (e) {
					e.preventDefault()
					clearTimeout(tipTime)
					clearTimeout(deleteTimeOut)
					deleteTimeOut = null
					tipTime = setTimeout(() => {
						tip.style.display = 'none'
					}, 300)
					switch (this.innerText) {
						case '×':
							_this.frontValue = _this.frontValue.slice(0, -1)
							break
						case 'Done':
							_this.closeKeyboard()
							break
						default:
							this.style.color = '#333'
							this.style.backgroundColor = '#fff'
							if (_this.length) {
								if ((_this.frontValue + _this.backValue).length < _this.length) _this.frontValue += this.innerText
							} else {
								_this.frontValue += this.innerText
							}
					}
					if (!/^[0-9a-zA-Z]+$/.test(_this.frontValue + _this.backValue)) {
						_this.frontValue = ''
						_this.backValue = ''
					}
					_this.$emit('change', _this.getValue())
				}, false)
			}
		}
	},
	mounted() {
		setTimeout(this.addEvent, 100)
	},
	beforeDestroy() {
		document.getElementById('app').removeEventListener('click', this.closeKeyboard)
	}
}
</script>

<style lang="less" scoped>
.keyboard-input{
	height: 100%;
	width: 100%;
	background: #fff;
	color: #333;
	position: relative;
	z-index: 99;
	letter-spacing: 0.5px;
	white-space: nowrap;
	.keyboard-cursor{
		opacity: 0;
		position: absolute;
		top: -1px;
		margin-left: -2px;
		color: #007aff;
	}
	img{
		margin: 9px;
		height: 18px;
	}
}
.keyboard{
	width: 100%;
	display: none;
	.keyboard-content{
		position: fixed;
		z-index: 999999;
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
