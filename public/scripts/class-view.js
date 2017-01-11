'use strict';

function drawTableHeaderRows(col, arrOrObj, row) {
	let lng = arrOrObj.length;

	for (let j = 0; j < lng; j++) {
		let tableItem = '<'+ col + '>' + arrOrObj[j] + '</' + col + '>';

		$(row).append(tableItem);
	}
}

function drawTableEditButton(rowId) {
	let editButton = '<a href="#" class="btn btn-info js-edit-student-btn">Edit Student</a>';

	return editButton;
}

function drawTableDeleteButton(rowId) {
	let deleteButton = '<button class="btn btn-danger js-delete-student-btn">Delete Student</button>';
	return deleteButton;
}

function drawTableBodyRows(data) {
	let classTable = '.js-class-table',
		objArr = data['key5'],
		lng = data['key5'].length;

	for (let i = 0; i < lng; i++) {
		let tbody = [],
			tr = '<tr id="student-'+ i +'"></tr>',
			tRow = '#student-' + i,
			tableItem = ('<td>' + objArr[i]['key5a'] + '</td><td>' + objArr[i]['key5b']['key5bii'] + ', ' + objArr[i]['key5b']['key5bi'] 
						+ '</td><td>' + calcStudentClassAve(objArr[i]) + '</td><td>' + drawTableEditButton(tRow) + '</td>'
						+ '<td>' + drawTableDeleteButton(tRow) + '</td>');
			
		$(classTable).find('tbody').append(tr);
			
		$(tRow).append(tableItem);
	}
}

function drawStudentTable() {
	let classTable = '.js-class-table',
		thead = 'thead',
		tableArr = ['Student ID Number', 'Student Name', 'Grade Average', 'Edit Student', 'Delete Student'],
		anotherFakeObj = {
			'key1': 'value1',
			'key2': 'value2',
			'key3': 'value3',
			'key4': 'value4',
			'key5': [
				{
					'key5a': 'value5a', 
					'key5b': {
						'key5bi': 'value5bi',
						'key5bii': 'value5bii'
					}, 
					'key5c': [
						{
							'key5ci': '4.26'	
						},
						{
							'key5cii': '5.58'
						},
						{
							'key5ciii': '6.7891'
						}
					]

				},
				{
					'key5a': 'value5d',
					'key5b': {
						'key5bi': 'value5ei',
						'key5bii': 'value5eii'
					},
					'key5c': [
						{
							'key5ci': '1'
						},
						{
							'key5cii': '2'
						},
						{
							'key5ciii': '3'
						}
					]

				}
			]
		};

	$(classTable)
	.append('<thead></thead>')
	.append('<tfoot></tfoot>')
	.append('<tbody></tbody>');

	$(classTable).find('thead').append('<tr></tr>');
	drawTableHeaderRows('th', tableArr, 'tr');
	drawTableBodyRows(anotherFakeObj);

}

function drawClassPanel() {
	let jsClassPanel = '.js-class-panel',
		jsPanelHeading = '.js-panel-heading',
		jsPanelBody = '.js-panel-body',
		div = 'div';
		// keys = Object.keys(data),

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

	let fakeObj = {'1': '1', '2': '2', '3': '3', '4': '4'},
		keys = Object.keys(fakeObj);

	for (let key of keys) {
		let para = '<p><strong>' + key + ':</strong> ' + fakeObj[key] + '</p>';

		$(jsPanelBody).append(para);
	}

	$(jsClassPanel)
	.append('<table></table>')
	.find('table')
	.addClass('table')
	.addClass('class-table')
	.addClass('js-class-table');

	drawStudentTable();
}

function renderClass() {
	let contentContainer = '.js-content-container',
		classView = '.class-view',
		jsClassView = '.js-class-view',
		div = 'div';

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

	drawClassPanel();

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
		// drawClassPanel(data);
	})
	.done(function(err) {
		console.error('unsuccessful call to server');
		console.error(err);
	});
}

function calcStudentClassAve(studentObj) {
	let studentGrades = studentObj['key5c'],
		sum = 0,
		gradeLng = studentGrades.length,
		average;

	for (let grade of studentGrades) {
		let keys = Object.keys(grade);
		for (let key of keys) {
			sum += parseFloat(grade[key]);
		}
	}

	let tempAverage = sum / gradeLng;
	tempAverage % 2 === 0 ? average = Math.floor(tempAverage * 1000) / 1000 : average = Math.round(tempAverage * 1000) / 1000; //normal scientific way of rounding numbers, good up to three significant figures

	console.log(average);
	return average;
}

function handleActions() {
	renderClass();
}

$(document).ready(handleActions());