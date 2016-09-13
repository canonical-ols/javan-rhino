import expect from 'expect';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

let sessionStorage = proxyquire('../../../../server/helpers/sessionStorage', {
  'connect-mongo': {
    __esModule: true,
    '@noCallThru': true,
    default: () => {
      return () => {};
    }
  }
}).default;

describe('The session storage middleware', () => {
  let settings;
  let conf;

  context('when database config is not provided', () => {
    beforeEach(() => {
      conf = {
        get: sinon.stub().withArgs(['DATABASE']).returns(undefined)
      };

      settings = sessionStorage(conf);
    });

    it('should return memory store config', () => {
      expect(settings.store).toNotExist();
    });
  });

  context('when database config is provided', () => {
    beforeEach(() => {
      conf = {
        get: sinon.stub()
          .withArgs(['DATABASE']).returns(undefined)
          .withArgs(['DATABASE:URL']).returns('localhost')
          .withArgs(['DATABASE:SECRET']).returns('A DIFFERENT SECRET')
      };
      settings = sessionStorage(conf);
    });

    it('should return database store config', () => {
      expect(settings.store).toExist();
    });
  });
});
