var api = {
	http: new XMLHttpRequest(),
	fn: function(fn) {
		var _this = this
		this.http.onreadystatechange = function() {
			if (_this.http.readyState == 4 && _this.http.status == 200) {
				fn(_this.http.responseText);
			}
		}
	},
	post: function(u, d, fn) {
		this.fn(fn)
		this.http.open("POST", u, true);
		this.http.setRequestHeader('contentType', 'application/json');
		this.http.send(d);
	},
	get: function(u, fn) {
		this.fn(fn)
		this.http.open("GET", u, true);
		this.http.send(null);
	}
}
export default api