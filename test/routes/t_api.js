import { app } from '../../server/server.js';
import conf from '../../server/configure';
import nock from 'nock';
import { agent } from 'supertest';

describe('purchases api', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  const authorization = 'Macaroon root=foo discharge=bar';

  // test only routes to populate session
  app.get('/test/mock-openid', (req, res) => {
    req.session.authenticated = true;
    res.send('Test');
  });

  app.get('/test/mock-macaroon', (req, res) => {
    req.session.authorization = authorization;
    res.send('Test');
  });

  // persist request with superagent.agent()
  const testagent = agent(app);

  it('should mock openid', (done) => {
    testagent
      .get('/test/mock-openid')
      .expect(200, done);
  });

  it('should mock the session', (done) => {
    testagent
      .get('/test/mock-macaroon')
      .expect(200, done);
  });

  it('should stream responses from SCA customers endpoint', (done) => {

    const body = {
      'stripe_token': 'foo'
    };

    // mock the request to SCA
    const sca = nock(conf.get('UBUNTU_SCA:URL'))
      .matchHeader('authorization', authorization)
      .post('/purchases/v1/customers', body)
      .reply(200);

    // send the request via our handler
    testagent
      .post('/api/purchases/customers')
      .send(body)
      .expect(200, () => {
        sca.done();
        done();
      });
  });

  it('should stream responses from SCA orders endpoint', (done) => {

    const body = {
      'stripe_token': 'foo'
    };

    // mock the request to SCA
    const sca = nock(conf.get('UBUNTU_SCA:URL'))
      .matchHeader('authorization', authorization)
      .post('/purchases/v1/orders', body)
      .reply(200);

    // send the request via our handler
    testagent
      .post('/api/purchases/orders')
      .send(body)
      .expect(200, () => {
        sca.done();
        done();
      });
  });


});
