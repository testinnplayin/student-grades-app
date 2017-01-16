'use strict';

function drawTableHeaderRows(col, arrOrObj, row) {
	let lng = arrOrObj.length;

	for (let j = 0; j < lng; j++) {
		let tableItem = '<'+ col + '>' + arrOrObj[j] + '</' + col + '>';

		$(row).append(tableItem);
	}
}

function drawTableEditButton(rowId, whichClass, studentObj) {
	let editButton = `<a href="/classes/class/${whichClass}/student/${studentObj.studentId}/edit" class="btn btn-info js-edit-student-btn">Edit Student</a>`;

	return editButton;
}

function drawTableDeleteButton(rowId) {
	let deleteButton = '<button class="btn btn-danger js-delete-student-btn">Delete Student</button>';
	return deleteButton;
}

function drawStudentCreateButton(whichClass) {
	let titleStuff = '.js-title-stuff';

	$(titleStuff).append('<a></a>');
	$(titleStuff)
	.find('a')
	.attr('href', `/classes/class/${whichClass}/student/create`)
	.addClass('btn')
	.addClass('btn-danger')
	.addClass('create-student-btn')
	.addClass('js-create-student-btn')
	.text('Add a New Student');
}

function drawTableBodyRows(data, whichClass) {
	let classTable = '.js-class-table',
		objArr = data['students'],
		lng = objArr.length;

	for (let i = 0; i < lng; i++) {
		let stats = calcStudentStats(objArr[i]),
			average = stats[0],
			median = stats[1],
			tr = '<tr id="student-'+ i +'"></tr>',
			tRow = '#student-' + i,
			tableItem = ('<td>' + objArr[i]['studentId'] + '</td><td>' + objArr[i]['name']['lastName'] + ', ' + objArr[i]['name']['firstName'] 
						+ '</td><td>' + average + '</td><td>' + median + '</td><td>'
						+ drawTableEditButton(tRow, whichClass, objArr[i]) + '</td>'
						+ '<td>' + drawTableDeleteButton(tRow) + '</td>');
			
		$(classTable).find('tbody').append(tr);
			
		$(tRow).append(tableItem);
	}
}

function drawStudentTable(data, whichClass) {
	let classTable = '.js-class-table',
		thead = 'thead',
		tableArr = ['Student ID Number', 'Student Name', 'Grade Average', 'Median Grade', 'Edit Student', 'Delete Student'];

	$(classTable)
	.append('<thead></thead>')
	.append('<tfoot></tfoot>')
	.append('<tbody></tbody>');

	$(classTable).find('thead').append('<tr></tr>');
	drawTableHeaderRows('th', tableArr, 'tr');
	drawTableBodyRows(data, whichClass);

}

function drawClassPanel(data, whichClass) {
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

	$(jsPanelBody).append('<p><strong>Class Average: </strong>Average</p>')
	.append('<p><strong>Class Median: </strong>class median</p>');

	$(jsClassPanel)
	.append('<table></table>')
	.find('table')
	.addClass('table')
	.addClass('class-table')
	.addClass('js-class-table');

	drawStudentTable(data, whichClass);
}

function renderClass() {
	let contentContainer = '.js-content-container',
		classView = '.class-view',
		jsClassView = '.js-class-view',
		div = 'div',
		whichClass;

	whichClass = findClassInUrl();
	drawStudentCreateButton(whichClass);

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
	
	getClassToView(whichClass);

}

function getClassToView(whichClass) {
	$.ajax({
		method: 'GET',
		url: '/classes/view/class/' + whichClass,
		dataType: 'json'
	})
	.done(function(data) {
		console.log('successful call to server');
		console.log(data);
		drawClassPanel(data, whichClass);
	})
	.fail(function(err) {
		console.error('unsuccessful call to server');
		console.error(err);
	});
}

function findClassInUrl() {
	let whichClass = window.location.href;
	whichClass = whichClass.split('/');
	whichClass = whichClass[whichClass.length - 1];

	return whichClass;
}

function roundNums(num) {
	let numArr = num.toString().split(''),
		deciPnt = numArr.indexOf('.'),
		deciPlaces = numArr.slice(deciPnt, numArr.length),
		lng = deciPlaces.length,
		lastPlc = deciPlaces[lng - 1],
		thirdDeciPlc = deciPlaces[3],
		newNum;

	if (lastPlc <= 5 && thirdDeciPlc % 2 === 0) {
	  newNum = Math.floor(num * 1000) / 1000;
	} else {
	  newNum = Math.round(num * 1000) / 1000;
	}

	return newNum;		
}

function calcStudentClassAverage(studentGrades) {
	let sum = 0,
		gradeLng = studentGrades.length,
		average,
		median,
		valArr = [],
		stats = [],
		tempAverage;

	for (let singleGrade of studentGrades) {
		let keys = Object.keys(singleGrade);
		let parsedGrade = parseFloat(singleGrade['grade']);
		sum += parsedGrade;
		valArr.push(parsedGrade);
	}

	tempAverage = sum / gradeLng;
	median = calcStudentClassMed(valArr);

	average = roundNums(tempAverage);

	stats.push(average);
	stats.push(median);

	return stats;
}

function calcStudentClassMed(gradeArr) {
	let median,
		lng = gradeArr.length,
		halfWay,
		newGradeArr = [];

	for (let grade of gradeArr) {
		newGradeArr.push(grade);
	}

	let sortedGrades = newGradeArr.sort((a, b) => a - b);

	((lng / 2) === 0.5) 
		? halfWay = Math.round(lng / 2) 
		: halfWay = Math.floor(lng / 2);

	if (lng % 2 === 0) {
		let firstHalf,
			secondHalf,
			minGrade,
			maxGrade;

		firstHalf = sortedGrades.slice(0, halfWay);
		secondHalf = sortedGrades.slice(halfWay, lng);
		minGrade = Math.min.apply(null, secondHalf);
		maxGrade = Math.max.apply(null, firstHalf);
		median = roundNums((minGrade + maxGrade) / 2);

		return median
	} else {
		median = roundNums(sortedGrades[halfWay]);

		return median;
	}
}

function calcStudentStats(studentObj) {
	let studentGrades = studentObj['grades'],
		stats = [];

	stats = calcStudentClassAverage(studentGrades);

	return stats;
}

$(document).ready(renderClass());