import fs from 'fs';

import logging from '../logging';

const logger = logging.getLogger('express');

// location and name of file is consistent across projects
const filename = './version-info.txt';
let revision = 'unknown';

try {
  // git rev-parse HEAD > version-info.txt
  revision = fs.readFileSync(filename, 'utf8').trim();
  logger.debug(`Got X-VCS-revision as ${revision}`);
} catch(e) {
  logger.info(`Missing '${filename}', cannot set correct X-VCS-revision header`);
}

export default (req, res, next) => {
  res.set('X-VCS-Revision', revision);
  next();
};
