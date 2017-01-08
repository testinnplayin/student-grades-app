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
	if (state.viewProps[view].addClassBtn) {
		$(titleStuff).append('<a>Add a Class</a>');
		$(titleStuff)
		.find('a')
		.attr('role', 'button')
		.attr('href', "/classes/create")
		.attr('id', 'js-add-class-btn')
		.addClass('btn')
		.addClass('btn-danger');
	} else {
		$(titleStuff)
		.find('a')
		.remove();
	}
}

function drawButtons(text, href, style, value) {
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

function renderInitialState(klasses, view) {	
	$('.js-content-container').append('<h3>List of Classes:</h3>');

	for (let klass of klasses.classes) {
		var classContainer = '.js-content-container',
			classItem = "<li class='list-group-item' id='" + klass.id + "'><a href='#' value='" + klass.id + "''>Class Name: " + klass.className + " Subject: " 
			+ klass.subject + " Grade Level: " + klass.gradeLevel + " Term: " + klass.term + "</a></li>",
			value = klass.id;

		$(classContainer).append(classItem);


		drawButtons('Edit', '/classes/edit/', 'btn-info', value);
		drawButtons('Delete', '/classes/delete/', 'btn-danger', value);

	}

	renderSelectClass('.js-classes', view);
	setCurrentSpan('.js-classes', view);
	renderAddClassBtn(view);
}


function checkState(currentView) {
	if (currentView === 'index') {
		getKlasses(currentView);
	} 
}


function getKlasses(currentView) {
	$.getJSON('/classes')
	.done(function(data) {
		console.log("successful call");
		console.log(data);

		renderInitialState(data, currentView);
		return data;
	})
	.fail(function(err) {
		console.error("unsuccessful call");
		console.error(err);
		return err;
	});
}

function handleSubmit() {
	var form = 'form';
	$(form).submit(function(e) {
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
			className: className,
			subject: subject,
			gradeLevel: gradeLevel,
			term: term
		};

		createKlass(reqObj);

		return false;
	});
}

function handleActions() {
	var currentView = 'index';

	checkState(currentView);
	// handleEditOrDeleteClick();
}

$(document).ready(handleActions());