'use strict';

function renderAlerts(result, response) {
	var mainContent = '.js-main-content',
		alertSel = '.alert',
		alertStr = 'alert',
		closeSel = '.close',
		closeStr = 'close';

	$(mainContent).prepend('<div></div>');

	$('.js-main-content div')
	.first()
	.addClass(alertStr)
	.addClass('alert-dismissable')
	.text(response)
	.attr('role', alertStr);

	result === 'success' ? $(alertSel).addClass('alert-success') : $(alertSel).addClass('alert-warning');

	$(alertSel)
	.append('<button></button>');

	$(alertSel)
	.find('button')
	.addClass(closeStr)
	.attr('type', 'button')
	.attr('data-dismiss', alertStr)
	.attr('aria-label', closeStr);

	$(closeSel).append('<span></span>');

	$(closeSel).html('<span aria-hidden="true">&times;</span>');
}

function renderStudentCreateForm(data) {
	var form = 'form',
		arr = ['studentId', 'firstName', 'lastName'],
		button = 'button',
		panelBody = '.js-panel-body';

	$(panelBody).append('<h3>Add New Student</h3>');

	$(panelBody).append('<form></form>');

	for (let item in arr) {
		let jGrp = '.js-f-grp' + item;
		$(form).append('<div class="form-group js-f-grp-' + item + '"></div>');
		$(jGrp)
		.append('<label></label>')
		.append('<input />');
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

	$(form).append("<button>Add Student</button>");

	$(button)
	.attr('type', 'submit')
	.addClass('btn')
	.addClass('btn-danger')
	.attr('id', 'submit-btn');

	handleCreateStudentSubmit(data);

}

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

	renderStudentCreateForm(data);
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

function createStudent(requestObject, id) {
	$.ajax({
		method: 'POST',
		url: `/classes/${id}/student`,
		data: requestObject,
		dataType: 'json'
	})
	.done(() => {
		let result = 'success',
			response = 'Student successfully added to the class';
		console.log('student creation was successful');
		renderAlerts(result, response);
	})
	.fail(err => {
		let result = 'failure',
			response = 'There has been a problem adding the student to the class';
		console.error('student creation was unsuccessful');
		console.error(err);
	});
}

function getInfoFromUrl() {
	let classIdFromUrl = window.location.href;
	classIdFromUrl = classIdFromUrl.split('/');
	classIdFromUrl = classIdFromUrl[classIdFromUrl.length - 3];

	return classIdFromUrl;
}

function handleCreateStudentSubmit(data) {
	$('form').submit(e => {
		e.preventDefault();
		e.stopPropagation();

		let studentId,
			firstName,
			lastName,
			studentObj = {},
			requestObject = {},
			id,
			arr = [];

		studentId = $('input[id="studentId"]').val();
		firstName = $('input[id="firstName"]').val();
		lastName = $('input[id="lastName"]').val();

		console.log(studentId);

		studentObj = {
			studentid: studentId,
			name: {
				firstName: firstName,
				lastName: lastName
			},
			grades: []
		};

		console.log(studentObj);

		arr.push(studentObj);

		id = getInfoFromUrl();

		requestObject = {
			id: id,
			className: data.className,
			subject: data.subject,
			gradeLevel: data.gradeLevel,
			term: data.term,
			students: arr
		};

		createStudent(requestObject, id);

		return false;
	});
}

$(document).ready(renderSmallerClass());
