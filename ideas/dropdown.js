'use strict';

// example for one button

function handleNavClick() {
	$('li').click(function(e) {
		e.preventDefault();

		$(this).find('.js-actions-dropdown-classes').toggleClass('show');
	});

	window.onclick = function(e) {
		if (!e.target.matches('.js-dropdown-btn-classes')) {
			$('.js-actions-dropdown-classes').removeClass('show');
		}
	}
}

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

function handleActions() {
	handleMoreClick();
	handleNavClick();
}

$(document).ready(handleActions());
