(function() {
	if (!window.document) { return; }
	var ajaxToken = (new RegExp('(?:^|; )' + encodeURIComponent('ajaxtoken') + '=([^;]*)').exec(document.cookie) || [null,null])[1];
	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			function getCookie(name) {
				var cookieValue = null;
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = window.$.trim(cookies[i]);
						if (cookie.substring(0, name.length + 1) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}

			// hack to figure out host
			var a = document.createElement('a');
			a.href = this.url;
			// The below check for !a.host is because IE for relative URLs i.e. (/my_fav_api)
			//	doesn't put anything in host which is a reasonable choice.
			if (!a.host || a.host == window.location.host) {
				xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
				xhr.setRequestHeader("X-PAGEUrl", window.location.href);
				xhr.setRequestHeader("X-AJAXToken", ajaxToken);
			}

		}
	});
	$(document).ajaxError(function(event, xhr, settings, exception) {
		// This handler doesn't catch ajax requests with `'global': false` param,
		// e.g. session pings and tests in session-initializer

		if (xhr.status == 403) {
			// effective deductions returns 403 when you lack the proper permissions
			// This is to avoid reloading the Zenefits Microsoft Teams tab on 403s.
			if (!/api\/effective_deduction/.test(settings.url) && !(window.location && window.location.pathname && window.location.pathname.indexOf('microsoft_teams') >= 0)) {
				window.location.reload(false);
			}
		}
	});


	// Polyfills
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				Fnop = function () {},
				fBound = function () {
				return fToBind.apply((this instanceof Fnop && oThis) ? this : oThis,
									aArgs.concat(Array.prototype.slice.call(arguments)));
				};

			Fnop.prototype = this.prototype;
			fBound.prototype = new Fnop();

			return fBound;
		};
	}

	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}

	if (!Number.isNaN) {
		(function (global) {
			var global_isNaN = global.isNaN;

			Object.defineProperty(Number, 'isNaN', {
				value: function isNaN(value) {
					return typeof value === 'number' && global_isNaN(value);
				},
				configurable: true,
				enumerable: false,
				writable: true
			});
		})(this);
	}

	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function(searchString, position) {
			var subjectString = this.toString();
			if (position === undefined || position > subjectString.length) {
				position = subjectString.length;
			}
			position -= searchString.length;
			var lastIndex = subjectString.indexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;
		};
	}
})();
