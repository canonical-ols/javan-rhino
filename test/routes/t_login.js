// load server/server.js via proxyquire to stub webpack-assets.json
import proxyquire from 'proxyquire';

// import login routes for testing
import loginRoutes from '../../src/server/routes/login.js';

const routesStub = {
  status: () => {},
  login: loginRoutes,
  api: () => {},
  universal: () => {},
  // tell proxyquire not to try to load stubbed module
  '@noCallThru': true
};
const stubDependencies = {
  './routes/': routesStub
};

const app = proxyquire(
  '../../src/server/server.js',
  stubDependencies
).default;

import conf from '../../src/server/configure.js';
import nock from 'nock';
import supertest from 'supertest';

const SSO_HOST = conf.get('SERVER:UBUNTU_SSO_HOST');
const UBUNTU_SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');
const VERIFY_URL = conf.get('SERVER:OPENID:VERIFY_URL');

describe('login routes', function() {

  afterEach(function() {
    nock.cleanAll();
  });

  describe('authenticate', function() {

    this.timeout(30000);
    this.slow(5000);
    this.retries(3);


    it('should redirect from /login/authenticate to SSO', function(done) {
      supertest(app)
        .get('/login/authenticate')
        .expect('location', new RegExp(SSO_HOST))
        .expect(302, done);
    });

    it('should include verify url in redirect header', function(done) {
      supertest(app)
        .get('/login/authenticate')
        .expect('location',
          new RegExp(encodeURIComponent(VERIFY_URL)),
          done
        );
    });

    context('when macaroon service responds with error', function() {

      it('should redirect home on error', function(done) {
        const sca = nock(UBUNTU_SCA_URL)
          .post('/dev/api/acl/', {
            'permissions': ['package_access', 'package_purchase']
          })
          .reply(503, '<html>ERROR</html>');

        supertest(app)
          .get('/login/authenticate')
          .expect('location', '/')
          .expect(302, (err) => {
            sca.done();
            done(err);
          });
      });
    });
  });
});
