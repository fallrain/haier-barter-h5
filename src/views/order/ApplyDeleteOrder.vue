<template>
  <div class="applyDeleteOrder-main">
    <p class="applyDeleteOrder-title">申诉理由</p>
    <textarea
      class="applyDeleteOrder-ta"
      placeholder="您好请说明您的申诉理由，例如：操作失误，请协助删除"
      v-model="form.reason"
    ></textarea>
    <div class="applyDeleteOrder-btns">
      <button
        type="button"
        class="common-submit-btn-default"
        @click="submit"
      >提交
      </button>
    </div>
    <md-dialog
      :closable="false"
      v-model="orderDelDialog.open"
      :btns="orderDelDialog.btns"
    >
      订单删除申请已提交，请在“<strong>订单跟进-异常</strong>”中查看申请状态。
    </md-dialog>
  </div>
</template>

<script>
import {
  Dialog
} from 'mand-mobile';

export default {
  name: 'ApplyDeleteOrder',
  components: {
    'md-dialog': Dialog,
  },
  data() {
    return {
      form: {
        reason: ''
      },
      orderDelDialog: {
        open: false,
        btns: [
          {
            text: '关闭',
            handler: this.orderDelSuccess
          },
        ],
      },
    };
  },
  created() {
    this.genVdt();
  },
  methods: {
    genVdt() {
      // 不加入双向绑定
      this.vdt = new this.BValidate({
        _this: this,
        formData: this.form,
        rules: {
          reason: {
            required: true,
            maxLength: 300
          }
        },
        messages: {
          reason: {
            required: '申诉理由不能为空',
            maxLength: '申诉理由最多可输入300个字'
          }
        }
      });
    },
    submit() {
      /* 提交删除申请 */
      if (this.vdt.valid()) {
        this.orderDelDialog.open = true;
      }
    },
    orderDelSuccess() {
      this.orderDelDialog.open = false;
      this.$mBack();
    }
  }
};
</script>

<style lang="scss">
  .applyDeleteOrder-main {
    position: relative;
    min-height: 100vh;
  }

  .applyDeleteOrder-title {
    padding: 22px 29px;
    font-size: 32px;
    color: #333;
  }

  .applyDeleteOrder-ta {
    width: 100%;
    height: 300px;
    background: #fff;
    padding: 22px;
    font-size: 28px;
    color: #999;
  }

  .applyDeleteOrder-btns {
    position: absolute;
    bottom: 26px;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
  }
</style>
