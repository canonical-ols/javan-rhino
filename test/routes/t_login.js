import { app } from '../../server/server.js';
import conf from '../../settings';
import supertest from 'supertest';

describe('simple app routes', () => {
  it('should be 200 for /', () => {
    supertest(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function(err) {
        if (err) throw err;
      });
  });

  it('should be 200 for /about', () => {
    supertest(app)
      .get('/about')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function(err) {
        if (err) throw err;
      });
  });

  it('should be 404 for /example-404-url', () => {
    supertest(app)
      .get('/example-404-url-haroo')
      .expect('Content-Type', /text\/html/)
      .expect(404)
      .end(function(err) {
        if (err) throw err;
      });
  });
});

describe('login routes', () => {
  it('should should redirect from /login/authenticate to SSO', () => {
    supertest(app)
      .get('/login/authenticate')
      .expect('Content-Type', /text\/html/)
      .expect(302)
      .end(function(err, res) {
        if (err) throw err;

        res.header['location'].should.include(conf.get('UBUNTU_SSO_URL'));
        res.header['location'].should.include(conf.get('OPENID:VERIFY_URL'));
      });
  });
});
