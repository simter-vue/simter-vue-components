<template>
  <div :class="['st-upload', classes.root]">
    <!-- header -->
    <div :class="['header', classes.header]">
      <span class="summary">{{summary(count, size, prettySize)}}</span>
      <a href="#" :class="['operation', classes.operation]" @click.stop="selectFile">{{text.selectFile}}</a>
    </div>
    <!-- files -->
    <ul :class="['files', classes.files]">
      <li :class="['file', classes.file]" v-for="(file, index) in files">
        <span :class="'file-icon ' + file.type"></span>
        <div>
          <input v-if="editable" type="text" :class="['name', classes.name]" v-model="file.name">
          <div v-else :class="['name', classes.name]">{{file.name}}</div>

          <div :class="['other', classes.other]">
            <div :class="['size', classes.size]">{{file.prettySize}}</div>
            <st-progressbar :percent="file.percent"></st-progressbar>
            <a v-if="file.percent === 0" href="#" :class="['operation', classes.operation]" @click.stop="removeFile(file)">{{text.delete}}</a>
          </div>
        </div>
      </li>
    </ul>
    <!-- hidden -->
    <input v-if="multiple" type="file" name="file" style="display:none" multiple
      :accept="accept" @change="afterSelectedFile($event.target.files)">
    <input v-else type="file" name="file" style="display:none"
      :accept="accept" @change="afterSelectedFile($event.target.files)">
  </div>
</template>

<script>
/**
 * File upload component.
 *
 * Events:
 * 1. progress({index, name, size, percent})
 * 2. start([{name, size, percent}, ...])
 * 3. success([result, ...])
 * 4. error(e)
 */
import { gv, getFileExtension, getPrettySize, uploadOneFile } from "./utils";
import stProgressbar from "./progressbar.vue";
export default {
  components: { stProgressbar },
  props: {
    /**
     * the server upload to.
     * 1. String - fixed server url
     * 2. Function - generate the server url with option '{index, name, size, type}'
     */
    url: {type: [String, Function], required: true},
    // Whether allow edit file name
    editable: {type: Boolean, required: false, default: true},
    // Whether allow select multiple files
    multiple: {type: Boolean, required: false, default: true},
    // Whether allow auto start upload after selected files
    auto: {type: Boolean, required: false, default: true},
    // the limitation of file types, default no limitation
    accept: {type: String, required: false, default: '*.*'},
    // element class: { root, header, files, file, name, size, other, operation, progress }
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.upload.classes", {})
    },
    text: {
      type: Object,
      required: false,
      default: () => gv("simter.upload.text", {
        selectFileFirst: 'Please select file first.',
        selectFile: 'Select file',
        delete: 'Delete'
      })
    },
    summary: {
      type: Function,
      required: false,
      default: gv("simter.upload.summary", function(count, _size, prettySize) {
        return `${count} files ${prettySize}`;
      })
    }
  },
  data: function () {
    return {
      // the selected files
      files: []
    }
  },
  computed: {
    count: function () {
      return this.files.length;
    },
    size: function () {
      return this.files.reduce((previousValue, currentValue) => previousValue + currentValue.size, 0);
    },
    prettySize: function () {
      return getPrettySize(this.size);
    }
  },
  methods: {
    selectFile: function () {
      this.$el.querySelector('input[type="file"]').click();
    },
    afterSelectedFile: function (files) {
      // cache files
      Array.from(files).forEach(file => {
        if (this.files.every(f => f.name !== file.name)) this.files.push({
          name: file.name,
          // original file
          file: file,
          size: file.size,
          // pretty file size, such as '1KB'
          prettySize: getPrettySize(file.size),
          // get file extension, such as 'png'
          type: getFileExtension(file.name),
          // upload percent: 0~100
          percent: 0
        });
      });

      // auto upload
      if (this.auto) this.startUpload();
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    // manual start the upload
    startUpload() {
      if (this.count === 0) return alert(this.text.selectFileFirst);

      // emits upload start event
      this.$emit("start", this.files.map(f => ({
        name: f.name,
        size: f.size,
        percent: f.percent
      })));

      // upload file one by one
      let p = Promise.resolve();
      let results = []
      for (let i = 0; i < this.files.length; i++) {
        let f = this.files[i];
        if (f.percent > 0) continue;

        // get server url
        let serverUrl;
        if (typeof this.url === 'function') {
          serverUrl = this.url.call(this, {
            index: i,
            name: f.name,
            size: f.size,
            type: getFileExtension(f.name)
          });
        } else serverUrl = this.url;

        p = p.then(() => uploadOneFile.call(null, {
          index: i,
          file: f.file,
          url: serverUrl,
          progress: data => {
            f.percent = data.percent;
            // emits upload progress event
            this.$emit("progress", data);
          },
          start: xhr => {
            console.log("start");
          }
        }).then(result => {
          results.push(result);
        }));
      }
      p.then(result => {
        // emits upload success event
        this.$emit("success", results);
      }).catch(e => this.$emit("error", e)); // emits upload failed event
    }
  }
};
</script>

<style>
.st-upload {
  display: flex;
  flex-direction: column;
}
.st-upload .st-progressbar {
  min-width: 10em;
  flex-grow: 1;
}
.st-upload .operation {
  margin: auto 6px;
}

.st-upload > .header {
  margin: 0.25em 0.5em;
}

.st-upload > .files {
  overflow: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 0 0 0.5em 0;
  padding: 0;
}

.st-upload > .files > .file {
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0 0 5px;
}

.st-upload > .files > .file > .file-icon {
  display: block;
  text-indent: -99999px;
  overflow: hidden;
  width: 32px;
  height: 32px;
}

.st-upload > .files > .file > div {
  margin-left: 5px;
  flex-grow: 1;
}

.st-upload > .files > .file > div > input {
  font: inherit;
  border: none;
  width: auto;
}

.st-upload > .files > .file > div > .other {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.st-upload > .files > .file > div > .other > .size {
  min-width: 5em;
}
</style>
