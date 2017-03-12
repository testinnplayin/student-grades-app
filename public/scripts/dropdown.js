'use strict';

// example for one button

function handleMoreClick() {
	let arr = ['classes', 'students'];

	arr.forEach(function(item) {
		$('.js-dropdown-btn-' + item).click(function(e) {
			e.preventDefault();

			$('.js-actions-dropdown-' + item).toggleClass('show');
		});

		window.onclick = function(e) {
			if (!e.target.matches('.js-dropdown-btn-' + item)) {
				$('.js-actions-dropdown-' + item).removeClass('show');
			}
		}
	});
}

$(document).ready(handleMoreClick());
