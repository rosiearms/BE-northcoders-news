if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test'

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/test.seed');
const app = require('../server');

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
					expect(res.body.articles.length).to.equal(usefulData.articles.length);
                    expect(res.body.articles[0].belongs_to).to.be.a('string');
                    expect(res.body.articles[0].belongs_to).to.eql(usefulData.articles[0].belongs_to);
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
                    expect(res.body.comments.length).to.equal(usefulData.comments.length);
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
	
	describe('POST api/:article_id/comments', () => {
        it('it returns with a status code of 201 if successful', () => {
          return request(app)
            .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
            .send({
              comment: 'test comment'
            })
            .expect(201);
        });
        it('returns the comment after successful post', () => {
          return request(app)
            .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
            .send({
              comment: 'test comment'
            })
            .then((res) => {
              const {body} = res.body.comment;
              expect(body).to.equal('test comment');
            });
        });
      });
	
	describe('PUT /api/articles/:article_id', () => {
        it('increments the articles vote by one', () => {
			let vote = usefulData.articles[0].votes;
            return request(app)
                .put(`/api/articles/${usefulData.articles[0]._id}?vote=up`)
                .then(res => {
                    expect(res.body.vote.votes).to.equal(vote + 1);
                });
        });
        it('decrements the articles vote by one', () => {
            let vote = usefulData.articles[0].votes;
            return request(app)
                .put(`/api/articles/${usefulData.articles[0]._id}?vote=down`)
                .then(res => {
                    expect(res.body.vote.votes).to.equal(vote - 1);
                });
		});
     });
     
     describe('GET /topics', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).to.be.an('array');
                    expect(res.body.topics.length).to.equal(usefulData.topics.length);
                    expect(res.body.topics[0].slug).to.be.a('string');
                    expect(res.body.topics[0].slug).to.eql(usefulData.topics[0].slug);
                });
        });
    });

    describe('GET /topics/:topic_id/articles', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request(app)
                .get(`/api/topics/${usefulData.articles[1].belongs_to}/articles`)
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('array');
                    expect(res.body.articles.length).to.equal(1);
                    expect(res.body.articles[0].belongs_to).to.be.a('string');
                    expect(res.body.articles[0].belongs_to).to.eql(usefulData.articles[1].belongs_to);
                });
        });
    });

    describe('GET /api/users/:username', () => {
        it('Returns a JSON object with the profile data for the specified user', () => {
            return request(app)
                .get(`/api/users/${usefulData.user.username}`)
                .then(res => {
                    expect(res.body.username).to.equal(usefulData.user.username);
                    expect(res.body.name).to.equal('Awesome Northcoder');
                    expect(res.body.username).to.be.a('string');
                    expect(res.body).to.be.an('object');
                });
        });
    });

    describe('DELETE /api/comments/:comment_id', () => {
        it('removes a comment by comment id', () => {
            return request(app)
                .delete(`/api/comments/${usefulData.comments[0]._id}`)
                .then(res => {
                    expect(res.body.message).to.equal('deleted');
                });
        });
    });

    describe('PUT /api/comments/:comment_id', () => {
        it('increments the comments vote by one', () => {
            let vote = usefulData.comments[0].votes;
            return request(app)
                .put(`/api/comments/${usefulData.comments[0]._id}?vote=up`)
                .then(res => {
                    expect(res.body.vote.votes).to.equal(vote + 1);
                });
        });
        it('decrements the comments vote by one', () => {
            let vote = usefulData.comments[0].votes;
            return request(app)
                .put(`/api/comments/${usefulData.comments[0]._id}?vote=down`)
                .then(res => {
                    expect(res.body.vote.votes).to.equal(vote - 1);
                });
        });
    });
});