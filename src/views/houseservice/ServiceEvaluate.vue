<template>
  <div>
    <div class="text-333 fs28 title">
      您的满意，是我们前进的方向，请您根据实际感受，留下 您的反馈和建议吧~
    </div>
    <div class="evaluate-point">

    </div>
    <div class="text-333 fs28 title">
      您认为您的专属服务顾问还需要提升以下哪方面的能力 后会更加优秀？
    </div>
    <div class="tag-content"></div>
    <div class="fs30 text-333 mt22 mb22 ml25">评价内容</div>
    <div class="evaluate-content">
      <textarea rows="5" class="w100per" placeholder="请输入您的评价内容（可不填）"></textarea>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';

import {
  BSearchInput
} from '@/components/business';

export default {
  name: 'SearchProduct',
  components: {
    BSearchInput,
    Toast
  },
  created() {
    if (localStorage.getItem('accompanySearchHistory')) {
      this.searchHistory = JSON.parse(localStorage.getItem('accompanySearchHistory'));
      if (this.searchHistory.length > 30) {
        this.searchHistory.splice(0, 29);
      }
    }
    this.currentClickItemData = {};
  },
  data() {
    return {
      searchVal: '',
      // 点击的数据
      currentClickItemData: {},
      searchList: [],
      // 搜索历史
      searchHistory: []
    };
  },
  methods: {
    inputFunction() {
      this.searchList = this.searchHistory;
      if (this.searchVal === '') {
        this.searchList = [];
      }
    },
    search() {
      const param = {};
      param.hmcIdOrUsername = this.searchVal;
      /* 搜索随行参与人 */
      this.basicService.queryAccompanier(param).then((res) => {
        if (res.code === 1) {
          this.searchList = res.data;
          if (res.data === null) {
            Toast.failed('暂无信息，请重新搜索');
            this.searchVal = '';
          }
        }
      });
    },
    array_contain(array, obj) {
      return !!array.find(v => v.productCode === obj.productCode);
    },
    onItemClick(item) {
      if (!this.array_contain(this.searchHistory, item)) {
        this.searchHistory.push(item);
      }
      console.log(item);
      this.searchVal = '';
      this.currentClickItemData = item;
      this.$router.go(-1);
    },

  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Houseservice.AddServiceUser') {
      const obj = { product: this.currentClickItemData };

      to.query.temp2 = JSON.stringify(obj);
    }
    localStorage.setItem('accompanySearchHistory', JSON.stringify(this.searchHistory));
    next();// 必须要有这个，否则无法跳转
  },
};
</script>

<style lang="scss">
  .title{
    padding: 23px 25px;
    line-height: 40px;
  }
  .evaluate-content{
    textarea{
      padding: 24px 25px;
    }
  }
  .fs28{
    font-size: 28px;
  }
  .fs30{
    font-size: 30px;
  }
  .mt22{
    margin-top: 22px;
  }
  .mb22{
    margin-bottom: 22px;
  }
  .ml25{
    margin-left: 25px;
  }
  .text-333{
    color: #333;
  }
  .text-666{
    color: #666;
  }
  .text-999{
    color: #999;
  }
</style>
