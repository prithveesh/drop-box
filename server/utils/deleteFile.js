import fs from 'fs';
import { basePath } from  '../constants';
import getFiles from './getFiles';

function deleteFile (req, res){
  const reqBody = req.body;
  let filesToDelete = req.body;
	if (typeof reqBody === 'string') {
		filesToDelete = JSON.parse(reqBody);
  }
  try {
    if(filesToDelete.length) {
      filesToDelete.forEach(fileToDelete => fs.unlinkSync(basePath + fileToDelete));
    }
  } catch(err) {
    return res.status(500).send('Error in deleting: ' + err);
  }
  
  getFiles(req, res);
  // res.status(200).send('deleted: ' + filesToDelete.length);
}

export default deleteFile;