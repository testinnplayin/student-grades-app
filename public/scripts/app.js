'use strict';

const state = {
	viewProps: {
		'index': {
			selected: true,
			title: '',
			current: true,
			addClassBtn: true
		},
		'createClass': {
			selected: false,
			title: 'Create Class',
			current: false,
			addClassBtn: false
		},
		'editClass': {
			selected: false,
			title: 'Edit Class',
			current: false,
			addClassBtn: false
		}
	}
};

function renderSelectClass(ele, view) {
	if (state.viewProps[view].selected) {
		$(ele).addClass('selected');
	} else {
		$(ele).removeClass('selected');
	}
}

function setCurrentSpan(ele, view) {
	if (state.viewProps[view].current) {
		$(ele).find('span').text('Current');
	} else {
		$(ele).find('span').text('');
	}	
}

function renderAddClassBtn(view) {
	var titleStuff = '.title-stuff';
	$(titleStuff).empty();
	if (state.viewProps[view].addClassBtn) {
		$(titleStuff).append('<a>Add a Class</a>');
		$(titleStuff)
		.find('a')
		.attr('role', 'button')
		.attr('href', "/classes/class/create")
		.attr('id', 'js-add-class-btn')
		.addClass('btn')
		.addClass('btn-danger');
	} else {
		$(titleStuff)
		.find('a')
		.remove();
	}
}

function drawLbButtons(value, style, actn, type, txt) {
	let ele = '#' + value;
	$(ele)
	.append('<button></button>');

	$(ele)
	.find('button')
	.attr('type', type)
	.addClass('btn')
	.addClass('btn-' + style)
	.addClass('js-' + actn + '-trigger')
	.text(txt);
}

function drawAnchorButton(text, href, style, value) {
	var ele = '#' + value,
		fullHref = href + value;

	$(ele).append('<a></a>');

	$(ele)
	.find('a')
	.last()
	.attr('role', 'button')
	.attr('id', value)
	.addClass('class-finder')
	.addClass('btn')
	.addClass(style)
	.text(text)
	.attr('href', fullHref);
}

function drawLightbox() {
	let lightboxCont = '.js-lb-container',
		lbStyle = '.js-lb-style',
		form = 'form',
		lbForm = 'js-lb-form';
	$(lightboxCont).append('<div></div>');

	$(lightboxCont)
	.find('div')
	.addClass('js-lb-style')
	.append('<form></form>');

	$(lbStyle)
	.find(form)
	.attr('id', lbForm)
	.append('<p></p>');

	$(lbStyle)
	.find('p')
	.html('<strong>Are you sure you want to proceed?</strong> Click on confirm delete or click anywhere else to cancel.');

	drawLbButtons(lbForm, 'danger', 'delete', 'submit', 'Confirm Delete');

}

function renderAlert(result, response) {
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

function showLightbox(klassId) {
	$('.js-lightbox').css('display', 'block');
	handleClassDeleteSubmit(klassId);
}

function drawBodyRows(klasses) {
	let lng = klasses.classes.length;

	for (let i = 0; i < lng; i++) {
		let value = klasses.classes[i].id,
			classItem = `<td>${klasses.classes[i].className}</td><td>${klasses.classes[i].subject}</td><td>${klasses.classes[i].gradeLevel}</td><td>${klasses.classes[i].term}</td>`;


		$('tbody').append('<tr id="' + value + '"></tr>').find('#' + value).append(classItem);
		drawAnchorButton('Edit', '/classes/edit/', 'btn-info', value);
		drawLbButtons(value, 'danger', 'send-to-del', 'button', 'Delete');
		drawAnchorButton('Go to Class', '/classes/class/view/', 'btn-default', value);
		$('.js-send-to-del-trigger').val(value);
	}
}

function drawHeadRow(klasses) {
	let arr = ['Class Name', 'Subject', 'Grade Level', 'Term'],
		lng = arr.length;

	for (let i = 0; i < lng; i++) {
		let classTitle = `<th>${arr[i]}:</th>`;
		$('thead').append(`<tr id="js-table-title"></tr>`).find(`#js-table-title`).append(classTitle);
	}

}

function drawClassTable(klasses) {
	let table = '.js-class-table';

	$(table).append('<thead></thead>').append('<tbody></tbody>');

	drawHeadRow(klasses);
	drawBodyRows(klasses);
}

function renderInitialState(klasses, view) {	
	let jsKlasses = '.js-classes',
		contentContainer = '.js-content-container';

	$(contentContainer)
	.append('<h3>List of Classes:</h3>')
	.append('<div></div>')
	.find('div')
	.addClass('table-responsive')
	.append('<table></table>')
	.find('table')
	.addClass('table')
	.addClass('class-table')
	.addClass('js-class-table');

	drawClassTable(klasses);

	renderSelectClass(jsKlasses, view);
	setCurrentSpan(jsKlasses, view);
	renderAddClassBtn(view);

	drawLightbox();
}


function checkState(currentView) {
	if (currentView === 'index') {
		getKlasses(currentView);
	} 
}

function deleteKlass(reqObj) {
	console.log('delete operation triggered');
	$.ajax({
		method: 'DELETE',
		url: '/classes/' + reqObj.id,
		dataType: 'json'
	})
	.done(function(data) {
		let result = 'success',
			response = 'Class successfully deleted';

		console.log('successful delete operation');
		closeLb();
		renderAlert(result, response);
		handleCleanUp(reqObj);
	})
	.fail(function(err) {
		let result = 'fail',
			response = 'Class was not successfully deleted';

		console.error('unsuccessful delete operation');
		console.error(err);
		closeLb();
		renderAlert(result, response);
	});
}


function getKlasses(currentView) {
	$.getJSON('/classes')
	.done(function(data) {
		console.log("successful call");
		console.log(data);

		renderInitialState(data, currentView);
		handleDeleteClick();
		return data;
	})
	.fail(function(err) {
		console.error("unsuccessful call");
		console.error(err);
		return err;
	});
}

function closeLb() {
	$('.js-lightbox').css('display', 'none');
	$('.js-lb-content .js-lb-style').html('');	
}

function handleClose() {
	$('.js-lb-close').click(function() {
		closeLb();
	});
}

function handleCleanUp(reqObj) {
	let contentContainer = '.js-content-container';

	reqObj = {};
	console.log(reqObj);
	$(contentContainer).empty();
	getKlasses('index');
}

function handleClassDeleteSubmit(klassId) {
	var form = '#js-lb-form';

	$(form).submit(function(e) {
		e.preventDefault();
		e.stopPropagation();

		var reqObj = {};
		
		reqObj.id = klassId;
		console.log('request obj');
		console.log(reqObj.id);

		deleteKlass(reqObj);

		return false;
	});
}

function handleDeleteClick() {
	let body = 'body';
	$(body).on('click', '.js-send-to-del-trigger', function(e) {
		e.preventDefault();

		var klassId = $(this).val();
		console.log('handle delete click obj');
		console.log(klassId);

		console.log('lightbox event triggered');

		showLightbox(klassId);
		handleClose();
	});
}

function handleActions() {
	var currentView = 'index';

	checkState(currentView);
}

$(document).ready(handleActions());