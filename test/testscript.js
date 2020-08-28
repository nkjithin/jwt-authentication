//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
/*
  * Test the /GET route
  */
 let objUserData = {
  "username":"admin",
  "password":"admin"
   };
let token = '';
let refreshToken = '';
  describe('/post /login', () => {
      it('it should authenticate and get the token information', (done) => {
        chai.request(server)
            .post('/login')
            .send(objUserData)
            .end((err, res) => {
                  res.should.have.status(200);
                  token = res.body.jwtToken;
                  refreshToken = res.body.refreshToken;
                  res.body.should.have.property('jwtToken');
              done();
            });
      });
  });

  describe('/post /user-data', () => {
    it('it should authenticate and get the user sample data', (done) => {
      chai.request(server)         
          .post('/user-data')
          .set({'x-auth':token})          
          .send(objUserData)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                res.body.should.have.property('employeeName');
            done();
          });
    });
});

describe('/post /refresh-token', () => {
  it('it should GET the refresh token information', (done) => {
    chai.request(server)
        .post('/refresh-token')
        .set({'x-auth':token})
        .send({username:"admin",refreshToken:refreshToken})
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('jwtToken');
          done();
        });
  });
});
