/***
* @jk-PhotosView 
* @v1.0.0
***/

(function(global) {
	'use strict'
	function PhotosView(opt) {
		this.list = opt.list
		this.index = opt.index || 0
		this.wH = document.documentElement.clientHeight
		this.wW = document.documentElement.clientWidth
		this._init()
	}
	PhotosView.prototype = {
		_init: function() {
			var _this = this
			this.view = document.createElement('div')
			this.view.id = 'photos-view'

			this.title = document.createElement('h2')
			this.title.className = 'photos-title'

			this.item = document.createElement('ul')
			this.item.className = 'photos-item'
			this.item.style.left = (this.wW - this.list.length * 20) / 2 + 'px'

			this.photo = document.createElement('ul')
			this.photo.className = 'photos-list'
			this.photo.style.width = this.list.length * 100 + '%'

			this.loading = document.createElement('img')
			this.loading.src = 'data:image/gif;base64,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'
			this.loading.className = 'photos-loading'

			var item = ''
			for (var i = 0; i < this.list.length; i++) {
				(function(i) {
					var li = document.createElement('li')
					li.style.width = 100 / _this.list.length + '%'
					li.style.height = _this.wH + 'px'
					var img = document.createElement('img')
					img.src = _this.list[i].url
					img.style.display = 'none'
					img.style.transform = 'translate3d(0,50px,0)'
					img.onload = function() {
						var h = _this.wW / (this.naturalWidth / this.naturalHeight)
						if (h < _this.wH) {
							this.style.transform = 'translate3d(0,' + (_this.wH - h) / 2 + 'px,0)'
						} else {
							this.style.transform = 'translate3d(0,0,0)'
						}
						this.style.display = 'block'
						if (i === _this.index) {
							_this.loading.style.display = 'none'
						}
					}
					item += '<li></li>'
					li.appendChild(img)
					_this.photo.appendChild(li)
				})(i)
			}
			this.item.innerHTML = item

			this.view.appendChild(this.title)
			this.view.appendChild(this.item)
			this.view.appendChild(this.loading)
			this.view.appendChild(this.photo)

			document.body.appendChild(this.view)

			this.imgList = this.photo.querySelectorAll('img')
			this.itemAll = this.item.querySelectorAll('li')
		
			this._addEvent()
		},

		_addEvent: function() {
			var _this = this
			var t = {
				time: 0,
				moveX: 0,
				startX1: 0,
				startX2: 0,
				startY1: 0,
				startY2: 0,
				zoom: 0,
				ratio: 0,
				previousIndex: 0,
				status: 0
			}

			var initImg = function() {
				var height = _this.wW / t.ratio
				t.img.style.width = _this.wW + 'px'
				t.img.style.height = height + 'px'
				t.img.style.transform = 'translate3d(0px,' + (_this.wH - height) / 2 + 'px,0)'
			}
			this.view.addEventListener('touchstart', function(e) {
				e.preventDefault()
				// e.stopPropagation()
				t.time = Date.now()
				t.flag = 1
				t.img = _this.imgList[_this.index]
				t.img.style.transitionDuration = '0s'
				_this.photo.style.transitionDuration = '0s'
				t.ratio = t.img.naturalWidth / t.img.naturalHeight
				t.w = t.img.width
				t.h = t.img.height
				t.startX1 = e.touches[0].pageX
				t.startY1 = e.touches[0].pageY
				t.length = e.touches.length
				t.change = 0
				if (t.length > 1) {
					t.startX2 = e.touches[1].pageX
					t.startY2 = e.touches[1].pageY
					// 可选缩放方式
					// t.initXY = Math.sqrt(Math.pow(t.startX2 - t.startX1, 2) + Math.pow(t.startY2 - t.startY1, 2)) / 2
				}
			}, false)

			this.view.addEventListener('touchmove', function(e) {
				e.preventDefault()
				// 触发兼容
				if (e.touches[0].pageX == t.startX1) return false
				t.flag = 0
				t.moveX = e.touches[0].pageX - t.startX1
				t.moveY = e.touches[0].pageY - t.startY1

				if (t.change) return false
				if (t.length > 1 && e.touches.length > 1) {
					t.zoom = 1
					var x1 = e.touches[0].pageX
					var x2 = e.touches[1].pageX
					var y1 = e.touches[0].pageY
					var y2 = e.touches[1].pageY
					var scale = ((Math.abs(x1 - x2) - Math.abs(t.startX1 - t.startX2)) + (Math.abs(y1 - y2) - Math.abs(t.startY1 - t.startY2))) / 2
					// var scale = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2 - t.initXY
					// 缩放限制
					var height = t.h + scale * 2
					if (height > 1500) {
						height = 1500
						return false
					}
					var width = t.w + scale * 2 * t.ratio
					if (width < _this.wW - 100) {
						width = _this.wW - 100
						return false
					}
					t.imgL = -(width - _this.wW) / 2
					t.imgT = -(height - _this.wH) / 2
					t.img.style.height = height + 'px'
					t.img.style.width = width + 'px'
					t.img.style.transform = 'translate3d(' + t.imgL + 'px,'+ t.imgT +'px,0)'
					if (width < _this.wW) {
						t.status = 2
					} else {
						t.status = 3
					}
				} else {
					if (t.zoom) {
						t.status = 4
						t.endL = t.moveX + t.imgL
						t.endT = t.moveY + t.imgT
						var left = t.endL
						var half = _this.wW / 2
						// 边界滑动
						if (t.endL > 0) {
							left = 0
							if (t.endL > half) {
								if (_this.index > 0) {
									t.previousIndex = _this.index
									_this.index--
									t.change = 1
									t.zoom = 0
								}
								_this.photo.style.transitionDuration = '0.4s'
							}
							_this._move(-_this.index * _this.wW + t.endL)
						}
						if (t.endL < _this.wW - t.img.width) {
							left = _this.wW - t.img.width
							if (t.endL < (_this.wW - t.img.width - half)) {
								if (_this.index < _this.list.length - 1) {
									t.previousIndex = _this.index
									_this.index++
									t.change = 1
									t.zoom = 0
								}
								_this.photo.style.transitionDuration = '0.4s'
							}
							_this._move(-_this.index * _this.wW + t.endL + t.img.width - _this.wW)
						}
						t.img.style.transform = 'translate3d(' + left + 'px,'+ t.endT +'px,0)'
					} else {
						t.status = 0
						_this._move(t.moveX + -_this.index * _this.wW)
					}
				}
			}, false)

			this.view.addEventListener('touchend', function(e) {
				e.preventDefault()
				t.time = Date.now() - t.time
				switch (t.status) {
					case 0:
						if (t.flag && t.time < 300) {
							_this.hide()
						} else {
							if (t.time < 300 || _this.wW / 2 < Math.abs(t.moveX)) {
								if (t.moveX > 0) {
									if (_this.index > 0) _this.index -= 1
								} else {
									if (_this.index < _this.list.length - 1) _this.index += 1
								}
							}
							_this.photo.style.transitionDuration = '0.4s'
							_this._move(-_this.index * _this.wW)
							_this._changeItem(_this.index)
						}
					break
					case 2:
						initImg()
						t.zoom = 0
						t.status = 0
					break
					case 3:
						if (t.flag && t.time < 300) {
							t.status = 0
							t.zoom = 0
							initImg()
						}
					break
					case 4:
						t.img.style.transitionDuration = '0.3s'
						t.imgL = t.endL
						t.imgT = t.endT
						// 左右限制
						if (t.imgL > 0) {
							t.imgL = 0
						} else {
							if (t.imgL < _this.wW - t.img.width ) t.imgL = _this.wW - t.img.width
						}
						// 上下限制
						if (t.img.height >= _this.wH) {
							if (t.imgT > 0) t.imgT = 0
							if (t.imgT < _this.wH - t.img.height) t.imgT = -t.img.height + _this.wH
						} else {
							t.imgT = (_this.wH - t.img.height) / 2
						}
						t.img.style.transform = 'translate3d(' + t.imgL + 'px,'+ t.imgT +'px,0)'
						_this.photo.style.transitionDuration = '0.4s'
						_this._move(-_this.index * _this.wW)
						if (t.change) {
							setTimeout(function() {
								t.status = 0
								t.img = _this.imgList[t.previousIndex]
								initImg()
								_this._changeItem(_this.index)
							}, 100)
						}
					break
				}
				//_this._move(-_this.index * _this.wW)
			}, false)
			this._changeItem(this.index)
			this._move(-this.index * this.wW)
		},

		_move: function(x) {
			this.photo.style.transform = 'translate3d(' + x + 'px,0,0)'
		},

		_changeItem: function(index) {
			if (this.imgList[this.index].style.display === 'none') {
				this.loading.style.display = 'block'
			} else {
				this.loading.style.display = 'none'
			}
			this.title.innerText = this.list[this.index].title
			for (var i = 0; i < this.itemAll.length; i++) {
				this.itemAll[i].classList.remove('photos-active')
			}
			this.itemAll[index].classList.add('photos-active')
		},

		show: function(index) {
			if (index || index == 0) {
				this.index = index
				this._move(-this.index * this.wW)
				this._changeItem(index)
			}
			this.view.style.display = 'block'
			return this
		},

		hide: function() {
			this.view.style.display = 'none'
		}
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = PhotosView
	} else if (typeof define === "function" && define.amd) {
		define(function(){return PhotosView})
	} else {
		global.PhotosView = PhotosView
	}

}(this))

