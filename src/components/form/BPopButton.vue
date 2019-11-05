<template>
  <div class="b-pop-checkList1">
    <md-popup
      v-model="popupShow"
      position="top"
      transition="fade"
    >
      <div class="b-pop-checkList-cnt1">
        <ul>
          <div style="background-color:white;height: 70px;">
        <p
          class="b-pop-checkList-item1"
           :class="[checkIds.some(v=>v===item.id) && 'active']"
            v-for="(item,index) in list"
            :key="index"
          @click="checkboxClick(item)"
        ><span class="b-pop-checkList-item-name">{{item.itemName}}</span></p>
      </div>
          <div>
            <p class="confirmbtn" @click="checkboxClickConfirm()">确定</p>
          </div>
        </ul>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {
  Popup,
  PopupTitleBar
} from 'mand-mobile';

export default {
  name: 'BPopButton',
  inheritAttrs: true,
  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitleBar
  },
  props: {
    // 类型：checkbox radio
    type: {
      type: String,
      default: 'checkbox'
    },
    defalutIds: {
      type: Array,
      default: () => []
    },
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 多选列表
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      popupShow: this.show,
      checkIds: JSON.parse(JSON.stringify(this.defalutIds)),
      tempC :[]
    };
  },
  watch: {
    show(newVal) {
      this.popupShow = newVal;
    },
    popupShow(newVal) {
      this.$emit('update:show', newVal);
    }
  },
  methods: {
    checkboxClick(item) {
      const index = this.checkIds.findIndex(id => id === item.id)
      if(index === -1){
        this.checkIds.push(item.id)
        this.tempC.push(item.itemCode)
      }else {
        this.checkIds.splice(index,1)
        this.tempC.splice(index,1)
      }
    },
    checkboxClickConfirm() {
      this.$emit('popButtonClicked', this.tempC);
      this.popupShow = false;
    },
    chooseGiftClick(item) {
      this.$emit('chooseGift', item);
    },
    confirm() {
      /* 确定 */
      this.$emit('input', this.checkIds);
      this.popupShow = false;
    }
  }
};
</script>

<style lang="scss">
  .b-pop-checkList1 {
    .md-popup-title-bar {
      // height: 100px;

      .title-bar-left {
        font-size: 28px;
        color: #BBB;
      }

      .title-bar-title {
        p.title {
          font-size: 28px;
          color: #333;
        }
      }

      .title-bar-right {
        font-size: 28px;
        color: #1969C6;
      }
    }
     .md-popup-mask{
    height: 1160px;
    top: 180px;
  }
  }

  .b-pop-checkList-cnt1 {
    background: #fff;
    padding-bottom: 24px;
    height: 240px;
  }

  .b-pop-checkList-item1 {
    padding-left: 24px;
  padding-right: 24px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #666666;
  border: 1px #cccccc solid;
  font-size: 24px;
  // width: 180px;
  border-radius: 30px;
  float: left;
  margin-top: 10px;
  margin-left: 24px;

    &.active {
       border-color: #1969C6;
      .b-pop-checkList-item-name{
        color: #1969C6;
      }
    }
  }

  .b-pop-checkList-icon {
    font-size: 32px;
    color: #1969C6;
  }
    .confirmbtn{
    font-size: 32px;
    color: white;
      background-color: #1969C6;
      text-align: center;
      padding: 15px;
      margin-left: 600px;
      border-radius: 20px;
      width: 120px;
      margin-top: 10px;
  }

  .b-pop-checkList-item-name {
    font-size: 28px;
    color: #666;
  }

  .b-pop-checkList-item-input {
    background: transparent;
    border: 0;
    height: 30px;
    font-size: 28px;
    color: #999;
    text-align: right;
    width: 320px;
    padding-right: 10px;
  }
  .md-popup-box{
    margin-top: 160px !important;
  }

</style>
