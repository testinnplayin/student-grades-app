'use strict';

function renderAlert(result, response) {
	var mainContent = '.js-main-content',
		alert = '.alert',
		close = '.close';

	$(mainContent).prepend('<div></div>');

	$('.js-main-content div')
	.first()
	.addClass('alert')
	.addClass('alert-dismissable')
	.text(response)
	.attr('role', 'alert');

	result === 'success' ? $(alert).addClass('alert-success') : $(alert).addClass('alert-warning');

	$(alert)
	.append('<button></button>');

	$(alert)
	.find('button')
	.addClass('close')
	.attr('type', 'button')
	.attr('data-dismiss', 'alert')
	.attr('aria-label', 'close');

	$(close).append('<span></span>');

	$(close)
	.find('span')
	.attr('aria-hidden', 'true')
	.text('&times;');
}

function showClassToEdit(klass) {
	let contentContainer = '.js-content-container',
		classInfo = 'class-info';

	$(contentContainer).append('<div></div>');
	$(contentContainer)
	.find('div')
	.addClass('class-info')
	.append('<p></p>');

	$(classInfo)
	.find('p')
	.text('Class Name: ' + klass.className + ' Subject: ' + klass.subject + ' Grade Level: ' + klass.gradeLevel + ' Term: ' + klass.term);
}


function renderForm() {
	var form = 'form',
		arr = ['className', 'subject', 'gradeLevel', 'term'],
		button = 'button',
		contentContainer = '.js-content-container';

	$(contentContainer).append('<h3>Edit Class</h3>');//change from create, note that title also has to change

	$(contentContainer).append('<form></form>');

	for (let item in arr) {
		$(form).append('<div class="form-group js-f-grp-' + item + '"></div>');
	}
	
	for (let i = 0; i < arr.length; i++) {
		let jsGrp = '.js-f-grp-' + i,
			item = arr[i];

		$(jsGrp)
		.append("<label></label>")
		.append("<input />");

		$(jsGrp)
		.find('label')
		.attr('for', item)
		.text(item + ':');

		$(jsGrp)
		.find('input')
		.attr('id', item)
		.attr('type', 'text')
		.attr('placeholder', 'Enter ' + item)
		.attr('required');

		$(jsGrp)
		.find('#' + item + '')
		.addClass('form-control');
	}
	
	$(form).append("<button>Edit Class</button>");

	$(button)
	.attr('type', 'submit')
	.addClass('btn')
	.addClass('btn-warning')
	.attr('id', 'submit-btn');

}

function getKlass(klassID) {
	var url = '/classes/' + klassID;
	console.log('url is ' + url);

	$.getJSON(url)
	.done(function(data) {
		console.log('successful call to get class');
		console.log(data);
	})
	.fail(function(err) {
		console.log('unsuccessful call to get class');
		console.error(err);
	});
}


function checkState(currentView) {
	if (currentView === 'editClass') {
		renderForm();
	}
}

function handleEditOrDeleteClick() {
	var classID;

	classID = window.location.href;
	classID = classID.split('/');
	classID = classID[classID.length - 1];
	console.log(classID);

	getKlass(classID);
}

// function handleSubmit() {
// 	$('form').submit(function(e) {
// 		e.preventDefault();
// 		e.stopPropagation();

// 		var reqObj = {};
// 		let className,
// 			subject,
// 			gradeLevel,
// 			term;

// 		className = $('input[id="className"]').val();
// 		subject = $('input[id="subject"]').val();
// 		gradeLevel = $('input[id="gradeLevel"]').val();
// 		term = $('input[id="term"]').val();

// 		reqObj = {
// 			className : className,
// 			subject : subject,
// 			gradeLevel : gradeLevel,
// 			term : term
// 		};

// 		sendClass(reqObj);

// 		return false;
// 	});
// }

function handleActions() {
	let currentView = 'editClass';

	handleEditOrDeleteClick();

	checkState(currentView);
	// handleSubmit();

}

$(document).ready(handleActions());