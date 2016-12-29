const chai = require('chai');
const chaiHTTP = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');
const {Class} = require('../models');
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

	return Class.insertMany(seedData);
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

describe('set up an API environment for testing Class', function() {
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

});
