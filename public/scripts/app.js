function renderInitialState(klasses) {	
	$('.js-content-container').append('<h3>List of Classes:</h3>');

	for (let klass of klasses.classes) {
		var classItem = "<li class='list-group-item'><a href='#' value ='" + klass.id + "''>Class Name: " + klass.className + " Subject: " 
		+ klass.subject + " Grade Level: " + klass.gradeLevel + " Term: " + klass.term + "</a><a href='#' role='button' class='btn btn-info'>Edit</a><a href='#' role='button' class='btn btn-danger'>Delete</a></li>";

		$('.js-content-container').append(classItem);
	}
}


function checkState(currentView) {
	if (currentView === 'index') {
		console.log('checking state');
		getKlasses(currentView);
	} else if (currentView === 'createClass') {
		$('.js-content-container').empty();
		renderForm();
	}
}

function getKlasses(currentView) {
	$.getJSON('/classes')
	.done(function(data) {
		console.log("successful call");
		console.log(data);

		renderInitialState(data);
		return data;
	})
	.fail(function(err) {
		console.error("unsuccessful call");
		console.error(err);
		return err;
	});
}


function handleClassCreation() {
	$('form').on('submit', '#js-submit-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();


		return false;
	})
}

function handleActions() {
	var currentView = state.currentView[0];
	console.log('initial state');
	console.log(currentView);
	checkState(currentView);	
}

$(document).ready(handleActions());