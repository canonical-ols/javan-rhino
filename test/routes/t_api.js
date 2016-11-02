import Express from 'express';
import nock from 'nock';
import supertest, { agent } from 'supertest';
import session from 'express-session';

import api from '../../src/server/routes/api';
import conf from '../../src/server/configure';
import sessionConfig from '../../src/server/helpers/session';

/**
 * Universal route captures all, meaning we can't modify the app route stack
 * after the fact, hence configuring a new server.
 */
const app = Express();
const SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');

app.use(session(sessionConfig(conf)));
app.use('/api', api);

describe('purchases api', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('unauthorised user', () => {

    it('should return 401 from local server, not sca', (done) => {

      const body = {
        'stripe_token': 'foo'
      };

      // send the request via our handler
      supertest(app)
        .post('/api/purchases/customers')
        .send(body)
        .expect(401, {
          'message': 'No session'
        })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('authorised user', () => {

    // routes to populate req.session, persisted throughout test so we have
    // an authenticated session
    app.get('/test/mock-openid', (req, res) => {
      req.session.authenticated = true;
      res.send('<h1>Test</h1>');
    });

    app.get('/test/mock-macaroon', (req, res) => {
      req.session.authorization = authorization;
      res.send('Test');
    });

    const testagent = agent(app);
    const authorization = 'Macaroon root=foo discharge=bar';

    describe('agent setup for persisted session', () => {
      it('should mock openid authentication', (done) => {
        testagent
          .get('/test/mock-openid')
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });

      it('should mock the macaroon', (done) => {
        testagent
          .get('/test/mock-macaroon')
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('responses', () => {

      it('should stream responses from SCA customers endpoint', (done) => {

        const body = {
          'stripe_token': 'foo'
        };

        // mock the request to SCA
        const sca = nock(SCA_URL)
          .matchHeader('authorization', authorization)
          .post('/purchases/v1/customers', body)
          .reply(200);

        // send the request via our handler
        testagent
          .post('/api/purchases/customers')
          .send(body)
          .expect(200, (err) => {
            sca.done();
            done(err);
          });
      });

      it('should stream errors from SCA customers endpoint', (done) => {

        const body = {
          'stripe_token': 'foo'
        };

        // mock the request to SCA
        const sca = nock(SCA_URL)
          .matchHeader('authorization', authorization)
          .post('/purchases/v1/customers', body)
          .reply(500);

        // send the request via our handler
        testagent
          .post('/api/purchases/customers')
          .send(body)
          .expect(500, (err) => {
            sca.done();
            done(err);
          });
      });
    });
  });
});
