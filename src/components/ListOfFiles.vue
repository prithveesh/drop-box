<template>
  <div class="container">
    <h1>File List</h1>
    <div class="list">
      <div v-if="hasFiles">
        <ul>
          <li v-for="index in fileList.length" :key="fileList[index - 1].name">
            <input type="checkbox" v-bind:value="fileList[index - 1].name" v-on:change="filesSelected"/>
            <a v-bind:href="fileList[index - 1].path" target="_blank" download>{{fileList[index - 1].name}}</a>
          </li>
        </ul>
        <button type="button" v-on:click="deleteFiles">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getFiles, deleteFiles } from '../services/api';
  
  export default {
    name: 'ListOfFiles',
    props: {
      uploadedList: Array
    },
    computed: {
      hasFiles() {
        return this.fileList && this.fileList.length > 0
      }
    },
    data() {
      return {
        fileList: [],
        filesToBeDeleted: {}
      }
    },
    mounted: function() {
      const fetchFiles = async () => {
        await getFiles().then(res => {
          this.fileList = res
        });
      }
      fetchFiles();
    },
    watch: {
      uploadedList(param) {
        if(param && param.length) {
          this.fileList.push(...param);
        }
      }
    },
    methods: {
      filesSelected(event) {
        if(event.target.checked) {
          this.filesToBeDeleted[event.target.value] = true;
        } else {
          delete this.filesToBeDeleted[event.target.value];
        }
      },
      async deleteFiles() {
        const fileList = Object.keys(this.filesToBeDeleted);
        if(fileList.length) {
          this.fileList = await deleteFiles(fileList);
        }
        this.filesToBeDeleted = [];
      }
    }
  }
</script>

<style lang="css" scoped>
  .list {
    outline: 2px solid grey; /* the dash box */
    outline-offset: -10px;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .list p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>