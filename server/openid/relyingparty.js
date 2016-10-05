import openid from 'openid';
import conf from '../configure.js';
import { Macaroons } from './extensions';

openid['Macaroons'] = Macaroons;

const OPENID_VERIFY_URL = conf.get('SERVER:OPENID:VERIFY_URL');
const MU_URL = conf.get('UNIVERSAL:MU_URL');

export default (cid) => {
  const extensions = [
    new openid.SimpleRegistration({
      'email' : 'required',
      'fullname' : 'required'
    })
  ];

  if (cid) {
    extensions.push(
      new openid.Macaroons(cid)
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
