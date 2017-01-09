const chai = require('chai');
const chaiHTTP = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');
const {Klass} = require('../models');
const {TEST_DATABASE_URL} = require('../config');

const should = chai.should();

chai.use(chaiHTTP);

//fake data seeding

function seedClassData() {
	console.log('Seeding class info');
	const seedData = [];

	for (let i = 1; i <= 10; i++) {
		seedData.push(generateClassData());
	}

	return Klass.insertMany(seedData);
}

function generateSomeData(fakeData) {
	return fakeData[Math.floor(Math.random() * fakeData.length)];
}

function generateGrades() {
	const grades = ['A', 'B', 'C', 'D', 'F'];
	const grade = grades[Math.floor(Math.random() * grades.length)];
	const items = ['Exam', 'Homework', 'Report'];
	const work = items[Math.floor(Math.random() * items.length)];

	return {
		work: work,
		grade: grade
	};
}

function generateClassData() {
	return {
		className: generateSomeData(['Thing', 'Stuff', 'Whatchamajigger', 'Dohicky', 'Machin']),
		subject: generateSomeData(['Chemistry', 'Physics', 'Math', 'English', 'Geography']),
		gradeLevel: generateSomeData(['6th', '7th', '8th']),
		term: generateSomeData(['Spring, 2017', 'Fall, 2016', 'Fall, 2015', 'Spring, 2015', 'Spring, 2016']),
		students: [
			{
				studentID: faker.random.number,
				name: {
					firstName: faker.name.firstName,
					lastName: faker.name.lastName
				},
				grades: [generateGrades(), generateGrades(), generateGrades(), generateGrades(), generateGrades(), generateGrades(), generateGrades()]
			}
		]

	};
}

function tearDownDb() {
	console.warn('Deleting test database');
	return mongoose.connection.dropDatabase();
}

describe('set up an API environment for testing Klass', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
		return seedClassData();
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
		return closeServer();
	});

	//GET operations

	describe('GET verb at /classes', function() {
		it('should return a list of all classes', function() {
			let res;

			return chai.request(app)
				.get('/classes')
				.then(function(_res) {
					res = _res;
					res.should.have.status(200);
					res.body.classes.should.have.length.of.at.least(1);
					return Klass.count();
				})
				.then(function(count) {
					res.body.classes.should.have.length.of(count);
				});
		});

		it('should return a class object with the right fields', function() {
			let resClass;

			return chai.request(app)
				.get('/classes')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.classes.should.be.a('array');
					res.body.classes.should.have.length.of.at.least(1);

					res.body.classes.forEach(function(course) {
						course.should.be.a('object');
						course.should.include.keys('id', 'className', 'subject', 'gradeLevel', 'term');

					});
					resClass = res.body.classes[0];
					return Klass.findById(resClass.id);
				});
		});
	});

	describe('GET verb at /classes/:id', function() {
		it('should return a class object for viewing with the right fields', function() {
			var course = {};

			return Klass
			.findOne()
			.exec()
			.then(function(_course) {
				course.id = _course.id;
				return chai.request(app).get(`/classes/${course.id}`);
			})
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys('id', 'className', 'subject', 'gradeLevel', 'term');
				res.body.id.should.equal(course.id);

				return Klass.findById(course.id);
			});
		});
	});

	describe('GET verb at /classes/view/class/:id', function() {
		it('should return a class object for viewing with the right fields', function() {
			var course = {};

			return Klass
			.findOne()
			.exec()
			.then(function(_course) {
				course.id = _course.id;
				return chai.request(app).get(`/classes/view/class/${course.id}`);
			})
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys('id', 'className', 'subject', 'gradeLevel', 'term', 'students');
				res.body.id.should.equal(course.id);

				return Klass.findById(course.id);
			});
		});
	});

	describe('POST verb at /classes', function() {
		it('should create a new class with the right fields', function() {
			const newClass = generateClassData();

			return chai.request(app)
				.post('/classes')
				.send(newClass)
				.then(function(res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys('id', 'className', 'subject', 'gradeLevel', 'term');
					res.body.id.should.not.be.null;
					res.body.className.should.equal(newClass.className);
					res.body.subject.should.equal(newClass.subject);
					res.body.gradeLevel.should.equal(newClass.gradeLevel);
					res.body.term.should.equal(newClass.term);

					return Klass.findById(res.body.id);
				})
				.then(function(course) {
					course.className.should.equal(newClass.className);
					course.subject.should.equal(newClass.subject);
					course.gradeLevel.should.equal(newClass.gradeLevel);
					course.term.should.equal(newClass.term);
				});
		});
	});

	describe('DELETE verb at /classes/:id', function() {
		it('should delete a class', function() {
			let course;

			return Klass
				.findOne()
				.exec()
				.then(function(_course) {
					course = _course;
					return chai.request(app).delete(`/classes/${course.id}`);
				})
				.then(function(res) {
					res.should.have.status(204);
					return Klass.findById(course.id).exec();
				})
				.then(function(_course) {
					should.not.exist(_course);
				});
		});
	});

	describe('PUT verb at /classes/:id', function() {
		it('should update a class with the fields you send', function() {
			const updateKlass = {
				className : 'Engrish1',
				subject : 'Engrish'
			};

			return Klass
				.findOne()
				.exec()
				.then(function(course) {
					updateKlass.id = course.id;

					return chai.request(app)
						.put(`/classes/${course.id}`)
						.send(updateKlass);
				})
				.then(function(res) {
					res.should.have.status(204);

					return Klass.findById(updateKlass.id).exec();
				})
				.then(function(course) {
					course.className.should.equal(updateKlass.className);
					course.subject.should.equal(updateKlass.subject);
				});
		});
	});

});
