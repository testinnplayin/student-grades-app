'use strict';

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

	result === 'success' ? $(alert).addClass('alert-success') : $(alert).addClass('alert-warning');

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

function renderForm() {
	var form = 'form',
		arr = ['className', 'subject', 'gradeLevel', 'term'],
		button = 'button',
		contentContainer = '.js-content-container';

	$(contentContainer).append('<h3>Add New Class</h3>');

	$(contentContainer).append('<form></form>');

	for (let item in arr) {
		$(form).append('<div class="form-group js-f-grp-' + item + '"></div>');
	}
	
	for (let i = 0; i < arr.length; i++) {
		let jsGrp = '.js-f-grp-' + i,
			item = arr[i];

		$(jsGrp)
		.append("<label></label>")
		.append("<input />");

		$(jsGrp)
		.find('label')
		.attr('for', item)
		.text(item + ':');

		$(jsGrp)
		.find('input')
		.attr('id', item)
		.attr('type', 'text')
		.attr('placeholder', 'Enter ' + item)
		.attr('required');

		$(jsGrp)
		.find('#' + item + '')
		.addClass('form-control');
	}
	
	$(form).append("<button>Add Class</button>");

	$(button)
	.attr('type', 'submit')
	.addClass('btn')
	.addClass('btn-danger')
	.attr('id', 'submit-btn');

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
		let result = "success",
			response = "post to back end was successful";

		console.log(data);
		renderAlert(result, response);
	})
	.fail(function(err) {
		let result = "failure".
			response = "post to back end was not successful";

		console.error(err);
		renderAlert(result, response);
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

		reqObj = {
			className : className,
			subject : subject,
			gradeLevel : gradeLevel,
			term : term
		};

		sendClass(reqObj);

		return false;
	});
}

function handleActions() {
	let currentView = 'createClass';

	checkState(currentView);
	handleSubmit();
}

$(document).ready(handleActions());