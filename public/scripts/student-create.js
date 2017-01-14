'use strict';

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
	})
	.fail((err) => {
		console.error('unsuccessful get from server');
		console.error(err);
	});
}

function handleCreateStudentClick() {
	let classIdFromUrl = window.location.href;
	classIdFromUrl = classIdFromUrl.split('/');
	classIdFromUrl = classIdFromUrl[classIdFromUrl.length - 3];
	retrieveKlass(classIdFromUrl);
}

$(document).ready(handleCreateStudentClick());