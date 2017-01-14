'use strict';

function renderStudentCreateForm() {
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

	handleCreateStudentSubmit();

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

	renderStudentCreateForm();
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

function handleCreateStudentSubmit() {
	$('form').submit(e => {
		e.preventDefault();
		e.stopPropagation();

		let studentId,
			firstName, 
			lastName,
			studentObj = {},
			reqObj = {},
			classId,
			arr = [];

		studentId = $('input[id="studentId"]').val();
		firstName = $('input[id="firstName"]').val();
		lastName = $('input[id="lastName"]').val();

		classId = getInfoFromUrl();

		studentObj = {
			studentId: studentId,
			name: {
				firstName: firstName,
				lastName: lastName
			},
			grades: []
		}

		arr.push(studentObj);

		reqObj = {
			id : classId,
			students : arr
		};

		console.log(reqObj.students);

		return false;
	});
}

$(document).ready(renderSmallerClass());