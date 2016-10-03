import { app } from '../../server/server.js';
import conf from '../../server/configure.js';
import nock from 'nock';
import supertest from 'supertest';

const SSO_HOST = conf.get('SERVER:UBUNTU_SSO_HOST');
const UBUNTU_SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');
const VERIFY_URL = conf.get('SERVER:OPENID:VERIFY_URL');

describe('login routes', () => {

  afterEach(() => {
    nock.cleanAll();
  });

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

    context('when SCA responds with error', () => {

      it('should redirect home on error', (done) => {
        const sca = nock(UBUNTU_SCA_URL)
          .post('/dev/api/acl/', {
            'permissions': ['package_access', 'package_purchase']
          })
          .reply(503, '<html>ERROR</html>');

        supertest(app)
          .get('/login/authenticate')
          .expect(function(res) {
            res.body.name = res.body.name.toUpperCase();
          })
          .expect('location', '/')
          .expect(302, (err) => {
            sca.done();
            done(err);
          });
      });
    });
  });
});
