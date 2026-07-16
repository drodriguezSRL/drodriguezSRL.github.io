/*
	Fetches shared header/footer partials into [data-include] placeholders,
	then loads the rest of the page scripts in order so jQuery/main.js never
	run before the header/footer they depend on exist in the DOM.
*/
(function () {

	function loadPartials() {
		var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-include]'));
		return Promise.all(nodes.map(function (node) {
			return fetch(node.getAttribute('data-include'))
				.then(function (res) { return res.text(); })
				.then(function (html) { node.outerHTML = html; });
		}));
	}

	function loadScript(src) {
		return new Promise(function (resolve, reject) {
			var script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.body.appendChild(script);
		});
	}

	var scripts = [
		'/assets/js/jquery.min.js',
		'/assets/js/browser.min.js',
		'/assets/js/breakpoints.min.js',
		'/assets/js/util.js',
		'/assets/js/main.js'
	];

	loadPartials()
		.then(function () {
			return scripts.reduce(function (chain, src) {
				return chain.then(function () { return loadScript(src); });
			}, Promise.resolve());
		});

})();
