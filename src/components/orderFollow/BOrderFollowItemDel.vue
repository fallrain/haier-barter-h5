<template>
  <div>
    <div
      class="order-follow-item-del"
      @click="showOrderDelDialog"
    ><i class="iconfont icon-shanchu"></i>删除
    </div>
    <md-dialog
      title="确定要删除该订单？"
      :closable="true"
      v-model="orderDelDialog.open"
      :btns="orderDelDialog.btns"
    >
      <div class="bOrderFollowItem-del-dialog-item">
        <span class="bOrderFollowItem-del-dialog-item-name">订单号：</span>
        {{orderDelDialog.orderNo}}
      </div>
      <div class="bOrderFollowItem-del-dialog-item">
        <span class="bOrderFollowItem-del-dialog-item-name">客户姓名：</span>
        {{orderDelDialog.userName}} {{orderDelDialog.userSexName}}
      </div>
    </md-dialog>
  </div>
</template>

<script>
import {
  Dialog
} from 'mand-mobile';

export default {
  name: 'BOrderFollowItemDel',
  components: {
    'md-dialog': Dialog,
  },
  props: {
    // 待删除的条目
    followItem: {
      type: Object
    },
    // 待删除的索引（删除后传递回父组件）
    index: {
      type: Number
    }
  },
  data() {
    return {
      // 订单删除对话框
      orderDelDialog: {
        // 是否打开
        open: false,
        // 性别
        userSex: '',
        // 编号
        orderNo: '',
        // 姓名
        userName: '',
        btns: [
          {
            text: '取消'
          },
          {
            text: '确定删除',
            handler: this.orderDelete,
          },
        ],
      }
    };
  },
  methods: {
    showOrderDelDialog() {
      /* 订单删除对话框 */
      const {
        orderNo
      } = this.followItem;
        // 显示对话框订单id、姓名
      this.orderDelDialog.orderNo = orderNo;
      this.orderDelDialog.userName = this.followItem.userName;
      this.orderDelDialog.userSexName = {
        1: '先生',
        2: '女士'
      }[this.followItem.userName] || '';
      this.orderDelDialog.open = true;
    },
    async orderDelete() {
      /* 订单删除 */
      // 关闭确认对话框
      this.orderDelDialog.open = false;
      const {
        orderNo
      } = this.followItem;
        // 删除订单
      const { code, data } = await this.orderService.deleteOrderByHmc({
        orderNo
      });
      if (code === 1) {
        // 传递父组件删除item
        this.$emit('delSuccess', {
          index: this.index,
          data,
          orderNo
        });
      }
    }
  }
};
</script>

<style lang="scss">
  .order-follow-item-del {
    position: absolute;
    top: 16px;
    right: 20px;
    display: flex;
    align-items: center;
    height: 60px;
    color: #666;
    font-size: 28px;

    .iconfont {
      font-size: 34px;
      margin-right: 6px;
    }
  }

  .bOrderFollowItem-del-dialog-item {
    font-size: 28px;
    line-height: 48px;
    color: #333;
  }

  .bOrderFollowItem-del-dialog-item-name {
    color: #666;
  }

  .bOrderFollowItem-del-dialog-success {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 30px;

    .iconfont {
      margin-right: 32px;
      font-size: 52px;
      color: #27AA91;
    }
  }
</style>
