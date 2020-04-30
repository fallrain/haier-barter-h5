<template>
  <div class="bSearchInput-par">
    <div class="bSearchInput-wrap">
      <form :target="iframeId" class="bSearchInput-form" action="#">
        <input
          class="bSearchInput"
          type="search"
          :placeholder="placeholder"
          v-model="searchVal"
          @keyup.enter="searchClick"
        >
        <iframe :name="iframeId" style="display: none;"></iframe>
      </form>
      <i
        class="iconfont icon-fangdajing"
        @click="searchClick"
      ></i>
    </div>
    <div class="bSearchInput-right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BSearchInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data() {
    return {
      iframeId: `BSearchInput${new Date().getTime()}`
    };
  },
  computed: {
    searchVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    searchClick() {
      /* 搜索 */
      this.$emit('search', this.searchVal);
    },
  }
};
</script>

<style lang="scss">
  .bSearchInput-par {
    display: flex;
    align-items: center;
    width: 100%;
    height: 92px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .bSearchInput-wrap {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 602px;
    height: 60px;
    padding-left: 24px;
    padding-right: 24px;
    border-radius: 30px;
    background: #fff;
    font-size: 0;

    .iconfont {
      font-size: 32px;
      color: #BBB;
    }
  }

  .bSearchInput {
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 28px;
  }

  .bSearchInput-right {
    margin-left: 16px;
    flex-shrink: 0;
  }

  .bSearchInput-form {
    width: 100%;
  }
</style>
