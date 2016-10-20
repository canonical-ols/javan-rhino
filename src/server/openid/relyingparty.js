import openid from 'openid';
import conf from '../configure.js';
import { Macaroons } from './extensions';

openid['Macaroons'] = Macaroons;

const OPENID_VERIFY_URL = conf.get('SERVER:OPENID:VERIFY_URL');
const MU_URL = conf.get('UNIVERSAL:MU_URL');

const saveAssociation = (session) => {
  return (provider, type, handle, secret, expiry_time_in_seconds, callback) => {
    setTimeout(() => {
      openid.removeAssociation(handle);
    }, expiry_time_in_seconds * 1000);

    session.association = {
      provider,
      type,
      secret
    };
    callback(null); // Custom implementations may report error as first argument
  };
};

const loadAssociation = (session) => {
  return (handle, callback) => {
    if (session.association) {
      callback(null, session.association);
    } else {
      callback(null, null);
    }
  };
};

const removeAssociation = (session) => {
  return () => {
    delete session.association;
    return true;
  };
};


const RelyingPartyFactory = (session) => {

  openid.saveAssociation = saveAssociation(session);
  openid.loadAssociation = loadAssociation(session);
  openid.removeAssociation = removeAssociation(session);

  const extensions = [
    new openid.SimpleRegistration({
      'email' : 'required',
      'fullname' : 'required'
    })
  ];

  if (session.cid) {
    extensions.push(
      new openid.Macaroons(session.cid)
    );
  }
  return new openid.RelyingParty(
    OPENID_VERIFY_URL,
    MU_URL,
    false, // Use stateless verification
    false, // Strict mode
    extensions
  );
};

export { RelyingPartyFactory as default,
  loadAssociation,
  saveAssociation,
  removeAssociation
};
