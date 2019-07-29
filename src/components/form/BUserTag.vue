<template>
  <div>
    <div class="order-commit-tag">
      <div class="order-commit-tag-title">
        <span>年龄层次</span>
        <div class="order-commit-tag-desc">
          <i class="iconfont icon-dianzan order-commit-tag-zanimg"></i>
          <span class="order-commit-tag-text">有用(666)</span>
          <i class="iconfont icon-dianzan-copy order-commit-tag-img"></i>
          <span class="order-commit-tag-text">没用(222)</span>
        </div>
      </div>
      <div class="order-commit-tag-child">
        <button
          class="order-commit-tag-child-btn"
          :class="[
            1+1===2 && 'active'
          ]"
        >70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
        <button class="order-commit-tag-child-btn">70后</button>
      </div>
    </div>
  </div>
</template>

<script>
// 双向绑定： .sync, 也可以实现自定义组件v-model
export default {
  name: 'BUserTag',
  props: {},
  methods: {}
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

  .order-commit-tag-img {
    margin-left: 26px;
    transform: scaleX(-1);
    color: #CCCCCC;
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
      color: red;
    }
  }
</style>
