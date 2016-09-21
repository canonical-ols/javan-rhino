import expect from 'expect';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

let MemcachedStoreStub = () => {};

let sessionStorageConfig = proxyquire(
  '../../../../server/helpers/session',
  getStubDependencies()
).default;

describe('The session helper', () => {
  context('when memcached config is set', () => {
    let config;
    let mockConfig = {};

    beforeEach(() => {
      mockConfig.get = sinon.stub();
      mockConfig.get.withArgs('SESSION:MEMCACHED_HOST').returns('127.0.0.1:8000');
      mockConfig.get.withArgs('SESSION:MEMCACHED_SECRET').returns('secret');
      config = sessionStorageConfig(mockConfig);
    });

    it('should return a Memcached session store', () => {
      expect(config.store).toBeA(MemcachedStoreStub);
    });
  });

  context('when memcached config is not set', () => {
    let config;
    let mockConfig = {};

    beforeEach(() => {
      mockConfig.get = sinon.stub();
      mockConfig.get.withArgs('SESSION:MEMCACHED_HOST').returns(null);
      mockConfig.get.withArgs('SESSION:MEMCACHED_SECRET').returns(null);
      config = sessionStorageConfig(mockConfig);
    });

    it('should not return a session store', () => {
      expect(config.store).toNotExist();
    });
  });

  context('when session secret config is set', () => {
    let config;
    let mockConfig = {};

    beforeEach(() => {
      mockConfig.get = sinon.stub();
      mockConfig.get.withArgs('SESSION:SECRET').returns('TEST');
      config = sessionStorageConfig(mockConfig);
    });

    it('should note return a session store', () => {
      expect(config.secret).toEqual('TEST');
    });
  });

  context('when session secret config is not set', () => {
    let config;
    let mockConfig = {};

    beforeEach(() => {
      mockConfig.get = sinon.stub();
      mockConfig.get.withArgs('SESSION:SECRET').returns(null);
      config = sessionStorageConfig(mockConfig);
    });

    it('should note return a session store', () => {
      expect(config.secret).toEqual('1234');
    });
  });
});

function getStubDependencies() {
  return {
    'connect-memcached': () => (MemcachedStoreStub),
    crypto: {
      randomBytes: () => {
        return {
          toString: () => '1234'
        };
      }
    }
  };
}
