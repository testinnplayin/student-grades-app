'use strict';

const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
	className: { type: String, required: true},
	subject: String,
	gradeLevel: String,
	term: String,
	students: [{
		studentId: String,
		name: {
			firstName: String,
			lastName: String
		},
		grades: [
			{
				work: String,
				grade: String
			}
		]
	}]
});

classSchema.virtual('studentFullName').get(function() {
	return `${this.students.lastName}, ${this.students.firstName}`;
});

// classSchema.virtual('studentData').get(function() {
// 	return `${}`
// });

// classSchema.virtual('student average').get(function() {
// 	const getAverage = this.students.grades.reduce(function() {});
// });

classSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		className: this.className,
		subject: this.subject,
		gradeLevel: this.gradeLevel,
		term: this.term
	};
};

classSchema.methods.studentApiRep = function() {
	return {
		id: this._id,
		className: this.className,
		subject: this.subject,
		gradeLevel: this.gradeLevel,
		term: this.term,
		students: [
			{
				studentId: this.students[0].studentId,
				name: {
					firstName: this.students[0].name.firstName,
					lastName: this.students[0].name.lastName
				},
				grades: this.students[0].grades
			}
		]
	};
};

//add a method for getting teacher id later on

const Klass = mongoose.model('Klass', classSchema);

module.exports = {Klass};