'use strict';

var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
	className: { type: String, required: true },
	subject: String,
	gradeLevel: String,
	term: String,
	students: [{
		studentId: String,
		firstName: String,
		lastName: String,
		grades: Array
	}]
});

classSchema.virtual('studentFullName').get(function () {
	return this.students.lastName + ', ' + this.students.firstName;
});

// classSchema.virtual('student average').get(function() {
// 	const getAverage = this.students.grades.reduce(function() {});
// });

classSchema.methods.apiRepr = function () {
	return {
		id: this._id,
		className: this.className,
		subject: this.subject,
		gradeLevel: this.gradeLevel,
		term: this.term
	};
};

classSchema.methods.studentApiRep = function () {
	return {
		id: this._id,
		className: this.className,
		subject: this.subject,
		gradeLevel: this.gradeLevel,
		term: this.term,
		students: [{
			studentId: this.students.studentId,
			fullName: this.students.studentFullName,
			grades: this.students.grades
		}]
	};
};

classSchema.methods.calculateClassAverage = function () {
	return {
		className: this.className,
		students: [{
			grades: this.students.grades
		}]
	};
};

//add a method for getting teacher id later on

var Class = mongoose.model('Class', classSchema);

module.exports = { Class: Class };