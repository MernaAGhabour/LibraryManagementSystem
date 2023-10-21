const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const validCredentials = 'Basic ' + Buffer.from('username:password').toString('base64');

chai.use(chaiHttp);

describe('Book Controller', () => {
    it('should create a new book', (done) => {
        chai
            .request(app)
            .post('/book')
            .set('Authorization', validCredentials)
            .send({
                title: 'Test Book',
                author: 'Test Author',
                ISBN: '1234567890',
                availableQuantity: 10,
                shelfLocation: 'A1',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').eql('Book created successfully');
                done();
            });
    });

    it('should get all books', (done) => {
        chai
            .request(app)
            .get('/book')
            .set('Authorization', validCredentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should update a book', (done) => {
        chai
            .request(app)
            .put('/book/1')
            .set('Authorization', validCredentials)
            .send({
                title: 'Updated Book Title',
                author: 'Updated Author',
                ISBN: '1234567890',
                availableQuantity: 5,
                shelfLocation: 'B2',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Book updated successfully');
                done();
            });
    });

    it('should delete a book', (done) => {
        chai
            .request(app)
            .delete('/book/1')
            .set('Authorization', validCredentials)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should search for books', (done) => {
        chai
            .request(app)
            .get('/book/search?title=updatedTitle')
            .set('Authorization', validCredentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

});
