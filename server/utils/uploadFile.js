import { domain, basePath } from  '../constants';

function uploadFile(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were found.');
    return;
  }

  const list = req.files.list;
  const files = list.length ? list : [list];
  const uploadPathResponse = [];
  files.forEach((file, index) => {
    const uploadPath = `${basePath}${file.name}`;
    file.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      uploadPathResponse.push({ name: file.name, path: `${domain}/files/${file.name}`});
      if(index === files.length - 1) {
        res.status(200).send(uploadPathResponse);
      }
    })
  });
}

export default uploadFile;