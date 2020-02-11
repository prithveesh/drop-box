import fs from 'fs';
import { basePath, domain } from  '../constants';

function getFiles(req, res) {
  fs.readdir(basePath, function (err, files) {
      if (err) {
        return res.status(500).send('Unable to scan directory: ' + err);
      }
      const result = files.reduce((list, file) => {
          list.push({ name: file, path: `${domain}/files/` + file});
          return list;
      }, []);

      res.status(200).send(result);
  });
}

export default getFiles;