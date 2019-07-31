<template>
  <div class="bSearchInput-par">
    <div class="bSearchInput-wrap">
      <input
        class="bSearchInput"
        type="text"
        placeholder="点击搜索型号"
        v-model="searchVal"
      >
      <i
        class="iconfont icon-fangdajing"
        @click="searchClick"
      ></i>
    </div>
    <div class="bSearchInput-scan-wrap">
      <i class="iconfont icon-saomiao"></i>
      <span class="bSearchInput-scan-inf">扫描</span>
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
    }
  },
  computed: {
    searchVal: {
      get(val) {
        return val;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  created() {
    this.searchVal = this.value;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 602px;
    height: 60px;
    padding-left: 24px;
    padding-right: 24px;
    border-radius: 30px;
    background: #fff;

    .iconfont {
      font-size: 32px;
      color: #BBB;
    }
  }

  .bSearchInput {
    border: 0;
    height: 100%;
    font-size: 28px;
  }

  .bSearchInput-scan-wrap {
    display: flex;
    align-items: center;
    color: #1969C6;
    margin-left: 16px;

    .icon-saomiao {
      font-size: 40px;
    }
  }

  .bSearchInput-scan-inf {
    line-height: 1;
    margin-left: 12px;
    font-size: 10px;
    writing-mode: vertical-lr;
  }
</style>
