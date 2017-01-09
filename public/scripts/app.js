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

function drawEditButton(text, href, style, value) {
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

function showLightbox(klassId) {
	$('.js-lightbox').css('display', 'block');
	handleSubmit(klassId);
}

function renderInitialState(klasses, view) {	
	let jsKlasses = '.js-classes';
	$('.js-content-container').append('<h3>List of Classes:</h3>');

	for (let klass of klasses.classes) {
		var classContainer = '.js-content-container',
			classItem = "<li class='list-group-item' id='" + klass.id + "'><a href='#' value='" + klass.id + "''>Class Name: " + klass.className + " Subject: " 
			+ klass.subject + " Grade Level: " + klass.gradeLevel + " Term: " + klass.term + "</a></li>",
			value = klass.id; 

		$(classContainer).append(classItem);


		drawEditButton('Edit', '/classes/edit/', 'btn-info', value);
		drawLbButtons(value, 'danger', 'send-to-del', 'button', 'Delete');		
		$('.js-send-to-del-trigger').val(value);
	}

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

function handleSubmit(klassId) {
	var form = '.js-lb-form';

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