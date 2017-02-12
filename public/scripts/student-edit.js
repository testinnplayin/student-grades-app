'use strict';

// function renderAlerts(result, response) {
// 	var mainContent = '.js-main-content',
// 		alertSel = '.alert',
// 		alertStr = 'alert',
// 		closeSel = '.close',
// 		closeStr = 'close';

// 	$(mainContent).prepend('<div></div>');

// 	$('.js-main-content div')
// 	.first()
// 	.addClass(alertStr)
// 	.addClass('alert-dismissable')
// 	.text(response)
// 	.attr('role', alertStr);

// 	result === 'success' ? $(alertSel).addClass('alert-success') : $(alertSel).addClass('alert-warning');

// 	$(alertSel)
// 	.append('<button></button>');

// 	$(alertSel)
// 	.find('button')
// 	.addClass(closeStr)
// 	.attr('type', 'button')
// 	.attr('data-dismiss', alertStr)
// 	.attr('aria-label', closeStr);

// 	$(closeSel).append('<span></span>');

// 	$(closeSel).html('<span aria-hidden="true">&times;</span>');
// }


function renderStudentEditForm(data) {
	console.log('--=',data);
	var form = 'form',
		arr = ['studentId', 'firstName', 'lastName'],
		button = 'button',
		classPanel = '.js-class-panel',
		studentObj = findStudentObj(data);

	$(classPanel).append('<h3>Edit Student</h3>');

	$(classPanel).append('<form data-student-klass-id="'+studentObj['studentKlassId']+'"></form>');

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
		.attr('required');

		$(jsGrp)
		.find('#' + item + '')
		.addClass('form-control');
	}
console.log('xxx',studentObj);
	$('#studentId').attr('value', studentObj['studentId']);
	$('#firstName').attr('value', studentObj['name']['firstName']);
	$('#lastName').attr('value', studentObj['name']['lastName']);


	$(form).append('<button>Edit Student</button>');

	$(button)
	.attr('type', 'submit')
	.addClass('btn')
	.addClass('btn-danger')
	.attr('id', 'submit-btn');

	handleEditStudentSubmit(data);

}

function drawTableHeaderRows(col, arrOrObj, row) {
	let lng = arrOrObj.length;

	for (let j = 0; j < lng; j++) {
		let tableItem = '<'+ col + '>' + arrOrObj[j] + '</' + col + '>';

		$(row).append(tableItem);
	}
}

function drawTableBodyRows(data, whichClass) {
	console.log(data);
	let classTable = '.js-class-table',
		objArr = data['students'],
		lng = objArr.length,
		whichStudent = getInfoForStudent(),
		studentObj = {};

	$(classTable).find('tbody').append(`<tr id=${whichStudent}></tr>`);

	studentObj = findStudentObj(data);
			let tRow = `#${studentObj.studentId}`,
			tableItem = ('<td>' + studentObj.studentId + '</td><td>' + studentObj.name.lastName + ', ' + studentObj.name.firstName
							+ '</td>');

		$(tRow).append(tableItem);

}

function drawStudentPanel(data, whichClass) {
	let classTable = '.js-class-table',
		thead = 'thead',
		tableArr = ['Student ID Number', 'Student Name', 'Grade Average', 'Median Grade'];

	$(classTable)
	.append('<thead></thead>')
	.append('<tfoot></tfoot>')
	.append('<tbody></tbody>');

	$(classTable).find('thead').append('<tr></tr>');
	drawTableHeaderRows('th', tableArr, 'tr');
	drawTableBodyRows(data, whichClass);

}

