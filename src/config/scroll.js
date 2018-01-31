/**
* picker选择器
* v18.1.23
**/

// this 改变通过包装函数传递this改变指向
export default class Picker {
	constructor(opt) {
		this.opt = opt
		this.el = opt.el
		this.nowIndex = 0
		this.time = 0
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
		this.el.addEventListener('touchmove', (e) => {
			e.preventDefault()
		}, false)

		this.el.querySelector('.picker-cancel').addEventListener('click', () => {
			this.el.style.display = 'none'
			this._closeAnimation()
		}, false)

		this.el.querySelector('.picker-confirm').addEventListener('click', () => {
			let arr = []
			for (let i = 0; i < this.scrollList.length; i++) {
				arr.push(this.scrollList[i].querySelectorAll('li')[this.index[i].index].innerText)
			}
			this.opt.select(arr)
			this._closeAnimation()
		}, false)

		this.scrollList = this.el.querySelectorAll('.picker-scroll')
		let interval = 0,
			startY = 0,
			endY = 0
		for (let i = 0; i < this.scrollList.length; i++) {
			this.index[i] = {
				startY: 0,
				selfY: 0,
				index: 0,
				pageY: 0
			}
			this.scrollList[i].index = i
			this.scrollList[i].addEventListener('touchstart', function(e) {
				e.preventDefault()
				interval = Date.now()
				me.nowIndex = this.index
				startY = e.touches[0].clientY
				endY = me.index[this.index].pageY
			})

			this.scrollList[i].addEventListener('touchmove', function(e) {
				e.preventDefault()
				me.index[this.index].pageY = e.touches[0].clientY - startY + endY
				me._scrollTo(0, me.index[this.index].pageY)
			}, false)

			this.scrollList[i].addEventListener('touchend', function(e) {
				e.preventDefault()
				interval = Date.now() - interval
				endY = me.index[this.index].pageY
				let move = (Math.abs(endY - startY) / interval).toFixed(2)
				let time = (endY - startY) < 0 ? -move : move
				if (interval < 300) {
					me.index[this.index].pageY += time * 400
					time = Math.abs(time)
					time = time > 1.4 ? 1.4 : time
				} else {
					me.index[this.index].pageY += time * 50
					time = 0.5
				}

				let height = me.scrollList[me.nowIndex].offsetHeight - 36
				let pageY = me.index[me.nowIndex].pageY
				if (pageY < 0) {
					pageY = pageY < -height ? -height : pageY
				} else {
					pageY = pageY > 0 ? 0 : pageY
				}
				me.index[me.nowIndex].index = Math.abs(Math.round(pageY / 36))
				let mo = - me.index[me.nowIndex].index * 36
				me._scrollTo(time, mo)
			} ,false)
		}
		this._initScroll()
	}
	
	// 初始索引
	_initScroll() {
		console.log(this.opt.index)
		if (this.opt.index) {
			for (let i = 0; i < this.scrollList.length; i++) {
				this.nowIndex = i
				this.index[i].index = this.opt.index[i]
				this.index[i].selfY = -this.opt.index[i] * 36
				this.scrollList[i].querySelectorAll('li')[this.opt.index[i]].style.color = this.opt.color
				this._scrollTo(0)
			}
		} else {
			for (let i = 0; i < this.scrollList.length; i++) {
				this.scrollList[i].querySelectorAll('li')[0].style.color = this.opt.color
			}
		}
		console.log(this.index)
	}

	show() {
		this.el.style.display = 'block'
		this._loadAnimation()
	}

	// 刷新
	refresh(title) {
		this.selfY = 0
		this._scrollTo(0)
		title && (this.el.querySelector('h2').innerText = title)
	}

	_scrollTo(time, move) {
		let index = this.scrollList[this.nowIndex]
		index.style.transitionTimingFunction =  'cubic-bezier(0.1, 0.57, 0.1, 1)'
		index.style.transitionDuration = time + 's'
		index.style.transform = 'translate3d(0,' + move + 'px,0)'
	}

	_loadAnimation() {
		this.el.style.display = 'block'
		setTimeout(() => {
			this.el.style.background = 'rgba(0,0,0,.5)'
			this.el.querySelector('.picker-panel').style.transform = 'translateY(0)'
		}, 30)
	}

	_closeAnimation() {
		this.el.style.display = 'none'
		this.el.style.background = 'rgba(0,0,0,0)'
		this.el.querySelector('.picker-panel').style.transform = 'translateY(200px)'
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
				me.opt.change && me.opt.change(this.index)
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
		list[this.index[index].index].style.color = this.opt.color
	}
}