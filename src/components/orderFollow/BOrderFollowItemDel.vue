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
        {{orderDelDialog.id}}
      </div>
      <div class="bOrderFollowItem-del-dialog-item">
        <span class="bOrderFollowItem-del-dialog-item-name">客户姓名：</span>
        {{orderDelDialog.userName}} {{orderDelDialog.userSexName}}
      </div>
    </md-dialog>
    <md-dialog
      :closable="false"
      v-model="orderDelSucDialog.open"
      :btns="orderDelSucDialog.btns"
    >
      <div class="bOrderFollowItem-del-dialog-success">
        <i class="iconfont icon-duihao1"></i>订单已删除
      </div>
    </md-dialog>
    <md-dialog
      :closable="false"
      v-model="orderDelApplyDialog.open"
      :btns="orderDelApplyDialog.btns"
    >
      订单{{orderDelApplyDialog.id}}绑了定了相关权益，您无权删除，请填写删除理由后转至营销经理审批。
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
        id: '',
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
      },
      orderDelSucDialog: {
        open: false,
        btns: [
          {
            text: '关闭'
          },
        ],
      },
      orderDelApplyDialog: {
        open: false,
        btns: [
          {
            text: '取消'
          },
          {
            text: '去申请',
            handler: this.applyDeleteOrder,
          }
        ],
      },
    };
  },
  methods: {
    showOrderDelDialog() {
      /* 订单删除对话框 */
      const {
        id
      } = this.followItem;
      // 显示对话框订单id、姓名
      this.orderDelDialog.id = id;
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
        if (data) {
          // 无权益占用删除成功
          // 打开正确提示
          this.orderDelSucDialog.open = true;
          // 传递父组件删除item
          this.$emit('delSuccess', this.index);
        } else {
          // 订单有权益占用，提示跳转申请页面弹框
          this.orderDelApplyDialog.open = true;
        }
      }
    },
    applyDeleteOrder() {
      /* 订单删除申请 */
      this.orderDelApplyDialog.open = false;
      this.$router.push({
        name: 'Order.ApplyDeleteOrder',
        params: {
          orderNo: this.followItem.orderNo
        }
      });
    }
  }
};
</script>

<style lang="scss">
  .order-follow-item-del {
    position: absolute;
    top: 0;
    right: 20px;
    display: flex;
    align-items: center;
    height: 60px;
    color: #666;
    font-size: 24px;

    .iconfont {
      margin-right: 6px;
    }
  }
</style>
