'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
// require('babel-core').transform("code", options);

const {DATABASE_URL, PORT} = require('./config');
const {Klass} = require('./models');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('common'));

mongoose.Promise = global.Promise;


//temporary place for API calls

//classes GET for Read operation

app.get('/classes', (req, res) => {
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

//classes POST for Create operation

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
			res.status(500).json({ message : 'Internal server error, cannot create' });
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