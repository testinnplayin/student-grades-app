'use strict';

// example for one button

function handleMoreClick() {
	$('.js-dropdown-btn-classes').click(function(e) {
		e.preventDefault();

		$('.js-actions-dropdown-classes').toggleClass('show');
	});

	window.onclick = function(e) {
		if (!e.target.matches('.js-dropdown-btn-classes')) {
			$('.js-actions-dropdown-classes').removeClass('show');
		}
	}
}

$(document).ready(handleMoreClick());
