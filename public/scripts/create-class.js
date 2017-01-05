'use strict';

function renderForm() {
	var form = 'form';
	var arr = ['className', 'subject', 'gradeLevel', 'term'];

	$('.js-content-container').append('<form action="/classes" method="post"></form>');

	for (let item in arr) {
		$(form).append('<div class="form-group js-' + item + '-f-grp"></div>');
	}
	
	for (let i = 0; i < arr.length; i++) {
		$('.js-' + i + '-f-grp').append("<label for='" + arr[i] + "'>" + arr[i] + ":</label>");
		$('.js-' + i + '-f-grp').append("<input id='" + arr[i] + "' type='text' placeholder='Enter " + arr[i] + "' required />");
		$('.js-' + i + '-f-grp').find('#' + arr[i] + '').addClass('form-control');
	}
	
	$(form).append("<button>Add Class</button>");
	$('button').attr('type', 'submit');
	$('button').addClass('btn');
	$('button').addClass('btn-danger');
	$('button').attr('id', 'submit-btn');
}

function checkState(currentView) {
	if (currentView === 'createClass') {
		renderForm();
	}
}

function handleSubmit() {
	$('form').on('submit', '#submit-btn', function(e) {
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

		reqObj.className = className;
		reqObj.subject = subject;
		reqObj.gradeLevel = gradeLevel;
		reqObj.term = term;

		console.log('request object');
		console.log(reqObj);

		return reqObj;
	});
}

function handleActions() {
	var currentView = 'createClass';

	checkState(currentView);
}

$(document).ready(handleActions());