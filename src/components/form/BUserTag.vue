<template>
  <div>
    <div class="order-commit-tag">
      <div class="order-commit-tag-title">
        <span>{{getData.title}}</span>
        <div class="order-commit-tag-desc">
          <i class="iconfont icon-dianzan order-commit-tag-zanimg"
             v-if="!usefulCount.isChecked"
             @click="btnClickUsefulCount()"></i>
          <i class="iconfont icon-dianzan order-commit-tag-zanimg-click"
             v-if="usefulCount.isChecked"
             @click="btnClickUsefulCount()"></i>
          <span class=" order-commit-tag-text" @click="btnClickUsefulCount()">有用({{usefulCount.count}})</span>
          <i class="iconfont icon-dianzan-copy order-commit-tag-img"
             v-if="!unusefulCount.isChecked"
             @click="btnClickUnusefulCount()"></i>
          <i class="iconfont icon-dianzan-copy order-commit-tag-img-click"
             v-if="unusefulCount.isChecked"
             @click="btnClickUnusefulCount()"
          ></i>
          <span class="order-commit-tag-text" @click="btnClickUnusefulCount()">没用({{unusefulCount.count}})</span>
        </div>
      </div>
      <div class="order-commit-tag-child">
        <button
          class="order-commit-tag-child-btn"
          :class="[item.isChecked && 'active']"
          v-for="(item,index) in getData.tagList"
          :key="index"
          @click.stop="btnClick(index)"
        >{{item.content}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// 双向绑定： .sync, 也可以实现自定义组件v-model
export default {
  name: 'BUserTag',
  props: {
    getData: {
      title: '',
      tagList: {
        type: Array,
        default: () => [{
          content: '',
          isChecked: false
        }]
      }
    },
    usefulCount: {
      count: 0,
      isChecked: false
    },
    unusefulCount: {
      count: 0,
      isChecked: false
    }
  },
  methods: {
    btnClick(index) {
      this.$set(this.getData.tagList[index], 'isChecked', !this.getData.tagList[index].isChecked);
      this.$emit('update:getData', this.getData);
    },
    btnClickUnusefulCount() {
      if (this.unusefulCount.isChecked) {
        --this.unusefulCount.count;
        this.unusefulCount.isChecked = false;
      } else {
        ++this.unusefulCount.count;
        this.unusefulCount.isChecked = true;
      }
      this.$emit('update:unusefulCount', this.unusefulCount);
    },
    btnClickUsefulCount() {
      if (this.usefulCount.isChecked) {
        --this.usefulCount.count;
        this.usefulCount.isChecked = false;
      } else {
        ++this.usefulCount.count;
        this.usefulCount.isChecked = true;
      }
      this.$emit('update:usefulCount', this.usefulCount);
    }
  },
  data() {

  },
  watch: {}
};
</script>


<style lang="scss">
  .order-commit-tag {
    margin-top: 16px;
    margin-right: 24px;
    margin-left: 24px;
    background: #fff;
    border: 1px;
    border-radius: 8px;
    padding: 24px;
  }

  .order-commit-tag-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;
  }

  .order-commit-tag-desc {
    display: flex;
    flex-direction: row
  }

  .order-commit-tag-zanimg {
    color: #CCCCCC;
    font-size: 30px;
  }

  .order-commit-tag-zanimg-click {
    color: red;
    font-size: 30px;
  }

  .order-commit-tag-img {
    margin-left: 26px;
    transform: scaleX(-1);
    color: #CCCCCC;
    font-size: 30px;
  }

  .order-commit-tag-img-click {
    margin-left: 26px;
    transform: scaleX(-1);
    color: red;
    font-size: 30px;
  }

  .order-commit-tag-text {
    margin-left: 17px;
    font-size: 24px;
    color: #999;
  }

  .order-commit-tag-child {
    display: flex;
    flex-wrap: wrap;
    /*align-items: center;*/
  }

  .order-commit-tag-child-btn {
    width: calc(25% - 19px);
    height: 48px;
    border: 1px solid #D0D0D0;
    border-radius: 8px;
    background: #fff;
    margin-top: 16px;
    color: #666;
    font-size: 24px;
    margin-right: 25px;

    &:nth-child(4n) {
      margin-right: 0;
    }
    &.active{
      color: #F5A623;
      border: 1px solid #F5A623;
    }
  }
</style>
