'use strict';

var classData;

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

	$(close).html('<span aria-hidden="true">&times;</span>');
}

function showClassToEdit() {
	let mainContent = '.js-main-content',
		classInfo = '.class-info';

	$(mainContent).prepend('<div></div>');
	$(mainContent)
	.children('div')
	.first()
	.addClass('class-info')
	.append('<p></p>');

	$(classInfo)
	.find('p')
	.text('Class Name: ' + classData.className + ' Subject: ' + classData.subject + ' Grade Level: ' + classData.gradeLevel + ' Term: ' + classData.term);
}


function renderForm() {
	console.log(classData);
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
		// .attr('placeholder', 'Enter ' + item)
		.attr('value', classData[item])
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
		classData = data;
		renderForm();
		showClassToEdit();
	})
	.fail(function(err) {
		console.log('unsuccessful call to get class');
		console.error(err);
	});
}

function sendClass(klass) {
	$.ajax({
		method: 'PUT',
		data: klass,
		url: '/classes/' + classData.id,
		dataType: json
	})
	.done(function(data) {
		console.log('successful put to server');
		console.log(data);
		renderAlert('success');
	})
	.fail(function(err) {
		console.log('unsuccessful put to server');
		console.log(err);
		renderAlert('fail');
	});
}


function checkState(currentView) {
	if (currentView === 'editClass') {
		
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

function handleSubmit() {
	$('form').submit(function(e) {
		e.preventDefault();
		e.stopPropagation();

		var reqObj = {};
		let className,
			subject,
			gradeLevel,
			term;

		className = $('input[id="className"]').val();
		subject = $('input[id="subject"]').val();
		gradeLevel = $('input[id="gradeLevel"]').val();
		term = $('input[id="term"]').val();

		reqObj = {
			className : className,
			subject : subject,
			gradeLevel : gradeLevel,
			term : term
		};

		sendClass(reqObj);

		return false;
	});
}

function handleActions() {
	let currentView = 'editClass';
	handleEditOrDeleteClick();

	checkState(currentView);

	// handleSubmit();

}

$(document).ready(handleActions());