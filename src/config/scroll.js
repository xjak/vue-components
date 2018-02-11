/**
* picker选择器
* v18.1.23
**/

export default class Picker {
	constructor(opt) {
		this.opt = opt
		this.thisIndex = 0
		this.index = []
		this._init()
	}

	_init() {
		this._addEvent()
		this._transitionEnd()
	}

	_addEvent() {
		let me = this
		// 背景禁止滑动
		this.opt.el.addEventListener('touchmove', (e) => {
			e.preventDefault()
		}, false)
		this.scrollList = this.opt.el.querySelectorAll('.picker-scroll')
		this.opt.el.querySelector('.picker-cancel').addEventListener('click', () => {
			this._closeAnimation()
		}, false)

		this.opt.el.querySelector('.picker-confirm').addEventListener('click', () => {
			let arr = []
			for (let y = 0; y < this.scrollList.length; y++) {
				let text = this.scrollList[y].querySelectorAll('li')
				if (text[0]) arr.push(text[this.index[y].index].innerText)
			}
			this.opt.select(arr)
			this._closeAnimation()
		}, false)

		let timing = 0,
			startY = 0,
			endY = 0
		for (let i = 0; i < this.scrollList.length; i++) {
			this.index[i] = {
				index: 0,
				pageY: 0
			}
			this.scrollList[i].index = i
			this.scrollList[i].addEventListener('touchstart', function(e) {
				e.preventDefault()
				timing = Date.now()
				me.thisIndex = this.index
				startY = e.touches[0].clientY
				endY = me.index[this.index].pageY
			})

			this.scrollList[i].addEventListener('touchmove', function(e) {
				e.preventDefault()
				me.index[me.thisIndex].pageY = e.touches[0].clientY - startY + endY
				me._scrollTo(0, me.index[me.thisIndex].pageY)
			}, false)

			this.scrollList[i].addEventListener('touchend', function(e) {
				e.preventDefault()
				timing = Date.now() - timing
				let scroll = me.index[me.thisIndex]
				// 缓动时间
				let time = 0.5
				if (timing < 300) {
					let move = (Math.abs(endY - scroll.pageY) / timing).toFixed(2)
					time = scroll.pageY < endY ? -move : move
					scroll.pageY += time * 400
					time = Math.abs(time)
					time = time > 1.4 ? 1.4 : time
				}
				// 边界限制
				let height = me.scrollList[me.thisIndex].offsetHeight - 36
				if (scroll.pageY < 0) {
					if (scroll.pageY < -height) scroll.pageY =  -height
				} else {
					if (scroll.pageY > 0) scroll.pageY = 0
				}
				scroll.index = Math.abs(Math.round(scroll.pageY / 36))
				scroll.pageY = endY = -scroll.index * 36
				me._scrollTo(time, endY)
			} ,false)
		}
		this._initScroll()
	}
	
	// 初始化位置
	_initScroll() {
		if (this.opt.index) {
			for (let i = 0; i < this.scrollList.length; i++) {
				if (this.scrollList[i].querySelectorAll('li')[0]) {
					this.thisIndex = i
					this.index[i].index = this.opt.index[i]
					this.index[i].pageY = -this.opt.index[i] * 36
					this.scrollList[i].querySelectorAll('li')[this.opt.index[i]].style.color = this.opt.color
					this._scrollTo(0, this.index[i].pageY)
				}
			}
		} else {
			for (let i = 0; i < this.scrollList.length; i++) {
				let list = this.scrollList[i].querySelectorAll('li')
				if (list[0]) list[0].style.color = this.opt.color
			}
		}
	}

	show() {
		this.opt.el.style.display = 'block'
		this._loadAnimation()
	}

	// 刷新
	refresh(index) {
		this.scrollList = this.opt.el.querySelectorAll('.picker-scroll')
		this.thisIndex = index
		this.index[index].pageY = 0
		this.index[index].index = 0
		this._scrollTo(0.01, 0)
	}

	_scrollTo(time, move) {
		let index = this.scrollList[this.thisIndex]
		index.style.transitionTimingFunction =  'cubic-bezier(0.1, 0.57, 0.1, 1)'
		index.style.transitionDuration = time + 's'
		index.style.transform = 'translate3d(0,' + move + 'px,0)'
	}

	_loadAnimation() {
		this.opt.el.style.display = 'block'
		setTimeout(() => {
			this.opt.el.style.background = 'rgba(0,0,0,.5)'
			this.opt.el.querySelector('.picker-panel').style.transform = 'translateY(0)'
		}, 30)
	}

	_closeAnimation() {
		this.opt.el.style.background = 'rgba(0,0,0,0)'
		this.opt.el.querySelector('.picker-panel').style.transform = 'translateY(200px)'
		setTimeout(() => {
			this.opt.el.style.display = 'none'
		}, 400)
	}

	_transitionEnd() {
		let style = (() => {
			let style = document.documentElement.style,
			list = ['webkit', 'khtml', 'moz', 'ms', 'o']
			for (let i = 0; i < list.length; i++) {
				let a = list[i] + 'Transition'
				if (a in style) return list[i] + 'TransitionEnd'
			}
		})()
		let me = this
		for (let x = 0; x < this.scrollList.length; x++) {
			this.scrollList[x].addEventListener(style, function() {
				this.style.transitionDuration = '0s'
				me.opt.change && me.opt.change(this.index, me.index)
		 		me.opt.color && me._removeStyle(this.index)
		 	}, false)
		}
	}

	_removeStyle(index) {
		let list = this.scrollList[index].querySelectorAll('li')
		for (let i = 0; i < list.length; i++) {
			if (list[i].style.color) {
				list[i].style.color = ''
				break
			}
		}
		if (list[this.index[index].index]) list[this.index[index].index].style.color = this.opt.color
	}
}