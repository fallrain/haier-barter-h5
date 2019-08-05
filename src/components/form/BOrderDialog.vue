<template>
  <div class="order-page-bg" @click="dismissDialog()">
    <div class="order-dialog-bg">
      <div class="order-content-bg">
        <div class="order-dialog-title" v-if="dialogContent.title">
          {{dialogContent.title}}
        </div>
        <div class="order-dialog-content">{{dialogContent.content}}</div>
        <div>
          <slot name="add-content"></slot>
        </div>
        <div class="order-dialog-btns">
          <button class="order-dialog-left" v-if="dialogContent.leftText"
                  :class="{'order-left-text-fill': !dialogContent.rightText}"
                  :style="{color:dialogContent.leftColor?dialogContent.leftColor:'#ccc'}">
            {{dialogContent.leftText}}
          </button>
          <button class="order-dialog-right" v-if="dialogContent.rightText"
                  :class="{'order-right-text-fill': !dialogContent.leftText}"
                  :style="{color:dialogContent.rightColor?dialogContent.rightColor:'#4A90E2'}">
            {{dialogContent.rightText}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BOrderDialog',
  props: {
    dialogContent: {
      title: '标题',
      content: '111111111122222222222222222223333333333333333333333332222222222222222222',
      leftText: '左边',
      rightText: '右边',
      leftColor: '',
      rightColor: ''
    },
    isOpen: true,
  },
  methods: {
    dismissDialog() {
      this.$emit('update:isOpen', false);
    }
  }
};
</script>

<style lang="scss">
  .order-page-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0;
    padding: 0;
    position: absolute;
  }


  .order-page-bg:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }


  .order-dialog-bg {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 150px);
    height: auto;
    margin-left: 75px;
    margin-right: 75px;
    background: #fff;
    border-radius: 10px;
  }

  .order-content-bg {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    word-wrap: break-word;
    align-items: stretch;
    flex-direction: column;
  }

  .order-dialog-content {
    width: calc(100% - 80px);
    height: auto;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 37px;
    font-size: 28px;
    line-height: 48px;
    color: #000;
  }

  .order-dialog-title {
    text-align: center;
    margin-top: 40px;
  }

  .order-dialog-btns {
    width: 100%;
    height: 88px;
    margin-top: 45px;
    border-top: 2px solid #F5F5F5;
  }

  .order-dialog-left {
    width: 50%;
    height: 88px;
    background: #fff;
    font-size: 30px;
    border-bottom-left-radius: 10px;
  }

  .order-dialog-right {
    width: 50%;
    height: 88px;
    background: #fff;
    font-size: 30px;
    border-left: 2px solid #F5F5F5;
    border-bottom-right-radius: 10px;
  }

  .order-left-text-fill {
    width: 100%;
    border-bottom-right-radius: 10px;
  }

  .order-right-text-fill {
    width: 100%;
    border-bottom-left-radius: 10px;
  }

</style>
