const chai = require('chai');
const chaiHTTP = require('chai-http');
const {app} = require('../server');

const should = chai.should();

chai.use(chaiHTTP);

describe('Server test', function() {
	it('should give a 200 status upon set up', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.html;
			});
	});
});
