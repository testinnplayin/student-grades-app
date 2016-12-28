'use strict';

const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
	className: { type: String, required: true},
	subject: String,
	gradeLevel: String,
	term: String,
	students: Array
});

classSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		className: this.className,
		subject: this.subject,
		gradeLevel: this.gradeLevel,
		term: this.term
	};
};

const Class = mongoose.model('Class', classSchema);

module.exports = {Class};