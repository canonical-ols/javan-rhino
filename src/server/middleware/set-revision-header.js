import fs from 'fs';

// location and name of file is consistent across projects
const filename = './version-info.txt';
let revision = 'unknown';

try {
  // git rev-parse HEAD > version-info.txt
  revision = fs.readFileSync(filename, 'utf8').trim();
  // logger.debug(`Got X-VCS-revision as ${revision}`);
} catch(e) {
  // logger.info(`missing ${filename} cannot set correct X-VCS-revision)`);
}

export default (req, res, next) => {
  res.set('X-VCS-Revision', revision);
  next();
};
