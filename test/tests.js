// const assert = require('assert');
const assert = require('chai').assert;
const server = require('../index');


const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);


describe('Messages', () => {
  let message = {
    sender: 'naor',
    recipient: 'naor2',
    message: 'are you copying me?'
  }

  describe('/GET empty messages', () => {
    it('should return empty message array', (done) => {
      chai.request(server)
        .get(`/messages/naor`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('payload');
          res.body.payload.should.be.a('array');
          res.body.payload.length.should.be.eql(0);
          done();
        })
    });
  });



  describe('/POST message', () => {
    it('should create new message', (done) => {
      // let message = {
      //   sender: 'naor',
      //   recipient: 'naor2',
      //   message: 'are you copying me?'
      // }
      chai.request(server)
        .post(`/messages`)
        .send(message)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('payload');
          res.body.payload.should.be.a('object');
          res.body.payload.should.be.eql(message);
          done();
        })
    });
  });

  describe('/GET messages ', () => {
    it('should return message array with one message', (done) => {
      chai.request(server)
        .get(`/messages/naor2`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('payload');
          res.body.payload.should.be.a('array');
          res.body.payload.length.should.be.eql(1);
          res.body.payload.should.be.eql([message]);
          done();
        })
    });
  });
});



