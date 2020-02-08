<template>
  <button
    :class="['btn-send-code',disabled && 'disabled']"
    type="button"
    @click="sendCode"
    :disabled="disabled"
  >{{btnText}}
  </button>
</template>
<script>
import {
  mapState
} from 'vuex';
import {
  Toast,
} from 'mand-mobile';


export default {
  name: 'WVerificationcode',
  props: [
    'time', // 倒计时时间
    'beforeSend',
    'callBack', // 回调函数
    'errorCallBack', // 错误回调
    'afterSend',
    'phone', // 手机号
    'type'// 验证码发送类型，1:手机，2邮箱
  ],
  components: {
    Toast,
  },
  data() {
    return {
      btnText: '获取验证码',
      disabled: false,
      trueTime: this.time || 60
    };
  },
  computed: {
    ...mapState(['areaCode'])
  },
  methods: {
    async sendCode() {
      /* 发送验证码 */
      if (this.beforeSend && !this.beforeSend()) {
        return;
      }
      const phone = this.phone.trim();
      if (!phone || !phone.startsWith('1') || phone.length != 11) {
        Toast.info('请输入正确手机号');
        return;
      }
      this.$nextTick(() => {
        this.basicService.sendSms({ mobile: phone }).then((res) => {
          if (res.code === 1) {
            debugger;
            Toast.info('验证码发送成功');
            if (this.callBack) {
              this.callBack();
            }
          } else if (this.errorCallBack) {
            this.errorCallBack();
          }
        });

        if (this.afterSend) {
          this.afterSend();
        }
        let time = this.trueTime;
        this.disabled = true;
        this.btnText = `${time}秒后可重发`;
        const interval = setInterval(() => {
          this.btnText = `${--time}秒后可重发`;
          if (time < 1) {
            this.btnText = '获取验证码';
            this.disabled = false;
            clearInterval(interval);
          }
        }, 1000);
      });
    }
  }
};
</script>
<style lang="scss">
  .btn-send-code {
    height:60px;
    min-width: 172px;
    background: #4A90E2;
    color: #fff;
    font-size: 28px;
    border-radius:30px;
    padding-left: 17px;
    padding-right: 17px;
    &.disabled {
      color: #fff;
      font-size: 16px;
    }
  }
</style>
