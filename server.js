'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const babel = require('babel-core');
const path = require('path');

const {DATABASE_URL, PORT} = require('./config');
const {Klass} = require('./models');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('common'));

mongoose.Promise = global.Promise;


//temporary place for API calls

//file sending

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/classes/class/create', (req, res) => {
	res.sendFile(__dirname + '/public/views/create-class.html');
});

app.get('/classes/edit/:id', (req, res) => {
	res.sendFile(__dirname + '/public/views/edit-class.html'); //, { resClassID : id } can pass in a variable directly to the sendFile method
});

app.get('/classes/class/view/:id', (req, res) => {
	res.sendFile(__dirname + '/public/views/class-view.html');
});

app.get('/classes/class/:id/student/create', (req, res) => {
	res.sendFile(__dirname + '/public/views/student-create.html');
});

app.get('/classes/class/:id/student/:studentId/edit', (req, res) => {
	res.sendFile(__dirname + '/public/views/student-edit.html');
});

app.get('/classes/coming-soon', (req, res) => {
	res.sendFile(__dirname + '/public/views/coming-soon.html');
});


//GET operations
//classes GET for Read operation

app.get('/classes', (req, res) => { //classes.data
	Klass
	.find()
	.limit(10)
	.exec()
	.then(classes => {
		res.json({
			classes: classes.map((course) => course.apiRepr())
		});
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({ message : 'Internal server error' });
	});
});

//get a specific class

app.get('/classes/:id', (req, res) => {

	if(!req.params.id) {
		const msg = `Request parameter path ${req.params.id} and request body id ${req.body.id} do not match`;
		console.error(msg);
		res.status(400).json({ message : msg });
	}

	Klass
	.findById(req.params.id)
	.exec()
	.then(function(course) {
		res.json( course.apiRepr() );
	})
	.catch(function(err) {
		console.error(err);
		res.status(500).json({ message : 'Internal server error while fetching class' });
	});

});

//class GET for Read operation for specific class view

app.get('/classes/view/class/:id', (req, res) => {
	if (!req.params.id) {
		const msg = `Request parameter path ${req.params.id} and request body id ${req.body.id} for classes/view/class/:id do not match`;
		console.error(msg);
		res.status(400).json({ message : msg });
	}

	Klass
	.findById(req.params.id)
	.exec()
	.then(function(course) {
		res.json(course.studentApiRep());
	})
	.catch(function(err) {
		console.error(err);
		res.status(500).json({ message : 'Internal server error while fetching class for class view' });
	});
});

//classes POST for Create operation for a class

app.post('/classes', (req, res) => {
	const requiredFields = ['className', 'subject', 'gradeLevel', 'term'];

	requiredFields.forEach(function(field) {
		if(!(field in req.body && req.body[field])) {
			return res.status(400).json({ message : `Please specify a value for ${field}`});
		}
	});

	Klass
		.create({
			className: req.body.className,
			subject: req.body.subject,
			gradeLevel: req.body.gradeLevel,
			term: req.body.term
		})
		.then(function(course) {
			res.status(201).json(course.apiRepr());
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ message : 'Internal server error, cannot create' })
		});
});

//classes DELETE for Delete operation

app.delete('/classes/:id', (req, res) => {

	Klass
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(function(course) {
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ message : 'Internal server error, cannot delete' });
		});
});

app.delete('/classes/:id/student/:studentId', (req, res) => {
	
	Klass
	.findByIdAndRemove(
		{"students.studentId": req.params.studentId})
		.exec()
		.then(function(course) {
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ message : 'Internal server error, cannot delete student' });
		});
});

//classes PUT for Update operation

//updating class

app.put('/classes/:id', (req, res) => {

	if (!(req.params.id && req.body.id && (req.params.id === req.body.id))) {
		const msg = `Request path id parameter ${req.params.id} and the request body id ${req.body.id} must match`;
		console.error(msg);
		res.status(400).json({ message : msg });
	}

	const forUpdating = {};
	const updateFields = ['className', 'subject', 'gradeLevel', 'term'];

	updateFields.forEach(field => {
		if (field in req.body) {
			forUpdating[field] = req.body[field];
		}
	});

	Klass
		.findByIdAndUpdate(req.params.id, { $set : forUpdating })
		.exec()
		.then(function(course) {
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ message : 'Internal server error, cannot update'});
		});
});

//adding new student to a class

app.put('/classes/:id/student', (req, res) => {
	if (!(req.params && req.body.id && (req.params.id === req.body.id))) {
		const msg = `Request path id parameter ${req.params.id} and the request body id ${req.body.id} must match`;
		console.error(msg);
		res.status(400).json({ message : msg });
	}
	console.log(req.body);
	let forUpdating = {},
		studentObj = {},
		students = [],
		name = {};

	name.firstName = req.body['students[0][name][firstName]'];
	name.lastName = req.body['students[0][name][lastName]'];

	studentObj.studentId = req.body['students[0][studentid]'];
	studentObj.name = name;
	studentObj.grades = req.body['students[0][grades]'];

	students.push(studentObj);
	forUpdating.students = students;

	Klass
		.findByIdAndUpdate(req.params.id, { $push: {'students': forUpdating.students[0]} })
		.exec()
		.then(function(course) {
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: 'Internal server error, cannot create student' });
		});
});

//updating a student

app.put('/classes/:id/student/:studentId', (req, res) => {

	// if(!(req.params && req.body.id && (req.params.studentId === req.body.id))) {
	// 	const msg = `Request path id parameter ${req.params.studentId} and the request body id ${req.body.id} must match`;
	// 	console.error(msg);
	// 	let retReq = req.body;
	// 	res.status(400).json({ message : msg });
	// }

	let studentObj = {},
		name = {};

	name.firstName = req.body['students[0][name][firstName]'];
	name.lastName = req.body['students[0][name][lastName]'];

	studentObj.studentId = req.body['students[0][studentid]'];
	studentObj.name = name;

	Klass.update(
		{"students.studentId":req.params.studentId},
		{
			$set:{
				"students.$.studentId":studentObj.studentId,
				"students.$.name.firstName":name.firstName,
				"students.$.name.lastName":name.lastName
			}
		})
		.exec()
		.then(function(course) {
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ message : 'Internal server error, cannot update' });
		});
});

//any use case

app.use('*', function(req, res) {
	res.status(404).json({ message : 'Not found'});
});

//server running and closing

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, function(err) {
			if (err) {
				return reject(err);
			}

			server = app.listen(port, function() {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
			.on('error', function(err) {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer() {
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing server');
				server.close(function(err) {
					if (err) {
						return reject(err);
					}

					resolve();
				});
			});
		});
}

if (require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
