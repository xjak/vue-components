/**
* picker选择器
* v18.1.23
**/

// this 改变通过包装函数传递this改变指向
export default class Picker {
	constructor(opt) {
		this.opt = opt
		this.el = opt.el
		// this.scroll = this.el.querySelector('.picker-scroll')
		// this.list = this.scroll.querySelectorAll('li')
		this.nowIndex = 0
		this.time = 0
		this.startY = 0
		this.moveY = 0
		this.endY = 0
		this.selfY = 0
		this.index = 0
		this._init()
	}

	_init() {
		this._addEvent()
		// this._transitionEnd()
		// 初始索引
		if (this.opt.index) {
			this.index = this.opt.index
			this.selfY = this.opt.index * -36
			// this._scrollTo(0)
			// this._removeStyle()
		}
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
			let li = this.list[this.index].innerText
			this.opt.select(li)
			this._closeAnimation()
		}, false)

		let scrollList = this.el.querySelectorAll('.picker-scroll')
		for (let i = 0; i < scrollList.length; i++) {
			scrollList[i].index = i
			scrollList[i].addEventListener('touchstart', function(e) {
				console.log(this.index)
			})
		}

		let touch = this.el.querySelector('.wheel-hook')
		// touch.addEventListener('touchstart', (e) => {
		// 	e.preventDefault()
		// 	this.time = Date.now()
		// 	this.startY = e.touches[0].clientY
		// 	this._scrollTo(0, this.selfY)
		// }, false)

		// touch.addEventListener('touchmove', (e) => {
		// 	e.preventDefault()
		// 	this.moveY = e.touches[0].clientY - this.startY + this.selfY
		// 	this._scrollTo(0, this.moveY)
		// }, false)

		// touch.addEventListener('touchend', (e) => {
		// 	this.time = Date.now() - this.time
		// 	this.endY = e.changedTouches[0].clientY
		// 	this.selfY += (this.endY - this.startY)
		// 	let x = (Math.abs(this.endY - this.startY) / this.time).toFixed(2)
		// 	let mv = (this.endY - this.startY) < 0 ? -x : x
		// 	if (this.time < 300) {
		// 		this.selfY += mv * 400
		// 		mv = Math.abs(mv)
		// 		mv = mv > 1.4 ? 1.4 : mv
		// 	} else {
		// 		this.selfY += mv * 50
		// 		mv = 0.5
		// 	}
		// 	this._scrollTo(mv)
		// } ,false)
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

	// _scrollTo(t, m) {
	// 	let height = this.scroll.offsetHeight - 36
	// 	if (this.selfY < 0) {
	// 		this.selfY = this.selfY < -height ? -height : this.selfY 
	// 	} else {
	// 		this.selfY = this.selfY > 0 ? 0 : this.selfY 
	// 	}
	// 	this.index = Math.abs(Math.round(this.selfY / 36))
	// 	let move = m ? m : -this.index * 36
	// 	this.scroll.style.transitionTimingFunction =  'cubic-bezier(0.1, 0.57, 0.1, 1)'
	// 	this.scroll.style.transitionDuration = t + 's'
	// 	this.scroll.style.transform = 'translate3d(0,' + move + 'px,0)'
	// }

	_loadAnimation() {
		this.el.style.display = 'block'
		setTimeout(() => {
			// this.list[this.index].style.color = this.opt.color
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
		this.scroll.addEventListener(style, () => {
			this.scroll.style.transitionDuration = '0s'
			this.opt.scrollChange && this.opt.scrollChange(this.index)
		 	// this.opt.color && this._removeStyle()
		}, false)
	}

	_removeStyle() {
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].style.color) {
				this.list[i].style.color = ''
				break
			}
		}
		this.list[this.index].style.color = this.opt.color
	}
}











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
				me.time = Date.now()
				me.nowIndex = this.index
				me.index[this.index].startY = e.touches[0].clientY
			})

			this.scrollList[i].addEventListener('touchmove', function(e) {
				e.preventDefault()
				let moveY = e.touches[0].clientY - me.index[this.index].startY + me.index[this.index].selfY
				me._scrollTo(0, moveY)
			}, false)

			this.scrollList[i].addEventListener('touchend', function(e) {
				me.time = Date.now() - me.time
				let endY = e.changedTouches[0].clientY
				me.index[this.index].selfY += (endY - me.index[this.index].startY)
				let move = (Math.abs(endY - me.index[this.index].startY) / me.time).toFixed(2)
				let time = (endY - me.index[this.index].startY) < 0 ? -move : move
				if (me.time < 300) {
					me.index[this.index].selfY += time * 400
					time = Math.abs(time)
					time = time > 1.4 ? 1.4 : time
				} else {
					me.index[this.index].selfY += time * 50
					time = 0.5
				}
				me._scrollTo(time)
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

	_scrollTo(time, mo) {
		let index = this.scrollList[this.nowIndex]
		let nowIndex = this.index[this.nowIndex]
		let height = index.offsetHeight - 36
		if (nowIndex.selfY < 0) {
			nowIndex.selfY = nowIndex.selfY < -height ? -height : nowIndex.selfY 
		} else {
			nowIndex.selfY = nowIndex.selfY > 0 ? 0 : nowIndex.selfY 
		}
		nowIndex.index = Math.abs(Math.round(nowIndex.selfY / 36))
		let move = mo ? mo : - nowIndex.index * 36
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