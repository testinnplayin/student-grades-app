'use strict';

function handleMoreClick() {
	$('.js-dropdown-btn').click(function(e) {
		e.preventDefault();

		$('.js-actions-dropdown').toggleClass('show');
	});

	window.onclick = function(e) {
		if (!e.target.matches('.js-dropdown-btn')) {
			$('.js-actions-dropdown').removeClass('show');
		}
	}
}

$(document).ready(handleMoreClick());