<template>
  <div class="b-address-checkList">
    <md-popup
      v-model="popupShow"
      position="bottom"
    >
      <md-popup-title-bar
        v-bind="$attrs"
        ok-text="添加新地址"
        cancel-text="地址列表"
        @confirm="addNewClick"
        @cancel="emptyFn"
      ></md-popup-title-bar>
      <div class="b-address-checkList-cnt">
        <ul>
          <li
            class="b-address-checkList-item"
            v-for="(item,index) in list"
            :key="index"
            @click="addressClick(item)"
          >
            <div class="b-address-checkList-item-portrait">{{item.familyItemCode}}</div>
            <div class="b-address-checkList-item-cnt">
              <div class="b-address-checkList-item-cnt-name">
                <span class="mr26">{{item.userName}}</span><span>{{item.mobile}}</span>
              </div>
              <p class="b-address-checkList-item-cnt-ads">{{item.address}}</p>
            </div>
            <div class="b-address-checkList-opr">
              <button type="button" class="b-address-checkList-opr-btn" @click="editAddress(item)">编辑</button>
            </div>
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
  name: 'BPopAddressList',
  inheritAttrs: true,
  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitleBar
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 地址列表
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      popupShow: this.show,
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
    addressClick(item) {
      /* 地址条目click */

      debugger;
      this.$emit('clickAddress', item);
      this.popupShow = false;
    },
    addNewClick(item) {
      /* 添加新地址click */
      this.$emit('addNew', item);
    },
    editAddress(item) {
      // 编辑地址
      this.$emit('editAddress', item);
    },
    emptyFn() {}
  }
};
</script>

<style lang="scss">
  .b-address-checkList {
    .md-popup-title-bar {
      height: 80px;

      .title-bar-left {
        font-size: 30px;
        color: #333;
      }

      .title-bar-title {
        p.title {
          font-size: 28px;
          color: #333;
        }
      }

      .title-bar-right {
        font-size: 24px;
        color: #F5A026;
      }
    }
  }

  .b-address-checkList-cnt {
    background: #fff;
    padding-bottom: 24px;
    height: 652px;
    overflow-y: auto;
  }

  .b-address-checkList-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    height: 156px;
    border-bottom: 1px solid #D0D0D0;
  }

  .b-address-checkList-item-portrait {
    display: flex;
    align-items: center;
    width: 72px;
    height: 72px;
    margin-right: 16px;
    padding: 10px;
    background: #CCC;
    color: #fff;
    border-radius: 100%;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }

  .b-address-checkList-item-cnt {
    color: #333;
  }

  .b-address-checkList-item-cnt-name {
    font-size: 28px;
    line-height: 1;
    margin-bottom: 20px;
  }

  .b-address-checkList-item-cnt-ads {
    width: 520px;
    font-size: 24px;
    line-height: 36px;
  }

  .b-address-checkList-opr {
    display: flex;
    align-items: center;

    &:before {
      display: block;
      content: '';
      width: 1px;
      height: 40px;
      background: #D0D0D0;
      margin-right: 24px;
    }
  }

  .b-address-checkList-opr-btn {
    color: #1969C6;
    font-size: 24px;
    background: transparent;
  }
</style>
