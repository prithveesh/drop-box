import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { basePath } from './constants';
import uploadFile from './utils/uploadFile';
import deleteFile from './utils/deleteFile';
import getFiles from './utils/getFiles';

const  app =  express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/files', express.static(basePath));
app.post('/delete', deleteFile);
app.use('/files', getFiles);
app.post('/upload', uploadFile);

app.listen(8181, () => {
  if (!fs.existsSync(basePath)){
    fs.mkdirSync(basePath);   
  }
  console.log("Server is listening on port: 8181");
});