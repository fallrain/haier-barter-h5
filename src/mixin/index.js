import {
  mapState
} from 'vuex';

export default {
  async beforeRouteEnter(to, from, next) {
    next();
  },
  data() {
    return {
      pageCfg: {
        page: {
          pageSize: 10,
          page: 1
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
      this.pageCfg.page.page++;
      if (search) {
        search({ more: true }).then(({ isFinished }) => {
          this[scrollView].isFinished = isFinished;
          this.$refs[scrollView].finishLoadMore();
        });
      }
    },
    scrollViewOnRefresh(search, scrollView = 'scrollView') {
      /* 下拉刷新 */
      this.pageCfg.page.page = 1;
      this[scrollView].isFinished = false;
      if (search) {
        search().then(() => {
          this.$refs[scrollView].finishRefresh();
          this.$refs[scrollView].finishLoadMore();
        });
      }
    },
    back() {
      /* 返回上一页 */
      this.$router.back();
    },
    copy(selector, text) {
      /* 复制功能 */
      const copyIns = this.wUtil.clipboardCopy(selector, text);
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
