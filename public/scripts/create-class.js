'use strict';

function handleDropDownClickClassCreate(index) {
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

function renderForm() {
	var form = 'form',
		arr = ['Class Name', 'Subject', 'Grade Level', 'Term'],
		button = 'button',
		contentContainer = '.js-content-container';

	$(contentContainer).append('<h3>Add New Class</h3>');

	$(contentContainer).append('<form></form>')
	.find('form')
	.addClass('class-form');

	for (let item in arr) {
		$(form).append('<div class="form-group js-f-grp-' + item + '"></div>');
	}

	for (let i = 0; i < arr.length; i++) {
		let jsGrp = '.js-f-grp-' + i,
			item = arr[i],
			itemArr = item.toLowerCase().split(' '),
			newItem = itemArr.join('-');

		$(jsGrp)
		.append("<label></label>")
		.append("<input />");

		$(jsGrp)
		.find('label')
		.attr('for', newItem)
		.text(item + ':');

		$(jsGrp)
		.find('input')
		.attr('id', newItem)
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
	console.log(data);
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
		let result = "failure",
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

		className = $('input[id="class-name"]').val();
		subject = $('input[id="subject"]').val();
		gradeLevel = $('input[id="grade-level"]').val();
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

function handleCreateNavClicks(navs) {
	navs.forEach(function(nav) {
		handleDropDownClickClassCreate(nav);
	});
}

function handleActions() {
	let currentView = 'createClass',
		navs = ['classes', 'students'];

	checkState(currentView);
	handleCreateNavClicks(navs);
	handleSubmit();
}

$(document).ready(handleActions());
