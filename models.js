'use strict';

const mongoose = require('mongoose');

const gradesSchema = mongoose.Schema({
	studentId:String,
	klassId:String,
	work: String,
	grade: String
});

const studentSchema = mongoose.Schema({
	studentKlassId:String,
	studentId: String,
	name: {
		firstName: String,
		lastName: String
	},
	grades: [gradesSchema]
});

const classSchema = mongoose.Schema({
	className: { type: String, required: true},
	subject: String,
	gradeLevel: String,
	term: String,
	students: [studentSchema]
});

classSchema.methods.apiRepr = function() {
	//filter students for classSchema
		//let studentsInClass = StudentSchema.findAll({ where:{studentKlassId : this._id}})

		/*
		loop through studentsInClass
			let gradesForClass = gradesSchema.findAll({ where:{studentId:studentsInClass._id, klassId:this._id} });
			studentSchema.classGrades = gradesForClass;
		*/

	return {
		id: this._id,
		className: this.className,
		subject: this.subject,
		gradeLevel: this.gradeLevel,
		term: this.term,
		students: this.students //studentsInClass
	};
};

// classSchema.methods.studentApiRep = function() {
// 	let allStudents = [],
// 		studentsLng = this.students.length;
//
// 	for (let i = 0; i < studentsLng; i++) {
// 		let studentObj = {};
// 		studentObj = {
// 			studentKlassId: this.students[i]._id,
// 			studentId: this.students[i].studentId,
// 			name: {
// 				firstName: this.students[i].name.firstName,
// 				lastName: this.students[i].name.lastName
// 			},
// 			grades: this.students[i].grades
// 		};
//
// 		allStudents.push(studentObj);
// 	}
//
// 	return {
// 		id: this._id,
// 		className: this.className,
// 		subject: this.subject,
// 		gradeLevel: this.gradeLevel,
// 		term: this.term,
// 		students: allStudents
// 	};
// };

//add a method for getting teacher id later on

const Klass = mongoose.model('Klass', classSchema);
const Student = mongoose.model('Student', studentSchema);


module.exports = {Klass,Student};
