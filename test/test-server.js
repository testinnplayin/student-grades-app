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
	const seedData = 
}

describe('set up an API environment for testing', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function() {
		return closeServer();
	});
});
