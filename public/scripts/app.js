const state = {
	currentView: ['index', 'createClass']
};

function renderInitialState(klasses) {	

	for (let klass of klasses.classes) {
		var classItem = "<li class='list-group-item'><a href='#' value ='" + klass.id + "''>Class Name: " + klass.className + " Subject: " 
		+ klass.subject + " Grade Level: " + klass.gradeLevel + " Term: " + klass.term + "</a><a href='#' role='button' class='btn btn-info'>Edit</a><a href='#' role='button' class='btn btn-danger'>Delete</a></li>";


		$('.js-content-container').append(classItem);
	}
}

function renderForm() {
	$('.js-content-container').append('<form action="/classes" method="post"></form>');
	$('form').append('<div class="form-group js-first-f-grp"></div>');
	$('.js-first-f-grp').append('<label for="className">Class Name: </label>');
	$('.js-first-f-grp').append('<input id="className" class="form-control" type="text" placeholder="Enter Class Name (eg. Chem01)" required />');

	// $('form').append('<label for="subject">Subject:</label>');
	// $('form').append('<input id="subject" type="text" placeholder="Enter Subject (eg. Chemistry)" required />');
	// $('form').append('<label for="gradeLevel">Grade Level:</label>');
	// $('form').append('<input id="gradeLevel" type="text" placeholder="Enter Grade Level (eg. 6th)" />');
	// $('form').append('<label for="term">Term:</label>');
	// $('form').append('<input id="term" type="text" placeholder="Enter Term (eg. Spring, 2017)" />');

}

function checkState(klasses) {
	if (currentView === 'index') {
		renderInitialState(klasses);
	} else if (currentView === 'createClass') {
		renderForm();
	}
}

function getKlasses() {
	$.getJSON('/classes')
	.done(function(data) {
		console.log("successful call");
		console.log(data);

		checkState(data);

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
	var currentView = state.currentView;
	console.log(currentView);
	getKlasses();
	
}

$(document).ready(handleActions());