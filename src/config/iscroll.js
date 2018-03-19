/***
* @v1.0.0
* @el
***/

export default class Iscroll {
	constructor(el) {
		this.el = el
		this.h = document.documentElement.clientHeight
		this._init()
	}

	_init() {
		if (!this.el) return console.error('id is not defined')
		this.el.style.height = this.h + 'px'
		this.el.style.overflow = 'hidden'
		this.scroll = this.el.children[0]
		this.scroll.style.transitionTimingFunction =  'cubic-bezier(0.1, 0.57, 0.1, 1)'
		this._addEvent()
	}

	_addEvent() {
		let stratY,
			moveY,
			endY = 0,
			time,
			h = this.scroll.offsetHeight - this.h
		this.el.addEventListener('touchstart', e => {
			e.preventDefault()
			time = Date.now()
			stratY = e.changedTouches[0].pageY
		}, false)

		this.el.addEventListener('touchmove', e => {
			moveY = e.changedTouches[0].pageY  - stratY + endY
			this.moveTo(moveY)
		}, false)

		this.el.addEventListener('touchend', e => {
			time = Date.now() - time
			let m = 0
			if (time < 300) {
				m = (Math.abs(endY - moveY) / time).toFixed(2)
				let mt = moveY < endY ? -m : m
				endY += mt * 1000
				m = Math.abs(m)
				m = m > 1 ? 1 : m
			} else {
				endY = moveY
			}
			if (endY >= 0 ) endY = 0
			if (endY < -h) endY = - h
			this.moveTo(endY, m)
		}, false)
		this._scrollBar()
		this._moveEnd()
		
	}

	moveTo(y, t) {
		this.scroll.style.transitionDuration = (t || 0) + 's'
		this.scroll.style.transform = 'translate3d(0,'+ y +'px,0)'
		this.scrollBar.style.opacity = 1
		this.scrollBar.style.top = Math.abs(y) / (this.scroll.offsetHeight - this.h) * (this.h - 15) + 'px'
		clearTimeout(this.timer)
	}

	_scrollBar() {
		let bar = document.createElement('span')
		bar.style.display = 'block'
		bar.style.position = 'absolute'
		bar.style.width = '7px'
		bar.style.height = '15px'
		bar.style.background = 'rgba(0,0,0,.5)'
		bar.style.right = '0'
		bar.style.top = '0'
		bar.style.transition = 'all .3s'
		bar.style.opacity = 0
		this.scrollBar = bar
		this.el.appendChild(bar)
	}

	_moveEnd() {
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
		})
		this.scrollBar.addEventListener(style, () => {
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.scrollBar.style.opacity = 0
			}, 500)
		})
	}

}