function drawClassPanelWithStudent(data, whichClass) {
	let jsClassPanel = '.js-class-panel',
		jsPanelHeading = '.js-panel-heading',
		jsPanelBody = '.js-panel-body',
		div = 'div',
		keys = [];

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

	for (var k in data) {
	    if( data.hasOwnProperty(k) ) {
			keys.push(k)
	    }
	}
	console.log(keys, data);
	for (let i = 0; i < keys.length; i++ ) {
		let key = keys[i],
		para = '<p><strong>' + keys[i] + ':</strong> ' + data[key] + '</p>';

		$(jsPanelBody).append(para);
	}



	$(jsPanelBody).append('<p><strong>Class Average: </strong>Average</p>')
	.append('<p><strong>Class Median: </strong>class median</p>');

	$(jsClassPanel)
	.append('<table></table>')
	.find('table')
	.addClass('table')
	.addClass('class-table')
	.addClass('js-class-table');

	drawStudentPanel(data, whichClass);

	renderStudentEditForm(data);
}

function renderClassAndStudent() {
	let contentContainer = '.js-content-container',
		classView = '.class-view',
		jsClassView = '.js-class-view',
		div = 'div',
		data,
		whichClass,
		whichStudent;

	$(contentContainer).html('')
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

	whichClass = getInfoForClass();

	data = retrieveKlassInfo(whichClass);
}

function getInfoForClass() {
	let classIdFromUrl = window.location.href;
	classIdFromUrl = classIdFromUrl.split('/');
	classIdFromUrl = classIdFromUrl[classIdFromUrl.length - 4];

	return classIdFromUrl;
}

function getInfoForStudent() {
	let studentIdFromUrl = window.location.href;
	studentIdFromUrl = studentIdFromUrl.split('/');
	studentIdFromUrl = studentIdFromUrl[studentIdFromUrl.length - 2];

	return studentIdFromUrl;
}

function findStudentObj(data) {
	console.log('==-',data);
	let objArr = data.students,
		whichStudent = getInfoForStudent(),
		lng = objArr.length,
		studentObject = {};

	for (let i = 0; i < lng; i++) {
		if (objArr[i].studentId === whichStudent) {
			studentObject = objArr[i];
		}
	}

	return studentObject;
}

function retrieveKlassInfo(classIdFromUrl) {
	let addy = '/classes/view/class/' + classIdFromUrl;
	$.ajax({
		method: 'GET',
		url: addy,
		dataType: 'json'
	})
	.done((data) => {
		console.log('successful get from server');
		console.log(data);
		drawClassPanelWithStudent(data, classIdFromUrl);
	})
	.fail((err) => {
		console.error('unsuccessful get from server');
		console.error(err);
	});
}

function editStudent(requestObject, classId, id) {
	console.log('editing: ' ,requestObject, classId, id);

	let ajaxObj = {
		method: 'PUT',
		url: `/classes/${classId}/student/${id}`,
		data: requestObject,
		dataType: 'json'
	};
	console.log('ajaxObj',ajaxObj);

	$.ajax(ajaxObj)
	.done(() => {
		let result = 'success',
			response = 'Student successfully added to the class';
		console.log('student creation was successful:');
		console.info(result, response);
	})
	.fail(err => {
		let result = 'failure',
			response = 'There has been a problem adding the student to the class';
		console.error('student creation was unsuccessful');
		console.error(err);
	});
}

function handleEditStudentSubmit(data) {
	$('form').submit(e => {
		e.preventDefault();
		e.stopPropagation();

		let studentId,
			firstName,
			lastName,
			studentObj = {},
			requestObject = {},
			id = $(e.target).data('studentKlassId'),
			arr = [],
			classId = getInfoForClass();

		studentId = $('input[id="studentId"]').val();
		firstName = $('input[id="firstName"]').val();
		lastName = $('input[id="lastName"]').val();

		console.log(':',studentId,' / ',id);

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

		// id = getInfoFromUrl();

		requestObject = {
			id: id,
			className: data.className,
			subject: data.subject,
			gradeLevel: data.gradeLevel,
			term: data.term,
			students: arr
		};
		editStudent(requestObject, classId, id);

		return false;
	});
 }

$(document).ready(renderClassAndStudent);
