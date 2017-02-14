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
	let allStudents = [],
		studentsLng = this.students.length;

	for (let i = 0; i < studentsLng; i++) {
		let studentObj = {};
		studentObj = {
			studentKlassId: this.students[i]._id,
			studentId: this.students[i].studentId,
			name: {
				firstName: this.students[i].name.firstName,
				lastName: this.students[i].name.lastName
			},
			grades: this.students[i].grades
		};

		allStudents.push(studentObj);
	}

	return {
		id: this._id,
		className: this.className,
		subject: this.subject,
		gradeLevel: this.gradeLevel,
		term: this.term,
		students: allStudents
	};
};

//add a method for getting teacher id later on

const Klass = mongoose.model('Klass', classSchema);

module.exports = {Klass};
