'use strict';

function drawTableRows(col, arrOrObj, row) {
	let lng = arrOrObj.length;

	for (let j = 0; j < lng; j++) {
		let tableItem = '<'+ col + '>' + arrOrObj[j] + '</' + col + '>';

		$(row).append(tableItem);
	}
}

function drawStudentTable() {
	let classTable = '.js-class-table',
		thead = 'thead',
		tableArr = ['Student ID Number', 'Student Name', 'Grade Average'],
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
							'key5ci': '4'	
						},
						{
							'key5cii': '5'
						},
						{
							'key5ciii': '6'
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
		},
		lng = anotherFakeObj['key5'].length;

	$(classTable)
	.append('<thead></thead>')
	.append('<tfoot></tfoot>')
	.append('<tbody></tbody>');

	$(classTable).find('thead').append('<tr></tr>');
	drawTableRows('th', tableArr, 'tr');

	for (let i = 0; i < lng; i++) {
		let tbody = [],
			objArr = anotherFakeObj['key5'],
			tr = '<tr id="student-'+ i +'"></tr>',
			td = 'td',
			tableItem = '<td>' + objArr[i]['key5a'] + '</td><td>' + objArr[i]['key5b']['key5bii'] + ', ' + objArr[i]['key5b']['key5bi'] + '</td><td>' + calcStudentClassAve(objArr[i]) + '</td>',
			tRow = '#student-' + i;
			
		$(classTable).find('tbody').append(tr);
			
		$(tRow).append(tableItem);
	}

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
			sum += parseInt(grade[key]);
		}
	}

	console.log(sum);
	average = sum / gradeLng;
	console.log(average);
	return average;
}

function handleActions() {
	renderClass();
}

$(document).ready(handleActions());