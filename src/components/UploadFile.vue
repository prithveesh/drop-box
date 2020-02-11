<template>
  <div class="container">
    <form enctype="multipart/form-data" novalidate>
      <h1>Drop Files</h1>
      <div class="dropbox">
        <input type="file" 
          multiple 
          :name="uploadFieldName"
          v-on:change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          class="input-file"
        />
          <p>Drag  and Drop</p>
      </div>
    </form>
    <div v-if="isSuccess">
      <h2>Uploaded {{ uploadedFiles.length }} files successfully.</h2>
    </div>
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<script>
  import { upload } from '../services/api';
  
  export default {
    name: 'UploadFile',
    props: {
      updateList: Function
    },
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        uploading: null,
        uploadFieldName: 'list',
        isSuccess: false,
        isFailed: false,
      }
    },
    computed: {
      
    },
    methods: {
      reset() {
        this.uploadedFiles = [];
        this.uploadError = null;
        this.isFailed = false;
        this.isSuccess = false;
      },
      submit(formData) {
        this.isSuccess = false;
        this.isFailed = false;
        upload(formData)
          .then(files => {
            this.isSuccess = true;
            this.uploadedFiles = files;
            this.updateList(files);
          })
          .catch(err => {
            this.isFailed = true;
            this.uploadError = err.response;
          });
      },
      filesChange(fieldName, fileList) {
        const formData = new FormData();
        if (!fileList.length) return;
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        this.submit(formData);
      }
    }
  }
</script>

<style lang="css">
  .dropbox {
    outline: 2px solid grey; /* the dash box */
    outline-offset: -10px;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: rgba(0, 0, 255, 0.3); /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>