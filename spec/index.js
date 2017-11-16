if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test'

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/test.seed');
const app = require('../server');
const { Articles, Comments } = require('../models/models');

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

	describe('GET /articles/:article_id/comments', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request(app)
                .get(`/api/articles/${usefulData.articles[0]._id}/comments`)
				.expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('array');
                    expect(res.body.comments.length).to.equal(2);
                    expect(res.body.comments[0].body).to.be.a('string');
                });
        });
        it('sends back a 404 error status when given invalid id', () => {
            return request(app)
                .get(`/api/articles/1/comments`)
                .expect(404)
                .then(res => {
					const {message} = res.body;
					expect(message).to.eql( 'ARTICLE_ID NOT FOUND');
				  });
        });


	});
	
	describe('POST /articles/:article_id/comments', () => {
        it('adds a comment to the correct article with a status code of 200', () => {
            return request(app)
                .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
                .send({ "body": "This is a great article", "belongs_to": `${usefulData.articles[0]._id}` })
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.body).to.equal('This is a great article');
                });
        });


    });

	
});