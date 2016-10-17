import { app } from '../../src/server/server.js';
import conf from '../../src/server/configure';
import nock from 'nock';
import { agent } from 'supertest';

const SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');

describe('purchases api', () => {

  const authorization = 'Macaroon root=foo discharge=bar';
  let testagent;

  before(() => {
    // routes to populate req.session, persisted throughout test so we have
    // an authenticated session
    app.get('/test/mock-openid', (req, res) => {
      req.session.authenticated = true;
      res.send('Test');
    });

    app.get('/test/mock-macaroon', (req, res) => {
      req.session.authorization = authorization;
      res.send('Test');
    });

    testagent = agent(app);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('request.agent(app) setup', () => {
    it('should mock openid authentication', (done) => {
      testagent
      .get('/test/mock-openid')
      .expect(200, done);
    });

    it('should mock the macaroon', (done) => {
      testagent
      .get('/test/mock-macaroon')
      .expect(200, done);
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
