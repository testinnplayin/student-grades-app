const state = {
	currentView: ['index', 'createClass'],
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

// function renderForm() {
// 	var form = 'form';
// 	var arr = ['className', 'subject', 'gradeLevel', 'term'];
	// var button = 'button';

// 	$('.js-content-container').append('<form></form>');

// 	for (let item in arr) {
// 		$(form).append('<div class="form-group js-' + item + '-f-grp"></div>');
// 	}

// 	for (let i = 0; i < arr.length; i++) {
// 		$('.js-' + i + '-f-grp').append("<label for='" + arr[i] + "'>" + arr[i] + ":</label>");
// 		$('.js-' + i + '-f-grp').append("<input id='" + arr[i] + "' type='text' placeholder='Enter " + arr[i] + "' required />");
// 		$('.js-' + i + '-f-grp').find('#' + arr[i] + '').addClass('form-control');
// 	}

// 	$(form).append("<button>Add Class</button>");
// 	$(button)
	// .attr('type', 'submit')
	// .attr('id', 'submit-btn')
	// .addClass('btn')
	// .addClass('btn-danger');
// }

function renderInitialState(klasses, view) {	
	$('.js-content-container').append('<h3>List of Classes:</h3>');

	for (let klass of klasses.classes) {
		var classItem = "<li class='list-group-item'><a href='#' value ='" + klass.id + "''>Class Name: " + klass.className + " Subject: " 
		+ klass.subject + " Grade Level: " + klass.gradeLevel + " Term: " + klass.term + "</a><a href='#' role='button' class='btn btn-info'>Edit</a><a href='#' role='button' class='btn btn-danger'>Delete</a></li>";

		$('.js-content-container').append(classItem);
	}

	renderSelectClass('.js-classes', view);
	setCurrentSpan('.js-classes', view);
	renderAddClassBtn(view);
}

// function generateCreateClassView(view) {
// 	renderForm();
// 	renderSelectClass('js-classes', view);
// 	setCurrentSpan('.js-classes', view);
// 	renderAddClassBtn(view);
// }


function checkState(currentView) {
	if (currentView === 'index') {
		getKlasses(currentView);
	} //else if (currentView === 'createClass') {
	// 	$('.js-content-container').empty();
	// 	generateCreateClassView(currentView);
	// }
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

// function createKlass(klass) {
// 	$.ajax({
// 		method: 'POST',
// 		url: '/classes',
// 		data: klass,
// 		dataType: json
// 	})
// 	.done(function(data) {
// 		console.log('successful post');
// 		console.log(data);
// 	})
// 	.fail(function(err) {
// 		console.error('unsuccessful post');
// 		console.error(err);
// 	});
// }

// function handleClassCreateClick() {
// 	$('#js-add-class-btn').click(function(e) {
// 		e.preventDefault();

// 		handleClassCreation();
// 	});
// }

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


// function handleClassCreation() {
// 	var currentView = 'createClass';

// 	checkState(currentView);
// 	handleSubmit();

// }

function handleActions() {
	var currentView = 'index';

	checkState(currentView);	
}

$(document).ready(handleActions());