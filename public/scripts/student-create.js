'use strict';

function drawSmallerClassPanel(data) {
	let jsClassPanel = '.js-class-panel',
		jsPanelHeading = '.js-panel-heading',
		jsPanelBody = '.js-panel-body',
		div = 'div',
		keys = Object.keys(data),
		lng = keys.length;

	$(jsClassPanel).append('<div></div>')
	.children(div)
	.addClass('panel-heading')
	.addClass('js-panel-heading')
	.append('<h4></h4>');

	$(jsPanelHeading).find('h4').text('Class');

	$(jsClassPanel).append('<div></div>');

	$(jsClassPanel)
	.find('div:last-child')
	.addClass('panel-body')
	.addClass('js-panel-body');


	for (let i = 1; i < lng - 1; i++ ) {
		let key = keys[i], 
		para = '<p><strong>' + keys[i] + ':</strong> ' + data[key] + '</p>';

		$(jsPanelBody).append(para);
	}
}

function renderSmallerClass() {
	let contentContainer = '.js-content-container',
		classView = '.class-view',
		jsClassView = '.js-class-view',
		div = 'div',
		whichClass;

	$(contentContainer)
	.append("<div></div>")
	.find(div)
	.addClass('js-class-view');

	$(jsClassView)
	.append('<div></div>')
	.children(div)
	.addClass('panel')
	.addClass('panel-default')
	.addClass('class-panel')
	.addClass('js-class-panel');

	whichClass = getInfoFromUrl();

	retrieveKlass(whichClass);

}

function retrieveKlass(classIdFromUrl) {
	let addy = '/classes/view/class/' + classIdFromUrl;
	$.ajax({
		method: 'GET',
		url: addy,
		dataType: 'json'
	})
	.done((data) => {
		console.log('successful get from server');
		console.log(data);
		drawSmallerClassPanel(data);
	})
	.fail((err) => {
		console.error('unsuccessful get from server');
		console.error(err);
	});
}

function getInfoFromUrl() {
	let classIdFromUrl = window.location.href;
	classIdFromUrl = classIdFromUrl.split('/');
	classIdFromUrl = classIdFromUrl[classIdFromUrl.length - 3];

	return classIdFromUrl;
}

$(document).ready(renderSmallerClass());