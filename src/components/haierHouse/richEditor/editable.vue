<template>
  <div ref="editor" contenteditable="true" @input="update" :placeholder="contentplaceholder||'请输入文字'" class="editor v-html">
    <slot></slot>
  </div>
</template>
<script>
import lrz from 'lrz';

export default {
  name: 'richEditor',
  data() {
    return {
      hasfocus: false,
      n: true // 只需要监听一次
    };
  },
  props: ['content', 'contentplaceholder'],
  mounted() {
    if (this.content) this.$el.innerHTML = this.content;
    this.$refs.editor.addEventListener('paste', (e) => {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        if (e.clipboardData.items[i].kind === 'file' && /image\//.test(e.clipboardData.items[i].type)) {
          const imageFile = e.clipboardData.items[i].getAsFile();
          this.uploadImg(imageFile);
          e.preventDefault();
          break;
        }
        if (e.clipboardData.items[i].kind === 'string') {
          e.clipboardData.items[i].getAsString((a) => {});
        }
      }
    });
    this.$refs.editor.addEventListener('focus', (e) => {
      this.hasfocus = true;
    });
    this.$refs.editor.addEventListener('blur', (e) => {
      this.hasfocus = false;
    });
  },
  computed: {},
  methods: {
    update(event) {
      if (event.target.innerHTML == '') {
        this.n = false;
      } else {
        this.$emit('update', event.target.innerHTML);
      }
    },
    addImg(imgurl) {
      const imgelement = document.createElement('img');
      imgelement.setAttribute('src', imgurl);
      imgelement.style = 'max-width:100%';
      const br = document.createElement('br');
      this.$refs.editor.appendChild(br);
      this.$refs.editor.appendChild(imgelement);
      this.$refs.editor.appendChild(br);
      this.$refs.editor.appendChild(br);
      this.$emit('addimg', imgurl);
    },
    setText(text) {
      this.$el.innerHTML = text;
    },
    uploadImg(file) {
      if (!file) return false;
      lrz(file).then((res) => {
        this.addImg(res.base64);
      });
    }
  },
  watch: {
    content(o) {
      if (this.n) {
        this.n = false;
        this.$el.innerHTML = o;
        let range = null;
        if (window.getSelection) {
          this.$el.focus();
          range = window.getSelection();
          range.selectAllChildren(this.$el);
          range.collapseToEnd();
        } else if (document.selection) {
          range = document.selection.createRange();
          range.moveToElementText(this.$el);
          range.collapse(false);
          range.select();
        }
      }
    }
  }
};
</script>
<style scoped>
.editor:empty::before {
  color: #969da0;
  content: attr(placeholder);
}
</style>
