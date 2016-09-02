import { MacaroonsBuilder } from 'macaroons.js';
import conf from '../configure';

/**
 * @param {String} macaroon serialized macaroon
 * @return {String} login.ubuntu.com cid
**/
export const extractCaveatId = (macaroon) => {
  let m = MacaroonsBuilder.deserialize(macaroon);
  let ssocid;
  m.inspect();

  m.caveatPackets.some((packet) => {
    if (packet.valueAsText === conf.get('UBUNTU_SSO_HOST')) {
      return true;
    }
    if (packet.type === 3) {
      ssocid = packet.valueAsText;
    }
  });

  return ssocid;
};


/** Format a macaroon and it's associated discharge
 * @param {Object}
 * @return {String} A string suitable to use in an Authorization header.
**/
export const formatMacaroonAuthHeader = (macaroon, discharge) => {

  let macaroonObj = MacaroonsBuilder.deserialize(macaroon);
  let dischargeObj = MacaroonsBuilder.deserialize(discharge);

  let dischargeBound = MacaroonsBuilder.modify(macaroonObj)
    .prepare_for_request(dischargeObj)
    .getMacaroon();

  let auth = `macaroon root="${macaroon}", discharge="${dischargeBound.serialize()}"`;

  return auth;
};
