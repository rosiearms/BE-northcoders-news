if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test'

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/test.seed');
const app = require('../server');
const { Articles } = require('../models/models');

describe('API', () => {
	let usefulData;
	beforeEach(() => {
		return mongoose.connection.dropDatabase()
			.then(saveTestData)
			.then(data => {
				usefulData = data;
			})
			.catch(err => console.log('err!', err));
	});

	describe('GET /articles', () => {
		it('sends back the correct object with a status code of 200', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(res => {
					expect(res.body.articles).to.be.an('array');
					expect(res.body.articles.length).to.equal(2);
					expect(res.body.articles[0].belongs_to).to.be.a('string');
				});
		});
	});
});