'use strict';

// example for one button

function handleMoreClick() {
	$('.js-dropdown-btn-1').click(function(e) {
		e.preventDefault();

		$('.js-actions-dropdown-1').toggleClass('show');
	});

	window.onclick = function(e) {
		if (!e.target.matches('.js-dropdown-btn-1')) {
			$('.js-actions-dropdown-1').removeClass('show');
		}
	}
}

$(document).ready(handleMoreClick());