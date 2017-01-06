'use strict';

function renderForm() {
	var form = 'form';
	var arr = ['className', 'subject', 'gradeLevel', 'term'];

	$('.js-content-container').append('<form></form>');

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

function sendClass(data) {
	$.ajax({
		type: 'POST',
		url: '/classes',
		data: data,
		dataType: 'json'
	})
	.done(function(data) {
		console.log('post to back end was successful');
		console.log(data);
	})
	.fail(function(err) {
		console.error(err);
		console.error('post was not successful');
		console.log(data);
	});
}

function handleSubmit() {
	$('form').submit(function(e) {
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

		sendClass(reqObj);

		return false;
	});
}

function handleActions() {
	var currentView = 'createClass';

	checkState(currentView);
	handleSubmit();

}

$(document).ready(handleActions());