import openid from 'openid';
import conf from '../configure.js';
import { Teams, Macaroons } from './extensions';

openid['LaunchpadTeams'] = Teams;
openid['Macaroons'] = Macaroons;



export default (cid) => {
  const extensions = [
    new openid.SimpleRegistration({
      'nickname' : true,
      'email' : true,
      'fullname' : true,
      'language' : true
    }),
    new openid.LaunchpadTeams(conf.get('OPENID:TEAMS'))
  ];

  if (cid) {
    extensions.push(
      new openid.Macaroons(cid)
    );
  }
  return new openid.RelyingParty(
    conf.get('OPENID:VERIFY_URL'),
    conf.get('OPENID:REALM'),
    false, // Use stateless verification
    false, // Strict mode
    extensions
  );
};
