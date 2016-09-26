import { app } from '../../server/server.js';
import conf from '../../server/configure.js';
import supertest from 'supertest';

const SSO_HOST = conf.get('SERVER:UBUNTU_SSO_HOST');
const VERIFY_URL = conf.get('SERVER:OPENID:VERIFY_URL');

describe('login routes', () => {

  describe('authenticate', () => {
    it('should redirect from /login/authenticate to SSO', (done) => {
      supertest(app)
        .get('/login/authenticate')
        .expect('location', new RegExp(SSO_HOST))
        .expect(302, done);
    });

    it('should include verify url in redirect header', (done) => {
      supertest(app)
        .get('/login/authenticate')
        .expect('location',
          new RegExp(encodeURIComponent(VERIFY_URL)),
          done
        );
    });
  });

  // FIXME verify handlers need work and more tests
  describe('verify', () => {
    it('is an http POST', (done) => {
      supertest(app)
        .get('/login/verify')
        .expect(404, done);
    });

    it('should return http 401 on failure', (done) => {
      supertest(app)
        .post('/login/verify')
        .expect(401, done);
    });
  });

});
