/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
		/*
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			}); */

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
	const header = document.getElementById('header');
	const menu = document.getElementById('header-menu');
	const toggleLink = header.querySelector('h1 a');
	const headerInner = header.querySelector('.inner');
	const h1s = header.querySelectorAll('h1');
	const bigH1 = (h1s.length > 1) ? h1s[1] : h1s[0];

	if (!menu || !toggleLink || !headerInner || !bigH1) return;

	// Position menu so it appears just below the large header h1 (keeps mobile behavior)
	function positionMenu() {
		const style = window.getComputedStyle(menu);
		if (style.position === 'absolute') {
			const innerRect = headerInner.getBoundingClientRect();
			const h1Rect = bigH1.getBoundingClientRect();
			// top relative to headerInner
			const gap = 8; // px gap between h1 and menu
			const top = Math.round(h1Rect.bottom - innerRect.top + gap);
			menu.style.top = top + 'px';
			// keep right defined by CSS (usually right: 4em). If needed, could compute horizontal offset here.
		} else {
			// mobile / relative flow: clear inline positioning
			menu.style.top = '';
		}
	}

	// Initial position and on resize
	positionMenu();
	window.addEventListener('resize', positionMenu);

	toggleLink.addEventListener('click', function (e) {
		e.preventDefault();
		const shown = menu.classList.toggle('visible');
		menu.setAttribute('aria-hidden', !shown);
		if (shown) positionMenu();
	});

	// Close menu when clicking a menu link (also allow anchor navigation)
	menu.addEventListener('click', function (e) {
		if (e.target.tagName === 'A') {
			menu.classList.remove('visible');
			menu.setAttribute('aria-hidden', 'true');
		}
	});

	// Close when clicking outside
	document.addEventListener('click', function (e) {
		if (!menu.contains(e.target) && !toggleLink.contains(e.target)) {
			if (menu.classList.contains('visible')) {
				menu.classList.remove('visible');
				menu.setAttribute('aria-hidden', 'true');
			}
		}
	});

	// Optional: close on ESC
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && menu.classList.contains('visible')) {
			menu.classList.remove('visible');
			menu.setAttribute('aria-hidden', 'true');
		}
	});
});