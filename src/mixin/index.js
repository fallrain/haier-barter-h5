import {
  mapState
} from 'vuex';

export default {
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      // alert(window.location.href.split('#')[0]);
      vm.basicService.jsSign(encodeURIComponent(window.location.href.split('#')[0])).then(({ code, data }) => {
        if (code === 1) {
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填
            jsApiList: [
              'scanQRCode',
              'miniProgram.switchTab',
              'miniProgram.navigateTo',
              'switchTab',
              'navigateTo',
              'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      });
    });
  },
  data() {
    return {
      pageCfg: {
        page: {
          pageSize: 10,
          pageNum: 1
        }
      },
      scrollView: {
        isFinished: false
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    })
  },
  methods: {
    scrollViewOnEndReached(search, scrollView = 'scrollView') {
      /* 加载更多 */

      if (this[scrollView].isFinished) {
        return;
      }
      this[scrollView].page.pageNum++;
      if (search) {
        search({ more: true }).then(({ isFinished }) => {
          this[scrollView].isFinished = isFinished;
          this.$refs[scrollView].finishLoadMore();
          this.$refs[scrollView].reflowScroller();
        });
      }
    },
    scrollViewOnRefresh(search, scrollView = 'scrollView') {
      /* 下拉刷新 */

      this[scrollView].page.pageNum = 1;
      this[scrollView].isFinished = false;
      if (search) {
        search().then(() => {
          this.$refs[scrollView].finishRefresh();
          this.$refs[scrollView].finishLoadMore();
          this.$refs[scrollView].reflowScroller();
        });
      }
    },
    $mBack() {
      /* 返回上一页 */
      this.$router.back();
    },
    $mCopy(selector, text) {
      /* 复制功能 */
      const copyIns = this.bUtil.clipboardCopy(selector, text);
      copyIns.on('success', () => {
        this.$toast('复制成功');
      });

      copyIns.on('error', () => {
        this.$toast('复制失败，请手动复制');
      });
      return copyIns;
    }
  }
};
