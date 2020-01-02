<template>
  <div class="bEvaluateProductList-par">
    <ul class="bEvaluateProductList">
      <b-evaluate-product-item
        v-for="(item,index) in list"
        :key="index"
        :data="item"
        :isChecked.sync="item.isChecked"
        :checkMode="multiChooseMode"
        @onChecked="itemChecked"
      ></b-evaluate-product-item>
    </ul>
    <div
      v-if="multiChooseMode"
      class="bEvaluateProductList-chooseAll-btm"
    >
      <div
        class="bEvaluateProductList-chooseAll"
        @click="toggleChooseAll"
      >
        <div class="bEvaluateProductItem-check">
          <i
            v-show="isChooseAll"
            class="iconfont icon-duihao"
          ></i>
        </div>
        <span class="bEvaluateProductList-chooseAll-text">{{isChooseAll?'全不选':'全选'}}</span>
      </div>
      <div class="bEvaluateProductList-chooseAll-btns">
        <button
          type="button"
          class="bEvaluateProductList-chooseAll-btn-waring"
          @click="sendCoupon"
        >批量发券
        </button>
      </div>
    </div>
    <b-pop-check-list
      type="radio"
      :show.sync="popShow"
      :list="tagList"
      v-model="couponType"
      @confirm="confirmCoupon"
    ></b-pop-check-list>
  </div>
</template>

<script>
import BEvaluateProductItem from './BEvaluateProductItem';
import BPopCheckList from '../../form/BPopCheckList';

export default {
  name: 'BEvaluateProductList',
  components: {
    BPopCheckList,
    BEvaluateProductItem
  },
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => []
    },
    // 多选模式
    multiChooseMode: {
      type: Boolean,
      default: false
    },
    // 是否选择了全选
    chooseAll: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      // 是否选择了全选
      isChooseAll: this.chooseAll,
      // 发卡券上推选择显示隐藏
      popShow: false,
      // 可选的卡券类型
      tagList: [
        {
          id: 1,
          name: '服务换新优惠券'
        }
      ],
      // 卡券类型
      couponType: []
    };
  },
  watch: {
    isChooseAll(val) {
      this.$emit('update:chooseAll', val);
    },
    chooseAll(val) {
      // 更新本组件全选
      this.isChooseAll = val;
    }
  },
  methods: {
    toggleChooseAll() {
      /* 选择所有订单/取消所有订单 */
      if (this.list.length) {
        this.isChooseAll = !this.isChooseAll;
        this.list.forEach((v) => {
          v.isChecked = this.isChooseAll;
        });
      }
    },
    itemChecked(val) {
      /* item选中后 */
      if (val) {
        if (!this.list.find(v => !v.isChecked)) {
          this.isChooseAll = true;
        }
      } else {
        this.isChooseAll = false;
      }
    },
    sendCoupon() {
      /* 批量发券 */
      if (!this.list.find(v => v.isChecked)) {
        this.$dialog.alert({
          content: '请选择订单'
        });
        return;
      }
      this.popShow = true;
    },
    confirmCoupon(ids) {
      /* 确认卡券类型 */
      if (ids.length) {
        this.$emit('confirmCoupon', ids);
      } else {
        this.$dialog.alert({
          content: '请选择发送类型'
        });
      }
    }
  }
};
</script>

<style lang="scss">
  .bEvaluateProductList-par {
    width: 100%;
    //height: 100%;
  }

  .bEvaluateProductList {
    padding-left: 20px;
    padding-right: 20px;
    background: #fff;

    .bEvaluateProductItem:last-child {
      border-bottom: 0;
    }
  }

  .bEvaluateProductList-chooseAll-btm {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 120px;
    padding-left: 24px;
    padding-right: 24px;
    background: #F8F8F8;
    border-top: 1px solid #D0D0D0;
  }

  .bEvaluateProductList-chooseAll {
    display: flex;
    align-items: center;
  }

  .bEvaluateProductList-chooseAll-text {
    font-size: 28px;
  }

  .bEvaluateProductList-chooseAll-btns {

  }

  .bEvaluateProductList-chooseAll-btn-waring {
    width: 180px;
    height: 60px;
    background: #F5A623;
    font-size: 28px;
    color: #fff;
    border-radius: 30px;
  }
</style>
