'use strict';

function renderClass() {
	let contentContainer = '.js-content-container',
		classView = '.class-view';

	$(contentContainer).append("<div></div>");

	$(contentContainer).find('div').addClass('class-view');

	$(classView).append('<h3></h3>');

	$(classView).find('h3').text('Class');
}

function getClassToView(klassId) {
	$.ajax({
		method: 'GET',
		url: '/classes/view/class/' + klassId,
		dataType: 'json'
	})
	.done(function(data) {
		console.log('successful call to server');
		console.log(data);
	})
	.done(function(err) {
		console.error('unsuccessful call to server');
		console.error(err);
	});
}

function handleActions() {
	renderClass();
}

$(document).ready(handleActions());