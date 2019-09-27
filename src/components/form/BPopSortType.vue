<template>
  <div class="b-pop-checkList1">
    <md-popup
      v-model="popupShow"
      position="top"
      transition="fade"
    >
      <div class="b-pop-checkList-cnt">
        <ul>
          <li
            class="b-pop-checkList-item2"
            :class="[checkIds.some(v=>v===item.id) && 'active']"
            v-for="(item,index) in list"
            :key="index"
            @click="checkboxClick(item)"
          >
            <span class="b-pop-checkList-item-name">{{item.name}}</span>
              <i
                class="b-pop-checkList-icon iconfont"
                :class="[checkIds.some(v=>v===item.id) && 'icon-duihao']"
              ></i>
          </li>
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
  name: 'BPopSortType',
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
    value: {
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
      checkIds: JSON.parse(JSON.stringify(this.value))
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
    checkboxClick({ id }) {
      this.checkIds = [];
      this.checkIds.push(id)

      this.$emit('checkClick', this.checkIds);
      this.popupShow = false;

    },
  }
};
</script>

<style lang="scss">
  .b-pop-checkList1 {
    .md-popup-title-bar {
      height: 80px;
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

  .b-pop-checkList-cnt {
    background: #fff;
    /*padding-bottom: 24px;*/
  }

  .b-pop-checkList-item2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    height: 80px;
    border-bottom: 1px solid #D0D0D0;
    &.active {
      .b-pop-checkList-item-name {
        color: #1969C6;
      }
    }
  }

  .b-pop-checkList-icon {
    font-size: 32px;
    color: #1969C6;
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
    margin-top: 170px !important;
  }

</style>
