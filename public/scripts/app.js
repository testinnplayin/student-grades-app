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

function selectTabs() {
	$('.js-tab').click(function(e) {
		e.preventDefault();

		$('.js-tab.curr-tab').removeClass('curr-tab');
		$(this).addClass('curr-tab');
	});
}

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
		$(titleStuff).append('<a>Add A Class</a>');
		$(titleStuff)
		.find('a')
		.attr('role', 'button')
		.attr('href', "/classes/class/create")
		.attr('id', 'js-add-class-btn')
		.addClass('add-class-btn');
	} else {
		$(titleStuff)
		.find('a')
		.remove();
	}
}

function drawLbButtons(value, actn, type, txt) {
	let ele = '#' + value;
	$(ele)
	.append('<button></button>');

	$(ele)
	.find('button')
	.attr('type', type)
	.addClass('js-' + actn + '-trigger')
	.text(txt);
}

function drawAnchorButton(text, href, value) {
	var ele = '#' + value,
		fullHref = href + value;

	$(ele).append('<td></td>');

	$(ele)
	.find('td')
	.last()
	.addClass('hidden')
	.addClass(text.toLowerCase())
	.append('<a></a>')
	.find('a')
	.last()
	.attr('role', 'button')
	.attr('data', value)
	.addClass('class-finder')
	.text(text)
	.attr('href', fullHref);
}

function drawDelButton(value) {
	var ele = '#' + value;

	$(ele).append('<td></td>');

	$(ele).find('td')
	.last()
	.addClass('hidden')
	.addClass('delete')
	.append('<button></button>')
	.find('button')
	.attr('type', 'button')
	.attr("data", value)
	.addClass('js-send-to-del-trigger')
	.text('Delete');
}

function handleMoreClick(index) {
	$('.js-dropdown-btn-' + index).click(function(e) {
		e.preventDefault();

		$('.js-actions-dropdown-' + index).toggleClass('show');
	});

	$(window).click(function(e) {
		if (!e.target.matches('.js-dropdown-btn-' + index)) {
			$('.js-actions-dropdown-' + index).removeClass('show');
		}
	});
}

function drawDropdown(value, index) {
	var id = '#' + value,
		url2 = '/classes/class/view' + value,
		url1 = '/classes/edit/' + value;

	$(id).append('<td></td>')
	.find('td')
	.last()
	.append('<div></div>')
	.find('div')
	.addClass('dropdown')
	.addClass('js-dropdown-' + index)
	.append('<button></button>')
	.find('button')
	.addClass('dropdown-btn')
	.addClass('js-dropdown-btn-' + index)
	.attr('type', 'button')
	.text('More');

	$('.js-dropdown-' + index)
	.append('<div></div>')
	.find('div')
	.addClass('actions-dropdown')
	.addClass('js-actions-dropdown-' + index)
	.append('<a></a>')
	.find('a')
	.attr('href', url1)
	.addClass('class-finder')
	.attr('role', 'button')
	.attr('value', value)
	.text('Edit');

	$('.js-actions-dropdown-' + index).append('<button></button>')
	.find('button')
	.addClass('js-send-to-del-trigger')
	.attr('type', 'button')
	.attr('value', value)
	.text('Delete');

	$('.js-actions-dropdown-' + index).append('<a></a>')
	.find('a')
	.last()
	.addClass('class-finder')
	.attr('href', url2)
	.attr('role', 'button')
	.attr('value', value)
	.text('Go To Class');

	handleMoreClick(index);
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
		//this will have to change because dropdown menu on small screens
		drawAnchorButton('Edit', '/classes/edit/', value);
		drawDelButton(value);
		drawAnchorButton('Go to Class', '/classes/class/view/', value);
		drawDropdown(value, i);
		$('.js-send-to-del-trigger').val(value);
	}
}

function drawHeadRow(klasses) {
	let arr = ['Class', 'Subject', 'Grade', 'Term'],
		lng = arr.length;

	for (let i = 0; i < lng; i++) {
		let classTitle = `<th>${arr[i]}</th>`;
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
	.append('<h3><i class="fa fa-book"></i> List of Classes</h3>')
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
	selectTabs();
}

$(document).ready(handleActions());
