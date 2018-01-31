<template>
	<input type="file" @change="change($event.target)" name="image" accept="image/*" style="display:none">
</template>

<script>
import exif from '../config/exif.js'
export default {
	data() {
		return {
			Orientation: ''
		}
	},
	props: ['data'],
	watch: {
		'data.data.type'() {
			this.data.data.type = this.data.data.type
		}
	},
	methods: {
		change(file) {
			if (this.data.before) this.data.before()
			let _this = this
			exif.getData(file.files[0], function() {
                _this.Orientation = exif.getTag(this, 'Orientation')
            })
			let reader = new FileReader()
			reader.onload = (e) => {
				this.compress(e.target.result, file.files[0].name)
			}
			reader.readAsDataURL(file.files[0])
		},
		base64ToBlob(data) {
			let code = window.atob(data.split(',')[1])
			let aBuffer = new window.ArrayBuffer(code.length)
			let uBuffer = new window.Uint8Array(aBuffer)
			for (let i = 0; i < code.length; i++) {
				uBuffer[i] = code.charCodeAt(i) & 0xff
			}
			let blob = null
			try {
				blob = new Blob([uBuffer], {
					type: 'image/jpeg'
				})
			} catch (e) {
				window.BlobBuilder = window.BlobBuilder ||
					window.WebKitBlobBuilder ||
					window.MozBlobBuilder ||
					window.MSBlobBuilder
				if (e.name === 'TypeError' && window.BlobBuilder) {
					let bb = new window.BlobBuilder()
					bb.append(uBuffer.buffer)
					blob = bb.getBlob('image/jpeg')
				} else if (e.name === 'InvalidStateError') {
					blob = new Blob([aBuffer], {
						type: 'image/jpeg'
					})
				}
			}
			return blob
		},
		compress(blob, name) {
			let rate = 0.5
			let image = new Image()
			image.src = blob
			image.onload = () => {
				let w = image.width / 4
				let h = image.height / 4
				let canvas = document.createElement('canvas')
				let ctx = canvas.getContext('2d')
				canvas.width = w
				canvas.height = h
				if (this.Orientation && this.Orientation !== 1) {
					switch (this.Orientation) {
						case 6: // 旋转90度
							canvas.width = h
							canvas.height = w
							ctx.rotate(Math.PI / 2)
							ctx.drawImage(image, 0, -h, w, h)
							break
						case 3: // 旋转180度
							ctx.rotate(Math.PI)
							ctx.drawImage(image, -w, -h, w, h)
							break
						case 8: // 旋转-90度
							canvas.width = h
							canvas.height = w
							ctx.rotate(3 * Math.PI / 2)
							ctx.drawImage(image, -w, 0, w, h)
							break
					}
				} else {
					ctx.drawImage(image, 0, 0, w, h)
				}
				let img = canvas.toDataURL('image/jpeg', rate)
				this.upLoad(img, name)
			}
		},
		upLoad(file, name) {
			let from = new FormData()
			from.append(this.data.img, this.base64ToBlob(file))
			from.append(this.data.name, name)
			if (this.data.type) {
				from.append('type', name.substr(name.indexOf('.') + 1))
			}
			for (let i in this.data.data) {
				from.append(i, this.data.data[i])
			}
			this.axios.post(this.url + this.data.url, from)
				.then(r => {
					this.$emit('response', r.data, file)
				})
				.catch(r => {
					this.$emit('response', r.data)
				})
			return
		}
	}
}
</script>
