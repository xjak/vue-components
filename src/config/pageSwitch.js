/***
* pageSwitch v1.0.0
* el		 element
* loop  	 //循环
* indicator  指示器
* next		 下一页
* prev  	 上一页
***/

(function(global) {
	'use strict'
	var PageSwitch = function(opt) {
		this.el = opt.el
		this.beforeChange = opt.beforeChange || ''
		this.afterChange = opt.afterChange || ''
		this.indicator = opt.indicator || ''
		this.loop = 1
		this.index = opt.index || 1
		this._init()
	}

	PageSwitch.prototype = {
		_init: function() {
			this.wh =  document.documentElement.clientHeight
			this.wW = document.documentElement.clientWidth
			this.el.style.height = this.wh + 'px'
			this.el.style.width = this.wW + 'px'
			this.el.style.overflow = 'hidden'
			this.el.style.position = 'absolute'
			this.el.style.top = '0'
			var touch = this.el.children[0]
			touch.style.transitionProperty = 'all'

			var first = touch.children[0].cloneNode(true)
			var last = touch.children[touch.children.length-1].cloneNode(true)
			touch.insertBefore(last, touch.children[0])
			touch.appendChild(first)

			touch.style.height = this.wh * touch.children.length + 'px'
			for (var i = 0; i < touch.children.length; i++) {
				touch.children[i].style.height = this.wh + 'px'
				touch.children[i].style.width = this.wW + 'px'
			}
			this._addEvent()
		},

		_addEvent: function() {
			var _this = this,
			initY = 0,
			moveY = 0,
			endY = 0,
			time

			this.el.addEventListener('touchstart', function(e) {
				time = Date.now()
				initY = e.touches[0].pageY
			}, false)

			this.el.addEventListener('touchmove', function(e) {
				e.preventDefault()
				if (_this.flag) return false
					moveY = e.touches[0].pageY
				_this._moveTo(-(moveY - initY) + _this.index * _this.wh, 0)
			}, false)

			this.el.addEventListener('touchend', function(e) {
				if (_this.flag) return false
					time = Date.now() - time
				if (time < 300) {
					if (moveY > initY) {
						_this.index--
					} else {
						_this.index++
					}
				} else {
					if (Math.abs(moveY - initY) > _this.wh / 2) {
						if (moveY > initY) {
							_this.index--
						} else {
							_this.index++
						}
					}
				}
				_this._moveTo(_this.index * _this.wh, .6)
				_this.beforeChange && _this.beforeChange(_this.index)
				_this.flag = 1
			}, false)
			this._transitionEnd()
			this._moveTo(this.index * this.wh, 0)
			if (this.indicator) {
				this._indicator()
				this._indicatorChange()
			}
		},

		_moveTo: function(val, time) {
			this.el.children[0].style.transitionDuration = time + 's'
			this.el.children[0].style.transform = 'translate3d(0,' + -val + 'px,0)'
		},

		_indicator: function() {
			var list = document.createElement('ul')
			var size = this.el.children[0].children.length - 2
			list.id = 'page-item'
			list.style.position = 'absolute'
			list.style.right = '20px'
			list.style.top = '50%'
			list.style.marginTop = -size * 17 / 2 + 'px' 
			for (var i = 0; i < size; i++) {
				var li = document.createElement('li')
				li.style.height = '10px'
				li.style.width = '10px'
				li.style.background = '#fff'
				li.style.marginTop = '7px'
				li.style.borderRadius = '10px'
				list.appendChild(li)
			}
			this.el.appendChild(list)
		},

		_indicatorChange: function() {
			var items = this.el.querySelector('#page-item').children
			for (var i = 0; i < items.length; i++) {
				items[i].style.background = '#fff'
			}
			items[this.index - 1].style.background = '#888'
		},

		_transitionEnd() {
			let style = (() => {
				let style = document.documentElement.style,
				list = ['webkit', 'khtml', 'moz', 'ms', 'o']
				for (let i = 0; i < list.length; i++) {
					let a = list[i] + 'Transition'
					if (a in style) return list[i] + 'TransitionEnd'
				}
			})()
			var _this = this
			this.el.children[0].addEventListener(style, function() {
			_this.flag = 0
			if (_this.loop) {
				if (_this.index <= 0) {
					_this.index = _this.el.children[0].children.length - 2
					_this._moveTo(_this.index * _this.wh, 0)
				}
				if (_this.index >= _this.el.children[0].children.length - 1) {
					_this.index = 1
					_this._moveTo(_this.index * _this.wh, 0)
				}
			}
			_this.indicator && _this._indicatorChange()
			_this.afterChange && _this.afterChange(_this.index)
			}, false)
		},

		next: function() {
			this.index++
			this._moveTo(this.index * this.wh, .6)
		},

		prev: function() {
			this.index--
			this._moveTo(this.index * this.wh, .6)
		}
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = PageSwitch
	} else if (typeof define === "function" && define.amd) {
		define(function(){return PageSwitch})
	} else {
		global.PageSwitch = PageSwitch
	}
}(this))
>>>>>>> dev
