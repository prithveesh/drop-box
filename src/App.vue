<template>
  <div id="app">
    <ListOfFiles v-bind:uploadedList="updatedList" />
    <UploadFile v-bind:updateList="updateList" />
  </div>
</template>

<script>
import UploadFile from './components/UploadFile.vue'
import ListOfFiles from './components/ListOfFiles.vue'

export default {
  name: 'App',
  components: {
    UploadFile,
    ListOfFiles
  },
  data() {
    return {
      updatedList: [],
    }
  },
  methods: {
    updateList(list) {
      this.updatedList = list;
      console.log(list);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
